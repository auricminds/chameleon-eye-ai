import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "مركز الثقة — Chameleon",
  description:
    "كيف تحمي Chameleon بيانات الأعمال وتفصل بين مساحات العمل وتتحكم في توجيه الذكاء الاصطناعي.",
};

const proofChecklist = [
  { label: "توجيه الذكاء الاصطناعي من جانب الخادم", status: "implemented" as const },
  { label: "لا مفاتيح AI في الواجهة الأمامية", status: "implemented" as const },
  { label: "تحليل Business DNA", status: "implemented" as const },
  { label: "فصل مساحات العمل", status: "implemented" as const },
  { label: "وضع الخصوصية (محلي أولاً)", status: "implemented" as const },
  { label: "الصلاحيات القائمة على الأدوار", status: "planned" as const },
  { label: "سجلات التدقيق", status: "planned" as const },
  { label: "النشر الخاص للمؤسسات", status: "enterprise" as const },
  { label: "الامتثال لـ SOC 2", status: "planned" as const },
  { label: "ضوابط الاحتفاظ بالبيانات", status: "planned" as const },
];

const trustFeatures = [
  "منصة AI خاصة المصدر",
  "توجيه AI من جانب الخادم",
  "لا مفاتيح AI أمامية",
  "فصل مساحات العمل",
  "الصلاحيات القائمة على الأدوار",
  "وضع الخصوصية",
  "API Vault",
  "ضوابط المؤسسات",
];

const faqs = [
  {
    q: "هل Chameleon Eye AI مفتوح المصدر؟",
    a: "لا. Chameleon Eye AI منصة أعمال AI خاصة المصدر. الكود المصدري وقواعد التوجيه ومنطق Business DNA وأنظمة الصناعة ومحركات سير العمل كلها ملكية خاصة. هذا متعمد — المنصة مصممة لعمليات الأعمال وليس للتعاون المفتوح أو التجريب على النماذج.",
  },
  {
    q: "هل Chameleon Eye AI مجرد غلاف حول نموذج AI؟",
    a: "لا. قد تكون بنية AI المصرح بها متصلة في الخلفية، لكن Chameleon تضيف طبقة توجيه كاملة وتحليل Business DNA وذكاء المستندات ومنطق سير العمل وصلاحيات الأدوار وتقييم المخاطر وإنشاء التقارير وتتبع القرارات وأنظمة خاصة بكل صناعة.",
  },
  {
    q: "ما نموذج AI الذي تستخدمه Chameleon؟",
    a: "تستخدم Chameleon طبقة توجيه ذكاء داخلية. يُصنّف النظام كل مهمة ويختار مسار البنية التحتية الأنسب. يبقى التوجيه التقني داخلياً حتى يتمكن المستخدمون من التركيز على التقارير والمخاطر والقرارات والعمليات بدلاً من إدارة مزودي النماذج.",
  },
  {
    q: "أين تذهب بياناتي؟",
    a: "Chameleon مصممة على مبدأ المحلية أولاً والموافقة قبل أي إرسال. البيانات المحلية المدعومة تبقى على جهازك. يُستخدم التحليل السحابي فقط عندما توافق على إرسال المحادثات أو مقتطفات الملفات أو بيانات الموصلات المحددة عبر مسارات الخادم الخاصة بـ Chameleon.",
  },
  {
    q: "هل يمكنني استخدام Chameleon عبر API؟",
    a: "نعم. تقدم Chameleon سير عمل API آمنة للذكاء الاصطناعي للأعمال والمستندات ومراجعات المخاطر وإنشاء التقارير وأحداث Webhook وأنظمة الصناعة. إنها ليست raw model API — إنها API ذكاء أعمال منظم.",
  },
  {
    q: "هل يمكن لعملاء المؤسسات تقييد توجيه AI؟",
    a: "يمكن لعملاء المؤسسات طلب سياسات التوجيه المعتمدة ومناقشات النشر الخاص وضوابط الاحتفاظ بالبيانات وصلاحيات الأدوار وفصل مساحات العمل حسب نطاق التنفيذ.",
  },
];

export default function ArTrustPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            مركز الثقة
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            مركز ثقة Chameleon
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            كيف تحمي Chameleon بيانات الأعمال وتفصل بين مساحات العمل وتتحكم
            في توجيه الذكاء الاصطناعي.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {trustFeatures.map((f) => (
              <span
                key={f}
                className="rounded-full border border-emerald/20 bg-emerald/8 px-4 py-1.5 text-sm text-emerald"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What Chameleon Is / Is Not */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-foreground">ما هي Chameleon</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-2">
                <span className="mt-1 text-emerald">+</span>
                <span>منصة أعمال AI خاصة المصدر مبنية للعمليات والمخاطر والذكاء والقرارات.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-emerald">+</span>
                <span>نظام تشغيل صناعي مع وحدات مخصصة للفنادق والمستشفيات والعقارات وشركات القابضة.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-emerald">+</span>
                <span>موجّه ذكاء من جانب الخادم يصنّف المهام ويختار البنية التحتية المعتمدة دون الكشف عن تفاصيل المزود للواجهة الأمامية.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-emerald">+</span>
                <span>طبقة Business DNA التي تحلل سياق كل شركة حتى تكون مخرجات الذكاء مناسبة لواقعها الفعلي.</span>
              </li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-foreground">ما ليست عليه Chameleon</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-2">
                <span className="mt-1 text-gold">—</span>
                <span>ليست نموذجاً أساسياً مفتوح المصدر أو منصة لتدريب النماذج.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-gold">—</span>
                <span>ليست تنزيلاً للنماذج أو خدمة نشر ذاتي للنماذج.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-gold">—</span>
                <span>ليست غلافاً أمامياً يكشف مفاتيح مزودي AI في المتصفح.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-gold">—</span>
                <span>ليست مرجعاً نهائياً طبياً أو قانونياً أو مالياً. يجب مراجعة المخرجات من قبل متخصصين مؤهلين.</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Proof Checklist */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="قائمة التحقق الأمني"
            subtitle="حالة التنفيذ الحالية عبر جميع أبعاد الثقة الرئيسية."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {proofChecklist.map((item) => (
              <Card key={item.label} className="flex items-center justify-between gap-4">
                <span className="text-sm text-foreground">{item.label}</span>
                <StatusChip status={item.status} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="أسئلة شائعة حول الثقة"
          subtitle="إجابات على الأسئلة التي تطرحها فرق الأمن والشركاء والمشترون من المؤسسات."
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
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/ar/trust/faq" variant="secondary">
            الأسئلة الشائعة الكاملة
          </Button>
          <Button href="/ar/security" variant="ghost">
            البنية الأمنية
          </Button>
          <Button href="/ar/contact" variant="ghost">
            تواصل للمؤسسات
          </Button>
        </div>
      </section>
    </>
  );
}
