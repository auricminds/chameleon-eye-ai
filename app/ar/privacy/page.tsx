import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "وضع الخصوصية والتحكم بالبيانات — Chameleon",
  description:
    "كيف تتعامل Chameleon Eye AI مع البيانات المحلية والتحليل السحابي وتحكم المستخدم في ما يُشارَك.",
};

const localData = [
  "بيانات مساحة العمل التجريبية المحلية",
  "بيانات الإعداد والتكوين المحلية",
  "الملاحظات والتعليقات المحلية",
  "معاينة الملفات محلياً (حيثما كان مدعوماً)",
  "سير عمل سطح المكتب والبوابة المحلية عند توفرها",
];

const cloudData = [
  "المحادثات والاستفسارات التي تختار إرسالها",
  "نص المستند المحدد الذي تختار تحليله",
  "الملفات المرفوعة المختارة التي توافق على تحليلها",
  "بيانات الأنظمة المتصلة — فقط بعد الموافقة على الموصل",
];

const userControls = [
  { label: "اختيار ما يُرفع ويُتصل به ويُحلل", status: "implemented" as const },
  { label: "معاينة الملفات محلياً", status: "implemented" as const },
  { label: "التحليل السحابي القائم على الموافقة", status: "implemented" as const },
  { label: "لا استدعاءات مخفية لمزودي AI من المتصفح", status: "implemented" as const },
  { label: "ضوابط تصدير البيانات", status: "planned" as const },
  { label: "ضوابط حذف البيانات", status: "planned" as const },
  { label: "إعدادات الاحتفاظ بالبيانات للمؤسسات", status: "enterprise" as const },
];

export default function ArPrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            الخصوصية
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            وضع الخصوصية والتحكم بالبيانات
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon مبنية على مبدأ المحلية أولاً. تبقى البيانات الحساسة على
            جهازك بشكل افتراضي. يُستخدم التحليل السحابي فقط عندما توافق صراحةً
            على إرسال المحتوى عبر المسارات الخاضعة لسيطرة Chameleon.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="شرح وضع الخصوصية"
          subtitle="محلي أولاً، سحابة فقط بموافقتك."
          align="left"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="border-emerald/20">
            <h3 className="text-base font-semibold text-emerald">محلي</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              تبقى البيانات على جهازك. لا يُجرى أي اتصال شبكي لمعاينة الملفات
              أو بيانات مساحة العمل المحلية أو إعداد التكوين. يعطي وضع الخصوصية
              الأولوية للمعالجة المحلية حيثما أمكن تقنياً.
            </p>
          </Card>
          <Card>
            <h3 className="text-base font-semibold text-foreground">سحابة بالموافقة</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              عندما تختار تحليل مستند أو إرسال استفسار، ينتقل هذا المحتوى عبر
              مسارات الخادم الخاصة بـ Chameleon فحسب. لا يتصل المتصفح ببنية AI
              خارجية مباشرة.
            </p>
          </Card>
          <Card className="border-blue-500/20">
            <h3 className="text-base font-semibold text-blue-400">مؤسسات خاصة</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              يمكن لعملاء المؤسسات مناقشة خيارات النشر الخاص وتكوينات التخزين
              المخصص وسياسات التوجيه التي تحافظ على جميع البيانات داخل بنيتهم
              التحتية الخاصة.
            </p>
          </Card>
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                title="ما يبقى محلياً"
                subtitle="البيانات التي لا تغادر جهازك."
                align="left"
              />
              <ul className="mt-8 space-y-3">
                {localData.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-muted">
                    <span className="mt-1 shrink-0 text-emerald">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTitle
                title="ما يذهب إلى السحابة"
                subtitle="البيانات المُرسلة فقط عندما تختار التحليل أو التوصيل."
                align="left"
              />
              <ul className="mt-8 space-y-3">
                {cloudData.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-muted">
                    <span className="mt-1 shrink-0 text-gold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="ضوابط بيانات المستخدم"
          subtitle="ما يمكنك التحكم به الآن وما هو قادم."
          align="left"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {userControls.map((item) => (
            <Card key={item.label} className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground">{item.label}</span>
              <StatusChip status={item.status} />
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/ar/local-mode" variant="secondary">تفاصيل الوضع المحلي</Button>
          <Button href="/ar/security" variant="ghost">البنية الأمنية</Button>
          <Button href="/ar/trust" variant="ghost">مركز الثقة</Button>
        </div>
      </section>
    </>
  );
}
