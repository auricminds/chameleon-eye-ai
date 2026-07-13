"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import type { DnaLocaleConfig } from "@/lib/demo/businessDnaConfig";

type BusinessDnaSummaryProps = {
  locale: "en" | "ar";
  config: DnaLocaleConfig;
  onOpenTerminal: () => void;
  onEditDna: () => void;
};

export function BusinessDnaSummary({
  locale,
  config,
  onOpenTerminal,
  onEditDna,
}: BusinessDnaSummaryProps) {
  const isArabic = locale === "ar";
  const redirectNote = isArabic
    ? "سيتم فتح Terminal تلقائياً خلال ثوانٍ..."
    : "Opening Terminal automatically in a few seconds...";

  return (
    <Card className="mx-auto max-w-2xl border-emerald/20 bg-panel2">
      <h2 className="text-2xl font-semibold text-foreground">{config.resultHeading}</h2>
      <p className="mt-4 text-sm leading-7 text-muted">{config.disclaimer}</p>
      <p className="mt-2 text-xs text-emerald">{redirectNote}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={onOpenTerminal}>{config.openTerminalCta}</Button>
        <Button onClick={onEditDna} variant="secondary">
          {config.editDnaCta}
        </Button>
      </div>
    </Card>
  );
}
