"use client";

type ChameleonWelcomeProps = {
  locale: "en" | "ar";
  onSend?: (text: string) => void;
};

const CAPABILITIES_EN = [
  {
    title: "Quick Business Scan",
    description: "Ask any business question and get hidden signals, missing facts, and recommended action.",
    chip: "Scan my business for hidden risks",
  },
  {
    title: "Risk Review",
    description: "Answer guided questions and generate a scored risk map with follow-up priorities.",
    chip: "Create a risk review",
  },
  {
    title: "Cash Waste Detection",
    description: "Find where money is leaking: marketing spend, operations, team time, subscriptions, poor conversion.",
    chip: "Find where I am wasting money",
  },
  {
    title: "Document & File Analysis",
    description: "Upload reports, PDFs, Excel, contracts, invoices, or screenshots. Extract risks, missing facts, and executive notes.",
    chip: "Analyze this document",
  },
  {
    title: "Marketing Intelligence",
    description: "Review campaigns, funnels, ads, customer journey, and conversion problems.",
    chip: "Review my marketing performance",
  },
  {
    title: "Finance & Accounting Review",
    description: "Understand cash flow, expenses, invoices, profit/loss, budgeting, and financial exposure.",
    chip: "Review my finances",
  },
  {
    title: "Team & Operations Review",
    description: "Analyze bottlenecks, unclear roles, repeated delays, and operational weak points.",
    chip: "Review my team performance",
  },
  {
    title: "Product, API & Technical Review",
    description: "Review product flows, API plans, bugs, dashboards, user journeys, and technical risk.",
    chip: "Review my product or API",
  },
  {
    title: "Architecture / Project Review",
    description: "Review project ideas, layouts, construction risk, design notes, and uploaded plans or images.",
    chip: "Review a project or design",
  },
  {
    title: "Executive Reports",
    description: "Turn answers into reports, decisions, archives, and management-ready summaries.",
    chip: "Prepare an executive report",
  },
];

const CAPABILITIES_AR = [
  {
    title: "فحص سريع للأعمال",
    description: "اسأل أي سؤال عن شركتك وسأعطيك إجابة مباشرة، إشارات خفية، معلومات ناقصة، وخطوة مقترحة.",
    chip: "افحص شركتي من المخاطر الخفية",
  },
  {
    title: "مراجعة مخاطر",
    description: "أقودك من خلال أسئلة منظمة، أحدد مستوى الخطر، وأسجل النتيجة للمتابعة.",
    chip: "أنشئ مراجعة مخاطر",
  },
  {
    title: "كشف الهدر المالي",
    description: "اكتشف أين تضيع الأموال: التسويق، التشغيل، وقت الفريق، الاشتراكات، ضعف التحويل.",
    chip: "اكتشف أين أضيع الأموال",
  },
  {
    title: "تحليل الملفات والمستندات",
    description: "ارفع تقارير، PDF، Excel، عقود، فواتير، أو صور. استخرج المخاطر، النواقص، والملاحظات التنفيذية.",
    chip: "حلل هذا الملف",
  },
  {
    title: "ذكاء التسويق",
    description: "راجع الحملات، السوشيال ميديا، رحلة العميل، الإعلانات، والقنوات.",
    chip: "راجع أداء التسويق",
  },
  {
    title: "مراجعة مالية ومحاسبية",
    description: "فهم التدفقات النقدية، المصروفات، الفواتير، الربح والخسارة، والتعرض المالي.",
    chip: "راجع وضعي المالي",
  },
  {
    title: "مراجعة الفريق والعمليات",
    description: "حلل الاختناقات، ضعف توزيع الأدوار، التأخيرات، ونقاط الضعف التشغيلية.",
    chip: "راجع أداء الفريق",
  },
  {
    title: "مراجعة المنتج و API والتقنية",
    description: "راجع تدفقات المنتج، خطط API، الأخطاء، الداشبورد، ورحلة المستخدم.",
    chip: "راجع المنتج أو API",
  },
  {
    title: "مراجعة مشاريع وتصميمات",
    description: "راجع أفكار المشاريع، المخططات، مخاطر التنفيذ، والصور المرفوعة.",
    chip: "راجع مشروع أو تصميم",
  },
  {
    title: "تقارير تنفيذية",
    description: "حول الإجابات إلى تقارير، قرارات، أرشيف، وملخصات جاهزة للإدارة.",
    chip: "جهّز تقرير تنفيذي",
  },
];

const SUGGESTION_CHIPS_EN = [
  "What can you do for me?",
  "Scan my business for hidden risks",
  "Find where I am wasting money",
  "Review my marketing performance",
  "Create a risk review",
  "Analyze this document",
  "Prepare an executive report",
  "Review my team performance",
  "Help me make a decision",
];

const SUGGESTION_CHIPS_AR = [
  "تقدر تعمل لي إيه؟",
  "افحص شركتي من المخاطر الخفية",
  "اكتشف أين أضيع الأموال",
  "راجع أداء التسويق",
  "أنشئ مراجعة مخاطر",
  "حلل هذا الملف",
  "جهّز تقرير تنفيذي",
  "راجع أداء الفريق",
  "ساعدني في اتخاذ قرار",
];

export function ChameleonWelcome({ locale, onSend }: ChameleonWelcomeProps) {
  const isArabic = locale === "ar";
  const capabilities = isArabic ? CAPABILITIES_AR : CAPABILITIES_EN;
  const chips = isArabic ? SUGGESTION_CHIPS_AR : SUGGESTION_CHIPS_EN;

  return (
    <div className="mx-auto w-full max-w-[780px] px-4 py-6">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald/40 bg-emerald/10">
          <div className="h-3.5 w-3.5 rounded-full bg-emerald shadow-[0_0_20px_rgba(31,174,130,0.7)]" />
          <div className="absolute inset-0 animate-pulse rounded-full border border-emerald/20" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald">
          Chameleon Eye AI
        </p>
        <h2 className="mt-2 text-xl font-semibold text-foreground">
          {isArabic ? "اسأل شركتك ماذا تخفي" : "Ask your business what it is hiding."}
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
          {isArabic
            ? "Terminal ذكاء أعمال خاص لمخاطر الأعمال، الهدر المالي، التسويق، العمليات، الملفات، القرارات، والتقارير التنفيذية."
            : "Your private intelligence workspace for business risk, cash waste, marketing, operations, documents, decisions, and executive reports."}
        </p>
      </div>

      {/* Suggestion chips */}
      <div className="mb-6 flex flex-wrap gap-2" dir={isArabic ? "rtl" : "ltr"}>
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSend?.(chip)}
            className="rounded-full border border-white/10 bg-panel2/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-emerald/30 hover:text-foreground active:scale-95"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Capability grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {capabilities.map((cap) => (
          <button
            key={cap.title}
            type="button"
            onClick={() => onSend?.(cap.chip)}
            className="group rounded-xl border border-white/8 bg-panel2/40 p-4 text-start transition-all hover:border-emerald/25 hover:bg-panel2/70 active:scale-[0.98]"
          >
            <p className="text-sm font-medium text-foreground group-hover:text-emerald">
              {cap.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted">{cap.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
