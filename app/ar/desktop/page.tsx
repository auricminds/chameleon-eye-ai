import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DesktopDownloadCards } from "@/components/DesktopDownloadCards";
import { DesktopFlowDiagram } from "@/components/DesktopFlowDiagram";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "سطح المكتب",
};

export default function ArabicDesktopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Desktop Connector"
        subtitle="اربط تطبيقات سطح المكتب بـ Chameleon Eye AI بأمان، دون كشف المفاتيح الخاصة أو ملفات الشركة الحساسة."
      />

      <div className="mt-16 space-y-10">
        <DesktopDownloadCards locale="ar" />

        <Card>
          <h2 className="text-xl font-semibold text-foreground">
            الاتصال الآمن لتطبيقات سطح المكتب
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            يمكن لتطبيق سطح المكتب أن يتصل بـ Chameleon Eye AI عبر الإنترنت
            مثلما يتصل الموقع بخادم آمن. الفرق أن تطبيقات سطح المكتب تحتاج
            حماية إضافية لأن التطبيق المثبت يمكن نسخه أو فحصه أو استخدامه على
            أكثر من جهاز.
          </p>
        </Card>

        <div>
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            كيف يتم الاتصال بأمان؟
          </h2>
          <DesktopFlowDiagram variant="page" locale="ar" />
        </div>
      </div>

      <div className="mt-12">
        <Button href="/ar/contact">اطلب تكامل سطح المكتب</Button>
      </div>
    </div>
  );
}
