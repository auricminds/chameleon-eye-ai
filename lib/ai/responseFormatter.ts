// lib/ai/responseFormatter.ts
// Formats the raw intelligence response into safe product fields only.
// Never exposes provider/model metadata to the frontend.

import type { TaskType } from "./taskClassifier";

export type ChameleonResponse = {
  answer: string;
  mode: string;
  taskType: TaskType;
  createdAt: string;
  // Optional enrichment fields (populated when detectable from answer text)
  riskLevel?: "low" | "medium" | "high" | "critical";
};

export function formatResponse(
  rawContent: string,
  taskType: TaskType,
  mode: string,
): ChameleonResponse {
  const riskLevel = detectRiskLevel(rawContent, taskType);

  return {
    answer: rawContent.trim(),
    mode,
    taskType,
    createdAt: new Date().toISOString(),
    ...(riskLevel ? { riskLevel } : {}),
  };
}

function detectRiskLevel(
  content: string,
  taskType: TaskType,
): "low" | "medium" | "high" | "critical" | undefined {
  // Only surface riskLevel for risk review tasks
  if (taskType !== "risk_review") return undefined;

  const lower = content.toLowerCase();
  if (/risk level.*critical|critical.*risk/i.test(lower)) return "critical";
  if (/risk level.*high|high.*risk/i.test(lower)) return "high";
  if (/risk level.*medium|medium.*risk/i.test(lower)) return "medium";
  if (/risk level.*low|low.*risk/i.test(lower)) return "low";
  return undefined;
}
