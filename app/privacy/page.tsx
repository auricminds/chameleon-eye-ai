import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Privacy Mode and Data Control",
  description:
    "How Chameleon Eye AI handles local data, cloud analysis, and user control over what is shared.",
};

const localData = [
  "Local demo workspace data",
  "Local setup and configuration data",
  "Local notes and annotations",
  "Local file previews (where supported)",
  "Desktop and local gateway workflows when available",
];

const cloudData = [
  "Chat prompts and queries you submit",
  "Selected document text you choose to analyze",
  "Selected uploaded files you approve for analysis",
  "Connected system data — only after connector approval",
];

const userControls = [
  { label: "Choose what to upload, connect, and analyze", status: "implemented" as const },
  { label: "Local-first file preview", status: "implemented" as const },
  { label: "Approval-based cloud analysis", status: "implemented" as const },
  { label: "No hidden browser AI provider calls", status: "implemented" as const },
  { label: "Export data controls", status: "planned" as const },
  { label: "Delete data controls", status: "planned" as const },
  { label: "Enterprise data retention settings", status: "enterprise" as const },
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
            Privacy Mode and Data Control
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon is built on a local-first principle. Sensitive data stays
            on your device by default. Cloud analysis is used only when you
            explicitly approve sending content through Chameleon-controlled
            routes.
          </p>
        </div>
      </section>

      {/* Privacy Mode Explanation */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Privacy Mode Explained"
          subtitle="Local first, cloud only with your approval."
          align="left"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="border-emerald/20">
            <h3 className="text-base font-semibold text-emerald">Local</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Data stays on your device. No network call is made for file
              preview, local workspace data, or setup configuration. Privacy
              mode prioritizes local processing wherever technically possible.
            </p>
          </Card>
          <Card>
            <h3 className="text-base font-semibold text-foreground">
              Cloud with Approval
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              When you choose to analyze a document or send a prompt, that
              content travels through Chameleon-controlled backend routes only.
              The browser does not contact external AI infrastructure directly.
            </p>
          </Card>
          <Card className="border-blue-500/20">
            <h3 className="text-base font-semibold text-blue-400">
              Enterprise Private
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Enterprise clients can discuss private deployment options, custom
              storage configurations, and routing policies that keep all data
              within their own infrastructure. Scope and availability depend on
              implementation.
            </p>
          </Card>
        </div>
      </section>

      {/* Local Data */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                title="What Stays Local"
                subtitle="Data that does not leave your device."
                align="left"
              />
              <ul className="mt-8 space-y-3">
                {localData.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-muted">
                    <span className="mt-1 shrink-0 text-emerald">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTitle
                title="What Goes to Cloud"
                subtitle="Data sent only when you actively choose to analyze or connect."
                align="left"
              />
              <ul className="mt-8 space-y-3">
                {cloudData.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-muted">
                    <span className="mt-1 shrink-0 text-gold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* User Controls */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="User Data Controls"
          subtitle="What you can control now and what is coming."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {userControls.map((item) => (
            <Card key={item.label} className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground">{item.label}</span>
              <StatusChip status={item.status} />
            </Card>
          ))}
        </div>
      </section>

      {/* No hidden calls */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="border-emerald/20 max-w-3xl">
            <h2 className="text-base font-semibold text-foreground">
              No hidden browser AI provider calls
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Chameleon&apos;s architecture ensures that all AI analysis goes through
              Chameleon-controlled backend routes. The browser does not make
              direct calls to external AI providers. AI infrastructure keys are
              never placed in frontend environment variables or client bundles.
              You can verify this by inspecting the browser&apos;s network tab — you
              will see only calls to Chameleon backend routes.
            </p>
          </Card>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/local-mode" variant="secondary">
              Local-First Mode Details
            </Button>
            <Button href="/security" variant="ghost">
              Security Architecture
            </Button>
            <Button href="/trust" variant="ghost">
              Trust Center
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
