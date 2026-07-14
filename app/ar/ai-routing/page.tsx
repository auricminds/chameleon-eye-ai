import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "توجيه الذكاء في Chameleon",
  description:
    "كيف تُصنّف Chameleon مهام الأعمال وتوجّهها عبر مسار الذكاء المعتمد الأنسب.",
};

const taskCategories = [
  { name: "الأعمال العامة", desc: "الأسئلة التشغيلية والملخصات ونظرات عامة على الأعمال." },
  { name: "الاستراتيجية العميقة", desc: "التخطيط بعيد المدى والتموضع التنافسي وتحليل النمو." },
  { name: "المالية والمحاسبة", desc: "تحليل الإيرادات ومراجعة التكاليف وإشارات التدفق النقدي والمخاطر المالية." },
  { name: "المخاطر القانونية والامتثال", desc: "إشارات مراجعة العقود وكشف ثغرات الامتثال وتصنيف المخاطر." },
  { name: "البرمجة وAPI والمنتج", desc: "مراجعة تقنية وتصميم API وتحليل منطق المنتج." },
  { name: "مراجعة البنية والمشاريع", desc: "مراجعة تصميم الأنظمة وإشارات صحة المشروع ومخاطر التسليم." },
  { name: "تحليل المستندات", desc: "معالجة المستندات المعتمدة والاستخراج والملخص المنظم." },
  { name: "تحليل الصور واللقطات", desc: "مراجعة المستندات المرئية وتفسير اللقطات واستخراج البيانات من الصور." },
  { name: "التسويق والمبيعات", desc: "تحليل الحملات ومراجعة التموضع وكشف إشارات التحويل." },
  { name: "الموارد البشرية والفريق", desc: "إشارات فاعلية الفريق وكشف فجوات المهارات وتقييم جاهزية الأدوار." },
  { name: "مراجعة المخاطر", desc: "تسجيل المخاطر المنظم والتصنيف والمخرجات القابلة للتنفيذ." },
  { name: "الرد التنفيذي بالعربية", desc: "ردود مدركة لسياق الأعمال ومنسّقة للمديرين التنفيذيين العرب." },
  { name: "الإجابة السريعة", desc: "مخرجات منظمة سريعة للأسئلة التشغيلية الحساسة للوقت." },
  { name: "مسار آمن احتياطي", desc: "مسار محافظ للطلبات الغامضة — يعطي الأولوية للدقة على السرعة." },
];

const flowSteps = [
  { label: "طلب المستخدم", color: "bg-panel border-white/15" },
  { label: "مُصنّف المهام", color: "bg-emerald/10 border-emerald/30" },
  { label: "قواعد Chameleon", color: "bg-gold/10 border-gold/30" },
  { label: "فحص وضع الخصوصية", color: "bg-panel2 border-white/15" },
  { label: "مسار الذكاء المعتمد", color: "bg-emerald/10 border-emerald/30" },
  { label: "إجابة Chameleon المنسّقة", color: "bg-gold/10 border-gold/30" },
];

const faqs = [
  {
    q: "لماذا لا تُظهر Chameleon اسم النموذج؟",
    a: "Chameleon مصممة لمستخدمي الأعمال. تُحتفظ بطبقة التوجيه داخلياً حتى يتمكن المستخدمون من التركيز على التقارير ومراجعات المخاطر والقرارات والعمليات — لا على إدارة أو مقارنة مزودي نماذج AI. يجب على مستخدمي الأعمال ألا يحتاجوا لفهم البنية التحتية للحصول على مخرجات مناسبة للأعمال.",
  },
  {
    q: "هل Chameleon مجرد غلاف حول نموذج AI؟",
    a: "لا. Chameleon منصة أعمال AI خاصة المصدر. قد تكون بنية ذكاء معتمدة متصلة في الخلفية، لكن المنصة تضيف تصنيف المهام وقواعد التوجيه وحقن سياق Business DNA وفحوصات وضع الخصوصية ومنطق سير العمل وتنسيقات التقارير المنظمة وتسجيل المخاطر وصلاحيات الأدوار وأنظمة خاصة بكل صناعة.",
  },
  {
    q: "هل يمكنني اختيار مسار الذكاء المستخدم؟",
    a: "تُدار قرارات التوجيه بواسطة طبقة التصنيف الداخلية لـ Chameleon بناءً على نوع المهمة وسياق الأعمال وإعدادات الخصوصية وقواعد المنصة. يمكن لعملاء المؤسسات مناقشة سياسات التوجيه المعتمدة وقواعد التوجيه المخصصة.",
  },
  {
    q: "ماذا يحدث عند تفعيل وضع الخصوصية؟",
    a: "عند تفعيل وضع الخصوصية، تتحقق طبقة التوجيه مما إذا كان يمكن معالجة المهمة محلياً قبل النظر في أي مسار سحابي. المهام التي يمكن معالجتها محلياً تبقى على جهازك. يُستدعى التحليل السحابي فقط للمهام التي تتطلبه فعلاً، وفقط بعد نجاح فحص الخصوصية.",
  },
];

export default function ArAiRoutingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            توجيه الذكاء
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            توجيه ذكاء Chameleon
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            لا تكشف Chameleon مزودي النماذج الخام. تُصنّف كل مهمة أعمال وتوجّهها
            عبر مسار الذكاء المعتمد الأنسب — بشفافية ودون الحاجة للمستخدمين
            لفهم البنية التحتية الأساسية.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="فئات المهام"
          subtitle="Chameleon تتعرف على هذه الأنواع من المهام وتوجّه كل منها عبر مسار الذكاء المناسب."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {taskCategories.map((cat) => (
            <Card key={cat.name} hover>
              <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
              <p className="mt-2 text-xs leading-6 text-muted">{cat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="مسار الطلب"
            subtitle="كل طلب يتبع هذا المسار — دون استثناء."
            align="left"
          />
          <div className="mt-10 overflow-x-auto">
            <div className="flex min-w-max items-center gap-3">
              {flowSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className={`rounded-xl border px-5 py-3 text-center text-sm font-medium text-foreground ${step.color} max-w-[160px]`}>
                    {step.label}
                  </div>
                  {i < flowSteps.length - 1 && <span className="text-muted">←</span>}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs leading-6 text-muted">
            يتصل المتصفح فقط بمسارات الخادم الخاصة بـ Chameleon. يتم الوصول إلى
            البنية التحتية للذكاء المعتمدة من جانب الخادم فحسب — ليس من العميل.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="أسئلة شائعة حول التوجيه"
          subtitle="أسئلة شائعة حول كيفية توجيه Chameleon لمهام الذكاء."
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
          <Button href="/ar/architecture" variant="secondary">بنية المنصة</Button>
          <Button href="/ar/trust" variant="ghost">مركز الثقة</Button>
        </div>
      </section>
    </>
  );
}
