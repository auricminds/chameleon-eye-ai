"use client";

import { clearAllDemoData, clearDemoUser } from "@/lib/demo/storage";

type SignOutModalProps = {
  locale: "en" | "ar";
  open: boolean;
  onClose: () => void;
  onSignedOut: () => void;
};

export function SignOutModal({ locale, open, onClose, onSignedOut }: SignOutModalProps) {
  if (!open) return null;

  const isArabic = locale === "ar";
  const copy = isArabic
    ? {
        title: "تسجيل الخروج من مساحة التجربة؟",
        body: "يمكن أن يبقى Business DNA والأرشيف محفوظين في هذا المتصفح.",
        signOutOnly: "تسجيل الخروج فقط",
        clearAll: "حذف كل بيانات التجربة",
        cancel: "إلغاء",
      }
    : {
        title: "Sign out of demo workspace?",
        body: "Your Business DNA and Archive can stay saved in this browser.",
        signOutOnly: "Sign out only",
        clearAll: "Clear all demo data",
        cancel: "Cancel",
      };

  function signOutOnly() {
    clearDemoUser();
    onSignedOut();
    onClose();
  }

  function clearAll() {
    clearAllDemoData();
    onSignedOut();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="relative max-w-md rounded-2xl border border-white/10 bg-panel2 p-6"
      >
        <h3 className="text-lg font-semibold text-foreground">{copy.title}</h3>
        <p className="mt-2 text-sm text-muted">{copy.body}</p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={signOutOnly}
            className="rounded-xl border border-emerald/30 bg-emerald/10 px-4 py-2.5 text-sm font-medium text-emerald"
          >
            {copy.signOutOnly}
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-2.5 text-sm text-red-400"
          >
            {copy.clearAll}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-muted"
          >
            {copy.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
