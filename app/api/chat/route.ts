import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "anthropic/claude-3.5-sonnet"; // can be changed to any OpenRouter model

function buildSystemPrompt(
  dna: Record<string, unknown> | null,
  mode: string,
  locale: string,
): string {
  const isAr = locale === "ar";

  const identity = isAr
    ? `أنت Chameleon — ذكاء أعمال خاص، وليس مساعداً عاماً.
لا تخمّن. لا تُطمئن بدون أساس. لا تتصرف كروبوت دردشة عام.
أنت تبحث في الأنماط الخفية، الهدر المالي، الإشارات الضعيفة، ومخاطر القرار.`
    : `You are Chameleon — private business intelligence, not a general assistant.
You do not guess. You do not reassure without basis. You do not behave like a general chatbot.
You identify hidden patterns, cash waste, weak signals, and decision risks.`;

  const modeInstructions: Record<string, { en: string; ar: string }> = {
    quick_scan: {
      en: "Focus: quick business scan. Identify the most critical issue fast. Be direct.",
      ar: "التركيز: فحص أعمال سريع. حدد المشكلة الأكثر خطورة بسرعة. كن مباشراً.",
    },
    deep_review: {
      en: "Focus: deep operational review. Look for systemic issues, patterns, and root causes.",
      ar: "التركيز: مراجعة تشغيلية عميقة. ابحث عن مشاكل منهجية وأنماط وأسباب جذرية.",
    },
    cash_waste: {
      en: "Focus: hidden cash waste and value leakage. Where is money leaving quietly?",
      ar: "التركيز: الهدر المالي الخفي. أين يتسرب المال بصمت؟",
    },
    team_effectiveness: {
      en: "Focus: team effectiveness and workflow clarity. Where is ownership unclear or execution weak?",
      ar: "التركيز: فعالية الفريق. أين الملكية غير واضحة أو التنفيذ ضعيف؟",
    },
    customer_journey: {
      en: "Focus: customer journey friction. Where do customers drop off, hesitate, or struggle?",
      ar: "التركيز: احتكاك رحلة العميل. أين يتوقف العملاء أو يترددون؟",
    },
    marketing: {
      en: "Focus: marketing intelligence and message fit. Is spend creating real results?",
      ar: "التركيز: ذكاء التسويق. هل الإنفاق يولد نتائج حقيقية؟",
    },
    operational_risk: {
      en: "Focus: operational risk patterns. What could silently break the business?",
      ar: "التركيز: أنماط المخاطر التشغيلية. ماذا يمكن أن يكسر الأعمال بصمت؟",
    },
    decision_memo: {
      en: "Focus: executive decision support. Give a clear, structured recommendation.",
      ar: "التركيز: دعم القرار التنفيذي. قدم توصية واضحة ومنظمة.",
    },
    api_workflow: {
      en: "Focus: API workflow integration. What structured data or outputs are needed?",
      ar: "التركيز: تكامل سير عمل API. ما البيانات أو المخرجات المنظمة المطلوبة؟",
    },
    private_mode: {
      en: "Focus: local/private analysis. Treat all information as confidential. Suggest what can stay local.",
      ar: "التركيز: التحليل المحلي/الخاص. تعامل مع جميع المعلومات كسرية.",
    },
  };

  const modeText = modeInstructions[mode] ?? modeInstructions.quick_scan;
  const modePrompt = isAr ? modeText.ar : modeText.en;

  let dnaContext = "";
  if (dna) {
    dnaContext = isAr
      ? `\n\nSياق Business DNA للمستخدم:
- الدور: ${dna.role ?? "غير محدد"}
- نوع العمل: ${dna.businessType ?? "غير محدد"}
- الهدف الرئيسي: ${dna.mainGoal ?? "غير محدد"}
- أكبر القلق: ${dna.biggestConcern ?? "غير محدد"}
- أسلوب القرار: ${dna.decisionStyle ?? "غير محدد"}
- تفضيل المخرجات: ${dna.outputPreference ?? "غير محدد"}
- مستوى الخصوصية: ${dna.privacyMode ?? "غير محدد"}
- الوسوم الذكية: ${Array.isArray(dna.intelligenceTags) ? (dna.intelligenceTags as string[]).join(", ") : "لا يوجد"}`
      : `\n\nUser Business DNA context:
- Role: ${dna.role ?? "unspecified"}
- Business type: ${dna.businessType ?? "unspecified"}
- Main goal: ${dna.mainGoal ?? "unspecified"}
- Biggest concern: ${dna.biggestConcern ?? "unspecified"}
- Decision style: ${dna.decisionStyle ?? "unspecified"}
- Output preference: ${dna.outputPreference ?? "unspecified"}
- Privacy mode: ${dna.privacyMode ?? "unspecified"}
- Intelligence tags: ${Array.isArray(dna.intelligenceTags) ? (dna.intelligenceTags as string[]).join(", ") : "none"}`;
  }

  const responseFormat = isAr
    ? `\n\nشكل الإجابة:
1. الإجابة المباشرة (جملة أو اثنتان)
2. ما أراه (الإشارة الخفية أو النمط)
3. الخطر الخفي (إذا وجد)
4. المعلومات الناقصة (قائمة موجزة)
5. الإجراء المقترح

كن موجزاً. لا حشو. لا مقدمات. اذهب مباشرة إلى جوهر المسألة.`
    : `\n\nResponse format:
1. Direct Answer (one or two sentences)
2. What I See (the hidden signal or pattern)
3. Hidden Risk (if any)
4. Missing Facts (short list)
5. Recommended Action

Be concise. No filler. No preamble. Go straight to the point.`;

  return `${identity}\n\n${modePrompt}${dnaContext}${responseFormat}`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service not configured." },
      { status: 503 },
    );
  }

  let body: {
    messages: { role: string; content: string }[];
    dna?: Record<string, unknown> | null;
    mode?: string;
    locale?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { messages, dna = null, mode = "quick_scan", locale = "en" } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const systemPrompt = buildSystemPrompt(dna, mode, locale);

  try {
    const res = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://chameleoneye.ai",
        "X-Title": "Chameleon Eye AI",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        max_tokens: 1200,
        temperature: 0.4,
        stream: false,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("OpenRouter error:", errText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable." },
        { status: 502 },
      );
    }

    const data = await res.json() as {
      choices: { message: { content: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
