export type DnaOption = {
  label: string;
  tags: string[];
};

export type DnaQuestion = {
  id: string;
  text: string;
  options: DnaOption[];
};

export type DnaFocusMap = Record<string, { label: string; reportLabel: string; toolSlug: string }>;

export type DnaUi = {
  progressTemplate: string;
  nextLabel: string;
  backLabel: string;
  seeResultLabel: string;
  disclaimer: string;
  resultReadyHeading: string;
  roleLabel: string;
  mainFocusLabel: string;
  preferredStyleLabel: string;
  privacyModeLabel: string;
  recommendedStartLabel: string;
  tagsHeading: string;
  aiInstructionHeading: string;
  startScanCta: string;
  tryToolsCta: string;
  requestDemoCta: string;
  editDnaCta: string;
};

export type DnaConfig = {
  locale: "en" | "ar";
  toolTitle: string;
  toolSubtitle: string;
  questions: DnaQuestion[];
  ui: DnaUi;
  focusMap: DnaFocusMap;
  tagLabels: Record<string, string>;
  hrefs: {
    freeToolsHub: string;
    contact: string;
    freeToolsBase: string;
  };
};
