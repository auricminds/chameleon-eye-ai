"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { AppWorkspaceTopBar } from "@/components/terminal/AppWorkspaceTopBar";
import {
  buildBusinessDnaRecord,
  getDnaConfig,
} from "@/lib/demo/businessDnaConfig";
import { useDemoUser } from "@/lib/demo/hooks";
import { DEMO_ROUTES } from "@/lib/demo/routes";
import { getDemoUser, saveBusinessDna, setTerminalLanguage } from "@/lib/demo/storage";
import { BusinessDnaSummary } from "./BusinessDnaSummary";

function QuizShell({
  locale,
  children,
}: {
  locale: "en" | "ar";
  children: React.ReactNode;
}) {
  const isArabic = locale === "ar";
  const pageTitle = isArabic ? "Business DNA" : "Business DNA";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`terminal-app flex h-screen flex-col overflow-hidden bg-background ${isArabic ? "arabic-page" : ""}`}
    >
      <AppWorkspaceTopBar locale={locale} pageTitle={pageTitle} />
      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-[720px]">{children}</div>
      </main>
    </div>
  );
}

export function BusinessDnaQuiz({ locale }: { locale: "en" | "ar" }) {
  const router = useRouter();
  const config = getDnaConfig(locale);
  const isArabic = locale === "ar";
  const demoUser = useDemoUser();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!demoUser) router.replace(DEMO_ROUTES.signup(locale));
    }, 0);
    return () => clearTimeout(timer);
  }, [demoUser, locale, router]);

  const total = config.questions.length;
  const question = config.questions[step];
  const selectedIndex = answers[question?.id ?? ""];
  const isLast = step === total - 1;

  function selectOption(idx: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: idx }));
  }

  function goNext() {
    if (selectedIndex === undefined) return;
    if (isLast) {
      const user = getDemoUser();
      if (!user) {
        router.push(DEMO_ROUTES.signup(locale));
        return;
      }
      const record = buildBusinessDnaRecord(config, answers, user.id);
      saveBusinessDna(record);
      setTerminalLanguage(locale);
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  useEffect(() => {
    if (!finished) return;
    const timer = window.setTimeout(() => {
      router.push(DEMO_ROUTES.terminal(locale));
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [finished, locale, router]);

  if (finished) {
    return (
      <QuizShell locale={locale}>
        <BusinessDnaSummary
          locale={locale}
          config={config}
          onOpenTerminal={() => router.push(DEMO_ROUTES.terminal(locale))}
          onEditDna={() => router.push(DEMO_ROUTES.settingsBusinessDna(locale))}
        />
      </QuizShell>
    );
  }

  if (!demoUser) {
    return (
      <QuizShell locale={locale}>
        <p className="text-muted">{isArabic ? "جاري التحميل..." : "Loading..."}</p>
      </QuizShell>
    );
  }

  const progress = config.progressTemplate
    .replace("{n}", String(step + 1))
    .replace("{total}", String(total));

  return (
    <QuizShell locale={locale}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {config.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{config.subtitle}</p>
      <p className="mt-2 text-xs text-muted">{config.disclaimer}</p>

      <Card className="mt-8 border-white/8 bg-panel/80 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-emerald">
            {progress}
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald transition-all"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-lg font-medium text-foreground">{question.text}</h2>

        <div className="mt-6 space-y-2">
          {question.options.map((opt, idx) => {
            const selected = selectedIndex === idx;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => selectOption(idx)}
                className={`w-full rounded-xl border px-4 py-3 text-sm transition-all ${
                  isArabic ? "text-right" : "text-left"
                } ${
                  selected
                    ? "border-emerald/50 bg-emerald/10 text-foreground"
                    : "border-white/10 bg-background text-muted hover:border-white/20 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 0 ? (
            <Button variant="ghost" onClick={goBack}>
              {config.backLabel}
            </Button>
          ) : null}
          <Button onClick={goNext} disabled={selectedIndex === undefined}>
            {isLast ? config.finishLabel : config.nextLabel}
          </Button>
        </div>
      </Card>
    </QuizShell>
  );
}
