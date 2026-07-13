import type { Metadata } from "next";
import { CompareSection } from "@/components/CompareSection";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "المقارنة",
};

export default function ArabicComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Chameleon Eye AI مقابل الأدوات الأخرى"
        subtitle="ذكاء أعمال خاص، وليس روبوت محادثة عام. إليك كيف يتكامل مع الأدوات التي تستخدمها بالفعل."
      />

      <div className="mt-16">
        <CompareSection locale="ar" />
      </div>
    </div>
  );
}
