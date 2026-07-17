import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Company Transparency — Chameleon Eye AI",
  description:
    "Company and contact information for Chameleon Eye AI by Chameleon Eye.",
};

export default function CompanyTransparencyPage() {
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
            Company Transparency
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Company information for Chameleon Eye AI by Chameleon Eye.
          </p>
        </div>
      </section>

      {/* Opening statement */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Early-Stage Product
          </p>
          <p className="text-sm leading-7 text-muted">
            Chameleon Eye AI is an early-stage product operated by Chameleon Eye.
            Full company registration and transparency details will be published
            prior to commercial launch. For enquiries, please use the contact
            form.
          </p>
        </div>
      </section>

      {/* Company details */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Company Information"
          subtitle="Information about the operator of Chameleon Eye AI."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Field
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { field: "Product name", details: "Chameleon Eye AI" },
                { field: "Operated by", details: "Chameleon Eye" },
                {
                  field: "Legal entity",
                  details:
                    "Details will be published prior to commercial launch.",
                },
                {
                  field: "Company registration",
                  details:
                    "Details will be published prior to commercial launch.",
                },
                {
                  field: "Registered address",
                  details:
                    "Details will be published prior to commercial launch.",
                },
                {
                  field: "Support contact",
                  details: "Use the contact form at /contact",
                },
                {
                  field: "Security contact",
                  details: "Use the responsible disclosure process at /trust/responsible-disclosure",
                },
                {
                  field: "Privacy contact",
                  details: "Use the contact form at /contact",
                },
              ].map((row, i) => (
                <tr
                  key={row.field}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? "bg-panel" : "bg-panel/60"
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.field}
                  </td>
                  <td className="px-4 py-3 text-muted">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Badge section */}
      <section className="border-t border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Badge>Chameleon Eye AI</Badge>
            <Badge>Operated by Chameleon Eye</Badge>
          </div>
          <p className="mt-6 text-xs leading-6 text-muted">
            Chameleon Eye AI is a proprietary commercial platform. Full company
            registration and contact details will be published prior to
            commercial launch.
          </p>
        </div>
      </section>
    </>
  );
}
