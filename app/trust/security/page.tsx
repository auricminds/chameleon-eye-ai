import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Security — Chameleon Eye AI Trust Center",
  description:
    "How Chameleon Eye AI secures your data: server-side key management, authentication, privacy guard, rate limiting, and security architecture.",
};

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
  {
    label: "Penetration test",
    status: "planned" as const,
    detail:
      "An independent penetration test is planned before general availability of the cloud product.",
  },
  {
    label: "SOC 2 readiness",
    status: "planned" as const,
    detail:
      "SOC 2 Type II readiness is on the compliance roadmap. See the compliance roadmap for timeline.",
  },
];

const architectureNodes = [
  { label: "User App", color: "border-muted/40 bg-panel" },
  { label: "Chairman API", color: "border-emerald/30 bg-emerald/8" },
  { label: "Authentication", color: "border-emerald/30 bg-emerald/8" },
  { label: "Privacy Guard", color: "border-gold/30 bg-gold/8" },
  { label: "Entitlement Check", color: "border-gold/30 bg-gold/8" },
  { label: "Intelligence Router", color: "border-emerald/30 bg-emerald/8" },
  { label: "Approved Engine", color: "border-white/15 bg-panel2" },
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
            How Chameleon protects your data through architecture, access
            control, and operational security practices.
          </p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="border-b border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Security Architecture"
            subtitle="Every request passes through authentication, privacy guard, and entitlement checks before reaching the intelligence router."
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
            The browser communicates only with Chameleon-controlled API routes.
            No AI provider keys are exposed in the frontend. The Approved Engine
            is reached only after all checks pass.
          </p>
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
                All traffic between the client and Chameleon servers uses
                HTTPS/TLS. Strict-Transport-Security headers enforce TLS in
                production environments.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                Local Private Mode
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                In local mode, no data is transmitted to Chameleon or any AI
                provider. Processing remains on-device for maximum isolation.
                See{" "}
                <a
                  href="/local-mode"
                  className="text-emerald hover:underline"
                >
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
          <Button href="mailto:security@chameleoneye.ai" variant="primary">
            security@chameleoneye.ai
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/trust/responsible-disclosure" variant="secondary">
            Responsible Disclosure
          </Button>
          <Button href="/trust/compliance-roadmap" variant="ghost">
            Compliance Roadmap
          </Button>
          <Button href="/security" variant="ghost">
            Security Architecture
          </Button>
        </div>
      </section>
    </>
  );
}
