import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionTitle } from "@/components/SectionTitle";
import { PRIVACY_SENTENCE } from "@/lib/constants";

export const metadata = {
  title: "Private Mode",
};

export default function PrivateModePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Private / Local Mode"
        subtitle="Your files can stay on your device."
      />

      <Card className="mt-10 border-gold/30 bg-panel2 shadow-[0_0_40px_rgba(215,180,106,0.08)]">
        <p className="text-base font-medium leading-8 text-gold">{PRIVACY_SENTENCE}</p>
      </Card>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <FeatureCard
          title="Local Private Mode"
          copy="Files stay on the customer's device. Chameleon Eye AI cannot see files that are not shared."
        />
        <FeatureCard
          title="Hybrid Approval Mode"
          copy="The system can analyze locally first, then ask before sending selected information to the cloud."
        />
        <FeatureCard
          title="Cloud / API Mode"
          copy="Approved data is sent securely for stronger workflows, scoring, dashboards, and intelligence reports."
        />
      </div>

      <Card className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Best for</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-muted">
          <li>contracts</li>
          <li>internal reports</li>
          <li>staff files where authorized</li>
          <li>sensitive business documents</li>
          <li>early investigation</li>
          <li>confidential reports</li>
        </ul>
      </Card>

      <div className="mt-12">
        <Button href="/contact">Ask about Private Mode</Button>
      </div>
    </div>
  );
}
