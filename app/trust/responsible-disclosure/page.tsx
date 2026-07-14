import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Responsible Disclosure — Chairman AI",
  description:
    "How to report a security vulnerability to Chairman. Our responsible disclosure process and safe harbour policy.",
};

const whatToReport = [
  "Authentication bypass or account takeover",
  "Data exposure or unauthorised data access",
  "SQL injection or command injection vulnerabilities",
  "Broken access controls",
  "Sensitive data leaks (PII, credentials, tokens)",
  "API key exposure in frontend or public endpoints",
  "Cross-site scripting (XSS) with significant impact",
  "Server-side request forgery (SSRF)",
];

const whatNotToDo = [
  "Do not access, exfiltrate, or modify other users' data",
  "Do not run destructive tests (data deletion, denial-of-service, resource exhaustion)",
  "Do not perform denial-of-service or load attacks against Chairman systems",
  "Do not publicly disclose the vulnerability before Chairman has addressed the issue",
  "Do not use automated scanners that generate excessive traffic",
  "Do not social-engineer Chairman employees or contractors",
];

export default function ResponsibleDisclosurePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Security
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Responsible Disclosure
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            How to report a security vulnerability to Chairman.
          </p>
          <div className="mt-8">
            <Button href="mailto:security@chameleoneye.ai" variant="primary">
              Report a Vulnerability
            </Button>
          </div>
        </div>
      </section>

      {/* How to Report */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionTitle
              title="How to Report"
              subtitle="Submit security reports via email. We take all reports seriously."
              align="left"
            />
            <div className="mt-10 space-y-6">
              <Card>
                <h3 className="text-base font-semibold text-foreground">Report Security Issues</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Send your report to:{" "}
                  <a
                    href="mailto:security@chameleoneye.ai"
                    className="text-emerald hover:underline"
                  >
                    security@chameleoneye.ai
                  </a>
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Include in your report: a clear description of the vulnerability, steps to
                  reproduce it, the potential impact, and any proof-of-concept code or screenshots
                  if relevant. Encrypt sensitive reports using our public key if available.
                </p>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-foreground">Response Timeline</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { step: "Acknowledgement", time: "Within 5 business days" },
                    { step: "Initial assessment", time: "Within 10 business days" },
                    { step: "Fix and coordination", time: "Depends on severity" },
                    { step: "Public disclosure", time: "Coordinated after fix" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                      <span className="text-sm text-foreground">{item.step}</span>
                      <span className="text-sm text-muted">{item.time}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-foreground">Researcher Acknowledgement</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Chairman appreciates responsible security researchers. With your permission, we
                  will acknowledge credited disclosures publicly. We do not currently operate a
                  formal bug bounty programme, but we do recognise researchers who report valid,
                  high-impact vulnerabilities responsibly.
                </p>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-base font-semibold text-foreground mb-4">What to Report</h3>
              <ul className="space-y-2">
                {whatToReport.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="mt-1 text-emerald shrink-0">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* What NOT to do */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What NOT to Do"
            subtitle="Actions that fall outside responsible disclosure and may result in legal action."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {whatNotToDo.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border border-white/8 bg-panel p-4"
              >
                <span className="mt-0.5 text-gold shrink-0">—</span>
                <span className="text-sm leading-6 text-muted">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm leading-7 text-muted">
              Acting within the guidelines above constitutes good-faith security research. Chairman
              will not pursue legal action against researchers who follow these guidelines. Actions
              outside these guidelines may result in legal action under applicable computer fraud
              and cybercrime laws.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
