import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "الخصوصية — مركز ثقة Chameleon Eye AI",
  description:
    "كيف تتعامل Chameleon Eye AI مع بياناتك عبر الأوضاع المحلية والهجينة والسحابية. ما نجمعه وما لا نجمعه أبداً.",
};

const dataModes = [
  {
    number: "١",
    title: "وضع الخصوصية المحلي",
    color: "border-emerald/30 bg-emerald/5",
    titleColor: "text-emerald",
    description:
      "تبقى البيانات بالكامل على جهازك. لا يُرسَل أي طلب إلى خوادم Chameleon أو أي مزود ذكاء اصطناعي.",
    details: [
      "الوثائق والملفات لا تغادر جهازك أبداً",
      "المعالجة تتم محلياً باستخدام القدرات الموجودة على الجهاز",
      "لا تُجرى أي مكالمة شبكة لمهام الذكاء الاصطناعي",
      "لا حاجة لحساب Chameleon للاستخدام المحلي فقط",
    ],
  },
  {
    number: "٢",
    title: "وضع الموافقة الهجين",
    color: "border-gold/30 bg-gold/5",
    titleColor: "text-gold",
    description:
      "محلي افتراضياً. تحدد النص وتراجعه وتوافق صراحةً قبل إرسال أي شيء إلى السحابة.",
    details: [
      "الملفات المحلية تبقى على الجهاز",
      "فقط النص الذي تحدده وتوافق عليه يُرسَل",
      "بوابة موافقة السحابة تظهر قبل كل طلب سحابي",
      "النص المُوافَق عليه يُعالَج ولا يُحتفظ به افتراضياً",
    ],
  },
  {
    number: "٣",
    title: "وضع السحابة / API",
    color: "border-white/15 bg-panel2",
    titleColor: "text-foreground",
    description:
      "لسير عمل الذكاء الاصطناعي السحابي وتكاملات API. خاضع لفحوصات الخصوصية وضوابط التوجيه.",
    details: [
      "الطلبات تُوجَّه عبر خادم Chameleon Eye API",
      "مفاتيح المزودين لا تُعرض للعميل أبداً",
      "عزل البيانات مُطبَّق على مستوى مساحة العمل",
      "لا تُخزَّن نصوص الطلبات الخام افتراضياً",
    ],
  },
];

const weCollect = [
  { item: "عنوان البريد الإلكتروني للحساب", reason: "المصادقة" },
  { item: "بيانات الفواتير", reason: "إدارة الخطة والامتثال القانوني" },
  { item: "عدادات الاستخدام (عدد الرموز، الوضع، الحالة)", reason: "تطبيق الخطة والفواتير" },
  { item: "أحداث الموقع المجهّلة", reason: "تحسين المنتج (يمكن الإلغاء)" },
  { item: "رسائل الدعم", reason: "حل المشكلات" },
  { item: "بيانات وصف سجل التدقيق (بدون محتوى)", reason: "الأمان ومراجعة المالك" },
];

const weDoNotCollect = [
  "نصوص الطلبات أو الاستعلامات الخام",
  "ردود نماذج الذكاء الاصطناعي",
  "محتوى الملفات المحلية",
  "ملفات السلوك لأغراض الإعلانات",
  "البيانات لاستهداف إعلانات الطرف الثالث",
  "البيانات الشخصية لتدريب النماذج",
];

export default function ArTrustPrivacyPage() {
  return (
    <div dir="rtl">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            مركز الثقة
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            الخصوصية
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            كيف تتعامل Chameleon مع بياناتك عبر جميع الأوضاع — وما لا تفعله
            أبداً.
          </p>
        </div>
      </section>

      {/* Three Data Modes */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="ثلاثة أوضاع للبيانات"
          subtitle="تعمل Chameleon عبر ثلاثة أوضاع للخصوصية. أنت تختار مقدار ما يصل إلى السحابة."
          align="left"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {dataModes.map((mode) => (
            <div
              key={mode.title}
              className={`rounded-2xl border p-6 ${mode.color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-2xl font-bold ${mode.titleColor}`}>
                  {mode.number}
                </span>
                <h3 className={`text-base font-semibold ${mode.titleColor}`}>
                  {mode.title}
                </h3>
              </div>
              <p className="text-sm leading-7 text-muted mb-4">
                {mode.description}
              </p>
              <ul className="space-y-2">
                {mode.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm text-muted">
                    <span className="mt-1 text-emerald shrink-0">+</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* What We Collect vs What We Don't */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="ما نجمعه مقابل ما لا نجمعه"
            subtitle="ملخص مباشر لفئات البيانات."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="text-base font-semibold text-foreground mb-4">
                ما نجمعه
              </h3>
              <div className="space-y-3">
                {weCollect.map((row) => (
                  <div
                    key={row.item}
                    className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {row.item}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{row.reason}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-base font-semibold text-foreground mb-4">
                ما لا نجمعه
              </h3>
              <ul className="space-y-3">
                {weDoNotCollect.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="mt-1 text-gold shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* No-Training Statement */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-8">
          <p className="text-base font-semibold text-emerald mb-3">
            التزام عدم التدريب
          </p>
          <p className="text-base leading-8 text-foreground">
            لا يستخدم Chameleon Eye AI ملفات العملاء الخاصة أو نصوص الطلبات أو
            بيانات الأعمال لتدريب نموذج ذكاء اصطناعي عام. يُستخدم محتواك فقط
            لإنتاج المخرجات التي طلبتها.
          </p>
          <div className="mt-6">
            <Button href="/ar/trust/no-training-policy" variant="secondary">
              قراءة سياسة عدم التدريب
            </Button>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                أسئلة الخصوصية
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                تواصل مع فريق الخصوصية لأسئلة حول التعامل مع البيانات.
              </p>
            </div>
            <Button href="mailto:privacy@chameleoneye.ai" variant="primary">
              privacy@chameleoneye.ai
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/ar/trust/data-retention" variant="secondary">
              سياسة الاحتفاظ بالبيانات
            </Button>
            <Button href="/ar/trust/no-training-policy" variant="ghost">
              سياسة عدم التدريب
            </Button>
            <Button href="/ar/trust/data-deletion" variant="ghost">
              حذف البيانات
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
