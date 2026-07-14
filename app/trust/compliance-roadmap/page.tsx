import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Compliance Roadmap — Chairman AI",
  description:
    "Where Chairman is today and where it is going on security, privacy, and compliance.",
};

const current = [
  "Local-first private mode",
  "Server-side AI key protection",
  "User cloud consent (in progress)",
  "Usage and audit logging",
  "Data retention policy published",
  "Responsible disclosure process",
];

const inProgress = [
  "Legal review of Privacy Policy",
  "Legal review of Terms of Service",
  "DPA template preparation",
  "Security headers hardening",
];

const next = [
  "Security whitepaper publication",
  "Penetration test (external)",
  "SOC 2 readiness assessment",
  "ISO 27001 readiness assessment",
];

const enterprise = [
  "SOC 2 Type II audit",
  "ISO 27001 certification",
  "Custom DPA",
  "Private deployment agreement",
];

export default function ComplianceRoadmapPage() {
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
            Compliance Roadmap
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Where Chairman is today and where it is going.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">Important Notice</p>
          <p className="text-sm leading-7 text-muted">
            Chairman is not currently SOC 2 certified, ISO 27001 certified, HIPAA compliant, or
            GDPR certified. This roadmap represents intentions, not completed certifications. Use
            of Chairman for regulated-data processing requires your own legal and compliance review.
          </p>
        </div>
      </section>

      {/* Roadmap Sections */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Current */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-foreground">Current</h2>
              <StatusChip status="implemented" />
            </div>
            <ul className="space-y-3">
              {current.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-emerald shrink-0">+</span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* In Progress */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-foreground">In Progress</h2>
              <StatusChip status="planned" />
            </div>
            <ul className="space-y-3">
              {inProgress.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-gold shrink-0">~</span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Next */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-foreground">Next</h2>
              <StatusChip status="planned" />
            </div>
            <ul className="space-y-3">
              {next.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-gold shrink-0">→</span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Enterprise */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-foreground">Enterprise</h2>
              <StatusChip status="enterprise" />
            </div>
            <ul className="space-y-3">
              {enterprise.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-blue-400 shrink-0">◆</span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted border-t border-white/8 pt-4">
              Enterprise compliance options are available upon request. Contact the Chairman team
              to discuss your specific requirements and timeline.
            </p>
          </Card>
        </div>
      </section>

      {/* Additional Context */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="SOC 2 Preparation"
            subtitle="Our approach to security audit readiness."
            align="left"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Card>
              <h3 className="text-sm font-semibold text-foreground">Readiness Assessment</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Chairman is planning an external SOC 2 readiness assessment. This will identify
                gaps between current controls and SOC 2 Trust Services Criteria.
              </p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-foreground">No Current Certification</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Chairman does not currently hold a SOC 2 Type I or Type II report. Any claims of
                SOC 2 compliance should be verified directly with the Chairman team.
              </p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-foreground">Enterprise Path</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Enterprise customers requiring SOC 2 Type II reports can discuss timeline and
                scope with the Chairman team as part of an enterprise engagement.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
