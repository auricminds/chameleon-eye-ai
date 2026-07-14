import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Chameleon Platform Architecture",
  description:
    "The full technical architecture of the Chameleon Eye AI platform — routing, intelligence, industry systems, and enterprise controls.",
};

const coreLayers = [
  {
    name: "Product Gateway",
    description:
      "Entry point for all user interactions. Handles authentication, session management, locale routing, and initial request classification.",
    color: "border-emerald/30 bg-emerald/5",
  },
  {
    name: "AI Terminal",
    description:
      "General-purpose business intelligence interface. Supports open-ended analysis, report generation, and decision support across any business domain.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "Business DNA",
    description:
      "Private business profiling layer. Captures company context, industry, team structure, goals, and constraints — so every intelligence output is grounded in your specific business reality.",
    color: "border-gold/30 bg-gold/5",
  },
  {
    name: "Chameleon Intelligence Router",
    description:
      "Server-side task classifier and routing engine. Receives the request, applies business rules and privacy checks, selects the most appropriate approved intelligence path, and formats the response.",
    color: "border-gold/30 bg-gold/5",
  },
  {
    name: "Document Intelligence",
    description:
      "Processes approved documents — extracts structured insights, detects risks, summarizes content, and feeds results into reports and risk reviews.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "Risk Review Engine",
    description:
      "Structured risk assessment layer. Applies scoring, categorization, and business-context rules to produce actionable risk outputs — not raw AI text.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "Report Engine",
    description:
      "Formats intelligence outputs into structured business reports. Supports multiple report types, export formats, and industry-specific templates.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "Decision Tracker",
    description:
      "Records business decisions, links them to supporting intelligence, and tracks outcomes — creating an auditable decision history.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "API Vault",
    description:
      "Secure key management layer. Manages scoped API keys, test/live separation, and revocation. No master keys are exposed to clients.",
    color: "border-white/15 bg-panel2",
  },
  {
    name: "Local / Private Mode",
    description:
      "Routes qualifying tasks to local processing. Files and workspace data stay on the user's device. Cloud analysis used only with explicit approval.",
    color: "border-white/15 bg-panel2",
  },
];

const industrySystems = [
  {
    name: "Hotel System",
    items: ["Room management", "Guest intelligence", "Complaint tracking", "Revenue analysis", "Tourism connector"],
  },
  {
    name: "Hospital Operations System",
    items: ["Operational scheduling", "Resource tracking", "Incident summaries", "Compliance support"],
  },
  {
    name: "Real Estate System",
    items: ["Property management", "Listing intelligence", "Investment analysis", "Market signals"],
  },
];

const enterpriseControls = [
  "Roles and Permissions",
  "Audit Logs",
  "Workspace Separation",
  "Private Deployment Options",
  "Custom Routing Rules",
  "Data Retention Settings",
];

export default function ArchitecturePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Architecture
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Chameleon Platform Architecture
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon is not defined by the underlying intelligence infrastructure
            it connects to. It is defined by the private business intelligence
            layer built on top — routing rules, business context, workflows,
            reports, permissions, industry systems, and controlled access.
          </p>
        </div>
      </section>

      {/* Value statement */}
      <section className="border-b border-white/8 bg-panel/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="border-emerald/20 bg-emerald/5">
            <p className="text-sm leading-7 text-foreground">
              <strong className="text-emerald">What makes Chameleon valuable</strong> is not the
              underlying compute model. It is the private business intelligence
              layer: proprietary routing rules, Business DNA context, workflow
              engines, structured report formats, risk scoring logic,
              decision tracking, role permissions, workspace isolation, and
              purpose-built industry systems. These layers do not exist in any
              generic AI service.
            </p>
          </Card>
        </div>
      </section>

      {/* Core Layers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Platform Layers"
          subtitle="Each layer adds a distinct capability that transforms raw intelligence into business-ready outputs."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreLayers.map((layer) => (
            <Card key={layer.name} className={layer.color}>
              <h3 className="text-sm font-semibold text-foreground">{layer.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{layer.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Industry Systems */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Industry Systems"
            subtitle="Purpose-built operational intelligence for specific industries — not generic AI applied to vertical use cases."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {industrySystems.map((system) => (
              <Card key={system.name} hover>
                <h3 className="text-base font-semibold text-foreground">{system.name}</h3>
                <ul className="mt-4 space-y-2">
                  {system.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="text-emerald">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Controls */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Enterprise Controls"
          subtitle="Governance, access, and deployment controls for organizations that require stronger policies."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {enterpriseControls.map((ctrl) => (
            <Card key={ctrl} className="border-blue-500/15 bg-blue-500/5">
              <span className="text-sm font-medium text-blue-400">{ctrl}</span>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs leading-6 text-muted">
          Enterprise controls are available in varying stages of implementation.
          Contact the team to discuss scope and deployment options.
        </p>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button href="/trust" variant="secondary">
              Trust Center
            </Button>
            <Button href="/security" variant="ghost">
              Security Architecture
            </Button>
            <Button href="/enterprise" variant="ghost">
              Enterprise Options
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
