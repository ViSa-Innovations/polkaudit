# Deploy PolkAudit with Cloud Build → Cloud Run

**Default:** `cloudbuild.yaml` deploys **backend API + indexer** to Cloud Run.

- **Dashboard UI** — `apps/frontend` on Vercel (`app.polkaudit.xyz`)
- **Landing** — `apps/landing` on Vercel (`polkaudit.xyz`)
- **Backend-only** — use `cloudbuild.backend-dashboard.yaml` if you host the indexer elsewhere (VM)

See **[HYBRID_DEPLOYMENT.md](HYBRID_DEPLOYMENT.md)** for the Oracle VM indexer alternative.

No local Docker required.

## Architecture on GCP

```text
Cloud Build trigger (cloudbuild.yaml)
    ├── build → Artifact Registry (polkaudit-backend, polkaudit-indexer)
    └── deploy → Cloud Run
          ├── polkaudit-backend  (public, scale-to-zero)
          └── polkaudit-indexer  (private IAM, min-instances=1)
                    │
                    ▼
               Neon PostgreSQL (DATABASE_URL secret)
```

| Service | Platform | Public? |
|---------|----------|---------|
| `polkaudit-backend` | Cloud Run, 512Mi, migrations on start | Yes (`/health`, `/docs`) |
| `polkaudit-indexer` | Cloud Run, 1Gi, min-instances=1, no CPU throttle | No (IAM only) |
| Dashboard UI | Vercel (`apps/frontend`) | Yes |

**Cost note:** The indexer is always-on (`min-instances=1`). Expect ongoing Cloud Run charges for that service.

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

## Cloud Build trigger

1. Console → **Cloud Build** → **Triggers** → **Create trigger**
2. Connect your GitHub repo (`polkaudit`)
3. Event: **Push to branch** → `main` (or your default)
4. Configuration: **Cloud Build configuration file** → `cloudbuild.yaml` (backend + indexer) or `cloudbuild.backend-dashboard.yaml` (backend only)
5. **Substitution variables** (optional overrides):

| Variable | Example | Notes |
|----------|---------|--------|
| `_REGION` | `us-central1` | Same as Artifact Registry and Cloud Run |
| `_AR_REPO` | `apps` | Shared Docker repo in us-central1 (e.g. alongside `visahaw-api`) |
| `_BACKEND_IMAGE` | `polkaudit-backend` | Image name inside `apps` repo |
| `_BACKEND_SERVICE` | `polkaudit-backend` | Cloud Run service name |
| `_INDEXER_IMAGE` | `polkaudit-indexer` | Indexer image name (`cloudbuild.yaml` only) |
| `_INDEXER_SERVICE` | `polkaudit-indexer` | Indexer Cloud Run service (`cloudbuild.yaml` only) |

6. Save and run the trigger (or push to `main`).

### Manual run (no push)

```bash
gcloud builds submit --config=cloudbuild.yaml \
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
| Cloud Run backend | Low at demo traffic |
| External indexer (VM) | Free tier / existing host |
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
| Stats stay at zero | External indexer not running or wrong `DATABASE_URL` |

---

## Files reference

| File | Purpose |
|------|---------|
| [cloudbuild.yaml](../cloudbuild.yaml) | Backend API + Indexer → Cloud Run |
| [cloudbuild.backend-dashboard.yaml](../cloudbuild.backend-dashboard.yaml) | Backend API only (legacy / VM indexer) |
| [apps/backend/Dockerfile](../apps/backend/Dockerfile) | API + Alembic on start |
| [apps/indexer/Dockerfile](../apps/indexer/Dockerfile) | Always-on indexer worker |

Local Docker Compose (optional): [docker-compose.yml](../docker-compose.yml)
