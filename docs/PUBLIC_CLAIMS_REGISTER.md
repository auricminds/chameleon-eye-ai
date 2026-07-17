# Public Claims Register

**Last reviewed:** 2026-07-17

This document registers all significant public-facing claims made on the website and records their accuracy status. Any claim marked "requires verification" must not be made on public pages until confirmed.

The absolute rule: the website must describe what genuinely exists today. Never invent certifications, customers, auditors, statistics, pricing, testimonials, or capabilities.

---

## Compliance Claims

| Claim | Location | Accurate? | Notes |
|---|---|---|---|
| SOC 2 readiness in planning | /trust/compliance, /trust/compliance/soc-2, /trust/page, app/page.tsx | Yes | Status chip: in_planning |
| ISO 27001 preparation planned | /trust/compliance, /trust/compliance/iso-27001, /trust/page, app/page.tsx | Yes | Status chip: in_planning |
| Pen testing planned before launch | /trust/penetration-testing | Yes | Status chip: planned |
| DPA available on request | /trust/dpa, /trust/trust-pack | Partially | DPA in progress, not formally published |
| SOC 2 report available on request | /trust/trust-pack | No — removed | Was false; updated to "planned — not yet available" |
| ISO 27001 certificate available | /trust/trust-pack | No — removed | Was false; updated to "planned — not yet available" |
| Pen test summary available | /trust/trust-pack | No — removed | Was false; updated to "planned — not yet available" |

---

## API Claims

| Claim | Location | Accurate? | Notes |
|---|---|---|---|
| API in Developer Preview | /api-docs, /developers, /api-docs/authentication, /api-docs/data-handling, /api-docs/rate-limits | Yes | Banner added |
| Rate limiting is planned | /api-docs, /api-docs/rate-limits | Yes | Clearly stated as planned, not currently enforced |
| Endpoint structures are planned | /api-docs, /developers | Yes | Labelled as planned |
| Production access not yet available | /api-docs, /developers | Yes | Stated in banner |

---

## App Status Claims

| Claim | Location | Accurate? | Notes |
|---|---|---|---|
| macOS app Early Access | /apps, /desktop | Yes | Badge: Early Access |
| macOS app Gatekeeper warning | /apps, /desktop | Yes | Warning shown in card |
| macOS v0.2.0 arm64 | /apps, /desktop | Yes | Matches actual release |
| Windows app Coming Soon | /apps, /desktop | Yes | Badge: Coming Soon |
| iOS app In Development | /apps | Yes | Badge: In Development |
| Web app Development Preview | /apps | Yes | Badge: Development Preview |
| PWA installable | /apps | Yes | Instructions available |

---

## Pricing Claims

| Claim | Location | Accurate? | Notes |
|---|---|---|---|
| Pricing is indicative | /pricing | Yes | Notice added |
| Billing is not active | /pricing | Yes | Stated in notice and footnote |
| Prices subject to change | /pricing | Yes | Stated in notice and footnote |

---

## Trust Center Claims

| Claim | Location | Accurate? | Notes |
|---|---|---|---|
| Server-side AI routing | /trust, /trust/security, /architecture | Yes | Implemented |
| No AI keys in frontend | /trust, /security | Yes | Implemented |
| Workspace isolation | /trust, /enterprise | Yes | Implemented |
| Local/offline mode | /trust, /architecture, /trust/local-vs-cloud | Yes | Implemented |
| Private-source platform | /trust, /enterprise | Yes | Accurate |
| Company details published | /trust/company | Partial | Placeholder details replaced with "will be published prior to launch" |
| Security contact available | /trust/responsible-disclosure | Partial | Contact form only — dedicated email not yet published |

---

## Claims to Watch

These claims are accurate now but must be reviewed before any changes:

- "Demo mode" authentication — must be updated when production cloud accounts are active
- "Indicative pricing" notice — must be removed when billing is active and prices are confirmed
- "Developer Preview" API banner — must be removed when API is production-ready
- "Early Access" macOS badge — must be updated when app is notarized
- All "in_planning"/"planned" compliance badges — must be updated when milestones are completed

---

## Prohibited Claims

The following must never appear on public pages without verified evidence:

- Any certification claim (SOC 2, ISO 27001, HIPAA, etc.) without a real certificate
- Any statistic without a verified source (e.g., "10,000 users", "99.9% uptime")
- Any customer names or testimonials without written consent
- Any claim that billing is active if billing is not active
- Any claim that an API is production-ready if it is in developer preview
- Any claim that penetration testing is complete without a real test report
