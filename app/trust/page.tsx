import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Trust Center — Chameleon Eye AI",
  description:
    "Chameleon Eye AI trust center. Security architecture, privacy controls, compliance roadmap, and published policies.",
};

const trustCards = [
  {
    title: "Offline / Local Mode",
    status: "available" as const,
    detail:
      "Sensitive files can remain on-device. No third-party AI API is contacted in offline local mode.",
  },
  {
    title: "Hybrid Approval Mode",
    status: "available" as const,
    detail:
      "Only selected text or approved summaries are sent to cloud intelligence after user approval.",
  },
  {
    title: "SOC 2",
    status: "in_planning" as const,
    detail: "SOC 2 readiness programme — in planning. Not yet certified.",
  },
  {
    title: "ISO/IEC 27001",
    status: "in_planning" as const,
    detail: "ISO 27001 preparation — in planning. Not yet certified.",
  },
  {
    title: "Independent Security Testing",
    status: "planned" as const,
    detail: "External security testing planned before public commercial launch.",
  },
  {
    title: "Data Processing Agreement",
    status: "available" as const,
    detail:
      "DPA available on request for qualified business customers and approved partners.",
  },
  {
    title: "No Customer Data Training",
    status: "published" as const,
    detail:
      "Customer private files, prompts, and business data are not used to train a public AI model.",
  },
  {
    title: "Vulnerability Disclosure",
    status: "published" as const,
    detail: "Responsible disclosure process published for security reports.",
  },
];

export default function TrustPage() {
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
            Trust Center
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI is designed for private predictive business
            intelligence, with local-first privacy options, approval-based cloud
            processing, and published policies. Compliance certifications are
            planned as part of the path to commercial launch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/trust/compliance-roadmap" variant="primary">
              View Compliance Roadmap
            </Button>
            <Button href="/trust/security" variant="secondary">
              View Security Architecture
            </Button>
            <Button href="/trust/compliance" variant="ghost">
              View Compliance Status
            </Button>
            <Button href="/trust/data-retention" variant="ghost">
              View Data Retention
            </Button>
          </div>
        </div>
      </section>

      {/* Early-Stage Notice */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Early-Stage Product
          </p>
          <p className="text-sm leading-7 text-muted">
            Chameleon Eye AI is an early-stage product. SOC 2 and ISO 27001
            certifications are in planning and have not yet been completed.
            Independent security testing is planned before public commercial
            launch. Published policies and DPA are available now.
          </p>
        </div>
      </section>

      {/* Trust Status Cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionTitle
          title="Security and Compliance Status"
          subtitle="Current status across privacy controls, compliance programmes, and published policies."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card) => (
            <Card key={card.title} hover>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {card.title}
                </h3>
                <StatusChip status={card.status} />
              </div>
              <p className="text-sm leading-7 text-muted">{card.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Statement */}
      <section className="border-y border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-8">
            <p className="text-base leading-8 text-foreground">
              Chameleon Eye AI maintains published security and privacy policies,
              local-first data controls, and approval-based cloud processing.
              Compliance certifications are planned as part of the path toward
              commercial launch.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Trust Documentation"
            subtitle="Public and request-only trust resources."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Compliance Status
              </h3>
              <p className="text-sm text-muted mb-4">
                SOC 2, ISO 27001, security testing, and DPA status.
              </p>
              <Button href="/trust/compliance" variant="secondary">
                View Compliance
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Security Architecture
              </h3>
              <p className="text-sm text-muted mb-4">
                How Chameleon Eye AI protects your data through architecture and
                access controls.
              </p>
              <Button href="/trust/security" variant="secondary">
                View Security
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Privacy
              </h3>
              <p className="text-sm text-muted mb-4">
                Data modes, no-training policy, and user controls.
              </p>
              <Button href="/trust/privacy" variant="secondary">
                View Privacy
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Compliance Roadmap
              </h3>
              <p className="text-sm text-muted mb-4">
                Where Chameleon Eye AI is today and the planned certification
                path.
              </p>
              <Button href="/trust/compliance-roadmap" variant="secondary">
                View Roadmap
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
                Data Retention
              </h3>
              <p className="text-sm text-muted mb-4">
                What is stored, where, and for how long.
              </p>
              <Button href="/trust/data-retention" variant="secondary">
                View Retention
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="border-t border-white/8 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs leading-6 text-muted">
            Chameleon Eye AI is operated by Chameleon Eye. This is an
            early-stage product. Full compliance certifications are planned
            prior to commercial launch. Published policies and DPA are available
            now.
          </p>
        </div>
      </section>
    </>
  );
}
