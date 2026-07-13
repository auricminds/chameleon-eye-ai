import type { Metadata } from "next";
import { AppsAccessSection } from "@/components/AppsAccessSection";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "التطبيقات",
};

export default function ArabicAppsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="استخدم Chameleon Eye AI في أي مكان"
        subtitle="ابدأ من المتصفح، ثبّته كتطبيق، أو استخدم Chameleon Eye AI من Windows وmacOS وiPhone وiPad."
      />

      <div className="mt-16">
        <AppsAccessSection locale="ar" />
      </div>
    </div>
  );
}
