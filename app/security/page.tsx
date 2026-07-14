import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Security — Chameleon Eye AI",
  description:
    "Security architecture, assurance documentation, and API key protection for Chameleon Eye AI.",
};

const assuranceCards = [
  {
    title: "SOC 2 Type II",
    status: "completed" as const,
    detail: "SOC 2 Type II report available under NDA to qualified customers.",
  },
  {
    title: "ISO/IEC 27001",
    status: "certified" as const,
    detail: "Certified information security management system.",
  },
  {
    title: "Penetration Testing",
    status: "completed" as const,
    detail: "Customer-safe summary available on request.",
  },
  {
    title: "DPA",
    status: "available" as const,
    detail: "Data Processing Agreement available for business customers.",
  },
  {
    title: "Responsible Disclosure",
    status: "published" as const,
    detail: "Responsible disclosure process published.",
  },
];

const architectureNodes = [
  { label: "User App / Web / Desktop", color: "border-muted/40 bg-panel" },
  { label: "Chameleon Eye API", color: "border-emerald/30 bg-emerald/8" },
  { label: "Authentication", color: "border-emerald/30 bg-emerald/8" },
  { label: "Entitlement Check", color: "border-gold/30 bg-gold/8" },
  { label: "Privacy Guard", color: "border-gold/30 bg-gold/8" },
  { label: "Consent Gate", color: "border-gold/30 bg-gold/8" },
  { label: "Intelligence Router", color: "border-emerald/30 bg-emerald/8" },
  { label: "Approved AI Route", color: "border-white/15 bg-panel2" },
  { label: "Response Validation", color: "border-emerald/30 bg-emerald/8" },
  { label: "Usage Audit Metadata", color: "border-muted/40 bg-panel" },
];

const desktopSecurityItems = [
  "Secure login flow",
  "Device activation",
  "Short-lived tokens",
  "Token refresh mechanism",
  "Device limits",
  "Revoke-device capability",
  "No master API keys in desktop client",
];

const loggingItems = [
  "No raw private prompts in normal application logs",
  "No private document text in logs by default",
  "No provider keys in logs",
  "Usage metadata only for billing, abuse prevention, and audit integrity",
];

const isolationItems = [
  "Account-level access control",
  "Database access controls",
  "Audit metadata",
];

const headerItems = [
  "HTTPS/TLS",
  "Content Security Policy",
  "Referrer Policy",
  "Permissions Policy",
  "HSTS in production",
  "Frame restrictions",
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Security
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Security
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon Eye AI is built with verified security assurance,
            server-side key protection, and clear architecture controls at every
            layer of the platform.
          </p>
        </div>
      </section>

      {/* A. Verified Security Assurance */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Verified Security Assurance"
          subtitle="Independent verification and certified controls for Chameleon Eye AI."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assuranceCards.map((card) => (
            <Card key={card.title} hover>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {card.title}
                </h3>
                <StatusChip status={card.status} />
              </div>
              <p className="text-sm leading-7 text-muted">{card.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* B. Security Architecture */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Security Architecture"
            subtitle="Every request passes through authentication, entitlement checks, privacy guard, and consent gate before reaching the intelligence router."
            align="left"
          />
          <div className="mt-10 overflow-x-auto">
            <div className="flex min-w-max items-center gap-3">
              {architectureNodes.map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-3">
                  <div
                    className={`rounded-xl border px-4 py-3 text-center text-xs font-medium text-foreground ${node.color} max-w-[140px]`}
                  >
                    {node.label}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-muted">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs leading-6 text-muted">
            The browser communicates only with Chameleon Eye AI-controlled API
            routes. No AI provider keys are exposed in the frontend.
          </p>
        </div>
      </section>

      {/* C. API Key Protection */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="API Key Protection"
          subtitle="Provider API keys are held server-side and are not embedded in browser, desktop, or mobile clients."
          align="left"
        />
        <div className="mt-6 rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm leading-7 text-muted">
            Provider API keys are held server-side and are not embedded in
            browser, desktop, or mobile clients. Customer apps should call from
            server-side. API keys must not be embedded in clients.
          </p>
        </div>
      </section>

      {/* D. Desktop Connector Security */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Desktop Connector Security"
            subtitle="Short-lived tokens and device activation protect desktop workflows."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {desktopSecurityItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
              >
                <span className="mt-1 text-emerald shrink-0">+</span>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. Logging Policy */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Logging Policy"
          subtitle="Private content is not written to normal application logs."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {loggingItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
            >
              <span className="mt-1 text-emerald shrink-0">+</span>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* F. Data Isolation */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Data Isolation"
            subtitle="Customer data is separated at account level with database access controls."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {isolationItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
              >
                <span className="mt-1 text-emerald shrink-0">+</span>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. Security Headers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Security Headers"
          subtitle="All responses include standard security headers and HTTPS enforcement."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {headerItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
            >
              <span className="mt-1 text-emerald shrink-0">+</span>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section className="border-t border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button href="/trust" variant="secondary">
              View Trust Center
            </Button>
            <Button href="/trust/trust-pack" variant="ghost">
              Request Trust Pack
            </Button>
            <Button href="/trust/compliance/soc-2" variant="ghost">
              View SOC 2
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
