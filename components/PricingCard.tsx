import { Card } from "./Card";
import { Button } from "./Button";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  features: readonly string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  rtl?: boolean;
  popularLabel?: string;
};

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  href,
  highlighted = false,
  rtl = false,
  popularLabel = "Popular",
}: PricingCardProps) {
  return (
    <Card
      hover
      className={`flex h-full flex-col text-start ${highlighted ? "border-emerald/40 bg-panel2 ring-1 ring-emerald/20" : ""}`}
    >
      {highlighted ? (
        <span className="mb-3 inline-flex w-fit rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald">
          {popularLabel}
        </span>
      ) : null}
      <h3 className="text-xl font-semibold text-foreground">{name}</h3>
      <p className="mt-2 text-3xl font-semibold text-gold">{price}</p>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      <ul className={`mt-6 flex-1 space-y-2 ${rtl ? "ar-list" : ""}`}>
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
            <span className="flex-1">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href={href}
        variant={highlighted ? "primary" : "secondary"}
        className="mt-8 w-full"
      >
        {cta}
      </Button>
    </Card>
  );
}
