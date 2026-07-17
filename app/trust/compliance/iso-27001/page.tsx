import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "ISO/IEC 27001 Preparation — Chameleon Eye AI",
  description:
    "Chameleon Eye AI ISO/IEC 27001 preparation status and planned certification timeline.",
};

export default function Iso27001Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Compliance
          </p>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              ISO/IEC 27001
            </h1>
            <StatusChip status="in_planning" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            ISO/IEC 27001 preparation is planned following commercial launch of
            Chameleon Eye AI.
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
            Chameleon Eye AI does not currently hold an ISO/IEC 27001
            certificate. ISO 27001 certification preparation is planned
            following commercial launch. Information will be published
            following formal verification.
          </p>
        </div>
      </section>

      {/* Status Table */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="ISO/IEC 27001 Preparation Status"
          subtitle="Current position and planned timeline for ISO 27001 certification."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: "Standard", value: "ISO/IEC 27001" },
                { label: "Operating company", value: "Chameleon Eye" },
                { label: "Certified scope", value: "Not yet certified — preparation planned" },
                { label: "Certificate number", value: "Information will be published following formal verification." },
                { label: "Certification body", value: "Not yet selected" },
                { label: "Issue date", value: "Not yet certified" },
                { label: "Current status", value: "In planning — preparation not yet commenced" },
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

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact" variant="primary">
            Discuss Enterprise Requirements
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
                Security Architecture
              </h3>
              <p className="text-sm text-muted mb-4">
                How Chameleon Eye AI protects your data through architecture.
              </p>
              <Button href="/trust/security" variant="secondary">
                View Security
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Compliance Roadmap
              </h3>
              <p className="text-sm text-muted mb-4">
                Where Chameleon Eye AI is today and where it is going.
              </p>
              <Button href="/trust/compliance-roadmap" variant="secondary">
                View Roadmap
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
