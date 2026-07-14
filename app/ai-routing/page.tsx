import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Chameleon Intelligence Routing",
  description:
    "How Chameleon classifies business tasks and routes them through the appropriate approved intelligence path.",
};

const taskCategories = [
  { name: "General business", desc: "Operational questions, summaries, and business overviews." },
  { name: "Deep strategy", desc: "Long-horizon planning, competitive positioning, and growth analysis." },
  { name: "Finance and accounting", desc: "Revenue analysis, cost review, cash flow signals, and financial risk." },
  { name: "Legal and compliance risk", desc: "Contract review signals, compliance gap detection, and risk flagging." },
  { name: "Coding, API, and product", desc: "Technical review, API design feedback, and product logic analysis." },
  { name: "Architecture and project review", desc: "System design review, project health signals, and delivery risk." },
  { name: "Document analysis", desc: "Approved document processing, extraction, and structured summary." },
  { name: "Image and screenshot analysis", desc: "Visual document review, screenshot interpretation, and image-based data extraction." },
  { name: "Marketing and sales", desc: "Campaign analysis, positioning review, and conversion signal detection." },
  { name: "HR and team", desc: "Team effectiveness signals, skill gap detection, and role readiness analysis." },
  { name: "Risk review", desc: "Structured risk scoring, categorization, and actionable risk output." },
  { name: "Arabic executive response", desc: "Business-context aware responses formatted for Arabic-speaking executives." },
  { name: "Fast answer", desc: "Rapid structured output for time-sensitive operational questions." },
  { name: "Fallback safe route", desc: "Conservative path for ambiguous requests — prioritizes accuracy over speed." },
];

const flowSteps = [
  { label: "User request", color: "bg-panel border-white/15" },
  { label: "Task classifier", color: "bg-emerald/10 border-emerald/30" },
  { label: "Chameleon rules", color: "bg-gold/10 border-gold/30" },
  { label: "Privacy mode check", color: "bg-panel2 border-white/15" },
  { label: "Approved intelligence route", color: "bg-emerald/10 border-emerald/30" },
  { label: "Chameleon formatted answer", color: "bg-gold/10 border-gold/30" },
];

const faqs = [
  {
    q: "Why does Chameleon not show the model name?",
    a: "Chameleon is designed for business users. The routing layer is kept internal so users can focus on reports, risk reviews, decisions, and operations — not on managing, comparing, or selecting AI model providers. Business users should not need to understand infrastructure to get business-grade outputs.",
  },
  {
    q: "Is Chameleon just a wrapper around an AI model?",
    a: "No. Chameleon is a private-source business AI platform. Approved intelligence infrastructure may be connected behind the scenes, but the platform adds task classification, business routing rules, Business DNA context injection, privacy mode checks, workflow logic, structured report formats, risk scoring, role permissions, and industry-specific systems. None of that exists in a raw AI model call.",
  },
  {
    q: "Can I choose which intelligence route is used?",
    a: "Routing decisions are managed by Chameleon's internal classification layer based on task type, business context, privacy settings, and platform rules. Enterprise clients can discuss approved-routing policies and custom routing rules as part of an enterprise scope engagement.",
  },
  {
    q: "What happens when privacy mode is enabled?",
    a: "When privacy mode is active, the routing layer checks whether a task can be handled locally before considering any cloud path. Tasks that can be processed locally remain on your device. Cloud analysis is only invoked for tasks that genuinely require it, and only after the privacy check passes.",
  },
];

export default function AiRoutingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Intelligence Routing
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Chameleon Intelligence Routing
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon does not expose raw model providers. It classifies each
            business task and routes it through the most suitable approved
            intelligence path — transparently and without requiring users to
            understand the underlying infrastructure.
          </p>
        </div>
      </section>

      {/* Task Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Task Categories"
          subtitle="Chameleon recognises these task types and routes each through the appropriate intelligence path."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {taskCategories.map((cat) => (
            <Card key={cat.name} hover>
              <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
              <p className="mt-2 text-xs leading-6 text-muted">{cat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Flow */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Request Flow"
            subtitle="Every request follows this path — no exceptions."
            align="left"
          />
          <div className="mt-10 overflow-x-auto">
            <div className="flex min-w-max items-center gap-3">
              {flowSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div
                    className={`rounded-xl border px-5 py-3 text-center text-sm font-medium text-foreground ${step.color}`}
                  >
                    {step.label}
                  </div>
                  {i < flowSteps.length - 1 && (
                    <span className="text-muted">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs leading-6 text-muted">
            The browser communicates only with Chameleon backend routes. Approved
            intelligence infrastructure is accessed server-side only — never
            from the client.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Routing FAQ"
          subtitle="Common questions about how Chameleon routes intelligence tasks."
          align="left"
        />
        <div className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <Card key={faq.q}>
              <h3 className="text-base font-semibold text-foreground">{faq.q}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{faq.a}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/architecture" variant="secondary">
            Platform Architecture
          </Button>
          <Button href="/trust" variant="ghost">
            Trust Center
          </Button>
        </div>
      </section>
    </>
  );
}
