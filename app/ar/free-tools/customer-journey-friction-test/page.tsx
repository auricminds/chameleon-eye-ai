import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { customerJourneyFrictionTestAr } from "@/lib/tools/free-tools/customer-journey-friction-test";

export const metadata: Metadata = {
  title: "اختبار احتكاك رحلة العميل",
};

export default function ArabicCustomerJourneyFrictionTestPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={customerJourneyFrictionTestAr.toolTitle}
        subtitle={customerJourneyFrictionTestAr.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={customerJourneyFrictionTestAr} />
      </div>
    </div>
  );
}
