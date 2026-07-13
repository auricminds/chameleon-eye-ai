import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { privateModeReadinessTestEn } from "@/lib/tools/free-tools/private-mode-readiness-test";

export const metadata = {
  title: "Private Mode Readiness Test",
};

export default function PrivateModeReadinessTestPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={privateModeReadinessTestEn.toolTitle}
        subtitle={privateModeReadinessTestEn.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={privateModeReadinessTestEn} />
      </div>
    </div>
  );
}
