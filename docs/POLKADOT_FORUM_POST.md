# Polkadot Forum — Governance Topic Draft

Post on [forum.polkadot.network](https://forum.polkadot.network) under **Governance** before submitting an on-chain Treasury referendum.

Full proposal: [TREASURY_PROPOSAL.md](TREASURY_PROPOSAL.md)

Legacy Polkassembly draft (archived): [POLKASSEMBLY_DISCUSSION_POST.md](POLKASSEMBLY_DISCUSSION_POST.md)

---

## Title

```
PolkAudit — Open-source governance audit dashboard (seeking community feedback)
```

Alternative:

```
PolkAudit: Open-source governance & treasury transparency for Polkadot — community feedback before Phase 1 treasury ask
```

**Tags:** `treasury` (add `opengov` or `transparency` if available)

---

## Body (plain text — copy from here)

Summary

I'm building PolkAudit, an open-source governance transparency stack for Polkadot. It indexes finalized relay-chain blocks, stores an audit trail in PostgreSQL, and exposes KPIs and exports through a secured API and Next.js dashboard.

This thread is to share the live MVP demo, gather community feedback, and outline a Phase 1 treasury ask before submitting a formal OpenGov proposal.

Ask (Phase 1): USD 10,000 equivalent in DOT
Duration: 8 weeks
License: Apache 2.0
Repo: https://github.com/ViSa-Innovations/polkaudit
Landing: https://polkaudit.xyz
Live demo (dashboard): https://app.polkaudit.xyz
API docs: https://api.polkaudit.xyz/docs
Demo video: (add your YouTube or Loom URL here)

---

Problem

Polkadot OpenGov and treasury activity are public on-chain, but hard to audit in practice:

• Governance data is spread across extrinsics, pallets, and referenda.
• Explorers show raw chain data—not governance KPIs, exportable audit packs, or indexer operational health.
• DAOs, parachain teams, grantees, and auditors need repeatable evidence: blocks indexed, proposals tracked, treasury spends summarized, CSV/JSON exports.

---

What exists today (MVP)

PolkAudit already has a working pipeline:

Polkadot RPC → Indexer → PostgreSQL → FastAPI → Next.js dashboard → CSV/JSON exports

Working now:

• Live Polkadot finalized-block indexing
• Extrinsic audit trail in database
• Stats API (blocks, extrinsics, last indexed block)
• Dashboard: Overview, Proposals, Treasury, Exports, Settings
• CSV proposals export + Overview JSON export
• Production-style deployment (GCP Cloud Run backend + indexer, Neon PostgreSQL, Vercel frontend)

Current public demo architecture:

GCP Cloud Run (indexer, private) → Neon PostgreSQL → GCP Cloud Run (API) → Vercel (dashboard at app.polkaudit.xyz)

Honest caveat: Proposals, votes, and treasury KPIs only populate when matching OpenGov extrinsics appear in the scanned block range (Referenda.submit, ConvictionVoting.vote, Treasury.spend, etc.). The pipeline can be live while governance tables are still sparse—that is expected and documented in the UI.

---

Evidence

GitHub: https://github.com/ViSa-Innovations/polkaudit
Live dashboard: https://app.polkaudit.xyz
Landing: https://polkaudit.xyz
Architecture: https://github.com/ViSa-Innovations/polkaudit/blob/main/docs/ARCHITECTURE.md
Hybrid deployment: https://github.com/ViSa-Innovations/polkaudit/blob/main/docs/HYBRID_DEPLOYMENT.md
Full treasury proposal: https://github.com/ViSa-Innovations/polkaudit/blob/main/docs/TREASURY_PROPOSAL.md
Screenshots and sample exports: https://github.com/ViSa-Innovations/polkaudit/tree/main/docs/assets

---

What Phase 1 funding enables (8 weeks, ~$10k DOT)

M1 (weeks 1–2): Public demo hardened; verification scripts pass; first progress report
M2 (weeks 3–4): OpenGov parser extension + backfill tooling; governance evidence in demo range
M3 (weeks 5–6): GitHub CI green; release v0.1.0-mvp; updated demo video and screenshots
M4 (weeks 7–8): At least 1 pilot ecosystem team onboarded; final report and Phase 2 scope

Budget (USD 10,000):

• Development: $5,500
• Infrastructure (Neon, GCP, RPC): $2,000
• Documentation and demo: $1,000
• Security and quality: $1,000
• Contingency: $500

Payment: milestone-based (25% per milestone), DOT to beneficiary address listed in the treasury referendum.

---

What is NOT in Phase 1

To keep scope honest and deliverable in 8 weeks:

• Multichain indexing
• AI recommendations
• Enterprise compliance automation
• Paid managed hosting product

These may be proposed in Phase 2 if Phase 1 delivers and pilots provide feedback.

---

Who benefits

• Parachain / DAO treasury teams — board-ready exports and KPIs
• Grant recipients — accountability evidence for milestones
• Auditors and reviewers — structured data instead of manual chain digging
• Ecosystem voters — verifiable transparency tooling funded by treasury

---

Team

Vijay — Founder, Value Creating Solutions
Maintainer and primary developer (architecture, indexer, API, dashboard, deployment).

GitHub: (add your profile URL)
Contact: hello@polkaudit.xyz

---

Open-source commitment

• Apache 2.0 license
• Public GitHub repository
• No proprietary lock-in (standard PostgreSQL + HTTP API)
• Public milestone reporting on this thread

This is a treasury / public-good proposal. The core stack stays open source. Optional paid pilots for hosted onboarding are separate and not part of this ask.

---

Questions for the community

I'd appreciate feedback on:

1. Scope — Is Phase 1 (demo hardening + OpenGov parser + CI + 1 pilot) the right size for a first treasury ask?
2. Amount — Is USD 10k equivalent reasonable for 8 weeks of solo maintainer delivery?
3. Pilots — Any parachain teams, collectives, or grantees interested in a free design-partner pilot?
4. Parser priority — Which governance pallets or extrinsics matter most for your use case?
5. Phase 2 — Scheduled reports, alerts, or parachain-specific indexing—which should come next?

---

Next steps

1. Collect feedback on this thread for 1–2 weeks
2. Update the proposal based on comments
3. Submit a Treasury spend proposal on Polkadot OpenGov with on-chain identity and beneficiary address
4. Deliver milestones publicly if approved

Thank you for reviewing. I'm happy to answer technical questions, share architecture details, or walk through the demo live.

---

## Body (copy ends here)

---

## Posting checklist

- [ ] Open https://app.polkaudit.xyz in an incognito browser
- [ ] Replace demo video and GitHub profile placeholders
- [ ] Confirm https://api.polkaudit.xyz/docs works (or use Cloud Run backend URL)
- [ ] Attach 1–2 screenshots from `docs/assets/` if the forum supports uploads
- [ ] Save the forum topic URL for the on-chain treasury proposal

See also: [TREASURY_SUBMISSION_CHECKLIST.md](TREASURY_SUBMISSION_CHECKLIST.md)
