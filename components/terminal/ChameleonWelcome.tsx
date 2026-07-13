"use client";

type ChameleonWelcomeProps = {
  locale: "en" | "ar";
};

export function ChameleonWelcome({ locale }: ChameleonWelcomeProps) {
  const isArabic = locale === "ar";

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-8 text-center">
      <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald/40 bg-emerald/10">
        <div className="h-4 w-4 rounded-full bg-emerald shadow-[0_0_20px_rgba(31,174,130,0.7)]" />
        <div className="absolute inset-0 animate-pulse rounded-full border border-emerald/20" />
      </div>
      <p className="text-xs font-medium uppercase tracking-widest text-emerald">
        Chameleon Eye
      </p>
      {isArabic ? (
        <div className="mt-4 space-y-3 text-sm leading-7 text-foreground">
          <p className="font-medium">أنا Chameleon.</p>
          <p className="text-muted">لا أخمّن. أبحث عن الأنماط الخفية.</p>
          <p className="text-muted">
            تم تفعيل Business DNA الخاص بك.
            <br />
            اسألني عن الهدر المالي الخفي، الإشارات الضعيفة، احتكاك رحلة العميل، المخاطر
            التشغيلية، الملفات الخاصة، أو نقاط ضعف القرار.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3 text-sm leading-7 text-foreground">
          <p className="font-medium">I am Chameleon.</p>
          <p className="text-muted">I do not guess. I look for hidden patterns.</p>
          <p className="text-muted">
            Your Business DNA is active.
            <br />
            Ask me about hidden cash waste, weak signals, customer friction, operational
            risk, private files, or decision blind spots.
          </p>
        </div>
      )}
    </div>
  );
}
