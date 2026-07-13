import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { customerJourneyFrictionTestEn } from "@/lib/tools/free-tools/customer-journey-friction-test";

export const metadata = {
  title: "Customer Journey Friction Test",
};

export default function CustomerJourneyFrictionTestPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={customerJourneyFrictionTestEn.toolTitle}
        subtitle={customerJourneyFrictionTestEn.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={customerJourneyFrictionTestEn} />
      </div>
    </div>
  );
}
