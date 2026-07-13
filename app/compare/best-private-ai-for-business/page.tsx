import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Best Private AI for Business — Confidential Intelligence Guide",
  description:
    "How to choose the best private AI for business. Compare privacy features, local mode, confidential file handling, structured reports, API workflows, and desktop connector options.",
};

const features = [
  {
    title: "Local/Private Mode",
    description:
      "Files stay on your device. No cloud upload required for initial analysis. Best for contracts, HR data, financial reports, and other sensitive documents.",
  },
  {
    title: "Confidential File Handling",
    description:
      "Business files should not be processed by general AI systems. A private AI workspace keeps sensitive data within authorized boundaries.",
  },
  {
    title: "Structured Reports",
    description:
      "General chatbots return conversational text. A private business AI should generate structured intelligence reports — risk maps, decision memos, scoring.",
  },
  {
    title: "API Workflows",
    description:
      "Embed private business intelligence into your products, platforms, or internal tools through secure API endpoints.",
  },
  {
    title: "Desktop Connector",
    description:
      "Installed applications need stronger key protection. A private AI with a desktop connector uses short-lived tokens and device activation — not static API keys.",
  },
  {
    title: "Business DNA Profile",
    description:
      "Personalize intelligence outputs to your role, concerns, and business priorities without sharing raw data with a general AI system.",
  },
];

const criteria = [
  { label: "Can files stay on your device?", ce: "Yes — local/private mode" },
  { label: "Generates structured reports?", ce: "Yes — risk maps, memos, scoring" },
  { label: "API for business workflows?", ce: "Yes — purpose-built endpoints" },
  { label: "Desktop connector available?", ce: "Yes — device activation, tokens" },
  { label: "Detects business risk?", ce: "Yes — cash waste, operational risk" },
  { label: "Personalized to your role?", ce: "Yes — Business DNA profiles" },
  { label: "For general chatbot use?", ce: "No — built for business intelligence" },
];

const faqs = [
  {
    q: "What makes an AI truly private for business use?",
    a: "True privacy for business AI means files can stay on the customer's device, data is processed within authorized boundaries, and the system does not train on your confidential business information. Local/private mode and hybrid approval workflows are key features.",
  },
  {
    q: "Is Chameleon Eye AI the best private AI for business?",
    a: "Chameleon Eye AI is built specifically for private business intelligence — local/private file mode, structured reports, API workflows, and desktop connector. It is designed for businesses that handle confidential documents, internal data, and operational information.",
  },
  {
    q: "Can a private business AI work without cloud access?",
    a: "Yes. Chameleon Eye AI's local/private mode allows files to stay on the customer's device. Only approved summaries or selected data are sent to cloud intelligence when the user explicitly chooses.",
  },
  {
    q: "What types of business files does private AI handle?",
    a: "Contracts, HR data, financial reports, operational logs, marketing plans, internal documents, customer journey data, and incident summaries — provided the customer is authorized to use and analyze that data.",
  },
  {
    q: "Is a private AI for business different from a general chatbot?",
    a: "Yes. General chatbots are designed for broad conversations. Private business AI is designed for structured intelligence — detecting cash waste, operational risk, team signals, and generating decision-ready reports from approved business data.",
  },
];

export default function BestPrivateAIPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <Badge>Guide</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Best Private AI for Business
          </h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            How to choose a private AI for confidential files, local mode,
            structured reports, API workflows, and sensitive business data.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/signup">Start Free</Button>
            <Button href="/contact" variant="secondary">Request Demo</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="What to look for in a private AI for business"
          subtitle="Most AI tools are built for general use. Private business AI needs specific capabilities to handle confidential data safely."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <Card key={f.title} hover>
              <h3 className="text-base font-semibold text-emerald">{f.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How Chameleon Eye AI compares"
            subtitle="Chameleon Eye AI is built specifically for private business intelligence."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-panel2">
                  <th className="px-6 py-4 text-left font-semibold text-muted">Criteria</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald">Chameleon Eye AI</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-white/8 ${i % 2 === 0 ? "bg-panel" : "bg-panel/50"}`}
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{row.label}</td>
                    <td className="px-6 py-4 text-emerald">{row.ce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Who needs a private AI for business?"
          align="left"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Business owners handling confidential company data",
            "Finance teams reviewing sensitive financial reports",
            "HR teams working with authorized personnel data",
            "Operations teams analyzing internal process data",
            "Consultants and auditors reviewing client documents",
            "Marketing leads analyzing confidential campaign data",
            "Companies with data residency or cloud upload restrictions",
            "Enterprises embedding business intelligence into internal tools",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel p-4">
              <span className="mt-0.5 text-emerald shrink-0">✓</span>
              <p className="text-sm leading-7 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-panel/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Start your private business intelligence workspace
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Try Chameleon Eye AI with local/private mode, structured reports, and API workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/signup">Start Free</Button>
            <Button href="/private-mode" variant="secondary">Explore Private Mode</Button>
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
