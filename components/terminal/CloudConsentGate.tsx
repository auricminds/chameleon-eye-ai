"use client";

type CloudConsentGateProps = {
  onApprove: () => void;
  onPrivate: () => void;
  onCancel: () => void;
  locale: "en" | "ar";
  textCharCount?: number;
};

const content = {
  en: {
    title: "Cloud Analysis Required",
    body: "This action will send the selected text to Chairman Cloud for analysis. Your full private archive will not be sent.",
    charCount: (n: number) => `Selected content: approximately ${n} characters`,
    approve: "Continue with Cloud Analysis",
    private: "Use Private Intelligence Instead",
    cancel: "Cancel",
  },
  ar: {
    title: "التحليل السحابي مطلوب",
    body: "سيرسل هذا الإجراء النص المحدد إلى Chairman Cloud للتحليل. لن يُرسَل أرشيفك الخاص الكامل.",
    charCount: (n: number) => `المحتوى المحدد: تقريباً ${n} حرف`,
    approve: "المتابعة بالتحليل السحابي",
    private: "استخدام الذكاء الخاص بدلاً من ذلك",
    cancel: "إلغاء",
  },
};

export function CloudConsentGate({
  onApprove,
  onPrivate,
  onCancel,
  locale,
  textCharCount,
}: CloudConsentGateProps) {
  const t = content[locale];
  const isRtl = locale === "ar";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
      aria-labelledby="cloud-consent-title"
    >
      {/* Modal */}
      <div
        className={`relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-panel p-6 shadow-2xl ${isRtl ? "text-right" : "text-left"}`}
        dir={isRtl ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              {locale === "en" ? "Cloud" : "سحابي"}
            </div>
            <h2
              id="cloud-consent-title"
              className="text-lg font-semibold text-foreground"
            >
              {t.title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="shrink-0 rounded-full p-1 text-muted hover:bg-white/5 hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <p className="text-sm leading-7 text-muted">{t.body}</p>

        {/* Char count */}
        {textCharCount !== undefined && textCharCount > 0 && (
          <p className="mt-3 text-xs text-muted">
            {t.charCount(textCharCount)}
          </p>
        )}

        {/* Safety note */}
        <div className="mt-4 rounded-xl border border-emerald/20 bg-emerald/5 p-3">
          <p className="text-xs leading-6 text-muted">
            {locale === "en"
              ? "Your full private archive, local files, and stored documents will not be sent."
              : "لن يُرسَل أرشيفك الخاص الكامل أو ملفاتك المحلية أو مستنداتك المخزّنة."}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onApprove}
            className="w-full rounded-full bg-emerald px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-emerald/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
          >
            {t.approve}
          </button>
          <button
            onClick={onPrivate}
            className="w-full rounded-full border border-white/10 bg-panel2 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-emerald/30 hover:bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
          >
            {t.private}
          </button>
          <button
            onClick={onCancel}
            className="w-full rounded-full px-5 py-2 text-sm text-muted transition-colors hover:text-foreground focus:outline-none"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
