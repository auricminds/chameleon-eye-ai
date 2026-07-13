import type { Metadata } from "next";
import { FreeToolsHub } from "@/components/tools/FreeToolsHub";
import { SectionTitle } from "@/components/SectionTitle";
import { FREE_TOOLS_AR } from "@/lib/tools/free-tools/list";

export const metadata: Metadata = {
  title: "أدوات ذكاء الأعمال المجانية",
};

export default function ArabicFreeToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="أدوات ذكاء الأعمال المجانية"
        subtitle="جرّب فاحصات Chameleon Eye AI البسيطة قبل البدء بمساحة ذكاء خاصة كاملة."
      />

      <div className="mt-16">
        <FreeToolsHub locale="ar" tools={FREE_TOOLS_AR} />
      </div>
    </div>
  );
}
