import Link from "next/link";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "AI Reports",
};

const reports = [
  {
    title: "Cash Waste Report",
    copy: "Shows where value may be leaking.",
  },
  {
    title: "Team Effectiveness Report",
    copy: "Shows workflow bottlenecks, unclear ownership, and role signals.",
  },
  {
    title: "Customer Journey Report",
    copy: "Shows where users abandon, hesitate, or get stuck.",
  },
  {
    title: "Marketing Intelligence Report",
    copy: "Shows weak positioning, audience mismatch, and next actions.",
  },
  {
    title: "Operational Risk Report",
    copy: "Shows repeated errors, delays, and process risks.",
  },
  {
    title: "Executive Decision Memo",
    copy: "Summarizes options, risks, recommendation, and next action.",
  },
];

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Chameleon Eye Intelligence Reports"
        subtitle="Private AI-generated report formats for business owners, managers, consultants, and companies that need clear decisions from approved data."
      />

      <Card className="mt-10 border-emerald/20 bg-panel2">
        <p className="text-sm leading-7 text-muted">
          These are not bug reports or support tickets. These are business
          intelligence report types generated from approved files, workflows,
          operational signals, or private analysis.
        </p>
      </Card>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title} hover className="flex h-full flex-col">
            <h2 className="text-lg font-semibold text-foreground">{report.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-muted">{report.copy}</p>
            <Link
              href="/contact"
              className="mt-5 inline-flex text-sm font-medium text-emerald transition-colors hover:text-emerald/80"
            >
              Request Sample Report →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
