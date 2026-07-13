import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { teamEffectivenessCheckAr } from "@/lib/tools/free-tools/team-effectiveness-check";

export const metadata: Metadata = {
  title: "فحص فعالية الفريق",
};

export default function ArabicTeamEffectivenessCheckPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={teamEffectivenessCheckAr.toolTitle}
        subtitle={teamEffectivenessCheckAr.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={teamEffectivenessCheckAr} />
      </div>
    </div>
  );
}
