import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Data Processing Agreement — Chameleon Eye AI",
  description:
    "Chameleon Eye AI Data Processing Agreement for qualified business customers and approved partners.",
};

const dpaCoverage = [
  "Roles and responsibilities",
  "Processing purpose",
  "Customer data categories",
  "Subprocessors",
  "Security measures",
  "Deletion and export process",
  "International transfer terms",
  "Customer rights",
  "Breach notification process",
  "Confidentiality terms",
];

const dpaStatus = [
  { label: "DPA status", value: "Available on request for enterprise customers" },
  {
    label: "DPA version",
    value: "Information will be published following formal verification.",
  },
  {
    label: "Last updated",
    value: "Information will be published following formal verification.",
  },
  {
    label: "Availability",
    value:
      "Available on request for qualified business customers and approved partners.",
  },
];

export default function DpaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Trust Center
          </p>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Data Processing Agreement
            </h1>
            <StatusChip status="available" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI provides a Data Processing Agreement for qualified
            business customers and approved partners.
          </p>
        </div>
      </section>

      {/* DPA Coverage */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="DPA Coverage"
          subtitle="The Chameleon Eye AI Data Processing Agreement covers the following areas."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dpaCoverage.map((item) => (
            <Card key={item} className="flex items-center gap-3">
              <span className="text-emerald shrink-0">+</span>
              <span className="text-sm text-foreground">{item}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* DPA Status */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="DPA Status"
            subtitle="Current status and availability of the Chameleon Eye AI DPA."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <tbody>
                {dpaStatus.map((row, i) => (
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">
              Request DPA
            </Button>
            <Button href="/trust/compliance" variant="ghost">
              Back to Compliance
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
