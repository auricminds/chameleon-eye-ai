import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Best AI API for Business Workflows — Structured Intelligence Endpoints",
  description:
    "Compare AI APIs for business workflows. Structured outputs, risk checks, readiness scoring, safe drafts, decision memos, Pulse events, and custom workflows.",
};

const endpoints = [
  {
    title: "Risk Check API",
    endpoint: "POST /v1/risk/check",
    description: "Detect operational, financial, and process risk from submitted business data. Returns structured risk level, confidence score, and signals.",
  },
  {
    title: "Readiness Scoring API",
    endpoint: "POST /v1/guidance/profile-check",
    description: "Score business or team readiness against defined criteria. Returns readiness level, gaps, and recommended next steps.",
  },
  {
    title: "Decision Memo API",
    endpoint: "POST /v1/decision/memo",
    description: "Generate structured decision memos from business context. Returns executive summary, key findings, and recommended actions.",
  },
  {
    title: "Pulse Events API",
    endpoint: "POST /v1/pulse/events",
    description: "Stream early-warning business signals and trigger structured alerts when defined thresholds are crossed.",
  },
  {
    title: "Business Scoring API",
    endpoint: "POST /v1/workflows/{client}/{workflow}",
    description: "Custom scoring and intelligence workflows designed for specific business use cases and industry requirements.",
  },
  {
    title: "Draft API",
    endpoint: "POST /v1/draft",
    description: "Generate structured report drafts, briefings, and summaries from approved business data for human review before distribution.",
  },
];

const useCases = [
  {
    title: "SaaS platforms",
    description: "Embed business intelligence scoring and risk checks directly into your platform dashboard.",
  },
  {
    title: "Internal tools",
    description: "Add structured intelligence reports to your company's internal tools, portals, and dashboards.",
  },
  {
    title: "CRM systems",
    description: "Surface customer risk signals and readiness scores inside your CRM workflows.",
  },
  {
    title: "HR platforms",
    description: "Add team effectiveness scoring and role readiness signals to authorized HR workflows.",
  },
  {
    title: "Marketplaces",
    description: "Embed business health scoring and risk checks into marketplace verification flows.",
  },
  {
    title: "Desktop applications",
    description: "Connect desktop apps through the Desktop Connector using short-lived tokens and device activation.",
  },
];

const faqs = [
  {
    q: "What makes Chameleon Eye API different from general AI APIs?",
    a: "General AI APIs return conversational text. Chameleon Eye API returns structured business intelligence — risk levels, confidence scores, signals, decision memos, and scored recommendations. It is designed for business workflow integration, not general text generation.",
  },
  {
    q: "Is the API safe for desktop and mobile applications?",
    a: "Yes. Desktop and mobile apps should use the Desktop Connector with secure login, device activation, and short-lived tokens rather than embedding static API keys. This prevents key exposure in distributed applications.",
  },
  {
    q: "Can I embed Chameleon Eye intelligence in my own product?",
    a: "Yes. The Chameleon Eye API is designed to be embedded into SaaS platforms, internal tools, CRM systems, HR platforms, marketplaces, and desktop applications.",
  },
  {
    q: "What data does the API accept?",
    a: "The API accepts approved business data that the customer is authorized to submit — reports, structured data, workflow context, and business signals. It does not accept unauthorized or illegally obtained data.",
  },
  {
    q: "Can I create custom business workflows through the API?",
    a: "Yes. The custom workflow endpoint allows you to define business-specific intelligence workflows tailored to your industry, use case, and output requirements.",
  },
];

export default function BestAIAPIBusinessWorkflowsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <Badge>Guide</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Best AI API for Business Workflows
          </h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Structured API outputs for risk checks, readiness scoring, safe
            drafts, decision memos, Pulse events, and custom business workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/api">Explore API</Button>
            <Button href="/signup" variant="secondary">Start Free</Button>
            <Button href="/contact" variant="ghost">Request Demo</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Chameleon Eye API endpoints"
          subtitle="Purpose-built API endpoints for embedding structured business intelligence into your products and workflows."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {endpoints.map((ep) => (
            <Card key={ep.title} hover>
              <h3 className="text-base font-semibold text-foreground">{ep.title}</h3>
              <p className="mt-2 font-mono text-xs text-emerald">{ep.endpoint}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{ep.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What products can use the Chameleon Eye API?"
            subtitle="Any product that needs structured business intelligence embedded — not just a general AI chat interface."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <Card key={uc.title} hover>
                <h3 className="text-base font-semibold text-emerald">{uc.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{uc.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle title="Example API response" align="left" />
        <Card className="mt-8 border-emerald/20 bg-background/80 p-0">
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-muted">
{`{
  "riskLevel": "medium",
  "confidence": "high",
  "signals": [
    "Repeated handover delay identified",
    "Unclear task ownership in stage 3",
    "Customer abandonment at checkout step 2"
  ],
  "businessImpact": "Possible revenue and operational slowdown",
  "cashWasteEstimate": "moderate",
  "nextBestAction": "Review handover process and checkout flow before scaling.",
  "reportType": "operational_risk",
  "generatedAt": "2026-07-11T10:00:00Z"
}`}
          </pre>
        </Card>
      </section>

      <section className="border-t border-white/8 bg-panel/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Embed business intelligence in your product
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Explore the Chameleon Eye API documentation or request a custom workflow discussion.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/api">Explore API Docs</Button>
            <Button href="/desktop" variant="secondary">Desktop Connector</Button>
            <Button href="/contact" variant="ghost">Request Demo</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle title="Frequently asked questions" />
        <div className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-white/8 bg-panel p-6">
              <h3 className="text-base font-semibold text-foreground">{faq.q}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
