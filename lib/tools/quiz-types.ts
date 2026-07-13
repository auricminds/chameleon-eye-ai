export type QuizOption = {
  label: string;
  points: number;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
};

export type QuizResultLevel = {
  id: "low" | "medium" | "high";
  minPercent: number;
  badge: string;
  badgeVariant: "emerald" | "gold" | "danger";
  heading: string;
  body: string;
  recommendation: string;
};

export type QuizUi = {
  progressTemplate: string;
  nextLabel: string;
  backLabel: string;
  seeResultLabel: string;
  retakeLabel: string;
  scoreLabel: string;
  levelLabel: string;
  recommendedLabel: string;
  ctaSignupLabel: string;
  ctaContactLabel: string;
  backToHubLabel: string;
};

export type QuizConfig = {
  locale: "en" | "ar";
  toolTitle: string;
  toolSubtitle: string;
  timeEstimate: string;
  resultTitle: string;
  questions: QuizQuestion[];
  levels: QuizResultLevel[];
  ui: QuizUi;
  signupHref: string;
  contactHref: string;
  hubHref: string;
};
