import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Developer Documentation — Chameleon Eye API",
  description:
    "API documentation, authentication guide, endpoint reference, and code examples for Chameleon Eye AI.",
};

const endpoints = [
  { method: "GET", path: "/health", desc: "API health and status check" },
  { method: "GET", path: "/v1/me/usage", desc: "Usage counters and quota" },
  { method: "POST", path: "/v1/risk/check", desc: "Business risk analysis" },
  { method: "POST", path: "/v1/decision/memo", desc: "Decision memo generation" },
  { method: "POST", path: "/v1/report/structured", desc: "Structured intelligence report" },
  { method: "POST", path: "/v1/desktop/activate", desc: "Desktop Connector device activation" },
  { method: "POST", path: "/v1/desktop/refresh-token", desc: "Token refresh" },
  { method: "POST", path: "/v1/desktop/revoke-device", desc: "Revoke device access" },
];

const errorCodes = [
  { code: "unauthorized", status: 401, meaning: "Missing or invalid API key" },
  { code: "forbidden", status: 403, meaning: "Insufficient plan permissions" },
  { code: "consent_required", status: 409, meaning: "User approval needed before cloud processing" },
  { code: "privacy_route_unavailable", status: 423, meaning: "Required ZDR route unavailable" },
  { code: "rate_limited", status: 429, meaning: "Request rate limit exceeded — retry after N seconds" },
  { code: "internal_error", status: 500, meaning: "Server error — contact support if persistent" },
];

const securityNotes = [
  "Keep API keys server-side only — never embed in browser, mobile, or desktop bundles",
  "Use short-lived tokens for desktop/mobile flows via Device Activation",
  "Rotate keys immediately on any suspected exposure",
  "All API requests require HTTPS",
];

const curlExample = `curl -X POST https://chameleoneye.ai/api/v1/risk/check \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workspace_id": "ws_demo123",
    "content_type": "business_summary",
    "approved_text": "Q3 revenue declined 12% vs Q2. Two enterprise contracts pending renewal."
  }'`;

const responseExample = `{
  "task_type": "risk_review",
  "risk_level": "medium",
  "answer": "Three operational signals identified...",
  "mode": "deep_strategy",
  "created_at": "2026-07-15T10:00:00Z"
}`;

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Badge variant="emerald">Developers</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Build with Chameleon Eye AI
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Authenticated API for embedding structured private intelligence into
            approved products and business systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">
              Request API Access
            </Button>
            <Button href="/api-docs" variant="secondary">
              Full API Docs
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Quick Start"
          subtitle="Get up and running with Chameleon Eye API in four steps."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "1", title: "Request API access", desc: "Submit a request via /contact. API access is approved for business and partner use cases.", action: { label: "Request access", href: "/contact" } },
            { step: "2", title: "Receive credentials", desc: "You will receive scoped API credentials after approval. Keys follow the che_live_ format." },
            { step: "3", title: "Make your first request", desc: "POST to /api/v1/risk/check with your workspace_id and approved_text payload." },
            { step: "4", title: "Handle the response", desc: "Parse the structured intelligence response containing risk_level, answer, and mode fields." },
          ].map((item) => (
            <Card key={item.step}>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald/10 text-emerald text-xs font-bold border border-emerald/20">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm leading-6 text-muted">{item.desc}</p>
              {item.action && (
                <div className="mt-3">
                  <Button href={item.action.href} variant="ghost">
                    {item.action.label}
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Authentication Example */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Authentication Example"
            subtitle="A sample authenticated POST request to the risk analysis endpoint."
            align="left"
          />
          <div className="mt-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
              Request
            </p>
            <pre className="bg-background border border-white/10 rounded-xl p-4 font-mono text-sm text-emerald overflow-x-auto leading-7">
              {curlExample}
            </pre>
          </div>

          {/* Response Example */}
          <div className="mt-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
              Response
            </p>
            <pre className="bg-background border border-white/10 rounded-xl p-4 font-mono text-sm text-emerald overflow-x-auto leading-7">
              {responseExample}
            </pre>
          </div>
        </div>
      </section>

      {/* Core Endpoints */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Core Endpoints"
          subtitle="Available endpoints in the Chameleon Eye API v1."
          align="left"
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/8 bg-background">
          <div className="border-b border-white/8 px-6 py-3">
            <span className="text-xs font-medium text-muted">
              Base URL: https://chameleoneye.ai/api
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
                <span className="font-mono text-sm text-foreground">{ep.path}</span>
                <span className="text-sm text-muted sm:ml-auto">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Button href="/api-docs" variant="secondary">
            View Full API Reference
          </Button>
        </div>
      </section>

      {/* Error Codes */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Error Codes"
            subtitle="Standard error codes returned by Chameleon Eye API."
            align="left"
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-panel2">
                  <th className="px-6 py-3 text-left font-medium text-muted">Code</th>
                  <th className="px-6 py-3 text-left font-medium text-muted">HTTP Status</th>
                  <th className="px-6 py-3 text-left font-medium text-muted">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {errorCodes.map((row) => (
                  <tr key={row.code} className="bg-panel hover:bg-panel2 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-medium text-emerald whitespace-nowrap">
                      {row.code}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-foreground whitespace-nowrap">
                      {row.status}
                    </td>
                    <td className="px-6 py-4 text-muted">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Button href="/api-docs/rate-limits" variant="secondary">
              View Rate Limits
            </Button>
          </div>
        </div>
      </section>

      {/* Data Handling Note */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Data Handling"
          subtitle="How the Chameleon Eye API handles submitted content."
          align="left"
        />
        <Card className="mt-10 max-w-3xl border-emerald/20">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-emerald shrink-0 text-lg">+</span>
            <p className="text-sm leading-7 text-muted">
              Chameleon Eye API never accepts raw full archive uploads, local file dumps, or
              automated full document library transfers. Only approved payloads are processed. In
              Offline Local Mode, no third-party AI API is contacted.
            </p>
          </div>
        </Card>
        <div className="mt-6">
          <Button href="/api-docs/data-handling" variant="secondary">
            Full Data Handling Policy
          </Button>
        </div>
      </section>

      {/* Security Notes */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Key Security Notes"
            subtitle="Practices required for all API integrations."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {securityNotes.map((note) => (
              <div
                key={note}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
              >
                <span className="mt-1 text-emerald shrink-0">+</span>
                <span className="text-sm text-foreground">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="border-b border-white/8 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Documentation"
            subtitle="Explore the full Chameleon Eye developer documentation."
            align="left"
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/api-docs" variant="secondary">
              Full API Docs
            </Button>
            <Button href="/api-docs/authentication" variant="ghost">
              Authentication Guide
            </Button>
            <Button href="/api-docs/rate-limits" variant="ghost">
              Rate Limits
            </Button>
            <Button href="/api-docs/data-handling" variant="ghost">
              Data Handling
            </Button>
            <Button href="/contact" variant="ghost">
              Request API Access
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
