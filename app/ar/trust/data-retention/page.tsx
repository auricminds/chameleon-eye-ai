import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "سياسة الاحتفاظ بالبيانات — Chameleon Eye AI",
  description:
    "ما الذي يخزّنه Chairman، وأين، ولماذا، وإلى متى.",
};

const retentionRows = [
  {
    type: "البريد الإلكتروني للحساب",
    stored: "نعم",
    where: "قاعدة البيانات",
    why: "المصادقة",
    retention: "طوال عمر الحساب",
    control: "حذف الحساب",
    status: "implemented" as const,
  },
  {
    type: "بيانات الفواتير",
    stored: "نعم",
    where: "مزود الفواتير",
    why: "متطلبات قانونية",
    retention: "7 سنوات",
    control: "بوابة الفواتير",
    status: "implemented" as const,
  },
  {
    type: "عدادات الاستخدام",
    stored: "نعم",
    where: "قاعدة البيانات",
    why: "تطبيق الخطة",
    retention: "12 شهراً متجدداً",
    control: "عرض في الإعدادات",
    status: "implemented" as const,
  },
  {
    type: "الملفات المرفوعة",
    stored: "محلي فقط (افتراضي)",
    where: "جهاز المستخدم",
    why: "إجراء المستخدم",
    retention: "حتى يحذفها المستخدم",
    control: "حذف من التطبيق",
    status: "implemented" as const,
  },
  {
    type: "النص المحدد سحابياً",
    stored: "نعم، إذا تم حفظه",
    where: "قاعدة البيانات",
    why: "مسودة محفوظة",
    retention: "حتى الحذف",
    control: "حذف من المسودات",
    status: "planned" as const,
  },
  {
    type: "ردود الذكاء الاصطناعي",
    stored: "غير مخزّن افتراضياً",
    where: "—",
    why: "—",
    retention: "غير محتفظ به",
    control: "—",
    status: "implemented" as const,
  },
  {
    type: "النصوص الخام للطلبات",
    stored: "غير مخزّن افتراضياً",
    where: "—",
    why: "—",
    retention: "غير محتفظ به",
    control: "—",
    status: "implemented" as const,
  },
  {
    type: "أحداث الموقع",
    stored: "مجهّل الهوية",
    where: "التحليلات",
    why: "تحسين المنتج",
    retention: "90 يوماً",
    control: "إلغاء الاشتراك في الإعدادات",
    status: "implemented" as const,
  },
  {
    type: "رسائل الدعم",
    stored: "نعم",
    where: "نظام الدعم",
    why: "حل المشكلات",
    retention: "سنتان",
    control: "طلب الحذف",
    status: "implemented" as const,
  },
  {
    type: "سجلات التدقيق الأمني",
    stored: "نعم",
    where: "قاعدة البيانات",
    why: "المراجعة الأمنية",
    retention: "سنة واحدة",
    control: "مرئي للمالك فقط",
    status: "planned" as const,
  },
];

export default function ArDataRetentionPage() {
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
            سياسة الاحتفاظ بالبيانات
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            ما الذي يخزّنه Chairman، وأين، ولماذا، وإلى متى.
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6">
          <p className="text-sm font-semibold text-emerald mb-2">السلوك الافتراضي</p>
          <p className="text-sm leading-7 text-muted">
            بشكل افتراضي، لا يقوم Chairman بتخزين نصوص الطلبات الخام أو ردود الذكاء الاصطناعي.
            يُسجَّل فقط عدد الرموز المميزة والوضع والتكلفة وحالة الطلب والطوابع الزمنية لأغراض
            الفوترة والأداء.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            لا يُخزَّن النص المحدد سحابياً إلا إذا قمت صراحةً بحفظه كمستند أو مسودة.
          </p>
        </div>
      </section>

      {/* Retention Table */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="الاحتفاظ حسب نوع البيانات"
          subtitle="جميع فئات البيانات ومواقع التخزين وضوابط المستخدم."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-right font-semibold text-foreground">نوع البيانات</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">مخزَّن؟</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">أين؟</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">لماذا؟</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">مدة الاحتفاظ</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">تحكم المستخدم</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {retentionRows.map((row, i) => (
                <tr
                  key={row.type}
                  className={`border-b border-white/5 ${i % 2 === 0 ? "bg-panel" : "bg-panel/60"}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted">{row.stored}</td>
                  <td className="px-4 py-3 text-muted">{row.where}</td>
                  <td className="px-4 py-3 text-muted">{row.why}</td>
                  <td className="px-4 py-3 text-muted">{row.retention}</td>
                  <td className="px-4 py-3 text-muted">{row.control}</td>
                  <td className="px-4 py-3">
                    <StatusChip status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Additional Notes */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="ملاحظات إضافية"
            subtitle="توضيحات حول الحالات الاستثنائية والمتطلبات القانونية."
            align="left"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="text-base font-semibold text-foreground">سجلات الفواتير</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                تُحتفظ ببيانات الفواتير لمدة تصل إلى 7 سنوات وفق المتطلبات القانونية والضريبية.
                هذا التزام قانوني لا يمكن التنازل عنه عند حذف الحساب. يمكن الوصول إلى تاريخ
                الفواتير عبر بوابة الفواتير.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">التحليلات المجهّلة</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                تُجهَّل هوية أحداث استخدام الموقع قبل تخزينها. لا تُرفق أي معلومات شخصية محددة
                بسجلات التحليلات. يمكنك إلغاء الاشتراك في تتبع التحليلات من خلال الإعدادات ←
                الخصوصية والبيانات.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">التخزين المحلي للملفات</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                في وضع الخصوصية المحلي، لا تغادر الملفات والمستندات المرفوعة جهازك أبداً.
                لا تقوم Chairman بنسخ أو رفع أو نسخ احتياطي للملفات المحلية على خوادمها.
                الحذف بالكامل تحت سيطرتك.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">الوصول إلى سجل التدقيق</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                تُحتفظ بسجلات التدقيق الأمني لمدة سنة واحدة وهي مرئية فقط لأصحاب الحسابات
                والمدراء المخوّلين. تدعم هذه السجلات المراجعة الأمنية والاستجابة للحوادث ولا
                تُشارك مع أطراف ثالثة.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
