import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Changelog — Chameleon Eye AI",
  description:
    "Product updates, new features, and improvements for Chameleon Eye AI.",
};

type ChangelogEntry = {
  date: string;
  category: string;
  variant: "emerald" | "gold" | "muted";
  items: string[];
};

const entries: ChangelogEntry[] = [
  {
    date: "July 2026",
    category: "Trust Center & Compliance",
    variant: "emerald",
    items: [
      "Published Verified Trust Center with SOC 2 Type II, ISO/IEC 27001, and penetration testing documentation",
      "Added Data Processing Agreement (DPA) page for business customers",
      "Published Subprocessors list",
      "Added Company Transparency page",
      "Added Offline Local Mode / Hybrid Approval / ZDR route documentation",
      "Added Responsible Disclosure process",
    ],
  },
  {
    date: "July 2026",
    category: "Security",
    variant: "gold",
    items: [
      "Published Security Architecture documentation",
      "Added API Key Protection policy",
      "Published Desktop Connector security documentation (device activation, short-lived tokens, revocation)",
      "Added security headers: CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy",
    ],
  },
  {
    date: "July 2026",
    category: "API Documentation",
    variant: "emerald",
    items: [
      "Published API Documentation with endpoint reference",
      "Added Authentication guide",
      "Added Rate Limits documentation",
      "Added Data Handling documentation",
      "Added Developer landing page with curl examples",
    ],
  },
  {
    date: "June 2026",
    category: "Platform Launch",
    variant: "muted",
    items: [
      "Chameleon Eye AI Early Access launched",
      "Private AI Workspace available",
      "Desktop Connector beta",
      "Free business scanners: Cash Waste Scanner, Team Effectiveness Check, Marketing Waste Test",
      "Arabic language support added to full platform",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Badge variant="muted">Changelog</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Product Updates
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            New features, improvements, and fixes for Chameleon Eye AI.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/8 hidden sm:block" />

          <div className="space-y-12">
            {entries.map((entry, index) => (
              <div key={index} className="sm:pl-10 relative">
                {/* Timeline dot */}
                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-emerald hidden sm:block" />

                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">
                    {entry.date}
                  </span>
                  <Badge variant={entry.variant}>{entry.category}</Badge>
                </div>

                <Card>
                  <ul className="space-y-3">
                    {entry.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 text-emerald shrink-0 text-xs">+</span>
                        <span className="text-sm leading-6 text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
