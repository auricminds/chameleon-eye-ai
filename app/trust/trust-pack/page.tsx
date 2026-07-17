import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { TrustPackForm } from "./TrustPackForm";

export const metadata: Metadata = {
  title: "Trust Pack — Chameleon Eye AI",
  description:
    "Request security, privacy, and compliance documents from Chameleon Eye AI for vendor review.",
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
  { label: "Company Transparency", href: "/trust/company" },
];

// Documents listed below are what will be available when compliance milestones
// are reached. Items marked (planned) are not yet available.
const onRequestDocs = [
  "DPA — available on request for qualified business customers",
  "Security Questionnaire",
  "Vendor Risk Pack",
  "SOC 2 Type II Report (planned — not yet available)",
  "ISO/IEC 27001 Certificate (planned — not yet available)",
  "Penetration Test Summary (planned — not yet available)",
  "Compliance Evidence Summary (planned — not yet available)",
];

const ndaRequiredDocs = [
  "Detailed security architecture diagrams",
  "Sensitive audit evidence",
  "Internal risk register summary if approved by company administration",
  "Full SOC 2 report (planned — not yet available)",
  "Full penetration test report (planned — not yet available)",
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

      {/* Early-stage notice */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-5">
          <p className="text-sm font-semibold text-gold mb-1">Early-Stage Product</p>
          <p className="text-sm leading-6 text-muted">
            Chameleon Eye AI is an early-stage product. SOC 2 attestation, ISO 27001
            certification, and independent penetration testing are planned milestones —
            none have been completed yet. Documents listed as &quot;planned&quot; will be made
            available as each milestone is reached. The DPA and public security
            documentation are available now.
          </p>
        </div>
      </div>

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
            title="B — Available on Request (Current and Planned)"
            subtitle="Documents currently available on request are marked as such. Items marked &quot;planned&quot; are not yet available and will be added as compliance milestones are reached."
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
          title="C — NDA Required (Current and Planned)"
          subtitle="These documents contain sensitive security details and require a signed NDA. Items marked &quot;planned&quot; are not yet available."
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
            subtitle="Submit a request for trust documents. All requests are reviewed by the Chameleon Eye team."
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
