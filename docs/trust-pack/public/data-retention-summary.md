# Data Retention Summary — Chairman AI

## Retention Categories

**Account data** — Account email is stored in Supabase until account deletion.

**Billing metadata** — Stored in Stripe/Supabase. Retained as required by payment and legal obligations.

**Usage metadata** — Usage counters stored for 12 months rolling. Used for billing and abuse prevention.

**Local private files** — Not stored by Chairman AI. Remain on the user device in Local Private Mode.

**Selected cloud text** — Transient. Processed through Chairman API. Not stored by default.

**AI responses** — Not stored by default unless the user saves them.

**Saved drafts** — Stored in Supabase/local until deleted by user.

**Website events** — Retained for 30 days via Vercel analytics.

**Security audit metadata** — Retained for 12 months. Not deletable.

**Support requests** — Retained for 24 months.

## Key Rules

- Local private files remain on the user device in Local Private Mode.
- Raw cloud prompts are not stored by default.
- Raw AI responses are not stored by default unless the user saves them.
- Usage metadata may be retained for billing, abuse prevention, and audit integrity.
- Billing metadata may be retained as required by payment/legal obligations.
- Trust document requests may be retained for vendor review and audit tracking.
