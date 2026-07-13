import { AR_HREFS, AR_QUIZ_UI, EN_HREFS, EN_QUIZ_UI } from "../common-ui";
import type { QuizConfig } from "../quiz-types";

export const privateModeReadinessTestEn: QuizConfig = {
  locale: "en",
  toolTitle: "Private Mode Readiness Test",
  toolSubtitle: "8 quick questions to see whether local/private mode fits how you work.",
  timeEstimate: "2–3 minutes",
  resultTitle: "Your Private Mode Recommendation",
  ui: EN_QUIZ_UI,
  ...EN_HREFS,
  questions: [
    {
      id: "confidential-docs",
      text: "How much of your daily work involves confidential documents?",
      options: [
        { label: "Very little", points: 0 },
        { label: "Some", points: 1 },
        { label: "A significant amount", points: 2 },
        { label: "Most of what we handle is confidential", points: 3 },
      ],
    },
    {
      id: "client-data",
      text: "How sensitive is the client data you work with?",
      options: [
        { label: "Not very sensitive", points: 0 },
        { label: "Moderately sensitive", points: 1 },
        { label: "Sensitive", points: 2 },
        { label: "Highly sensitive or regulated", points: 3 },
      ],
    },
    {
      id: "hr-data",
      text: "Do you regularly handle HR or personnel data — salaries, reviews, personal information?",
      options: [
        { label: "Rarely", points: 0 },
        { label: "Occasionally", points: 1 },
        { label: "Regularly", points: 2 },
        { label: "Constantly", points: 3 },
      ],
    },
    {
      id: "financial-data",
      text: "How often do you work with investor, financial, or M&A-sensitive material?",
      options: [
        { label: "Never", points: 0 },
        { label: "Rarely", points: 1 },
        { label: "Sometimes", points: 2 },
        { label: "Frequently", points: 3 },
      ],
    },
    {
      id: "cloud-restrictions",
      text: "Does your company or industry restrict what data can go to cloud services?",
      options: [
        { label: "No restrictions", points: 0 },
        { label: "Light guidelines", points: 1 },
        { label: "Formal policy", points: 2 },
        { label: "Strict regulatory restrictions", points: 3 },
      ],
    },
    {
      id: "local-first",
      text: "How important is it that some files never leave your device?",
      options: [
        { label: "Not important", points: 0 },
        { label: "Somewhat important", points: 1 },
        { label: "Important", points: 2 },
        { label: "Critical, non-negotiable", points: 3 },
      ],
    },
    {
      id: "compliance",
      text: "Are you subject to compliance frameworks — finance, health, or legal — around data handling?",
      options: [
        { label: "No", points: 0 },
        { label: "Light requirements", points: 1 },
        { label: "Formal requirements", points: 2 },
        { label: "Strict, audited requirements", points: 3 },
      ],
    },
    {
      id: "cloud-comfort",
      text: "How comfortable is your team pasting sensitive data into general cloud AI tools today?",
      options: [
        { label: "Very comfortable, low sensitivity", points: 0 },
        { label: "Generally comfortable", points: 1 },
        { label: "Hesitant", points: 2 },
        { label: "Not comfortable at all", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "Optional",
      badgeVariant: "emerald",
      heading: "Private Mode: Optional",
      body: "Your data sensitivity looks manageable with standard cloud workflows today.",
      recommendation: "Cloud mode is likely fine for now — private mode is available whenever you need it.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "Recommended",
      badgeVariant: "gold",
      heading: "Private Mode: Recommended for Part of Your Work",
      body: "A subset of your work — HR, financial, or client data — would likely benefit from local/private mode.",
      recommendation: "Consider a hybrid setup: private mode for sensitive material, cloud for the rest.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "Strongly Recommended",
      badgeVariant: "danger",
      heading: "Private Mode: Strongly Recommended",
      body: "Your sensitivity and compliance profile point clearly toward a local-first, private-mode approach.",
      recommendation: "Set up Chameleon Eye AI in local/private mode so sensitive files never leave your device.",
    },
  ],
};

export const privateModeReadinessTestAr: QuizConfig = {
  locale: "ar",
  toolTitle: "اختبار جاهزية الوضع الخاص",
  toolSubtitle: "8 أسئلة سريعة لمعرفة ما إذا كان الوضع المحلي/الخاص يناسب طريقة عملك.",
  timeEstimate: "2–3 دقائق",
  resultTitle: "توصية الوضع الخاص لديك",
  ui: AR_QUIZ_UI,
  ...AR_HREFS,
  questions: [
    {
      id: "confidential-docs",
      text: "كم من عملك اليومي يتضمن مستندات سرية؟",
      options: [
        { label: "قليل جداً", points: 0 },
        { label: "بعض الشيء", points: 1 },
        { label: "قدر كبير", points: 2 },
        { label: "معظم ما نتعامل معه سري", points: 3 },
      ],
    },
    {
      id: "client-data",
      text: "ما مدى حساسية بيانات العملاء التي تتعامل معها؟",
      options: [
        { label: "ليست حساسة جداً", points: 0 },
        { label: "حساسة إلى حد ما", points: 1 },
        { label: "حساسة", points: 2 },
        { label: "حساسة جداً أو خاضعة للتنظيم", points: 3 },
      ],
    },
    {
      id: "hr-data",
      text: "هل تتعامل بانتظام مع بيانات الموارد البشرية — الرواتب، التقييمات، المعلومات الشخصية؟",
      options: [
        { label: "نادراً", points: 0 },
        { label: "أحياناً", points: 1 },
        { label: "بانتظام", points: 2 },
        { label: "باستمرار", points: 3 },
      ],
    },
    {
      id: "financial-data",
      text: "كم مرة تتعامل مع مواد حساسة تخص المستثمرين أو المالية أو الاستحواذ؟",
      options: [
        { label: "أبداً", points: 0 },
        { label: "نادراً", points: 1 },
        { label: "أحياناً", points: 2 },
        { label: "بشكل متكرر", points: 3 },
      ],
    },
    {
      id: "cloud-restrictions",
      text: "هل تفرض شركتك أو صناعتك قيوداً على البيانات التي يمكن إرسالها لخدمات سحابية؟",
      options: [
        { label: "لا قيود", points: 0 },
        { label: "إرشادات خفيفة", points: 1 },
        { label: "سياسة رسمية", points: 2 },
        { label: "قيود تنظيمية صارمة", points: 3 },
      ],
    },
    {
      id: "local-first",
      text: "ما مدى أهمية ألا تغادر بعض الملفات جهازك أبداً؟",
      options: [
        { label: "غير مهم", points: 0 },
        { label: "مهم إلى حد ما", points: 1 },
        { label: "مهم", points: 2 },
        { label: "حاسم وغير قابل للتفاوض", points: 3 },
      ],
    },
    {
      id: "compliance",
      text: "هل أنت خاضع لأطر امتثال — مالية أو صحية أو قانونية — بخصوص التعامل مع البيانات؟",
      options: [
        { label: "لا", points: 0 },
        { label: "متطلبات خفيفة", points: 1 },
        { label: "متطلبات رسمية", points: 2 },
        { label: "متطلبات صارمة وخاضعة للتدقيق", points: 3 },
      ],
    },
    {
      id: "cloud-comfort",
      text: "ما مدى ارتياح فريقك للصق بيانات حساسة في أدوات AI سحابية عامة اليوم؟",
      options: [
        { label: "مرتاح جداً، حساسية منخفضة", points: 0 },
        { label: "مرتاح بشكل عام", points: 1 },
        { label: "متردد", points: 2 },
        { label: "غير مرتاح إطلاقاً", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "اختياري",
      badgeVariant: "emerald",
      heading: "الوضع الخاص: اختياري",
      body: "حساسية بياناتك تبدو قابلة للإدارة بسير عمل سحابي قياسي حالياً.",
      recommendation: "الوضع السحابي على الأرجح مناسب الآن — الوضع الخاص متاح متى احتجته.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "موصى به",
      badgeVariant: "gold",
      heading: "الوضع الخاص: موصى به لجزء من عملك",
      body: "جزء من عملك — الموارد البشرية أو المالية أو بيانات العملاء — قد يستفيد من الوضع المحلي/الخاص.",
      recommendation: "فكر في إعداد مختلط: وضع خاص للمواد الحساسة، وسحابي لما تبقى.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "موصى به بشدة",
      badgeVariant: "danger",
      heading: "الوضع الخاص: موصى به بشدة",
      body: "ملف حساسيتك والامتثال لديك يشير بوضوح إلى نهج محلي أولاً وخاص.",
      recommendation: "فعّل Chameleon Eye AI في الوضع المحلي/الخاص بحيث لا تغادر الملفات الحساسة جهازك أبداً.",
    },
  ],
};
