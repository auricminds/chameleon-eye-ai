import type { ChameleonStructuredResponse, IntelligenceMode } from "./types";
import type { BusinessDnaRecord } from "./types";

const MODE_FOCUS: Record<IntelligenceMode, { en: string; ar: string; reportEn: string; reportAr: string }> = {
  quick_scan: {
    en: "quick business scan",
    ar: "فحص أعمال سريع",
    reportEn: "Quick Scan Report",
    reportAr: "تقرير فحص سريع",
  },
  deep_review: {
    en: "deep operational review",
    ar: "مراجعة تشغيلية عميقة",
    reportEn: "Deep Review Report",
    reportAr: "تقرير مراجعة عميقة",
  },
  cash_waste: {
    en: "cash waste and value leakage",
    ar: "الهدر المالي وتسرب القيمة",
    reportEn: "Cash Waste Report",
    reportAr: "تقرير الهدر المالي",
  },
  team_effectiveness: {
    en: "team effectiveness and workflow clarity",
    ar: "فعالية الفريق ووضوح سير العمل",
    reportEn: "Team Effectiveness Report",
    reportAr: "تقرير فعالية الفريق",
  },
  customer_journey: {
    en: "customer journey friction",
    ar: "احتكاك رحلة العميل",
    reportEn: "Customer Journey Report",
    reportAr: "تقرير رحلة العميل",
  },
  marketing: {
    en: "marketing intelligence and message fit",
    ar: "ذكاء التسويق وملاءمة الرسالة",
    reportEn: "Marketing Intelligence Report",
    reportAr: "تقرير ذكاء التسويق",
  },
  operational_risk: {
    en: "operational risk patterns",
    ar: "أنماط المخاطر التشغيلية",
    reportEn: "Operational Risk Report",
    reportAr: "تقرير المخاطر التشغيلية",
  },
  decision_memo: {
    en: "executive decision support",
    ar: "دعم قرار تنفيذي",
    reportEn: "Executive Decision Memo",
    reportAr: "مذكرة قرار تنفيذية",
  },
  api_workflow: {
    en: "API workflow integration",
    ar: "تكامل سير عمل API",
    reportEn: "API Workflow Brief",
    reportAr: "موجز سير عمل API",
  },
  private_mode: {
    en: "local/private analysis posture",
    ar: "وضع التحليل المحلي/الخاص",
    reportEn: "Private Mode Readiness Brief",
    reportAr: "موجز جاهزية الوضع الخاص",
  },
};

function riskFromDna(dna: BusinessDnaRecord): "low" | "medium" | "high" {
  if (
    dna.intelligenceTags.includes("operational_risk") ||
    dna.intelligenceTags.includes("cash_waste") ||
    dna.intelligenceTags.includes("missing_facts")
  ) {
    return "high";
  }
  if (dna.intelligenceTags.includes("customer_journey") || dna.intelligenceTags.includes("team_effectiveness")) {
    return "medium";
  }
  return "low";
}

export function generateChameleonDemoResponse(
  userMessage: string,
  businessDna: BusinessDnaRecord,
  mode: IntelligenceMode,
  locale: "en" | "ar",
): ChameleonStructuredResponse {
  const focus = MODE_FOCUS[mode];
  const riskLevel = riskFromDna(businessDna);
  const trimmed = userMessage.trim() || (locale === "ar" ? "تحليل عام" : "general analysis");

  if (locale === "ar") {
    return {
      directAnswer: `بناءً على Business DNA الخاص بك، أتعامل مع "${trimmed}" كموضوع ${focus.ar} مرتبط بـ ${businessDna.mainGoal}.`,
      whatISee: `رسالتك تشير إلى حاجة لرؤية أوضح، وليس نشاطاً ظاهرياً فقط. أسلوب قرارك: ${businessDna.decisionStyle}.`,
      hiddenRisk: `الخطر المحتمل: ${businessDna.biggestConcern}. قد تتكرر المشكلة دون مقاييس واضحة للنتيجة.`,
      missingFacts: [
        "التكلفة أو الوقت الشهري",
        "الفريق أو المالك المسؤول",
        "أرقام التحويل أو النتائج",
        "شكل التقرير أو البيانات الحالية",
      ],
      nextAction: `ابدأ بـ${focus.reportAr}، ثم راجع ${businessDna.outputPreference} قبل أي قرار توسع.`,
      suggestedReport: focus.reportAr,
      riskLevel,
    };
  }

  return {
    directAnswer: `Based on your Business DNA, I would treat "${trimmed}" as a ${focus.en} issue linked to ${businessDna.mainGoal}.`,
    whatISee: `Your message signals a need for clearer visibility, not only surface activity. Decision style: ${businessDna.decisionStyle}.`,
    hiddenRisk: `Possible hidden risk: ${businessDna.biggestConcern}. The pattern may repeat without clear outcome metrics.`,
    missingFacts: [
      "monthly cost or time spent",
      "responsible team or owner",
      "conversion or result numbers",
      "current report format or data",
    ],
    nextAction: `Start with a ${focus.reportEn}, then review ${businessDna.outputPreference} before scaling decisions.`,
    suggestedReport: focus.reportEn,
    riskLevel,
  };
}

export function formatStructuredAsText(
  response: ChameleonStructuredResponse,
  locale: "en" | "ar",
): string {
  if (locale === "ar") {
    return [
      `الإجابة المباشرة:\n${response.directAnswer}`,
      `\nالإشارة الخفية:\n${response.whatISee}\n${response.hiddenRisk}`,
      `\nالمعلومات الناقصة:\n${response.missingFacts.map((f) => `- ${f}`).join("\n")}`,
      `\nالإجراء المقترح:\n${response.nextAction}`,
      `\nالتقرير المناسب: ${response.suggestedReport}`,
    ].join("\n");
  }
  return [
    `Direct Answer:\n${response.directAnswer}`,
    `\nHidden Signal:\n${response.whatISee}\n${response.hiddenRisk}`,
    `\nMissing Facts:\n${response.missingFacts.map((f) => `- ${f}`).join("\n")}`,
    `\nRecommended Action:\n${response.nextAction}`,
    `\nSuggested Report: ${response.suggestedReport}`,
  ].join("\n");
}

export const INTELLIGENCE_MODES: {
  id: IntelligenceMode;
  labelEn: string;
  labelAr: string;
}[] = [
  { id: "quick_scan", labelEn: "Quick Scan", labelAr: "فحص سريع" },
  { id: "deep_review", labelEn: "Deep Review", labelAr: "مراجعة عميقة" },
  { id: "cash_waste", labelEn: "Cash Waste", labelAr: "الهدر المالي" },
  { id: "team_effectiveness", labelEn: "Team Effectiveness", labelAr: "فعالية الفريق" },
  { id: "customer_journey", labelEn: "Customer Journey", labelAr: "رحلة العميل" },
  { id: "marketing", labelEn: "Marketing Intelligence", labelAr: "ذكاء التسويق" },
  { id: "operational_risk", labelEn: "Operational Risk", labelAr: "المخاطر التشغيلية" },
  { id: "decision_memo", labelEn: "Decision Memo", labelAr: "مذكرة قرار" },
  { id: "api_workflow", labelEn: "API Workflow", labelAr: "سير عمل API" },
  { id: "private_mode", labelEn: "Private Mode", labelAr: "الوضع الخاص" },
];

export function getWelcomeMessage(locale: "en" | "ar"): string {
  if (locale === "ar") {
    return `أنا Chameleon.\nلا أخمّن. أبحث عن الأنماط الخفية.\n\nتم تفعيل Business DNA الخاص بك.\nاسألني عن الهدر المالي الخفي، الإشارات الضعيفة، احتكاك رحلة العميل، المخاطر التشغيلية، الملفات الخاصة، أو نقاط ضعف القرار.`;
  }
  return `I am Chameleon.\nI do not guess. I look for hidden patterns.\n\nYour Business DNA is active.\nAsk me about hidden cash waste, weak signals, customer friction, operational risk, private files, or decision blind spots.`;
}
