import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "No-Training Policy — Chameleon Eye AI",
  description:
    "Chairman AI does not use customer private files, prompts, or business data to train a public AI model. Your data is used only to generate your requested output.",
};

const whatThisMeans = [
  {
    heading: "Local files never leave your device",
    detail:
      "In Local Private Mode, your documents, files, and content are processed entirely on-device. Nothing is transmitted to Chameleon servers or any AI provider.",
  },
  {
    heading: "Cloud selected text is processed and discarded",
    detail:
      "When you approve sending selected text for cloud analysis, that text is processed to produce your output and is not retained by default. It is not used for model training.",
  },
  {
    heading: "No behavioural profiling for model training",
    detail:
      "Your usage patterns, prompts, and workflow interactions are not fed into any model training pipeline — public or private.",
  },
  {
    heading: "Business DNA used only for your session context",
    detail:
      "Business DNA profiles are used exclusively to make intelligence outputs relevant to your business context within your session. They are not shared, sold, or used to train any public AI system.",
  },
];

const futureOptInRequirements = [
  "Opt-in only — never enrolled automatically",
  "Clearly explained before enrollment begins",
  "Controlled by the user at all times",
  "Revocable at any time without penalty",
  "Covered by a separate, explicit consent",
];

export default function NoTrainingPolicyPage() {
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
            No-Training Policy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Your private data is never used to train a public model.
          </p>
        </div>
      </section>

      {/* Main Statement */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-8">
          <p className="text-base font-semibold text-emerald mb-3">
            Core Commitment
          </p>
          <p className="text-lg leading-8 text-foreground font-medium">
            Chairman AI does not use customer private files, prompts, or
            business data to train a public AI model.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Your content is used only to generate your requested output. It is
            not shared, sold, or used to improve public AI systems.
          </p>
        </div>
      </section>

      {/* What This Means for You */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="What This Means for You"
          subtitle="How the no-training commitment applies across all modes and features."
          align="left"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {whatThisMeans.map((item) => (
            <Card key={item.heading}>
              <h3 className="text-base font-semibold text-foreground">
                {item.heading}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Future Optional Programs */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Future Optional Programs"
            subtitle="Any future training or improvement programs will be held to strict requirements."
            align="left"
          />
          <div className="mt-10 rounded-2xl border border-white/8 bg-panel p-6">
            <p className="text-sm leading-7 text-muted mb-6">
              Future optional training or improvement programs, if introduced,
              must meet all of the following conditions before any customer data
              could be considered:
            </p>
            <ul className="space-y-3">
              {futureOptInRequirements.map((req) => (
                <li key={req} className="flex gap-3 text-sm text-muted">
                  <span className="mt-1 text-emerald shrink-0">+</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-muted">
              No such program exists today. This section is provided for
              transparency about how any future program would be governed.
            </p>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-base font-semibold text-foreground">
              What Is Covered
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                "Private files and documents",
                "Raw prompts and queries",
                "Business DNA profile data",
                "Cloud selected text",
                "API request content",
                "Terminal session content",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1 text-emerald shrink-0">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-base font-semibold text-foreground">
              What Is Not Affected
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                "Anonymised aggregate usage counters",
                "Error and performance telemetry (no content)",
                "Billing and plan metadata",
                "Security audit log metadata",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1 text-gold shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-base font-semibold text-foreground">
              Third-Party Providers
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              When cloud analysis is used, approved AI infrastructure providers
              process your request. Chameleon selects providers with
              data-use terms that prohibit training on customer data. See the{" "}
              <a
                href="/trust/ai-providers"
                className="text-emerald hover:underline"
              >
                AI Providers page
              </a>{" "}
              for details.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Privacy Questions
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                For questions about this policy or how your data is handled,
                contact our privacy team.
              </p>
            </div>
            <Button href="mailto:privacy@chameleoneye.ai" variant="primary">
              privacy@chameleoneye.ai
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/trust/privacy" variant="secondary">
              Privacy Policy
            </Button>
            <Button href="/trust/data-retention" variant="ghost">
              Data Retention
            </Button>
            <Button href="/trust/ai-providers" variant="ghost">
              AI Providers
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
