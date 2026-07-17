# Known Limitations

**Last reviewed:** 2026-07-17

This document records known limitations of the product that are relevant to public claims and user expectations. It must be reviewed before publishing any new marketing claims.

---

## Authentication and Accounts

- The web app currently uses demo mode only — authentication is stored in localStorage with no cloud account created.
- No real user accounts, billing, or cloud workspaces exist yet.
- Sign-up flow creates a local demo session, not a production account.
- The login page shows a "Demo mode" notice to make this clear to users.

---

## API

- The API is in developer preview. Not all documented endpoints are fully implemented.
- Rate limiting is not actively enforced in developer preview.
- Production API access requires manual approval via the contact form.
- There is no public self-serve API key generation yet.

---

## macOS Desktop App

- The app is not notarized with an Apple Developer ID.
- Every macOS user will see a Gatekeeper security warning (either "damaged" or "app from unidentified developer").
- The workaround is to right-click the app and select Open, then click Open in the dialog.
- The app is only available for Apple Silicon (arm64). Intel Macs are not supported.
- This is a development build — it has not been through App Store review or Apple security review.

---

## Compliance

- SOC 2 Type II attestation has not been conducted.
- ISO/IEC 27001 certification has not been conducted.
- No independent penetration testing has been conducted.
- A DPA is being prepared but has not been formally published with version and date.
- Zero data retention routes are an architectural design — not yet contractually active with any AI provider.

---

## Pricing

- Pricing shown on the website is indicative only.
- Billing is not active.
- Plan prices may change before commercial launch.

---

## Company Information

- Full legal entity, registration number, and registered address have not been publicly published.
- A security disclosure email has not been published — responsible disclosure currently uses the contact form.
- These details will be published prior to commercial launch.

---

## Free Tools

- The quiz-based free tools produce indicative self-assessment scores based on user answers.
- They are not professional audits, financial assessments, or business advice.
- Results carry a disclaimer to review with qualified advisors.

---

## What Is Implemented and Working

- The web terminal (Chameleon Terminal) is functional in demo mode.
- Business DNA analysis is functional in demo mode.
- Local/offline mode is functional — no third-party AI API contact.
- The macOS desktop app is downloadable and functional (with Gatekeeper bypass).
- PWA installation from browser is supported.
- AI routing through OpenRouter is implemented (server-side, keys not exposed to frontend).
