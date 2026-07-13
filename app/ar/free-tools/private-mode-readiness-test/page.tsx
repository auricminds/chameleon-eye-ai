import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { privateModeReadinessTestAr } from "@/lib/tools/free-tools/private-mode-readiness-test";

export const metadata: Metadata = {
  title: "اختبار جاهزية الوضع الخاص",
};

export default function ArabicPrivateModeReadinessTestPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={privateModeReadinessTestAr.toolTitle}
        subtitle={privateModeReadinessTestAr.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={privateModeReadinessTestAr} />
      </div>
    </div>
  );
}
