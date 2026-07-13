"use client";

import { translateBusinessDnaValue, translateIntelligenceTag } from "@/lib/demo/dnaTranslations";
import { clearAllDemoData } from "@/lib/demo/storage";
import type { BusinessDnaRecord } from "@/lib/demo/types";
import { DEMO_ROUTES } from "@/lib/demo/routes";
import Link from "next/link";

type BusinessDnaPanelProps = {
  locale: "en" | "ar";
  dna: BusinessDnaRecord | null;
  onClose?: () => void;
  onReset?: () => void;
};

export function BusinessDnaPanel({ locale, dna, onClose, onReset }: BusinessDnaPanelProps) {
  const isArabic = locale === "ar";
  const t = (v: string) => translateBusinessDnaValue(v, locale);

  const labels = isArabic
    ? {
        title: "Business DNA مفعل",
        role: "الدور",
        type: "نوع النشاط",
        goal: "الهدف الرئيسي",
        concern: "أكبر قلق",
        output: "المخرجات المفضلة",
        tone: "النبرة",
        privacy: "وضع الخصوصية",
        tags: "وسوم الذكاء",
        edit: "تعديل Business DNA",
        rebuild: "إعادة بناء الملف",
        reset: "حذف بيانات التجربة",
        notReadyTitle: "لم يتم إعداد Business DNA بعد.",
        notReadyBody: "أنشئ Business DNA حتى يتمكن Chameleon من تكييف إجاباته مع عملك.",
        build: "إنشاء Business DNA",
      }
    : {
        title: "Business DNA Active",
        role: "Role",
        type: "Business Type",
        goal: "Main Goal",
        concern: "Biggest Concern",
        output: "Preferred Output",
        tone: "Tone",
        privacy: "Privacy Mode",
        tags: "Intelligence Tags",
        edit: "Edit Business DNA",
        rebuild: "Rebuild Profile",
        reset: "Reset Demo Data",
        notReadyTitle: "Business DNA is not ready yet.",
        notReadyBody: "Build your Business DNA so Chameleon can adapt its answers.",
        build: "Build Business DNA",
      };

  if (!dna) {
    return (
      <aside
        dir={isArabic ? "rtl" : "ltr"}
        className="flex h-full flex-col bg-panel/80 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-white/8 p-4">
          <h2 className="text-sm font-semibold text-emerald">{labels.title}</h2>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-muted hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>
          ) : null}
        </div>
        <div className="flex-1 space-y-4 p-4 text-sm">
          <p className="font-medium text-foreground">{labels.notReadyTitle}</p>
          <p className="leading-6 text-muted">{labels.notReadyBody}</p>
          <Link
            href={DEMO_ROUTES.businessDna(locale)}
            className="block w-full rounded-full border border-emerald/30 bg-emerald px-5 py-2.5 text-center text-sm font-medium text-background transition-colors hover:bg-emerald/90"
          >
            {labels.build}
          </Link>
        </div>
      </aside>
    );
  }

  function handleReset() {
    if (
      confirm(
        isArabic
          ? "حذف كل بيانات التجربة؟ لا يمكن التراجع."
          : "Clear all demo data? This cannot be undone.",
      )
    ) {
      clearAllDemoData();
      onReset?.();
    }
  }

  return (
    <aside
      dir={isArabic ? "rtl" : "ltr"}
      className="flex h-full flex-col bg-panel/80 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/8 p-4">
        <h2 className="text-sm font-semibold text-emerald">{labels.title}</h2>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        ) : null}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
        <Field label={labels.role} value={t(dna.role)} />
        <Field label={labels.type} value={t(dna.businessType)} />
        <Field label={labels.goal} value={t(dna.mainGoal)} />
        <Field label={labels.concern} value={t(dna.biggestConcern)} />
        <Field label={labels.output} value={t(dna.outputPreference)} />
        <Field label={labels.tone} value={t(dna.communicationTone)} />
        <Field label={labels.privacy} value={t(dna.privacyMode)} />
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gold">
            {labels.tags}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {dna.intelligenceTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-emerald/20 bg-emerald/5 px-2 py-0.5 text-[10px] text-emerald"
              >
                {translateIntelligenceTag(tag, locale)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-white/8 p-4">
        <Link
          href={DEMO_ROUTES.settingsBusinessDna(locale)}
          className="block w-full rounded-full border border-white/10 bg-panel2 px-5 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:border-emerald/30"
        >
          {labels.edit}
        </Link>
        <Link
          href={DEMO_ROUTES.businessDna(locale)}
          className="block w-full rounded-full border border-gold/20 bg-gold/5 px-5 py-2.5 text-center text-sm font-medium text-gold transition-colors hover:border-gold/40"
        >
          {labels.rebuild}
        </Link>
        <button
          type="button"
          onClick={handleReset}
          className="w-full rounded-full border border-red-400/30 px-5 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-400/5"
        >
          {labels.reset}
        </button>
      </div>
    </aside>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-0.5 text-foreground">{value}</p>
    </div>
  );
}
