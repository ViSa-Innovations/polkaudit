# PolkAudit — SaaS Readiness Gap Analysis

**Purpose:** Exact gap between current MVP and a sellable multi-tenant SaaS with registration, subscriptions, and Razorpay.  
**Audience:** Founder / engineering planning (post-demo, post-Treasury discussion).  
**Last updated:** 2026-07-09

---

## Executive summary

| Area | Current state | SaaS-ready? |
|------|---------------|-------------|
| Live indexing + dashboard + exports | Working (single shared stack) | ✅ For demo/pilots |
| Multi-tenancy | Schema scaffolding only | ❌ |
| Public registration | Not implemented | ❌ |
| Subscriptions / entitlements | Not implemented | ❌ |
| Razorpay in-app integration | Not implemented | ❌ |
| Manual billing (Wise / Razorpay links) | Documented externally | ✅ For first pilots |

**You can launch MVP + Polkassembly + manual pilots now.**  
**You cannot honestly sell self-serve “sign up and subscribe” until Phases A–B below.**

---

## Current architecture (as-is)

```text
Single Polkadot RPC
        ↓
Single indexer (no project_id on blocks/extrinsics)
        ↓
Shared PostgreSQL
        ↓
FastAPI — MVP routes use ONE global X-API-KEY
        ↓
Next.js dashboard — API key in localStorage (not user accounts)
```

### What already exists (reuse later)

| Asset | Location | Notes |
|-------|----------|-------|
| `projects`, `user_projects` tables | `apps/backend/migrations/`, `src/models/project.py` | Tenant container |
| `project_id` on governance rows | `src/models/proposal.py` | Column exists; indexer does not populate |
| JWT auth + user model | `src/api/auth.py`, `src/models/user.py` | Login works; no public signup |
| Admin user create | `src/api/admin.py` | `POST /api/admin/users` |
| Project-scoped advanced APIs | alerts, analytics, scoring, etc. | Use `get_current_project()` + JWT |
| MVP dashboard APIs | `src/api/v1/router.py`, export | Use `get_api_key()` only — **no tenant filter** |
| Billing ops docs | `WISE_GUIDE.md`, `BILLING_CHECKLIST.md` | Manual collection |

### Critical gaps (why it’s not multi-tenant today)

1. **Indexer** (`apps/indexer/src/`) writes shared chain data with **no `project_id`** on `blocks`, `extrinsics`, or governance inserts.
2. **Stats / governance / treasury services** count/query **all rows**, not per project:

   - `apps/backend/src/services/stats.py`
   - `apps/backend/src/services/governance.py`
   - `apps/backend/src/services/treasury.py`

3. **Tenant middleware** (`src/tenant_middleware.py`) does not enforce `X-Project-ID` on `/api/v1/*`.
4. **Frontend** (`apps/frontend/lib/api.ts`, `app/login/page.tsx`) uses a **single API key**, not user JWT + project context.
5. **No billing tables, Razorpay SDK, or webhooks** anywhere in the repo.

---

## Gap matrix (file-level)

| Requirement | Status | Primary files to change |
|-------------|--------|-------------------------|
| Per-tenant data isolation | ❌ | indexer `parser.py`, `scanner.py`, `models.py`; backend services + migrations |
| Per-tenant API keys | ❌ | `src/auth.py`, new `api_keys` model, `router.py`, `export.py` |
| Enforce tenant on MVP routes | ❌ | `tenant_middleware.py`, `stats.py`, `governance.py`, `treasury.py` |
| Project onboarding (admin) | ⚠️ Partial | `api/v1/projects.py`, new onboarding service |
| Public signup | ❌ | new `api/auth/register.py`, frontend signup page |
| Email verification | ❌ | new mail service + tokens table |
| Plan / subscription model | ❌ | new migrations + `models/billing.py` |
| Razorpay payment links | ❌ | new `api/billing/razorpay.py`, webhooks |
| Razorpay subscriptions | ❌ | webhook handlers + entitlement middleware |
| Frontend billing UI | ❌ | `apps/frontend` or `apps/landing` checkout flow |
| Entitlement gating | ❌ | middleware: plan limits (API rate, retention, exports) |

---

## Phase 0 — Launch now (no code required)

**Goal:** Demo, Polkassembly, first 2–3 paid pilots.

| Action | Owner | Done when |
|--------|-------|-----------|
| Public landing + demo video | You | `polkaudit.xyz` live |
| Live dashboard URL | You | `demo.polkaudit.xyz` or Cloud Run URL |
| Manual invoice + Wise/Razorpay link | You | `BILLING_TRACKER_TEMPLATE.md` in use |
| Pilot contract / scope email | You | 2–3 design partners contacted |
| Honest positioning on landing | You | “Contact for pilot” — not “Subscribe now” |

**Do not block Treasury discussion on SaaS features.**

---

## Phase A — Logical multi-tenancy (4–6 weeks)

**Goal:** Multiple customers on one deployment with isolated views and API keys.  
**Still:** manual onboarding (you create tenant), no Razorpay in-app yet.

### A1 — Data model

| Task | Files |
|------|-------|
| Add `api_keys` table (`id`, `project_id`, `key_hash`, `name`, `revoked_at`) | `migrations/versions/`, `src/models/api_key.py` |
| Add `project_id` to indexer `blocks`, `extrinsics` (or document single-chain = one project per deployment) | `apps/indexer/src/models.py`, migration |
| Default project `id=1` for existing data backfill | migration script |
| Indexer: set `project_id` on governance inserts | `apps/indexer/src/parser.py` |

**Design decision (pick one):**

| Option | Pros | Cons |
|--------|------|------|
| **A: Shared chain, `project_id` on all rows** | One indexer, lower cost | Same chain data duplicated per tenant is wrong — actually for Polkadot relay chain, all tenants see same chain; isolation is **access + branding + exports**, not different chain data |
| **B: One deployment per paying customer** | True isolation | Higher ops cost |

**Recommendation for Polkadot relay MVP:** Option A — one shared indexed dataset; tenants are **workspaces** (API keys, alerts, reports, RBAC). Parachain-specific indexing = dedicated instance (Enterprise).

### A2 — Backend tenant enforcement

| Task | Files |
|------|-------|
| Replace global `get_api_key()` with `get_api_key_project()` resolving `project_id` | `src/auth.py`, `src/dependencies.py` |
| Filter `StatsService`, `GovernanceService`, `TreasuryService` by `project_id` (or shared read for relay MVP) | `src/services/*.py` |
| Enforce `X-Project-ID` or embed project in API key lookup | `src/tenant_middleware.py` |
| Wire MVP routes to tenant context | `src/api/v1/router.py`, `src/api/v1/export.py` |
| Per-tenant rate limits | `src/middleware.py` (limiter key = api_key_id) |

### A3 — Admin onboarding (manual SaaS)

| Task | Files |
|------|-------|
| `POST /api/admin/tenants` — create project + user + API key | `src/api/admin.py`, new service |
| Assign `user_projects` role | `src/models/project.py` |
| CLI script: `scripts/create-tenant.sh` | `scripts/` |
| Document runbook | `docs/SETUP.md` or `docs/ADMIN_ONBOARDING.md` |

### A4 — Frontend

| Task | Files |
|------|-------|
| Optional: JWT login path (email/password) alongside API key | `apps/frontend/app/login/page.tsx` |
| Store `project_id` in session / context | `apps/frontend/lib/api.ts` |
| Send `X-Project-ID` + tenant API key on fetch | `apps/frontend/lib/api.ts` |
| Settings: show tenant name, plan (placeholder) | `apps/frontend/app/settings/page.tsx` |

### Phase A acceptance criteria

- [ ] Two pilot tenants with **different API keys**
- [ ] Tenant A cannot access Tenant B alerts/settings (where project-scoped)
- [ ] Admin can create tenant in &lt; 5 minutes via script or admin API
- [ ] MVP dashboard still works for default tenant
- [ ] No regression on `make verify-e2e`

---

## Phase B — Billing + Razorpay (3–4 weeks)

**Goal:** In-app payment collection for India; invoice status synced.  
**Still:** optional manual Wise for international.

### B1 — Database

New tables (suggested):

```text
billing_plans        — slug, name, price_inr, price_usd, interval, features_json
subscriptions        — project_id, plan_id, status, razorpay_sub_id, current_period_end
invoices             — project_id, amount, currency, status, razorpay_payment_link_id
payment_events       — webhook payload audit log
```

| Task | Files |
|------|-------|
| Alembic migrations | `apps/backend/migrations/versions/` |
| SQLAlchemy models | `src/models/billing.py` |
| Seed plans matching landing pricing | migration or `scripts/seed-plans.py` |

### B2 — Razorpay integration

| Task | Files |
|------|-------|
| Config: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` | `src/config.py`, `.env.example` |
| Create payment link API | `src/api/billing/razorpay.py` |
| Webhook: `payment.captured`, `payment.failed` | `src/api/billing/webhooks.py` |
| Map payment → `invoices` + activate `subscriptions` | `src/services/billing_service.py` |
| Idempotency on webhook events | `payment_events` table |

**Note:** Razorpay **Subscriptions** API has RBI/card mandate complexity in India. For Phase B, prefer:

1. **Payment links** for pilot + first month  
2. **Manual renewal reminders** (from `BILLING_CHECKLIST.md`)  
3. Add true auto-subscription in Phase B2 (later)

### B3 — Entitlements

| Task | Files |
|------|-------|
| Middleware: check `subscription.status == active` | `src/dependencies.py` |
| Plan limits: API calls/month, export frequency | config on `billing_plans.features_json` |
| Grace period + read-only mode when overdue | `billing_service.py` |

### B4 — Landing / checkout UX

| Task | Files |
|------|-------|
| Pricing CTA → “Request pilot” stays; add “Pay pilot fee” for known customers | `apps/landing/components/pricing.tsx` |
| Post-payment success page | `apps/landing/app/payment/success/page.tsx` |
| Webhook does not expose secrets in frontend | env only on backend |

### Phase B acceptance criteria

- [ ] Create Razorpay payment link from backend for a test amount
- [ ] Test payment marks invoice `paid` via webhook
- [ ] Subscription status gates API access (or feature flag)
- [ ] Payment secrets only in server env / Secret Manager
- [ ] Reconciliation row in billing tracker auto-updated (manual export OK for v1)

---

## Phase C — Self-serve registration (4–6 weeks, optional)

**Goal:** Customer signs up, pays, gets tenant automatically.

| Task | Files |
|------|-------|
| `POST /api/auth/register` + email verification | `src/api/auth.py` |
| Signup page | `apps/frontend/app/signup/page.tsx` or landing |
| Checkout: select plan → Razorpay → provision tenant | billing + admin services |
| Welcome email + API key delivery | notification service |
| Password reset | auth routes |

### Phase C acceptance criteria

- [ ] New user completes signup → payment → dashboard access without manual admin step
- [ ] Email verification required before paid features
- [ ] Abuse controls: rate limit signup, disposable email block (basic)

---

## Recommended timeline (solo maintainer)

| Phase | Duration | Parallel with |
|-------|----------|---------------|
| **Phase 0** — Launch demo + pilots | Now | Treasury discussion |
| **Phase A** — Logical multi-tenant | Weeks 1–6 | Treasury milestone delivery |
| **Phase B** — Razorpay + billing tables | Weeks 7–10 | First paying pilots on manual billing |
| **Phase C** — Self-serve signup | Weeks 11–16 | Only if pilot demand justifies it |

**Total to “honest SaaS” (A+B):** ~10 weeks part-time solo.  
**Total to self-serve (A+B+C):** ~16 weeks.

---

## What NOT to build yet

- Full Stripe + Razorpay + Wise trifecta in v1 billing
- Per-tenant dedicated indexer for every Starter customer (too expensive)
- Auto-recurring card subscriptions before 5+ paying customers
- Enterprise SSO/SAML before first Enterprise contract
- Blockchain-level tenant isolation (impossible on shared relay chain — use workspace isolation)

---

## Landing & sales copy alignment

### Safe to say now

- “Pilot programs available”
- “Managed hosting and governance reporting”
- “Open source (Apache 2.0) with hosted option”
- “Contact for pricing”

### Do not say until Phase B/C

- “Subscribe instantly”
- “Automated monthly billing in-app” (until Razorpay webhooks live)
- “Fully isolated private chain index per Starter account”

---

## Quick reference: MVP routes vs tenant-aware routes

| Route group | Auth today | Tenant-aware? |
|-------------|------------|---------------|
| `/api/v1/stats`, `/proposals`, `/treasury`, `/export` | `X-API-KEY` (global) | ❌ |
| `/api/v1/alerts`, `/analytics`, `/scoring`, … | JWT + `X-Project-ID` | ✅ (partial) |
| `/api/auth/token` | OAuth2 password | N/A |
| `/api/admin/users` | JWT admin | Global |

**Phase A priority:** Align MVP routes with the same tenant model as alerts/analytics.

---

## Related docs

| Document | Purpose |
|----------|---------|
| [TREASURY_PROPOSAL.md](TREASURY_PROPOSAL.md) | Funding (build in public; not SaaS scope) |
| [TREASURY_SUBMISSION_CHECKLIST.md](TREASURY_SUBMISSION_CHECKLIST.md) | Demo launch |
| [WISE_GUIDE.md](../WISE_GUIDE.md) | International manual billing |
| [BILLING_CHECKLIST.md](../BILLING_CHECKLIST.md) | Weekly billing ops |
| [BILLING_TRACKER_TEMPLATE.md](../BILLING_TRACKER_TEMPLATE.md) | Invoice tracker schema |

---

## Next step when you want to implement

Start with **Phase A1 + A2** only (tenant API keys + service filters).  
Do **not** start Razorpay until at least one pilot is paying via manual link — validates pricing before engineering billing.

When ready to code, say: **“Implement Phase A1”** and we can do it in small PR-sized chunks.
