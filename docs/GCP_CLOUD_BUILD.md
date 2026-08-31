# Deploy PolkAudit with Cloud Build → Cloud Run

Use **two triggers** (recommended):

| Config file | Deploys |
|-------------|---------|
| `cloudbuild.yaml` | Backend API → Cloud Run **Service** |
| `cloudbuild.indexer-worker-pool.yaml` | Indexer → Cloud Run **Worker Pool** |

- **Dashboard UI** — `apps/frontend` on Vercel (`app.polkaudit.xyz`)
- **Landing** — `apps/landing` on Vercel (`polkaudit.xyz`)
- **Legacy** — `cloudbuild.backend-dashboard.yaml` is backend-only (same as `cloudbuild.yaml`)

See **[HYBRID_DEPLOYMENT.md](HYBRID_DEPLOYMENT.md)** for the Oracle VM indexer alternative.

No local Docker required.

## Architecture on GCP

```text
Trigger A: cloudbuild.yaml
    └── Cloud Run Service: polkaudit-backend (public, scale-to-zero)

Trigger B: cloudbuild.indexer-worker-pool.yaml
    └── Cloud Run Worker Pool: polkaudit-indexer (instances=1, no URL)
              │
              ▼
         Neon PostgreSQL (DATABASE_URL secret)
```

| Resource | Platform | Public? |
|----------|----------|---------|
| `polkaudit-backend` | Cloud Run Service, 512Mi | Yes (`/health`, `/docs`) |
| `polkaudit-indexer` | Cloud Run Worker Pool, 1Gi, instances=1 | No (no endpoint) |
| Dashboard UI | Vercel (`apps/frontend`) | Yes |

**Cost note:** The indexer worker pool keeps a fixed instance count (default 1). Expect ongoing Cloud Run charges for that worker.

**Name conflict:** A Worker Pool cannot reuse the name of an existing Cloud Run **Service**. If you previously deployed `polkaudit-indexer` as a Service, delete that Service (or set `_INDEXER_WORKER_POOL` to another name) before running the worker-pool trigger.

---

## One-time GCP setup

Replace `PROJECT_ID`. Default region in yaml: **`us-central1`** — must match your Cloud Build trigger region and Artifact Registry location.

### 1. Enable APIs

```bash
gcloud config set project PROJECT_ID

gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com
```

### 2. Artifact Registry repository

PolkAudit uses the existing shared Docker repo **`apps`** in **`us-central1`** — same registry as `visahaw-api` and other ViSa apps. **Do not create a separate `polkaudit` repo** unless you want isolation.

Images are stored as:

```text
us-central1-docker.pkg.dev/PROJECT_ID/apps/polkaudit-backend
```

If `apps` does not exist in us-central1 yet:

```bash
gcloud artifacts repositories create apps \
  --repository-format=docker \
  --location=us-central1 \
  --description="Shared application container images"
```

### 3. Secret Manager

Store the **same** values you use locally (Neon URL, API key):

```bash
# Neon connection string (postgresql:// or postgresql+asyncpg://)
echo -n 'postgresql://USER:PASS@HOST.neon.tech/neondb?sslmode=require' | \
  gcloud secrets create polkaudit-database-url --data-file=-

echo -n 'your-production-api-key' | \
  gcloud secrets create polkaudit-api-key --data-file=-
```

To update later:

```bash
echo -n 'NEW_VALUE' | gcloud secrets versions add polkaudit-database-url --data-file=-
```

### 4. Cloud Build service account permissions

Find the Cloud Build SA (default: `PROJECT_NUMBER@cloudbuild.gserviceaccount.com`):

```bash
PROJECT_NUMBER=$(gcloud projects describe PROJECT_ID --format='value(projectNumber)')
CB_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"

for ROLE in \
  roles/run.admin \
  roles/artifactregistry.writer \
  roles/secretmanager.secretAccessor \
  roles/iam.serviceAccountUser; do
  gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:${CB_SA}" \
    --role="${ROLE}"
done
```

### 5. Allow Cloud Run to read secrets

Default Compute SA (used by Cloud Run unless you specify another):

```bash
RUN_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

gcloud secrets add-iam-policy-binding polkaudit-database-url \
  --member="serviceAccount:${RUN_SA}" \
  --role=roles/secretmanager.secretAccessor

gcloud secrets add-iam-policy-binding polkaudit-api-key \
  --member="serviceAccount:${RUN_SA}" \
  --role=roles/secretmanager.secretAccessor
```

---

## Cloud Build triggers

### Trigger A — backend (`cloudbuild.yaml`)

1. Console → **Cloud Build** → **Triggers** → **Create trigger**
2. Connect your GitHub repo (`polkaudit`)
3. Event: **Push to branch** → `main` (or your default)
4. Configuration file: **`cloudbuild.yaml`**
5. Optional substitutions:

| Variable | Example | Notes |
|----------|---------|--------|
| `_REGION` | `us-central1` | Same as Artifact Registry and Cloud Run |
| `_AR_REPO` | `apps` | Shared Docker repo in us-central1 |
| `_BACKEND_IMAGE` | `polkaudit-backend` | Image name inside `apps` repo |
| `_BACKEND_SERVICE` | `polkaudit-backend` | Cloud Run service name |

### Trigger B — indexer worker pool (`cloudbuild.indexer-worker-pool.yaml`)

1. Create a **second** trigger on the same repo/branch
2. Configuration file: **`cloudbuild.indexer-worker-pool.yaml`**
3. Optional substitutions:

| Variable | Example | Notes |
|----------|---------|--------|
| `_REGION` | `us-central1` | Same region as backend |
| `_AR_REPO` | `apps` | Shared Docker repo |
| `_INDEXER_IMAGE` | `polkaudit-indexer` | Image name |
| `_INDEXER_WORKER_POOL` | `polkaudit-indexer` | Must not collide with a Service name |
| `_INDEXER_INSTANCES` | `1` | Keep at 1 |

6. Save and run each trigger (or push to `main` if both listen to the same branch).

### Manual run (no push)

```bash
# Backend Service
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_REGION=us-central1,_AR_REPO=apps

# Indexer Worker Pool
gcloud builds submit --config=cloudbuild.indexer-worker-pool.yaml \
  --substitutions=_REGION=us-central1,_AR_REPO=apps
```

---

## After deploy

The build prints service URLs. Typical checks:

```bash
BACKEND_URL=$(gcloud run services describe polkaudit-backend \
  --region=us-central1 --format='value(status.url)')

curl -s "$BACKEND_URL/health"

curl -s -H "X-API-KEY: your-production-api-key" \
  "$BACKEND_URL/api/v1/stats/overview"
```

Set the same API URL and key on **Vercel** (`apps/frontend`):

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.run.app/api/v1
NEXT_PUBLIC_API_KEY=your-production-api-key
API_KEY=your-production-api-key
```

---

## Costs (rough)

| Resource | Estimate |
|----------|----------|
| Cloud Run backend (Service) | Low at demo traffic |
| Cloud Run indexer (Worker Pool, instances=1) | Always-on — main ongoing cost |
| External indexer (VM) | Free tier / existing host (alternative) |
| Vercel frontend + landing | Free tier typical |
| Neon | Free tier / existing plan |
| Cloud Build | 120 free build-min/day |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Permission denied` on deploy | Cloud Build SA needs `run.admin` + `iam.serviceAccountUser` |
| `Secret not found` | Create secrets; grant accessor to Cloud Run SA |
| Backend 503 / DB errors | Check `polkaudit-database-url` (sslmode for Neon) |
| Vercel dashboard API errors | Check `NEXT_PUBLIC_API_URL` points to Cloud Run backend |
| Stats stay at zero | Indexer worker pool not running, wrong `DATABASE_URL`, or old Service indexer still conflicting |
| Worker pool name conflict | Delete/rename existing Service `polkaudit-indexer`, or set `_INDEXER_WORKER_POOL` to a new name |

---

## Files reference

| File | Purpose |
|------|---------|
| [cloudbuild.yaml](../cloudbuild.yaml) | Backend API → Cloud Run Service |
| [cloudbuild.indexer-worker-pool.yaml](../cloudbuild.indexer-worker-pool.yaml) | Indexer → Cloud Run Worker Pool |
| [cloudbuild.backend-dashboard.yaml](../cloudbuild.backend-dashboard.yaml) | Backend API only (legacy filename) |
| [apps/backend/Dockerfile](../apps/backend/Dockerfile) | API + Alembic on start |
| [apps/indexer/Dockerfile](../apps/indexer/Dockerfile) | Indexer worker image |

Local Docker Compose (optional): [docker-compose.yml](../docker-compose.yml)
