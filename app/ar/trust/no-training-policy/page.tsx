import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "سياسة عدم التدريب — Chameleon Eye AI",
  description:
    "لا يستخدم Chairman AI ملفات العملاء الخاصة أو نصوص الطلبات أو بيانات الأعمال لتدريب نموذج ذكاء اصطناعي عام.",
};

const whatThisMeans = [
  {
    heading: "الملفات المحلية لا تغادر جهازك",
    detail:
      "في وضع الخصوصية المحلي، تُعالَج مستنداتك وملفاتك ومحتواك بالكامل على جهازك. لا يُرسَل أي شيء إلى خوادم Chameleon أو أي مزود ذكاء اصطناعي.",
  },
  {
    heading: "النص السحابي المحدد يُعالَج ويُحذف",
    detail:
      "عندما تُوافق على إرسال النص المحدد للتحليل السحابي، يُعالَج هذا النص لإنتاج مخرجاتك ولا يُحتفظ به افتراضياً. لا يُستخدم في تدريب النماذج.",
  },
  {
    heading: "لا تحليل سلوكي لأغراض التدريب",
    detail:
      "أنماط استخدامك ونصوص طلباتك وتفاعلات سير العمل لا تُغذَّى في أي خط أنابيب لتدريب النماذج — سواء كانت عامة أو خاصة.",
  },
  {
    heading: "Business DNA يُستخدم فقط لسياق جلستك",
    detail:
      "تُستخدم ملفات تعريف Business DNA حصراً لجعل مخرجات الذكاء الاصطناعي ذات صلة بسياق عملك داخل جلستك. لا تُشارَك أو تُباع أو تُستخدم لتدريب أي نظام ذكاء اصطناعي عام.",
  },
];

const futureOptInRequirements = [
  "اشتراك اختياري فقط — لا تسجيل تلقائي أبداً",
  "يُشرح بوضوح قبل بدء التسجيل",
  "يتحكم فيه المستخدم في جميع الأوقات",
  "قابل للإلغاء في أي وقت دون عقوبة",
  "مُغطَّى بموافقة منفصلة وصريحة",
];

export default function ArNoTrainingPolicyPage() {
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
            سياسة عدم التدريب
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            بياناتك الخاصة لا تُستخدم أبداً لتدريب نموذج عام.
          </p>
        </div>
      </section>

      {/* Main Statement */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-8">
          <p className="text-base font-semibold text-emerald mb-3">
            الالتزام الأساسي
          </p>
          <p className="text-lg leading-8 text-foreground font-medium">
            لا يستخدم Chairman AI ملفات العملاء الخاصة أو نصوص الطلبات أو
            بيانات الأعمال لتدريب نموذج ذكاء اصطناعي عام.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            يُستخدم محتواك فقط لإنتاج المخرجات التي طلبتها. لا يُشارَك ولا
            يُباع ولا يُستخدم لتحسين أنظمة الذكاء الاصطناعي العامة.
          </p>
        </div>
      </section>

      {/* What This Means for You */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="ماذا يعني هذا بالنسبة لك"
          subtitle="كيف ينطبق التزام عدم التدريب عبر جميع الأوضاع والميزات."
          align="left"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {whatThisMeans.map((item) => (
            <Card key={item.heading}>
              <h3 className="text-base font-semibold text-foreground">
                {item.heading}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Future Optional Programs */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="البرامج الاختيارية المستقبلية"
            subtitle="أي برامج تدريب أو تحسين مستقبلية ستخضع لمتطلبات صارمة."
            align="left"
          />
          <div className="mt-10 rounded-2xl border border-white/8 bg-panel p-6">
            <p className="text-sm leading-7 text-muted mb-6">
              أي برامج تدريب أو تحسين اختيارية مستقبلية، إذا أُدخلت، يجب أن
              تستوفي جميع الشروط التالية قبل النظر في أي بيانات عميل:
            </p>
            <ul className="space-y-3">
              {futureOptInRequirements.map((req) => (
                <li key={req} className="flex gap-3 text-sm text-muted">
                  <span className="mt-1 text-emerald shrink-0">+</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-muted">
              لا يوجد مثل هذا البرنامج اليوم. يُقدَّم هذا القسم للشفافية حول
              كيفية إدارة أي برنامج مستقبلي.
            </p>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-base font-semibold text-foreground">
              ما يشمله هذا الالتزام
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                "الملفات والوثائق الخاصة",
                "نصوص الطلبات الخام",
                "بيانات ملف Business DNA",
                "النص السحابي المحدد",
                "محتوى طلبات API",
                "محتوى جلسة Terminal",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1 text-emerald shrink-0">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-base font-semibold text-foreground">
              ما لا يتأثر
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                "عدادات الاستخدام المجمّعة المجهّلة",
                "تقارير الأخطاء والأداء (بدون محتوى)",
                "بيانات الفواتير والخطط",
                "بيانات وصف سجل التدقيق الأمني",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1 text-gold shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="text-base font-semibold text-foreground">
              مزودو الطرف الثالث
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              عند استخدام التحليل السحابي، تُعالج بنية التحتية المعتمدة
              للذكاء الاصطناعي طلبك. تختار Chameleon مزودين بشروط استخدام
              بيانات تحظر التدريب على بيانات العملاء. راجع{" "}
              <a
                href="/ar/trust/ai-providers"
                className="text-emerald hover:underline"
              >
                صفحة مزودي الذكاء الاصطناعي
              </a>{" "}
              للتفاصيل.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                أسئلة الخصوصية
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                لأي أسئلة حول هذه السياسة أو كيفية التعامل مع بياناتك، تواصل
                مع فريق الخصوصية لدينا.
              </p>
            </div>
            <Button href="mailto:privacy@chameleoneye.ai" variant="primary">
              privacy@chameleoneye.ai
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/ar/trust/privacy" variant="secondary">
              سياسة الخصوصية
            </Button>
            <Button href="/ar/trust/data-retention" variant="ghost">
              الاحتفاظ بالبيانات
            </Button>
            <Button href="/ar/trust/ai-providers" variant="ghost">
              مزودو الذكاء الاصطناعي
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
