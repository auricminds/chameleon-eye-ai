import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Chameleon Eye AI Press Kit",
  description:
    "Media information, product description, screenshots, launch details, and press contact for Chameleon Eye AI — private business intelligence.",
};

const keyPoints = [
  "Private AI workspace for structured business intelligence — not a general chatbot",
  "Local/private mode: sensitive files can stay on the customer's device",
  "API-first design for embedding intelligence workflows into products and platforms",
  "Desktop Connector with secure device activation and short-lived tokens",
  "AI intelligence reports: risk maps, cash waste notes, decision memos, team effectiveness",
  "Free business scanners: cash waste, team effectiveness, marketing waste, customer friction, API risk",
  "Business DNA profiles that personalize intelligence outputs to role and priorities",
  "Supports private, hybrid, and cloud workspace modes",
];

const productLinks = [
  { label: "chameleoneye.ai", href: "https://chameleoneye.ai", desc: "AI product, private workspace, API, and client portal" },
  { label: "chameleoneye.com", href: "https://chameleoneye.com", desc: "Company website for confidential intelligence services and audits" },
];

export default function PressPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <Badge>Press</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Chameleon Eye AI Press Kit
          </h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Media information, product description, screenshots, and launch details.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle title="Product boilerplate" align="left" />
        <Card className="mt-8 border-emerald/20 bg-panel2">
          <p className="text-sm leading-8 text-muted">
            Chameleon Eye AI is a private business intelligence workspace that helps companies analyze approved data, detect hidden operational risks, surface cash waste, and generate structured intelligence reports. Unlike general AI chatbots, Chameleon Eye AI is purpose-built for business intelligence — supporting local/private file mode for sensitive documents, an API for embedding structured intelligence into products, a Desktop Connector for secure installed-app integration, and a Business DNA profile system that personalizes intelligence outputs to each operator&apos;s role and priorities. Chameleon Eye AI is not a general assistant — it is an intelligence layer for businesses that need to see what is hidden in their operations, team performance, marketing spend, and customer journeys.
          </p>
        </Card>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Key product points" align="left" />
          <ul className="mt-8 space-y-3">
            {keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 text-emerald shrink-0">✓</span>
                <p className="text-sm leading-7 text-muted">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle title="Press contact" align="left" />
        <Card className="mt-8">
          <p className="text-sm font-semibold text-foreground">Media enquiries</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            For press enquiries, product descriptions, interview requests, screenshots, and launch information, please contact:
          </p>
          <p className="mt-4 text-base font-medium text-emerald">
            press@chameleoneye.ai
          </p>
          <p className="mt-3 text-sm text-muted">
            We aim to respond to press enquiries within 24–48 hours.
          </p>
        </Card>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Press assets" align="left" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Logo pack", desc: "SVG and PNG formats, light and dark versions. Available on request." },
              { title: "Product screenshots", desc: "Workspace, report views, API output examples. Available on request." },
              { title: "Founder quote", desc: "Official product statement and founder quote. Available on request." },
            ].map((asset) => (
              <Card key={asset.title}>
                <h3 className="text-base font-semibold text-foreground">{asset.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{asset.desc}</p>
                <p className="mt-4 text-xs text-emerald">Request via press@chameleoneye.ai</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle title="Product links" align="left" />
        <div className="mt-8 space-y-4">
          {productLinks.map((link) => (
            <div key={link.label} className="flex items-start gap-4 rounded-xl border border-white/8 bg-panel p-5">
              <div>
                <p className="text-base font-semibold text-emerald">{link.label}</p>
                <p className="mt-1 text-sm leading-7 text-muted">{link.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-panel/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Media enquiries
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            For all media and press requests, contact press@chameleoneye.ai
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/news/chameleon-eye-ai-early-access">Read Launch News</Button>
            <Button href="/contact" variant="secondary">General Contact</Button>
          </div>
        </div>
      </section>
    </>
  );
}
