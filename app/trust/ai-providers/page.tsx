import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "AI Intelligence Providers — Chameleon Eye AI",
  description:
    "How Chameleon Eye AI selects and routes intelligence requests. Controlled intelligence router and privacy commitments.",
};

const providerCategories = [
  {
    label: "Offline Local Processing",
    description:
      "No third-party AI API is contacted. Processing remains entirely on the user's device or local deployment.",
    status: "implemented" as const,
  },
  {
    label: "Hybrid Approval Processing",
    description:
      "Local-first analysis. Only selected text or approved summaries are sent to cloud AI after explicit user approval.",
    status: "implemented" as const,
  },
  {
    label: "Private Cloud / ZDR Route",
    description:
      "Approved cloud AI route with stricter retention requirements where the provider contract supports zero data retention. If this route is required but unavailable, the request is blocked rather than silently downgraded.",
    status: "implemented" as const,
  },
  {
    label: "Standard Cloud / API Processing",
    description:
      "Approved payload only. Plan and permission controlled. For normal business intelligence workflows.",
    status: "implemented" as const,
  },
];

const faqs = [
  {
    q: "Does Chameleon Eye AI share my data with AI providers?",
    a: "Cloud intelligence mode may send selected text to approved infrastructure. Private local mode sends nothing to the cloud. Your full private archive, local documents, and stored files are never automatically forwarded to any AI provider.",
  },
  {
    q: "Can I see which provider was used?",
    a: "The technical routing is kept internal. You see the result, not the infrastructure. This is by design — Chameleon Eye AI adds routing rules, privacy guards, business logic, and consent controls on top of any approved infrastructure.",
  },
  {
    q: "Will provider names or routes change?",
    a: "Provider names and routes may change as part of reliability, privacy, cost, and availability controls. Sensitive cloud analysis requires explicit user approval regardless of which route is used.",
  },
];

export default function AiProvidersPage() {
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
            AI Intelligence Providers
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            How Chameleon Eye AI selects and routes intelligence requests.
          </p>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/8 bg-panel p-8">
          <p className="text-base leading-8 text-muted">
            Chameleon Eye AI uses a controlled intelligence router. The router
            decides whether a request should remain local, require user
            approval, or use approved cloud AI infrastructure. No AI provider
            details are exposed to the frontend or transmitted to the browser.
          </p>
        </div>
      </section>

      {/* Provider Categories */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Intelligence Route Categories"
          subtitle="The types of processing paths Chameleon Eye AI may use, by category."
          align="left"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {providerCategories.map((cat) => (
            <Card key={cat.label} hover>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-foreground">
                  {cat.label}
                </h3>
                <StatusChip status={cat.status} />
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">
                {cat.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Statements */}
      <section className="border-y border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm leading-7 text-muted">
              Provider names and routes may change as part of reliability,
              privacy, cost, and availability controls.
            </p>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm leading-7 text-muted">
              Sensitive cloud analysis should use approved privacy routes. If
              required privacy controls are unavailable, the request is blocked
              rather than silently downgraded.
            </p>
          </div>
        </div>
      </section>

      {/* No-Training Policy */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="No-Training Policy"
            subtitle="Your private data is never used to train public models."
            align="left"
          />
          <Card className="mt-10">
            <p className="text-sm leading-7 text-muted">
              Chameleon Eye AI does not use customer private files, prompts, or
              business data to train a public model. Your content is used only
              to generate your requested output. This applies to all Chameleon Eye AI
              intelligence routes — cloud and local.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Common questions about how Chameleon Eye AI routes intelligence requests."
            align="left"
          />
          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <h3 className="text-base font-semibold text-foreground">
                  {faq.q}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
