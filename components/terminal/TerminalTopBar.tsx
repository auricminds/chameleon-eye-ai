"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { translateBusinessDnaValue } from "@/lib/demo/dnaTranslations";
import { DEMO_ROUTES } from "@/lib/demo/routes";

type TerminalTopBarProps = {
  locale: "en" | "ar";
  mode: "terminal" | "archive";
  voiceEnabled?: boolean;
  isListening?: boolean;
  privacyMode?: string;
  onNewSession?: () => void;
  onOpenArchive?: () => void;
  onOpenDna?: () => void;
};

export function TerminalTopBar({
  locale,
  mode,
  voiceEnabled = false,
  isListening = false,
  privacyMode = "",
  onNewSession,
  onOpenArchive,
  onOpenDna,
}: TerminalTopBarProps) {
  const router = useRouter();
  const isArabic = locale === "ar";

  const labels = isArabic
    ? {
        brand: "Chameleon Eye AI",
        terminal: "Chameleon Terminal",
        archive: "الأرشيف",
        dnaActive: "Business DNA مفعل",
        privacy: "وضع الخصوصية",
        voice: "الصوت",
        voiceListening: "يستمع",
        voiceOn: "تشغيل",
        voiceOff: "متوقف",
        newChat: "جلسة جديدة",
        dna: "Business DNA",
        exit: "خروج",
        openTerminal: "Terminal",
        demo:
          "وضع تجريبي — يعمل محلياً داخل المتصفح. لا تدخل معلومات حساسة.",
      }
    : {
        brand: "Chameleon Eye AI",
        terminal: "Chameleon Terminal",
        archive: "Archive",
        dnaActive: "Business DNA Active",
        privacy: "Privacy Mode",
        voice: "Voice",
        voiceListening: "Listening",
        voiceOn: "On",
        voiceOff: "Off",
        newChat: "New Chat",
        dna: "Business DNA",
        exit: "Exit",
        openTerminal: "Terminal",
        demo:
          "Demo mode — local browser only. Do not enter sensitive information.",
      };

  const privacyLabel = translateBusinessDnaValue(privacyMode, locale);
  const exitHref = isArabic ? "/ar" : "/";
  const voiceStatus = isListening
    ? labels.voiceListening
    : voiceEnabled
      ? labels.voiceOn
      : labels.voiceOff;

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="shrink-0">
      <header className="flex h-11 items-center gap-2 border-b border-white/8 bg-panel/90 px-3 backdrop-blur-xl sm:gap-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden truncate text-[11px] font-medium text-muted sm:inline">
            {labels.brand}
          </span>
          <span className="hidden text-muted/40 sm:inline">·</span>
        <span className="truncate text-xs font-semibold text-emerald sm:text-sm">
          {mode === "archive" ? labels.archive : labels.terminal}
        </span>
      </div>

        <div className="hidden items-center gap-2 text-[10px] text-muted md:flex lg:gap-3 lg:text-xs">
          <span>{labels.dnaActive}</span>
          {privacyMode ? (
            <span className="max-w-[140px] truncate lg:max-w-none">
              {labels.privacy}: {privacyLabel}
            </span>
          ) : null}
          {mode === "terminal" ? (
            <span>
              {labels.voice}: {voiceStatus}
            </span>
          ) : null}
        </div>

        <div className="ms-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
          {mode === "terminal" && onNewSession ? (
            <TopBtn onClick={onNewSession} label={labels.newChat} />
          ) : null}
          {mode === "terminal" && onOpenArchive ? (
            <TopBtn onClick={onOpenArchive} label={labels.archive} />
          ) : (
            <Link
              href={DEMO_ROUTES.archive(locale)}
              className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-muted transition-colors hover:border-emerald/30 hover:text-emerald sm:px-2.5 sm:text-xs"
            >
              {labels.archive}
            </Link>
          )}
          {mode === "terminal" && onOpenDna ? (
            <TopBtn onClick={onOpenDna} label={labels.dna} />
          ) : null}
          {mode === "archive" ? (
            <Link
              href={DEMO_ROUTES.terminal(locale)}
              className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-muted transition-colors hover:border-emerald/30 hover:text-emerald sm:px-2.5 sm:text-xs"
            >
              {labels.openTerminal}
            </Link>
          ) : null}
          <LanguageSwitch />
          <button
            type="button"
            onClick={() => router.push(exitHref)}
            className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-muted transition-colors hover:border-gold/30 hover:text-gold sm:px-2.5 sm:text-xs"
          >
            {labels.exit}
          </button>
        </div>
      </header>
      <div className="border-b border-white/5 bg-emerald/[0.02] px-3 py-1">
        <p className="text-center text-[10px] text-muted/80">{labels.demo}</p>
      </div>
    </div>
  );
}

function TopBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-muted transition-colors hover:border-emerald/30 hover:text-emerald sm:px-2.5 sm:text-xs"
    >
      {label}
    </button>
  );
}
