// lib/ai/modelRouter.ts
// Server-side only. Never import from client components.
// Model names stay here — never exposed to the frontend.

import type { TaskType } from "./taskClassifier";

const DEFAULT_MODEL =
  process.env.AI_MODEL_DEFAULT ?? "anthropic/claude-3.5-sonnet";

const MODEL_REGISTRY: Record<TaskType, string> = {
  general_business:        process.env.AI_MODEL_GENERAL_BUSINESS    ?? DEFAULT_MODEL,
  deep_strategy:           process.env.AI_MODEL_DEEP_STRATEGY        ?? DEFAULT_MODEL,
  finance_accounting:      process.env.AI_MODEL_FINANCE_ACCOUNTING   ?? DEFAULT_MODEL,
  legal_compliance_safe:   process.env.AI_MODEL_LEGAL_COMPLIANCE     ?? DEFAULT_MODEL,
  coding_api_product:      process.env.AI_MODEL_CODING_PRODUCT       ?? DEFAULT_MODEL,
  architecture_engineering:process.env.AI_MODEL_ARCHITECTURE         ?? DEFAULT_MODEL,
  document_analysis:       process.env.AI_MODEL_DOCUMENT             ?? DEFAULT_MODEL,
  vision_image_analysis:   process.env.AI_MODEL_VISION               ?? DEFAULT_MODEL,
  marketing_sales:         process.env.AI_MODEL_MARKETING            ?? DEFAULT_MODEL,
  hr_team:                 process.env.AI_MODEL_HR_TEAM              ?? DEFAULT_MODEL,
  risk_review:             process.env.AI_MODEL_RISK_REVIEW          ?? DEFAULT_MODEL,
  arabic_executive:        process.env.AI_MODEL_ARABIC               ?? DEFAULT_MODEL,
  fast_answer:             process.env.AI_MODEL_FAST                 ?? DEFAULT_MODEL,
  fallback_safe:           process.env.AI_MODEL_FALLBACK             ?? DEFAULT_MODEL,
  onboarding_intro:        process.env.AI_MODEL_FAST                 ?? DEFAULT_MODEL,
};

export function resolveModel(taskType: TaskType): string {
  return MODEL_REGISTRY[taskType] ?? DEFAULT_MODEL;
}
