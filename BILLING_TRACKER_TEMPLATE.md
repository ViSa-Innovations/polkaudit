# Billing Tracker Template (Copy to Google Sheets / Notion)

Use this schema as your billing source of truth.

---

## 1) Columns

| Column | Type | Example | Notes |
|---|---|---|---|
| `invoice_id` | text | `PA-2026-0001` | Unique; never reuse |
| `customer_name` | text | `Acme Treasury Ops` | Legal billing name |
| `customer_email` | text | `finance@acme.org` | Primary billing contact |
| `plan_name` | enum | `Pilot / Starter / Pro / Enterprise / Snapshot` | Keep consistent |
| `scope_note` | text | `Pilot M1` | Optional detail |
| `currency` | enum | `USD` | Invoice currency |
| `amount` | number | `1500` | Numeric only |
| `issue_date` | date | `2026-07-07` | Invoice date |
| `due_date` | date | `2026-07-14` | Payment due |
| `payment_channel` | enum | `Wise / Razorpay / Bank` | Collection route |
| `payment_link` | text/url | `https://...` | Wise link or invoice URL |
| `reference_code` | text | `PA-2026-0001` | Ask payer to use this |
| `status` | enum | `draft / sent / paid / overdue / cancelled` | Core workflow |
| `sent_at` | datetime | `2026-07-07 11:00` | Email sent time |
| `reminder_1_at` | date | `2026-07-13` | T-1 |
| `reminder_2_at` | date | `2026-07-14` | Due date |
| `overdue_followup_at` | date | `2026-07-17` | D+3 |
| `paid_at` | datetime | `2026-07-12 18:40` | Settlement timestamp |
| `received_amount` | number | `1500` | Useful for partials |
| `fx_fee_note` | text | `Client paid transfer fee` | Optional |
| `efirc_received` | boolean | `TRUE/FALSE` | If applicable |
| `receipt_file_link` | text/url | `drive link` | Proof archive |
| `owner` | text | `Vijay` | Who follows up |
| `notes` | text | `Asked for extension till Friday` | Free-form |

---

## 2) Status rules

- `draft`: created, not sent
- `sent`: invoice sent to customer
- `paid`: fully settled
- `overdue`: due date passed and unpaid
- `cancelled`: voided invoice

Use one status only at a time.

---

## 3) Formula suggestions (Google Sheets)

### 3.1 `days_to_due` (new helper column)

```excel
=IF([@status]="paid","",[@due_date]-TODAY())
```

### 3.2 `is_overdue` (helper column)

```excel
=IF(AND([@status]<>"paid",TODAY()>[@due_date]),"YES","NO")
```

### 3.3 `aging_bucket` (helper column)

```excel
=IF([@status]="paid","Paid",
 IF(TODAY()<= [@due_date],"Current",
 IF(TODAY()-[@due_date]<=7,"1-7 days",
 IF(TODAY()-[@due_date]<=30,"8-30 days","31+ days"))))
```

---

## 4) Suggested views/filters

Create saved filters:

1. `To Send` -> status = `draft`
2. `Due This Week` -> due date in next 7 days, status != `paid`
3. `Overdue` -> status = `overdue` OR `is_overdue = YES`
4. `Paid This Month` -> `paid_at` in current month
5. `Pilot Accounts` -> `plan_name = Pilot`

---

## 5) Weekly billing workflow (15-30 mins)

1. Send all `draft` invoices
2. Trigger reminders from due-date filters
3. Reconcile newly received payments
4. Mark paid and attach proof links
5. Update overdue notes

---

## 6) CSV starter (copy/paste)

```csv
invoice_id,customer_name,customer_email,plan_name,scope_note,currency,amount,issue_date,due_date,payment_channel,payment_link,reference_code,status,sent_at,reminder_1_at,reminder_2_at,overdue_followup_at,paid_at,received_amount,fx_fee_note,efirc_received,receipt_file_link,owner,notes
PA-2026-0001,Example Treasury Team,finance@example.org,Pilot,Pilot Month 1,USD,1200,2026-07-07,2026-07-14,Wise,https://example-payment-link,PA-2026-0001,sent,2026-07-07 11:00,2026-07-13,2026-07-14,2026-07-17,,0,,FALSE,,Vijay,
```

---

## 7) Privacy reminder

This tracker includes financial data. Keep it private:

- Do not commit to Git.
- Restrict share permissions.
- Use separate billing and product access.

