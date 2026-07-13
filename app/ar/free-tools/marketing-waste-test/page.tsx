import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { marketingWasteTestAr } from "@/lib/tools/free-tools/marketing-waste-test";

export const metadata: Metadata = {
  title: "اختبار الهدر التسويقي",
};

export default function ArabicMarketingWasteTestPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={marketingWasteTestAr.toolTitle}
        subtitle={marketingWasteTestAr.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={marketingWasteTestAr} />
      </div>
    </div>
  );
}
