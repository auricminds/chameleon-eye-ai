import type { QuizUi } from "./quiz-types";

export const EN_QUIZ_UI: QuizUi = {
  progressTemplate: "Question {n} of {total}",
  nextLabel: "Next",
  backLabel: "Back",
  seeResultLabel: "See Result",
  retakeLabel: "Retake",
  scoreLabel: "Your score",
  levelLabel: "Risk level",
  recommendedLabel: "Recommended",
  ctaSignupLabel: "Start Free",
  ctaContactLabel: "Talk to Us",
  backToHubLabel: "Back to Free Tools",
};

export const AR_QUIZ_UI: QuizUi = {
  progressTemplate: "السؤال {n} من {total}",
  nextLabel: "التالي",
  backLabel: "السابق",
  seeResultLabel: "عرض النتيجة",
  retakeLabel: "إعادة الاختبار",
  scoreLabel: "نتيجتك",
  levelLabel: "مستوى الخطر",
  recommendedLabel: "موصى به",
  ctaSignupLabel: "ابدأ مجاناً",
  ctaContactLabel: "تواصل معنا",
  backToHubLabel: "العودة إلى الأدوات المجانية",
};

export const EN_HREFS = { signupHref: "/signup", contactHref: "/contact", hubHref: "/free-tools" };
export const AR_HREFS = { signupHref: "/ar/signup", contactHref: "/ar/contact", hubHref: "/ar/free-tools" };
