# API Implementation Status

**Last reviewed:** 2026-07-17
**API status:** Developer Preview — not yet generally available for production use.

This document tracks which API endpoints are implemented, which are documented but not implemented, and what is planned.

---

## Production Readiness

| Item | Status |
|---|---|
| Production API generally available | No |
| Rate limiting enforced | No — planned |
| API key issuance to external partners | No — on request only |
| Public API documentation | Yes — developer preview |
| Billing for API usage | No — not active |

---

## Endpoint Status

| Method | Path | Description | Status |
|---|---|---|---|
| GET | /health | API health check | Implemented |
| GET | /v1/me/usage | Usage counters and quota | Planned |
| POST | /v1/risk/check | Business risk analysis | Planned |
| POST | /v1/decision/memo | Decision memo generation | Planned |
| POST | /v1/report/structured | Structured intelligence report | Planned |
| POST | /v1/desktop/activate | Desktop device activation | Planned |
| POST | /v1/desktop/refresh-token | Token refresh | Planned |
| POST | /v1/desktop/revoke-device | Revoke device access | Planned |

---

## What "Developer Preview" Means

- The API structure and endpoint signatures are documented and stable enough for review.
- Not all endpoints are fully implemented in the current build.
- Rate limits are not enforced.
- Production credentials are issued only to approved early access partners.
- The API is not yet suitable for production customer integrations.

---

## How to Request Early Access

Use the contact form at `/contact` with subject "API Early Access" to discuss integration requirements.

---

## When to Remove the Developer Preview Banner

Remove the Developer Preview banner from `/api-docs`, `/api-docs/authentication`, `/api-docs/data-handling`, `/api-docs/rate-limits`, and `/developers` when:

1. Core endpoints (risk/check, decision/memo, report/structured) are fully implemented and tested.
2. Rate limiting is actively enforced.
3. API key issuance is available to approved customers.
4. The API is stable enough for production integrations.
