import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "تقارير AI",
};

const reports = [
  {
    title: "تقرير الهدر المالي",
    copy: "يوضح أين قد تتسرب القيمة داخل التسويق أو العمليات أو الوقت أو الأخطاء.",
  },
  {
    title: "تقرير فعالية الفريق",
    copy: "يوضح اختناقات سير العمل، عدم وضوح المسؤولية، وإشارات جاهزية الأدوار.",
  },
  {
    title: "تقرير رحلة العميل",
    copy: "يوضح أين يتوقف المستخدمون أو يترددون أو يتركون النماذج والطلبات.",
  },
  {
    title: "تقرير ذكاء التسويق",
    copy: "يوضح ضعف الرسالة، عدم توافق الجمهور، وفرص التحسين.",
  },
  {
    title: "تقرير المخاطر التشغيلية",
    copy: "يوضح الأخطاء المتكررة، التأخير، ومخاطر العمليات.",
  },
  {
    title: "مذكرة قرار تنفيذية",
    copy: "تلخص الخيارات، المخاطر، التوصية، والخطوة التالية.",
  },
];

export default function ArabicReportsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="تقارير Chameleon Eye الاستخباراتية"
        subtitle="تقارير AI خاصة لدعم قرارات الأعمال من بيانات وملفات ومؤشرات مصرح بها."
      />

      <Card className="mt-10 border-emerald/20 bg-panel2">
        <p className="text-sm leading-7 text-muted">
          هذه ليست تقارير أعطال أو تذاكر دعم فني. هذه أنواع تقارير استخبارات
          أعمال يمكن أن تنتجها Chameleon Eye AI من الملفات المصرح بها، أو سير
          العمل، أو مؤشرات التشغيل، أو التحليل الخاص.
        </p>
      </Card>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title} hover className="flex h-full flex-col">
            <h2 className="text-lg font-semibold text-foreground">{report.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-muted">{report.copy}</p>
            <Link
              href="/ar/contact"
              className="mt-5 inline-flex text-sm font-medium text-emerald transition-colors hover:text-emerald/80"
            >
              اطلب نموذج تقرير ←
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Button href="/ar/contact">اطلب نموذج تقرير</Button>
      </div>
    </div>
  );
}
