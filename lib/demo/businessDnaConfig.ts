import type { BusinessDnaRecord, DnaQuestionDef } from "./types";

export type DnaLocaleConfig = {
  locale: "en" | "ar";
  title: string;
  subtitle: string;
  progressTemplate: string;
  nextLabel: string;
  backLabel: string;
  finishLabel: string;
  disclaimer: string;
  resultHeading: string;
  openTerminalCta: string;
  editDnaCta: string;
  questions: DnaQuestionDef[];
};

export const DNA_EN: DnaLocaleConfig = {
  locale: "en",
  title: "Build Your Business DNA",
  subtitle:
    "12 quick choices so Chameleon Terminal adapts every answer to your role, goals, risks, and privacy needs.",
  progressTemplate: "Question {n} of {total}",
  nextLabel: "Next",
  backLabel: "Back",
  finishLabel: "Complete Business DNA",
  disclaimer:
    "Demo mode: profile data is saved locally in this browser until production authentication is connected.",
  resultHeading: "Your Chameleon Business DNA is ready.",
  openTerminalCta: "Open Chameleon Terminal",
  editDnaCta: "Edit Business DNA",
  questions: [
    {
      id: "role",
      text: "What is your role?",
      options: [
        { label: "Business owner / founder", tags: ["founder"] },
        { label: "CEO / general manager", tags: ["executive"] },
        { label: "Operations manager", tags: ["operations_lead"] },
        { label: "HR / people manager", tags: ["hr_lead"] },
        { label: "Marketing / sales leader", tags: ["marketing_lead"] },
        { label: "Consultant / advisor", tags: ["consultant"] },
        { label: "Investor / board member", tags: ["investor"] },
        { label: "Developer / product builder", tags: ["api_builder"] },
        { label: "Other", tags: [] },
      ],
    },
    {
      id: "businessType",
      text: "What type of business?",
      options: [
        { label: "Service business", tags: ["services"] },
        { label: "Retail / branches", tags: ["retail"] },
        { label: "Hospitality", tags: ["hospitality"] },
        { label: "Real estate", tags: ["real_estate"] },
        { label: "Recruitment / HR", tags: ["recruitment"] },
        { label: "SaaS / marketplace", tags: ["saas_marketplace"] },
        { label: "AI product / digital platform", tags: ["digital_platform"] },
        { label: "Security / operations", tags: ["security_ops"] },
        { label: "Investment / business deals", tags: ["investment"] },
        { label: "Other", tags: [] },
      ],
    },
    {
      id: "mainGoal",
      text: "What is your main goal?",
      options: [
        { label: "Find hidden business problems", tags: ["risk_watch"] },
        { label: "Reduce wasted money", tags: ["cash_waste"] },
        { label: "Improve team performance", tags: ["team_effectiveness"] },
        { label: "Understand customer/user behavior", tags: ["customer_journey"] },
        { label: "Improve marketing results", tags: ["marketing_intel"] },
        { label: "Create executive reports", tags: ["executive_summary"] },
        { label: "Add AI/API to my own product", tags: ["api_builder"] },
        { label: "Analyze private files locally", tags: ["local_private_mode"] },
        { label: "Prepare for an audit or business review", tags: ["audit_ready"] },
      ],
    },
    {
      id: "biggestConcern",
      text: "What is your biggest worry?",
      options: [
        { label: "I am spending money but cannot see the return", tags: ["cash_waste"] },
        { label: "My team is busy but results are unclear", tags: ["team_effectiveness"] },
        { label: "Customers/users are not completing actions", tags: ["customer_journey"] },
        { label: "My systems have problems I discover too late", tags: ["operational_risk"] },
        { label: "I do not trust the quality of reports I receive", tags: ["report_quality"] },
        { label: "I need better visibility before making decisions", tags: ["decision_support"] },
        { label: "I need confidential analysis", tags: ["confidential_documents"] },
        { label: "I want AI inside my product", tags: ["api_builder"] },
      ],
    },
    {
      id: "decisionStyle",
      text: "How do you usually decide?",
      options: [
        { label: "Reports and numbers", tags: ["data_driven"] },
        { label: "Team feedback", tags: ["collaborative"] },
        { label: "Personal experience", tags: ["experiential"] },
        { label: "Customer/user behavior", tags: ["customer_journey"] },
        { label: "Financial results", tags: ["cash_waste"] },
        { label: "Urgent problems", tags: ["fast_decisive"] },
        { label: "I often do not have enough clear information", tags: ["missing_facts"] },
      ],
    },
    {
      id: "outputPreference",
      text: "Preferred output format?",
      options: [
        { label: "Short direct answer", tags: ["quick_score"] },
        { label: "Detailed report", tags: ["detailed_report"] },
        { label: "Risk map", tags: ["risk_watch"] },
        { label: "Step-by-step action plan", tags: ["action_plan"] },
        { label: "Executive summary", tags: ["executive_summary"] },
        { label: "Table / score / checklist", tags: ["quick_score"] },
        { label: "Decision memo with options", tags: ["decision_memo"] },
      ],
    },
    {
      id: "communicationTone",
      text: "Preferred communication tone?",
      options: [
        { label: "Direct and strict", tags: ["direct"] },
        { label: "Professional and balanced", tags: ["professional"] },
        { label: "Simple and easy", tags: ["simple"] },
        { label: "Executive style", tags: ["executive_summary"] },
        { label: "Consultant style", tags: ["consultant"] },
        { label: "Deep analysis style", tags: ["detailed_report"] },
        { label: "Warning-focused when risk is high", tags: ["risk_watch"] },
      ],
    },
    {
      id: "hiddenCostConcern",
      text: "Where might hidden cost hide?",
      options: [
        { label: "Marketing spend", tags: ["marketing_intel", "cash_waste"] },
        { label: "Staff time", tags: ["team_effectiveness"] },
        { label: "Poor customer conversion", tags: ["customer_journey"] },
        { label: "Repeated operational mistakes", tags: ["operational_risk"] },
        { label: "Weak systems or software", tags: ["operational_risk"] },
        { label: "Bad decisions from unclear reports", tags: ["decision_support"] },
        { label: "Lost sales opportunities", tags: ["customer_journey"] },
        { label: "Branch or location inconsistency", tags: ["operational_risk"] },
      ],
    },
    {
      id: "earlyWarningTarget",
      text: "What should Chameleon watch for early?",
      options: [
        { label: "Cash waste", tags: ["cash_waste"] },
        { label: "Team performance weakness", tags: ["team_effectiveness"] },
        { label: "Customer journey problems", tags: ["customer_journey"] },
        { label: "Marketing failure", tags: ["marketing_intel"] },
        { label: "Operational risk", tags: ["operational_risk"] },
        { label: "Security/incident patterns where authorized", tags: ["risk_watch"] },
        { label: "Weak business opportunities", tags: ["decision_support"] },
        { label: "System or product friction", tags: ["api_builder"] },
      ],
    },
    {
      id: "expectedDataTypes",
      text: "What data will you work with?",
      options: [
        { label: "Business reports", tags: ["reports"] },
        { label: "Excel / spreadsheets", tags: ["financial_data"] },
        { label: "PDFs / documents", tags: ["confidential_documents"] },
        { label: "Marketing results", tags: ["marketing_intel"] },
        { label: "HR or team workflow data where authorized", tags: ["team_effectiveness"] },
        { label: "Website/app user behavior", tags: ["customer_journey"] },
        { label: "CRM / sales data", tags: ["sales_data"] },
        { label: "Operational logs", tags: ["operational_risk"] },
        { label: "I am not sure yet", tags: ["missing_facts"] },
      ],
    },
    {
      id: "sensitivityLevel",
      text: "How sensitive is your data?",
      options: [
        { label: "Normal business information", tags: ["low_sensitivity"] },
        { label: "Confidential company documents", tags: ["confidential_documents"] },
        { label: "Financial or investor information", tags: ["highly_sensitive"] },
        { label: "HR/team information", tags: ["hr_data"] },
        { label: "Client/customer information", tags: ["customer_data"] },
        { label: "Security or operations information", tags: ["security_ops"] },
        {
          label: "Extremely sensitive — local/private mode preferred",
          tags: ["local_private_mode"],
        },
      ],
    },
    {
      id: "privacyMode",
      text: "Default privacy mode?",
      options: [
        { label: "Cloud AI is fine for approved data", tags: ["cloud_first"] },
        { label: "Local first, cloud only with approval", tags: ["local_private_mode"] },
        { label: "Files must stay on my device", tags: ["device_only"] },
        { label: "I need help choosing the safest option", tags: ["hybrid_mode"] },
      ],
    },
  ],
};

export const DNA_AR: DnaLocaleConfig = {
  locale: "ar",
  title: "أنشئ Business DNA الخاص بك",
  subtitle:
    "12 اختياراً سريعاً حتى يتكيف Chameleon Terminal مع دورك وأهدافك ومخاطرك واحتياجات الخصوصية.",
  progressTemplate: "السؤال {n} من {total}",
  nextLabel: "التالي",
  backLabel: "السابق",
  finishLabel: "إكمال Business DNA",
  disclaimer:
    "وضع تجريبي: يتم حفظ الملف محلياً في هذا المتصفح حتى يتم ربط تسجيل الدخول الإنتاجي.",
  resultHeading: "Business DNA الخاص بك في Chameleon جاهز.",
  openTerminalCta: "فتح Chameleon Terminal",
  editDnaCta: "تعديل Business DNA",
  questions: [
    {
      id: "role",
      text: "ما هو دورك؟",
      options: [
        { label: "صاحب شركة / مؤسس", tags: ["founder"] },
        { label: "مدير عام / تنفيذي", tags: ["executive"] },
        { label: "مدير عمليات", tags: ["operations_lead"] },
        { label: "مدير موارد بشرية", tags: ["hr_lead"] },
        { label: "قائد تسويق / مبيعات", tags: ["marketing_lead"] },
        { label: "مستشار", tags: ["consultant"] },
        { label: "مستثمر / عضو مجلس", tags: ["investor"] },
        { label: "مطور / باني منتج", tags: ["api_builder"] },
        { label: "أخرى", tags: [] },
      ],
    },
    {
      id: "businessType",
      text: "ما نوع نشاطك؟",
      options: [
        { label: "خدمات", tags: ["services"] },
        { label: "تجزئة / فروع", tags: ["retail"] },
        { label: "ضيافة", tags: ["hospitality"] },
        { label: "عقارات", tags: ["real_estate"] },
        { label: "توظيف / موارد بشرية", tags: ["recruitment"] },
        { label: "SaaS / سوق إلكتروني", tags: ["saas_marketplace"] },
        { label: "منتج AI / منصة رقمية", tags: ["digital_platform"] },
        { label: "أمن / عمليات", tags: ["security_ops"] },
        { label: "استثمار / صفقات", tags: ["investment"] },
        { label: "أخرى", tags: [] },
      ],
    },
    {
      id: "mainGoal",
      text: "ما هدفك الرئيسي؟",
      options: [
        { label: "اكتشاف مشاكل الأعمال الخفية", tags: ["risk_watch"] },
        { label: "تقليل الهدر المالي", tags: ["cash_waste"] },
        { label: "تحسين أداء الفريق", tags: ["team_effectiveness"] },
        { label: "فهم سلوك العملاء/المستخدمين", tags: ["customer_journey"] },
        { label: "تحسين نتائج التسويق", tags: ["marketing_intel"] },
        { label: "إنشاء تقارير تنفيذية", tags: ["executive_summary"] },
        { label: "إضافة AI/API داخل منتجي", tags: ["api_builder"] },
        { label: "تحليل ملفات خاصة محلياً", tags: ["local_private_mode"] },
        { label: "الاستعداد لمراجعة أو تدقيق", tags: ["audit_ready"] },
      ],
    },
    {
      id: "biggestConcern",
      text: "ما أكبر قلق لديك؟",
      options: [
        { label: "أنفق مالاً دون رؤية العائد", tags: ["cash_waste"] },
        { label: "الفريق مشغول لكن النتائج غير واضحة", tags: ["team_effectiveness"] },
        { label: "العملاء لا يكملون الإجراءات", tags: ["customer_journey"] },
        { label: "مشاكل في الأنظمة أكتشفها متأخراً", tags: ["operational_risk"] },
        { label: "لا أثق بجودة التقارير", tags: ["report_quality"] },
        { label: "أحتاج رؤية أوضح قبل القرار", tags: ["decision_support"] },
        { label: "أحتاج تحليلاً سرياً", tags: ["confidential_documents"] },
        { label: "أريد AI داخل منتجي", tags: ["api_builder"] },
      ],
    },
    {
      id: "decisionStyle",
      text: "كيف تتخذ قراراتك؟",
      options: [
        { label: "تقارير وأرقام", tags: ["data_driven"] },
        { label: "ملاحظات الفريق", tags: ["collaborative"] },
        { label: "خبرة شخصية", tags: ["experiential"] },
        { label: "سلوك العملاء", tags: ["customer_journey"] },
        { label: "نتائج مالية", tags: ["cash_waste"] },
        { label: "مشاكل عاجلة", tags: ["fast_decisive"] },
        { label: "غالباً لا تتوفر معلومات كافية", tags: ["missing_facts"] },
      ],
    },
    {
      id: "outputPreference",
      text: "ما شكل المخرجات المفضل؟",
      options: [
        { label: "إجابة مباشرة قصيرة", tags: ["quick_score"] },
        { label: "تقرير مفصل", tags: ["detailed_report"] },
        { label: "خريطة مخاطر", tags: ["risk_watch"] },
        { label: "خطة عمل خطوة بخطوة", tags: ["action_plan"] },
        { label: "ملخص تنفيذي", tags: ["executive_summary"] },
        { label: "جدول / درجة / قائمة", tags: ["quick_score"] },
        { label: "مذكرة قرار بالخيارات", tags: ["decision_memo"] },
      ],
    },
    {
      id: "communicationTone",
      text: "أسلوب التواصل المفضل؟",
      options: [
        { label: "مباشر وحازم", tags: ["direct"] },
        { label: "مهني ومتوازن", tags: ["professional"] },
        { label: "بسيط وسهل", tags: ["simple"] },
        { label: "تنفيذي", tags: ["executive_summary"] },
        { label: "استشاري", tags: ["consultant"] },
        { label: "تحليل عميق", tags: ["detailed_report"] },
        { label: "تحذيري عند ارتفاع المخاطر", tags: ["risk_watch"] },
      ],
    },
    {
      id: "hiddenCostConcern",
      text: "أين قد يختبئ الهدر؟",
      options: [
        { label: "إنفاق تسويقي", tags: ["marketing_intel", "cash_waste"] },
        { label: "وقت الموظفين", tags: ["team_effectiveness"] },
        { label: "ضعف تحويل العملاء", tags: ["customer_journey"] },
        { label: "أخطاء تشغيلية متكررة", tags: ["operational_risk"] },
        { label: "أنظمة أو برمجيات ضعيفة", tags: ["operational_risk"] },
        { label: "قرارات من تقارير غير واضحة", tags: ["decision_support"] },
        { label: "فرص مبيعات ضائعة", tags: ["customer_journey"] },
        { label: "تفاوت بين الفروع", tags: ["operational_risk"] },
      ],
    },
    {
      id: "earlyWarningTarget",
      text: "ما الذي يجب مراقبته مبكراً؟",
      options: [
        { label: "الهدر المالي", tags: ["cash_waste"] },
        { label: "ضعف أداء الفريق", tags: ["team_effectiveness"] },
        { label: "مشاكل رحلة العميل", tags: ["customer_journey"] },
        { label: "فشل تسويقي", tags: ["marketing_intel"] },
        { label: "مخاطر تشغيلية", tags: ["operational_risk"] },
        { label: "أنماط أمن/حوادث مصرح بها", tags: ["risk_watch"] },
        { label: "فرص أعمال ضعيفة", tags: ["decision_support"] },
        { label: "احتكاك في النظام أو المنتج", tags: ["api_builder"] },
      ],
    },
    {
      id: "expectedDataTypes",
      text: "ما البيانات التي ستستخدمها؟",
      options: [
        { label: "تقارير أعمال", tags: ["reports"] },
        { label: "Excel / جداول", tags: ["financial_data"] },
        { label: "PDF / مستندات", tags: ["confidential_documents"] },
        { label: "نتائج تسويق", tags: ["marketing_intel"] },
        { label: "بيانات HR/فريق مصرح بها", tags: ["team_effectiveness"] },
        { label: "سلوك الموقع/التطبيق", tags: ["customer_journey"] },
        { label: "CRM / مبيعات", tags: ["sales_data"] },
        { label: "سجلات تشغيلية", tags: ["operational_risk"] },
        { label: "غير متأكد بعد", tags: ["missing_facts"] },
      ],
    },
    {
      id: "sensitivityLevel",
      text: "ما مستوى الحساسية؟",
      options: [
        { label: "معلومات أعمال عادية", tags: ["low_sensitivity"] },
        { label: "مستندات سرية للشركة", tags: ["confidential_documents"] },
        { label: "معلومات مالية/استثمارية", tags: ["highly_sensitive"] },
        { label: "معلومات HR/فريق", tags: ["hr_data"] },
        { label: "معلومات عملاء", tags: ["customer_data"] },
        { label: "معلومات أمن/عمليات", tags: ["security_ops"] },
        { label: "حساسة للغاية — وضع محلي/خاص", tags: ["local_private_mode"] },
      ],
    },
    {
      id: "privacyMode",
      text: "وضع الخصوصية الافتراضي؟",
      options: [
        { label: "سحابة AI للبيانات المصرح بها", tags: ["cloud_first"] },
        { label: "محلي أولاً، سحابة بموافقة", tags: ["local_private_mode"] },
        { label: "الملفات تبقى على جهازي", tags: ["device_only"] },
        { label: "أحتاج مساعدة لاختيار الأكثر أماناً", tags: ["hybrid_mode"] },
      ],
    },
  ],
};

export function getDnaConfig(locale: "en" | "ar") {
  return locale === "ar" ? DNA_AR : DNA_EN;
}

export function buildBusinessDnaRecord(
  config: DnaLocaleConfig,
  answers: Record<string, number>,
  userId: string,
): BusinessDnaRecord {
  const pick = (qid: string) => {
    const q = config.questions.find((item) => item.id === qid)!;
    const idx = answers[qid] ?? 0;
    return q.options[idx];
  };

  const fields = {
    role: pick("role").label,
    businessType: pick("businessType").label,
    mainGoal: pick("mainGoal").label,
    biggestConcern: pick("biggestConcern").label,
    decisionStyle: pick("decisionStyle").label,
    outputPreference: pick("outputPreference").label,
    communicationTone: pick("communicationTone").label,
    hiddenCostConcern: pick("hiddenCostConcern").label,
    earlyWarningTarget: pick("earlyWarningTarget").label,
    expectedDataTypes: pick("expectedDataTypes").label,
    sensitivityLevel: pick("sensitivityLevel").label,
    privacyMode: pick("privacyMode").label,
  };

  const tagSet = new Set<string>();
  for (const q of config.questions) {
    const opt = q.options[answers[q.id] ?? 0];
    opt.tags.forEach((t) => tagSet.add(t));
  }
  const intelligenceTags = Array.from(tagSet);

  const now = new Date().toISOString();
  const profileSummary =
    config.locale === "ar"
      ? `${fields.role} في ${fields.businessType}. الهدف: ${fields.mainGoal}. القلق: ${fields.biggestConcern}.`
      : `${fields.role} in ${fields.businessType}. Goal: ${fields.mainGoal}. Concern: ${fields.biggestConcern}.`;

  const aiInstruction =
    config.locale === "ar"
      ? `عند الإجابة لهذا المستخدم، كن ${fields.communicationTone} وعملياً. ركّز على ${fields.mainGoal} و${fields.biggestConcern}. فضّل ${fields.outputPreference} مع مستوى مخاطر، حقائق ناقصة، أثر أعمال، وخطة عمل. احترم وضع الخصوصية: ${fields.privacyMode}. لا تطلب بيانات حساسة دون موافقة.`
      : `When answering this user, be ${fields.communicationTone}, executive, and practical. Focus on ${fields.mainGoal} and ${fields.biggestConcern}. Prefer ${fields.outputPreference} with risk level, missing facts, business impact, and action plan. Respect privacy mode: ${fields.privacyMode}. Do not request sensitive uploads without approval.`;

  return {
    userId,
    ...fields,
    intelligenceTags,
    profileSummary,
    aiInstruction,
    createdAt: now,
    updatedAt: now,
  };
}
