import type { Metadata } from "next";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Provider & Privacy Routes — Owner View",
  description: "Internal owner view of provider and privacy route configuration.",
};

const demoRoutes = [
  {
    key: "intelligence.general",
    ownerLabel: "General Business Route",
    category: "Approved Cloud AI",
    enabled: "Yes",
    zdrRequired: "No",
    dataCollectionDenied: "Yes",
    fallbackAllowed: "No",
    notes: "Default route",
  },
  {
    key: "intelligence.private",
    ownerLabel: "Private Mode Route",
    category: "Local / ZDR Cloud",
    enabled: "Yes",
    zdrRequired: "Yes",
    dataCollectionDenied: "Yes",
    fallbackAllowed: "No",
    notes: "Requires ZDR",
  },
];

export default function OwnerProviderRoutesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,180,106,0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Owner Access
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Provider &amp; Privacy Routes
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Internal view. Not visible to normal users.
          </p>
        </div>
      </section>

      {/* Access Notice */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Owner Access Required
          </p>
          <p className="text-sm leading-7 text-muted">
            This page is visible to platform owners only. Full implementation
            requires owner authentication. This demo view is for UI preview
            only. Production data will not be shown until owner authentication
            is connected.
          </p>
        </div>
      </section>

      {/* Access Note */}
      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <Card>
          <p className="text-sm font-semibold text-foreground mb-2">
            Note
          </p>
          <p className="text-sm leading-7 text-muted">
            This page is visible to platform owners only. Full implementation
            requires owner authentication.
          </p>
        </Card>
      </section>

      {/* Demo Table */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Route Configuration (Demo Preview)
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Route Key</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Owner Label</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Provider Category</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Enabled</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">ZDR Required</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Data Collection Denied</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Fallback Allowed</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Notes</th>
              </tr>
            </thead>
            <tbody>
              {demoRoutes.map((route, i) => (
                <tr
                  key={route.key}
                  className={`border-b border-white/5 ${i % 2 === 0 ? "bg-panel" : "bg-panel/60"}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-emerald">{route.key}</td>
                  <td className="px-4 py-3 text-foreground">{route.ownerLabel}</td>
                  <td className="px-4 py-3 text-muted">{route.category}</td>
                  <td className="px-4 py-3 text-muted">{route.enabled}</td>
                  <td className="px-4 py-3 text-muted">{route.zdrRequired}</td>
                  <td className="px-4 py-3 text-muted">{route.dataCollectionDenied}</td>
                  <td className="px-4 py-3 text-muted">{route.fallbackAllowed}</td>
                  <td className="px-4 py-3 text-muted">{route.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">Warning</p>
          <p className="text-sm leading-7 text-muted">
            Owner must authenticate before production data is shown. This demo
            view is for UI preview only.
          </p>
        </div>
      </section>
    </>
  );
}
