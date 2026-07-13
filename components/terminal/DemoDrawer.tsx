"use client";

import { useEffect } from "react";

type DemoDrawerProps = {
  locale: "en" | "ar";
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function DemoDrawer({ locale, title, onClose, children }: DemoDrawerProps) {
  const isArabic = locale === "ar";
  const closeLabel = isArabic ? "إغلاق" : "Close";

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70]" dir={isArabic ? "rtl" : "ltr"}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-0 flex flex-col bg-panel/95 shadow-2xl backdrop-blur-xl sm:inset-y-0 sm:start-auto sm:end-0 sm:w-full sm:max-w-md sm:border-s sm:border-white/10"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 p-4">
          <h2 className="text-sm font-semibold text-emerald">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-muted transition-colors hover:border-gold/30 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
          >
            {closeLabel}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
