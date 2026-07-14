import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "API Authentication — Chameleon Eye AI",
  description:
    "Authentication methods, API key security, and session token management for Chameleon Eye API.",
};

const apiKeyRules = [
  "API keys must be kept server-side.",
  "Never embed API keys in browser JavaScript, mobile app bundles, or desktop client packages.",
  "Use server-to-server calls from your backend.",
  "Rotate keys immediately if compromised.",
];

const tokenItems = [
  "Desktop Connector uses secure device activation flow.",
  "Short-lived session tokens are issued after device activation.",
  "Tokens expire and require refresh.",
  "Device revocation is available from admin panel.",
];

const securityRecommendations = [
  "Store API keys in environment variables, not in code.",
  "Use secrets managers in production.",
  "Rotate keys on any suspected exposure.",
  "Use scoped keys where available.",
];

export default function AuthenticationPage() {
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
            API Authentication
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Authentication methods, API key security, and session token
            management for Chameleon Eye API.
          </p>
        </div>
      </section>

      {/* A. Authentication Overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Authentication Overview"
          subtitle="Chameleon Eye API is authenticated. All API requests require a valid credential."
          align="left"
        />
        <div className="mt-8 rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm leading-7 text-muted">
            Chameleon Eye API is authenticated. All API requests require a
            valid credential. Unauthenticated requests return HTTP 401.
          </p>
        </div>
      </section>

      {/* B. API Key Rules */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="API Key Rules"
            subtitle="Follow these rules to keep your API keys secure."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {apiKeyRules.map((item) => (
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

      {/* C. Short-Lived Tokens for Desktop/Mobile */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Short-Lived Tokens for Desktop and Mobile"
          subtitle="Desktop Connector and mobile clients use device activation with short-lived tokens."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {tokenItems.map((item) => (
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

      {/* D. Request Headers */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Request Headers"
            subtitle="Include these headers with every authenticated API request."
            align="left"
          />
          <Card className="mt-10 border-emerald/20 bg-background/80 max-w-2xl p-0">
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-muted">
{`Authorization: Bearer <your-api-key>
Content-Type: application/json`}
            </pre>
          </Card>
        </div>
      </section>

      {/* E. Security Recommendations */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Security Recommendations"
          subtitle="Best practices for keeping your credentials safe."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {securityRecommendations.map((item) => (
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

      {/* Back link */}
      <section className="border-t border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button href="/api-docs" variant="secondary">
              Back to API Docs
            </Button>
            <Button href="/api-docs/rate-limits" variant="ghost">
              Rate Limits
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
