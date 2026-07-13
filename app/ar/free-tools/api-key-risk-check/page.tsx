import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { apiKeyRiskCheckAr } from "@/lib/tools/free-tools/api-key-risk-check";

export const metadata: Metadata = {
  title: "فحص مخاطر مفاتيح API",
};

export default function ArabicApiKeyRiskCheckPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={apiKeyRiskCheckAr.toolTitle}
        subtitle={apiKeyRiskCheckAr.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={apiKeyRiskCheckAr} />
      </div>
    </div>
  );
}
