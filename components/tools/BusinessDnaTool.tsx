"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { buildDnaProfile, type DnaProfile } from "@/lib/tools/business-dna/build-profile";
import type { DnaConfig } from "@/lib/tools/business-dna/types";

const STORAGE_KEY = "chameleon_free_tool_business_dna";

function formatProgress(template: string, current: number, total: number) {
  return template.replace("{n}", String(current)).replace("{total}", String(total));
}

function subscribeNoop() {
  return () => {};
}

function getStoredSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return null;
}

export function BusinessDnaTool({ config }: { config: DnaConfig }) {
  const { questions, ui } = config;
  const isArabic = config.locale === "ar";
  const total = questions.length;

  const storedRaw = useSyncExternalStore(subscribeNoop, getStoredSnapshot, getServerSnapshot);
  const storedProfile = useMemo(() => {
    if (!storedRaw) return null;
    try {
      const saved = JSON.parse(storedRaw) as { locale: string; profile: DnaProfile };
      if (saved.locale === config.locale && saved.profile) return saved.profile;
    } catch {
      // ignore corrupted local storage
    }
    return null;
  }, [storedRaw, config.locale]);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [override, setOverride] = useState<DnaProfile | null | undefined>(undefined);

  const profile = override !== undefined ? override : storedProfile;
  const finished = profile !== null;

  const question = questions[step];
  const selectedIndex = answers[question?.id ?? ""];
  const isLastQuestion = step === total - 1;

  function selectOption(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  }

  function goNext() {
    if (isLastQuestion) {
      const nextProfile = buildDnaProfile(config, answers);
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ locale: config.locale, profile: nextProfile, savedAt: Date.now() }),
        );
      } catch {
        // ignore storage write failures (private browsing, quota, etc.)
      }
      setOverride(nextProfile);
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function editDna() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setOverride(null);
    setAnswers({});
    setStep(0);
  }

  if (finished && profile) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="border-emerald/20 bg-panel2">
          <p className="rounded-lg border border-gold/20 bg-background/40 px-3 py-2 text-xs leading-6 text-gold">
            {ui.disclaimer}
          </p>

          <h2 className="mt-4 text-xl font-semibold text-foreground">{ui.resultReadyHeading}</h2>

          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-gold">{ui.roleLabel}</dt>
              <dd className="mt-1 text-foreground">{profile.role}</dd>
            </div>
            <div>
              <dt className="font-medium text-gold">{ui.mainFocusLabel}</dt>
              <dd className="mt-1 text-foreground">{profile.mainFocus}</dd>
            </div>
            <div>
              <dt className="font-medium text-gold">{ui.preferredStyleLabel}</dt>
              <dd className="mt-1 text-foreground">{profile.preferredStyle}</dd>
            </div>
            <div>
              <dt className="font-medium text-gold">{ui.privacyModeLabel}</dt>
              <dd className="mt-1 text-foreground">{profile.privacyMode}</dd>
            </div>
            <div>
              <dt className="font-medium text-gold">{ui.recommendedStartLabel}</dt>
              <dd className="mt-1 text-foreground">{profile.recommendedStart}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">{ui.tagsHeading}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <Badge key={tag} variant="emerald">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              {ui.aiInstructionHeading}
            </p>
            <p className="mt-3 rounded-xl border border-white/10 bg-background/40 p-4 text-sm leading-7 text-muted">
              {profile.aiInstructionSummary}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={profile.startScanHref}
              className="inline-flex items-center justify-center rounded-full border border-emerald/30 bg-emerald px-5 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:bg-emerald/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {ui.startScanCta}
            </Link>
            <Link
              href={config.hrefs.freeToolsHub}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-panel2 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-gold/30 hover:bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {ui.tryToolsCta}
            </Link>
            <Link
              href={config.hrefs.contact}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-panel2 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-gold/30 hover:bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {ui.requestDemoCta}
            </Link>
            <button
              type="button"
              onClick={editDna}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-muted transition-all duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {ui.editDnaCta}
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-5 rounded-lg border border-gold/20 bg-panel2 px-3 py-2 text-xs leading-6 text-gold">
        {ui.disclaimer}
      </p>

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
