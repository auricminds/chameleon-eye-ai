import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "ISO/IEC 27001 Certification — Chameleon Eye AI",
  description:
    "Chameleon Eye ISO/IEC 27001 certified information security management system details and certificate request process.",
};

const certDetails = [
  { label: "Standard", value: "ISO/IEC 27001" },
  { label: "Operating company", value: "Chameleon Eye" },
  {
    label: "Certified service / scope",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Certificate number",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Certification body",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Accreditation body",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Issue date",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Expiry date",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Surveillance / renewal",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Availability",
    value:
      "Certificate summary available on request or public if approved by company administration.",
  },
];

export default function Iso27001Page() {
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
              ISO/IEC 27001 Certification
            </h1>
            <StatusChip status="certified" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye maintains an ISO/IEC 27001 certified information
            security management system for Chameleon Eye AI.
          </p>
        </div>
      </section>

      {/* Certificate Details */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Certificate Details"
          subtitle="ISO/IEC 27001 certification information for Chameleon Eye."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <tbody>
              {certDetails.map((row, i) => (
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

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/trust/trust-pack" variant="primary">
            Request ISO Certificate
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
                SOC 2 Type II
              </h3>
              <p className="text-sm text-muted mb-4">
                SOC 2 Type II attestation details and report request.
              </p>
              <Button href="/trust/compliance/soc-2" variant="secondary">
                View SOC 2
              </Button>
            </Card>
            <Card hover>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Security Architecture
              </h3>
              <p className="text-sm text-muted mb-4">
                How Chameleon Eye AI protects your data through architecture.
              </p>
              <Button href="/trust/security" variant="secondary">
                View Security
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
