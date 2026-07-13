"use client";

import { useState } from "react";
import { DemoDrawer } from "./DemoDrawer";
import { buildRiskReview } from "@/lib/demo/riskReview";
import { RISK_REVIEW_QUESTIONS, riskReviewOptionLabel } from "@/lib/demo/riskReviewQuestions";
import type { RiskReview } from "@/lib/demo/types";

type RiskReviewDrawerProps = {
  locale: "en" | "ar";
  sessionId: string;
  onClose: () => void;
  onComplete: (review: RiskReview) => void;
  onCreateScheduleFollowUp: (review: RiskReview) => void;
};

export function RiskReviewDrawer({
  locale,
  sessionId,
  onClose,
  onComplete,
  onCreateScheduleFollowUp,
}: RiskReviewDrawerProps) {
  const isArabic = locale === "ar";
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<RiskReview | null>(null);

  const total = RISK_REVIEW_QUESTIONS.length;
  const question = RISK_REVIEW_QUESTIONS[step];
  const selected = answers[question?.id ?? ""];
  const isLast = step === total - 1;

  const labels = isArabic
    ? {
        title: "مراجعة مخاطر جديدة",
        progressTemplate: (n: number, t: number) => `السؤال ${n} من ${t}`,
        back: "رجوع",
        next: "التالي",
        finish: "إنهاء مراجعة المخاطر",
        cancel: "إلغاء",
        resultReady: "مراجعة المخاطر جاهزة.",
        resultBody: "تمت إضافة النتيجة إلى المحادثة وحُفظت ضمن مراجعات المخاطر.",
        close: "إغلاق",
        createFollowUp: "إنشاء متابعة مجدولة",
        riskLevel: "مستوى المخاطر",
      }
    : {
        title: "New Risk Review",
        progressTemplate: (n: number, t: number) => `Question ${n} of ${t}`,
        back: "Back",
        next: "Next",
        finish: "Finish Risk Review",
        cancel: "Cancel",
        resultReady: "Risk review is ready.",
        resultBody: "The result has been added to the chat and saved under Risk Reviews.",
        close: "Close",
        createFollowUp: "Create Schedule Follow-up",
        riskLevel: "Risk Level",
      };

  const riskLevelLabels: Record<RiskReview["riskLevel"], string> = isArabic
    ? { low: "منخفض", medium: "متوسط", high: "مرتفع", critical: "حرج" }
    : { low: "Low", medium: "Medium", high: "High", critical: "Critical" };

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goNext() {
    if (!selected) return;
    if (isLast) {
      const review = buildRiskReview(
        {
          focusArea: answers.focusArea,
          seriousness: answers.seriousness,
          pattern: answers.pattern,
          impact: answers.impact,
          affectedGroup: answers.affectedGroup,
          evidence: answers.evidence,
          financialExposure: answers.financialExposure,
          urgency: answers.urgency,
          requestedOutput: answers.requestedOutput,
          privacyLevel: answers.privacyLevel,
          followUp: answers.followUp,
          outputFormat: answers.outputFormat,
        },
        sessionId,
        locale,
      );
      onComplete(review);
      setResult(review);
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  if (result) {
    return (
      <DemoDrawer locale={locale} title={labels.title} onClose={onClose}>
        <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-4">
          <p className="text-sm font-medium text-emerald">{labels.resultReady}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{labels.resultBody}</p>
          <p className="mt-3 text-xs text-muted">
            {labels.riskLevel}: <span className="font-medium text-foreground">{riskLevelLabels[result.riskLevel]} · {result.riskScore}/100</span>
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {result.followUp !== "none" ? (
            <button
              type="button"
              onClick={() => onCreateScheduleFollowUp(result)}
              className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/15"
            >
              {labels.createFollowUp}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            {labels.close}
          </button>
        </div>
      </DemoDrawer>
    );
  }

  return (
    <DemoDrawer locale={locale} title={labels.title} onClose={onClose}>
      <div className="mb-4">
        <p className="text-xs font-medium text-muted">{labels.progressTemplate(step + 1, total)}</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald transition-all"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-base leading-7 font-medium text-foreground">
        {isArabic ? question.textAr : question.textEn}
      </h3>

      <div className="mt-4 space-y-2">
        {question.options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => selectOption(opt.value)}
              className={`block w-full rounded-xl border px-4 py-3 text-start text-sm transition-all ${
                isSelected
                  ? "border-emerald/50 bg-emerald/10 text-foreground"
                  : "border-white/10 bg-background/60 text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              {riskReviewOptionLabel(question.id, opt.value, locale)}
            </button>
          );
        })}
      </div>

      <div className={`mt-6 flex flex-wrap gap-3 ${isArabic ? "flex-row-reverse justify-end" : ""}`}>
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            {labels.back}
          </button>
        ) : null}
        <button
          type="button"
          onClick={goNext}
          disabled={!selected}
          className="rounded-full border border-emerald/30 bg-emerald px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-emerald/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? labels.finish : labels.next}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          {labels.cancel}
        </button>
      </div>
    </DemoDrawer>
  );
}
