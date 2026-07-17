import { PricingCard } from "@/components/PricingCard";
import { SectionTitle } from "@/components/SectionTitle";
import { PRICING_PLANS } from "@/lib/constants";

export const metadata = {
  title: "Pricing — Chameleon Eye AI",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        title="Pricing"
        subtitle="Start small, then scale to private company intelligence."
      />

      {/* Early-stage notice */}
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-gold/20 bg-gold/5 p-5">
        <p className="text-sm font-semibold text-gold mb-1">Indicative Pricing</p>
        <p className="text-sm leading-6 text-muted">
          Chameleon Eye AI is an early-stage product. Pricing shown is indicative
          and subject to change before commercial launch. Billing is not yet
          active. To discuss access or pricing, use the contact form.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      <p className="mt-8 text-center text-xs leading-6 text-muted">
        Prices are indicative and subject to change before commercial activation.
        &quot;Start Free&quot; plans and paid plans will require production account
        authentication before billing becomes active.
      </p>
    </div>
  );
}
