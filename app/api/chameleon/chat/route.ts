// app/api/chameleon/chat/route.ts
// Server-only. All AI calls happen here. API key never reaches the frontend.
// Returns only safe product fields — no model/provider metadata.

import { NextRequest, NextResponse } from "next/server";
import { classifyTask } from "@/lib/ai/taskClassifier";
import { resolveModel } from "@/lib/ai/modelRouter";
import { buildSystemPrompt } from "@/lib/ai/chameleonSystemPrompt";
import { callIntelligenceLayer } from "@/lib/ai/providerClient";
import { formatResponse } from "@/lib/ai/responseFormatter";

export const runtime = "nodejs";

type RequestBody = {
  messages: { role: string; content: string }[];
  dna?: Record<string, unknown> | null;
  mode?: string;
  locale?: string;
  hasImageAttachment?: boolean;
  hasDocAttachment?: boolean;
};

export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "Intelligence service not configured." },
      { status: 503 },
    );
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const {
    messages,
    dna = null,
    mode = "quick_scan",
    locale = "en",
    hasImageAttachment = false,
    hasDocAttachment = false,
  } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  // Classify the task from the latest user message
  const latestUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  const taskType = classifyTask(
    latestUserMessage,
    mode,
    locale,
    hasImageAttachment,
    hasDocAttachment,
  );

  // Resolve the internal intelligence route (never sent to frontend)
  const model = resolveModel(taskType);

  // Build the Chameleon system prompt
  const systemPrompt = buildSystemPrompt(taskType, dna, mode, locale);

  // Call the intelligence layer
  const result = await callIntelligenceLayer(model, systemPrompt, messages, {
    maxTokens: taskType === "fast_answer" || taskType === "onboarding_intro" ? 800 : 1400,
    temperature: taskType === "risk_review" ? 0.3 : 0.4,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: 502 },
    );
  }

  // Format and return — no provider/model metadata exposed
  const response = formatResponse(result.content, taskType, mode);

  // Return safe product fields only
  return NextResponse.json({
    answer: response.answer,
    mode: response.mode,
    taskType: response.taskType,
    createdAt: response.createdAt,
    ...(response.riskLevel ? { riskLevel: response.riskLevel } : {}),
  });
}
