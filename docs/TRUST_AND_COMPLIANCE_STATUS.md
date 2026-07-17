# Trust and Compliance Status

**Last reviewed:** 2026-07-17
**Status:** Early-stage product — compliance milestones are planned, not completed.

This document is the authoritative internal record of all trust and compliance claims made on the public website. It must be kept in sync with the public-facing pages.

---

## Compliance Programs

| Program | Public Claim | Actual Status | Page |
|---|---|---|---|
| SOC 2 Type II | In planning | Not started | `/trust/compliance/soc-2` |
| ISO/IEC 27001 | In planning | Not started | `/trust/compliance/iso-27001` |
| Penetration Testing | Planned | Not yet conducted | `/trust/penetration-testing` |
| GDPR / DPA | DPA in progress | DPA being prepared | `/trust/dpa` |
| Zero Data Retention Route | Planned | Architectural design only | `/trust/ai-providers` |

---

## Product Security Features

| Feature | Status | Notes |
|---|---|---|
| Server-side AI routing | Implemented | Keys not exposed to frontend |
| No AI keys in frontend | Implemented | Architecture enforced |
| Workspace isolation | Implemented | Per-workspace context separation |
| Local/offline mode | Implemented | No third-party AI API contact |
| Role-based permissions | Planned | Not yet built |
| Audit logs | Planned | Not yet built |
| Device activation tokens | Planned | Architecture designed, not fully implemented |

---

## macOS Desktop App

| Claim | Status |
|---|---|
| Available for download | Yes — v0.2.0 for Apple Silicon |
| Notarized by Apple | No — development build only |
| Developer ID signed | No — ad-hoc signed |
| Gatekeeper warning expected | Yes — users must right-click > Open |
| Windows app available | No — in development |
| iOS app available | No — in development |

---

## API Status

| Claim | Status |
|---|---|
| API endpoints documented | Yes — developer preview |
| Production API available | No — not yet generally available |
| Rate limits enforced | No — planned for production |
| All endpoints implemented | Not all — developer preview |

---

## Website Claims Register

The following claims must remain accurate at all times:

- All compliance status badges use `in_planning` or `planned` — never `completed` or `certified` until verified.
- The macOS app shows an Early Access badge and Gatekeeper warning.
- The API pages show a Developer Preview banner.
- The pricing page shows an Indicative Pricing notice.
- The trust center does not claim verified certifications.

---

## How to Update This Document

When a compliance milestone is reached:
1. Update the status in this table.
2. Update `docs/trust-pack/public/[relevant-summary].md` with the verified details.
3. Update the corresponding public page status chip from `in_planning` to `completed` or `certified`.
4. Remove the disclaimer notice from the relevant page if the milestone is fully complete.
5. Update `lib/trust-claims.ts` to reflect the new status.
