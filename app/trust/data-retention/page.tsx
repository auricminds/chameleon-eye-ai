import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Data Retention Policy — Chairman AI",
  description:
    "What Chairman stores, where, why, and how long. Understand data retention across all categories.",
};

const retentionRows = [
  {
    type: "Account email",
    stored: "Yes",
    where: "Database",
    why: "Authentication",
    retention: "Account lifetime",
    control: "Delete account",
    status: "implemented" as const,
  },
  {
    type: "Billing metadata",
    stored: "Yes",
    where: "Billing provider",
    why: "Legal requirement",
    retention: "7 years",
    control: "Billing portal",
    status: "implemented" as const,
  },
  {
    type: "Usage counters",
    stored: "Yes",
    where: "Database",
    why: "Plan enforcement",
    retention: "12 months rolling",
    control: "View in settings",
    status: "implemented" as const,
  },
  {
    type: "Uploaded files",
    stored: "Local only (default)",
    where: "User device",
    why: "User action",
    retention: "Until deleted by user",
    control: "Delete in app",
    status: "implemented" as const,
  },
  {
    type: "Cloud selected text",
    stored: "Yes, if saved",
    where: "Database",
    why: "User saved draft",
    retention: "Until deleted",
    control: "Delete in drafts",
    status: "planned" as const,
  },
  {
    type: "AI responses",
    stored: "Not stored by default",
    where: "—",
    why: "—",
    retention: "Not retained",
    control: "—",
    status: "implemented" as const,
  },
  {
    type: "Raw prompts",
    stored: "Not stored by default",
    where: "—",
    why: "—",
    retention: "Not retained",
    control: "—",
    status: "implemented" as const,
  },
  {
    type: "Website events",
    stored: "Anonymized",
    where: "Analytics",
    why: "Usage improvement",
    retention: "90 days",
    control: "Opt out in settings",
    status: "implemented" as const,
  },
  {
    type: "Support messages",
    stored: "Yes",
    where: "Support system",
    why: "Issue resolution",
    retention: "2 years",
    control: "Request deletion",
    status: "implemented" as const,
  },
  {
    type: "Security audit logs",
    stored: "Yes",
    where: "Database",
    why: "Security review",
    retention: "1 year",
    control: "Owner visible only",
    status: "planned" as const,
  },
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
            What Chairman stores, where, why, and how long.
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm font-semibold text-emerald mb-2">Default Behaviour</p>
          <p className="text-sm leading-7 text-muted">
            By default, Chairman does not store raw prompts or AI responses. Only token counts,
            mode, cost, request status, and timestamps are recorded for billing and performance.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Cloud selected text is only stored if you explicitly save it as a document or draft.
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
                <th className="px-4 py-3 text-left font-semibold text-foreground">Data Type</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Stored?</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Where?</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Why?</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Retention</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">User Control</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {retentionRows.map((row, i) => (
                <tr
                  key={row.type}
                  className={`border-b border-white/5 ${i % 2 === 0 ? "bg-panel" : "bg-panel/60"}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted">{row.stored}</td>
                  <td className="px-4 py-3 text-muted">{row.where}</td>
                  <td className="px-4 py-3 text-muted">{row.why}</td>
                  <td className="px-4 py-3 text-muted">{row.retention}</td>
                  <td className="px-4 py-3 text-muted">{row.control}</td>
                  <td className="px-4 py-3">
                    <StatusChip status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Additional Notes */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Additional Notes"
            subtitle="Clarifications on edge cases and legal requirements."
            align="left"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="text-base font-semibold text-foreground">Billing Records</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Billing metadata is retained for up to 7 years to meet legal and tax requirements.
                This is a legal obligation and cannot be waived upon account deletion. Users can
                access their billing history via the billing portal.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">Anonymised Analytics</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Website usage events are anonymised before storage. No personally identifiable
                information is attached to analytics records. You can opt out of analytics
                tracking in Settings → Privacy & Data.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">Local File Storage</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                In private local mode, uploaded files and documents never leave your device.
                Chairman does not copy, upload, or back up local files to Chairman servers.
                Deletion is entirely under your control.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">Audit Log Access</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Security audit logs are retained for 1 year and are visible only to account
                owners and authorised administrators. These logs support security review and
                incident response — they are not shared with third parties.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
