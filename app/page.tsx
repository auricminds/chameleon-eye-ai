import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DesktopFlowDiagram } from "@/components/DesktopFlowDiagram";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroWorkspacePreview } from "@/components/HeroWorkspacePreview";
import { ReportTabs } from "@/components/ReportTabs";
import { SectionTitle } from "@/components/SectionTitle";
import { PRIVACY_SENTENCE, SECURITY_SENTENCE } from "@/lib/constants";

const analyzeCards = [
  {
    title: "Business reports",
    copy: "Detect weak signals, missing facts, and operational risks.",
  },
  {
    title: "Internal documents",
    copy: "Review approved company documents and summarize risks or gaps.",
  },
  {
    title: "Marketing plans",
    copy: "Detect weak positioning, unclear audience, budget waste, and missing next actions.",
  },
  {
    title: "HR data where authorized",
    copy: "Find skill gaps, role readiness, training needs, and team effectiveness signals.",
  },
  {
    title: "Operational logs",
    copy: "Detect repeated errors, delays, bottlenecks, and process weakness.",
  },
  {
    title: "Customer journey data",
    copy: "Find where users abandon forms, requests, signups, or purchases.",
  },
  {
    title: "Platform usage signals",
    copy: "Detect weak flows, user friction, and guidance opportunities.",
  },
  {
    title: "Incident summaries where authorized",
    copy: "Summarize approved operational or security events into management reports.",
  },
];

const outputCards = [
  "Risk map",
  "Cash waste notes",
  "Team effectiveness signals",
  "Customer journey friction",
  "Marketing direction",
  "Missing facts",
  "Executive summary",
  "Decision memo",
  "Next best actions",
  "Report-ready output",
];

const apiWorkflows = [
  "Guidance API",
  "Readiness API",
  "Risk Check API",
  "Draft API",
  "Decision Memo API",
  "Pulse Events API",
  "Business Scoring API",
  "Custom Workflow API",
];

const desktopFeatures = [
  "secure login",
  "device activation",
  "short-lived tokens",
  "token refresh",
  "device limit",
  "revoke device",
  "usage limits",
  "local/private file mode",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div>
            <Badge>Private AI Intelligence</Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Ask your business what it is hiding.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
              Chameleon Eye AI helps companies analyze approved files, reports,
              workflows, team signals, customer journeys, and operational data
              to detect hidden risks, cash waste, weak performance, and
              early-warning patterns.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              Use it directly in your private workspace, connect it through API,
              or run a local-first desktop intelligence flow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/signup">Start Free</Button>
              <Button href="/api" variant="secondary">
                Explore API
              </Button>
              <Button href="/private-mode" variant="ghost">
                Private Mode
              </Button>
            </div>
          </div>
          <HeroWorkspacePreview />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          title="Use Chameleon Eye AI your way."
          subtitle="Choose the path that fits your team, product, or security requirements."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Private AI Workspace"
            copy="Use Chameleon Eye AI directly to review approved business information and generate confidential intelligence reports."
            bestFor="owners, managers, consultants, auditors, operations teams"
            cta={{ label: "Explore Product", href: "/product" }}
          />
          <FeatureCard
            title="Chameleon Eye API"
            copy="Embed business intelligence workflows inside your website, app, platform, marketplace, game, CRM, HR system, or private company tool."
            bestFor="SaaS founders, platforms, digital products, enterprise systems"
            cta={{ label: "Explore API", href: "/api" }}
          />
          <FeatureCard
            title="Desktop Connector"
            copy="Connect desktop applications safely using secure login, device activation, short-lived tokens, or customer backend integration."
            bestFor="desktop apps, internal tools, local-first systems, sensitive files"
            cta={{ label: "Explore Desktop", href: "/desktop" }}
          />
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Your files can stay on your device."
            subtitle="Some business files should not leave the company computer. Chameleon Eye AI can support local-first and hybrid workflows where sensitive files remain private, and only approved summaries or selected data are sent to cloud intelligence when the user chooses."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Local Private Mode"
              copy="Files stay on the customer's device. Best for sensitive documents, internal files, contracts, reports, and early review."
            />
            <FeatureCard
              title="Hybrid Approval Mode"
              copy="Local first. Cloud only after user approval. Best for companies that need stronger analysis but want control."
            />
            <FeatureCard
              title="Cloud / API Mode"
              copy="Approved data is sent securely. Best for dashboards, APIs, scoring, Pulse events, and team workflows."
            />
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-7 text-gold">
            {PRIVACY_SENTENCE}
          </p>
          <div className="mt-8 text-center">
            <Button href="/private-mode" variant="secondary">
              Explore Private Mode
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle title="What Chameleon Eye AI can analyze" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {analyzeCards.map((item) => (
            <Card key={item.title} hover>
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Not just answers. Structured intelligence."
            subtitle="Chameleon Eye AI does not only return text. It produces structured outputs your team can use for decisions, reports, dashboards, and action plans."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {outputCards.map((item) => (
              <Card key={item} className="py-4 text-center text-sm text-muted">
                {item}
              </Card>
            ))}
          </div>
          <Card className="mx-auto mt-10 max-w-2xl border-emerald/20 bg-background/80 p-0">
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-muted">
{`{
  "riskLevel": "medium",
  "confidence": "high",
  "signals": [
    "Repeated handover delay",
    "Unclear task ownership"
  ],
  "businessImpact": "Possible operational slowdown",
  "nextBestAction": "Review handover process before scaling."
}`}
            </pre>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          title="Add Chameleon Eye intelligence inside your own product."
          subtitle="Use Chameleon Eye API to add structured business intelligence to websites, mobile apps, desktop apps, games, marketplaces, SaaS platforms, CRMs, HR systems, and enterprise tools."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {apiWorkflows.map((item) => (
            <Card key={item} hover className="text-sm text-foreground">
              {item}
            </Card>
          ))}
        </div>
        <Card className="mx-auto mt-10 max-w-3xl border-emerald/20 bg-panel2">
          <p className="text-sm font-medium text-foreground">Example endpoints</p>
          <div className="mt-4 space-y-2 font-mono text-sm text-muted">
            <p>POST /v1/guidance/profile-check</p>
            <p>POST /v1/risk/check</p>
            <p>POST /v1/decision/memo</p>
            <p>POST /v1/pulse/events</p>
            <p>POST /v1/workflows/{"{client}"}/{"{workflow}"}</p>
          </div>
          <p className="mt-6 text-sm leading-7 text-muted">
            API keys stay server-side. Desktop and mobile apps should use secure
            login, device activation, short-lived tokens, or customer backend
            integration.
          </p>
        </Card>
        <div className="mt-8 text-center">
          <Button href="/api">Explore API</Button>
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Connect desktop applications without exposing secrets."
            subtitle="Installed applications require stronger key protection. Connect safely through secure authentication, device activation, or your company backend."
          />
          <div className="mt-12">
            <DesktopFlowDiagram />
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-gold">
            {SECURITY_SENTENCE}
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {desktopFeatures.map((item) => (
              <Card key={item} className="text-sm text-muted">
                {item}
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/desktop" variant="secondary">
              Explore Desktop Connector
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle title="Sample AI intelligence reports" />
        <div className="mt-12">
          <ReportTabs />
        </div>
        <div className="mt-8 text-center">
          <Button href="/reports" variant="secondary">
            View AI Reports
          </Button>
        </div>
      </section>

      <section className="border-t border-white/8 bg-panel/60 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionTitle
            title="Start your private intelligence workspace."
            subtitle="Use Chameleon Eye AI directly, connect it to your product, or build a private local-first intelligence flow for your company."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/signup">Start Free</Button>
            <Button href="/contact" variant="secondary">
              Request Demo
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
