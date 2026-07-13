import { AR_HREFS, AR_QUIZ_UI, EN_HREFS, EN_QUIZ_UI } from "../common-ui";
import type { QuizConfig } from "../quiz-types";

export const marketingWasteTestEn: QuizConfig = {
  locale: "en",
  toolTitle: "Marketing Waste Test",
  toolSubtitle: "8 quick questions to estimate how much of your marketing spend may be wasted.",
  timeEstimate: "2–3 minutes",
  resultTitle: "Your Marketing Waste Risk Score",
  ui: EN_QUIZ_UI,
  ...EN_HREFS,
  questions: [
    {
      id: "audience",
      text: "How clearly defined is your target audience?",
      options: [
        { label: "Very clear, documented profile", points: 0 },
        { label: "Mostly clear", points: 1 },
        { label: "Loosely defined", points: 2 },
        { label: "We're not really sure who we're targeting", points: 3 },
      ],
    },
    {
      id: "landing-page",
      text: "How well does your landing page convert visitors into leads or customers?",
      options: [
        { label: "Strong, tested conversion rate", points: 0 },
        { label: "Decent", points: 1 },
        { label: "Below expectations", points: 2 },
        { label: "We don't really know, but it feels weak", points: 3 },
      ],
    },
    {
      id: "tracking",
      text: "How confident are you in your conversion tracking data?",
      options: [
        { label: "Fully confident", points: 0 },
        { label: "Mostly confident", points: 1 },
        { label: "Partial tracking only", points: 2 },
        { label: "Little to no reliable tracking", points: 3 },
      ],
    },
    {
      id: "campaign-insight",
      text: "How well do you understand which campaigns actually drive results?",
      options: [
        { label: "Clear per-campaign insight", points: 0 },
        { label: "Mostly clear", points: 1 },
        { label: "Rough guesses", points: 2 },
        { label: "We spend without real insight", points: 3 },
      ],
    },
    {
      id: "message-fit",
      text: "How often do customers seem confused about what you actually offer?",
      options: [
        { label: "Rarely", points: 0 },
        { label: "Occasionally", points: 1 },
        { label: "Fairly often", points: 2 },
        { label: "Frequently", points: 3 },
      ],
    },
    {
      id: "consistency",
      text: "How consistent is your messaging across channels — site, ads, and social?",
      options: [
        { label: "Very consistent", points: 0 },
        { label: "Mostly consistent", points: 1 },
        { label: "Somewhat scattered", points: 2 },
        { label: "Inconsistent across channels", points: 3 },
      ],
    },
    {
      id: "differentiation",
      text: "How clearly can customers tell you apart from competitors?",
      options: [
        { label: "Very clearly", points: 0 },
        { label: "Fairly clearly", points: 1 },
        { label: "Not very clearly", points: 2 },
        { label: "We blend in", points: 3 },
      ],
    },
    {
      id: "channel-mix",
      text: "How diversified and tested is your marketing spend across channels?",
      options: [
        { label: "Tested mix, diversified", points: 0 },
        { label: "Mostly diversified", points: 1 },
        { label: "Concentrated in one or two channels", points: 2 },
        { label: "All spend in one channel, untested", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "Low",
      badgeVariant: "emerald",
      heading: "Low Marketing Waste Risk",
      body: "Your targeting, tracking, and messaging look reasonably efficient right now.",
      recommendation: "Keep testing — a periodic Marketing Report can catch drift as channels evolve.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "Medium",
      badgeVariant: "gold",
      heading: "Medium Marketing Waste Risk",
      body: "Some waste is likely coming from unclear targeting, weak tracking, or inconsistent messaging.",
      recommendation: "A Marketing Report from Chameleon Eye AI can identify which channels and messages are underperforming.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "High",
      badgeVariant: "danger",
      heading: "High Marketing Waste Risk",
      body: "Strong signals point to real budget waste — likely a mix of unclear audience fit, weak tracking, and inconsistent messaging.",
      recommendation: "Start a Marketing Report alongside a Cash Waste Report to see the full financial picture.",
    },
  ],
};

export const marketingWasteTestAr: QuizConfig = {
  locale: "ar",
  toolTitle: "اختبار الهدر التسويقي",
  toolSubtitle: "8 أسئلة سريعة لتقدير مقدار الهدر المحتمل في إنفاقك التسويقي.",
  timeEstimate: "2–3 دقائق",
  resultTitle: "درجة مخاطر الهدر التسويقي لديك",
  ui: AR_QUIZ_UI,
  ...AR_HREFS,
  questions: [
    {
      id: "audience",
      text: "ما مدى وضوح تحديد جمهورك المستهدف؟",
      options: [
        { label: "واضح جداً، ملف موثّق", points: 0 },
        { label: "واضح في الغالب", points: 1 },
        { label: "محدد بشكل فضفاض", points: 2 },
        { label: "لسنا متأكدين حقاً ممن نستهدف", points: 3 },
      ],
    },
    {
      id: "landing-page",
      text: "ما مدى فعالية صفحة الهبوط لديك في تحويل الزوار إلى عملاء محتملين؟",
      options: [
        { label: "قوية، معدل تحويل مُختبر", points: 0 },
        { label: "مقبولة", points: 1 },
        { label: "أقل من المتوقع", points: 2 },
        { label: "لا نعرف حقاً، لكنها تبدو ضعيفة", points: 3 },
      ],
    },
    {
      id: "tracking",
      text: "ما مدى ثقتك ببيانات تتبع التحويل لديك؟",
      options: [
        { label: "واثق تماماً", points: 0 },
        { label: "واثق في الغالب", points: 1 },
        { label: "تتبع جزئي فقط", points: 2 },
        { label: "لا يوجد تتبع موثوق تقريباً", points: 3 },
      ],
    },
    {
      id: "campaign-insight",
      text: "ما مدى فهمك لأي الحملات تحقق نتائج فعلية؟",
      options: [
        { label: "رؤية واضحة لكل حملة", points: 0 },
        { label: "واضحة في الغالب", points: 1 },
        { label: "تخمينات تقريبية", points: 2 },
        { label: "ننفق دون رؤية حقيقية", points: 3 },
      ],
    },
    {
      id: "message-fit",
      text: "كم مرة يبدو العملاء مرتبكين حول ما تقدمه فعلاً؟",
      options: [
        { label: "نادراً", points: 0 },
        { label: "أحياناً", points: 1 },
        { label: "بشكل متكرر نسبياً", points: 2 },
        { label: "بشكل متكرر", points: 3 },
      ],
    },
    {
      id: "consistency",
      text: "ما مدى اتساق رسائلك عبر القنوات — الموقع، الإعلانات، ومواقع التواصل؟",
      options: [
        { label: "متسقة جداً", points: 0 },
        { label: "متسقة في الغالب", points: 1 },
        { label: "متناثرة نوعاً ما", points: 2 },
        { label: "غير متسقة عبر القنوات", points: 3 },
      ],
    },
    {
      id: "differentiation",
      text: "ما مدى وضوح تمييز العملاء لك عن المنافسين؟",
      options: [
        { label: "واضح جداً", points: 0 },
        { label: "واضح إلى حد ما", points: 1 },
        { label: "غير واضح كثيراً", points: 2 },
        { label: "نندمج مع المنافسين", points: 3 },
      ],
    },
    {
      id: "channel-mix",
      text: "ما مدى تنويع واختبار إنفاقك التسويقي عبر القنوات؟",
      options: [
        { label: "مزيج مُختبر ومتنوع", points: 0 },
        { label: "متنوع في الغالب", points: 1 },
        { label: "مركّز في قناة أو قناتين", points: 2 },
        { label: "كل الإنفاق في قناة واحدة دون اختبار", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "منخفض",
      badgeVariant: "emerald",
      heading: "هدر تسويقي منخفض",
      body: "استهدافك وتتبعك ورسائلك تبدو فعّالة نسبياً حالياً.",
      recommendation: "استمر في الاختبار — تقرير تسويقي دوري يمكن أن يلتقط أي انحراف مع تطور القنوات.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "متوسط",
      badgeVariant: "gold",
      heading: "هدر تسويقي متوسط",
      body: "من المرجح وجود هدر ناتج عن استهداف غير واضح، أو تتبع ضعيف، أو رسائل غير متسقة.",
      recommendation: "تقرير تسويقي من Chameleon Eye AI يمكن أن يحدد القنوات والرسائل ضعيفة الأداء.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "مرتفع",
      badgeVariant: "danger",
      heading: "هدر تسويقي مرتفع",
      body: "إشارات قوية تشير إلى هدر حقيقي في الميزانية — على الأرجح مزيج من استهداف غير واضح وتتبع ضعيف ورسائل غير متسقة.",
      recommendation: "ابدأ تقريراً تسويقياً إلى جانب تقرير الهدر المالي لرؤية الصورة المالية الكاملة.",
    },
  ],
};
