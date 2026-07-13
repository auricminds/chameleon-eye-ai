import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionTitle } from "@/components/SectionTitle";
import { AR_PRIVACY_SENTENCE } from "@/lib/i18n/ar";

export const metadata: Metadata = {
  title: "الوضع الخاص",
};

const bestFor = [
  "العقود",
  "التقارير الداخلية",
  "ملفات الموظفين المصرح بها",
  "مستندات الأعمال الحساسة",
  "المراجعات الأولية",
  "التقارير السرية",
];

export default function ArabicPrivateModePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="الوضع الخاص / المحلي"
        subtitle="أسرارك وملفاتك لا يجب أن تنتقل إلا بموافقتك."
      />

      <Card className="mt-10 border-gold/30 bg-panel2 shadow-[0_0_40px_rgba(215,180,106,0.08)]">
        <p className="text-base font-medium leading-8 text-gold">{AR_PRIVACY_SENTENCE}</p>
      </Card>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <FeatureCard
          rtl
          title="الوضع المحلي الخاص"
          copy="تبقى الملفات على جهاز العميل. مناسب للعقود، التقارير الداخلية، الملفات الحساسة، والمراجعات المبكرة."
        />
        <FeatureCard
          rtl
          title="الوضع الهجين بالموافقة"
          copy="يتم التحليل محلياً أولاً، ثم يوافق العميل على ما يمكن إرساله للسحابة."
        />
        <FeatureCard
          rtl
          title="وضع السحابة / API"
          copy="يتم إرسال البيانات المصرح بها فقط لتحليل أقوى، وتقييمات، ولوحات تحكم، وتقارير."
        />
      </div>

      <Card className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">مناسب لـ</h2>
        <ul className="ar-list mt-4 grid gap-2 sm:grid-cols-2 text-sm text-muted">
          {bestFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>

      <div className="mt-12">
        <Button href="/ar/contact">اسأل عن الوضع الخاص</Button>
      </div>
    </div>
  );
}
