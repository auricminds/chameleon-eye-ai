import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Subprocessors — Chameleon Eye AI",
  description:
    "Active subprocessors and infrastructure providers for Chameleon Eye AI by Chameleon Eye.",
};

const subprocessors = [
  {
    provider: "OpenRouter",
    purpose: "Cloud AI routing",
    data: "Approved cloud request text only",
    retention: "Per OpenRouter usage policy",
    status: "Active",
  },
  {
    provider: "Stripe",
    purpose: "Subscriptions and billing",
    data: "Billing metadata and payment status",
    retention: "Per Stripe retention policy",
    status: "Active",
  },
  {
    provider: "Supabase",
    purpose: "Authentication and database",
    data: "Account and application data",
    retention: "Per data retention policy",
    status: "Active",
  },
  {
    provider: "Vercel",
    purpose: "Hosting and deployment",
    data: "Application hosting and deployment logs",
    retention: "Per Vercel retention policy",
    status: "Active",
  },
  {
    provider: "OpenAI",
    purpose: "Cloud AI processing (if used)",
    data: "Approved request text only",
    retention: "Per OpenAI API usage policy",
    status: "Planned",
  },
  {
    provider: "Anthropic",
    purpose: "Cloud AI processing (if used)",
    data: "Approved request text only",
    retention: "Per Anthropic API usage policy",
    status: "Planned",
  },
  {
    provider: "Google Cloud",
    purpose: "Cloud AI processing or hosting (if used)",
    data: "Approved request text only",
    retention: "Per Google Cloud policy",
    status: "Planned",
  },
];

export default function SubprocessorsPage() {
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
            Subprocessors
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Active and planned subprocessors and infrastructure providers for
            Chameleon Eye AI by Chameleon Eye.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Subprocessors"
          subtitle="Third-party services engaged by Chameleon Eye on behalf of Chameleon Eye AI customers."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Provider
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Data Processed
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Retention Notes
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {subprocessors.map((sp, i) => (
                <tr
                  key={sp.provider}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? "bg-panel" : "bg-panel/60"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {sp.provider}
                  </td>
                  <td className="px-4 py-3 text-muted">{sp.purpose}</td>
                  <td className="px-4 py-3 text-muted">{sp.data}</td>
                  <td className="px-4 py-3 text-muted">{sp.retention}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        sp.status === "Active"
                          ? "border-emerald/30 bg-emerald/10 text-emerald"
                          : "border-gold/30 bg-gold/10 text-gold"
                      }`}
                    >
                      {sp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notice */}
        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Subprocessor Changes
          </p>
          <p className="text-sm leading-7 text-muted">
            Providers marked Active are currently in use. Providers marked
            Planned may be added as the platform evolves. Material changes will
            be reflected on this page.
          </p>
        </div>
      </section>
    </>
  );
}
