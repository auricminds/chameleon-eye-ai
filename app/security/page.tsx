import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Security Architecture",
  description:
    "How Chameleon Eye AI protects AI keys, isolates workspaces, and controls data access at every layer.",
};

const principles = [
  {
    title: "No AI keys in the frontend",
    description:
      "AI infrastructure keys are never embedded in browser code, frontend environment variables, or client-side bundles. They remain exclusively on the server.",
  },
  {
    title: "Server-side request handling",
    description:
      "All AI analysis requests are processed through Chameleon backend routes. The browser does not call external AI infrastructure directly.",
  },
  {
    title: "Workspace separation",
    description:
      "Each product area — AI Terminal, Hotel System, Hospital System, Real Estate System, Holding Command Center — operates as a separate workspace with its own context and access rules.",
  },
  {
    title: "Product separation",
    description:
      "Industry modules are isolated from each other. Data from the Hotel System does not bleed into Hospital or Real Estate contexts without explicit authorization.",
  },
  {
    title: "Role-based permissions",
    description:
      "Access is scoped by role. Owners, managers, receptionists, housekeeping staff, external partners, and auditors each receive only the access level appropriate to their function.",
  },
  {
    title: "Least privilege",
    description:
      "Every API key, user session, and internal service connection is scoped to the minimum access required. Master keys are never distributed to client devices.",
  },
  {
    title: "Data visibility controls",
    description:
      "Users see only data they are authorized to access. Sensitive financial, medical, or personnel data is gated behind explicit role permissions.",
  },
  {
    title: "Auditability roadmap",
    description:
      "Full audit logs are on the roadmap. When implemented, all AI requests, document accesses, and permission changes will be recorded for compliance review.",
  },
];

const roles = [
  { role: "Owner", access: "Full platform access, all reports, all system data, billing, and user management." },
  { role: "General Manager", access: "Operational reports, team data, risk reviews, and department-level analytics." },
  { role: "Receptionist", access: "Guest management, room status, complaint logging — no financial or HR data." },
  { role: "Housekeeping", access: "Room task lists, status updates — no guest financial data or reports." },
  { role: "External Tourism Company", access: "Room availability and booking integration only — scoped connector access." },
  { role: "Auditor", access: "Read-only access to approved reports and audit trails — no operational writes." },
];

const roadmap = [
  { feature: "No frontend AI provider keys", status: "implemented" as const },
  { feature: "Server-side AI routing", status: "implemented" as const },
  { feature: "Workspace separation", status: "implemented" as const },
  { feature: "Scoped API keys (read-only, test/live)", status: "implemented" as const },
  { feature: "API key revocation", status: "implemented" as const },
  { feature: "Role-based access control", status: "planned" as const },
  { feature: "Audit logs", status: "planned" as const },
  { feature: "Rate limiting", status: "planned" as const },
  { feature: "Data retention controls", status: "planned" as const },
  { feature: "SOC 2 compliance review", status: "planned" as const },
  { feature: "Private deployment option", status: "enterprise" as const },
  { feature: "Custom routing policies", status: "enterprise" as const },
  { feature: "Private storage configuration", status: "enterprise" as const },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            Security
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Security Architecture
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon is designed so that AI infrastructure keys never reach the
            browser, workspaces stay isolated, and access is controlled by role
            at every layer.
          </p>
        </div>
      </section>

      {/* Security Principles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Security Principles"
          subtitle="The core architectural decisions that define how Chameleon handles data, keys, and access."
          align="left"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <Card key={p.title} hover>
              <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{p.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Browser Network Safety */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Browser Network Safety"
            subtitle="What your browser is and is not allowed to call."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="border-emerald/20">
              <h3 className="text-sm font-semibold text-emerald">Allowed browser calls</h3>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted">
                <li className="flex gap-2">
                  <span className="text-emerald">+</span>
                  <span>Chameleon backend API routes (authenticated)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald">+</span>
                  <span>Chameleon workspace and product routes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald">+</span>
                  <span>Chameleon webhook event subscriptions</span>
                </li>
              </ul>
            </Card>
            <Card className="border-gold/20">
              <h3 className="text-sm font-semibold text-gold">Never exposed to browser</h3>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted">
                <li className="flex gap-2">
                  <span className="text-gold">—</span>
                  <span>AI infrastructure provider endpoints</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">—</span>
                  <span>AI provider keys — never placed in publicly-exposed environment variables</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">—</span>
                  <span>Master API keys or service account credentials</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">—</span>
                  <span>Internal routing configuration or model selection logic</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* API Key Safety */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="API Key Safety"
          subtitle="How Chameleon handles key management across web, desktop, and mobile."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card>
            <h3 className="text-sm font-semibold text-foreground">Web Platform</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              AI infrastructure keys live server-side only. Publicly-exposed
              client environment variables are never used for AI routing. Session
              tokens are short-lived and scoped.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-foreground">Desktop App</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Desktop clients use device activation, short-lived tokens, and
              token refresh flows. Master API keys are never stored in desktop or
              mobile client bundles.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-foreground">Customer API</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Customers receive scoped Chameleon API keys (format:{" "}
              <code className="rounded bg-panel2 px-1 text-xs text-foreground">
                che_live_****
              </code>
              ). These are not AI infrastructure keys — they are Chameleon
              platform keys with defined permission scopes.
            </p>
          </Card>
        </div>
      </section>

      {/* Workspace Separation */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Workspace Separation"
            subtitle="Each product area is an isolated context."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "AI Terminal", desc: "General business AI workspace for queries, analysis, and reports." },
              { name: "Hotel System", desc: "Hospitality operations: rooms, guests, complaints, and revenue analysis." },
              { name: "Hospital Operations System", desc: "Healthcare operational intelligence — kept strictly isolated from other systems." },
              { name: "Real Estate System", desc: "Property management, listings, and investment analysis workspace." },
              { name: "Holding Command Center", desc: "Cross-portfolio intelligence for holding company oversight." },
              { name: "Business DNA", desc: "Private business profiling layer — feeds context into routing without sharing raw data across workspaces." },
            ].map((w) => (
              <Card key={w.name} hover>
                <h3 className="text-sm font-semibold text-foreground">{w.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{w.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Access */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="Role-Based Access Examples"
          subtitle="Access is scoped by role — users receive only what their function requires."
          align="left"
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-6 py-3 text-left font-medium text-muted">Role</th>
                <th className="px-6 py-3 text-left font-medium text-muted">Access scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {roles.map((r) => (
                <tr key={r.role} className="bg-panel hover:bg-panel2 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{r.role}</td>
                  <td className="px-6 py-4 text-muted">{r.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted">
          Role-based access control is on the implementation roadmap. Current
          workspace separation provides initial isolation.
        </p>
      </section>

      {/* Roadmap */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Security Roadmap"
            subtitle="Current and planned security capabilities across the platform."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {roadmap.map((item) => (
              <Card key={item.feature} className="flex items-center justify-between gap-4">
                <span className="text-sm text-foreground">{item.feature}</span>
                <StatusChip status={item.status} />
              </Card>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/trust" variant="secondary">
              Trust Center
            </Button>
            <Button href="/privacy" variant="ghost">
              Privacy Mode
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
