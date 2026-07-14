import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Data Deletion and Export — Chairman AI",
  description:
    "Your right to access and delete your data. How to export or delete your Chairman account data.",
};

const exportIncluded = [
  "Account profile (name, email, preferences)",
  "Saved brain profiles",
  "Saved drafts",
  "Saved documents metadata",
  "Usage summary",
  "Settings",
];

const exportNotIncluded = [
  "Other users' data",
  "Raw AI processing logs (not retained by default)",
  "Third-party billing records (accessible via billing portal)",
];

const deletionDeletes = [
  "Account and authentication records",
  "Saved documents and drafts",
  "Brain profiles",
  "Settings and preferences",
  "Cloud consent records",
];

const deletionRetains = [
  "Billing records (legal requirement — up to 7 years)",
  "Anonymised usage aggregates (not personally identifiable)",
  "Security audit records (1 year)",
];

export default function DataDeletionPage() {
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
            Data Deletion and Export
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Your right to access and delete your data.
          </p>
        </div>
      </section>

      {/* How to Request */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm font-semibold text-emerald mb-3">How to Submit a Request</p>
          <p className="text-sm leading-7 text-muted mb-4">
            Navigate to <strong className="text-foreground">Settings → Privacy &amp; Data → Request Deletion</strong> or export your data
            from the same section. Alternatively, email us at{" "}
            <a href="mailto:privacy@chameleoneye.ai" className="text-emerald hover:underline">
              privacy@chameleoneye.ai
            </a>
            .
          </p>
          <p className="text-sm leading-7 text-muted">
            <strong className="text-gold">Processing time:</strong> Export requests are processed within 30 days. Deletion requests
            are processed within 30 days. You will receive a confirmation email when your
            request is complete.
          </p>
        </div>
      </section>

      {/* Export and Deletion Details */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Export */}
          <div>
            <SectionTitle title="Export My Data" subtitle="What is included in your data export." align="left" />
            <div className="mt-8 space-y-6">
              <Card>
                <h3 className="text-sm font-semibold text-emerald mb-4">Included in Export</h3>
                <ul className="space-y-2">
                  {exportIncluded.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 text-emerald shrink-0">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="text-sm font-semibold text-gold mb-4">Not Included in Export</h3>
                <ul className="space-y-2">
                  {exportNotIncluded.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 text-gold shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Deletion */}
          <div>
            <SectionTitle title="Delete My Data" subtitle="What gets deleted and what may be retained." align="left" />
            <div className="mt-8 space-y-6">
              <Card>
                <h3 className="text-sm font-semibold text-emerald mb-4">What Gets Deleted</h3>
                <ul className="space-y-2">
                  {deletionDeletes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 text-emerald shrink-0">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="text-sm font-semibold text-gold mb-4">May Be Retained</h3>
                <ul className="space-y-2">
                  {deletionRetains.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 text-gold shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>

        {/* Self-service note */}
        <div className="mt-10 rounded-2xl border border-white/8 bg-panel p-6">
          <p className="text-sm font-semibold text-foreground mb-2">Self-Service Status</p>
          <p className="text-sm leading-7 text-muted">
            Full automated self-service data deletion is in development. Current deletion requests
            are processed by the Chairman team within 30 days of receipt. We will notify you when
            automated self-service deletion becomes available.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <Button href="/settings/privacy" variant="primary">
              Go to Privacy Settings
            </Button>
            <Button href="mailto:privacy@chameleoneye.ai" variant="secondary">
              Email Privacy Team
            </Button>
            <Button href="/trust/data-retention" variant="ghost">
              View Data Retention Policy
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
