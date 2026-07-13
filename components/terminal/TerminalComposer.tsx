"use client";

import { INTELLIGENCE_MODES } from "@/lib/demo/chameleonResponse";
import type { IntelligenceMode } from "@/lib/demo/types";
import { VoicePanel, type VoiceControlsHandle } from "./VoiceControls";
import type { RefObject } from "react";

type TerminalComposerProps = {
  locale: "en" | "ar";
  mode: IntelligenceMode;
  onModeChange: (mode: IntelligenceMode) => void;
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  onGenerateReport: () => void;
  onSaveDecision: () => void;
  onCreateRiskReview: () => void;
  onSaveToArchive: () => void;
  onAttach: () => void;
  voiceEnabled: boolean;
  onVoiceToggle: (v: boolean) => void;
  onListeningChange?: (listening: boolean) => void;
  voiceRef?: RefObject<VoiceControlsHandle | null>;
  lastReplyText?: string;
  sending?: boolean;
  voiceExpanded?: boolean;
  isListening?: boolean;
};

export function TerminalComposer({
  locale,
  mode,
  onModeChange,
  input,
  onInputChange,
  onSend,
  onGenerateReport,
  onSaveDecision,
  onCreateRiskReview,
  onSaveToArchive,
  onAttach,
  voiceEnabled,
  onVoiceToggle,
  onListeningChange,
  voiceRef,
  lastReplyText,
  sending,
  voiceExpanded = false,
  isListening = false,
}: TerminalComposerProps) {
  const isArabic = locale === "ar";
  const labels = isArabic
    ? {
        placeholder: "اسأل Chameleon عمّا تخفيه أعمالك...",
        send: "إرسال",
        report: "إنشاء تقرير",
        decision: "تسجيل قرار",
        risk: "إنشاء مراجعة مخاطر",
        save: "حفظ في الأرشيف",
        attach: "ملف",
        mic: "الصوت",
        micListening: "يستمع",
      }
    : {
        placeholder: "Ask Chameleon what your business is hiding...",
        send: "Send",
        report: "Generate Report",
        decision: "Mark Decision",
        risk: "Create Risk Review",
        save: "Save to Archive",
        attach: "Attach",
        mic: "Mic",
        micListening: "Listening",
      };

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  function toggleMic() {
    voiceRef?.current?.toggleListening();
  }

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="shrink-0 border-t border-white/8 bg-panel/90 px-3 py-3 backdrop-blur-xl sm:px-4 terminal-composer-safe"
    >
      <div className="mx-auto w-full max-w-[780px]">
        <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {INTELLIGENCE_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs transition-colors ${
                mode === m.id
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-white/10 text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              {isArabic ? m.labelAr : m.labelEn}
            </button>
          ))}
        </div>

        <VoicePanel
          ref={voiceRef}
          locale={locale}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={onVoiceToggle}
          transcript={input}
          onTranscriptChange={onInputChange}
          onSendTranscript={onSend}
          onListeningChange={onListeningChange}
          lastReplyText={lastReplyText}
          expanded={voiceExpanded}
        />

        <div className="mt-2 flex gap-2">
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={labels.placeholder}
            rows={3}
            disabled={sending}
            className="min-h-[52px] flex-1 resize-none rounded-2xl border border-white/10 bg-background/90 px-4 py-3.5 text-sm text-foreground outline-none focus:border-emerald/40 disabled:opacity-50 sm:text-base"
          />
          <div className="flex shrink-0 flex-col gap-2">
            <button
              type="button"
              onClick={onAttach}
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-muted hover:text-foreground"
              title={labels.attach}
            >
              📎
            </button>
            <button
              type="button"
              onClick={toggleMic}
              className={`rounded-xl border px-3 py-2 text-xs transition-colors ${
                isListening
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-white/10 text-muted hover:text-emerald"
              }`}
              title={isListening ? labels.micListening : labels.mic}
            >
              {isListening ? "🎙" : "🎤"}
            </button>
            <button
              type="button"
              onClick={onSend}
              disabled={sending || !input.trim()}
              className="rounded-xl border border-emerald/30 bg-emerald px-4 py-2 text-sm font-medium text-background disabled:opacity-40"
            >
              {labels.send}
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <ActionBtn onClick={onGenerateReport} label={labels.report} />
          <ActionBtn onClick={onSaveDecision} label={labels.decision} />
          <ActionBtn onClick={onCreateRiskReview} label={labels.risk} />
          <ActionBtn onClick={onSaveToArchive} label={labels.save} />
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted transition-colors hover:border-gold/30 hover:text-gold"
    >
      {label}
    </button>
  );
}
