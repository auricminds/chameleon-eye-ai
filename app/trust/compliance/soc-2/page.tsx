import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "SOC 2 Readiness — Chameleon Eye AI",
  description:
    "Chameleon Eye AI SOC 2 readiness programme status and planned audit timeline.",
};

export default function Soc2Page() {
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
              SOC 2
            </h1>
            <StatusChip status="in_planning" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI is planning a SOC 2 readiness programme. A formal
            audit will be commissioned as the platform moves toward commercial
            launch.
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
            Chameleon Eye AI does not currently hold a SOC 2 Type I or Type II
            report. SOC 2 readiness activities are planned prior to commercial
            launch. Any enterprise requirements for a SOC 2 report can be
            discussed as part of an enterprise scoping conversation.
          </p>
        </div>
      </section>

      {/* Status Table */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="SOC 2 Readiness Status"
          subtitle="Current position and planned timeline for SOC 2 compliance."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: "Report type", value: "SOC 2 Type II (planned)" },
                { label: "Operating company", value: "Chameleon Eye" },
                { label: "Product covered", value: "Chameleon Eye AI / Chameleon Eye API" },
                { label: "Auditor", value: "Not yet appointed — to be selected prior to audit" },
                { label: "Report period", value: "Not yet commenced" },
                { label: "Current status", value: "In planning — readiness activities not yet started" },
                {
                  label: "Availability",
                  value: "Information will be published following formal verification.",
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
                ISO/IEC 27001
              </h3>
              <p className="text-sm text-muted mb-4">
                ISO 27001 preparation — in planning.
              </p>
              <Button href="/trust/compliance/iso-27001" variant="secondary">
                View ISO 27001 Status
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Security Testing
              </h3>
              <p className="text-sm text-muted mb-4">
                Independent security testing — planned before commercial launch.
              </p>
              <Button href="/trust/penetration-testing" variant="secondary">
                View Testing Status
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
