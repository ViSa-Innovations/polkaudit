# Wise Integration Guide for PolkAudit (India)

This guide explains how to receive customer payments with Wise, create invoices, and automate invoicing/collections for PolkAudit.

It is written for your current stage: founder-led, early pilots, and India-based banking.

---

## 1) Reality check first: Personal vs Business

For business payments, treat **Wise Business** as the target setup.

- Wise Business supports invoicing and payment links in product flows.
- Wise personal is not intended for business transactions and has fewer automation features.
- For India-based recipients, Wise may route inbound funds to your INR bank account after conversion and provide eFIRC details depending on flow.

If you are currently on personal Wise, use the "manual invoicing + bank details" method first, then upgrade to Wise Business for smoother operations.

---

## 2) Best setup for your current stage

Use this stack immediately:

1. **Wise Business** for international receipts.
2. **Razorpay payment links** for India domestic clients (UPI/cards/netbanking).
3. A simple invoicing source of truth (Google Sheet, Notion, or Zoho Books).

This gives you practical collection coverage for both India and international clients while staying lean.

---

## 3) Account setup checklist (Wise)

## 3.1 Open / upgrade to Wise Business

- Complete business verification (or sole proprietor details if applicable).
- Enable 2FA.
- Add and verify your Indian receiving bank account.

## 3.2 Enable account details

- In Wise, open account details for currencies your clients use (USD, GBP, EUR, etc., based on eligibility).
- Save these details in your private ops doc:
  - account holder name
  - account number / routing / IBAN / SWIFT
  - payment reference instructions

## 3.3 Prepare compliance basics

- Keep your service description consistent: "SaaS / governance analytics / software services."
- Keep client contract/SOW + invoice + payment proof together.
- Store eFIRC and Wise receipts per payment for accounting/tax records.

---

## 4) How to receive payments (operational flow)

## 4.1 One-time project / pilot invoice (recommended first)

1. Create invoice in Wise Business (or external invoice tool).
2. Include:
   - invoice number
   - issue date, due date
   - customer legal name + email
   - service description (for example, "PolkAudit Pilot - Month 1")
   - amount + currency
   - payment terms
3. Share invoice PDF and payment link.
4. Ask client to include invoice number as transfer reference.
5. Mark as paid only after funds settle.

## 4.2 Monthly subscription-style collection (manual but reliable)

Until full gateway subscriptions are in place, run a monthly cycle:

- T-7 days: send upcoming invoice
- T-1 day: reminder
- Due date: reminder
- D+3: overdue notice and service warning

This works well for first 5-20 customers and avoids failed auto-debit complexity.

## 4.3 Recommended payment terms

- Pilot: 100% upfront (or 50/50 milestone split)
- Monthly plan: prepaid monthly
- Enterprise: 30-day net terms only after trust is established

---

## 5) Invoice format you should use

Use a consistent structure in every invoice.

Required fields:

- Your legal name and contact
- Invoice number (example: `PA-2026-0018`)
- Issue date and due date
- Client billing name and address
- Service line items
- Currency and total
- Payment method instructions
- Late fee / suspension clause (if used)

Suggested line items:

- "PolkAudit Pro Plan - July 2026"
- "Governance Audit Snapshot (one-time)"
- "Custom integration support"

---

## 6) Invoice templates (copy-ready)

## 6.1 Payment instructions block (international, Wise)

Use this block in your invoice footer:

```text
Payment Instructions (Wise):
Please pay via bank transfer using the account details provided in the payment link/invoice.
Important: Use invoice number <INVOICE_NUMBER> as payment reference.
Accepted currency: <USD/EUR/GBP/...>.
```

## 6.2 Reminder email template

Subject:
`Invoice <INVOICE_NUMBER> due on <DATE> - PolkAudit`

Body:

```text
Hi <CLIENT_NAME>,

Quick reminder that invoice <INVOICE_NUMBER> for <AMOUNT> <CURRENCY> is due on <DUE_DATE>.

Payment link: <PAYMENT_LINK>

Please include <INVOICE_NUMBER> in the payment reference.

If payment has already been made, please ignore this message.

Thanks,
<YOUR_NAME>
PolkAudit
```

## 6.3 Overdue email template

Subject:
`Overdue: Invoice <INVOICE_NUMBER> - PolkAudit`

Body:

```text
Hi <CLIENT_NAME>,

Invoice <INVOICE_NUMBER> (amount: <AMOUNT> <CURRENCY>) is now overdue.

Payment link: <PAYMENT_LINK>

Please complete payment by <NEW_DATE>. If you need billing support, reply to this email and we’ll help.

Regards,
<YOUR_NAME>
PolkAudit
```

---

## 7) Automation options

You have two practical automation tracks:

## Track A: No-code automation (start now)

Tools:
- Wise invoice/payment links (where available in your account)
- Google Sheets or Notion invoice register
- Zapier/Make + Gmail

Flow:
1. New row "invoice created" -> send invoice email.
2. D-1 before due date -> reminder email.
3. D+3 overdue -> follow-up email + Slack/Telegram alert to you.
4. Payment confirmed -> mark paid, send receipt email.

This is enough for early B2B without custom engineering.

## Track B: API automation (when Wise Business API is available to your account)

High-level architecture:

1. Your backend stores customer + plan + invoice schedule.
2. Scheduler (daily cron) generates invoice records.
3. Integration layer creates payment requests/links and stores reference IDs.
4. Webhook/polling updates payment status to `paid/overdue`.
5. Trigger follow-up emails and service lifecycle rules.

Suggested stack:
- FastAPI worker + Postgres table (`billing_invoices`)
- Email provider (Resend/SES/Postmark)
- Optional CRM sync (HubSpot/Notion)

Note: API capabilities and eligibility vary by region/account type. Confirm in your Wise Business dashboard before implementation.

---

## 8) Data model for billing (simple)

Create a table/spreadsheet with these fields:

- `invoice_id`
- `customer_name`
- `customer_email`
- `plan_name`
- `currency`
- `amount`
- `issue_date`
- `due_date`
- `payment_link`
- `reference_code`
- `status` (`draft`, `sent`, `paid`, `overdue`, `cancelled`)
- `paid_at`
- `notes`

This becomes your source of truth for collections and reporting.

---

## 9) Reconciliation process (weekly)

Every week:

1. Export Wise payment activity.
2. Match each payment to invoice by reference code and amount.
3. Mark paid invoices in your tracker.
4. Save:
   - invoice PDF
   - payment proof
   - Wise receipt
   - eFIRC email/PDF if applicable

Use folder structure:

```text
finance/
  2026/
    07/
      INV-PA-2026-001/
        invoice.pdf
        payment-receipt.pdf
        wise-transfer-proof.pdf
        efirc.pdf
```

Keep this folder private, not in public git.

---

## 10) Launch-ready billing policy for landing page

Use this short policy in FAQ/terms:

- Pilot plans are prepaid and scope-limited.
- Monthly plans are billed in advance.
- Currency conversion fees (if any) are borne by payer unless agreed otherwise.
- Service may pause for invoices overdue beyond agreed grace period.

---

## 11) Suggested rollout for PolkAudit

## Week 1 (now)

- Finalize Wise setup and receiving details.
- Add billing contact email (`billing@polkaudit.xyz` or `hello@polkaudit.xyz`).
- Start with manual invoice + payment link flow.

## Week 2

- Build invoice tracker (Google Sheet/Notion).
- Add automated reminders via Zapier/Make.
- Standardize templates in this guide.

## Week 3-4

- Add backend billing tables and invoice IDs.
- Integrate status sync workflow.
- Define upgrade path (Pilot -> Starter/Pro).

---

## 12) Common mistakes to avoid

- Using personal account for business collections long-term.
- Missing invoice reference in transfer instructions.
- No reminder cadence (causes delayed cash flow).
- Mixing personal and business records.
- Not storing eFIRC/receipts for accounting trail.

---

## 13) Practical answer to your exact question

How to receive payments now:
- Use Wise Business invoice/payment link for international clients.
- Use Razorpay links for India clients.

How to generate invoices:
- Wise Business invoice tool now, or Zoho Books if you need GST-ready workflows.

How to automate invoicing/payments:
- Start with no-code reminders + tracking this week.
- Add API-driven billing automation only after your Wise account/API eligibility is confirmed.

---

## Reference links

- Wise Help: Getting paid by invoice  
  https://wise.com/help/articles/3PBeSfyBJ22iAsQD49HEbE/getting-paid-to-your-wise-business-by-invoice
- Wise Help: Getting paid by payment link  
  https://wise.com/help/articles/4qr3kkvIQlHNiD8BegEB4u/getting-paid-to-your-wise-business-by-payment-link
- Wise Help: Receiving payments for Indian businesses  
  https://wise.com/help/articles/71lNXW0Ls3gEFhUH8PtodV/receiving-payments-for-indian-businesses
- Wise India Business receive page  
  https://wise.com/in/business/receive-money

---

Not legal or tax advice. Validate compliance details (GST/FEMA/export reporting) with your CA before scaling volume.
