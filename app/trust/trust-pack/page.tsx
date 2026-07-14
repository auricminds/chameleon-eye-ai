import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { TrustPackForm } from "./TrustPackForm";

export const metadata: Metadata = {
  title: "Trust Pack — Chairman AI",
  description:
    "Request security, privacy, and compliance documents from Chairman AI for vendor review.",
};

const publicDocs = [
  { label: "Security Overview", href: "/trust/security" },
  { label: "Privacy Overview", href: "/trust/privacy" },
  { label: "Data Retention Policy", href: "/trust/data-retention" },
  { label: "Local vs Cloud Processing", href: "/trust/local-vs-cloud" },
  { label: "AI Provider Routing", href: "/trust/ai-providers" },
  { label: "Subprocessor List", href: "/trust/subprocessors" },
  { label: "No-Training Policy", href: "/trust/no-training-policy" },
  { label: "Responsible Disclosure", href: "/trust/responsible-disclosure" },
];

const onRequestDocs = [
  "DPA",
  "SOC 2 Type II Report",
  "ISO/IEC 27001 Certificate",
  "Penetration Test Summary",
  "Security Questionnaire",
  "Vendor Risk Pack",
  "Compliance Evidence Summary",
];

const ndaRequiredDocs = [
  "Full SOC 2 report",
  "Full penetration test report",
  "Detailed security architecture diagrams",
  "Sensitive audit evidence",
  "Internal risk register summary if approved by company administration",
];

export default function TrustPackPage() {
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
            Trust Pack
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Request security, privacy, and compliance documents for vendor
            review.
          </p>
        </div>
      </section>

      {/* Section A — Public Docs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="A — Public Documents"
          subtitle="These documents are publicly available without a request."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {publicDocs.map((doc) => (
            <a
              key={doc.label}
              href={doc.href}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3 text-sm text-foreground hover:border-emerald/30 hover:bg-emerald/5 transition-colors"
            >
              <span className="text-emerald shrink-0">+</span>
              <span>{doc.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Section B — On Request */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="B — Available on Request"
            subtitle="These documents are available to qualified business customers and approved partners on request."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {onRequestDocs.map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
              >
                <span className="text-gold shrink-0">~</span>
                <span className="text-sm text-foreground">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C — NDA Required */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="C — NDA Required"
          subtitle="These documents contain sensitive security details and require a signed NDA."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {ndaRequiredDocs.map((doc) => (
            <div
              key={doc}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
            >
              <span className="text-gold shrink-0">—</span>
              <span className="text-sm text-foreground">{doc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section D — Request Form */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="D — Request Trust Documents"
            subtitle="Submit a request for trust documents. All requests are reviewed by the Chairmans Holding team."
            align="left"
          />
          <div className="mt-10">
            <TrustPackForm />
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          <Button href="/trust/compliance" variant="secondary">
            View Compliance Status
          </Button>
          <Button href="/trust" variant="ghost">
            Back to Trust Center
          </Button>
        </div>
      </section>
    </>
  );
}
