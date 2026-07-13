import { AR_HREFS, AR_QUIZ_UI, EN_HREFS, EN_QUIZ_UI } from "../common-ui";
import type { QuizConfig } from "../quiz-types";

export const teamEffectivenessCheckEn: QuizConfig = {
  locale: "en",
  toolTitle: "Team Effectiveness Check",
  toolSubtitle: "8 quick questions to see how visible your team's real bottlenecks are.",
  timeEstimate: "2–3 minutes",
  resultTitle: "Team Effectiveness Visibility Score",
  ui: EN_QUIZ_UI,
  ...EN_HREFS,
  questions: [
    {
      id: "ownership",
      text: "When something goes wrong, how quickly can you identify who owns fixing it?",
      options: [
        { label: "Immediately clear", points: 0 },
        { label: "Usually clear", points: 1 },
        { label: "Often unclear", points: 2 },
        { label: "Nobody knows who owns what", points: 3 },
      ],
    },
    {
      id: "handovers",
      text: "How smooth are handovers between people or teams?",
      options: [
        { label: "Very smooth", points: 0 },
        { label: "Mostly smooth", points: 1 },
        { label: "Frequently causes delays", points: 2 },
        { label: "Handovers regularly drop work", points: 3 },
      ],
    },
    {
      id: "delays",
      text: "How often do the same types of delays happen on projects?",
      options: [
        { label: "Rarely", points: 0 },
        { label: "Occasionally", points: 1 },
        { label: "Fairly often", points: 2 },
        { label: "On almost every project", points: 3 },
      ],
    },
    {
      id: "output",
      text: "How easy is it to connect daily team activity to measurable results?",
      options: [
        { label: "Very easy, we track outcomes", points: 0 },
        { label: "Mostly easy", points: 1 },
        { label: "Hard to tell", points: 2 },
        { label: "Lots of activity, unclear results", points: 3 },
      ],
    },
    {
      id: "training",
      text: "How confident are you that the team has the training and skills needed for their role?",
      options: [
        { label: "Very confident", points: 0 },
        { label: "Mostly confident", points: 1 },
        { label: "Some gaps", points: 2 },
        { label: "Significant gaps", points: 3 },
      ],
    },
    {
      id: "status-reports",
      text: "How useful are your team's status reports for actual decision-making?",
      options: [
        { label: "Very useful", points: 0 },
        { label: "Somewhat useful", points: 1 },
        { label: "Often too vague", points: 2 },
        { label: "Rarely useful", points: 3 },
      ],
    },
    {
      id: "meetings",
      text: "How often do meetings end without a clear decision or next step?",
      options: [
        { label: "Rarely", points: 0 },
        { label: "Sometimes", points: 1 },
        { label: "Often", points: 2 },
        { label: "Almost always", points: 3 },
      ],
    },
    {
      id: "priorities",
      text: "How aligned is the team on what matters most right now?",
      options: [
        { label: "Fully aligned", points: 0 },
        { label: "Mostly aligned", points: 1 },
        { label: "Often confused", points: 2 },
        { label: "Everyone has different priorities", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "Strong Visibility",
      badgeVariant: "emerald",
      heading: "Strong Team Visibility",
      body: "Ownership, handovers, and output are reasonably clear across your team right now.",
      recommendation: "A light Team Effectiveness pulse check periodically can catch drift as you grow.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "Partial Visibility",
      badgeVariant: "gold",
      heading: "Partial Team Visibility",
      body: "There are real blind spots in ownership, handovers, or output tracking that are likely costing time.",
      recommendation: "A Team Effectiveness Report can map exactly where bottlenecks and unclear ownership are forming.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "Low Visibility",
      badgeVariant: "danger",
      heading: "Low Visibility, High Risk",
      body: "Multiple strong signals suggest leadership is likely missing real bottlenecks in ownership and delivery.",
      recommendation: "Start a Team Effectiveness Report now to map ownership and handover issues before they compound.",
    },
  ],
};

export const teamEffectivenessCheckAr: QuizConfig = {
  locale: "ar",
  toolTitle: "فحص فعالية الفريق",
  toolSubtitle: "8 أسئلة سريعة لمعرفة مدى وضوح العوائق الحقيقية في فريقك.",
  timeEstimate: "2–3 دقائق",
  resultTitle: "درجة وضوح فعالية الفريق",
  ui: AR_QUIZ_UI,
  ...AR_HREFS,
  questions: [
    {
      id: "ownership",
      text: "عندما يحدث خطأ ما، كم بسرعة يمكنك تحديد المسؤول عن إصلاحه؟",
      options: [
        { label: "واضح فوراً", points: 0 },
        { label: "واضح عادة", points: 1 },
        { label: "غير واضح غالباً", points: 2 },
        { label: "لا أحد يعرف من المسؤول", points: 3 },
      ],
    },
    {
      id: "handovers",
      text: "ما مدى سلاسة تسليم المهام بين الأشخاص أو الفرق؟",
      options: [
        { label: "سلسة جداً", points: 0 },
        { label: "سلسة في الغالب", points: 1 },
        { label: "تسبب تأخيرات بشكل متكرر", points: 2 },
        { label: "التسليم يفقد العمل بانتظام", points: 3 },
      ],
    },
    {
      id: "delays",
      text: "كم مرة تتكرر نفس أنواع التأخير في المشاريع؟",
      options: [
        { label: "نادراً", points: 0 },
        { label: "أحياناً", points: 1 },
        { label: "بشكل متكرر نسبياً", points: 2 },
        { label: "في كل مشروع تقريباً", points: 3 },
      ],
    },
    {
      id: "output",
      text: "ما مدى سهولة ربط نشاط الفريق اليومي بنتائج قابلة للقياس؟",
      options: [
        { label: "سهل جداً، نتتبع النتائج", points: 0 },
        { label: "سهل في الغالب", points: 1 },
        { label: "يصعب معرفته", points: 2 },
        { label: "نشاط كثير ونتائج غير واضحة", points: 3 },
      ],
    },
    {
      id: "training",
      text: "ما مدى ثقتك بأن الفريق يمتلك التدريب والمهارات اللازمة لدوره؟",
      options: [
        { label: "واثق جداً", points: 0 },
        { label: "واثق في الغالب", points: 1 },
        { label: "بعض الفجوات", points: 2 },
        { label: "فجوات كبيرة", points: 3 },
      ],
    },
    {
      id: "status-reports",
      text: "ما مدى فائدة تقارير الحالة لفريقك في اتخاذ القرارات الفعلية؟",
      options: [
        { label: "مفيدة جداً", points: 0 },
        { label: "مفيدة نوعاً ما", points: 1 },
        { label: "غامضة غالباً", points: 2 },
        { label: "نادراً ما تكون مفيدة", points: 3 },
      ],
    },
    {
      id: "meetings",
      text: "كم مرة تنتهي الاجتماعات دون قرار واضح أو خطوة تالية؟",
      options: [
        { label: "نادراً", points: 0 },
        { label: "أحياناً", points: 1 },
        { label: "غالباً", points: 2 },
        { label: "دائماً تقريباً", points: 3 },
      ],
    },
    {
      id: "priorities",
      text: "ما مدى توافق الفريق على الأولويات الحالية؟",
      options: [
        { label: "متوافق تماماً", points: 0 },
        { label: "متوافق في الغالب", points: 1 },
        { label: "مرتبك غالباً", points: 2 },
        { label: "لكل شخص أولويات مختلفة", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "وضوح عالٍ",
      badgeVariant: "emerald",
      heading: "وضوح جيد لفريقك",
      body: "الملكية والتسليم والنتائج واضحة نسبياً داخل فريقك حالياً.",
      recommendation: "فحص دوري خفيف لفعالية الفريق يمكن أن يلتقط أي انحراف مع النمو.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "وضوح جزئي",
      badgeVariant: "gold",
      heading: "وضوح جزئي للفريق",
      body: "هناك نقاط عمياء حقيقية في الملكية أو التسليم أو تتبع النتائج، وقد تكلفك وقتاً.",
      recommendation: "تقرير فعالية الفريق يمكن أن يحدد بدقة أين تتشكل العوائق وعدم وضوح الملكية.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "وضوح منخفض",
      badgeVariant: "danger",
      heading: "وضوح منخفض ومخاطر عالية",
      body: "إشارات قوية متعددة تشير إلى أن القيادة على الأرجح تفوّت عوائق حقيقية في الملكية والتسليم.",
      recommendation: "ابدأ تقرير فعالية الفريق الآن لرسم مشاكل الملكية والتسليم قبل أن تتفاقم.",
    },
  ],
};
