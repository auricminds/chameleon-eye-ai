import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusChip } from "@/components/trust/StatusChip";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Private vs Cloud Intelligence — Chairman AI",
  description:
    "Understanding where your data goes — and when. Compare private local intelligence with cloud intelligence mode.",
};

const localFeatures = [
  "Runs on your device when desktop app is installed",
  "No cloud AI request",
  "No network call for analysis",
  "No provider processing",
  "File content stays on device",
  "Strongest privacy option",
];

const cloudFeatures = [
  "Used only for selected requests",
  "May use approved third-party AI infrastructure",
  "Selected text may be sent after your explicit consent",
  "Your full private archive is not sent automatically",
  "Token count and cost tracked for billing",
  "Raw prompts not stored by default",
];

const comparisonRows = [
  {
    feature: "Data leaves device",
    local: "Never",
    cloud: "Selected text only (with consent)",
    localGood: true,
  },
  {
    feature: "Speed",
    local: "Depends on device",
    cloud: "Fast",
    localGood: false,
  },
  {
    feature: "Requires internet",
    local: "No",
    cloud: "Yes",
    localGood: true,
  },
  {
    feature: "File content sent",
    local: "Never",
    cloud: "Never (only selected text)",
    localGood: true,
  },
  {
    feature: "Response stored",
    local: "No",
    cloud: "No (by default)",
    localGood: true,
  },
  {
    feature: "Best for",
    local: "Sensitive documents, confidential data",
    cloud: "Complex analysis, large context",
    localGood: null,
  },
];

export default function LocalVsCloudPage() {
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
            Private Intelligence vs Cloud Intelligence
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Understanding where your data goes — and when.
          </p>
        </div>
      </section>

      {/* Two column cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Local */}
          <Card className="border-emerald/20">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Private Intelligence</h2>
                <p className="text-sm text-muted mt-1">Local processing on your device</p>
              </div>
              <StatusChip status="implemented" />
            </div>
            <ul className="space-y-3">
              {localFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 text-emerald shrink-0">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/8">
              <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald">
                Available with Desktop App
              </span>
            </div>
          </Card>

          {/* Cloud */}
          <Card className="border-gold/20">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Cloud Intelligence</h2>
                <p className="text-sm text-muted mt-1">Consent-gated cloud processing</p>
              </div>
              <StatusChip status="implemented" />
            </div>
            <ul className="space-y-3">
              {cloudFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 text-gold shrink-0">~</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/8">
              <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                Available (consent required)
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Side-by-Side Comparison"
            subtitle="Key differences between private local and cloud intelligence modes."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-panel2">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-emerald">Private Local</th>
                  <th className="px-4 py-3 text-left font-semibold text-gold">Cloud Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-panel" : "bg-panel/60"}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                    <td className={`px-4 py-3 ${row.localGood === true ? "text-emerald" : "text-muted"}`}>
                      {row.local}
                    </td>
                    <td className={`px-4 py-3 ${row.localGood === false ? "text-emerald" : "text-muted"}`}>
                      {row.cloud}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4">
          <Button href="/local-mode" variant="primary">
            Learn About Local Mode
          </Button>
          <Button href="/settings/privacy" variant="secondary">
            Privacy Settings
          </Button>
          <Button href="/trust/data-retention" variant="ghost">
            Data Retention Policy
          </Button>
        </div>
      </section>
    </>
  );
}
