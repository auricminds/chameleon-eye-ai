// lib/ai/providerClient.ts
// Server-side only. Calls OpenRouter. Never imported by client components.

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

type Message = { role: string; content: string };

type ProviderResult =
  | { ok: true; content: string }
  | { ok: false; error: string };

export async function callIntelligenceLayer(
  model: string,
  systemPrompt: string,
  messages: Message[],
  options?: { maxTokens?: number; temperature?: number },
): Promise<ProviderResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Intelligence layer not configured." };
  }

  try {
    const res = await fetch(OPENROUTER_API_URL, {
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
        max_tokens: options?.maxTokens ?? 1400,
        temperature: options?.temperature ?? 0.4,
        stream: false,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Chameleon Intelligence] Provider error:", errText);
      return { ok: false, error: "Intelligence service temporarily unavailable." };
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const content = data.choices?.[0]?.message?.content ?? "";
    if (!content) return { ok: false, error: "Empty response from intelligence layer." };

    return { ok: true, content };
  } catch (err) {
    console.error("[Chameleon Intelligence] Unexpected error:", err);
    return { ok: false, error: "Unexpected error in intelligence layer." };
  }
}
