import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusChip } from "@/components/trust/StatusChip";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "الذكاء الخاص مقابل الذكاء السحابي — Chameleon Eye AI",
  description:
    "فهم إلى أين تذهب بياناتك — ومتى. مقارنة بين الذكاء المحلي الخاص والذكاء السحابي.",
};

const localFeatures = [
  "يعمل على جهازك عند تثبيت تطبيق سطح المكتب",
  "لا طلب سحابي للذكاء الاصطناعي",
  "لا استدعاء شبكي للتحليل",
  "لا معالجة من أي مزود",
  "محتوى الملف يبقى على الجهاز",
  "أقوى خيار للخصوصية",
];

const cloudFeatures = [
  "يُستخدم فقط للطلبات المحددة",
  "قد يستخدم بنية تحتية معتمدة لطرف ثالث",
  "قد يُرسَل النص المحدد بعد موافقتك الصريحة",
  "أرشيفك الخاص الكامل لا يُرسَل تلقائياً",
  "عدد الرموز المميزة والتكلفة يُتتبّع للفوترة",
  "نصوص الطلبات الخام لا تُخزَّن افتراضياً",
];

const comparisonRows = [
  {
    feature: "مغادرة البيانات للجهاز",
    local: "لا — أبداً",
    cloud: "النص المحدد فقط (بموافقة)",
    localGood: true,
  },
  {
    feature: "السرعة",
    local: "يعتمد على الجهاز",
    cloud: "سريع",
    localGood: false,
  },
  {
    feature: "يحتاج إنترنت",
    local: "لا",
    cloud: "نعم",
    localGood: true,
  },
  {
    feature: "إرسال محتوى الملف",
    local: "لا — أبداً",
    cloud: "لا أبداً (النص المحدد فقط)",
    localGood: true,
  },
  {
    feature: "تخزين الاستجابة",
    local: "لا",
    cloud: "لا (افتراضياً)",
    localGood: true,
  },
  {
    feature: "الأنسب لـ",
    local: "المستندات الحساسة والبيانات السرية",
    cloud: "التحليل المعقد والسياق الواسع",
    localGood: null,
  },
];

export default function ArLocalVsCloudPage() {
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
            الذكاء الخاص مقابل الذكاء السحابي
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            فهم إلى أين تذهب بياناتك — ومتى.
          </p>
        </div>
      </section>

      {/* Two column cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Local */}
          <Card className="border-emerald/20">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">الذكاء الخاص</h2>
                <p className="text-sm text-muted mt-1">معالجة محلية على جهازك</p>
              </div>
              <StatusChip status="implemented" />
            </div>
            <ul className="space-y-3">
              {localFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 text-emerald shrink-0">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/8">
              <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald">
                متاح مع تطبيق سطح المكتب
              </span>
            </div>
          </Card>

          {/* Cloud */}
          <Card className="border-gold/20">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">الذكاء السحابي</h2>
                <p className="text-sm text-muted mt-1">معالجة سحابية بموافقة</p>
              </div>
              <StatusChip status="implemented" />
            </div>
            <ul className="space-y-3">
              {cloudFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 text-gold shrink-0">~</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/8">
              <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                متاح (يتطلب الموافقة)
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="مقارنة جنباً إلى جنب"
            subtitle="الفوارق الرئيسية بين وضعي الذكاء المحلي الخاص والذكاء السحابي."
            align="left"
          />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-panel2">
                  <th className="px-4 py-3 text-right font-semibold text-foreground">الميزة</th>
                  <th className="px-4 py-3 text-right font-semibold text-emerald">الذكاء المحلي</th>
                  <th className="px-4 py-3 text-right font-semibold text-gold">الذكاء السحابي</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-panel" : "bg-panel/60"}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                    <td className={`px-4 py-3 ${row.localGood === true ? "text-emerald" : "text-muted"}`}>
                      {row.local}
                    </td>
                    <td className={`px-4 py-3 ${row.localGood === false ? "text-emerald" : "text-muted"}`}>
                      {row.cloud}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4">
          <Button href="/ar/local-mode" variant="primary">
            معرفة المزيد عن الوضع المحلي
          </Button>
          <Button href="/ar/settings/privacy" variant="secondary">
            إعدادات الخصوصية
          </Button>
          <Button href="/ar/trust/data-retention" variant="ghost">
            سياسة الاحتفاظ بالبيانات
          </Button>
        </div>
      </section>
    </div>
  );
}
