// app/api/chat/route.ts
// Compatibility shim — forwards to the new Chameleon intelligence route.
// The terminal now calls /api/chameleon/chat directly.

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Map old { content } response shape to new route, then re-map back
  const origin = req.nextUrl.origin;
  const upstream = await fetch(`${origin}/api/chameleon/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await upstream.json() as { answer?: string; error?: string };

  if (!upstream.ok) {
    return NextResponse.json({ error: data.error ?? "Service error." }, { status: upstream.status });
  }

  // Old callers expect { content: string }
  return NextResponse.json({ content: data.answer ?? "" });
}
