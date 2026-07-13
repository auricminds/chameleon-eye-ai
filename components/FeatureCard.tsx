import Link from "next/link";
import { Card } from "./Card";

type FeatureCardProps = {
  title: string;
  copy: string;
  bestFor?: string;
  bestForLabel?: string;
  cta?: { label: string; href: string };
  rtl?: boolean;
};

export function FeatureCard({
  title,
  copy,
  bestFor,
  bestForLabel = "Best for:",
  cta,
  rtl = false,
}: FeatureCardProps) {
  const arrow = rtl ? "←" : "→";

  return (
    <Card hover className="flex h-full flex-col text-start">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">{copy}</p>
      {bestFor ? (
        <p className="mt-4 text-sm text-muted">
          <span className="font-medium text-gold">{bestForLabel}</span> {bestFor}
        </p>
      ) : null}
      {cta ? (
        <Link
          href={cta.href}
          className="mt-5 inline-flex text-sm font-medium text-emerald transition-colors hover:text-emerald/80"
        >
          {cta.label} {arrow}
        </Link>
      ) : null}
    </Card>
  );
}
