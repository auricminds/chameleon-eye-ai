import { riskReviewOptionLabel } from "./riskReviewQuestions";
import type {
  RiskReview,
  RiskReviewFocusArea,
  RiskReviewLevel,
  ScheduleCheckType,
  ScheduleFrequency,
} from "./types";
import { uid } from "./storage";

type RiskReviewAnswers = {
  focusArea: string;
  seriousness: string;
  pattern: string;
  impact: string;
  affectedGroup: string;
  evidence: string;
  financialExposure: string;
  urgency: string;
  requestedOutput: string;
  privacyLevel: string;
  followUp: string;
  outputFormat: string;
};

const FOCUS_AREA_INFO: Record<RiskReviewFocusArea, { signalEn: string; signalAr: string; reportEn: string; reportAr: string }> = {
  cash_waste: {
    signalEn: "recurring spend without a clear return",
    signalAr: "إنفاق متكرر دون عائد واضح",
    reportEn: "Cash Waste Report",
    reportAr: "تقرير الهدر المالي",
  },
  operations: {
    signalEn: "operational bottlenecks and inconsistent execution",
    signalAr: "اختناقات تشغيلية وتنفيذ غير متسق",
    reportEn: "Operational Risk Report",
    reportAr: "تقرير المخاطر التشغيلية",
  },
  customer_journey: {
    signalEn: "friction points causing drop-off in the customer journey",
    signalAr: "نقاط احتكاك تسبب تسرب العملاء في رحلتهم",
    reportEn: "Customer Journey Report",
    reportAr: "تقرير رحلة العميل",
  },
  team_effectiveness: {
    signalEn: "unclear ownership and delivery gaps within the team",
    signalAr: "غموض في الملكية وفجوات في التسليم داخل الفريق",
    reportEn: "Team Effectiveness Report",
    reportAr: "تقرير فعالية الفريق",
  },
  marketing: {
    signalEn: "marketing spend not matching results",
    signalAr: "إنفاق تسويقي لا يتناسب مع النتائج",
    reportEn: "Marketing Intelligence Report",
    reportAr: "تقرير ذكاء التسويق",
  },
  api_product: {
    signalEn: "exposure in an API or product workflow",
    signalAr: "تعرض في سير عمل API أو المنتج",
    reportEn: "API Workflow Brief",
    reportAr: "موجز سير عمل API",
  },
  private_data: {
    signalEn: "sensitive data handled without enough safeguards",
    signalAr: "بيانات حساسة تُعالج دون ضمانات كافية",
    reportEn: "Private Mode Readiness Report",
    reportAr: "تقرير جاهزية الوضع الخاص",
  },
  security_incident: {
    signalEn: "a recurring or suspicious incident pattern",
    signalAr: "نمط حوادث متكرر أو مشبوه",
    reportEn: "Risk Review Report",
    reportAr: "تقرير مراجعة المخاطر",
  },
  business_decision: {
    signalEn: "a decision being made without enough confirmed facts",
    signalAr: "قرار يُتخذ دون معلومات كافية مؤكدة",
    reportEn: "Decision Memo",
    reportAr: "مذكرة قرار",
  },
  other: {
    signalEn: "an unclassified risk pattern",
    signalAr: "نمط خطر غير مصنف",
    reportEn: "Risk Review Report",
    reportAr: "تقرير مراجعة المخاطر",
  },
};

const FOCUS_TO_CHECK_TYPE: Record<RiskReviewFocusArea, ScheduleCheckType> = {
  cash_waste: "cash_waste",
  operations: "operational_risk",
  customer_journey: "customer_journey",
  team_effectiveness: "team_effectiveness",
  marketing: "marketing_intel",
  api_product: "custom",
  private_data: "private_mode",
  security_incident: "custom",
  business_decision: "decision_followup",
  other: "custom",
};

function computeRiskScore(answers: RiskReviewAnswers): number {
  const seriousnessBase: Record<string, number> = {
    low: 15,
    medium: 40,
    high: 70,
    critical: 90,
    not_sure: 45,
  };
  const patternAdd: Record<string, number> = { one_time: 0, repeated: 12, increasing: 18, unknown: 5 };
  const financialAdd: Record<string, number> = {
    small: 0,
    medium: 8,
    large: 16,
    unknown: 4,
    not_financial: 0,
  };
  const urgencyAdd: Record<string, number> = {
    today: 10,
    this_week: 5,
    this_month: 0,
    monitor_only: -10,
    not_sure: 0,
  };

  let score =
    (seriousnessBase[answers.seriousness] ?? 40) +
    (patternAdd[answers.pattern] ?? 0) +
    (financialAdd[answers.financialExposure] ?? 0) +
    (urgencyAdd[answers.urgency] ?? 0);

  if (answers.seriousness === "critical") score = Math.max(score, 88);

  return Math.max(0, Math.min(100, Math.round(score)));
}

function riskLevelFromScore(score: number, seriousness: string): RiskReviewLevel {
  if (seriousness === "critical") return "critical";
  if (score >= 85) return "critical";
  if (score >= 60) return "high";
  if (score >= 30) return "medium";
  return "low";
}

function buildMissingFacts(answers: RiskReviewAnswers, locale: "en" | "ar"): string[] {
  const facts: string[] = [];
  if (answers.evidence === "no_evidence") {
    facts.push(
      locale === "ar"
        ? "أدلة أو أرقام مؤكدة تدعم الملاحظة"
        : "confirmed evidence or numbers behind the observation",
    );
  }
  if (answers.financialExposure === "unknown") {
    facts.push(locale === "ar" ? "تقدير واضح للتكلفة المالية" : "a clear estimate of the financial cost");
  }
  if (answers.pattern === "unknown") {
    facts.push(
      locale === "ar"
        ? "تأكيد ما إذا كانت المشكلة متكررة أم لمرة واحدة"
        : "confirmation of whether this is a one-time issue or a repeated pattern",
    );
  }
  if (answers.seriousness === "not_sure") {
    facts.push(
      locale === "ar" ? "تقييم أوضح لمستوى الخطورة الفعلي" : "a clearer read on how serious this actually is",
    );
  }
  if (facts.length === 0) {
    facts.push(
      locale === "ar"
        ? "تأكيد إضافي من فريق مختلف قبل التصعيد"
        : "a second confirmation from another team before escalating",
    );
  }
  return facts.slice(0, 3);
}

export function buildRiskReview(
  answers: RiskReviewAnswers,
  sessionId: string,
  locale: "en" | "ar",
): RiskReview {
  const focusArea = (answers.focusArea || "other") as RiskReviewFocusArea;
  const focusInfo = FOCUS_AREA_INFO[focusArea] ?? FOCUS_AREA_INFO.other;

  const riskScore = computeRiskScore(answers);
  const riskLevel = riskLevelFromScore(riskScore, answers.seriousness);

  const label = (id: Parameters<typeof riskReviewOptionLabel>[0], value: string) =>
    riskReviewOptionLabel(id, value, locale);

  const seriousnessLabel = label("seriousness", answers.seriousness);
  const focusLabel = label("focusArea", answers.focusArea);
  const patternLabel = label("pattern", answers.pattern);
  const impactLabel = label("impact", answers.impact);
  const affectedGroupLabel = label("affectedGroup", answers.affectedGroup);
  const urgencyLabel = label("urgency", answers.urgency);
  const requestedOutputLabel = label("requestedOutput", answers.requestedOutput);

  const summary =
    locale === "ar"
      ? `خطر ${seriousnessLabel} في ${focusLabel} — ${patternLabel}. التأثير الرئيسي: ${impactLabel}، يؤثر بشكل رئيسي على ${affectedGroupLabel}.`
      : `${seriousnessLabel} risk in ${focusLabel} — ${patternLabel}. Main impact: ${impactLabel}, mainly affecting ${affectedGroupLabel}.`;

  const recommendedAction =
    locale === "ar"
      ? `نظراً لإلحاح "${urgencyLabel}"، ابدأ بـ ${requestedOutputLabel} يركز على ${focusLabel}.`
      : `Given the "${urgencyLabel}" urgency, start with a ${requestedOutputLabel} focused on ${focusLabel}.`;

  return {
    id: uid(),
    sessionId,
    createdAt: new Date().toISOString(),
    language: locale,
    focusArea,
    seriousness: answers.seriousness as RiskReview["seriousness"],
    pattern: answers.pattern as RiskReview["pattern"],
    impact: answers.impact as RiskReview["impact"],
    affectedGroup: answers.affectedGroup as RiskReview["affectedGroup"],
    evidence: answers.evidence as RiskReview["evidence"],
    financialExposure: answers.financialExposure as RiskReview["financialExposure"],
    urgency: answers.urgency as RiskReview["urgency"],
    requestedOutput: answers.requestedOutput as RiskReview["requestedOutput"],
    privacyLevel: answers.privacyLevel as RiskReview["privacyLevel"],
    followUp: answers.followUp as RiskReview["followUp"],
    outputFormat: answers.outputFormat as RiskReview["outputFormat"],
    riskScore,
    riskLevel,
    summary,
    missingFacts: buildMissingFacts(answers, locale),
    recommendedAction,
    suggestedReport: locale === "ar" ? focusInfo.reportAr : focusInfo.reportEn,
  };
}

export function riskReviewHiddenSignal(review: RiskReview, locale: "en" | "ar"): string {
  const info = FOCUS_AREA_INFO[review.focusArea] ?? FOCUS_AREA_INFO.other;
  return locale === "ar" ? info.signalAr : info.signalEn;
}

export function riskReviewFollowUpText(review: RiskReview, locale: "en" | "ar"): string {
  const followUpLabel = riskReviewOptionLabel("followUp", review.followUp, locale);
  if (review.followUp === "none") {
    return locale === "ar" ? "لا توجد متابعة مجدولة." : "No follow-up scheduled.";
  }
  return locale === "ar" ? `المتابعة: ${followUpLabel}.` : `Follow up: ${followUpLabel}.`;
}

export function buildScheduleFollowUp(
  review: RiskReview,
  locale: "en" | "ar",
): { title: string; checkType: ScheduleCheckType; frequency: ScheduleFrequency } {
  const focusLabel = riskReviewOptionLabel("focusArea", review.focusArea, locale);
  const followUpLabel = riskReviewOptionLabel("followUp", review.followUp, locale);
  const title =
    locale === "ar"
      ? `متابعة مراجعة المخاطر — ${focusLabel} (${followUpLabel})`
      : `Risk Review Follow-up — ${focusLabel} (${followUpLabel})`;
  return {
    title,
    checkType: FOCUS_TO_CHECK_TYPE[review.focusArea] ?? "custom",
    frequency: "one_time",
  };
}
