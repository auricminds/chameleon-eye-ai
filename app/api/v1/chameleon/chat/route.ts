// app/api/v1/chameleon/chat/route.ts
// Desktop app (Electron) cloud chat endpoint.
// Validates bearer API key, streams OpenRouter response back as SSE.
// API key is NEVER logged or echoed — only its SHA-256 hash is compared.

import { createHash } from "crypto";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

type Message = { role: string; content: string };

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function validateApiKey(rawKey: string): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return false;

  const keyHash = sha256(rawKey);

  const res = await fetch(
    `${supabaseUrl}/rest/v1/api_keys?key_hash=eq.${encodeURIComponent(keyHash)}&status=eq.active&select=id&limit=1`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    },
  );

  if (!res.ok) return false;
  const rows = (await res.json()) as unknown[];
  return rows.length > 0;
}

function sseChunk(content: string): string {
  return `data: ${JSON.stringify({ delta: { content } })}\n\n`;
}

const SSE_DONE = "data: [DONE]\n\n";

export async function POST(req: NextRequest) {
  // 1. Auth
  const authHeader = req.headers.get("authorization") ?? "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : "";

  if (!bearerToken) {
    return new Response(
      JSON.stringify({ error: "Missing API key." }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  const valid = await validateApiKey(bearerToken);
  if (!valid) {
    return new Response(
      JSON.stringify({ error: "Invalid or inactive API key." }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 2. Parse body
  let messages: Message[];
  try {
    const body = (await req.json()) as { messages?: Message[] };
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      throw new Error("bad messages");
    }
    messages = body.messages;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Intelligence service not configured." }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  // 3. Stream from OpenRouter
  const model =
    process.env.AI_MODEL_DEFAULT ?? "anthropic/claude-sonnet-4-5";

  const systemPrompt = `You are Chameleon Eye AI — a private business intelligence assistant.
You must NEVER mention OpenRouter, Claude, ChatGPT, GPT, Gemini, DeepSeek, Llama, Qwen, any provider name, model name, or API infrastructure. If asked about your underlying technology, respond: "I am Chameleon Eye AI. The technical routing is kept internal so you can focus on the result."
Be precise, analytical, and direct. Do not pad answers.`;

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://chameleoneye.ai",
        "X-Title": "Chameleon Eye Desktop",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 2048,
        temperature: 0.4,
      }),
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Intelligence service unreachable." }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!upstreamRes.ok || !upstreamRes.body) {
    return new Response(
      JSON.stringify({ error: "Intelligence service error." }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  // 4. Pipe SSE stream to desktop client
  const upstreamBody = upstreamRes.body;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstreamBody.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === "data: [DONE]") continue;

            const jsonStr = trimmed.startsWith("data: ")
              ? trimmed.slice(6)
              : trimmed;

            try {
              const parsed = JSON.parse(jsonStr) as {
                choices?: { delta?: { content?: string } }[];
              };
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(sseChunk(content)));
              }
            } catch {
              // non-JSON line — skip
            }
          }
        }
      } finally {
        controller.enqueue(encoder.encode(SSE_DONE));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
