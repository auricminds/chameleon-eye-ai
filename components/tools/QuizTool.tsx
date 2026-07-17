"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import type { QuizConfig } from "@/lib/tools/quiz-types";

function formatProgress(template: string, current: number, total: number) {
  return template.replace("{n}", String(current)).replace("{total}", String(total));
}

export function QuizTool({ config }: { config: QuizConfig }) {
  const { questions, levels, ui } = config;
  const isArabic = config.locale === "ar";
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const question = questions[step];
  const selectedIndex = answers[question?.id ?? ""];
  const isLastQuestion = step === total - 1;

  const maxScore = useMemo(
    () =>
      questions.reduce(
        (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
        0,
      ),
    [questions],
  );

  const rawScore = useMemo(
    () =>
      questions.reduce((sum, q) => {
        const answerIndex = answers[q.id];
        if (answerIndex === undefined) return sum;
        return sum + q.options[answerIndex].points;
      }, 0),
    [questions, answers],
  );

  const percent = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0;

  const result = useMemo(() => {
    const sorted = [...levels].sort((a, b) => b.minPercent - a.minPercent);
    return sorted.find((level) => percent >= level.minPercent) ?? sorted[sorted.length - 1];
  }, [levels, percent]);

  function selectOption(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  }

  function goNext() {
    if (isLastQuestion) {
      setFinished(true);
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function retake() {
    setAnswers({});
    setStep(0);
    setFinished(false);
  }

  if (finished && result) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="border-emerald/20 bg-panel2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">{config.resultTitle}</h2>
            <Badge variant={result.badgeVariant}>{result.badge}</Badge>
          </div>

          <p className="mt-4 text-sm text-muted">
            {ui.scoreLabel}: <span className="font-semibold text-foreground">{percent}/100</span>
          </p>

          <h3 className="mt-5 text-lg font-semibold text-foreground">{result.heading}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{result.body}</p>

          <div className="mt-5 rounded-xl border border-gold/20 bg-background/40 p-4">
            <p className="text-xs font-semibold tracking-wide text-gold uppercase">
              {ui.recommendedLabel}
            </p>
            <p className="mt-2 text-sm leading-7 text-foreground">{result.recommendation}</p>
          </div>

          <p className="mt-4 text-xs leading-5 text-muted">
            This result is an indicative self-assessment based on your answers. It is not a
            professional audit, financial assessment, or business advice. Review results with
            qualified advisors before making decisions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={config.signupHref}
              className="inline-flex items-center justify-center rounded-full border border-emerald/30 bg-emerald px-5 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:bg-emerald/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {ui.ctaSignupLabel}
            </Link>
            <Link
              href={config.contactHref}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-panel2 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-gold/30 hover:bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {ui.ctaContactLabel}
            </Link>
            <button
              type="button"
              onClick={retake}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-muted transition-all duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {ui.retakeLabel}
            </button>
          </div>

          <Link
            href={config.hubHref}
            className="mt-5 inline-block text-sm font-medium text-emerald transition-colors hover:text-emerald/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
          >
            {ui.backToHubLabel}
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <p className="text-sm font-medium text-muted">
          {formatProgress(ui.progressTemplate, step + 1, total)}
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-panel2">
          <div
            className="h-full rounded-full bg-emerald transition-all duration-300"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <h2 className="text-lg leading-8 font-semibold text-foreground sm:text-xl">
          {question.text}
        </h2>

        <div className="mt-5 space-y-3">
          {question.options.map((option, index) => {
            const selected = selectedIndex === index;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => selectOption(index)}
                aria-pressed={selected}
                className={`block w-full rounded-xl border px-4 py-3.5 text-start text-sm leading-6 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A] ${
                  selected
                    ? "border-emerald/50 bg-emerald/10 text-foreground"
                    : "border-white/10 bg-panel2 text-muted hover:border-emerald/30 hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className={`mt-7 flex items-center gap-3 ${isArabic ? "flex-row-reverse justify-end" : ""}`}>
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-muted transition-all duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {ui.backLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={goNext}
            disabled={selectedIndex === undefined}
            className="inline-flex items-center justify-center rounded-full border border-emerald/30 bg-emerald px-5 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:bg-emerald/90 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
          >
            {isLastQuestion ? ui.seeResultLabel : ui.nextLabel}
          </button>
        </div>
      </Card>
    </div>
  );
}
