"use client";

import Link from "next/link";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { DEMO_ROUTES } from "@/lib/demo/routes";

type AppWorkspaceTopBarProps = {
  locale: "en" | "ar";
  /** e.g. Business DNA Settings */
  pageTitle: string;
  backHref?: string;
  backLabel?: string;
};

export function AppWorkspaceTopBar({
  locale,
  pageTitle,
  backHref,
  backLabel,
}: AppWorkspaceTopBarProps) {
  const isArabic = locale === "ar";
  const labels = isArabic
    ? {
        brand: "Chameleon Eye AI",
        demo:
          "وضع تجريبي — يعمل محلياً داخل المتصفح. لا تدخل معلومات حساسة.",
      }
    : {
        brand: "Chameleon Eye AI",
        demo:
          "Demo mode — local browser only. Do not enter sensitive information.",
      };

  const terminalHref = DEMO_ROUTES.terminal(locale);
  const href = backHref ?? terminalHref;

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="shrink-0">
      <header className="flex h-11 items-center gap-2 border-b border-white/8 bg-panel/90 px-3 backdrop-blur-xl sm:gap-3 sm:px-4">
        {backLabel ? (
          <Link
            href={href}
            className="shrink-0 rounded-lg border border-white/10 px-2.5 py-1 text-[10px] text-muted transition-colors hover:border-emerald/30 hover:text-emerald sm:text-xs"
          >
            {isArabic ? "→" : "←"} {backLabel}
          </Link>
        ) : null}

        <span className="hidden truncate text-[11px] font-medium text-muted sm:inline">
          {labels.brand}
        </span>
        {pageTitle ? (
          <>
            <span className="hidden text-muted/40 sm:inline">·</span>
            <span className="truncate text-xs font-semibold text-emerald sm:text-sm">
              {pageTitle}
            </span>
          </>
        ) : null}

        <div className="ms-auto shrink-0">
          <LanguageSwitch />
        </div>
      </header>
      <div className="border-b border-white/5 bg-emerald/[0.02] px-3 py-1">
        <p className="text-center text-[10px] text-muted/80">{labels.demo}</p>
      </div>
    </div>
  );
}
