import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { teamEffectivenessCheckEn } from "@/lib/tools/free-tools/team-effectiveness-check";

export const metadata = {
  title: "Team Effectiveness Check",
};

export default function TeamEffectivenessCheckPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={teamEffectivenessCheckEn.toolTitle}
        subtitle={teamEffectivenessCheckEn.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={teamEffectivenessCheckEn} />
      </div>
    </div>
  );
}
