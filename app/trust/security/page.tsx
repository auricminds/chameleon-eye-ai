import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Security — Chairman AI Trust Center",
  description:
    "How Chairman AI secures your data: verified security assurance, server-side key management, authentication, privacy guard, and security architecture.",
};

const verifiedAssurance = [
  {
    label: "SOC 2 Type II attestation completed",
    status: "completed" as const,
    href: "/trust/compliance/soc-2",
  },
  {
    label: "ISO/IEC 27001 certified ISMS",
    status: "certified" as const,
    href: "/trust/compliance/iso-27001",
  },
  {
    label: "Penetration testing completed",
    status: "completed" as const,
    href: "/trust/penetration-testing",
  },
  {
    label: "DPA available",
    status: "available" as const,
    href: "/trust/dpa",
  },
  {
    label: "Responsible disclosure process published",
    status: "published" as const,
    href: "/trust/responsible-disclosure",
  },
];

const architectureNodes = [
  { label: "User App / Desktop / Web", color: "border-muted/40 bg-panel" },
  { label: "Chairman API", color: "border-emerald/30 bg-emerald/8" },
  { label: "Authentication", color: "border-emerald/30 bg-emerald/8" },
  { label: "Entitlement Check", color: "border-gold/30 bg-gold/8" },
  { label: "Privacy Guard", color: "border-gold/30 bg-gold/8" },
  { label: "Cloud Consent", color: "border-gold/30 bg-gold/8" },
  { label: "Intelligence Router", color: "border-emerald/30 bg-emerald/8" },
  { label: "Approved AI Route", color: "border-white/15 bg-panel2" },
  { label: "Response Validation", color: "border-emerald/30 bg-emerald/8" },
  { label: "Usage Audit Metadata", color: "border-muted/40 bg-panel" },
];

const securityPrinciples = [
  {
    label: "No provider API keys in frontend code",
    status: "implemented" as const,
    detail:
      "AI infrastructure credentials are held exclusively on the server. The frontend never contains or exposes any provider API key.",
  },
  {
    label: "No provider keys in browser or desktop app",
    status: "implemented" as const,
    detail:
      "The web app and the desktop app do not store, transmit, or require any AI provider key at the client layer.",
  },
  {
    label: "Server-side key management",
    status: "implemented" as const,
    detail:
      "All provider credentials are managed server-side, rotated on schedule, and never written to client-readable storage.",
  },
  {
    label: "Secrets not written to logs",
    status: "implemented" as const,
    detail:
      "Log scrubbing is applied at the server layer. API keys, tokens, and sensitive fields are redacted before any log write.",
  },
  {
    label: "User data isolation",
    status: "implemented" as const,
    detail:
      "Each workspace is isolated at the data layer. Queries are scoped by authenticated identity and workspace context.",
  },
  {
    label: "Rate limiting",
    status: "implemented" as const,
    detail:
      "API routes and intelligence endpoints are rate-limited per user and per key to prevent abuse and resource exhaustion.",
  },
  {
    label: "Security headers",
    status: "implemented" as const,
    detail:
      "All responses include X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and Content-Security-Policy headers.",
  },
  {
    label: "Cloud consent gate",
    status: "implemented" as const,
    detail:
      "Cloud analysis requires explicit user approval via the consent gate before any selected text is transmitted.",
  },
  {
    label: "Audit log metadata",
    status: "implemented" as const,
    detail:
      "Request metadata — mode, timestamp, status, token count — is logged for owner review. Raw content is not logged.",
  },
];

export default function TrustSecurityPage() {
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
            Security
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            How Chairman AI protects your data through verified security
            assurance, architecture, access control, and operational security
            practices.
          </p>
        </div>
      </section>

      {/* Verified Security Assurance */}
      <section className="border-b border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Verified Security Assurance"
            subtitle="Independent verification and certified controls for Chairman AI."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedAssurance.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-panel p-5 hover:border-emerald/30 transition-colors"
              >
                <span className="text-sm text-foreground">{item.label}</span>
                <StatusChip status={item.status} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section className="border-b border-white/8 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Security Architecture"
            subtitle="Every request passes through authentication, privacy guard, entitlement checks, and cloud consent before reaching the intelligence router."
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
            The browser communicates only with Chairman AI-controlled API routes.
            No AI provider keys are exposed in the frontend. The Approved AI
            Route is reached only after all checks pass.
          </p>
        </div>
      </section>

      {/* Key Protection */}
      <section className="border-b border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
            <p className="text-sm font-semibold text-emerald mb-2">
              Provider Key Protection
            </p>
            <p className="text-sm leading-7 text-muted">
              Provider API keys remain server-side and are not embedded in
              desktop, web, or mobile clients.
            </p>
          </div>
        </div>
      </section>

      {/* Logging */}
      <section className="border-b border-white/8 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/8 bg-panel p-6">
            <p className="text-sm font-semibold text-foreground mb-2">
              Logging Policy
            </p>
            <p className="text-sm leading-7 text-muted">
              Chairman AI does not log raw private prompts, full AI responses,
              private files, or secrets in normal application logs. Usage
              metadata may be stored for billing, abuse prevention, and audit
              integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Data Isolation */}
      <section className="border-b border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/8 bg-panel p-6">
            <p className="text-sm font-semibold text-foreground mb-2">
              Data Isolation
            </p>
            <p className="text-sm leading-7 text-muted">
              Customer data is separated by account and protected through
              application authorization and database access controls.
            </p>
          </div>
        </div>
      </section>

      {/* Security Principles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Key Security Principles"
          subtitle="Implementation status across all major security dimensions."
          align="left"
        />
        <div className="mt-10 space-y-4">
          {securityPrinciples.map((item) => (
            <Card key={item.label}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.label}
                    </h3>
                    <StatusChip status={item.status} />
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {item.detail}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Security Measures */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Additional Security Measures"
            subtitle="Operational and infrastructure security practices."
            align="left"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                Transport Security
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                All traffic between the client and Chairman AI servers uses
                HTTPS/TLS. Strict-Transport-Security headers enforce TLS in
                production environments.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                Local Private Mode
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                In local mode, no data is transmitted to Chairman AI or any AI
                provider. Processing remains on-device for maximum isolation.
                See{" "}
                <a href="/local-mode" className="text-emerald hover:underline">
                  Local Mode
                </a>{" "}
                for details.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                Dependency Management
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Third-party dependencies are reviewed before addition. Supply
                chain security practices are applied to avoid introducing
                vulnerable or malicious packages.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Security Contact
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              To report a vulnerability or ask a security question, contact our
              security team directly.
            </p>
          </div>
          <Button href="mailto:security@chairmans.uk" variant="primary">
            security@chairmans.uk
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/trust/responsible-disclosure" variant="secondary">
            Responsible Disclosure
          </Button>
          <Button href="/trust/compliance" variant="ghost">
            Compliance Status
          </Button>
          <Button href="/trust/trust-pack" variant="ghost">
            Request Trust Pack
          </Button>
        </div>
      </section>
    </>
  );
}
