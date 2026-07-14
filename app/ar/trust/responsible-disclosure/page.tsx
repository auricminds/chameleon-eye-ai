import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "الإفصاح المسؤول — Chairman AI",
  description:
    "كيفية الإبلاغ عن ثغرة أمنية إلى Chairman. عملية الإفصاح المسؤول وسياسة الملاذ الآمن.",
};

const whatToReport = [
  "تجاوز المصادقة أو الاستيلاء على الحساب",
  "كشف البيانات أو الوصول غير المصرح به للبيانات",
  "ثغرات حقن SQL أو حقن الأوامر",
  "ضوابط وصول مكسورة",
  "تسرب بيانات حساسة (معلومات شخصية، بيانات اعتماد، رموز)",
  "كشف مفاتيح API في الواجهة الأمامية أو نقاط النهاية العامة",
  "البرمجة النصية عبر المواقع (XSS) ذات التأثير الكبير",
  "تزوير طلبات من جانب الخادم (SSRF)",
];

const whatNotToDo = [
  "لا تصل إلى بيانات المستخدمين الآخرين أو تستخرجها أو تعدّلها",
  "لا تُجري اختبارات مدمّرة (حذف البيانات، رفض الخدمة، استنزاف الموارد)",
  "لا تُنفّذ هجمات رفض الخدمة أو هجمات التحميل على أنظمة Chairman",
  "لا تُفصح علناً عن الثغرة قبل أن تتناولها Chairman",
  "لا تستخدم أدوات المسح الآلي التي تُولّد حركة مرور مفرطة",
  "لا تُهندس اجتماعياً موظفي Chairman أو المقاولين",
];

export default function ArResponsibleDisclosurePage() {
  return (
    <div dir="rtl">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            الأمان
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            الإفصاح المسؤول
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            كيفية الإبلاغ عن ثغرة أمنية إلى Chairman.
          </p>
          <div className="mt-8">
            <Button href="mailto:security@chameleoneye.ai" variant="primary">
              الإبلاغ عن ثغرة
            </Button>
          </div>
        </div>
      </section>

      {/* How to Report */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionTitle
              title="كيفية الإبلاغ"
              subtitle="أرسل تقارير الأمان عبر البريد الإلكتروني. نحن نأخذ جميع التقارير على محمل الجد."
              align="left"
            />
            <div className="mt-10 space-y-6">
              <Card>
                <h3 className="text-base font-semibold text-foreground">الإبلاغ عن المشكلات الأمنية</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  أرسل تقريرك إلى:{" "}
                  <a
                    href="mailto:security@chameleoneye.ai"
                    className="text-emerald hover:underline"
                  >
                    security@chameleoneye.ai
                  </a>
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  أدرج في تقريرك: وصفاً واضحاً للثغرة، وخطوات استنساخها، والتأثير المحتمل، وأي
                  كود إثبات المفهوم أو لقطات شاشة ذات صلة. قم بتشفير التقارير الحساسة باستخدام
                  مفتاحنا العام إذا كان متاحاً.
                </p>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-foreground">الجدول الزمني للاستجابة</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { step: "الإقرار بالاستلام", time: "خلال 5 أيام عمل" },
                    { step: "التقييم الأولي", time: "خلال 10 أيام عمل" },
                    { step: "الإصلاح والتنسيق", time: "يعتمد على الخطورة" },
                    { step: "الإفصاح العلني", time: "منسّق بعد الإصلاح" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                      <span className="text-sm text-foreground">{item.step}</span>
                      <span className="text-sm text-muted">{item.time}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-foreground">الاعتراف بالباحثين</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  يُقدّر Chairman الباحثين الأمنيين المسؤولين. بإذنك، سنعترف بالإفصاحات الموثّقة
                  علناً. لا نُشغّل حالياً برنامج مكافآت أخطاء رسمي، لكننا نُكرّم الباحثين الذين
                  يبلّغون عن ثغرات صالحة وذات تأثير كبير بشكل مسؤول.
                </p>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-base font-semibold text-foreground mb-4">ماذا تُبلِّغ عنه</h3>
              <ul className="space-y-2">
                {whatToReport.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="mt-1 text-emerald shrink-0">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* What NOT to do */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="ما يجب عدم فعله"
            subtitle="الإجراءات التي تخرج عن نطاق الإفصاح المسؤول وقد تُفضي إلى اتخاذ إجراءات قانونية."
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {whatNotToDo.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border border-white/8 bg-panel p-4"
              >
                <span className="mt-0.5 text-gold shrink-0">—</span>
                <span className="text-sm leading-6 text-muted">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="text-sm leading-7 text-muted">
              يُعدّ التصرف وفق الإرشادات أعلاه بحثاً أمنياً بحسن نية. لن تتخذ Chairman إجراءات
              قانونية ضد الباحثين الذين يلتزمون بهذه الإرشادات. قد تؤدي الإجراءات خارج هذه
              الإرشادات إلى اتخاذ إجراءات قانونية بموجب قوانين جرائم الكمبيوتر والجرائم
              الإلكترونية المعمول بها.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
