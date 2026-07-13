import { AR_HREFS, AR_QUIZ_UI, EN_HREFS, EN_QUIZ_UI } from "../common-ui";
import type { QuizConfig } from "../quiz-types";

export const apiKeyRiskCheckEn: QuizConfig = {
  locale: "en",
  toolTitle: "API Key Risk Check",
  toolSubtitle: "8 quick questions to estimate how exposed your API keys and AI integrations are.",
  timeEstimate: "2–3 minutes",
  resultTitle: "Your API Key Exposure Risk",
  ui: EN_QUIZ_UI,
  ...EN_HREFS,
  questions: [
    {
      id: "frontend-calls",
      text: "Do any of your apps call AI or LLM providers directly from frontend/client code?",
      options: [
        { label: "No, always through our backend", points: 0 },
        { label: "Rarely, being phased out", points: 1 },
        { label: "Sometimes", points: 2 },
        { label: "Yes, frequently", points: 3 },
      ],
    },
    {
      id: "exposed-keys",
      text: "Could any of your API keys be visible in browser network requests or app binaries?",
      options: [
        { label: "No, verified", points: 0 },
        { label: "Unlikely", points: 1 },
        { label: "Not sure", points: 2 },
        { label: "Possibly yes", points: 3 },
      ],
    },
    {
      id: "master-key-desktop",
      text: "Do your desktop or mobile apps embed a master or production API key?",
      options: [
        { label: "Never", points: 0 },
        { label: "No, we use scoped tokens", points: 1 },
        { label: "Not sure", points: 2 },
        { label: "Yes", points: 3 },
      ],
    },
    {
      id: "short-lived-tokens",
      text: "Do you use short-lived tokens or device activation instead of permanent keys?",
      options: [
        { label: "Yes, always", points: 0 },
        { label: "Mostly", points: 1 },
        { label: "Rarely", points: 2 },
        { label: "No, we use permanent keys", points: 3 },
      ],
    },
    {
      id: "backend-proxy",
      text: "Do all third-party AI or API calls route through your own backend?",
      options: [
        { label: "Yes, always", points: 0 },
        { label: "Mostly", points: 1 },
        { label: "Partially", points: 2 },
        { label: "No, some calls go direct", points: 3 },
      ],
    },
    {
      id: "rate-limits",
      text: "Do you enforce rate limits per user or device on sensitive endpoints?",
      options: [
        { label: "Yes, comprehensive", points: 0 },
        { label: "Mostly", points: 1 },
        { label: "Limited", points: 2 },
        { label: "No rate limits", points: 3 },
      ],
    },
    {
      id: "revocation",
      text: "If a device or account is compromised, can you revoke its access immediately?",
      options: [
        { label: "Yes, instantly", points: 0 },
        { label: "Yes, with some delay", points: 1 },
        { label: "It's a manual, slow process", points: 2 },
        { label: "We have no way to revoke access", points: 3 },
      ],
    },
    {
      id: "keys-in-source",
      text: "How confident are you that no API keys have ever been committed to source control or shared over chat or email?",
      options: [
        { label: "Fully confident, we scan for this", points: 0 },
        { label: "Fairly confident", points: 1 },
        { label: "Not sure", points: 2 },
        { label: "We know it's happened", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "Low",
      badgeVariant: "emerald",
      heading: "Low API Key Exposure Risk",
      body: "Your key handling, backend proxying, and revocation controls look solid right now.",
      recommendation: "A periodic API security review can confirm this stays true as you add new integrations.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "Medium",
      badgeVariant: "gold",
      heading: "Medium API Key Exposure Risk",
      body: "Some gaps exist — likely around token lifetime, rate limits, or device revocation.",
      recommendation: "An API security review can close these gaps before they become an incident.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "High",
      badgeVariant: "danger",
      heading: "High API Key Exposure Risk",
      body: "Multiple strong signals point to real exposure — likely direct frontend calls or embedded master keys.",
      recommendation: "Review this immediately. Chameleon Eye's own backend-proxy pattern is a useful reference architecture.",
    },
  ],
};

export const apiKeyRiskCheckAr: QuizConfig = {
  locale: "ar",
  toolTitle: "فحص مخاطر مفاتيح API",
  toolSubtitle: "8 أسئلة سريعة لتقدير مدى تعرض مفاتيح API وتكاملات AI لديك للخطر.",
  timeEstimate: "2–3 دقائق",
  resultTitle: "مستوى تعرض مفاتيح API لديك للخطر",
  ui: AR_QUIZ_UI,
  ...AR_HREFS,
  questions: [
    {
      id: "frontend-calls",
      text: "هل تستدعي أي من تطبيقاتك مزودي AI أو LLM مباشرة من كود الواجهة الأمامية؟",
      options: [
        { label: "لا، دائماً عبر الخادم الخلفي", points: 0 },
        { label: "نادراً، ويتم التخلص منه تدريجياً", points: 1 },
        { label: "أحياناً", points: 2 },
        { label: "نعم، بشكل متكرر", points: 3 },
      ],
    },
    {
      id: "exposed-keys",
      text: "هل يمكن أن تكون أي من مفاتيح API لديك مرئية في طلبات الشبكة بالمتصفح أو داخل ملفات التطبيق؟",
      options: [
        { label: "لا، تم التحقق من ذلك", points: 0 },
        { label: "غير مرجح", points: 1 },
        { label: "غير متأكدين", points: 2 },
        { label: "ربما نعم", points: 3 },
      ],
    },
    {
      id: "master-key-desktop",
      text: "هل تحتوي تطبيقاتك لسطح المكتب أو الجوال على مفتاح API رئيسي أو للإنتاج؟",
      options: [
        { label: "أبداً", points: 0 },
        { label: "لا، نستخدم رموزاً محدودة النطاق", points: 1 },
        { label: "غير متأكدين", points: 2 },
        { label: "نعم", points: 3 },
      ],
    },
    {
      id: "short-lived-tokens",
      text: "هل تستخدم رموزاً قصيرة المدة أو تفعيل الجهاز بدلاً من مفاتيح دائمة؟",
      options: [
        { label: "نعم، دائماً", points: 0 },
        { label: "في الغالب", points: 1 },
        { label: "نادراً", points: 2 },
        { label: "لا، نستخدم مفاتيح دائمة", points: 3 },
      ],
    },
    {
      id: "backend-proxy",
      text: "هل تمر كل استدعاءات AI أو API الخارجية عبر خادمك الخلفي الخاص؟",
      options: [
        { label: "نعم، دائماً", points: 0 },
        { label: "في الغالب", points: 1 },
        { label: "جزئياً", points: 2 },
        { label: "لا، بعض الاستدعاءات مباشرة", points: 3 },
      ],
    },
    {
      id: "rate-limits",
      text: "هل تطبّق حدوداً لمعدل الطلبات لكل مستخدم أو جهاز على نقاط النهاية الحساسة؟",
      options: [
        { label: "نعم، شاملة", points: 0 },
        { label: "في الغالب", points: 1 },
        { label: "محدودة", points: 2 },
        { label: "لا توجد حدود", points: 3 },
      ],
    },
    {
      id: "revocation",
      text: "إذا تعرض جهاز أو حساب للاختراق، هل يمكنك إلغاء وصوله فوراً؟",
      options: [
        { label: "نعم، فوراً", points: 0 },
        { label: "نعم، مع بعض التأخير", points: 1 },
        { label: "عملية يدوية وبطيئة", points: 2 },
        { label: "لا توجد لدينا طريقة لإلغاء الوصول", points: 3 },
      ],
    },
    {
      id: "keys-in-source",
      text: "ما مدى ثقتك بأن مفاتيح API لم تُرفع أبداً إلى مستودع الكود أو تُشارك عبر الدردشة أو البريد؟",
      options: [
        { label: "واثقون تماماً، نفحص ذلك", points: 0 },
        { label: "واثقون إلى حد كبير", points: 1 },
        { label: "غير متأكدين", points: 2 },
        { label: "نعلم أن ذلك حدث", points: 3 },
      ],
    },
  ],
  levels: [
    {
      id: "low",
      minPercent: 0,
      badge: "منخفض",
      badgeVariant: "emerald",
      heading: "تعرض منخفض لمفاتيح API",
      body: "التعامل مع المفاتيح، وحماية الخادم الخلفي، وضوابط الإلغاء تبدو قوية حالياً.",
      recommendation: "مراجعة أمان API دورية يمكن أن تؤكد استمرار ذلك مع إضافة تكاملات جديدة.",
    },
    {
      id: "medium",
      minPercent: 40,
      badge: "متوسط",
      badgeVariant: "gold",
      heading: "تعرض متوسط لمفاتيح API",
      body: "توجد بعض الفجوات — على الأرجح في عمر الرموز، أو حدود المعدل، أو إلغاء وصول الأجهزة.",
      recommendation: "مراجعة أمان API يمكن أن تغلق هذه الفجوات قبل أن تتحول إلى حادثة.",
    },
    {
      id: "high",
      minPercent: 70,
      badge: "مرتفع",
      badgeVariant: "danger",
      heading: "تعرض مرتفع لمفاتيح API",
      body: "إشارات قوية متعددة تشير إلى تعرض حقيقي — على الأرجح استدعاءات مباشرة من الواجهة أو مفاتيح رئيسية مضمّنة.",
      recommendation: "راجع هذا فوراً. نمط حماية الخادم الخلفي الخاص بـ Chameleon Eye مرجع معماري مفيد.",
    },
  ],
};
