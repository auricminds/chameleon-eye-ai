import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Best AI for Company Documents — Private Document Intelligence",
  description:
    "Compare AI options for internal files, contracts, HR data, approved reports, and company documents. Find the best AI for private document analysis.",
};

const documentTypes = [
  {
    title: "Internal reports",
    description: "Operational reports, management summaries, department updates, and performance data.",
  },
  {
    title: "Contracts and agreements",
    description: "Business contracts, vendor agreements, client terms, and compliance documents.",
  },
  {
    title: "HR data where authorized",
    description: "Approved personnel records, team performance data, training records, and role readiness information.",
  },
  {
    title: "Financial documents",
    description: "Budgets, forecasts, expense reports, and financial summaries for authorized review.",
  },
  {
    title: "Marketing plans",
    description: "Campaign briefs, audience research, channel plans, and competitive analyses.",
  },
  {
    title: "Operational logs",
    description: "Process logs, error reports, delay records, and workflow data for operational review.",
  },
];

const requirements = [
  { label: "Files can stay on device?", ce: "Yes — local/private mode" },
  { label: "No cloud upload required?", ce: "Yes — local-first mode available" },
  { label: "Structured output from documents?", ce: "Yes — risk maps, summaries, memos" },
  { label: "Private analysis before sharing?", ce: "Yes — hybrid approval mode" },
  { label: "API access for document workflows?", ce: "Yes — document analysis endpoints" },
  { label: "Business risk detection from files?", ce: "Yes — operational and financial risk" },
  { label: "Authorized data only?", ce: "Yes — customer controls what is analyzed" },
];

const faqs = [
  {
    q: "What types of company documents can AI analyze?",
    a: "Internal reports, contracts, HR data (where authorized), financial documents, marketing plans, operational logs, and customer journey data. The customer must be authorized to use and analyze the data they submit.",
  },
  {
    q: "Can AI analyze company documents without uploading to the cloud?",
    a: "Yes. Chameleon Eye AI's local/private mode allows documents to stay on the customer's device. Only approved summaries or selected data are sent to cloud intelligence when the user explicitly chooses.",
  },
  {
    q: "Is Chameleon Eye AI secure for company documents?",
    a: "Chameleon Eye AI works only with data, systems, files, and workflows the customer is authorized to use. Sensitive analysis must follow applicable laws, internal policies, and consent requirements.",
  },
  {
    q: "What output does AI generate from company documents?",
    a: "Structured intelligence outputs including risk maps, decision memos, executive summaries, cash waste notes, team effectiveness signals, and next best action recommendations.",
  },
  {
    q: "Can company document AI connect through API?",
    a: "Yes. The Chameleon Eye API provides endpoints for document analysis, risk detection, and structured intelligence output that can be embedded into internal tools, platforms, or workflows.",
  },
];

export default function BestAICompanyDocumentsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <Badge>Guide</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Best AI for Company Documents
          </h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Comparing AI options for internal files, contracts, HR data,
            approved reports, and private document analysis without cloud upload.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/signup">Start Free</Button>
            <Button href="/contact" variant="secondary">Request Demo</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="What types of company documents can AI analyze?"
          subtitle="Chameleon Eye AI is designed for authorized business document analysis — not general file conversion or editing."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documentTypes.map((doc) => (
            <Card key={doc.title} hover>
              <h3 className="text-base font-semibold text-emerald">{doc.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{doc.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What to require from AI for company documents"
            subtitle="Most general AI tools are not designed for sensitive business document workflows."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-panel2">
                  <th className="px-6 py-4 text-left font-semibold text-muted">Requirement</th>
                  <th className="px-6 py-4 text-left font-semibold text-emerald">Chameleon Eye AI</th>
                </tr>
              </thead>
              <tbody>
                {requirements.map((row, i) => (
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
        <Card className="border-gold/20 bg-panel2 p-8">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider">Important note</p>
          <p className="mt-3 text-base leading-7 text-muted">
            Chameleon Eye AI works only with data, systems, files, and workflows
            the customer is authorized to use. Sensitive document analysis must
            follow applicable laws, internal company policies, and consent
            requirements.
          </p>
        </Card>
      </section>

      <section className="border-t border-white/8 bg-panel/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Start analyzing company documents privately
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Use local/private mode to keep sensitive files on your device, or connect through API for structured document intelligence.
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
