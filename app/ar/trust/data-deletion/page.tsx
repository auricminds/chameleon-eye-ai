import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "حذف البيانات وتصديرها — Chameleon Eye AI",
  description:
    "حقك في الوصول إلى بياناتك وحذفها. كيفية تصدير أو حذف بيانات حساب Chairman الخاص بك.",
};

const exportIncluded = [
  "ملف الحساب (الاسم، البريد الإلكتروني، التفضيلات)",
  "ملفات تعريف Brain المحفوظة",
  "المسودات المحفوظة",
  "بيانات وصفية للمستندات المحفوظة",
  "ملخص الاستخدام",
  "الإعدادات",
];

const exportNotIncluded = [
  "بيانات المستخدمين الآخرين",
  "سجلات معالجة الذكاء الاصطناعي الخام (غير محتفظ بها افتراضياً)",
  "سجلات الفواتير من طرف ثالث (متاحة عبر بوابة الفواتير)",
];

const deletionDeletes = [
  "الحساب وسجلات المصادقة",
  "المستندات والمسودات المحفوظة",
  "ملفات تعريف Brain",
  "الإعدادات والتفضيلات",
  "سجلات الموافقة السحابية",
];

const deletionRetains = [
  "سجلات الفواتير (متطلبات قانونية — حتى 7 سنوات)",
  "إجماليات الاستخدام المجهّلة (غير قابلة للتعريف شخصياً)",
  "سجلات التدقيق الأمني (سنة واحدة)",
];

export default function ArDataDeletionPage() {
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
            حذف البيانات وتصديرها
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            حقك في الوصول إلى بياناتك وحذفها.
          </p>
        </div>
      </section>

      {/* How to Request */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm font-semibold text-emerald mb-3">كيفية تقديم الطلب</p>
          <p className="text-sm leading-7 text-muted mb-4">
            انتقل إلى <strong className="text-foreground">الإعدادات ← الخصوصية والبيانات ← طلب الحذف</strong>، أو صدّر بياناتك
            من القسم نفسه. بدلاً من ذلك، راسلنا على{" "}
            <a href="mailto:privacy@chameleoneye.ai" className="text-emerald hover:underline">
              privacy@chameleoneye.ai
            </a>
            .
          </p>
          <p className="text-sm leading-7 text-muted">
            <strong className="text-gold">وقت المعالجة:</strong> تُعالَج طلبات التصدير خلال 30 يوماً. تُعالَج طلبات الحذف
            خلال 30 يوماً. ستتلقى بريداً إلكترونياً للتأكيد عند اكتمال طلبك.
          </p>
        </div>
      </section>

      {/* Export and Deletion Details */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Export */}
          <div>
            <SectionTitle title="تصدير بياناتي" subtitle="ما يتضمنه تصدير بياناتك." align="left" />
            <div className="mt-8 space-y-6">
              <Card>
                <h3 className="text-sm font-semibold text-emerald mb-4">مدرج في التصدير</h3>
                <ul className="space-y-2">
                  {exportIncluded.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 text-emerald shrink-0">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="text-sm font-semibold text-gold mb-4">غير مدرج في التصدير</h3>
                <ul className="space-y-2">
                  {exportNotIncluded.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 text-gold shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Deletion */}
          <div>
            <SectionTitle title="حذف بياناتي" subtitle="ما الذي يُحذف وما الذي قد يُحتفظ به." align="left" />
            <div className="mt-8 space-y-6">
              <Card>
                <h3 className="text-sm font-semibold text-emerald mb-4">ما الذي يُحذف</h3>
                <ul className="space-y-2">
                  {deletionDeletes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 text-emerald shrink-0">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="text-sm font-semibold text-gold mb-4">قد يُحتفظ به</h3>
                <ul className="space-y-2">
                  {deletionRetains.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1 text-gold shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>

        {/* Self-service note */}
        <div className="mt-10 rounded-2xl border border-white/8 bg-panel p-6">
          <p className="text-sm font-semibold text-foreground mb-2">حالة الخدمة الذاتية</p>
          <p className="text-sm leading-7 text-muted">
            الحذف الذاتي الآلي الكامل للبيانات قيد التطوير. تُعالَج طلبات الحذف الحالية من قبل
            فريق Chairman خلال 30 يوماً من الاستلام. سنُخطرك عند توفر الحذف الذاتي الآلي.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <Button href="/ar/settings/privacy" variant="primary">
              الذهاب إلى إعدادات الخصوصية
            </Button>
            <Button href="mailto:privacy@chameleoneye.ai" variant="secondary">
              مراسلة فريق الخصوصية
            </Button>
            <Button href="/ar/trust/data-retention" variant="ghost">
              عرض سياسة الاحتفاظ بالبيانات
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
