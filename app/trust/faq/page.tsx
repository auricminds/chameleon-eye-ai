import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Trust FAQ",
  description:
    "Full Q&A covering open source, AI model usage, data handling, API access, and enterprise controls for Chameleon Eye AI.",
};

const faqs = [
  {
    q: "Is Chameleon Eye AI open source?",
    a: "No. Chameleon Eye AI is a private-source business AI platform. The source code, routing rules, Business DNA logic, industry systems, and workflow engines are proprietary. This is intentional — the platform is designed for business operations, not open collaboration or model experimentation. Private-source design ensures that routing rules, business context layers, and industry intelligence remain under controlled development.",
  },
  {
    q: "Is Chameleon Eye AI only a wrapper around an AI model?",
    a: "No. Approved AI infrastructure may be connected behind the scenes, but Chameleon adds a complete routing layer, Business DNA profiling, document intelligence, workflow logic, role permissions, risk scoring, report generation, decision tracking, and industry-specific systems. The platform's value is the private business intelligence layer — not the underlying compute model. A raw model call produces text. Chameleon produces structured business outputs: risk reviews, reports, decisions, workflows, and operational intelligence.",
  },
  {
    q: "What AI model does Chameleon use?",
    a: "Chameleon uses an internal intelligence routing layer. The platform classifies each task by type, applies business context and privacy checks, and selects the most appropriate approved intelligence path. The technical routing is kept internal so business users can focus on their reports, risk reviews, decisions, and operations — not on managing or comparing model providers. The intelligence infrastructure may change over time as better options become available, without affecting the user experience.",
  },
  {
    q: "Where does my data go?",
    a: "Chameleon is designed with local-first and approval-based workflows. Supported local data — including local file previews, workspace cache, setup data, and local notes — stays on your device. Cloud analysis is used only when you approve sending selected prompts, file excerpts, or connected system data through Chameleon-controlled backend routes. The browser does not make direct calls to external AI providers. All cloud-bound data travels through Chameleon's server-side routing layer.",
  },
  {
    q: "Can I use Chameleon through an API?",
    a: "Yes. Chameleon provides secure API workflows for business intelligence, document review, risk review creation, report generation, webhook event subscriptions, and industry system operations. It is not a raw model API — it is a structured business intelligence API. API keys are scoped to specific permissions, separated into test and live environments, and can be revoked at any time. Keys follow the format che_live_**** and are managed through the platform.",
  },
  {
    q: "Can enterprise clients restrict AI routing?",
    a: "Enterprise customers can request approved-routing policies, private deployment discussions, data retention controls, role permissions, and workspace separation depending on implementation scope. Custom routing rules and private infrastructure deployment are available as enterprise options — the exact scope, timeline, and availability depend on the implementation agreement. Contact the enterprise team to begin a scoping conversation.",
  },
  {
    q: "Does the browser call third-party AI providers directly?",
    a: "No. The intended and implemented architecture ensures that the browser calls only Chameleon-controlled backend routes. AI infrastructure keys must remain server-side and must not be exposed in frontend environment variables, client bundles, or browser network calls. You can verify this by inspecting the browser's network tab during a Chameleon session — you will see calls to Chameleon routes only, not to external AI provider endpoints.",
  },
];

export default function TrustFaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Trust FAQ
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Trust and Security FAQ
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Full answers to the questions security teams, enterprise buyers,
            partners, and technically curious users ask about Chameleon Eye AI.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Frequently Asked Questions"
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
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/trust" variant="secondary">
            Trust Center
          </Button>
          <Button href="/security" variant="ghost">
            Security Architecture
          </Button>
          <Button href="/privacy" variant="ghost">
            Privacy Mode
          </Button>
          <Button href="/contact" variant="ghost">
            Ask Another Question
          </Button>
        </div>
      </section>
    </>
  );
}
