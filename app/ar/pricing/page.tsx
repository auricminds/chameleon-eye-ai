import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { SectionTitle } from "@/components/SectionTitle";
import { AR_PRICING_PLANS } from "@/lib/i18n/ar";

export const metadata: Metadata = {
  title: "الأسعار",
};

export default function ArabicPricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        title="الأسعار"
        subtitle="ابدأ صغيراً، ثم توسع إلى نظام ذكاء خاص لشركتك."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {AR_PRICING_PLANS.map((plan) => (
          <PricingCard
            key={plan.name}
            {...plan}
            rtl
            popularLabel="الأكثر اختياراً"
          />
        ))}
      </div>
    </div>
  );
}
