import { AR_HREFS, AR_QUIZ_UI, EN_HREFS, EN_QUIZ_UI } from "../common-ui";
import type { QuizConfig } from "../quiz-types";

export const customerJourneyFrictionTestEn: QuizConfig = {
  locale: "en",
  toolTitle: "Customer Journey Friction Test",
  toolSubtitle: "8 quick questions to spot where customers are dropping off.",
  timeEstimate: "2–3 minutes",
  resultTitle: "Your Customer Journey Friction Score",
  ui: EN_QUIZ_UI,
  ...EN_HREFS,
  questions: [
    {
      id: "abandoned-forms",
      text: "How often do people start a form but not finish it?",
      options: [
        { label: "Rarely", points: 0 },
        { label: "Sometimes", points: 1 },
        { label: "Fairly often", points: 2 },
        { label: "Very often", points: 3 },
      ],
    },
    {
      id: "signup-friction",
      text: "How easy is your signup or onboarding process?",
      options: [
        { label: "Very easy, minimal steps", points: 0 },
        { label: "Reasonably easy", points: 1 },
        { label: "A bit long or confusing", points: 2 },
        { label: "Complicated — people give up", points: 3 },
      ],
    },
    {
      id: "unclear-cta",
      text: "How clear is it to visitors what action to take next on your site?",
      options: [
        { label: "Always clear", points: 0 },
        { label: "Usually clear", points: 1 },
        { label: "Sometimes unclear", points: 2 },
        { label: "Often confusing", points: 3 },
      ],
    },
    {
      id: "response-time",
      text: "How fast do you typically respond to a new lead or inquiry?",
      options: [
        { label: "Within minutes", points: 0 },
        { label: "Same day", points: 1 },
        { label: "A day or two", points: 2 },
        { label: "Often much longer", points: 3 },
      ],
    },
    {
      id: "handover",
      text: "When a lead moves from marketing to sales, or between teams, how smooth is it?",
      options: [
        { label: "Seamless", points: 0 },
        { label: "Mostly smooth", points: 1 },
        { label: "Some drop-offs", points: 2 },
        { label: "Leads regularly fall through the cracks", points: 3 },
      ],
    },
    {
      id: "lost-leads",
      text: "Do you have a clear way to know how many leads you're losing, and why?",
      options: [
        { label: "Yes, fully tracked", points: 0 },
        { label: "Mostly tracked", points: 1 },
        { label: "Partial visibility", points: 2 },
        { label: "No real visibility", points: 3 },
      ],
    },
    {
      id: "next-steps",
      text: "After someone signs up, how clear is what happens next for them?",
      options: [
        { label: "Very clear", points: 0 },
        { label: "Mostly clear", points: 1 },
        { label: "Somewhat unclear", points: 2 },
        { label: "Users often get stuck or confused", points: 3 },
      ],
    },
    {
      id: "device-consistency",
      text: "How consistent is the experience across mobile, tablet, and desktop?",
      options: [
        { label: "Fully consistent", points: 0 },
        { label: "Mostly consistent", points: 1 },
        { label: "Some rough edges", points: 2 },
        { label: "Noticeably worse on some devices", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "Low",
      badgeVariant: "emerald",
      heading: "Low Journey Friction",
      body: "Your signup flow, response times, and handovers look reasonably smooth right now.",
      recommendation: "A periodic Customer Journey Report can help you keep the experience smooth as you grow.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "Medium",
      badgeVariant: "gold",
      heading: "Medium Journey Friction",
      body: "There are friction points likely costing you leads — in forms, handovers, or response time.",
      recommendation: "A Customer Journey Report can map exactly where prospects are dropping off.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "High",
      badgeVariant: "danger",
      heading: "High Journey Friction",
      body: "Significant friction is likely costing meaningful revenue across signup, handover, and follow-up.",
      recommendation: "Start a Customer Journey Report now — this is often a fast, high-impact fix.",
    },
  ],
};

export const customerJourneyFrictionTestAr: QuizConfig = {
  locale: "ar",
  toolTitle: "اختبار احتكاك رحلة العميل",
  toolSubtitle: "8 أسئلة سريعة لاكتشاف أين يتوقف عملاؤك عن الاستمرار.",
  timeEstimate: "2–3 دقائق",
  resultTitle: "درجة احتكاك رحلة العميل لديك",
  ui: AR_QUIZ_UI,
  ...AR_HREFS,
  questions: [
    {
      id: "abandoned-forms",
      text: "كم مرة يبدأ الأشخاص تعبئة نموذج ولا يكملونه؟",
      options: [
        { label: "نادراً", points: 0 },
        { label: "أحياناً", points: 1 },
        { label: "بشكل متكرر نسبياً", points: 2 },
        { label: "كثيراً جداً", points: 3 },
      ],
    },
    {
      id: "signup-friction",
      text: "ما مدى سهولة عملية التسجيل أو الإعداد لديك؟",
      options: [
        { label: "سهلة جداً، خطوات قليلة", points: 0 },
        { label: "سهلة نسبياً", points: 1 },
        { label: "طويلة أو مربكة بعض الشيء", points: 2 },
        { label: "معقدة — الأشخاص يستسلمون", points: 3 },
      ],
    },
    {
      id: "unclear-cta",
      text: "ما مدى وضوح الخطوة التالية للزائر على موقعك؟",
      options: [
        { label: "واضحة دائماً", points: 0 },
        { label: "واضحة عادة", points: 1 },
        { label: "غير واضحة أحياناً", points: 2 },
        { label: "مربكة غالباً", points: 3 },
      ],
    },
    {
      id: "response-time",
      text: "ما مدى سرعة ردك عادة على عميل محتمل أو استفسار جديد؟",
      options: [
        { label: "خلال دقائق", points: 0 },
        { label: "في نفس اليوم", points: 1 },
        { label: "يوم أو يومين", points: 2 },
        { label: "غالباً أطول من ذلك بكثير", points: 3 },
      ],
    },
    {
      id: "handover",
      text: "عندما ينتقل عميل محتمل من التسويق إلى المبيعات، أو بين الفرق، ما مدى سلاسة ذلك؟",
      options: [
        { label: "سلس تماماً", points: 0 },
        { label: "سلس في الغالب", points: 1 },
        { label: "بعض الفقدان", points: 2 },
        { label: "عملاء محتملون يضيعون بانتظام", points: 3 },
      ],
    },
    {
      id: "lost-leads",
      text: "هل لديك طريقة واضحة لمعرفة عدد العملاء المحتملين الذين تخسرهم، ولماذا؟",
      options: [
        { label: "نعم، متتبع بالكامل", points: 0 },
        { label: "متتبع في الغالب", points: 1 },
        { label: "رؤية جزئية", points: 2 },
        { label: "لا توجد رؤية حقيقية", points: 3 },
      ],
    },
    {
      id: "next-steps",
      text: "بعد تسجيل شخص ما، ما مدى وضوح ما يحدث بعد ذلك بالنسبة له؟",
      options: [
        { label: "واضح جداً", points: 0 },
        { label: "واضح في الغالب", points: 1 },
        { label: "غير واضح نوعاً ما", points: 2 },
        { label: "المستخدمون غالباً ما يتوهون أو يرتبكون", points: 3 },
      ],
    },
    {
      id: "device-consistency",
      text: "ما مدى اتساق التجربة عبر الجوال والتابلت وسطح المكتب؟",
      options: [
        { label: "متسقة تماماً", points: 0 },
        { label: "متسقة في الغالب", points: 1 },
        { label: "بعض الاختلافات البسيطة", points: 2 },
        { label: "أسوأ بشكل ملحوظ على بعض الأجهزة", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "منخفض",
      badgeVariant: "emerald",
      heading: "احتكاك منخفض في الرحلة",
      body: "تدفق التسجيل ووقت الاستجابة والتسليم لديك يبدو سلساً نسبياً حالياً.",
      recommendation: "تقرير دوري لرحلة العميل يساعدك على إبقاء التجربة سلسة مع النمو.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "متوسط",
      badgeVariant: "gold",
      heading: "احتكاك متوسط في الرحلة",
      body: "هناك نقاط احتكاك قد تكلفك عملاء محتملين — في النماذج، أو التسليم، أو وقت الاستجابة.",
      recommendation: "تقرير رحلة العميل يمكن أن يحدد بدقة أين يتوقف العملاء المحتملون.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "مرتفع",
      badgeVariant: "danger",
      heading: "احتكاك مرتفع في الرحلة",
      body: "احتكاك كبير على الأرجح يكلفك إيرادات ملموسة عبر التسجيل والتسليم والمتابعة.",
      recommendation: "ابدأ تقرير رحلة العميل الآن — غالباً ما يكون هذا إصلاحاً سريعاً وعالي التأثير.",
    },
  ],
};
