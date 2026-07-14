"use client";

import type { TerminalMessage } from "@/lib/demo/types";
import { isWelcomeContent } from "@/lib/demo/dnaTranslations";
import { ChameleonWelcome } from "./ChameleonWelcome";
import { ReportCard } from "./ReportCard";
import { RiskReviewCard } from "./RiskReviewCard";

type MessageBubbleProps = {
  message: TerminalMessage;
  locale: "en" | "ar";
  isAnalyzing?: boolean;
  onSend?: (text: string) => void;
};

export function MessageBubble({ message, locale, isAnalyzing, onSend }: MessageBubbleProps) {
  const isArabic = locale === "ar";
  const isUser = message.role === "user";

  if (isAnalyzing) {
    return (
      <div className="flex justify-center px-4">
        <div className="flex max-w-md gap-3 rounded-2xl border border-emerald/20 bg-panel2/80 px-4 py-3 backdrop-blur-sm">
          <ChameleonEye small />
          <div>
            <p className="text-sm text-muted">
              {isArabic
                ? "Chameleon يحلل المؤشرات الضعيفة..."
                : "Chameleon is analyzing weak signals..."}
            </p>
            <span className="terminal-scan mt-2 inline-block h-1 w-24 rounded-full bg-emerald/30" />
          </div>
        </div>
      </div>
    );
  }

  if (!isUser && isWelcomeContent(message.content)) {
    return <ChameleonWelcome locale={locale} onSend={onSend} />;
  }

  return (
    <div
      className={`flex px-4 ${isUser ? (isArabic ? "justify-start" : "justify-end") : "justify-start"}`}
    >
      <div
        className={`w-full max-w-[780px] ${isUser ? (isArabic ? "me-auto max-w-lg" : "ms-auto max-w-lg") : ""}`}
      >
        {!isUser ? (
          <div className="mb-2 flex items-center gap-2">
            <ChameleonEye small />
            <span className="text-[10px] font-medium uppercase tracking-wider text-emerald">
              Chameleon
            </span>
          </div>
        ) : null}
        {isUser ? (
          <div className="rounded-2xl rounded-tr-sm border border-gold/20 bg-gold/5 px-4 py-3">
            <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
              {message.content}
            </p>
          </div>
        ) : message.riskReview ? (
          <RiskReviewCard review={message.riskReview} locale={locale} />
        ) : message.structured ? (
          <ReportCard response={message.structured} locale={locale} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-panel2/70 px-4 py-3 backdrop-blur-sm">
            <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
              {message.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChameleonEye({ small }: { small?: boolean }) {
  const size = small ? "h-7 w-7" : "h-8 w-8";
  const dot = small ? "h-2 w-2" : "h-2.5 w-2.5";
  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border border-emerald/30 bg-emerald/10`}
      aria-hidden
    >
      <div className={`${dot} rounded-full bg-emerald shadow-[0_0_12px_rgba(31,174,130,0.6)]`} />
    </div>
  );
}
