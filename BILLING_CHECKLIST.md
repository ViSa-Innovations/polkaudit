# PolkAudit Billing Checklist (India + International)

Use this as your weekly operating checklist until billing is fully automated.

---

## 1) Account and compliance setup (one-time)

- [ ] Wise Business account verified
- [ ] At least one foreign currency account detail enabled (USD/EUR/GBP)
- [ ] Indian bank account linked and verified in Wise
- [ ] Billing email created (`billing@polkaudit.xyz` or fallback `hello@polkaudit.xyz`)
- [ ] Razorpay/Cashfree ready for India domestic collections
- [ ] Basic payment terms drafted (pilot, monthly, overdue policy)
- [ ] Invoice numbering format fixed (`PA-YYYY-####`)
- [ ] Private finance folder created outside public repo

---

## 2) Before sending an invoice

- [ ] Client legal name and billing email confirmed
- [ ] Plan/scope confirmed in writing (email/SOW/proposal)
- [ ] Currency and amount confirmed
- [ ] Due date confirmed
- [ ] Payment method selected (Wise / India gateway / bank transfer)
- [ ] Correct reference included (`invoice number`)
- [ ] Invoice entered in tracker (see `BILLING_TRACKER_TEMPLATE.md`)

---

## 3) Invoice sending flow

- [ ] Send invoice email with payment link/details
- [ ] Save PDF copy
- [ ] Mark tracker status = `sent`
- [ ] Add reminder dates (D-1, D+0, D+3)

---

## 4) Reminder cadence

- [ ] T-1 reminder sent
- [ ] Due-date reminder sent
- [ ] D+3 overdue reminder sent
- [ ] D+7 escalation sent (optional pause warning)

---

## 5) Payment received flow

- [ ] Confirm amount + currency + reference match
- [ ] Mark tracker status = `paid`
- [ ] Record `paid_at` date
- [ ] Send receipt/confirmation to client
- [ ] Save transfer proof and Wise receipt
- [ ] Save eFIRC (if applicable)

---

## 6) Weekly reconciliation (Friday)

- [ ] Export payment activity from Wise
- [ ] Match each payment to invoice by reference and amount
- [ ] Resolve unmatched items
- [ ] Update overdue list and follow-up queue
- [ ] Back up all billing docs for the week

---

## 7) Monthly close checklist

- [ ] Total billed amount calculated
- [ ] Total collected amount calculated
- [ ] DSO (days sales outstanding) reviewed
- [ ] Overdue aging report prepared
- [ ] Files shared with accountant/CA

---

## 8) KPI targets (early stage)

- [ ] Collection rate target: `>= 90%`
- [ ] Overdue invoices target: `< 15%`
- [ ] Average collection time target: `< 10 days`

---

## 9) Risk controls

- [ ] Never use personal messaging only for payment instructions
- [ ] Never accept payments without invoice ID
- [ ] Never store sensitive docs in public git
- [ ] Rotate billing access credentials if exposed

---

## 10) Trigger to upgrade from manual to automation

Move to API/no-code automation when:

- [ ] You cross `10+ active paying clients`, or
- [ ] You generate `>= 20 invoices/month`, or
- [ ] Manual reminders exceed `2 hours/week`

