import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Security Testing — Chameleon Eye AI",
  description:
    "Chameleon Eye AI independent security testing status. Planned before public commercial launch.",
};

export default function PenetrationTestingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Security
          </p>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Independent Security Testing
            </h1>
            <StatusChip status="planned" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Independent security testing is planned before public commercial
            launch of Chameleon Eye AI.
          </p>
        </div>
      </section>

      {/* Honest Status Notice */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Current Status
          </p>
          <p className="text-sm leading-7 text-muted">
            Independent security testing has not yet been completed. External
            penetration testing is planned as part of pre-launch security
            preparation. Information will be published following formal
            verification.
          </p>
        </div>
      </section>

      {/* Status Details */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Testing Status"
          subtitle="Current position and planned timeline for independent security testing."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: "Testing type", value: "External penetration testing (planned)" },
                { label: "Testing provider", value: "Not yet appointed" },
                { label: "Test date", value: "Not yet scheduled" },
                { label: "Test scope", value: "To be defined prior to engagement" },
                { label: "Current status", value: "Planned — not yet commenced" },
                {
                  label: "Availability",
                  value:
                    "Information will be published following formal verification.",
                },
              ].map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? "bg-panel" : "bg-panel/60"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-foreground w-48">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-muted">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="mt-8 rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm font-semibold text-foreground mb-2">
            Security Architecture
          </p>
          <p className="text-sm leading-7 text-muted">
            While independent testing is planned, Chameleon Eye AI is designed
            with security-first architecture including server-side key
            management, approval-based cloud processing, and local-first privacy
            options. See the Security Architecture page for details.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/trust/security" variant="primary">
            View Security Architecture
          </Button>
          <Button href="/trust/compliance-roadmap" variant="secondary">
            View Compliance Roadmap
          </Button>
          <Button href="/trust/compliance" variant="ghost">
            Back to Compliance
          </Button>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                SOC 2
              </h3>
              <p className="text-sm text-muted mb-4">
                SOC 2 readiness programme — in planning.
              </p>
              <Button href="/trust/compliance/soc-2" variant="secondary">
                View SOC 2 Status
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Responsible Disclosure
              </h3>
              <p className="text-sm text-muted mb-4">
                How to report a security vulnerability to Chameleon Eye AI.
              </p>
              <Button
                href="/trust/responsible-disclosure"
                variant="secondary"
              >
                View Disclosure Policy
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Security Architecture
              </h3>
              <p className="text-sm text-muted mb-4">
                How Chameleon Eye AI protects your data through design.
              </p>
              <Button href="/trust/security" variant="secondary">
                View Security
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
