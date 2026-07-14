import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Verified Trust Center — Chameleon Eye AI",
  description:
    "Chameleon Eye AI maintains verified security, privacy, and compliance documentation for businesses evaluating private AI intelligence.",
};

const trustCards = [
  {
    title: "SOC 2 Type II",
    status: "completed" as const,
    detail: "SOC 2 Type II report available under NDA to qualified customers.",
  },
  {
    title: "ISO/IEC 27001",
    status: "certified" as const,
    detail: "ISO/IEC 27001 certified information security management system.",
  },
  {
    title: "Penetration Testing",
    status: "completed" as const,
    detail:
      "Penetration testing completed. Customer-safe summary available on request.",
  },
  {
    title: "Data Processing Agreement",
    status: "available" as const,
    detail:
      "DPA available for qualified business customers and approved partners.",
  },
  {
    title: "No Customer Data Training",
    status: "published" as const,
    detail:
      "Customer private files, prompts, and business data are not used to train a public AI model.",
  },
  {
    title: "Local-First Privacy",
    status: "available" as const,
    detail:
      "Private Intelligence can run on the user's device when the local Chameleon Brain is installed.",
  },
  {
    title: "Cloud Approval Controls",
    status: "available" as const,
    detail:
      "Private content is not sent to cloud intelligence without user approval.",
  },
  {
    title: "Subprocessor Transparency",
    status: "published" as const,
    detail:
      "Active subprocessors and infrastructure providers are listed publicly.",
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
            Verified Trust Center
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI is designed for private predictive business intelligence,
            with verified security documentation, certified information security
            management, and clear controls for local, hybrid, and cloud
            intelligence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/trust/trust-pack" variant="primary">
              Request Trust Pack
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

      {/* Trust Proof Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Verified Security and Compliance"
          subtitle="Chameleon Eye AI maintains verified security documentation, certified information security management, and published privacy policies."
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

      {/* Note Box */}
      <section className="border-y border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm font-semibold text-gold mb-2">
              Document Availability
            </p>
            <p className="text-sm leading-7 text-muted">
              Some trust documents are public. Sensitive security reports and
              audit evidence may be shared only under NDA with qualified business
              customers or partners.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-8">
          <p className="text-base leading-8 text-foreground">
            Chameleon Eye AI maintains verified security,
            privacy, and compliance documentation for businesses evaluating
            private AI intelligence.
          </p>
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
                Compliance
              </h3>
              <p className="text-sm text-muted mb-4">
                SOC 2, ISO 27001, penetration testing, and DPA status.
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
                Data Retention
              </h3>
              <p className="text-sm text-muted mb-4">
                What is stored, where, and for how long.
              </p>
              <Button href="/trust/data-retention" variant="secondary">
                View Retention
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
                Trust Pack
              </h3>
              <p className="text-sm text-muted mb-4">
                Request security, privacy, and compliance documents.
              </p>
              <Button href="/trust/trust-pack" variant="secondary">
                Request Trust Pack
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="border-t border-white/8 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs leading-6 text-muted">
            Chameleon Eye AI is operated by Chameleon Eye. Trust documents are
            available to qualified customers and partners through the Trust Pack
            request process.
          </p>
        </div>
      </section>
    </>
  );
}
