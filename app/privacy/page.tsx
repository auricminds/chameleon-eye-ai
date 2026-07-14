import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Privacy — Chameleon Eye AI",
  description:
    "Privacy controls, local-first mode, no-training policy, and data handling for Chameleon Eye AI.",
};

const processingModes = [
  {
    title: "Offline Local Mode",
    detail:
      "Sensitive files can remain on the user's device. No third-party AI API is contacted in offline local mode.",
    color: "border-emerald/20",
    titleColor: "text-emerald",
  },
  {
    title: "Hybrid Approval Mode",
    detail:
      "Only selected text or approved summaries are sent to cloud intelligence after user approval.",
    color: "",
    titleColor: "text-foreground",
  },
  {
    title: "Private Cloud / ZDR Route",
    detail:
      "Cloud processing through an approved privacy route where zero data retention is contracted. Request is blocked if route is unavailable.",
    color: "border-gold/20",
    titleColor: "text-gold",
  },
  {
    title: "Standard Cloud / API Mode",
    detail:
      "Cloud intelligence is processed through Chameleon Eye API and approved AI routes.",
    color: "border-blue-500/20",
    titleColor: "text-blue-400",
  },
];

const customerControls = [
  { label: "Cloud consent history", href: null },
  { label: "Data export request", href: "/trust/data-retention" },
  { label: "Data deletion request", href: "/trust/data-retention" },
  { label: "Workspace privacy settings", href: "/settings/privacy" },
  { label: "Device revocation", href: null },
  { label: "Local file controls", href: null },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Privacy
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Privacy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI is designed for private predictive business
            intelligence. Your data stays under your control.
          </p>
        </div>
      </section>

      {/* A. No Customer Data Training */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="No Customer Data Training"
          subtitle="A core commitment of Chameleon Eye AI."
          align="left"
        />
        <div className="mt-8 rounded-2xl border border-emerald/20 bg-emerald/5 p-8">
          <p className="text-base leading-8 text-foreground font-semibold">
            Chameleon Eye AI does not use customer private files, prompts, or
            business data to train a public AI model.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Customer content is used only to generate the requested output.
            This applies across all processing modes.
          </p>
        </div>
      </section>

      {/* B. Processing Modes */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Processing Modes"
            subtitle="Chameleon Eye AI operates across four privacy modes. You choose how much reaches the cloud."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {processingModes.map((mode) => (
              <Card key={mode.title} className={mode.color}>
                <h3 className={`text-base font-semibold ${mode.titleColor}`}>
                  {mode.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {mode.detail}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* C. Customer Controls */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Customer Controls"
          subtitle="Controls available to customers over their data and privacy settings."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {customerControls.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-panel px-4 py-3"
            >
              <span className="text-sm text-foreground">{item.label}</span>
              {item.href && (
                <a
                  href={item.href}
                  className="text-xs text-emerald hover:underline shrink-0"
                >
                  View →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Regulated / Sensitive Data Warning */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Regulated / Sensitive Data Warning"
            subtitle="Customer responsibility for regulated data categories."
            align="left"
          />
          <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm font-semibold text-gold mb-2">
              Important Notice
            </p>
            <p className="text-sm leading-7 text-muted">
              Customers should not process regulated medical, financial, legal,
              or highly sensitive personal data through cloud analysis unless
              they have verified the applicable contractual, legal, and
              compliance requirements for their use case.
            </p>
          </div>
        </div>
      </section>

      {/* D. DPA Available */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Data Processing Agreement"
          subtitle="Available for business customers and approved partners."
          align="left"
        />
        <div className="mt-8 rounded-2xl border border-white/8 bg-panel p-6 max-w-2xl">
          <p className="text-sm leading-7 text-muted">
            A Data Processing Agreement is available for qualified business
            customers and approved partners.
          </p>
          <div className="mt-6">
            <Button href="/trust/dpa" variant="secondary">
              Request DPA
            </Button>
          </div>
        </div>
      </section>

      {/* E. Data Retention */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Data Retention"
            subtitle="What is stored, where, and for how long."
            align="left"
          />
          <div className="mt-8 rounded-2xl border border-white/8 bg-panel p-6 max-w-2xl">
            <p className="text-sm leading-7 text-muted">
              Chameleon Eye AI stores only the minimum data required for your
              workspace to function. Raw private content is not stored by default.
              Usage metadata may be retained for billing, abuse prevention, and
              audit integrity.
            </p>
            <div className="mt-6">
              <Button href="/trust/data-retention" variant="secondary">
                View Full Data Retention Table
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer links */}
      <section className="border-t border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button href="/trust" variant="secondary">
              View Trust Center
            </Button>
            <Button href="/security" variant="ghost">
              Security Architecture
            </Button>
            <Button href="/trust/trust-pack" variant="ghost">
              Request Trust Pack
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
