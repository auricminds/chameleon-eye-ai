"use client";

import type { ChameleonStructuredResponse } from "@/lib/demo/types";

type ReportCardProps = {
  response: ChameleonStructuredResponse;
  locale: "en" | "ar";
};

export function ReportCard({ response, locale }: ReportCardProps) {
  const isArabic = locale === "ar";
  const riskColors = {
    low: "text-emerald border-emerald/30 bg-emerald/5",
    medium: "text-gold border-gold/30 bg-gold/5",
    high: "text-red-400 border-red-400/30 bg-red-400/5",
  };
  const risk = response.riskLevel ?? "medium";
  const riskLabel = isArabic
    ? { low: "منخفض", medium: "متوسط", high: "مرتفع" }[risk]
    : { low: "Low", medium: "Medium", high: "High" }[risk];

  const labels = isArabic
    ? {
        risk: "مستوى المخاطر",
        direct: "الإجابة المباشرة",
        hidden: "الإشارة الخفية",
        missing: "المعلومات الناقصة",
        action: "الإجراء المقترح",
        report: "التقرير المناسب",
      }
    : {
        risk: "Risk Level",
        direct: "Direct Answer",
        hidden: "Hidden Signal",
        missing: "Missing Facts",
        action: "Recommended Action",
        report: "Suggested Report",
      };

  const hiddenSignal = `${response.whatISee}\n\n${response.hiddenRisk}`;

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="space-y-4 rounded-2xl border border-white/10 bg-panel2/70 p-5 shadow-[0_0_40px_rgba(31,174,130,0.04)] backdrop-blur-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskColors[risk]}`}
        >
          {labels.risk}: {riskLabel}
        </span>
      </div>

      <Section title={labels.direct} body={response.directAnswer} />
      <Section title={labels.hidden} body={hiddenSignal} />
      <div>
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-gold">
          {labels.missing}
        </p>
        <ul className={`space-y-1 text-sm text-muted ${isArabic ? "pr-4" : "pl-4"}`}>
          {response.missingFacts.map((f) => (
            <li key={f} className="list-disc">
              {f}
            </li>
          ))}
        </ul>
      </div>
      <Section title={labels.action} body={response.nextAction} />
      <Section title={labels.report} body={response.suggestedReport} accent />
    </div>
  );
}

function Section({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-gold">
        {title}
      </p>
      <p
        className={`whitespace-pre-wrap text-sm leading-6 ${accent ? "text-emerald" : "text-foreground"}`}
      >
        {body}
      </p>
    </div>
  );
}
