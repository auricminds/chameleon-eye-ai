import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "API Rate Limits — Chameleon Eye AI",
  description:
    "Rate limit tiers, error handling, and retry guidance for Chameleon Eye API.",
};

const bestPractices = [
  "Implement exponential backoff on 429 responses.",
  "Cache intelligence outputs where possible to reduce repeated calls.",
  "Use webhooks for asynchronous workflows instead of polling.",
  "Monitor usage via GET /v1/me/usage.",
];

const errorCodes = [
  { code: "401", status: "Unauthorized", meaning: "Missing or invalid API key" },
  { code: "403", status: "Forbidden", meaning: "Insufficient permissions" },
  {
    code: "409",
    status: "Conflict",
    meaning: "consent_required — user approval needed",
  },
  { code: "429", status: "Too Many Requests", meaning: "Rate limit exceeded" },
  {
    code: "500",
    status: "Internal Server Error",
    meaning: "Server error, retry later",
  },
];

export default function RateLimitsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            API Docs
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            API Rate Limits
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Rate limit tiers, error handling, and retry guidance for Chameleon
            Eye API.
          </p>
        </div>
      </section>

      {/* A. Rate Limit Overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Rate Limit Overview"
          subtitle="API usage is plan-limited and rate-limited."
          align="left"
        />
        <div className="mt-8 rounded-2xl border border-white/8 bg-panel p-6">
          <p className="text-sm leading-7 text-muted">
            API usage is plan-limited and rate-limited. Limits depend on
            customer plan and contract. Contact support for limit increases.
          </p>
        </div>
      </section>

      {/* B. Rate Limit Response */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Rate Limit Response"
            subtitle="When rate limited, the API returns HTTP 429 with the following response body."
            align="left"
          />
          <Card className="mt-10 border-gold/20 bg-background/80 max-w-2xl p-0">
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-muted">
{`{
  "error": "rate_limited",
  "message": "Request rate limit exceeded.",
  "retry_after": 60
}`}
            </pre>
          </Card>
          <p className="mt-4 text-xs leading-6 text-muted">
            The <code className="rounded bg-panel2 px-1">retry_after</code>{" "}
            value is in seconds. Wait this duration before retrying.
          </p>
        </div>
      </section>

      {/* C. Best Practices */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Best Practices"
          subtitle="Follow these recommendations to avoid hitting rate limits."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {bestPractices.map((item) => (
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

      {/* D. Error Reference */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Error Reference"
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
                    Status
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
                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                      {row.status}
                    </td>
                    <td className="px-6 py-4 text-muted">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="border-t border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button href="/api-docs" variant="secondary">
              Back to API Docs
            </Button>
            <Button href="/api-docs/authentication" variant="ghost">
              Authentication
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
