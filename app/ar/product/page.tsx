import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "المنتج",
};

const whatItDoes = [
  "يحلل الملفات والتقارير المصرح بها",
  "يكشف المخاطر الخفية",
  "يلتقط الإشارات الضعيفة",
  "ينشئ تقارير استخباراتية خاصة",
  "يقترح الخطوات التالية",
];

const bestFor = [
  "أصحاب الشركات",
  "المديرون التنفيذيون",
  "المستشارون",
  "المدققون",
  "فرق الموارد البشرية",
  "فرق العمليات",
  "فرق التسويق",
];

const features = [
  "مساحة عمل خاصة",
  "منشئ تقارير",
  "اكتشاف المخاطر",
  "تحليل الهدر المالي",
  "مؤشرات فعالية الفريق",
  "ذكاء التسويق",
  "مراجعة رحلة العميل",
  "ملخصات تنفيذية",
];

export default function ArabicProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="منتج Chameleon Eye AI"
        subtitle="مساحة ذكاء خاصة لأصحاب الشركات والفرق والمستشارين والمدققين الذين يحتاجون إلى تقارير واضحة من بيانات مصرح بها."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-foreground">ماذا يفعل؟</h2>
          <ul className="ar-list mt-4 space-y-2 text-sm text-muted">
            {whatItDoes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-foreground">مناسب لـ</h2>
          <ul className="ar-list mt-4 space-y-2 text-sm text-muted">
            {bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-foreground">الميزات الرئيسية</h2>
          <ul className="ar-list mt-4 space-y-2 text-sm text-muted">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-12">
        <Button href="/ar/signup">ابدأ مجاناً</Button>
      </div>
    </div>
  );
}
