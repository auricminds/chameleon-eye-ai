export const AR_PRIVACY_SENTENCE =
  "إذا بقي الملف على جهازك، فإن Chameleon Eye AI لا تستطيع رؤيته. أنت من يقرر ما تتم مشاركته.";

export const AR_TRUST_SENTENCE =
  "تعمل Chameleon Eye AI فقط مع البيانات والملفات والأنظمة التي يملك العميل صلاحية استخدامها أو تحليلها. الملفات التي تبقى على جهازك في الوضع المحلي الخاص لا تستطيع Chameleon Eye AI رؤيتها، وأنت من يقرر ما تتم مشاركته.";

export const AR_SECURITY_SENTENCE =
  "لا يجب أبداً تخزين مفاتيح API الرئيسية داخل تطبيقات سطح المكتب أو الموبايل.";

export const AR_HERO_PROMPTS = [
  {
    label: "اكتشف الهدر المالي الخفي",
    preview: {
      riskLevel: "متوسط",
      signals: [
        "نمط تأخير متكرر",
        "ضعف في تسليم المهام",
        "عدم وضوح المسؤولية",
      ],
      nextAction: "راجع نقطة الاختناق في العملية قبل التوسع.",
    },
  },
  {
    label: "راجع هذا التقرير",
    preview: {
      riskLevel: "متوسط",
      signals: [
        "تفاصيل ملكية ناقصة",
        "بيانات زمنية غير متسقة",
        "مسار تصعيد غير واضح",
      ],
      nextAction: "اطلب الحقائق الناقصة قبل المراجعة التنفيذية.",
    },
  },
  {
    label: "حلّل فعالية الفريق",
    preview: {
      riskLevel: "متوسط",
      signals: [
        "نمط تأخير متكرر",
        "ضعف في تسليم المهام",
        "عدم وضوح المسؤولية",
      ],
      nextAction: "راجع نقطة الاختناق في العملية قبل التوسع.",
    },
  },
  {
    label: "اكتشف ضعف رحلة العميل",
    preview: {
      riskLevel: "مرتفع",
      signals: [
        "ارتفاع معدل ترك النماذج",
        "بطء في الخطوة الثالثة",
        "إرشادات الخطوة التالية غير واضحة",
      ],
      nextAction: "بسّط مسار التسجيل وأضف إرشادات التقدم.",
    },
  },
  {
    label: "أنشئ تقريراً تنفيذياً",
    preview: {
      riskLevel: "منخفض",
      signals: [
        "مؤشرات أساسية مستقرة",
        "فجوات تقارير بسيطة",
        "خيارات قرار واضحة",
      ],
      nextAction: "انشر ملخصاً تنفيذياً مع الإجراءات الموصى بها.",
    },
  },
  {
    label: "افحص المخاطر التشغيلية",
    preview: {
      riskLevel: "مرتفع",
      signals: [
        "تأخيرات خدمة متكررة",
        "اعتماد على حلول يدوية",
        "نقطة فشل واحدة في العملية",
      ],
      nextAction: "عيّن مسؤولاً وأصلح الاختناق المتكرر هذا الأسبوع.",
    },
  },
] as const;

export const AR_PRICING_PLANS = [
  {
    name: "Private Starter",
    price: "$10/mo",
    description: "للأفراد والفرق الصغيرة التي تختبر الذكاء الخاص.",
    features: [
      "مساحة عمل خاصة",
      "تقارير أساسية",
      "عدد محدود من التحليلات الشهرية",
      "معاينة للوضع المحلي/الخاص",
      "دعم عادي",
    ],
    cta: "ابدأ Starter",
    href: "/ar/signup",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$50/mo",
    description: "للشركات التي تستخدم Chameleon Eye AI بشكل منتظم.",
    features: [
      "تحليلات أكثر",
      "قوالب تقارير",
      "سير عمل للفرق",
      "بداية وصول AI + API",
      "معاينة أحداث Pulse",
      "دعم أولوية",
    ],
    cta: "اختر Business",
    href: "/ar/signup",
    highlighted: true,
  },
  {
    name: "API Business",
    price: "$99/mo",
    description: "للمنصات التي تريد دمج Chameleon Eye داخل منتجاتها.",
    features: [
      "سير عمل API",
      "مخرجات منظمة",
      "لوحة استخدام",
      "حدود استخدام",
      "مسودات آمنة",
      "بداية سير عمل مخصص",
    ],
    cta: "اطلب خطة API",
    href: "/ar/contact",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "From $399/mo",
    description: "لأنظمة الذكاء الخاصة بالشركات.",
    features: [
      "سير عمل مخصص",
      "إعداد خاص",
      "Desktop Connector",
      "تقارير متقدمة",
      "دعم مخصص",
      "خيار نشر خاص",
    ],
    cta: "اطلب Enterprise",
    href: "/ar/contact",
    highlighted: false,
  },
] as const;

export const AR_CONTACT_NEED_OPTIONS = [
  "مساحة عمل AI خاصة",
  "تكامل API",
  "Desktop Connector",
  "الوضع المحلي / الخاص",
  "إعداد Enterprise",
  "سير عمل مخصص",
  "أخرى",
] as const;

export const AR_API_ENDPOINTS = [
  "POST /v1/guidance/profile-check",
  "POST /v1/readiness/listing",
  "POST /v1/risk/check",
  "POST /v1/decision/memo",
  "POST /v1/pulse/events",
  "POST /v1/scoring/business-readiness",
  "POST /v1/workflows/{client}/{workflow}",
] as const;

export const AR_API_WORKFLOW_CARDS = [
  {
    name: "Guidance API",
    description: "إرشاد المستخدم داخل النماذج والملفات والرحلات.",
  },
  {
    name: "Readiness API",
    description: "تقييم جاهزية ملف أو إعلان أو طلب قبل النشر.",
  },
  {
    name: "Risk Check API",
    description: "كشف العبارات الخطرة أو الحقائق الناقصة.",
  },
  {
    name: "Draft API",
    description: "إنشاء مسودات آمنة قابلة للمراجعة.",
  },
  {
    name: "Decision Memo API",
    description: "تحويل البيانات إلى مذكرة قرار.",
  },
  {
    name: "Pulse Events API",
    description: "فهم أين يتوقف المستخدمون أو تحدث الأخطاء.",
  },
  {
    name: "Business Scoring API",
    description: "تحويل المدخلات إلى درجات وتقييمات.",
  },
  {
    name: "Custom Workflow API",
    description: "سير عمل خاص لكل عميل.",
  },
] as const;
