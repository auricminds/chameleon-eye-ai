import { PricingCard } from "@/components/PricingCard";
import { SectionTitle } from "@/components/SectionTitle";
import { PRICING_PLANS } from "@/lib/constants";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        title="Pricing"
        subtitle="Start small, then scale to private company intelligence."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </div>
  );
}
