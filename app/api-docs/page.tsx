import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Chameleon Eye API Docs",
  description:
    "The Chameleon Eye AI business intelligence API — connect workflows, documents, reports, risk reviews, and industry systems.",
};

const endpoints = [
  {
    method: "GET",
    path: "/health",
    desc: "API health check.",
  },
  {
    method: "GET",
    path: "/v1/me/usage",
    desc: "Usage and quota check.",
  },
  {
    method: "POST",
    path: "/v1/risk/check",
    desc: "Business risk analysis.",
  },
  {
    method: "POST",
    path: "/v1/decision/memo",
    desc: "Decision memo generation.",
  },
  {
    method: "POST",
    path: "/v1/report/structured",
    desc: "Structured intelligence report.",
  },
  {
    method: "POST",
    path: "/v1/desktop/activate",
    desc: "Desktop connector device activation.",
  },
  {
    method: "POST",
    path: "/v1/desktop/refresh-token",
    desc: "Token refresh.",
  },
  {
    method: "POST",
    path: "/v1/desktop/revoke-device",
    desc: "Revoke device access.",
  },
];

const webhookEvents = [
  {
    event: "report.generated",
    desc: "Fired when a report generation completes.",
  },
  {
    event: "risk_review.created",
    desc: "Fired when a risk review is created.",
  },
  {
    event: "device.activated",
    desc: "Fired when a desktop device is activated.",
  },
  {
    event: "device.revoked",
    desc: "Fired when a desktop device is revoked.",
  },
];

const apiSafety = [
  { label: "Scoped API keys", status: "implemented" as const },
  { label: "Read-only key type", status: "implemented" as const },
  { label: "Test and live key separation", status: "implemented" as const },
  { label: "Key revocation", status: "implemented" as const },
  { label: "Audit logs for API access", status: "planned" as const },
  { label: "Rate limits", status: "planned" as const },
];

const securityControls = [
  "Chameleon Eye API is authenticated.",
  "Customer apps should call from server-side.",
  "API keys must not be embedded in clients.",
  "Short-lived tokens for approved desktop and mobile flows.",
  "Site connector keys are server-side only.",
  "Raw provider model IDs are not accepted from clients.",
  "Provider keys are never exposed to browser, desktop, or mobile clients.",
  "Rate limiting is planned — currently not enforced in developer preview.",
];

const dataHandling = [
  "Private archives are not sent by default.",
  "Selected text requires approval before cloud processing.",
  "Usage metadata is recorded for billing, abuse prevention, and audit integrity.",
  "Raw private content is not logged by default.",
];

const errorCodes = [
  { code: "401", meaning: "Unauthorized — missing or invalid key" },
  { code: "403", meaning: "Forbidden — insufficient permissions" },
  {
    code: "409",
    meaning: "consent_required — user approval needed before cloud processing",
  },
  { code: "429", meaning: "rate_limited — retry after specified seconds" },
  { code: "500", meaning: "internal_error — contact support if persistent" },
];

export default function ApiDocsPage() {
  return (
    <>
      {/* Developer Preview Banner */}
      <div className="border-b border-gold/30 bg-gold/8 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gold">Developer Preview</p>
              <p className="text-xs leading-5 text-muted mt-0.5">
                The endpoint structures shown here describe the planned Chameleon Eye API.
                Production access is not yet generally available.
              </p>
            </div>
            <Button href="/contact" variant="ghost">
              Join API Early Access
            </Button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            API
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Chameleon Eye API
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            A business intelligence API — not a raw model API. Connect your
            workflows, documents, reports, risk reviews, industry systems, and
            private intelligence outputs to Chameleon Eye AI through structured,
            scoped endpoints.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="API Overview"
          subtitle="What the Chameleon Eye API is designed for."
          align="left"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Card>
            <h3 className="text-sm font-semibold text-foreground">
              Business Intelligence
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Submit business context, operational data, or document content and
              receive structured intelligence outputs — risk scores, report
              content, decision support, and next-best-action recommendations.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-foreground">
              Industry System Integration
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Connect your workflows to Chameleon Eye AI&apos;s industry-specific
              endpoints. Operational events can be piped in and out via API.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-foreground">
              Event Webhooks
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Subscribe to platform events and receive real-time notifications
              when reports are generated, risk reviews are created, or
              operational status changes occur.
            </p>
          </Card>
        </div>
      </section>

      {/* Endpoints */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Planned Endpoints"
            subtitle="Endpoint structures planned for the Chameleon Eye API. These describe the Developer Preview — production access is not yet generally available."
            align="left"
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/8 bg-background">
            <div className="border-b border-white/8 px-6 py-3">
              <span className="text-xs font-medium text-muted">
                Chameleon Eye API v1 — Developer Preview
              </span>
            </div>
            <div className="divide-y divide-white/8">
              {endpoints.map((ep) => (
                <div
                  key={ep.path}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="shrink-0 rounded bg-emerald/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald">
                    {ep.method}
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {ep.path}
                  </span>
                  <span className="text-sm text-muted sm:ml-auto">
                    {ep.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Example Request */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Example Request"
          subtitle="A sample POST /v1/risk/check request with approved business summary text."
          align="left"
        />
        <Card className="mt-10 border-emerald/20 bg-background/80 max-w-3xl p-0">
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-muted">
{`POST /v1/risk/check
Authorization: Bearer <your-api-key>
Content-Type: application/json

{
  "workspace_id": "ws_example123",
  "content_type": "business_summary",
  "approved_text": "Q3 revenue declined 12% vs Q2. Team headcount reduced by 3. Two key enterprise contracts are pending renewal."
}`}
          </pre>
        </Card>
      </section>

      {/* Authentication */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Authentication"
            subtitle="API keys are scoped to specific permissions and follow a structured naming format."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="text-sm font-semibold text-foreground">
                Key format
              </h3>
              <div className="mt-4 rounded-xl border border-white/8 bg-background px-4 py-3 font-mono text-sm text-muted">
                che_live_<span className="text-emerald">************</span>
              </div>
              <p className="mt-4 text-xs leading-6 text-muted">
                Chameleon Eye API keys follow this format. Test keys use{" "}
                <code className="rounded bg-panel2 px-1">che_test_</code> prefix.
                Keys are scoped to specific permissions and can be revoked at any
                time. Real keys are never shown in documentation or exposed in
                frontend code.
              </p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-foreground">
                Key types
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-emerald">·</span>
                  <span>
                    <strong className="text-foreground">Live key</strong> — for
                    production use, scoped to approved operations
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald">·</span>
                  <span>
                    <strong className="text-foreground">Test key</strong> — for
                    development and integration testing
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald">·</span>
                  <span>
                    <strong className="text-foreground">Read-only key</strong> —
                    for dashboards and monitoring integrations
                  </span>
                </li>
              </ul>
            </Card>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/api-docs/authentication" variant="secondary">
              Authentication Details
            </Button>
            <Button href="/api-docs/rate-limits" variant="ghost">
              Rate Limits
            </Button>
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section className="border-b border-white/8 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Webhook Events"
            subtitle="Subscribe to platform events to trigger your own workflows."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {webhookEvents.map((wh) => (
              <Card key={wh.event}>
                <code className="text-sm text-emerald">{wh.event}</code>
                <p className="mt-2 text-xs leading-6 text-muted">{wh.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Safety */}
      <section className="border-b border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="API Safety Controls"
            subtitle="Key management and access control status."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {apiSafety.map((item) => (
              <Card
                key={item.label}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-sm text-foreground">{item.label}</span>
                <StatusChip status={item.status} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security and Access */}
      <section className="border-b border-white/8 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Security and Access"
            subtitle="How Chameleon Eye API protects requests and prevents unauthorised access."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {securityControls.map((item) => (
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

      {/* Data Handling */}
      <section className="border-b border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Data Handling"
            subtitle="How Chameleon Eye API handles customer data during processing."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {dataHandling.map((item) => (
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

      {/* Error Codes */}
      <section className="border-b border-white/8 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Error Codes"
            subtitle="HTTP status codes returned by Chameleon Eye API."
            align="left"
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-panel2">
                  <th className="px-6 py-3 text-left font-medium text-muted">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-muted">
                    Meaning
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {errorCodes.map((row) => (
                  <tr
                    key={row.code}
                    className="bg-panel hover:bg-panel2 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-foreground whitespace-nowrap">
                      {row.code}
                    </td>
                    <td className="px-6 py-4 text-muted">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="border-gold/20 bg-gold/5">
            <h2 className="text-base font-semibold text-foreground mb-3">
              API Early Access
            </h2>
            <p className="text-sm leading-7 text-muted">
              The Chameleon Eye API is in Developer Preview. The endpoint
              structures shown here describe the planned API. Production access
              is not yet generally available. Join the early access list to be
              notified when production API access opens.
            </p>
          </Card>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact" variant="secondary">
              Join API Early Access
            </Button>
            <Button href="/api-docs/authentication" variant="ghost">
              Authentication
            </Button>
            <Button href="/api-docs/rate-limits" variant="ghost">
              Rate Limits
            </Button>
            <Button href="/trust" variant="ghost">
              Trust Center
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
