import { apiKeyRiskCheckAr, apiKeyRiskCheckEn } from "./api-key-risk-check";
import { cashWasteScannerAr, cashWasteScannerEn } from "./cash-waste-scanner";
import {
  customerJourneyFrictionTestAr,
  customerJourneyFrictionTestEn,
} from "./customer-journey-friction-test";
import { marketingWasteTestAr, marketingWasteTestEn } from "./marketing-waste-test";
import { privateModeReadinessTestAr, privateModeReadinessTestEn } from "./private-mode-readiness-test";
import { teamEffectivenessCheckAr, teamEffectivenessCheckEn } from "./team-effectiveness-check";
import type { QuizConfig } from "../quiz-types";

export type FreeToolListItem = {
  slug: string;
  config: QuizConfig;
};

export const FREE_TOOLS_EN: FreeToolListItem[] = [
  { slug: "cash-waste-scanner", config: cashWasteScannerEn },
  { slug: "team-effectiveness-check", config: teamEffectivenessCheckEn },
  { slug: "marketing-waste-test", config: marketingWasteTestEn },
  { slug: "customer-journey-friction-test", config: customerJourneyFrictionTestEn },
  { slug: "api-key-risk-check", config: apiKeyRiskCheckEn },
  { slug: "private-mode-readiness-test", config: privateModeReadinessTestEn },
];

export const FREE_TOOLS_AR: FreeToolListItem[] = [
  { slug: "cash-waste-scanner", config: cashWasteScannerAr },
  { slug: "team-effectiveness-check", config: teamEffectivenessCheckAr },
  { slug: "marketing-waste-test", config: marketingWasteTestAr },
  { slug: "customer-journey-friction-test", config: customerJourneyFrictionTestAr },
  { slug: "api-key-risk-check", config: apiKeyRiskCheckAr },
  { slug: "private-mode-readiness-test", config: privateModeReadinessTestAr },
];
