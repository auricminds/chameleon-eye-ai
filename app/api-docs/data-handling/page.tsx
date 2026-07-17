import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "API Data Handling — Chameleon Eye AI",
  description:
    "How Chameleon Eye API handles customer data, approved payloads, local mode, and logging.",
};

const processingPrinciples = [
  {
    title: "Approved payload only",
    detail:
      "Chameleon Eye AI never performs automatic full archive upload. Only explicitly approved payloads are processed.",
  },
  {
    title: "Local / Offline Mode",
    detail:
      "Does not contact third-party AI APIs. Processing remains entirely on the user device or local deployment.",
  },
  {
    title: "Hybrid Approval Mode",
    detail:
      "Sends only selected text or approved summaries to cloud AI, and only after explicit user approval.",
  },
  {
    title: "Private Cloud / ZDR Route",
    detail:
      "Uses an approved privacy route where the contract supports zero data retention. Request is blocked rather than silently downgraded if this route is required but unavailable.",
  },
  {
    title: "Standard Cloud / API Mode",
    detail:
      "Processes only the current approved request through Chameleon Eye API and approved AI infrastructure.",
  },
];

const loggingItems = [
  "Raw private prompts are not stored in normal application logs by default.",
  "Raw AI responses are not stored by default.",
  "Provider API keys are never logged.",
  "Usage metadata (counts, timestamps, plan checks) may be stored for billing, abuse prevention, and audit integrity.",
];

export default function ApiDataHandlingPage() {
  return (
    <>
      {/* Developer Preview Banner */}
      <div className="border-b border-gold/30 bg-gold/8 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-gold">Developer Preview</p>
          <p className="text-xs leading-5 text-muted mt-0.5">
            The Chameleon Eye API is in developer preview. Production access is not yet generally available.
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            API
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            API Data Handling
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            How Chameleon Eye API handles customer data, approved payloads,
            local mode, and logging.
          </p>
        </div>
      </section>

      {/* A. Data Processing Principles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="A. Data Processing Principles"
          subtitle="How Chameleon Eye AI processes data across all modes."
          align="left"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {processingPrinciples.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* B. What is sent to cloud AI */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="B. What Is Sent to Cloud AI"
            subtitle="Only the approved payload is ever sent — never a customer's full private archive."
            align="left"
          />
          <div className="mt-10 rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
            <p className="text-sm leading-7 text-foreground">
              When cloud AI processing is used, only the current approved
              payload is sent. Chameleon Eye AI does not automatically send a
              customer&apos;s full document library, local memory, source code
              repository, HR database, or financial records.
            </p>
          </div>
        </div>
      </section>

      {/* C. Logging */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="C. Logging"
          subtitle="What Chameleon Eye AI does and does not log."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {loggingItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-white/8 bg-panel px-4 py-3"
            >
              <span className="mt-1 text-emerald shrink-0">+</span>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* D. ZDR Route */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="D. Private Cloud / Zero Data Retention Route"
            subtitle="For sensitive analysis requiring stricter data handling."
            align="left"
          />
          <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm leading-7 text-muted">
              A Private Cloud / Zero Data Retention route is available for
              sensitive analysis where the contracted AI provider route supports
              zero data retention. If this route is required but unavailable,
              the request is blocked rather than silently downgraded.
            </p>
          </div>
        </div>
      </section>

      {/* E. Regulated Data Warning */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="E. Regulated / Sensitive Data Warning"
          subtitle="Customer responsibility for regulated data categories."
          align="left"
        />
        <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            Important Notice
          </p>
          <p className="text-sm leading-7 text-muted">
            Customers should not process regulated medical, financial, legal, or
            highly sensitive personal data through cloud analysis unless they
            have verified the applicable contractual, legal, and compliance
            requirements for their use case.
          </p>
        </div>
      </section>

      {/* Footer links */}
      <section className="border-t border-white/8 bg-panel/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button href="/api-docs" variant="secondary">
              Back to API Docs
            </Button>
            <Button href="/trust/local-vs-cloud" variant="ghost">
              Local vs Cloud Processing
            </Button>
            <Button href="/privacy" variant="ghost">
              Privacy Policy
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
