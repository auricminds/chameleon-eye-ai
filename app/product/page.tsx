import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Product",
};

const features = [
  "private workspace",
  "report builder",
  "risk detection",
  "cash waste analysis",
  "team effectiveness signals",
  "marketing intelligence",
  "customer journey review",
  "executive summaries",
];

export default function ProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Chameleon Eye AI Product"
        subtitle="A private intelligence workspace for business owners, teams, consultants, and companies that need clear reports from approved data."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-foreground">What it does</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>analyzes approved files</li>
            <li>detects hidden risks</li>
            <li>finds weak signals</li>
            <li>creates confidential reports</li>
            <li>suggests next actions</li>
          </ul>
        </Card>

        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-foreground">Best for</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>owners</li>
            <li>managers</li>
            <li>consultants</li>
            <li>auditors</li>
            <li>HR teams</li>
            <li>operations teams</li>
            <li>marketing teams</li>
          </ul>
        </Card>

        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-foreground">Main features</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-12">
        <Button href="/signup">Start Free</Button>
      </div>
    </div>
  );
}
