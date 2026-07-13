import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Partner with Chameleon Eye AI",
  description:
    "Partner with Chameleon Eye AI as an AI reviewer, comparison website, business consultant, agency, software company, or enterprise introducer.",
};

const partnerTypes = [
  {
    title: "AI Reviewers",
    description:
      "Independent AI reviewers and content creators who evaluate and compare AI tools for business audiences.",
  },
  {
    title: "Comparison Websites",
    description:
      "AI tool comparison platforms, software directories, and review aggregators covering business intelligence and private AI.",
  },
  {
    title: "Business Consultants",
    description:
      "Management consultants, business advisors, and operational improvement specialists working with business owners.",
  },
  {
    title: "Software Agencies",
    description:
      "Development agencies and software companies that build products for business clients and want to embed intelligence workflows.",
  },
  {
    title: "HR Consultants",
    description:
      "HR specialists and people analytics advisors who work with team effectiveness, performance, and organizational development.",
  },
  {
    title: "Marketing Agencies",
    description:
      "Marketing and growth agencies that advise clients on data-driven marketing and operational performance.",
  },
  {
    title: "Enterprise Introducers",
    description:
      "Individuals and firms with access to enterprise clients who could benefit from private AI intelligence workflows.",
  },
  {
    title: "Custom Workflow Partners",
    description:
      "Technical partners who design, build, and implement custom Chameleon Eye AI workflows for specific industries or use cases.",
  },
];

const partnerModels = [
  {
    title: "Referral Partner",
    description:
      "Refer businesses to Chameleon Eye AI and earn a referral arrangement. Suitable for consultants, advisors, and introducers.",
  },
  {
    title: "Review Partner",
    description:
      "Receive early access, product information, and press assets for AI reviews, comparisons, and editorial coverage.",
  },
  {
    title: "Implementation Partner",
    description:
      "Design and implement Chameleon Eye AI workspaces and workflows for business clients. Suitable for agencies and consultants.",
  },
  {
    title: "Enterprise Introduction Partner",
    description:
      "Introduce enterprise clients to Chameleon Eye AI for private workspace, API, and desktop connector deployments.",
  },
  {
    title: "Custom Workflow Partner",
    description:
      "Collaborate on custom API workflows, industry-specific intelligence templates, and private deployment configurations.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <Badge>Partners</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Partner with Chameleon Eye AI
          </h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            For AI reviewers, comparison websites, consultants, agencies,
            software companies, and business advisors.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Request Partnership</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          title="Who can partner with Chameleon Eye AI?"
          subtitle="We work with partners who understand business intelligence and serve clients who need private, structured AI workflows."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partnerTypes.map((type) => (
            <Card key={type.title} hover>
              <h3 className="text-base font-semibold text-foreground">{type.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{type.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Partnership models"
            subtitle="Partner terms are discussed privately based on your specific situation and contribution."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnerModels.map((model) => (
              <Card key={model.title} hover>
                <h3 className="text-base font-semibold text-emerald">{model.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{model.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-gold/20 bg-panel2 p-6 text-center">
            <p className="text-sm leading-7 text-muted">
              <strong className="text-gold">Note:</strong> Partner terms are discussed privately. There are no fixed commissions or published partner tiers. All arrangements are tailored to the partner type and contribution.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          title="What partners get access to"
          align="left"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Early access to new features and product updates",
            "Press kit, product descriptions, and brand assets",
            "Technical documentation and API access",
            "Direct communication with the Chameleon Eye AI team",
            "Custom workshop or onboarding session for implementation partners",
            "Co-review or editorial support for AI reviewers and comparison sites",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel p-4">
              <span className="mt-0.5 text-emerald shrink-0">✓</span>
              <p className="text-sm leading-7 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-panel/60 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Ready to partner?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Tell us about yourself and how you see the partnership working. All discussions are confidential.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Request Partnership</Button>
          </div>
        </div>
      </section>
    </>
  );
}
