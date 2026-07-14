import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Privacy — Chairman AI Trust Center",
  description:
    "How Chairman AI handles your data across local, hybrid, and cloud modes. No customer-data training, DPA available, and clear user controls.",
};

const dataModes = [
  {
    number: "1",
    title: "Local Private Mode",
    color: "border-emerald/30 bg-emerald/5",
    titleColor: "text-emerald",
    description:
      "Private Intelligence can run on the user's device when the local Chairman Brain is installed.",
    details: [
      "Documents and files never leave your device",
      "Processing happens locally using on-device capabilities",
      "No network call is made for intelligence tasks",
      "No Chairmans Holding account required for local-only use",
    ],
  },
  {
    number: "2",
    title: "Hybrid Approval Mode",
    color: "border-gold/30 bg-gold/5",
    titleColor: "text-gold",
    description:
      "Only selected text is sent to cloud intelligence after user approval.",
    details: [
      "Local files remain on-device",
      "Only the text you select and approve is transmitted",
      "Cloud consent gate shown before every cloud request",
      "Approved text is processed and not retained by default",
    ],
  },
  {
    number: "3",
    title: "Cloud / API Mode",
    color: "border-white/15 bg-panel2",
    titleColor: "text-foreground",
    description:
      "Cloud intelligence is processed through Chairman API and approved AI routes.",
    details: [
      "Requests route through the Chairman API server-side",
      "Provider keys are never exposed to the client",
      "Data isolation enforced at the workspace level",
      "No raw prompts stored by default",
    ],
  },
];

const weCollect = [
  { item: "Account email address", reason: "Authentication" },
  { item: "Billing metadata", reason: "Plan management and legal compliance" },
  {
    item: "Usage counters (token counts, mode, status)",
    reason: "Plan enforcement and billing",
  },
  {
    item: "Anonymised website events",
    reason: "Product improvement (opt-out available)",
  },
  { item: "Support messages", reason: "Issue resolution" },
  { item: "Audit log metadata (no content)", reason: "Security and owner review" },
];

const weDoNotCollect = [
  "Raw prompts or queries",
  "AI model responses",
  "Local file content",
  "Behavioural profiles for advertising",
  "Data for third-party ad targeting",
  "Personal data for model training",
];

const userControls = [
  { label: "Cloud consent history", href: null },
  { label: "Data export request", href: "/trust/data-deletion" },
  { label: "Data deletion request", href: "/trust/data-deletion" },
  { label: "Privacy settings", href: "/settings/privacy" },
  { label: "Local-first options", href: "/local-mode" },
];

export default function TrustPrivacyPage() {
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
            Privacy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            How Chairman AI handles your data across all modes — and what we
            never do with it.
          </p>
        </div>
      </section>

      {/* DPA Available */}
      <section className="border-b border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald mb-2">
                Data Processing Agreement Available
              </p>
              <p className="text-sm leading-7 text-muted">
                A Data Processing Agreement is available for qualified business
                customers and approved partners.
              </p>
            </div>
            <Button href="/trust/dpa" variant="secondary">
              Request DPA
            </Button>
          </div>
        </div>
      </section>

      {/* No-Training */}
      <section className="border-b border-white/8 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
            <p className="text-sm font-semibold text-emerald mb-2">
              No Customer-Data Training
            </p>
            <p className="text-sm leading-7 text-muted">
              Chairman AI does not use customer private files, prompts, or
              business data to train a public AI model.
            </p>
            <div className="mt-4">
              <Button href="/trust/no-training-policy" variant="secondary">
                Read the No-Training Policy
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Data Modes */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Local / Hybrid / Cloud Processing"
          subtitle="Chairman AI operates across three privacy modes. You choose how much reaches the cloud."
          align="left"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {dataModes.map((mode) => (
            <div
              key={mode.title}
              className={`rounded-2xl border p-6 ${mode.color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-2xl font-bold ${mode.titleColor}`}>
                  {mode.number}
                </span>
                <h3 className={`text-base font-semibold ${mode.titleColor}`}>
                  {mode.title}
                </h3>
              </div>
              <p className="text-sm leading-7 text-muted mb-4">
                {mode.description}
              </p>
              <ul className="space-y-2">
                {mode.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm text-muted">
                    <span className="mt-1 text-emerald shrink-0">+</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* What We Collect vs What We Don't */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What We Collect vs What We Don't"
            subtitle="A direct summary of data categories."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="text-base font-semibold text-foreground mb-4">
                What We Collect
              </h3>
              <div className="space-y-3">
                {weCollect.map((row) => (
                  <div
                    key={row.item}
                    className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {row.item}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{row.reason}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-base font-semibold text-foreground mb-4">
                What We Do Not Collect
              </h3>
              <ul className="space-y-3">
                {weDoNotCollect.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="mt-1 text-gold shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* User Controls */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="User Controls"
          subtitle="Tools and settings available to manage your data."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {userControls.map((ctrl) => (
            <div
              key={ctrl.label}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
            >
              <span className="text-emerald shrink-0">+</span>
              {ctrl.href ? (
                <a
                  href={ctrl.href}
                  className="text-sm text-foreground hover:text-emerald transition-colors"
                >
                  {ctrl.label}
                </a>
              ) : (
                <span className="text-sm text-foreground">{ctrl.label}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Privacy Questions
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                Contact the privacy team for questions about data handling.
              </p>
            </div>
            <Button href="mailto:privacy@chairmans.uk" variant="primary">
              privacy@chairmans.uk
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/trust/data-retention" variant="secondary">
              Data Retention Policy
            </Button>
            <Button href="/trust/no-training-policy" variant="ghost">
              No-Training Policy
            </Button>
            <Button href="/trust/data-deletion" variant="ghost">
              Data Deletion
            </Button>
            <Button href="/settings/privacy" variant="ghost">
              Privacy Settings
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
