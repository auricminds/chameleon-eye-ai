import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { cashWasteScannerEn } from "@/lib/tools/free-tools/cash-waste-scanner";

export const metadata = {
  title: "Cash Waste Scanner",
};

export default function CashWasteScannerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={cashWasteScannerEn.toolTitle}
        subtitle={cashWasteScannerEn.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={cashWasteScannerEn} />
      </div>
    </div>
  );
}
