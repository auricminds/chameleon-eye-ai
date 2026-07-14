import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "الوضع المحلي أولاً والوضع الخاص — Chameleon",
  description:
    "كيف تدعم Chameleon Eye AI سير العمل المحلية للحفاظ على الملفات الحساسة على جهازك.",
};

const localItems = [
  "تثبيت تطبيق سطح المكتب وتفعيله",
  "ذاكرة التخزين المؤقت لمساحة العمل المحلية وبيانات الجلسة",
  "معاينة الملفات محلياً — مشاهدة المستندات دون إرسالها إلى السحابة",
  "بيانات الإعداد والتكوين المحلية",
  "ملف Business DNA المخزّن محلياً حيثما كان مدعوماً",
];

const cloudItems = [
  "المحادثات والاستفسارات التي تختار إرسالها",
  "مقتطفات الملفات المعتمدة التي تختارها للتحليل",
  "بيانات الموصلات المعتمدة — فقط بعد تفويضك للاتصال",
  "طلبات إنشاء التقارير",
];

const enterpriseItems = [
  "النشر على بنية تحتية خاصة",
  "تكوين التخزين الخاص",
  "ضوابط توجيه الذكاء المخصصة",
  "ضوابط إقامة البيانات",
  "تسجيل التدقيق للمؤسسات",
];

const tiers = [
  {
    name: "محلي",
    color: "border-emerald/30 bg-emerald/5",
    labelColor: "text-emerald",
    items: localItems,
  },
  {
    name: "سحابة بالموافقة",
    color: "border-white/15 bg-panel",
    labelColor: "text-foreground",
    items: cloudItems,
  },
  {
    name: "مؤسسات",
    color: "border-blue-500/30 bg-blue-500/5",
    labelColor: "text-blue-400",
    items: enterpriseItems,
  },
];

export default function ArLocalModePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            الوضع المحلي
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            الوضع المحلي أولاً والوضع الخاص
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            تدعم Chameleon سير العمل المحلية. الهدف هو الحفاظ على الملفات
            الحساسة وبيانات مساحة العمل على جهازك حيثما أمكن، مع إرسال المحتوى
            المعتمد فقط للتحليل السحابي عندما تختار ذلك.
          </p>
        </div>
      </section>

      <section className="border-b border-white/8 bg-panel/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="border-emerald/20 max-w-3xl">
            <p className="text-sm leading-7 text-foreground">
              <strong className="text-emerald">المحلي أولاً يعني</strong> أن
              الافتراض الأساسي هو بقاء بياناتك على جهازك. التحليل السحابي
              اختياري لكل جلسة ومستند واستفسار — ليس تلقائياً. أنت تختار ما
              يغادر جهازك ومتى.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="ثلاثة مستويات للبيانات"
          subtitle="فهم أين تعيش بياناتك في كل مرحلة من مراحل استخدام Chameleon."
          align="left"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.color}>
              <h3 className={`text-base font-semibold ${tier.labelColor}`}>{tier.name}</h3>
              <ul className="mt-5 space-y-3">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-7 text-muted">
                    <span className={`mt-1 shrink-0 ${tier.labelColor}`}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="تطبيق سطح المكتب والبوابة المحلية"
            subtitle="موصّل سطح المكتب يوسّع قدرات المحلي أولاً إلى ما هو أبعد من المتصفح."
            align="left"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "تفعيل الجهاز الآمن", desc: "عملاء سطح المكتب يُفعَّلون برموز قصيرة المدة — لا بمفاتيح رئيسية." },
              { label: "معالجة الملفات محلياً", desc: "يمكن معاينة الملفات ومعالجتها جزئياً دون مغادرة الجهاز." },
              { label: "تحديث الرموز", desc: "تستمر الجلسات بدون إعادة المصادقة باستخدام تحديث الرموز الآمن." },
              { label: "إلغاء الجهاز", desc: "يمكن إلغاء الأجهزة من المنصة، مما يُنهي وصولها فوراً." },
            ].map((f) => (
              <Card key={f.label} hover>
                <h3 className="text-sm font-semibold text-foreground">{f.label}</h3>
                <p className="mt-2 text-xs leading-6 text-muted">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          <Button href="/ar/privacy" variant="secondary">الخصوصية والتحكم بالبيانات</Button>
          <Button href="/ar/enterprise" variant="ghost">الوضع الخاص للمؤسسات</Button>
          <Button href="/ar/trust" variant="ghost">مركز الثقة</Button>
        </div>
      </section>
    </>
  );
}
