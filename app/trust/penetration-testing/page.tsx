import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Penetration Testing — Chameleon Eye AI",
  description:
    "Chameleon Eye AI penetration testing details. Customer-safe summary available through the Trust Pack request process.",
};

const testDetails = [
  {
    label: "Testing provider",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Test date",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Test scope",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Systems tested",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Remediation status",
    value: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    label: "Summary availability",
    value: "Available on request.",
  },
  {
    label: "Full technical report",
    value: "Available under NDA to qualified customers or partners.",
  },
];

export default function PenetrationTestingPage() {
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
              Penetration Testing
            </h1>
            <StatusChip status="completed" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI has completed penetration testing for the platform. A
            customer-safe summary is available through the Trust Pack request
            process. Full technical details may require NDA.
          </p>
        </div>
      </section>

      {/* Test Details */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Testing Details"
          subtitle="Penetration testing information for Chameleon Eye AI."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <tbody>
              {testDetails.map((row, i) => (
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

        {/* Note */}
        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Report Availability
          </p>
          <p className="text-sm leading-7 text-muted">
            The customer-safe penetration test summary is available on request.
            Full technical reports including detailed findings are available
            under NDA to qualified customers or partners only.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/trust/trust-pack" variant="primary">
            Request Penetration Test Summary
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
                Responsible Disclosure
              </h3>
              <p className="text-sm text-muted mb-4">
                How to report a security vulnerability to Chameleon Eye AI.
              </p>
              <Button
                href="/trust/responsible-disclosure"
                variant="secondary"
              >
                View Disclosure Policy
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
