import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "مزودو الذكاء الاصطناعي — Chairman AI",
  description:
    "كيف يختار Chairman ويوجّه طلبات الذكاء. الموجّه المتحكَّم به وسياسات الخصوصية.",
};

const providerCategories = [
  {
    label: "النماذج المحلية على جهاز المستخدم",
    description:
      "وضع تطبيق سطح المكتب المحلي. لا طلب سحابي. لا استدعاء شبكي. يقوم جهازك بكل المعالجة — لا يُرسَل أي شيء خارجياً.",
    status: "implemented" as const,
  },
  {
    label: "البنية التحتية السحابية للذكاء الاصطناعي المعتمدة",
    description:
      "تُستخدم فقط في وضع الذكاء السحابي. يُرسَل النص المحدد بعد موافقتك الصريحة. يُوجِّه Chairman عبر بنية تحتية معتمدة مع تطبيق ضوابط الخصوصية.",
    status: "implemented" as const,
  },
  {
    label: "مسارات مؤهّلة لعدم الاحتفاظ بالبيانات (ZDR)",
    description:
      "للطلبات السحابية الحساسة للخصوصية، تُمنح الأولوية للمسارات ذات عدم الاحتفاظ بالبيانات حيثما كانت متاحة ومؤهّلة تقنياً. يعتمد توفر ZDR على دعم البنية التحتية.",
    status: "planned" as const,
  },
  {
    label: "البنية التحتية الخاصة/المستضافة ذاتياً مستقبلاً",
    description:
      "خيار مؤسسي للنشر الخاص الكامل. لا تغادر بيانات مؤسستك بيئتك المتحكَّم بها. متاح ضمن اتفاقية نشر خاص.",
    status: "enterprise" as const,
  },
];

const faqs = [
  {
    q: "هل يشارك Chairman بياناتي مع مزودي الذكاء الاصطناعي؟",
    a: "قد يرسل وضع الذكاء السحابي النص المحدد إلى البنية التحتية المعتمدة. أما وضع الخصوصية المحلي فلا يرسل أي شيء إلى السحابة. أرشيفك الخاص الكامل والمستندات المحلية والملفات المخزّنة لا تُحوَّل تلقائياً إلى أي مزود ذكاء اصطناعي.",
  },
  {
    q: "هل يمكنني رؤية أي مزود تم استخدامه؟",
    a: "يبقى التوجيه التقني داخلياً. أنت ترى النتيجة وليس البنية التحتية. هذا مقصود — يضيف Chairman قواعد التوجيه وضمانات الخصوصية ومنطق الأعمال وضوابط الموافقة فوق أي بنية تحتية معتمدة.",
  },
  {
    q: "هل عدم الاحتفاظ بالبيانات (ZDR) مضمون؟",
    a: "تُستخدم مسارات ZDR حيثما كانت متاحة ومؤهّلة تقنياً. لا يمكننا ضمان ZDR لجميع أنواع الطلبات. وضع الخصوصية المحلي هو الخيار الأقوى للخصوصية إذا كان ZDR متطلباً صارماً.",
  },
];

export default function ArAiProvidersPage() {
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
            مزودو الذكاء الاصطناعي
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            كيف يختار Chairman ويوجّه طلبات الذكاء.
          </p>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/8 bg-panel p-8">
          <p className="text-base leading-8 text-muted">
            يستخدم Chairman موجِّه ذكاء متحكَّم به. يختار الموجِّه مسارات المعالجة المعتمدة بناءً
            على خطة المستخدم والوضع المختار وإعدادات الخصوصية والتوفر. لا تُكشف تفاصيل أي مزود
            ذكاء اصطناعي للواجهة الأمامية أو تُرسَل إلى المتصفح.
          </p>
        </div>
      </section>

      {/* Provider Categories */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="فئات مسارات الذكاء"
          subtitle="أنواع مسارات المعالجة التي قد يستخدمها Chairman، مصنّفةً حسب الفئة."
          align="left"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {providerCategories.map((cat) => (
            <Card key={cat.label} hover>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-foreground">{cat.label}</h3>
                <StatusChip status={cat.status} />
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{cat.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* No-Training Policy */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="سياسة عدم التدريب"
            subtitle="بياناتك الخاصة لا تُستخدم أبداً لتدريب النماذج العامة."
            align="left"
          />
          <Card className="mt-10">
            <p className="text-sm leading-7 text-muted">
              لا يستخدم Chairman AI ملفات العملاء الخاصة أو نصوص الطلبات أو بيانات الأعمال
              لتدريب نموذج عام. يُستخدم محتواك فقط لتوليد المخرجات التي طلبتها. ينطبق ذلك
              على جميع مسارات الذكاء في Chairman — سواء السحابية أو المحلية.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="الأسئلة الشائعة"
          subtitle="أسئلة شائعة حول كيفية توجيه Chairman لطلبات الذكاء."
          align="left"
        />
        <div className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <Card key={faq.q}>
              <h3 className="text-base font-semibold text-foreground">{faq.q}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
