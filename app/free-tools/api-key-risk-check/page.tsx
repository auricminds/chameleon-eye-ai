import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { apiKeyRiskCheckEn } from "@/lib/tools/free-tools/api-key-risk-check";

export const metadata = {
  title: "API Key Risk Check",
};

export default function ApiKeyRiskCheckPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={apiKeyRiskCheckEn.toolTitle}
        subtitle={apiKeyRiskCheckEn.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={apiKeyRiskCheckEn} />
      </div>
    </div>
  );
}
