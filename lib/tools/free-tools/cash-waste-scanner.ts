import { AR_HREFS, AR_QUIZ_UI, EN_HREFS, EN_QUIZ_UI } from "../common-ui";
import type { QuizConfig } from "../quiz-types";

export const cashWasteScannerEn: QuizConfig = {
  locale: "en",
  toolTitle: "Cash Waste Scanner",
  toolSubtitle: "8 quick questions to estimate how much hidden cash waste your business may have.",
  timeEstimate: "2–3 minutes",
  resultTitle: "Your Hidden Cash Waste Risk",
  ui: EN_QUIZ_UI,
  ...EN_HREFS,
  questions: [
    {
      id: "roi",
      text: "How clearly can you tie marketing spend to actual revenue results?",
      options: [
        { label: "Every dollar is tracked to outcome", points: 0 },
        { label: "Mostly tracked, with some gaps", points: 1 },
        { label: "Rough estimates only", points: 2 },
        { label: "We can't really tell what's working", points: 3 },
      ],
    },
    {
      id: "mistakes",
      text: "How often do the same operational mistakes happen more than once?",
      options: [
        { label: "Rarely — we fix root causes", points: 0 },
        { label: "Occasionally", points: 1 },
        { label: "Fairly often", points: 2 },
        { label: "Constantly, the same issues repeat", points: 3 },
      ],
    },
    {
      id: "staff-time",
      text: "How much staff time goes to manual, repetitive work that could be automated?",
      options: [
        { label: "Very little", points: 0 },
        { label: "A few hours a week", points: 1 },
        { label: "A significant chunk of the week", points: 2 },
        { label: "A large part of most days", points: 3 },
      ],
    },
    {
      id: "abandonment",
      text: "How many customers drop off before completing a purchase or signup?",
      options: [
        { label: "Very few", points: 0 },
        { label: "A small, expected amount", points: 1 },
        { label: "A noticeable share", points: 2 },
        { label: "A high share, and we don't know why", points: 3 },
      ],
    },
    {
      id: "reporting",
      text: "How reliable are your internal reports and numbers?",
      options: [
        { label: "Accurate and trusted", points: 0 },
        { label: "Mostly accurate", points: 1 },
        { label: "Inconsistent — we double-check often", points: 2 },
        { label: "We don't fully trust our own numbers", points: 3 },
      ],
    },
    {
      id: "branch-consistency",
      text: "If you have multiple branches, locations, or teams, how consistent is performance across them?",
      options: [
        { label: "Very consistent", points: 0 },
        { label: "Mostly aligned", points: 1 },
        { label: "Noticeable gaps between them", points: 2 },
        { label: "Wildly inconsistent", points: 3 },
      ],
    },
    {
      id: "manual-patchwork",
      text: "How much manual work exists only because your systems don't talk to each other?",
      options: [
        { label: "Minimal — systems are integrated", points: 0 },
        { label: "A little manual bridging", points: 1 },
        { label: "A fair amount", points: 2 },
        { label: "Most of our workflow is manual patchwork", points: 3 },
      ],
    },
    {
      id: "lost-sales",
      text: "How often do you suspect you're losing sales you never hear about?",
      options: [
        { label: "Rarely", points: 0 },
        { label: "Sometimes", points: 1 },
        { label: "Often", points: 2 },
        { label: "We assume we're regularly losing sales", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "Low",
      badgeVariant: "emerald",
      heading: "Low Cash Waste Risk",
      body: "Your answers show few signs of hidden cash waste right now. Your tracking, consistency, and reporting look reasonably solid.",
      recommendation: "A light-touch Cash Waste Report can confirm nothing is developing beneath the surface as you scale.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "Medium",
      badgeVariant: "gold",
      heading: "Medium Cash Waste Risk",
      body: "Some patterns suggest money may be leaking through inefficiencies, inconsistent execution, or unclear ROI tracking.",
      recommendation: "A full Cash Waste Report from Chameleon Eye AI can pinpoint exactly where, and estimate the impact.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "High",
      badgeVariant: "danger",
      heading: "High Cash Waste Risk",
      body: "Multiple strong signals point to real, ongoing cash waste across marketing, operations, or staff time.",
      recommendation: "Start a Cash Waste Report now — this is usually the highest-leverage fix available to a growing business.",
    },
  ],
};

export const cashWasteScannerAr: QuizConfig = {
  locale: "ar",
  toolTitle: "فاحص الهدر المالي",
  toolSubtitle: "8 أسئلة سريعة لتقدير مقدار الهدر المالي الخفي المحتمل في شركتك.",
  timeEstimate: "2–3 دقائق",
  resultTitle: "مستوى الهدر المالي الخفي لديك",
  ui: AR_QUIZ_UI,
  ...AR_HREFS,
  questions: [
    {
      id: "roi",
      text: "ما مدى وضوح ربط الإنفاق التسويقي بنتائج إيرادات فعلية؟",
      options: [
        { label: "كل دولار مربوط بنتيجة واضحة", points: 0 },
        { label: "مربوط في الغالب مع بعض الفجوات", points: 1 },
        { label: "تقديرات تقريبية فقط", points: 2 },
        { label: "لا نعرف حقاً ما الذي ينجح", points: 3 },
      ],
    },
    {
      id: "mistakes",
      text: "كم مرة تتكرر نفس الأخطاء التشغيلية؟",
      options: [
        { label: "نادراً — نعالج السبب الجذري", points: 0 },
        { label: "أحياناً", points: 1 },
        { label: "بشكل متكرر نسبياً", points: 2 },
        { label: "باستمرار، نفس المشاكل تتكرر", points: 3 },
      ],
    },
    {
      id: "staff-time",
      text: "كم من وقت الموظفين يذهب لعمل يدوي متكرر يمكن أتمتته؟",
      options: [
        { label: "قليل جداً", points: 0 },
        { label: "بضع ساعات أسبوعياً", points: 1 },
        { label: "جزء كبير من الأسبوع", points: 2 },
        { label: "جزء كبير من معظم الأيام", points: 3 },
      ],
    },
    {
      id: "abandonment",
      text: "كم عدد العملاء الذين يتوقفون قبل إتمام الشراء أو التسجيل؟",
      options: [
        { label: "قليلون جداً", points: 0 },
        { label: "نسبة صغيرة متوقعة", points: 1 },
        { label: "نسبة ملحوظة", points: 2 },
        { label: "نسبة كبيرة، ولا نعرف السبب", points: 3 },
      ],
    },
    {
      id: "reporting",
      text: "ما مدى موثوقية تقاريرك وأرقامك الداخلية؟",
      options: [
        { label: "دقيقة وموثوقة", points: 0 },
        { label: "دقيقة في الغالب", points: 1 },
        { label: "غير متسقة — نتحقق منها كثيراً", points: 2 },
        { label: "لا نثق تماماً بأرقامنا الخاصة", points: 3 },
      ],
    },
    {
      id: "branch-consistency",
      text: "إذا كان لديك عدة فروع أو مواقع أو فرق، ما مدى اتساق الأداء بينها؟",
      options: [
        { label: "متسق جداً", points: 0 },
        { label: "متوافق في الغالب", points: 1 },
        { label: "فجوات ملحوظة بينها", points: 2 },
        { label: "غير متسق إطلاقاً", points: 3 },
      ],
    },
    {
      id: "manual-patchwork",
      text: "كم من العمل اليدوي موجود فقط لأن أنظمتك لا تتواصل مع بعضها؟",
      options: [
        { label: "قليل جداً — الأنظمة متكاملة", points: 0 },
        { label: "بعض الربط اليدوي البسيط", points: 1 },
        { label: "قدر لا بأس به", points: 2 },
        { label: "معظم سير العمل يدوي ومرقّع", points: 3 },
      ],
    },
    {
      id: "lost-sales",
      text: "كم مرة تشك أنك تخسر مبيعات دون أن تعلم بها؟",
      options: [
        { label: "نادراً", points: 0 },
        { label: "أحياناً", points: 1 },
        { label: "غالباً", points: 2 },
        { label: "نفترض أننا نخسر مبيعات بانتظام", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "منخفض",
      badgeVariant: "emerald",
      heading: "هدر مالي منخفض",
      body: "إجاباتك تُظهر إشارات قليلة على هدر مالي خفي حالياً. التتبع والاتساق والتقارير تبدو جيدة نسبياً.",
      recommendation: "تقرير هدر مالي خفيف يمكن أن يؤكد عدم وجود مشاكل ناشئة تحت السطح مع نموك.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "متوسط",
      badgeVariant: "gold",
      heading: "هدر مالي متوسط",
      body: "بعض الأنماط تشير إلى احتمال تسرب أموال عبر عدم الكفاءة، أو التنفيذ غير المتسق، أو تتبع غير واضح للعائد.",
      recommendation: "تقرير هدر مالي كامل من Chameleon Eye AI يمكن أن يحدد المكان بدقة ويقدّر الأثر.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "مرتفع",
      badgeVariant: "danger",
      heading: "هدر مالي مرتفع",
      body: "إشارات قوية متعددة تشير إلى هدر مالي حقيقي ومستمر عبر التسويق أو العمليات أو وقت الموظفين.",
      recommendation: "ابدأ تقرير الهدر المالي الآن — عادة ما يكون هذا الإصلاح الأعلى تأثيراً لشركة نامية.",
    },
  ],
};
