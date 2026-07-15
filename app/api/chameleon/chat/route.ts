// app/api/chameleon/chat/route.ts
// Server-only. All AI calls happen here. API key never reaches the frontend.
// Returns only safe product fields — no model/provider metadata.

import { NextRequest, NextResponse } from "next/server";
import { classifyTask } from "@/lib/ai/taskClassifier";
import { resolveModel } from "@/lib/ai/modelRouter";
import { buildSystemPrompt } from "@/lib/ai/chameleonSystemPrompt";
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

interface OpenRouterResponse {
  choices?: { message?: { content?: string } }[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  model?: string;
}

async function trackUsage(params: {
  model: string;
  requestedModel: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  latencyMs: number;
  status: string;
  source: string;
}) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return;

  const now = new Date().toISOString();
  const startedAt = new Date(Date.now() - params.latencyMs).toISOString();

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/ai_usage_logs`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        provider: "openrouter",
        model: params.model,
        requested_model: params.requestedModel,
        actual_model: params.model,
        started_at: startedAt,
        completed_at: now,
        latency_ms: params.latencyMs,
        input_tokens: params.inputTokens,
        output_tokens: params.outputTokens,
        total_tokens: params.totalTokens,
        request_status: params.status,
        request_source: params.source,
        is_streaming: false,
        is_billable: false,
        provider_cost_micros: 0,
        user_charge_micros: 0,
      }),
    });
  } catch {
    // Usage tracking failure never breaks user requests
  }
}

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

  const latestUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  const taskType = classifyTask(
    latestUserMessage,
    mode,
    locale,
    hasImageAttachment,
    hasDocAttachment,
  );

  const model = resolveModel(taskType);
  const systemPrompt = buildSystemPrompt(taskType, dna, mode, locale);

  const startTime = Date.now();

  // Call OpenRouter directly to capture token usage
  const apiKey = process.env.OPENROUTER_API_KEY;
  const maxTokens = taskType === "fast_answer" || taskType === "onboarding_intro" ? 800 : 1400;
  const temperature = taskType === "risk_review" ? 0.3 : 0.4;

  let rawContent = "";
  let inputTokens = 0;
  let outputTokens = 0;
  let totalTokens = 0;
  let requestStatus = "error";

  try {
    const providerRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://chameleoneye.ai",
        "X-Title": "Chameleon Eye AI",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        max_tokens: maxTokens,
        temperature,
        stream: false,
      }),
    });

    const latencyMs = Date.now() - startTime;

    if (!providerRes.ok) {
      const errText = await providerRes.text();
      void trackUsage({
        model,
        requestedModel: model,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        latencyMs,
        status: "error",
        source: "website_chat",
      });
      return NextResponse.json(
        { error: "Intelligence service temporarily unavailable." },
        { status: 502 },
      );
    }

    const data = (await providerRes.json()) as OpenRouterResponse;
    rawContent = data.choices?.[0]?.message?.content ?? "";

    inputTokens = data.usage?.prompt_tokens ?? 0;
    outputTokens = data.usage?.completion_tokens ?? 0;
    totalTokens = data.usage?.total_tokens ?? (inputTokens + outputTokens);
    requestStatus = rawContent ? "success" : "error";

    void trackUsage({
      model: data.model ?? model,
      requestedModel: model,
      inputTokens,
      outputTokens,
      totalTokens,
      latencyMs,
      status: requestStatus,
      source: "website_chat",
    });

    if (!rawContent) {
      return NextResponse.json(
        { error: "Empty response from intelligence layer." },
        { status: 502 },
      );
    }
  } catch (err) {
    const latencyMs = Date.now() - startTime;
    void trackUsage({
      model,
      requestedModel: model,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      latencyMs,
      status: "error",
      source: "website_chat",
    });
    return NextResponse.json({ error: "Unexpected error." }, { status: 502 });
  }

  const response = formatResponse(rawContent, taskType, mode);

  return NextResponse.json({
    answer: response.answer,
    mode: response.mode,
    taskType: response.taskType,
    createdAt: response.createdAt,
    ...(response.riskLevel ? { riskLevel: response.riskLevel } : {}),
  });
}
