import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { QuizTool } from "@/components/tools/QuizTool";
import { cashWasteScannerAr } from "@/lib/tools/free-tools/cash-waste-scanner";

export const metadata: Metadata = {
  title: "فاحص الهدر المالي",
};

export default function ArabicCashWasteScannerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title={cashWasteScannerAr.toolTitle}
        subtitle={cashWasteScannerAr.toolSubtitle}
      />
      <div className="mt-16">
        <QuizTool config={cashWasteScannerAr} />
      </div>
    </div>
  );
}
