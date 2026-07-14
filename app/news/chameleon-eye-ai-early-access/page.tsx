import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export const metadata = {
  title: "Chameleon Eye AI Opens Early Access for Private Business Intelligence",
  description:
    "Chameleon Eye AI announces early access for its private business intelligence workspace — featuring local/private mode, AI reports, API workflows, and Desktop Connector.",
};

export default function EarlyAccessNewsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Badge>News</Badge>
          <p className="mt-4 text-sm text-muted">July 2026 — Press Release</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Chameleon Eye AI Opens Early Access for Private Business Intelligence
          </h1>
          <p className="mt-6 text-base leading-8 text-muted">
            A new category of AI built specifically for business intelligence — not a chatbot, not a general assistant, but a private workspace that sees what is hidden in your business.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose-style space-y-6 text-sm leading-8 text-muted">
          <p>
            <strong className="text-foreground">Chameleon Eye AI</strong> has opened early access to its private business intelligence workspace — a new category of AI tool designed specifically for companies that need to detect hidden operational risks, surface cash waste, analyze confidential business data, and generate structured intelligence reports.
          </p>

          <p>
            Unlike general AI chatbots, Chameleon Eye AI is not designed for conversation, writing, or brainstorming. It is purpose-built for business intelligence — taking approved operational data, reports, team signals, customer journey information, and financial data, and returning structured outputs that business teams can act on.
          </p>

          <Card className="border-gold/20 bg-panel2 my-8">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider">What early access includes</p>
            <ul className="mt-4 space-y-2">
              {[
                "Private AI workspace for structured business intelligence reports",
                "Local/private mode — sensitive files can stay on the customer's device",
                "Chameleon Eye API for embedding intelligence into products and platforms",
                "Desktop Connector with secure device activation and short-lived token management",
                "Business DNA profile system for personalizing intelligence outputs",
                "Free business scanners for cash waste, team effectiveness, and marketing waste",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-0.5 text-emerald shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <h2 className="text-xl font-semibold text-foreground mt-8">Not a chatbot</h2>
          <p>
            Chameleon Eye AI is positioned firmly outside the general AI assistant category. While tools like ChatGPT, Claude, and Gemini are built for broad conversation and text generation, Chameleon Eye AI produces structured business intelligence outputs — risk maps, cash waste notes, decision memos, team effectiveness signals, and executive summaries that support real business decisions.
          </p>

          <p>
            The product is designed for business owners, operations leads, finance teams, marketing leads, consultants, and enterprise teams who need intelligence — not a general AI assistant.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">Private by design</h2>
          <p>
            A central feature of Chameleon Eye AI is its approach to data privacy. The product offers three operational modes: local/private mode where files stay on the customer&apos;s device, hybrid approval mode where local analysis runs first and cloud involvement requires explicit user approval, and standard cloud workspace for approved data.
          </p>

          <p>
            This design is intended for businesses that handle contracts, HR data, financial reports, client information, and internal operational data that should not be processed through general AI systems without proper controls.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">API and Desktop Connector</h2>
          <p>
            The Chameleon Eye API provides structured business intelligence endpoints that can be embedded into SaaS platforms, internal tools, CRM systems, HR platforms, and marketplaces. Endpoints include risk check, readiness scoring, decision memo generation, Pulse events, and custom workflow integration.
          </p>

          <p>
            The Desktop Connector addresses a specific problem in the AI industry — desktop and mobile applications that embed static API keys in distributed packages. Chameleon Eye AI&apos;s Desktop Connector uses secure login, device activation, short-lived tokens, and device-level revocation to eliminate this security risk.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">Free tools available now</h2>
          <p>
            Chameleon Eye AI has launched six free business scanners that can be used without an account — including a Cash Waste Scanner, Team Effectiveness Check, Marketing Waste Test, Customer Journey Friction Test, API Key Risk Check, and Private Mode Readiness Test. Each takes 2–3 minutes and provides an immediate score with recommendation.
          </p>

          <Card className="border-emerald/20 bg-panel2 my-8">
            <p className="text-sm font-semibold text-gold uppercase tracking-wider">About Chameleon Eye AI</p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Chameleon Eye AI is a private business intelligence workspace. It works only with data, systems, files, and workflows the customer is authorized to use. Sensitive analysis must follow applicable laws, internal policies, and consent requirements. The product is available at chameleoneye.ai.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Company website: chameleoneye.com — for confidential intelligence services and audits.
            </p>
          </Card>

          <p className="text-xs text-muted">
            Press enquiries: press@chameleoneye.ai
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/signup">Join Early Access</Button>
          <Button href="/free-tools" variant="secondary">Try Free Tools</Button>
          <Button href="/press" variant="ghost">Press Kit</Button>
        </div>
      </section>
    </>
  );
}
