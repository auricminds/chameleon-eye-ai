import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "SOC 2 Type II — Chameleon Eye AI",
  description:
    "Chameleon Eye AI SOC 2 Type II attestation details and report request process.",
};

const reportDetails = [
  { label: "Report type", value: "SOC 2 Type II" },
  { label: "Operating company", value: "Chameleon Eye" },
  {
    label: "Product covered",
    value: "Chameleon Eye AI / Chameleon Builder / Chameleon Eye API",
  },
  {
    label: "Auditor",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Report period",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Report date",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Trust service criteria",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Availability",
    value: "Available under NDA to qualified customers and partners.",
  },
];

export default function Soc2Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Compliance
          </p>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              SOC 2 Type II
            </h1>
            <StatusChip status="completed" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI has completed SOC 2 Type II attestation work covering
            controls relevant to the company&apos;s security and applicable
            trust service criteria.
          </p>
        </div>
      </section>

      {/* Report Details */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Report Details"
          subtitle="SOC 2 Type II attestation information for Chameleon Eye."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <tbody>
              {reportDetails.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? "bg-panel" : "bg-panel/60"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-foreground w-48">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-muted">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Important Note */}
        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Report Confidentiality
          </p>
          <p className="text-sm leading-7 text-muted">
            Full SOC 2 reports may include sensitive control details and are
            shared only under appropriate confidentiality terms.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/trust/trust-pack" variant="primary">
            Request SOC 2 Report
          </Button>
          <Button href="/trust/compliance" variant="ghost">
            Back to Compliance
          </Button>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                ISO/IEC 27001
              </h3>
              <p className="text-sm text-muted mb-4">
                Certified information security management system.
              </p>
              <Button href="/trust/compliance/iso-27001" variant="secondary">
                View ISO 27001
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Penetration Testing
              </h3>
              <p className="text-sm text-muted mb-4">
                Testing details and summary request process.
              </p>
              <Button href="/trust/penetration-testing" variant="secondary">
                View Pen Testing
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Trust Pack
              </h3>
              <p className="text-sm text-muted mb-4">
                Request all trust documents for vendor review.
              </p>
              <Button href="/trust/trust-pack" variant="secondary">
                Request Trust Pack
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
