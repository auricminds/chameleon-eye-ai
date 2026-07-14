import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Company Transparency — Chameleon Eye AI",
  description:
    "Legal entity, company registration, and contact information for Chameleon Eye AI by Chameleon Eye.",
};

const companyFields = [
  {
    field: "Legal operating entity",
    details: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    field: "Company registration number",
    details: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    field: "Registered address",
    details: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    field: "Support contact",
    details: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    field: "Security contact",
    details: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
  {
    field: "Privacy contact",
    details: "TO BE COMPLETED BY AUTHORIZED COMPANY ADMINISTRATOR",
  },
];

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
            Legal entity, company registration, and contact information for
            Chameleon Eye AI by Chameleon Eye.
          </p>
        </div>
      </section>

      {/* Opening statement */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm leading-7 text-foreground">
            Chameleon Eye AI is operated by Chameleon Eye.
          </p>
        </div>
      </section>

      {/* Company details table */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Company Information"
          subtitle="Legal and contact details for Chameleon Eye, operator of Chameleon Eye AI."
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
              {companyFields.map((row, i) => (
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

        {/* Note below table */}
        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm leading-7 text-muted">
            These details will be completed by authorized company
            administration. Chameleon Eye AI is a proprietary commercial
            platform operated by Chameleon Eye.
          </p>
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
            Chameleon Eye AI is a proprietary commercial platform. Company
            registration and contact details are managed by authorized company
            administration.
          </p>
        </div>
      </section>
    </>
  );
}
