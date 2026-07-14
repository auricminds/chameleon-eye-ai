import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Subprocessors — Chairman AI",
  description:
    "Third parties that may process data on Chairman's behalf. Our subprocessor list and privacy commitments.",
};

const subprocessors = [
  {
    name: "Cloud AI infrastructure provider",
    category: "AI processing",
    purpose: "Cloud intelligence requests",
    data: "Selected text (with consent)",
    policy: "Linked when confirmed",
  },
  {
    name: "Payment processor",
    category: "Billing",
    purpose: "Subscription and payment",
    data: "Billing data",
    policy: "Standard payment processor policy",
  },
  {
    name: "Email delivery",
    category: "Communication",
    purpose: "Account and support emails",
    data: "Email address",
    policy: "Standard email provider policy",
  },
  {
    name: "Analytics",
    category: "Usage data",
    purpose: "Product improvement",
    data: "Anonymised usage events",
    policy: "Opt-out available",
  },
  {
    name: "Database infrastructure",
    category: "Storage",
    purpose: "Account and data storage",
    data: "Account and usage data",
    policy: "Enterprise infrastructure provider",
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
            Third parties that may process data on Chairman&apos;s behalf.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Current Subprocessors"
          subtitle="Categories of third-party services engaged by Chairman."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Name / Category</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Purpose</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Data Processed</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Privacy Policy</th>
              </tr>
            </thead>
            <tbody>
              {subprocessors.map((sp, i) => (
                <tr
                  key={sp.name}
                  className={`border-b border-white/5 ${i % 2 === 0 ? "bg-panel" : "bg-panel/60"}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{sp.name}</td>
                  <td className="px-4 py-3 text-muted">{sp.category}</td>
                  <td className="px-4 py-3 text-muted">{sp.purpose}</td>
                  <td className="px-4 py-3 text-muted">{sp.data}</td>
                  <td className="px-4 py-3 text-muted">{sp.policy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notice */}
        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">List Update Notice</p>
          <p className="text-sm leading-7 text-muted">
            This list will be updated when Chairman confirms specific provider agreements. Specific
            provider names will be listed once DPA agreements are in place. We do not publish
            names of providers we have not formally contracted with or reviewed.
          </p>
        </div>
      </section>

      {/* Additional Info */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="text-base font-semibold text-foreground">Data Processing Agreements</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Chairman is in the process of establishing formal Data Processing Agreements (DPAs)
                with key subprocessors. Enterprise customers requiring executed DPAs should contact
                the Chairman team to discuss availability and timing.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">AI Processing Scope</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Cloud AI infrastructure is only engaged when you explicitly choose cloud intelligence
                mode and consent to sending selected text. Your private local files and full archive
                are never sent to AI processing infrastructure automatically.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
