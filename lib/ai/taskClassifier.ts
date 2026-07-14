// lib/ai/taskClassifier.ts
// Server-side only. Never import this from client components.

export type TaskType =
  | "general_business"
  | "deep_strategy"
  | "finance_accounting"
  | "legal_compliance_safe"
  | "coding_api_product"
  | "architecture_engineering"
  | "document_analysis"
  | "vision_image_analysis"
  | "marketing_sales"
  | "hr_team"
  | "risk_review"
  | "arabic_executive"
  | "fast_answer"
  | "fallback_safe"
  | "onboarding_intro";

export function classifyTask(
  message: string,
  mode: string,
  locale: string,
  hasImageAttachment = false,
  hasDocAttachment = false,
): TaskType {
  const lower = message.toLowerCase().trim();

  // Onboarding / capability questions
  const onboardingPhrases = [
    "what can you do",
    "what can u do",
    "what do you do",
    "how can you help",
    "what are you",
    "what is chameleon",
    "tell me about yourself",
    "introduce yourself",
    "show me what you can do",
    "what features",
    "what capabilities",
    "ما الذي تستطيع",
    "تقدر تعمل ايه",
    "تقدر تعمل إيه",
    "انت بتعمل ايه",
    "أنت بتعمل إيه",
    "ماذا تستطيع",
    "كيف يمكنك مساعدتي",
    "ايه اللي تقدر تعمله",
    "ماذا يمكنك فعله",
  ];
  if (onboardingPhrases.some((p) => lower.includes(p))) return "onboarding_intro";

  // Model / provider reveal attempts — handled gracefully by system prompt
  const modelPhrases = [
    "what model",
    "which model",
    "what ai",
    "which ai",
    "are you claude",
    "are you gpt",
    "are you gemini",
    "what provider",
    "openrouter",
    "powered by",
    "who made you",
    "who built you",
  ];
  if (modelPhrases.some((p) => lower.includes(p))) return "fast_answer";

  // Attachment routing (takes priority over keywords)
  if (hasImageAttachment) return "vision_image_analysis";
  if (hasDocAttachment) return "document_analysis";

  // Mode chip overrides
  const modeMap: Record<string, TaskType> = {
    operational_risk: "risk_review",
    deep_review: "deep_strategy",
    team_effectiveness: "hr_team",
    marketing: "marketing_sales",
    customer_journey: "marketing_sales",
    decision_memo: "deep_strategy",
    api_workflow: "coding_api_product",
    private_mode: "general_business",
  };
  if (mode === "cash_waste") {
    return /invoice|accounting|balance sheet|profit|loss|cash flow|tax|budget|revenue|expense/i.test(lower)
      ? "finance_accounting"
      : "risk_review";
  }
  if (mode in modeMap) return modeMap[mode];

  // Keyword classification
  if (/invoice|accounting|balance sheet|profit|loss|cash flow|tax|budget|revenue|expense|financial exposure|محاسب|فاتور|ميزان|ربح|خسار|ضريب|ميزانية|إيراد|مصروف|تكلفة مالية/.test(lower))
    return "finance_accounting";

  if (/architecture|building|layout|villa|floor plan|construction|design plan|materials|structural|تصميم معماري|مخطط|بناء|معمار|مواد|انشاء|مبنى/.test(lower))
    return "architecture_engineering";

  if (/\bcode\b|api|bug|backend|frontend|database|next\.js|supabase|vercel|react|typescript|debug|endpoint|webhook|كود|برمج|واجهة برمج|تطبيق/.test(lower))
    return "coding_api_product";

  if (/marketing|ads|social media|funnel|conversion|campaign|leads|brand positioning|impressions|click|audience|تسويق|إعلان|سوشيال|تحويل|حملة|محتوى|عملاء محتملون|جمهور/.test(lower))
    return "marketing_sales";

  if (/\bteam\b|employee|hr|hiring|manager|staff|productivity|performance review|retention|onboard|فريق|موظف|توظيف|مدير|أداء|إنتاجية|احتفاظ/.test(lower))
    return "hr_team";

  if (/contract|compliance|legal|policy|regulation|terms|liability|عقد|التزام|قانون|سياسة|تنظيم|مسؤولية/.test(lower))
    return "legal_compliance_safe";

  if (/strategy|restructur|market position|investor deck|board level|competitive|pivot|استراتيج|هيكل|مستثمر|مجلس|منافسة|تمحور/.test(lower))
    return "deep_strategy";

  if (/risk|audit|failure|hidden problem|danger|weak point|incident|مخاطر|تدقيق|فشل|خطر|مشكلة خفية/.test(lower))
    return "risk_review";

  // Greetings and very short messages
  const words = lower.split(/\s+/).filter(Boolean);
  if (words.length <= 3) return "fast_answer";

  // Arabic locale without stronger category → arabic_executive
  if (locale === "ar") return "arabic_executive";

  return "general_business";
}
