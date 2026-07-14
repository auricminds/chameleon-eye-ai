import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Local-First and Private Mode",
  description:
    "How Chameleon Eye AI supports local-first workflows to keep sensitive files on your device.",
};

const localItems = [
  "Desktop app installation and activation",
  "Local workspace cache and session data",
  "Local file preview — view documents without sending to cloud",
  "Local setup and configuration data",
  "Business DNA profile stored locally where supported",
];

const cloudItems = [
  "Prompts and queries you choose to submit",
  "Approved file excerpts you select for analysis",
  "Approved connector data — only after you authorize the connection",
  "Report generation requests",
];

const enterpriseItems = [
  "Private infrastructure deployment",
  "Private storage configuration",
  "Custom intelligence routing controls",
  "Data residency controls",
  "Enterprise audit logging",
];

const tiers = [
  {
    name: "Local",
    color: "border-emerald/30 bg-emerald/5",
    labelColor: "text-emerald",
    items: localItems,
  },
  {
    name: "Cloud with Approval",
    color: "border-white/15 bg-panel",
    labelColor: "text-foreground",
    items: cloudItems,
  },
  {
    name: "Enterprise",
    color: "border-blue-500/30 bg-blue-500/5",
    labelColor: "text-blue-400",
    items: enterpriseItems,
  },
];

export default function LocalModePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Local Mode
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Local-First and Private Mode
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon supports local-first workflows. The goal is to keep
            sensitive files and workspace data on your device wherever possible,
            sending only approved content for cloud analysis when you choose to.
          </p>
        </div>
      </section>

      {/* Principle */}
      <section className="border-b border-white/8 bg-panel/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="border-emerald/20 max-w-3xl">
            <p className="text-sm leading-7 text-foreground">
              <strong className="text-emerald">Local-first means</strong> the
              default assumption is that your data stays on your device. Cloud
              analysis is opt-in per session, per document, and per prompt —
              never automatic. You choose what leaves your device and when.
            </p>
          </Card>
        </div>
      </section>

      {/* Three tiers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Three Data Tiers"
          subtitle="Understanding where your data lives at each stage of Chameleon usage."
          align="left"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.color}>
              <h3 className={`text-base font-semibold ${tier.labelColor}`}>
                {tier.name}
              </h3>
              <ul className="mt-5 space-y-3">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-7 text-muted">
                    <span className={`mt-1 shrink-0 ${tier.labelColor}`}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Desktop connector */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Desktop App and Local Gateway"
            subtitle="The desktop connector extends local-first capabilities beyond the browser."
            align="left"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Secure device activation", desc: "Desktop clients activate with short-lived tokens — not master keys." },
              { label: "Local file processing", desc: "Files can be previewed and partially processed without leaving the device." },
              { label: "Token refresh", desc: "Sessions stay active without re-authentication using secure token refresh." },
              { label: "Device revocation", desc: "Devices can be revoked from the platform, immediately terminating their access." },
            ].map((f) => (
              <Card key={f.label} hover>
                <h3 className="text-sm font-semibold text-foreground">{f.label}</h3>
                <p className="mt-2 text-xs leading-6 text-muted">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          <Button href="/privacy" variant="secondary">
            Privacy and Data Control
          </Button>
          <Button href="/enterprise" variant="ghost">
            Enterprise Private Mode
          </Button>
          <Button href="/trust" variant="ghost">
            Trust Center
          </Button>
        </div>
      </section>
    </>
  );
}
