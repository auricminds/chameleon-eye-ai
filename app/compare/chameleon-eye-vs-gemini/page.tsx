import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Chameleon Eye AI vs Gemini — Private Business Intelligence vs Google AI",
  description:
    "Compare Chameleon Eye AI vs Gemini for confidential business intelligence, local/private mode, API workflows, desktop connector, and business reports.",
};

const tableRows = [
  { label: "Main purpose", ce: "Private business intelligence", other: "Google-connected AI productivity assistant" },
  { label: "Best for", ce: "Business risk detection, structured reports, decision support", other: "Google Workspace integration, productivity, search" },
  { label: "Input type", ce: "Business files, reports, operational data, APIs", other: "Text, documents, Google services, images" },
  { label: "Output type", ce: "Structured reports, risk maps, decision memos", other: "Conversational text, productivity outputs" },
  { label: "Business risk detection", ce: "Yes — cash waste, operational risk, team signals", other: "Not designed for structured business risk detection" },
  { label: "Local/private file support", ce: "Yes — local-first and hybrid modes", other: "Requires Google account and cloud processing" },
  { label: "API workflow focus", ce: "Yes — risk check, decision memo, pulse events, scoring", other: "Google Gemini API for general AI tasks" },
  { label: "Desktop connector", ce: "Yes — secure device activation, short-lived tokens", other: "No dedicated desktop key management system" },
  { label: "Report types", ce: "Risk map, cash waste, team effectiveness, customer friction", other: "General summaries and productivity outputs" },
  { label: "Decision support", ce: "Structured decision memos and next best actions", other: "AI-assisted productivity suggestions" },
  { label: "Best fit", ce: "Business owners, operations, finance, consultants", other: "Google Workspace users, productivity-focused teams" },
];

const differences = [
  "Chameleon Eye AI does not require a Google account or Google Workspace connection.",
  "Local/private mode keeps confidential business files off cloud servers entirely.",
  "It generates structured business intelligence outputs — not general productivity text.",
  "The API is built for business workflow integration, risk checks, and decision memos.",
  "It detects hidden cash waste, operational blind spots, and early-warning risk signals.",
  "Business DNA profiles personalize intelligence outputs to your role and business priorities.",
  "The Desktop Connector provides secure key management for locally installed business applications.",
];

const faqs = [
  {
    q: "Is Chameleon Eye AI a chatbot like Gemini?",
    a: "No. Chameleon Eye AI is a private business intelligence workspace. It produces structured reports, risk maps, and decision memos from approved business data — not general AI conversation.",
  },
  {
    q: "Can Chameleon Eye AI replace Gemini?",
    a: "They serve different purposes. Use Gemini for Google-connected AI assistance and productivity. Use Chameleon Eye AI for confidential business intelligence, local/private mode, API workflows, desktop connector, and structured business reports.",
  },
  {
    q: "What is Chameleon Eye AI best for?",
    a: "Private business intelligence — detecting hidden operational risks, cash waste, team signals, and customer friction — and generating structured reports for business decision-making.",
  },
  {
    q: "Does Chameleon Eye AI support local or private files?",
    a: "Yes. Local/private mode allows sensitive business files to stay on the customer's device. This is particularly valuable for businesses with data residency requirements or cloud upload restrictions.",
  },
  {
    q: "Can Chameleon Eye AI connect through API?",
    a: "Yes. The Chameleon Eye API provides structured business intelligence endpoints — risk checks, readiness scoring, decision memos, Pulse events, and custom business workflows.",
  },
  {
    q: "Is Chameleon Eye AI designed for businesses?",
    a: "Yes. It is built specifically for business owners, operations leads, finance teams, marketing leads, consultants, and enterprise teams who need structured business intelligence.",
  },
];

export default function VsGeminiPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <Badge>Compare</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Chameleon Eye AI vs Gemini
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
            <strong className="text-foreground">Use Gemini</strong> when you need Google-connected AI assistance, productivity help, and integration with Google Workspace tools.
          </p>
          <p className="mt-2 text-base leading-7 text-muted">
            <strong className="text-foreground">Use Chameleon Eye AI</strong> when you need confidential business intelligence, local/private mode, API workflows, desktop connector, and structured business reports that stay private.
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
                <th className="px-6 py-4 text-left font-semibold text-muted">Gemini</th>
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
          <SectionTitle title="Where Chameleon Eye AI is different" align="left" />
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
          <h2 className="text-2xl font-semibold text-foreground">Try Chameleon Eye AI</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Start your private business intelligence workspace or request a demo.
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
