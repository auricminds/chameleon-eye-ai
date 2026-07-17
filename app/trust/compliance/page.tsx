import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Compliance — Chameleon Eye AI",
  description:
    "Chameleon Eye AI compliance status. SOC 2 readiness, ISO 27001 preparation, security testing, and DPA status.",
};

const complianceRows = [
  {
    area: "SOC 2",
    status: "in_planning" as const,
    evidence: "SOC 2 readiness programme — in planning",
    availability: "Planned prior to commercial launch",
    href: "/trust/compliance/soc-2",
  },
  {
    area: "ISO/IEC 27001",
    status: "in_planning" as const,
    evidence: "ISO 27001 preparation — in planning",
    availability: "Planned following commercial launch",
    href: "/trust/compliance/iso-27001",
  },
  {
    area: "Independent Security Testing",
    status: "planned" as const,
    evidence: "External penetration testing — planned",
    availability: "Planned before public commercial launch",
    href: "/trust/penetration-testing",
  },
  {
    area: "Data Processing Agreement",
    status: "available" as const,
    evidence: "DPA available on request",
    availability: "On request for enterprise customers",
    href: "/trust/dpa",
  },
  {
    area: "Subprocessor List",
    status: "published" as const,
    evidence: "Public subprocessor page",
    availability: "Public",
    href: "/trust/subprocessors",
  },
  {
    area: "No-Training Policy",
    status: "published" as const,
    evidence: "Public policy",
    availability: "Public",
    href: "/trust/no-training-policy",
  },
  {
    area: "Responsible Disclosure",
    status: "published" as const,
    evidence: "Public reporting process",
    availability: "Public",
    href: "/trust/responsible-disclosure",
  },
];

export default function CompliancePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Trust Center
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Compliance
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI compliance status and availability for qualified
            customers and partners.
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Early-Stage Product Notice
          </p>
          <p className="text-sm leading-7 text-muted">
            Chameleon Eye AI is an early-stage product. SOC 2 and ISO 27001
            certifications are planned and have not yet been completed.
            Independent security testing is planned before public commercial
            launch. Published policies and DPA are available now. Full
            certification details will be published following formal
            verification.
          </p>
        </div>
      </section>

      {/* Compliance Table */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Compliance Status"
          subtitle="Current status across all compliance areas."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Area
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Availability
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {complianceRows.map((row, i) => (
                <tr
                  key={row.area}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? "bg-panel" : "bg-panel/60"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.area}
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-muted">{row.evidence}</td>
                  <td className="px-4 py-3 text-muted">{row.availability}</td>
                  <td className="px-4 py-3">
                    <a
                      href={row.href}
                      className="text-xs text-emerald hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sub-pages */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Compliance Detail Pages"
            subtitle="Detailed information for each compliance area."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                SOC 2
              </h3>
              <p className="text-sm text-muted mb-4">
                SOC 2 readiness programme status and planned timeline.
              </p>
              <Button href="/trust/compliance/soc-2" variant="secondary">
                View SOC 2 Status
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                ISO/IEC 27001
              </h3>
              <p className="text-sm text-muted mb-4">
                ISO 27001 preparation status and planned timeline.
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
                Data Processing Agreement
              </h3>
              <p className="text-sm text-muted mb-4">
                DPA coverage, status, and request process.
              </p>
              <Button href="/trust/dpa" variant="secondary">
                View DPA
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Subprocessors
              </h3>
              <p className="text-sm text-muted mb-4">
                Active subprocessors and infrastructure providers.
              </p>
              <Button href="/trust/subprocessors" variant="secondary">
                View Subprocessors
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
