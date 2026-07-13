"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  buildBusinessDnaRecord,
  getDnaConfig,
} from "@/lib/demo/businessDnaConfig";
import { useBusinessDna, useDemoUser } from "@/lib/demo/hooks";
import { DEMO_ROUTES } from "@/lib/demo/routes";
import { saveBusinessDna } from "@/lib/demo/storage";
import { AppWorkspaceTopBar } from "@/components/terminal/AppWorkspaceTopBar";

export function BusinessDnaEditor({ locale }: { locale: "en" | "ar" }) {
  const router = useRouter();
  const config = getDnaConfig(locale);
  const isArabic = locale === "ar";
  const demoUser = useDemoUser();
  const storedDna = useBusinessDna();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!demoUser) router.replace(DEMO_ROUTES.signup(locale));
      else if (!storedDna) router.replace(DEMO_ROUTES.businessDna(locale));
    }, 0);
    return () => clearTimeout(timer);
  }, [demoUser, storedDna, locale, router]);

  const initialAnswers = useMemo(() => {
    if (!storedDna) return {};
    const initial: Record<string, number> = {};
    for (const q of config.questions) {
      const fieldValue = storedDna[q.id as keyof typeof storedDna] as string;
      const idx = q.options.findIndex((o) => o.label === fieldValue);
      initial[q.id] = idx >= 0 ? idx : 0;
    }
    return initial;
  }, [storedDna, config.questions]);

  const [answers, setAnswers] = useState<Record<string, number>>({});

  const labels = isArabic
    ? {
        topBar: "إعدادات Business DNA",
        back: "العودة إلى Terminal",
        title: "تعديل Business DNA",
        subtitle:
          "حدّث الطريقة التي يفهم بها Chameleon دورك، ونشاطك، ومخاطرك، واحتياجات الخصوصية، وأسلوب التقارير المفضل لديك.",
        save: "حفظ التغييرات",
        cancel: "إلغاء",
        saved: "تم تحديث Business DNA.",
        returnTerminal: "العودة إلى Terminal",
        loading: "جاري التحميل...",
      }
    : {
        topBar: "Business DNA Settings",
        back: "Back to Terminal",
        title: "Edit Business DNA",
        subtitle:
          "Update how Chameleon understands your role, business, risks, privacy needs, and report style.",
        save: "Save changes",
        cancel: "Cancel",
        saved: "Business DNA updated.",
        returnTerminal: "Return to Terminal",
        loading: "Loading...",
      };

  const terminalHref = DEMO_ROUTES.terminal(locale);

  if (!demoUser || !storedDna) {
    return (
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="terminal-app flex h-screen items-center justify-center bg-background text-muted"
      >
        {labels.loading}
      </div>
    );
  }

  function handleSave() {
    if (!demoUser || !storedDna) return;
    const merged = { ...initialAnswers, ...answers };
    const record = buildBusinessDnaRecord(config, merged, demoUser.id);
    record.createdAt = storedDna.createdAt;
    saveBusinessDna(record);
    setSaved(true);
  }

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`terminal-app flex h-screen flex-col overflow-hidden bg-background ${isArabic ? "arabic-page" : ""}`}
    >
      <AppWorkspaceTopBar
        locale={locale}
        pageTitle={labels.topBar}
        backHref={terminalHref}
        backLabel={labels.back}
      />

      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-[720px]">
          <Link
            href={terminalHref}
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-emerald"
          >
            <span aria-hidden>{isArabic ? "→" : "←"}</span>
            {labels.back}
          </Link>

          <h1 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
            {labels.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{labels.subtitle}</p>

          {saved ? (
            <div className="mt-6 rounded-2xl border border-emerald/30 bg-emerald/10 px-4 py-4">
              <p className="text-sm font-medium text-emerald">{labels.saved}</p>
              <Link
                href={terminalHref}
                className="mt-3 inline-block rounded-xl border border-emerald/40 bg-emerald px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-emerald/90"
              >
                {labels.returnTerminal}
              </Link>
            </div>
          ) : null}

          <div className="mt-8 rounded-2xl border border-white/8 bg-panel/80 p-5 shadow-[0_0_40px_rgba(31,174,130,0.04)] backdrop-blur-xl sm:p-6">
            <div className="space-y-5">
              {config.questions.map((q) => (
                <div key={q.id}>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {q.text}
                  </label>
                  <select
                    value={answers[q.id] ?? initialAnswers[q.id] ?? 0}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: Number(e.target.value) }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-background/90 px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/40"
                  >
                    {q.options.map((opt, idx) => (
                      <option key={opt.label} value={idx}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 mt-8 flex flex-wrap gap-3 border-t border-white/8 bg-panel/95 pt-5">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl border border-emerald/30 bg-emerald px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-emerald/90"
              >
                {labels.save}
              </button>
              <Link
                href={terminalHref}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-muted transition-colors hover:border-white/20 hover:text-foreground"
              >
                {labels.cancel}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
