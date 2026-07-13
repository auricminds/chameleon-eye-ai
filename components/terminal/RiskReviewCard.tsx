"use client";

import { riskReviewFollowUpText, riskReviewHiddenSignal } from "@/lib/demo/riskReview";
import { riskReviewOptionLabel } from "@/lib/demo/riskReviewQuestions";
import type { RiskReview } from "@/lib/demo/types";

type RiskReviewCardProps = {
  review: RiskReview;
  locale: "en" | "ar";
};

const RISK_COLORS: Record<RiskReview["riskLevel"], string> = {
  low: "text-emerald border-emerald/30 bg-emerald/5",
  medium: "text-gold border-gold/30 bg-gold/5",
  high: "text-red-400 border-red-400/30 bg-red-400/5",
  critical: "text-red-300 border-red-500/50 bg-red-500/10",
};

export function RiskReviewCard({ review, locale }: RiskReviewCardProps) {
  const isArabic = locale === "ar";

  const riskLevelLabels: Record<RiskReview["riskLevel"], string> = isArabic
    ? { low: "منخفض", medium: "متوسط", high: "مرتفع", critical: "حرج" }
    : { low: "Low", medium: "Medium", high: "High", critical: "Critical" };

  const labels = isArabic
    ? {
        risk: "مستوى المخاطر",
        focusArea: "مجال التركيز",
        hidden: "الإشارة الخفية",
        impact: "التأثير على الأعمال",
        missing: "المعلومات الناقصة",
        action: "الإجراء المقترح",
        followUp: "المتابعة",
        report: "التقرير المناسب",
      }
    : {
        risk: "Risk Level",
        focusArea: "Focus Area",
        hidden: "Hidden Signal",
        impact: "Business Impact",
        missing: "Missing Facts",
        action: "Recommended Action",
        followUp: "Follow-up",
        report: "Suggested Report",
      };

  const focusAreaLabel = riskReviewOptionLabel("focusArea", review.focusArea, locale);
  const impactLabel = riskReviewOptionLabel("impact", review.impact, locale);
  const hiddenSignal = riskReviewHiddenSignal(review, locale);
  const followUpText = riskReviewFollowUpText(review, locale);

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="space-y-4 rounded-2xl border border-white/10 bg-panel2/70 p-5 shadow-[0_0_40px_rgba(31,174,130,0.04)] backdrop-blur-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${RISK_COLORS[review.riskLevel]}`}
        >
          {labels.risk}: {riskLevelLabels[review.riskLevel]} · {review.riskScore}/100
        </span>
      </div>

      <Section title={labels.focusArea} body={focusAreaLabel} />
      <Section title={labels.hidden} body={hiddenSignal} />
      <Section title={labels.impact} body={impactLabel} />

      <div>
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-gold">
          {labels.missing}
        </p>
        <ul className={`space-y-1 text-sm text-muted ${isArabic ? "pr-4" : "pl-4"}`}>
          {review.missingFacts.map((f) => (
            <li key={f} className="list-disc">
              {f}
            </li>
          ))}
        </ul>
      </div>

      <Section title={labels.action} body={review.recommendedAction} />
      <Section title={labels.followUp} body={followUpText} />
      <Section title={labels.report} body={review.suggestedReport} accent />
    </div>
  );
}

function Section({ title, body, accent }: { title: string; body: string; accent?: boolean }) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-gold">{title}</p>
      <p
        className={`whitespace-pre-wrap text-sm leading-6 ${accent ? "text-emerald" : "text-foreground"}`}
      >
        {body}
      </p>
    </div>
  );
}
