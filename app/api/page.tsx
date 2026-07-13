import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { API_SECURITY_INTRO, API_SECURITY_NOTE, SECURITY_SENTENCE } from "@/lib/constants";

export const metadata = {
  title: "API",
};

const workflows = [
  "Guidance API",
  "Readiness API",
  "Risk Check API",
  "Draft API",
  "Decision Memo API",
  "Pulse Events API",
  "Business Scoring API",
  "Custom Workflow API",
];

const endpoints = [
  "POST /v1/guidance/profile-check",
  "POST /v1/readiness/listing",
  "POST /v1/risk/check",
  "POST /v1/decision/memo",
  "POST /v1/pulse/events",
  "POST /v1/scoring/business-readiness",
  "POST /v1/workflows/{client}/{workflow}",
];

export default function ApiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Chameleon Eye API"
        subtitle="Business intelligence workflows for websites, apps, platforms, games, marketplaces, desktop apps, and enterprise systems."
      />

      <div className="mt-16 space-y-8">
        <Card>
          <h2 className="text-xl font-semibold text-foreground">What the API does</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            It returns structured business outputs, not generic chat.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-foreground">API workflows</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {workflows.map((item) => (
              <p key={item} className="text-sm text-muted">
                {item}
              </p>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-foreground">Example endpoints</h2>
          <div className="mt-4 space-y-2 font-mono text-sm text-muted">
            {endpoints.map((endpoint) => (
              <p key={endpoint}>{endpoint}</p>
            ))}
          </div>
        </Card>

        <Card className="border-emerald/20 bg-panel2">
          <h2 className="text-xl font-semibold text-foreground">Secure integration</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{API_SECURITY_INTRO}</p>
          <p className="mt-4 text-sm leading-7 text-muted">{API_SECURITY_NOTE}</p>
          <p className="mt-4 text-sm leading-7 text-gold">{SECURITY_SENTENCE}</p>
        </Card>

        <Card className="border-emerald/20 bg-panel2">
          <h2 className="text-xl font-semibold text-foreground">Example response</h2>
          <pre className="mt-4 overflow-x-auto font-mono text-sm leading-7 text-muted">
{`{
  "readinessScore": 78,
  "riskLevel": "medium",
  "missingFacts": ["ownership proof", "clear price"],
  "nextBestAction": "Add missing proof before publishing."
}`}
          </pre>
        </Card>
      </div>

      <div className="mt-12">
        <Button href="/contact">Request API Access</Button>
      </div>
    </div>
  );
}
