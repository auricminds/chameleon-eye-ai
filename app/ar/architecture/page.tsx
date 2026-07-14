import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "بنية منصة Chameleon",
  description:
    "البنية التقنية الكاملة لمنصة Chameleon Eye AI — التوجيه والذكاء وأنظمة الصناعة وضوابط المؤسسات.",
};

const coreLayers = [
  {
    name: "بوابة المنتج (Product Gateway)",
    description: "نقطة الدخول لجميع تفاعلات المستخدم. تتولى المصادقة وإدارة الجلسات وتوجيه اللغة والتصنيف الأولي للطلبات.",
    color: "border-emerald/30 bg-emerald/5",
  },
  {
    name: "AI Terminal",
    description: "واجهة ذكاء الأعمال للأغراض العامة. تدعم التحليل المفتوح وإنشاء التقارير ودعم القرارات عبر أي مجال أعمال.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "Business DNA",
    description: "طبقة تحليل الأعمال الخاصة. تلتقط سياق الشركة وصناعتها وهيكل الفريق والأهداف والقيود — حتى تكون كل مخرجات الذكاء مرتبطة بواقع شركتك الفعلي.",
    color: "border-gold/30 bg-gold/5",
  },
  {
    name: "Chameleon Intelligence Router",
    description: "محرك تصنيف المهام والتوجيه من جانب الخادم. يستقبل الطلب ويطبق قواعد الأعمال وفحوصات الخصوصية ويختار مسار الذكاء الأنسب.",
    color: "border-gold/30 bg-gold/5",
  },
  {
    name: "ذكاء المستندات",
    description: "يعالج المستندات المعتمدة — يستخرج رؤى منظمة ويكشف المخاطر ويلخص المحتوى ويغذّي النتائج في التقارير ومراجعات المخاطر.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "محرك مراجعة المخاطر",
    description: "طبقة تقييم المخاطر المنظمة. تطبق التسجيل والتصنيف وقواعد سياق الأعمال لإنتاج مخرجات مخاطر قابلة للتنفيذ.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "محرك التقارير",
    description: "يُنسّق مخرجات الذكاء في تقارير أعمال منظمة. يدعم أنواع التقارير المتعددة وتنسيقات التصدير والقوالب الخاصة بكل صناعة.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "متتبع القرارات",
    description: "يسجّل قرارات الأعمال ويربطها بالذكاء الداعم ويتتبع النتائج — مما يخلق سجلاً تاريخياً قابلاً للتدقيق.",
    color: "border-emerald/20 bg-panel",
  },
  {
    name: "API Vault",
    description: "طبقة إدارة المفاتيح الآمنة. تدير مفاتيح API محددة النطاق وفصل الاختبار/الإنتاج والإلغاء. لا تُكشف المفاتيح الرئيسية للعملاء.",
    color: "border-white/15 bg-panel2",
  },
  {
    name: "الوضع المحلي / الخاص",
    description: "يوجّه المهام المؤهلة إلى المعالجة المحلية. تبقى الملفات وبيانات مساحة العمل على جهاز المستخدم. يُستخدم التحليل السحابي فقط بموافقة صريحة.",
    color: "border-white/15 bg-panel2",
  },
];

const industrySystems = [
  {
    name: "نظام الفنادق (Hotel System)",
    items: ["إدارة الغرف", "ذكاء النزلاء", "تتبع الشكاوى", "تحليل الإيرادات", "موصل السياحة"],
  },
  {
    name: "نظام العمليات الصحية",
    items: ["جدولة العمليات", "تتبع الموارد", "ملخصات الحوادث", "دعم الامتثال"],
  },
  {
    name: "نظام العقارات",
    items: ["إدارة العقارات", "ذكاء القوائم", "تحليل الاستثمار", "إشارات السوق"],
  },
];

const enterpriseControls = [
  "الأدوار والصلاحيات",
  "سجلات التدقيق",
  "فصل مساحات العمل",
  "خيارات النشر الخاص",
  "قواعد التوجيه المخصصة",
  "إعدادات الاحتفاظ بالبيانات",
];

export default function ArArchitecturePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            البنية
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            بنية منصة Chameleon
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon لا تُعرَّف بالبنية التحتية للذكاء التي تتصل بها. تُعرَّف
            بطبقة ذكاء الأعمال الخاصة المبنية فوقها — قواعد التوجيه والسياق
            التجاري وسير العمل والتقارير والصلاحيات وأنظمة الصناعة.
          </p>
        </div>
      </section>

      <section className="border-b border-white/8 bg-panel/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="border-emerald/20 bg-emerald/5">
            <p className="text-sm leading-7 text-foreground">
              <strong className="text-emerald">ما يجعل Chameleon ذات قيمة</strong> ليس نموذج الحوسبة الأساسي. بل طبقة ذكاء الأعمال الخاصة: قواعد التوجيه الاحتكارية وسياق Business DNA ومحركات سير العمل وتنسيقات التقارير المنظمة ومنطق تسجيل المخاطر وتتبع القرارات وصلاحيات الأدوار وعزل مساحات العمل وأنظمة الصناعة المخصصة.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="طبقات المنصة"
          subtitle="كل طبقة تضيف قدرة متميزة تحوّل الذكاء الخام إلى مخرجات جاهزة للأعمال."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreLayers.map((layer) => (
            <Card key={layer.name} className={layer.color}>
              <h3 className="text-sm font-semibold text-foreground">{layer.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{layer.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="أنظمة الصناعة"
            subtitle="ذكاء تشغيلي مخصص لصناعات بعينها — وليس AI عاماً مطبّقاً على حالات استخدام رأسية."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {industrySystems.map((system) => (
              <Card key={system.name} hover>
                <h3 className="text-base font-semibold text-foreground">{system.name}</h3>
                <ul className="mt-4 space-y-2">
                  {system.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="text-emerald">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="ضوابط المؤسسات"
          subtitle="ضوابط الحوكمة والوصول والنشر للمؤسسات التي تتطلب سياسات أكثر صرامة."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {enterpriseControls.map((ctrl) => (
            <Card key={ctrl} className="border-blue-500/15 bg-blue-500/5">
              <span className="text-sm font-medium text-blue-400">{ctrl}</span>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/ar/trust" variant="secondary">مركز الثقة</Button>
          <Button href="/ar/security" variant="ghost">البنية الأمنية</Button>
          <Button href="/ar/enterprise" variant="ghost">خيارات المؤسسات</Button>
        </div>
      </section>
    </>
  );
}
