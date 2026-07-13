export type RiskReviewOption = {
  value: string;
  labelEn: string;
  labelAr: string;
};

export type RiskReviewQuestionDef = {
  id:
    | "focusArea"
    | "seriousness"
    | "pattern"
    | "impact"
    | "affectedGroup"
    | "evidence"
    | "financialExposure"
    | "urgency"
    | "requestedOutput"
    | "privacyLevel"
    | "followUp"
    | "outputFormat";
  textEn: string;
  textAr: string;
  options: RiskReviewOption[];
};

export const RISK_REVIEW_QUESTIONS: RiskReviewQuestionDef[] = [
  {
    id: "focusArea",
    textEn: "Which area do you want to review?",
    textAr: "أي مجال تريد مراجعته؟",
    options: [
      { value: "cash_waste", labelEn: "Cash waste", labelAr: "الهدر المالي" },
      { value: "operations", labelEn: "Operations", labelAr: "العمليات" },
      { value: "customer_journey", labelEn: "Customer journey", labelAr: "رحلة العميل" },
      { value: "team_effectiveness", labelEn: "Team effectiveness", labelAr: "فعالية الفريق" },
      { value: "marketing", labelEn: "Marketing performance", labelAr: "أداء التسويق" },
      { value: "api_product", labelEn: "API / product workflow", labelAr: "API / سير عمل المنتج" },
      {
        value: "private_data",
        labelEn: "Private files / data sensitivity",
        labelAr: "الملفات الخاصة / حساسية البيانات",
      },
      {
        value: "security_incident",
        labelEn: "Security or incident patterns where authorized",
        labelAr: "أنماط أمنية أو حوادث ضمن الصلاحيات",
      },
      { value: "business_decision", labelEn: "Business decision", labelAr: "قرار أعمال" },
      { value: "other", labelEn: "Other", labelAr: "أخرى" },
    ],
  },
  {
    id: "seriousness",
    textEn: "How serious does this risk feel now?",
    textAr: "ما مدى خطورة هذا الخطر الآن؟",
    options: [
      { value: "low", labelEn: "Low", labelAr: "منخفض" },
      { value: "medium", labelEn: "Medium", labelAr: "متوسط" },
      { value: "high", labelEn: "High", labelAr: "مرتفع" },
      { value: "critical", labelEn: "Critical", labelAr: "حرج" },
      { value: "not_sure", labelEn: "Not sure", labelAr: "لست متأكداً" },
    ],
  },
  {
    id: "pattern",
    textEn: "Is this risk happening once or repeatedly?",
    textAr: "هل يحدث هذا الخطر مرة واحدة أم بشكل متكرر؟",
    options: [
      { value: "one_time", labelEn: "One-time issue", labelAr: "مشكلة مرة واحدة" },
      { value: "repeated", labelEn: "Repeated pattern", labelAr: "نمط متكرر" },
      { value: "increasing", labelEn: "Happening more often recently", labelAr: "يحدث أكثر مؤخراً" },
      { value: "unknown", labelEn: "I do not know yet", labelAr: "لا أعرف بعد" },
    ],
  },
  {
    id: "impact",
    textEn: "What is the main business impact?",
    textAr: "ما التأثير الرئيسي على الأعمال؟",
    options: [
      { value: "money_loss", labelEn: "Money loss", labelAr: "خسارة مالية" },
      { value: "time_loss", labelEn: "Time loss", labelAr: "ضياع وقت" },
      { value: "customer_loss", labelEn: "Customer/user loss", labelAr: "فقدان عملاء أو مستخدمين" },
      { value: "team_confusion", labelEn: "Team confusion", labelAr: "ارتباك الفريق" },
      { value: "reputation", labelEn: "Reputation risk", labelAr: "خطر على السمعة" },
      {
        value: "compliance",
        labelEn: "Compliance/internal policy risk",
        labelAr: "خطر متعلق بالسياسات أو الالتزام الداخلي",
      },
      { value: "delayed_decision", labelEn: "Delayed decision", labelAr: "تأخير القرار" },
      { value: "poor_reporting", labelEn: "Poor reporting quality", labelAr: "ضعف جودة التقارير" },
    ],
  },
  {
    id: "affectedGroup",
    textEn: "Who is most affected?",
    textAr: "من الأكثر تأثراً؟",
    options: [
      { value: "owner_ceo", labelEn: "Owner / CEO", labelAr: "المالك / المدير التنفيذي" },
      { value: "operations_team", labelEn: "Operations team", labelAr: "فريق العمليات" },
      { value: "sales_marketing", labelEn: "Sales / marketing", labelAr: "المبيعات / التسويق" },
      { value: "hr_team", labelEn: "HR / team", labelAr: "الموارد البشرية / الفريق" },
      { value: "customers_users", labelEn: "Customers / users", labelAr: "العملاء / المستخدمون" },
      { value: "investors_partners", labelEn: "Investors / partners", labelAr: "المستثمرون / الشركاء" },
      { value: "product_tech", labelEn: "Product / tech team", labelAr: "فريق المنتج / التقنية" },
      { value: "multiple_teams", labelEn: "Multiple teams", labelAr: "عدة فرق" },
    ],
  },
  {
    id: "evidence",
    textEn: "What evidence do you currently have?",
    textAr: "ما الأدلة المتوفرة لديك حالياً؟",
    options: [
      { value: "numbers_reports", labelEn: "Numbers / reports", labelAr: "أرقام / تقارير" },
      {
        value: "complaints",
        labelEn: "Customer/user complaints",
        labelAr: "شكاوى العملاء أو المستخدمين",
      },
      { value: "team_feedback", labelEn: "Team feedback", labelAr: "ملاحظات الفريق" },
      { value: "delays", labelEn: "Repeated delays", labelAr: "تأخيرات متكررة" },
      { value: "lost_sales", labelEn: "Lost sales/leads", labelAr: "مبيعات أو فرص ضائعة" },
      { value: "system_logs", labelEn: "System logs", labelAr: "سجلات النظام" },
      { value: "personal_observation", labelEn: "Personal observation", labelAr: "ملاحظة شخصية" },
      { value: "no_evidence", labelEn: "No clear evidence yet", labelAr: "لا توجد أدلة واضحة بعد" },
    ],
  },
  {
    id: "financialExposure",
    textEn: "What is the financial exposure?",
    textAr: "ما حجم التعرض المالي؟",
    options: [
      { value: "small", labelEn: "Small", labelAr: "صغير" },
      { value: "medium", labelEn: "Medium", labelAr: "متوسط" },
      { value: "large", labelEn: "Large", labelAr: "كبير" },
      { value: "unknown", labelEn: "Unknown", labelAr: "غير معروف" },
      { value: "not_financial", labelEn: "Not financial", labelAr: "غير مالي" },
    ],
  },
  {
    id: "urgency",
    textEn: "How urgent is the decision?",
    textAr: "ما مدى إلحاح القرار؟",
    options: [
      { value: "today", labelEn: "Today", labelAr: "اليوم" },
      { value: "this_week", labelEn: "This week", labelAr: "هذا الأسبوع" },
      { value: "this_month", labelEn: "This month", labelAr: "هذا الشهر" },
      { value: "monitor_only", labelEn: "Monitor only", labelAr: "متابعة فقط" },
      { value: "not_sure", labelEn: "Not sure", labelAr: "لست متأكداً" },
    ],
  },
  {
    id: "requestedOutput",
    textEn: "What do you need from Chameleon?",
    textAr: "ماذا تحتاج من Chameleon؟",
    options: [
      { value: "risk_map", labelEn: "Risk map", labelAr: "خريطة مخاطر" },
      { value: "missing_facts", labelEn: "Missing facts list", labelAr: "قائمة المعلومات الناقصة" },
      { value: "executive_summary", labelEn: "Executive summary", labelAr: "ملخص تنفيذي" },
      { value: "action_plan", labelEn: "Action plan", labelAr: "خطة عمل" },
      { value: "decision_memo", labelEn: "Decision memo", labelAr: "مذكرة قرار" },
      { value: "followup_schedule", labelEn: "Follow-up schedule", labelAr: "جدولة متابعة" },
      { value: "team_questions", labelEn: "Questions to ask my team", labelAr: "أسئلة أطرحها على الفريق" },
      { value: "management_report", labelEn: "Report for management", labelAr: "تقرير للإدارة" },
    ],
  },
  {
    id: "privacyLevel",
    textEn: "What privacy level applies?",
    textAr: "ما مستوى الخصوصية المطبق؟",
    options: [
      { value: "normal", labelEn: "Normal business information", labelAr: "معلومات أعمال عادية" },
      { value: "confidential", labelEn: "Confidential company data", labelAr: "بيانات شركة سرية" },
      { value: "hr_info", labelEn: "HR/team information", labelAr: "معلومات موارد بشرية / فريق" },
      { value: "customer_info", labelEn: "Customer/client information", labelAr: "معلومات عملاء" },
      {
        value: "financial_info",
        labelEn: "Financial/investor information",
        labelAr: "معلومات مالية / مستثمرين",
      },
      {
        value: "local_private",
        labelEn: "Local/private mode preferred",
        labelAr: "الوضع المحلي/الخاص مفضل",
      },
      { value: "not_sure", labelEn: "I am not sure", labelAr: "لست متأكداً" },
    ],
  },
  {
    id: "followUp",
    textEn: "Should this risk be followed up later?",
    textAr: "هل يجب متابعة هذا الخطر لاحقاً؟",
    options: [
      { value: "none", labelEn: "No follow-up", labelAr: "لا توجد متابعة" },
      { value: "tomorrow", labelEn: "Tomorrow", labelAr: "غداً" },
      { value: "next_week", labelEn: "Next week", labelAr: "الأسبوع القادم" },
      { value: "next_month", labelEn: "Next month", labelAr: "الشهر القادم" },
      { value: "custom_later", labelEn: "Custom later", labelAr: "لاحقاً بشكل مخصص" },
    ],
  },
  {
    id: "outputFormat",
    textEn: "What output format do you prefer?",
    textAr: "ما صيغة المخرجات المفضلة؟",
    options: [
      { value: "short_summary", labelEn: "Short risk summary", labelAr: "ملخص مخاطر قصير" },
      { value: "full_review", labelEn: "Full risk review", labelAr: "مراجعة مخاطر كاملة" },
      { value: "table", labelEn: "Table", labelAr: "جدول" },
      { value: "risk_score", labelEn: "Risk score", labelAr: "درجة مخاطر" },
      { value: "executive_memo", labelEn: "Executive memo", labelAr: "مذكرة تنفيذية" },
      { value: "action_checklist", labelEn: "Action checklist", labelAr: "قائمة إجراءات" },
    ],
  },
];

export function riskReviewOptionLabel(
  questionId: RiskReviewQuestionDef["id"],
  value: string,
  locale: "en" | "ar",
): string {
  const question = RISK_REVIEW_QUESTIONS.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.value === value);
  if (!option) return value;
  return locale === "ar" ? option.labelAr : option.labelEn;
}
