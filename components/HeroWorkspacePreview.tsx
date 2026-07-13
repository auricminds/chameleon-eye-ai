"use client";

import { useState } from "react";
import { HERO_PROMPTS } from "@/lib/constants";
import { AR_HERO_PROMPTS } from "@/lib/i18n/ar";
import type { Locale } from "@/lib/i18n/locale";
import { Badge } from "./Badge";
import { Card } from "./Card";

type HeroWorkspacePreviewProps = {
  locale?: Locale;
};

export function HeroWorkspacePreview({ locale = "en" }: HeroWorkspacePreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isArabic = locale === "ar";
  const prompts = isArabic ? AR_HERO_PROMPTS : HERO_PROMPTS;
  const preview = prompts[activeIndex].preview;

  const labels = isArabic
    ? {
        workspace: "مساحة عمل Chameleon Eye AI",
        placeholder: "اسأل Chameleon Eye…",
        preview: "معاينة التقرير",
        riskLevel: "مستوى الخطر",
        signals: "الإشارات المكتشفة",
        nextAction: "الإجراء التالي",
      }
    : {
        workspace: "Chameleon Eye AI Workspace",
        placeholder: "Ask Chameleon Eye…",
        preview: "Report Preview",
        riskLevel: "Risk Level",
        signals: "Detected Signals",
        nextAction: "Next Action",
      };

  return (
    <Card className="overflow-hidden border-emerald/20 bg-panel2 p-0 shadow-[0_0_60px_rgba(31,174,130,0.12)]">
      <div className="border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">{labels.workspace}</p>
      </div>

      <div className="space-y-4 p-5">
        <div className="rounded-xl border border-white/8 bg-background/60 px-4 py-3 text-sm text-muted">
          {labels.placeholder}
        </div>

        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt, index) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A] ${
                activeIndex === index
                  ? "border-emerald/40 bg-emerald/15 text-emerald"
                  : "border-white/10 bg-white/5 text-muted hover:border-emerald/20 hover:text-foreground"
              }`}
            >
              {prompt.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-emerald/20 bg-background/80 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground">{labels.preview}</p>
            <Badge variant="gold">
              {labels.riskLevel}: {preview.riskLevel}
            </Badge>
          </div>
          <p className="text-xs font-medium tracking-wide text-emerald uppercase">
            {labels.signals}
          </p>
          <ul className="ar-list mt-2 space-y-1.5">
            {preview.signals.map((signal) => (
              <li key={signal} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                <span className="flex-1">{signal}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-white/8 pt-4">
            <p className="text-xs font-medium tracking-wide text-gold uppercase">
              {labels.nextAction}
            </p>
            <p className="mt-1 text-sm leading-6 text-foreground">
              {preview.nextAction}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
