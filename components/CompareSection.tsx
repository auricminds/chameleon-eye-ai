import Link from "next/link";
import { Card } from "./Card";

type CompareRow = {
  name: string;
  bestFor: string;
  notDesignedFor: string;
  fitsWhere: string;
};

type Copy = {
  positioningTitle: string;
  positioningIntro: string;
  positioningList: string[];
  positioningBody: string;
  cardsTitle: string;
  rows: CompareRow[];
  tableTitle: string;
  tableHeaders: { tool: string; bestFor: string; notFor: string; fits: string };
  ctaTitle: string;
  ctas: { label: string; href: string; variant: "primary" | "secondary" }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
};

function buildCopy(locale: "en" | "ar"): Copy {
  if (locale === "ar") {
    const signupHref = "/ar/signup";
    const toolsHref = "/ar/free-tools";
    const dnaHref = "/ar/business-dna";
    const contactHref = "/ar/contact";

    const rows: CompareRow[] = [
      {
        name: "ChatGPT",
        bestFor: "الأنسب لـ: الأسئلة العامة، الكتابة، العصف الذهني، والمساعدة الواسعة.",
        notDesignedFor: "ليس مصمماً لـ: ملفات الشركة الخاصة والتقارير التجارية المنظمة.",
        fitsWhere:
          "Chameleon Eye AI: الأنسب لذكاء الأعمال الخاص، التقارير المنظمة، المخاطر الخفية، الهدر المالي، الوضع المحلي/الخاص، وBusiness DNA.",
      },
      {
        name: "Claude",
        bestFor: "الأنسب لـ: الاستدلال الطويل، الكتابة، ومناقشة المستندات.",
        notDesignedFor: "ليس مصمماً لـ: ملفات تعريف ذكاء خاصة بالأعمال وسير العمل الداخلي الخاص.",
        fitsWhere:
          "Chameleon Eye AI: الأنسب لملفات تعريف ذكاء خاصة بالأعمال، التقارير، المخاطر التشغيلية، أوضاع الخصوصية، وسير عمل القرار.",
      },
      {
        name: "Gemini",
        bestFor: "الأنسب لـ: الإنتاجية العامة وسير عمل AI المرتبط بـ Google.",
        notDesignedFor: "ليس مصمماً لـ: التحليل الخاص لبيانات وملفات الشركة الحساسة.",
        fitsWhere:
          "Chameleon Eye AI: الأنسب للتحليل التجاري الخاص، ملفات الشركة، وتقارير المخاطر.",
      },
      {
        name: "Cursor",
        bestFor: "الأنسب لـ: البرمجة وتطوير البرمجيات.",
        notDesignedFor: "ليس مصمماً لـ: تحليل الأعمال واكتشاف الهدر المالي.",
        fitsWhere:
          "Chameleon Eye AI: الأنسب لتحليل الأعمال، تقارير AI، الهدر المالي، الضعف التشغيلي، وسير عمل ذكاء API.",
      },
      {
        name: "وكلاء بأسلوب Manus",
        bestFor: "الأنسب لـ: تنفيذ المهام وسير العمل الرقمي المستقل.",
        notDesignedFor: "ليس مصمماً لـ: ذكاء الأعمال الخاص والتقارير المنظمة للقرار.",
        fitsWhere:
          "Chameleon Eye AI: الأنسب لذكاء الأعمال الخاص، كشف المخاطر الخفية، دعم القرار، والتقارير المنظمة.",
      },
      {
        name: "المراجعة اليدوية للأعمال",
        bestFor: "مفيدة، لكنها بطيئة وغير متسقة.",
        notDesignedFor: "ليست مصممة لـ: السرعة والاتساق على نطاق واسع.",
        fitsWhere: "Chameleon Eye AI: ينشئ تحليلاً أولياً منظماً وأسرع من بيانات مصرح بها.",
      },
      {
        name: "لوحات المعلومات التقليدية / أدوات BI",
        bestFor: "جيدة لعرض الأرقام والاتجاهات.",
        notDesignedFor: "ليست مصممة لـ: تفسير ما تعنيه الأرقام أو الخطوة التالية.",
        fitsWhere:
          "Chameleon Eye AI: يساعد على تفسير ما قد تعنيه الأرقام، والمخاطر الخفية، والإجراء التالي الموصى به.",
      },
    ];

    return {
      positioningTitle: "ما هو Chameleon Eye AI؟",
      positioningIntro:
        "Chameleon Eye AI ليس بديلاً لـ ChatGPT أو Claude أو Gemini أو Cursor أو Manus.",
      positioningList: [],
      positioningBody:
        "إنه ذكاء أعمال خاص مخصص لاكتشاف الهدر المالي الخفي، المخاطر التشغيلية، الإشارات الضعيفة، تحليل الملفات الخاصة، التقارير المنظمة، Business DNA، سير عمل API، والوصول عبر سطح المكتب والويب والجوال.",
      cardsTitle: "أين يختلف Chameleon Eye AI",
      rows,
      tableTitle: "جدول المقارنة",
      tableHeaders: {
        tool: "الأداة / الفئة",
        bestFor: "الأنسب لـ",
        notFor: "ليس مصمماً لـ",
        fits: "أين يناسب Chameleon Eye AI",
      },
      ctaTitle: "ابدأ مع Chameleon Eye AI",
      ctas: [
        { label: "ابدأ مجاناً", href: signupHref, variant: "primary" },
        { label: "جرّب الأدوات المجانية", href: toolsHref, variant: "secondary" },
        { label: "أنشئ Business DNA", href: dnaHref, variant: "secondary" },
        { label: "اطلب وصول API", href: contactHref, variant: "secondary" },
      ],
      faqTitle: "أسئلة شائعة",
      faq: [
        {
          q: "هل Chameleon Eye AI روبوت محادثة؟",
          a: "لا. إنه نظام ذكاء أعمال خاص يُنتج تقارير منظمة وBusiness DNA بدلاً من محادثة عامة مفتوحة.",
        },
        {
          q: "هل يستبدل ChatGPT أو Claude؟",
          a: "لا. هذه الأدوات ممتازة للمساعدة العامة والكتابة والاستدلال. Chameleon Eye AI مخصص لذكاء الأعمال الخاص والتقارير المنظمة.",
        },
        {
          q: "ما الذي يميز Chameleon Eye AI؟",
          a: "التركيز على الهدر المالي الخفي، المخاطر التشغيلية، الوضع المحلي/الخاص، وBusiness DNA الخاص بشركتك.",
        },
        {
          q: "هل هو مخصص لملفات الشركة الخاصة؟",
          a: "نعم. يعمل فقط مع البيانات والملفات وسير العمل التي يملك العميل صلاحية استخدامها، مع دعم الوضع المحلي/الخاص.",
        },
        {
          q: "هل يدعم سير عمل API؟",
          a: "نعم، عبر Chameleon Eye API لدمج ذكاء الأعمال في الأنظمة والمنصات والتطبيقات.",
        },
        {
          q: "هل يعمل على المتصفح وWindows وiOS؟",
          a: "الويب متاح الآن. Windows وiOS وmacOS قيد التحضير مع وصول مبكر عند الطلب.",
        },
      ],
    };
  }

  const signupHref = "/signup";
  const toolsHref = "/free-tools";
  const dnaHref = "/business-dna";
  const contactHref = "/contact";

  const rows: CompareRow[] = [
    {
      name: "ChatGPT",
      bestFor: "Best for: general questions, writing, brainstorming, and broad assistance.",
      notDesignedFor: "Not designed for: private company files and structured business reports.",
      fitsWhere:
        "Chameleon Eye AI: best for private business intelligence, structured reports, hidden business risk, cash waste, local/private mode, and Business DNA.",
    },
    {
      name: "Claude",
      bestFor: "Best for: long-form reasoning, writing, and document discussion.",
      notDesignedFor: "Not designed for: business-specific intelligence profiles and private company workflows.",
      fitsWhere:
        "Chameleon Eye AI: best for business-specific intelligence profiles, reports, operational risk, privacy modes, and decision workflows.",
    },
    {
      name: "Gemini",
      bestFor: "Best for: general productivity and Google-connected AI workflows.",
      notDesignedFor: "Not designed for: private analysis of sensitive company data and files.",
      fitsWhere: "Chameleon Eye AI: best for private business analysis, company files, and risk reports.",
    },
    {
      name: "Cursor",
      bestFor: "Best for: coding and software development.",
      notDesignedFor: "Not designed for: business analysis and cash waste detection.",
      fitsWhere:
        "Chameleon Eye AI: best for business analysis, AI reports, cash waste, operational weakness, and API intelligence workflows.",
    },
    {
      name: "Manus-style agents",
      bestFor: "Best for: task execution and autonomous digital workflows.",
      notDesignedFor: "Not designed for: private business intelligence and structured decision reports.",
      fitsWhere:
        "Chameleon Eye AI: best for private business intelligence, hidden risk detection, decision support, and structured reports.",
    },
    {
      name: "Manual business review",
      bestFor: "Useful, but slow and inconsistent.",
      notDesignedFor: "Not designed for: speed and consistency at scale.",
      fitsWhere: "Chameleon Eye AI: creates faster structured first-pass analysis and reports from approved data.",
    },
    {
      name: "Traditional dashboards / BI",
      bestFor: "Good for showing numbers and trends.",
      notDesignedFor: "Not designed for: explaining what the numbers mean or what to do next.",
      fitsWhere:
        "Chameleon Eye AI: helps explain what the numbers may mean, what risk is hidden, and what action to take next.",
    },
  ];

  return {
    positioningTitle: "What is Chameleon Eye AI?",
    positioningIntro:
      "Chameleon Eye AI is not a replacement for ChatGPT, Claude, Gemini, Cursor, or Manus.",
    positioningList: [],
    positioningBody:
      "It is a private business intelligence AI built for hidden cash waste, operational risk, weak signals, private files, structured reports, Business DNA, API workflows, and desktop/web/mobile access.",
    cardsTitle: "Where Chameleon Eye AI is different",
    rows,
    tableTitle: "Comparison table",
    tableHeaders: {
      tool: "Tool / category",
      bestFor: "Best for",
      notFor: "Not designed for",
      fits: "Where Chameleon Eye fits",
    },
    ctaTitle: "Start with Chameleon Eye AI",
    ctas: [
      { label: "Start Free", href: signupHref, variant: "primary" },
      { label: "Try Free Tools", href: toolsHref, variant: "secondary" },
      { label: "Build Business DNA", href: dnaHref, variant: "secondary" },
      { label: "Request API Access", href: contactHref, variant: "secondary" },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is Chameleon Eye AI a chatbot?",
        a: "No. It's a private business intelligence system that produces structured reports and a Business DNA profile instead of open-ended general chat.",
      },
      {
        q: "Does it replace ChatGPT or Claude?",
        a: "No. Those tools are excellent for general assistance, writing, and reasoning. Chameleon Eye AI is built specifically for private business intelligence and structured reports.",
      },
      {
        q: "What makes Chameleon Eye AI different?",
        a: "The focus on hidden cash waste, operational risk, local/private mode, and a Business DNA profile built for your company.",
      },
      {
        q: "Is it for private company files?",
        a: "Yes. It only works with data, files, and workflows the customer is authorized to use, with support for local/private mode.",
      },
      {
        q: "Does it support API workflows?",
        a: "Yes, through the Chameleon Eye API, for embedding business intelligence into your own systems, platforms, and apps.",
      },
      {
        q: "Does it work on browser, Windows, and iOS?",
        a: "Web is available now. Windows, iOS, and macOS are in progress, with early access on request.",
      },
    ],
  };
}

export function CompareSection({ locale = "en" }: { locale?: "en" | "ar" }) {
  const copy = buildCopy(locale);
  const isArabic = locale === "ar";

  return (
    <div className="space-y-14">
      <Card className="border-emerald/20 bg-panel2">
        <h2 className="text-xl font-semibold text-foreground">{copy.positioningTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{copy.positioningIntro}</p>
        <p className="mt-3 text-sm leading-7 text-gold">{copy.positioningBody}</p>
      </Card>

      <div>
        <h2 className="mb-6 text-xl font-semibold text-foreground">{copy.cardsTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.rows.map((row) => (
            <Card key={row.name} hover className="flex h-full flex-col">
              <h3 className="text-lg font-semibold text-foreground">{row.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{row.bestFor}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{row.notDesignedFor}</p>
              <p className="mt-4 flex-1 text-sm leading-7 text-emerald">{row.fitsWhere}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-semibold text-foreground">{copy.tableTitle}</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full min-w-[720px] border-collapse text-start text-sm">
            <thead>
              <tr className="bg-panel2 text-foreground">
                <th className="px-4 py-3 text-start font-semibold">{copy.tableHeaders.tool}</th>
                <th className="px-4 py-3 text-start font-semibold">{copy.tableHeaders.bestFor}</th>
                <th className="px-4 py-3 text-start font-semibold">{copy.tableHeaders.notFor}</th>
                <th className="px-4 py-3 text-start font-semibold">{copy.tableHeaders.fits}</th>
              </tr>
            </thead>
            <tbody>
              {copy.rows.map((row, index) => (
                <tr key={row.name} className={index % 2 === 0 ? "bg-panel" : "bg-panel/60"}>
                  <td className="px-4 py-3 align-top font-medium text-foreground">{row.name}</td>
                  <td className="px-4 py-3 align-top leading-6 text-muted">{row.bestFor.replace(/^(Best for: |الأنسب لـ: )/, "")}</td>
                  <td className="px-4 py-3 align-top leading-6 text-muted">{row.notDesignedFor.replace(/^(Not designed for: |ليس مصمماً لـ: |ليست مصممة لـ: )/, "")}</td>
                  <td className="px-4 py-3 align-top leading-6 text-emerald">{row.fitsWhere}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-foreground">{copy.ctaTitle}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {copy.ctas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A] ${
                cta.variant === "primary"
                  ? "border border-emerald/30 bg-emerald text-background hover:bg-emerald/90"
                  : "border border-white/10 bg-panel2 text-foreground hover:border-gold/30 hover:bg-panel"
              }`}
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </Card>

      <div>
        <h2 className="mb-6 text-xl font-semibold text-foreground">{copy.faqTitle}</h2>
        <div className="space-y-3">
          {copy.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/8 bg-panel p-5 open:border-emerald/20"
            >
              <summary
                className={`cursor-pointer list-none text-sm font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A] ${isArabic ? "text-right" : ""}`}
              >
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
