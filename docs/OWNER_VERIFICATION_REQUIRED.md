# Owner Verification Required

This document lists all items that require the authorized company administrator to provide verified, factual information before the relevant public pages can be fully completed.

These items are intentionally left as placeholders on internal/admin pages only. No placeholder text remains on public-facing pages.

---

## Legal and Company Information

Required for: `/trust/company`, `/trust/dpa`

- [ ] Legal entity name (exact registered name)
- [ ] Company registration number
- [ ] Registered jurisdiction (country and state/emirate if applicable)
- [ ] Registered office address
- [ ] Primary business contact email
- [ ] Security contact email (for responsible disclosure)
- [ ] Privacy contact email
- [ ] Support contact email or URL
- [ ] DPA version number and last updated date

**Action:** Complete the `/owner/trust` page to publish company transparency information.

---

## Compliance Milestones

Required for: `/trust/compliance`, `/trust/trust-pack`, all compliance sub-pages

- [ ] SOC 2 Type II — Auditor name, report period, report date, trust service criteria
- [ ] ISO/IEC 27001 — Certification body, certificate number, scope, issue date, expiry date
- [ ] Penetration test — Provider name, test date, scope, systems tested, remediation status

**Action:** Update `docs/trust-pack/public/soc-2-summary.md`, `iso-27001-summary.md`, and `penetration-test-summary.md` when each milestone is reached. Then update the corresponding compliance pages to change `status: "in_planning"` to `status: "completed"` or `status: "certified"`.

---

## DPA

Required for: `/trust/dpa`, `/trust/trust-pack`

- [ ] DPA version and date
- [ ] Review by qualified legal counsel before publishing

---

## Support and Security Contact

Required for: `/trust/responsible-disclosure`, `/trust/company`, footer

- [ ] Dedicated security disclosure email (e.g., security@chameleoneye.ai)
- [ ] Support email or helpdesk URL

---

## Product Pricing Activation

Required for: `/pricing`

- [ ] Confirm billing is active before removing indicative pricing notice
- [ ] Confirm plan prices before launch

---

## Notes

- The `/owner/trust` page in the admin section contains the full structured form for entering these details.
- None of these items should be published until verified. Do not copy placeholder text to public pages.
- The compliance status on public pages is accurately set to "in_planning" or "planned" until each milestone is genuinely completed.
