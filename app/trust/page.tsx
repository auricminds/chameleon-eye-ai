import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Chameleon Trust Center",
  description:
    "How Chameleon protects business data, separates workspaces, and controls AI routing.",
};

const proofChecklist = [
  { label: "Server-side AI routing", status: "implemented" as const },
  { label: "No frontend AI provider keys", status: "implemented" as const },
  { label: "Business DNA profiling", status: "implemented" as const },
  { label: "Workspace separation", status: "implemented" as const },
  { label: "Privacy mode (local-first)", status: "implemented" as const },
  { label: "Role-based permissions", status: "planned" as const },
  { label: "Audit logs", status: "planned" as const },
  { label: "Enterprise private deployment", status: "enterprise" as const },
  { label: "SOC 2 compliance", status: "planned" as const },
  { label: "Data retention controls", status: "planned" as const },
];

const trustFeatures = [
  "Private-source AI platform",
  "Server-side AI routing",
  "No frontend AI keys",
  "Workspace separation",
  "Role-based permissions",
  "Privacy mode",
  "API Vault",
  "Enterprise controls",
];

const faqs = [
  {
    q: "Is Chameleon Eye AI open source?",
    a: "No. Chameleon Eye AI is a private-source business AI platform. The source code, routing rules, Business DNA logic, industry systems, and workflow engines are proprietary. This is intentional — the platform is designed for business operations, not for open collaboration or model experimentation.",
  },
  {
    q: "Is Chameleon Eye AI only a wrapper around an AI model?",
    a: "No. Approved AI infrastructure may be connected behind the scenes, but Chameleon adds a full routing layer, Business DNA profiling, document intelligence, workflow logic, role permissions, risk scoring, report generation, decision tracking, and industry-specific systems. The value is the private business intelligence layer — not the underlying compute.",
  },
  {
    q: "What AI model does Chameleon use?",
    a: "Chameleon uses an internal intelligence routing layer that classifies each task and selects the most appropriate approved infrastructure path. The technical routing is kept internal so business users can focus on reports, risk reviews, decisions, and operational outputs — not on managing or comparing model providers.",
  },
  {
    q: "Where does my data go?",
    a: "Chameleon is designed with local-first and approval-based workflows. Supported local data stays on your device. Cloud analysis is used only when you approve sending selected prompts, file excerpts, or connector data through Chameleon-controlled backend routes. The browser does not call external AI providers directly.",
  },
  {
    q: "Can I use Chameleon through an API?",
    a: "Yes. Chameleon provides secure API workflows for business intelligence, document analysis, risk reviews, report generation, webhooks, and industry systems. It is not a raw model API — it is a business intelligence API. Scoped keys, read-only keys, and test/live key separation are implemented.",
  },
  {
    q: "Can enterprise clients restrict AI routing?",
    a: "Enterprise customers can request approved-routing policies, private deployment discussions, data retention controls, role permissions, and workspace separation depending on implementation scope. These options are available to discuss — contact the team for enterprise scoping.",
  },
];

export default function TrustPage() {
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
            Chameleon Trust Center
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            How Chameleon protects business data, separates workspaces, and
            controls AI routing.
          </p>

          {/* Trust feature pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            {trustFeatures.map((f) => (
              <span
                key={f}
                className="rounded-full border border-emerald/20 bg-emerald/8 px-4 py-1.5 text-sm text-emerald"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What Chameleon Is / Is Not */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-foreground">
              What Chameleon Is
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-2">
                <span className="mt-1 text-emerald">+</span>
                <span>
                  A private-source business AI platform built for operations,
                  risk, intelligence, and decisions.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-emerald">+</span>
                <span>
                  An industry operating system with purpose-built modules for
                  Hotel, Hospital, Real Estate, and Holding companies.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-emerald">+</span>
                <span>
                  A server-side intelligence router that classifies tasks and
                  selects approved infrastructure — without exposing provider
                  details to the frontend.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-emerald">+</span>
                <span>
                  A Business DNA layer that profiles each business so
                  intelligence outputs are context-aware and relevant.
                </span>
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-foreground">
              What Chameleon Is Not
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-2">
                <span className="mt-1 text-gold">—</span>
                <span>
                  Not an open-source foundation model or model training
                  platform.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-gold">—</span>
                <span>
                  Not a raw model download or self-hosted model deployment
                  service.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-gold">—</span>
                <span>
                  Not a browser-side API-key wrapper where AI provider keys are
                  exposed in the frontend.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-gold">—</span>
                <span>
                  Not a medical, legal, or financial final authority. Outputs
                  support human decision-making and must be reviewed by qualified
                  professionals.
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Data Flow Diagram */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Data Flow Architecture"
            subtitle="How requests travel through Chameleon from user action to business output."
            align="left"
          />
          <div className="mt-10 overflow-x-auto">
            <div className="flex min-w-max items-center gap-3">
              {[
                { label: "User", color: "border-muted/40 bg-panel" },
                { label: "Chameleon Web / Desktop App", color: "border-emerald/30 bg-emerald/8" },
                { label: "Chameleon Backend", color: "border-emerald/30 bg-emerald/8" },
                { label: "Chameleon Intelligence Router", color: "border-gold/30 bg-gold/8" },
                { label: "Approved AI Infrastructure / Local Processing / Document Intelligence", color: "border-white/15 bg-panel2" },
                { label: "Chameleon Response", color: "border-emerald/30 bg-emerald/8" },
                { label: "Reports / Risk Reviews / Decisions / Workflows", color: "border-gold/30 bg-gold/8" },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-3">
                  <div
                    className={`rounded-xl border px-4 py-3 text-center text-xs font-medium text-foreground ${node.color} max-w-[160px]`}
                  >
                    {node.label}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-muted">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs leading-6 text-muted">
            The browser communicates only with Chameleon-controlled backend
            routes. AI infrastructure keys are never exposed in the frontend or
            transmitted to the client.
          </p>
        </div>
      </section>

      {/* Proof Checklist */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Security and Trust Checklist"
          subtitle="Current implementation status across all major trust dimensions."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {proofChecklist.map((item) => (
            <Card key={item.label} className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground">{item.label}</span>
              <StatusChip status={item.status} />
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Trust Investigation FAQ"
            subtitle="Answers to the questions security teams, partners, and enterprise buyers ask."
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
            <Button href="/trust/faq" variant="secondary">
              Full Trust FAQ
            </Button>
            <Button href="/security" variant="ghost">
              Security Architecture
            </Button>
            <Button href="/contact" variant="ghost">
              Contact for Enterprise
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
