# Chameleon Eye AI — Trust Score Action Guide

Follow these steps in order. Each one is a manual task that cannot be done by code.
Estimated total time: 3–4 hours spread across 2 weeks.

---

## Priority Order

| # | Action | Time | Impact |
|---|---|---|---|
| 1 | Google Search Console | 15 min | Indexes all 120+ pages |
| 2 | LinkedIn company page | 20 min | B2B auditors check this first |
| 3 | GitHub organization | 10 min | Developer trust signal |
| 4 | Fill compliance placeholders | 30 min | SOC 2 / ISO / DPA verified |
| 5 | Crunchbase listing | 15 min | Security databases check this |
| 6 | Product Hunt launch | 45 min | Developer mentions and backlinks |
| 7 | AlternativeTo listing | 10 min | Comparison profile for searches |
| 8 | security.txt registration | 5 min | Security database recognition |
| 9 | Update JSON-LD sameAs links | 10 min | Connect all profiles to site |

---

## Step 1 — Google Search Console (Do this first)

**Why:** Without this, Google does not know your pages exist. Indexing can take weeks without it.

1. Go to: https://search.google.com/search-console
2. Sign in with a Google account
3. Click **Add property**
4. Select **URL prefix**
5. Type: `https://chameleoneye.ai`
6. Click **Continue**
7. Choose **HTML file** verification method
8. Download the file (it will be named something like `google1234abc.html`)
9. Open the file — copy the filename (e.g. `google1234abc.html`)
10. Tell the developer (or do it yourself):
    - Replace `public/google-site-verification.html` with the downloaded file
    - The file must keep the exact same name Google gave it
    - Deploy the update
11. Come back to Search Console and click **Verify**
12. Once verified, click **Sitemaps** in the left menu
13. Submit these two sitemaps one at a time:
    - `https://chameleoneye.ai/sitemap.xml`
    - `https://chameleoneye.ai/sitemap-public`
14. Click **Submit** for each one

**Done when:** Both sitemaps show "Success" in Search Console.

---

## Step 2 — LinkedIn Company Page

**Why:** Every B2B security audit, procurement team, and enterprise buyer checks LinkedIn to confirm the company exists.

1. Go to: https://www.linkedin.com/company/setup/new
2. Sign in to your personal LinkedIn account
3. Fill in:
   - **Company name:** Chameleon Eye
   - **Company website:** `https://chameleoneye.ai`
   - **Industry:** Software Development
   - **Company size:** 1–10 employees
   - **Company type:** Privately Held
4. Click **Create page**
5. Add a company description (copy this):

   > Chameleon Eye AI is a commercial private AI intelligence platform for businesses. We provide private business intelligence through a hosted workspace, API, and Desktop Connector — with local-first options, verified compliance documentation, and approval-based cloud processing.

6. Add the logo (find it in `/public/` folder of the project)
7. Add the tagline: `Private AI intelligence for business`
8. Publish the page
9. Copy the LinkedIn URL (e.g. `https://linkedin.com/company/chameleon-eye`)
10. Give this URL to the developer to add to the JSON-LD sameAs field (Step 9 below)

**Done when:** The page is live and shows chameleoneye.ai as the website.

---

## Step 3 — GitHub Organization

**Why:** Developers and security tools check GitHub. Even an empty organization with a profile raises trust immediately because it shows the company is real.

1. Go to: https://github.com/organizations/new
2. Sign in to GitHub (create an account if needed)
3. Choose the **Free** plan
4. Fill in:
   - **Organization account name:** `chameleon-eye` (or `chameleon-eye-ai`)
   - **Contact email:** your company email
5. Click **Create organization**
6. Skip member invitations for now
7. Go to the organization settings
8. Add:
   - **Display name:** Chameleon Eye
   - **Description:** Private AI intelligence platform for business
   - **URL:** `https://chameleoneye.ai`
   - **Twitter:** your Twitter handle (if you have one)
9. Save
10. Create a public repository called `.github` (this is a special GitHub repo)
    - Click **New repository**
    - Name: `.github`
    - Set to **Public**
    - Initialize with a README
11. Edit the README inside `.github/profile/README.md` (create this file):

    ```
    # Chameleon Eye

    Chameleon Eye AI is a commercial private AI intelligence platform for businesses.

    Private business intelligence through a hosted workspace, API, and Desktop Connector.

    - Website: https://chameleoneye.ai
    - Developers: https://chameleoneye.ai/developers
    - Trust Center: https://chameleoneye.ai/trust
    - API Docs: https://chameleoneye.ai/api-docs
    ```

12. Copy the GitHub org URL (e.g. `https://github.com/chameleon-eye`)
13. Give this URL to the developer to add to the JSON-LD sameAs field (Step 9 below)

**Done when:** `github.com/chameleon-eye` (or your chosen name) shows the org profile with chameleoneye.ai as the website.

---

## Step 4 — Fill Compliance Placeholders (SOC 2 / ISO / DPA)

**Why:** The Trust Center pages exist but show "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR" — this needs real data to be verifiable.

You need the actual documents from your compliance/legal team. For each item below, you will edit the corresponding page in the codebase and replace the placeholder text.

**SOC 2 Type II** — file: `app/trust/compliance/soc-2/page.tsx`

Replace these placeholders with real values:
- Auditor → the name of the audit firm
- Report period → e.g. "January 1, 2025 – December 31, 2025"
- Report date → e.g. "February 15, 2026"
- Trust service criteria → e.g. "Security (CC)" or "Security, Availability (CC, A)"

**ISO/IEC 27001** — file: `app/trust/compliance/iso-27001/page.tsx`

Replace these placeholders:
- Certificate number → from your certificate document
- Certification body → e.g. "BSI Group" or "Bureau Veritas"
- Accreditation body → e.g. "UKAS" or "DAkkS"
- Certified scope → copy from your certificate scope field
- Issue date → from your certificate
- Expiry date → from your certificate

**Penetration Testing** — file: `app/trust/penetration-testing/page.tsx`

Replace these placeholders:
- Testing provider → the company that ran the test
- Test date → when it was performed
- Test scope → what was in scope (e.g. "Web application, API, authentication flows")
- Systems tested → list of systems
- Remediation status → e.g. "All critical and high findings remediated. Medium findings under review."

**DPA** — file: `app/trust/dpa/page.tsx`

Replace these placeholders:
- Version → e.g. "1.0" or "2026-07"
- Last updated → date of last legal review

**Company Transparency** — file: `app/trust/company/page.tsx`

Replace these placeholders:
- Legal operating entity → full registered legal name
- Company registration number → from your company registration
- Registered address → official registered address
- Support contact → e.g. `support@chameleoneye.ai`
- Security contact → e.g. `security@chameleoneye.ai`
- Privacy contact → e.g. `privacy@chameleoneye.ai`

**Responsible Disclosure** — file: `app/trust/responsible-disclosure/page.tsx`

Replace the placeholder with the confirmed security email address.

After editing, tell the developer to deploy.

---

## Step 5 — Crunchbase Listing

**Why:** Security audits, procurement tools, and investor databases all check Crunchbase to verify a company exists.

1. Go to: https://www.crunchbase.com/add-company
2. Create a Crunchbase account if needed (free)
3. Fill in:
   - **Company name:** Chameleon Eye
   - **Website:** `https://chameleoneye.ai`
   - **Short description:** Private AI intelligence platform for business — local-first workspace, API, and Desktop Connector.
   - **Company type:** Private Company
   - **Founded date:** the actual founding year
   - **Industry:** Artificial Intelligence, SaaS, Enterprise Software
   - **Location:** your actual location
4. Submit for review
5. Crunchbase may email you to verify — complete verification

**Done when:** `crunchbase.com/organization/chameleon-eye` shows the company profile.

---

## Step 6 — Product Hunt Launch

**Why:** Product Hunt creates a permanent indexed public page with developer community mentions, upvotes, and reviews — all of which appear in search results and trust audits.

1. Go to: https://www.producthunt.com
2. Create an account or sign in
3. Click your avatar → **Submit a product**
4. Fill in:
   - **Product name:** Chameleon Eye AI
   - **Tagline:** Private AI intelligence for business (140 chars max)
   - **Website:** `https://chameleoneye.ai`
   - **Topics:** Artificial Intelligence, SaaS, Productivity, Privacy
5. Upload a logo (use the Chameleon Eye AI logo from `/public/`)
6. Upload a gallery image or screenshot (take a screenshot of the terminal or trust center)
7. Write the description (copy this):

   > Chameleon Eye AI is a commercial private AI intelligence platform for businesses. Unlike general AI chatbots, it is purpose-built for private business intelligence — with local-first options, approval-based cloud controls, and structured reports on business risk, cash waste, team performance, and operations.
   >
   > **Key features:**
   > - Offline / Local Mode — no third-party AI API contacted
   > - Hybrid Approval Mode — only selected text sent to cloud
   > - SOC 2 Type II and ISO 27001 compliance documentation
   > - DPA available for business customers
   > - Authenticated API for embedded intelligence workflows

8. Schedule for a weekday morning (Tuesday or Wednesday 12:01 AM PST works best)
9. Share the link with any professional network to get early upvotes

**Done when:** The product page is live with a URL like `producthunt.com/posts/chameleon-eye-ai`.

---

## Step 7 — AlternativeTo Listing

**Why:** AlternativeTo is indexed by every security tool that checks "what is this service an alternative to" — it creates a public comparison profile.

1. Go to: https://alternativeto.net/add
2. Create a free account
3. Fill in:
   - **Software name:** Chameleon Eye AI
   - **Website:** `https://chameleoneye.ai`
   - **Short description:** Private AI intelligence platform for businesses — local-first workspace with SOC 2 and ISO 27001 compliance documentation.
   - **Platform:** Web, macOS, Windows
   - **License:** Commercial
4. Add tags: AI, Business Intelligence, Privacy, SaaS
5. Submit

**Done when:** A page exists at `alternativeto.net/software/chameleon-eye-ai`.

---

## Step 8 — security.txt Registration

**Why:** Security researchers and automated security scanners check `/.well-known/security.txt`. Registering at securitytxt.org adds the domain to the responsible disclosure directory.

1. Go to: https://securitytxt.org
2. Fill in the form:
   - **Contact:** `mailto:security@chameleoneye.ai`
   - **Expires:** set to 1 year from today
   - **Preferred Languages:** en
3. Generate the security.txt content
4. Copy the generated text
5. Tell the developer to update `public/.well-known/security.txt` with this content and deploy

**Done when:** https://chameleoneye.ai/.well-known/security.txt returns the signed file.

---

## Step 9 — Update JSON-LD sameAs Links (Developer Task)

After completing Steps 2 and 3, you will have real URLs for LinkedIn and GitHub.

Give the developer these URLs to update in `app/layout.tsx` inside the JSON-LD `sameAs` array:

- LinkedIn: `https://linkedin.com/company/chameleon-eye` ← replace with your actual URL
- GitHub: `https://github.com/chameleon-eye` ← replace with your actual org URL
- Twitter/X: `https://twitter.com/chameleoneye` ← add if you have one
- Product Hunt: `https://producthunt.com/posts/chameleon-eye-ai` ← add after Step 6

The developer will update the JSON-LD, deploy, and Google will pick it up on next crawl.

---

## Tracking Your Progress

Use this checklist:

- [ ] Step 1 — Google Search Console — both sitemaps submitted
- [ ] Step 2 — LinkedIn company page live
- [ ] Step 3 — GitHub organization live with profile README
- [ ] Step 4 — SOC 2 placeholders filled and deployed
- [ ] Step 4 — ISO 27001 placeholders filled and deployed
- [ ] Step 4 — Pen test placeholders filled and deployed
- [ ] Step 4 — DPA placeholders filled and deployed
- [ ] Step 4 — Company Transparency placeholders filled and deployed
- [ ] Step 5 — Crunchbase listing live
- [ ] Step 6 — Product Hunt page live
- [ ] Step 7 — AlternativeTo listing live
- [ ] Step 8 — security.txt updated with signed content
- [ ] Step 9 — JSON-LD sameAs updated with real profile URLs

---

## Expected Score After Each Milestone

| After completing | Expected trust score |
|---|---|
| Step 1 only (Search Console) | Pages indexed — auditors can now find them |
| Steps 1–3 | ~4/10 — company verified, pages discoverable |
| Steps 1–4 | ~6/10 — compliance visible and verifiable |
| Steps 1–7 | ~7/10 — public community presence + compliance |
| All steps | ~8–9/10 — verifiable, indexed, community presence, compliance |

> A score of 10/10 requires years of developer community engagement and open-source contributions.
> 8/10 is the realistic and sufficient target for enterprise B2B trust.

---

*Last updated: July 2026 — Chameleon Eye AI Trust Score Action Guide*
