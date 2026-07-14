import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Data Retention Policy — Chameleon Eye AI",
  description:
    "What Chameleon Eye AI stores, where, why, and how long. Understand data retention across all categories.",
};

const retentionRows = [
  {
    type: "Account email",
    stored: "Yes",
    location: "Supabase",
    purpose: "Authentication",
    retention: "Until account deleted",
    control: "Delete account",
  },
  {
    type: "Billing metadata",
    stored: "Yes",
    location: "Stripe/Supabase",
    purpose: "Subscriptions",
    retention: "As required by payment/legal",
    control: "Contact support",
  },
  {
    type: "Subscription status",
    stored: "Yes",
    location: "Supabase",
    purpose: "Plan enforcement",
    retention: "Until account deleted",
    control: "Manage plan",
  },
  {
    type: "Usage counters",
    stored: "Yes",
    location: "Supabase",
    purpose: "Billing, abuse prevention",
    retention: "12 months rolling",
    control: "No direct control",
  },
  {
    type: "Cloud consent history",
    stored: "Yes",
    location: "Supabase",
    purpose: "Audit, user reference",
    retention: "Until deleted by user",
    control: "Delete in settings",
  },
  {
    type: "Local private files",
    stored: "No (local only)",
    location: "User device",
    purpose: "Local analysis",
    retention: "User controls",
    control: "Delete locally",
  },
  {
    type: "Selected cloud text",
    stored: "Transient",
    location: "Chameleon Eye API",
    purpose: "Cloud analysis",
    retention: "Not stored by default",
    control: "N/A",
  },
  {
    type: "AI responses",
    stored: "Stored only if saved",
    location: "Supabase/local",
    purpose: "User reference",
    retention: "Until deleted",
    control: "Delete from archive",
  },
  {
    type: "Saved drafts",
    stored: "Yes",
    location: "Supabase/local",
    purpose: "User reference",
    retention: "Until deleted",
    control: "Delete in app",
  },
  {
    type: "Website events",
    stored: "Yes",
    location: "Vercel",
    purpose: "Analytics",
    retention: "30 days",
    control: "N/A",
  },
  {
    type: "Security audit metadata",
    stored: "Yes",
    location: "Supabase",
    purpose: "Audit integrity",
    retention: "12 months",
    control: "Not deletable",
  },
  {
    type: "Support requests",
    stored: "Yes",
    location: "Supabase",
    purpose: "Support",
    retention: "24 months",
    control: "Contact support",
  },
];

const importantRules = [
  "Local private files remain on the user device in Local Private Mode.",
  "Raw cloud prompts are not stored by default.",
  "Raw AI responses are not stored by default unless the user saves them.",
  "Usage metadata may be retained for billing, abuse prevention, and audit integrity.",
  "Billing metadata may be retained as required by payment/legal obligations.",
  "Trust document requests may be retained for vendor review and audit tracking.",
];

export default function DataRetentionPage() {
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
            Data Retention Policy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            What Chameleon Eye AI stores, where, why, and how long.
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm font-semibold text-emerald mb-2">
            Default Behaviour
          </p>
          <p className="text-sm leading-7 text-muted">
            By default, Chameleon Eye AI does not store raw prompts or AI responses.
            Only token counts, mode, cost, request status, and timestamps are
            recorded for billing and performance.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Cloud selected text is only stored if you explicitly save it as a
            document or draft.
          </p>
        </div>
      </section>

      {/* Retention Table */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Retention by Data Type"
          subtitle="All data categories, storage locations, and user controls."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Data Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Stored?
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Location
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Retention
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  User Control
                </th>
              </tr>
            </thead>
            <tbody>
              {retentionRows.map((row, i) => (
                <tr
                  key={row.type}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? "bg-panel" : "bg-panel/60"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 text-muted">{row.stored}</td>
                  <td className="px-4 py-3 text-muted">{row.location}</td>
                  <td className="px-4 py-3 text-muted">{row.purpose}</td>
                  <td className="px-4 py-3 text-muted">{row.retention}</td>
                  <td className="px-4 py-3 text-muted">{row.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Important Retention Rules */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Important Retention Rules"
            subtitle="Key rules about data storage and retention."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {importantRules.map((rule) => (
              <Card key={rule} className="flex items-start gap-3">
                <span className="mt-1 text-emerald shrink-0">+</span>
                <p className="text-sm leading-7 text-muted">{rule}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Notes */}
      <section className="border-t border-white/8 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Additional Notes"
            subtitle="Clarifications on edge cases and legal requirements."
            align="left"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                Billing Records
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Billing metadata is retained as required by payment and legal
                obligations. This may be a legal requirement and cannot always
                be waived upon account deletion. Users can access their billing
                history via the billing portal.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                Analytics
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Website usage events are retained for 30 days via Vercel
                analytics. No personally identifiable information is attached
                to analytics records.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                Local File Storage
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                In private local mode, uploaded files and documents never leave
                your device. Chameleon Eye AI does not copy, upload, or back up local
                files to Chameleon Eye AI servers. Deletion is entirely under your
                control.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                Audit Log Access
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Security audit metadata is retained for 12 months and is
                visible only to account owners and authorised administrators.
                These logs support security review and incident response.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
