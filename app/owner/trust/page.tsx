import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Trust Admin — Owner Panel",
  description: "Owner trust administration panel for Chairman AI.",
};

const complianceFields = [
  { key: "soc2_auditor", label: "SOC 2 auditor" },
  { key: "soc2_report_type", label: "SOC 2 report type" },
  { key: "soc2_report_period", label: "SOC 2 report period" },
  { key: "soc2_report_date", label: "SOC 2 report date" },
  { key: "soc2_criteria", label: "SOC 2 criteria covered" },
  { key: "iso_certificate_number", label: "ISO certificate number" },
  { key: "iso_certification_body", label: "ISO certification body" },
  { key: "iso_scope", label: "ISO scope" },
  { key: "iso_issue_date", label: "ISO issue date" },
  { key: "iso_expiry_date", label: "ISO expiry date" },
  { key: "pentest_provider", label: "Pen test provider" },
  { key: "pentest_date", label: "Pen test date" },
  { key: "pentest_scope", label: "Pen test scope" },
  { key: "dpa_version", label: "DPA version" },
  { key: "dpa_last_updated", label: "DPA last updated" },
];

const documentCatalog = [
  { name: "Security Overview", category: "Public", status: "Public" },
  { name: "Privacy Overview", category: "Public", status: "Public" },
  { name: "Data Retention Policy", category: "Public", status: "Public" },
  { name: "No-Training Policy", category: "Public", status: "Public" },
  { name: "Subprocessor List", category: "Public", status: "Public" },
  { name: "Responsible Disclosure", category: "Public", status: "Public" },
  { name: "DPA", category: "On Request", status: "Available on request" },
  {
    name: "SOC 2 Type II Report",
    category: "NDA Required",
    status: "Under NDA",
  },
  {
    name: "ISO/IEC 27001 Certificate",
    category: "On Request",
    status: "On request / public if approved",
  },
  {
    name: "Penetration Test Summary",
    category: "On Request",
    status: "Summary on request",
  },
  {
    name: "Full Penetration Test Report",
    category: "NDA Required",
    status: "Under NDA",
  },
  {
    name: "Security Questionnaire",
    category: "On Request",
    status: "Available on request",
  },
  {
    name: "Vendor Risk Pack",
    category: "On Request",
    status: "Available on request",
  },
  {
    name: "Compliance Evidence Summary",
    category: "On Request",
    status: "Available on request",
  },
];

export default function OwnerTrustPage() {
  return (
    <>
      {/* Auth Warning Banner */}
      <div className="border-b border-red-500/30 bg-red-500/10 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-red-400">
            This page requires owner authentication. Implement auth before
            deploying to production.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
        {/* Section 1 — Trust Document Requests */}
        <section>
          <SectionTitle
            title="Trust Document Requests"
            subtitle="Incoming requests for trust documents from qualified customers and partners."
            align="left"
          />
          <div className="mt-10">
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-panel2">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Full Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Document
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      NDA
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-panel">
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-sm text-muted"
                    >
                      Backend pending — connect Supabase to view requests.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2 — Compliance Status Editor */}
        <section>
          <SectionTitle
            title="Compliance Status Editor"
            subtitle="Fields that require completion by the authorized company administrator."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {complianceFields.map((field) => (
              <Card key={field.key}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">
                      {field.label}
                    </p>
                    <p className="text-sm text-foreground">
                      TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR
                    </p>
                  </div>
                  <button
                    type="button"
                    title="Coming soon"
                    className="shrink-0 rounded-lg border border-white/10 bg-panel2 px-3 py-1.5 text-xs text-muted cursor-not-allowed"
                    disabled
                  >
                    Edit
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3 — Trust Document Catalog */}
        <section>
          <SectionTitle
            title="Trust Document Catalog"
            subtitle="All trust documents and their current availability status."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-panel2">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Document
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {documentCatalog.map((doc, i) => (
                  <tr
                    key={doc.name}
                    className={`border-b border-white/5 ${
                      i % 2 === 0 ? "bg-panel" : "bg-panel/60"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {doc.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          doc.category === "Public"
                            ? "bg-emerald/10 text-emerald border border-emerald/30"
                            : doc.category === "NDA Required"
                            ? "bg-red-500/10 text-red-400 border border-red-500/30"
                            : "bg-gold/10 text-gold border border-gold/30"
                        }`}
                      >
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{doc.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Admin Note */}
        <section>
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm font-semibold text-gold mb-2">
              Admin Note
            </p>
            <p className="text-sm leading-7 text-muted">
              TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR — This admin
              panel requires owner authentication and Supabase backend
              connection.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
