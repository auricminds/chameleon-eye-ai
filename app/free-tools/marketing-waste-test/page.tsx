import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { marketingWasteTestEn } from "@/lib/tools/free-tools/marketing-waste-test";

export const metadata = {
  title: "Marketing Waste Test",
};

export default function MarketingWasteTestPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={marketingWasteTestEn.toolTitle}
        subtitle={marketingWasteTestEn.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={marketingWasteTestEn} />
      </div>
    </div>
  );
}
