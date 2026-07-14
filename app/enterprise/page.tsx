import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Enterprise Private AI and Industry Systems",
  description:
    "Enterprise-grade controls, private deployment options, and industry-specific AI systems for organizations with advanced requirements.",
};

const enterpriseCapabilities = [
  {
    label: "Private-source AI platform",
    status: "implemented" as const,
    desc: "The full Chameleon platform is private-source and enterprise-ready in its core design.",
  },
  {
    label: "Industry systems (Hotel, Hospital, Real Estate)",
    status: "implemented" as const,
    desc: "Purpose-built operational modules for hospitality, healthcare, and property sectors.",
  },
  {
    label: "Workspace separation",
    status: "implemented" as const,
    desc: "Each product area runs in an isolated workspace context.",
  },
  {
    label: "API controls (scoped keys, test/live, revocation)",
    status: "implemented" as const,
    desc: "Full API key lifecycle management with scoped permissions.",
  },
  {
    label: "Local and private mode",
    status: "implemented" as const,
    desc: "Local-first workflows where sensitive files stay on device.",
  },
  {
    label: "Approved infrastructure policy",
    status: "implemented" as const,
    desc: "All AI infrastructure is selected and approved by Chameleon — not user-configurable from the frontend.",
  },
  {
    label: "Role-based permissions",
    status: "planned" as const,
    desc: "Granular role and permission management across workspace members.",
  },
  {
    label: "Audit logs",
    status: "planned" as const,
    desc: "Full activity logging for AI requests, document accesses, and permission changes.",
  },
  {
    label: "Data retention controls",
    status: "planned" as const,
    desc: "Configurable retention periods and deletion policies for enterprise compliance.",
  },
  {
    label: "Private deployment option",
    status: "enterprise" as const,
    desc: "Private infrastructure deployment available to discuss. Scope and availability depend on implementation.",
  },
  {
    label: "Custom routing rules",
    status: "enterprise" as const,
    desc: "Custom intelligence routing policies for organizations with specific infrastructure requirements.",
  },
  {
    label: "Enterprise support and SLA",
    status: "enterprise" as const,
    desc: "Dedicated support, onboarding, and service level agreements for enterprise accounts.",
  },
];

const enterpriseUseCases = [
  {
    title: "Multi-property Hotel Groups",
    desc: "Centralized operational intelligence across multiple properties. Room management, guest intelligence, complaint tracking, and revenue analysis at group level.",
  },
  {
    title: "Healthcare Organizations",
    desc: "Isolated hospital operations intelligence with strict workspace separation. Scheduling support, incident summaries, and operational analytics — kept separate from all other data.",
  },
  {
    title: "Real Estate Portfolios",
    desc: "Portfolio-wide property intelligence, market signal detection, and investment analysis with role-scoped access for investors, managers, and analysts.",
  },
  {
    title: "Holding Companies",
    desc: "Cross-portfolio command center with subsidiary isolation. Group-level reporting, risk monitoring, and executive intelligence without exposing subsidiary data across business units.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Enterprise
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Enterprise Private AI and Industry Systems
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon is designed for organizations that need business-grade AI
            with controlled routing, workspace isolation, and industry-specific
            intelligence — not generic AI tools applied to enterprise problems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Contact for Enterprise</Button>
            <Button href="/architecture" variant="secondary">
              Platform Architecture
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Enterprise Capabilities"
          subtitle="What is available now, what is coming, and what is available to discuss for enterprise scope."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {enterpriseCapabilities.map((cap) => (
            <Card key={cap.label}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{cap.label}</h3>
                  <p className="mt-2 text-xs leading-6 text-muted">{cap.desc}</p>
                </div>
                <StatusChip status={cap.status} className="shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Enterprise Use Cases"
            subtitle="How organizations in key industries deploy Chameleon."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {enterpriseUseCases.map((uc) => (
              <Card key={uc.title} hover>
                <h3 className="text-base font-semibold text-foreground">{uc.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{uc.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important note */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-gold/20 bg-gold/5 max-w-3xl">
          <h2 className="text-base font-semibold text-foreground">A note on enterprise options</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Enterprise capabilities marked as{" "}
            <span className="text-blue-400">Enterprise option</span> are
            available to discuss and scope. Private deployment, custom routing
            policies, and dedicated support depend on implementation scope,
            infrastructure requirements, and agreed timelines. Contact the team
            to begin an enterprise scoping conversation.
          </p>
        </Card>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/contact" variant="secondary">
            Contact Enterprise Team
          </Button>
          <Button href="/trust" variant="ghost">
            Trust Center
          </Button>
          <Button href="/security" variant="ghost">
            Security Architecture
          </Button>
        </div>
      </section>
    </>
  );
}
