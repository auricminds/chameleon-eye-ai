import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Best AI for Operational Risk — Hidden Risk Detection for Business",
  description:
    "Which AI tools can detect hidden operational risk, process failures, repeated delays, cash waste, and customer journey friction? Find the best AI for operational risk.",
};

const riskTypes = [
  {
    title: "Hidden cash waste",
    description: "Marketing channels that generate activity but not profit, unnecessary spend, and budget leakage that does not show in standard reports.",
  },
  {
    title: "Repeated operational mistakes",
    description: "The same errors occurring across teams, locations, or time periods — signals of systemic process weakness rather than individual failure.",
  },
  {
    title: "Weak handovers",
    description: "Tasks that slow down or drop quality when moving between people, teams, or systems — a common source of operational delay and customer impact.",
  },
  {
    title: "Process risk",
    description: "Workflows that depend on manual steps, unclear ownership, or brittle systems that create single points of failure.",
  },
  {
    title: "Customer journey friction",
    description: "Points where customers abandon forms, requests, signups, or purchases — revealing revenue risk hidden in the user experience.",
  },
  {
    title: "Team effectiveness gaps",
    description: "Unclear role ownership, slow decision-making, training shortfalls, and meeting inefficiency that reduce operational performance.",
  },
];

const signals = [
  "Repeated delays in the same workflow stage",
  "Inconsistent output quality across locations or teams",
  "Customers abandoning key conversion points",
  "Marketing spend without traceable revenue impact",
  "Manual workarounds replacing broken systems",
  "Slow decision-making at key escalation points",
  "Lost sales opportunities without structured review",
  "Operational incidents recurring without root cause resolution",
];

const faqs = [
  {
    q: "What is operational risk in a business context?",
    a: "Operational risk is the risk of loss or performance decline from failed internal processes, people, systems, or external events. In practice, it appears as repeated errors, slow handovers, unclear ownership, cash waste, and customer friction.",
  },
  {
    q: "Can AI detect hidden operational risk?",
    a: "Yes. Chameleon Eye AI analyzes approved business data — operational logs, reports, customer journey data, and team signals — to detect patterns that indicate hidden operational risk before they become serious problems.",
  },
  {
    q: "What types of operational risk can Chameleon Eye AI detect?",
    a: "Cash waste, repeated process failures, weak handovers, team effectiveness gaps, customer journey friction, inconsistent location performance, and early-warning signals of systemic operational problems.",
  },
  {
    q: "Is AI operational risk detection the same as a general chatbot?",
    a: "No. General chatbots answer questions and summarize text. Chameleon Eye AI is specifically designed to detect hidden operational risk, generate structured risk maps, and produce decision memos that support business action.",
  },
  {
    q: "How does Chameleon Eye AI report operational risk?",
    a: "Through structured outputs — risk maps with severity levels, cash waste notes, team effectiveness signals, customer journey friction reports, executive summaries, and next best action recommendations.",
  },
];

export default function BestAIOperationalRiskPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <Badge>Guide</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Best AI for Operational Risk
          </h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Which AI tools can detect hidden operational problems, repeated delays,
            weak handovers, process risk, customer journey friction, and cash waste.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/signup">Start Free</Button>
            <Button href="/free-tools" variant="secondary">Try Free Scanners</Button>
            <Button href="/contact" variant="ghost">Request Demo</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Types of operational risk AI can detect"
          subtitle="Chameleon Eye AI is designed to surface hidden operational risks that do not appear in standard reporting."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {riskTypes.map((risk) => (
            <Card key={risk.title} hover>
              <h3 className="text-base font-semibold text-emerald">{risk.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{risk.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Early-warning signals Chameleon Eye AI looks for"
            align="left"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {signals.map((signal) => (
              <div key={signal} className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel p-4">
                <span className="mt-0.5 text-gold shrink-0">⚠</span>
                <p className="text-sm leading-7 text-muted">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="How Chameleon Eye AI reports operational risk"
          align="left"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Risk Map", desc: "Visual severity levels for identified risk areas" },
            { label: "Cash Waste Notes", desc: "Specific areas of detected budget leakage" },
            { label: "Team Effectiveness Signals", desc: "Patterns indicating people and process gaps" },
            { label: "Customer Friction Report", desc: "Journey points causing abandonment or delay" },
            { label: "Executive Summary", desc: "High-level overview for senior decision makers" },
            { label: "Next Best Actions", desc: "Prioritized recommendations based on risk findings" },
          ].map((item) => (
            <Card key={item.label} hover>
              <p className="text-sm font-semibold text-emerald">{item.label}</p>
              <p className="mt-2 text-xs leading-6 text-muted">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-panel/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Find hidden operational risk in your business
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Start with a free cash waste scanner or open a full private intelligence workspace.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/free-tools/cash-waste-scanner">Free Cash Waste Scanner</Button>
            <Button href="/signup" variant="secondary">Start Free Workspace</Button>
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
