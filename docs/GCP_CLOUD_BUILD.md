# Deploy PolkAudit with Cloud Build → Cloud Run

**Default:** `cloudbuild.yaml` deploys **backend API only** to Cloud Run.

- **Indexer** — hosted separately (VM, etc.)
- **Dashboard UI** — `apps/frontend` on Vercel (`demo.polkaudit.xyz`)
- **Landing** — `apps/landing` on Vercel (`polkaudit.xyz`)

`cloudbuild.backend-dashboard.yaml` is identical to `cloudbuild.yaml` (kept for existing triggers).

See **[HYBRID_DEPLOYMENT.md](HYBRID_DEPLOYMENT.md)** for indexer + backend wiring.

No local Docker required.

## Architecture on GCP

```text
Cloud Build trigger
    └── build → Artifact Registry (polkaudit-backend)
        └── deploy → Cloud Run (polkaudit-backend)
              │
              ▼
         Neon PostgreSQL (DATABASE_URL secret)
              ▲
         External indexer (VM / other host)
```

| Service | Platform | Public? |
|---------|----------|---------|
| `polkaudit-backend` | Cloud Run, 512Mi, migrations on start | Yes (`/health`, `/docs`) |
| Indexer | External (not Cloud Build) | No |
| Dashboard UI | Vercel (`apps/frontend`) | Yes |

---

## One-time GCP setup

Replace `PROJECT_ID`. Default region in yaml: **`asia-south1` (Mumbai)** — must match your Cloud Build trigger region and Artifact Registry location.

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

PolkAudit uses the existing shared Docker repo **`apps`** in **Mumbai (`asia-south1`)** — same registry as `visahaw-api` and other ViSa apps. **Do not create a separate `polkaudit` repo** unless you want isolation.

Images are stored as:

```text
asia-south1-docker.pkg.dev/PROJECT_ID/apps/polkaudit-backend
```

If `apps` does not exist in Mumbai yet:

```bash
gcloud artifacts repositories create apps \
  --repository-format=docker \
  --location=asia-south1 \
  --description="Shared application container images (Mumbai)"
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
4. Configuration: **Cloud Build configuration file** → `cloudbuild.yaml` or `cloudbuild.backend-dashboard.yaml` (backend only)
5. **Substitution variables** (optional overrides):

| Variable | Example | Notes |
|----------|---------|--------|
| `_REGION` | `asia-south1` | Mumbai — same as Artifact Registry and Cloud Run |
| `_AR_REPO` | `apps` | Shared Docker repo in Mumbai (e.g. alongside `visahaw-api`) |
| `_BACKEND_IMAGE` | `polkaudit-backend` | Image name inside `apps` repo |
| `_BACKEND_SERVICE` | `polkaudit-backend` | Cloud Run service name |

6. Save and run the trigger (or push to `main`).

### Manual run (no push)

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_REGION=asia-south1,_AR_REPO=apps
```

---

## After deploy

The build prints service URLs. Typical checks:

```bash
BACKEND_URL=$(gcloud run services describe polkaudit-backend \
  --region=asia-south1 --format='value(status.url)')

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
| [cloudbuild.yaml](../cloudbuild.yaml) | Backend API → Cloud Run |
| [cloudbuild.backend-dashboard.yaml](../cloudbuild.backend-dashboard.yaml) | Same as `cloudbuild.yaml` (legacy trigger filename) |
| [apps/backend/Dockerfile](../apps/backend/Dockerfile) | API + Alembic on start |

Local Docker Compose (optional): [docker-compose.yml](../docker-compose.yml)
