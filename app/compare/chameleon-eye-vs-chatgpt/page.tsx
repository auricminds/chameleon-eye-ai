import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Chameleon Eye AI vs ChatGPT — Which is Better for Business?",
  description:
    "Compare Chameleon Eye AI vs ChatGPT for private business intelligence, confidential reports, operational risk detection, and local/private file workflows.",
};

const tableRows = [
  { label: "Main purpose", ce: "Private business intelligence", other: "General AI assistant" },
  { label: "Best for", ce: "Business risk detection, reports, decision support", other: "Writing, Q&A, summarizing, brainstorming" },
  { label: "Input type", ce: "Business files, reports, operational data, APIs", other: "Text prompts, documents, images" },
  { label: "Output type", ce: "Structured reports, risk maps, decision memos", other: "Conversational text, summaries" },
  { label: "Business risk detection", ce: "Yes — cash waste, operational risk, team signals", other: "Limited — no structured risk framework" },
  { label: "Local/private file support", ce: "Yes — local-first and hybrid modes", other: "Cloud-dependent" },
  { label: "API workflow focus", ce: "Yes — risk check, decision memo, pulse events, scoring", other: "OpenAI API for general text generation" },
  { label: "Desktop connector", ce: "Yes — secure device activation, short-lived tokens", other: "No dedicated desktop key management" },
  { label: "Report types", ce: "Risk map, cash waste, team effectiveness, customer friction", other: "General text summaries" },
  { label: "Decision support", ce: "Structured decision memos and next best actions", other: "Conversational suggestions" },
  { label: "Best fit", ce: "Business owners, operations, finance, consultants", other: "Writers, developers, general knowledge workers" },
];

const differences = [
  "Chameleon Eye AI generates structured business intelligence reports — not just text answers.",
  "It supports local/private mode for sensitive documents that should not leave the company network.",
  "It detects hidden cash waste, operational blind spots, and early-warning risk signals.",
  "Its API is designed for business workflows — risk checks, readiness scores, decision memos.",
  "The Desktop Connector uses short-lived tokens and device activation — not static API keys.",
  "Business DNA profiles personalize intelligence outputs to your role and priorities.",
  "It is not a general chatbot and is not designed to replace general-purpose AI assistants.",
];

const faqs = [
  {
    q: "Is Chameleon Eye AI a chatbot like ChatGPT?",
    a: "No. Chameleon Eye AI is a private business intelligence workspace. It analyzes approved business data and generates structured reports, risk maps, and decision memos. It is not designed for general Q&A or casual conversation.",
  },
  {
    q: "Can Chameleon Eye AI replace ChatGPT?",
    a: "They serve different purposes. Use ChatGPT for general questions, writing, and brainstorming. Use Chameleon Eye AI for business blind spots, private files, cash waste detection, risk maps, operational reports, and business decision support.",
  },
  {
    q: "What is Chameleon Eye AI best for?",
    a: "Private business intelligence — detecting hidden operational risks, cash waste, team effectiveness gaps, customer friction, and generating structured reports for business decisions.",
  },
  {
    q: "Does Chameleon Eye AI support local or private files?",
    a: "Yes. Local/private mode allows files to stay on the customer's device. Only approved summaries or selected data are sent to cloud intelligence when the user explicitly chooses.",
  },
  {
    q: "Can Chameleon Eye AI connect through API?",
    a: "Yes. The Chameleon Eye API provides structured business intelligence endpoints for risk checks, readiness scoring, decision memos, Pulse events, and custom business workflows.",
  },
  {
    q: "Is Chameleon Eye AI designed for businesses?",
    a: "Yes. It is built specifically for business owners, operations leads, finance teams, marketing leads, consultants, and enterprise teams who need structured business intelligence — not a general assistant.",
  },
];

export default function VsChatGPTPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <Badge>Compare</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Chameleon Eye AI vs ChatGPT
          </h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Which one is better for private business intelligence, confidential
            reports, operational risk, and local/private file workflows?
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="border-gold/20 bg-panel2">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider">Short answer</p>
          <p className="mt-3 text-base leading-7 text-muted">
            <strong className="text-foreground">Use ChatGPT</strong> when you need general questions answered, writing assistance, summarizing, and brainstorming.
          </p>
          <p className="mt-2 text-base leading-7 text-muted">
            <strong className="text-foreground">Use Chameleon Eye AI</strong> when you need private business intelligence, hidden risk detection, structured reports, local/private mode, API workflows, or a desktop connector for sensitive business files.
          </p>
        </Card>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionTitle title="Feature comparison" align="left" />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-6 py-4 text-left font-semibold text-muted w-1/3">Feature</th>
                <th className="px-6 py-4 text-left font-semibold text-emerald">Chameleon Eye AI</th>
                <th className="px-6 py-4 text-left font-semibold text-muted">ChatGPT</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-white/8 ${i % 2 === 0 ? "bg-panel" : "bg-panel/50"}`}
                >
                  <td className="px-6 py-4 font-medium text-foreground">{row.label}</td>
                  <td className="px-6 py-4 text-emerald">{row.ce}</td>
                  <td className="px-6 py-4 text-muted">{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Where Chameleon Eye AI is different"
            align="left"
          />
          <ul className="mt-8 space-y-3">
            {differences.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 text-emerald shrink-0">✓</span>
                <p className="text-sm leading-7 text-muted">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/20 bg-panel2 p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground">
            Try Chameleon Eye AI
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Start your private business intelligence workspace or request a demo to see structured reports in action.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/signup">Try Chameleon Eye AI</Button>
            <Button href="/contact" variant="secondary">Request Demo</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
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
