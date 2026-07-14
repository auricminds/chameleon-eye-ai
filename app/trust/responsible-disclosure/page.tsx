import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Responsible Disclosure — Chairman AI",
  description:
    "How to report a security vulnerability to Chairman AI. Responsible disclosure process and safe harbour policy.",
};

const rules = [
  "Report suspected vulnerabilities responsibly.",
  "Do not access other users' data.",
  "Do not run destructive tests.",
  "Do not perform denial-of-service testing.",
  "Provide clear reproduction steps.",
  "The company will review valid reports responsibly.",
];

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
            How to report a security vulnerability to Chairman AI.
          </p>
          <div className="mt-8">
            <Button href="mailto:security@chairmans.uk" variant="primary">
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
              subtitle="Submit security reports via email. Chairmans Holding takes all reports seriously."
              align="left"
            />
            <div className="mt-10 space-y-6">
              <Card>
                <h3 className="text-base font-semibold text-foreground">
                  Report Security Issues
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Send your report to:{" "}
                  <a
                    href="mailto:security@chairmans.uk"
                    className="text-emerald hover:underline"
                  >
                    security@chairmans.uk
                  </a>
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Include in your report: a clear description of the
                  vulnerability, steps to reproduce it, the potential impact,
                  and any proof-of-concept code or screenshots if relevant.
                </p>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-foreground">
                  Disclosure Rules
                </h3>
                <ul className="mt-4 space-y-3">
                  {rules.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-1 text-emerald shrink-0">+</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-foreground">
                  Response Timeline
                </h3>
                <div className="mt-4 space-y-3">
                  {[
                    { step: "Acknowledgement", time: "Within 5 business days" },
                    {
                      step: "Initial assessment",
                      time: "Within 10 business days",
                    },
                    {
                      step: "Fix and coordination",
                      time: "Depends on severity",
                    },
                    {
                      step: "Public disclosure",
                      time: "Coordinated after fix",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-center justify-between gap-4 border-b border-white/5 pb-3"
                    >
                      <span className="text-sm text-foreground">
                        {item.step}
                      </span>
                      <span className="text-sm text-muted">{item.time}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-foreground">
                  Public Bug Bounty
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  A public bug bounty programme is not currently active.
                  Chairmans Holding appreciates responsible security researchers
                  and will recognise researchers who report valid, high-impact
                  vulnerabilities responsibly.
                </p>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-base font-semibold text-foreground mb-4">
                What to Report
              </h3>
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

      {/* Safe Harbour */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Safe Harbour"
            subtitle="Acting within these guidelines constitutes good-faith security research."
            align="left"
          />
          <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm leading-7 text-muted">
              Acting within the guidelines above constitutes good-faith security
              research. Chairmans Holding will not pursue legal action against
              researchers who follow these guidelines. Actions outside these
              guidelines may result in legal action under applicable computer
              fraud and cybercrime laws.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
