import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "المعالجون الفرعيون — Chairman AI",
  description:
    "الأطراف الثالثة التي قد تعالج البيانات نيابةً عن Chairman.",
};

const subprocessors = [
  {
    name: "مزود البنية التحتية للذكاء الاصطناعي السحابي",
    category: "معالجة الذكاء الاصطناعي",
    purpose: "طلبات الذكاء السحابي",
    data: "النص المحدد (بموافقة)",
    policy: "مرتبط عند التأكيد",
  },
  {
    name: "معالج المدفوعات",
    category: "الفواتير",
    purpose: "الاشتراكات والمدفوعات",
    data: "بيانات الفواتير",
    policy: "سياسة معالج الدفع القياسية",
  },
  {
    name: "إرسال البريد الإلكتروني",
    category: "التواصل",
    purpose: "رسائل الحساب والدعم",
    data: "عنوان البريد الإلكتروني",
    policy: "سياسة مزود البريد القياسية",
  },
  {
    name: "التحليلات",
    category: "بيانات الاستخدام",
    purpose: "تحسين المنتج",
    data: "أحداث الاستخدام المجهّلة",
    policy: "إلغاء الاشتراك متاح",
  },
  {
    name: "بنية قاعدة البيانات",
    category: "التخزين",
    purpose: "تخزين الحساب والبيانات",
    data: "بيانات الحساب والاستخدام",
    policy: "مزود بنية تحتية مؤسسي",
  },
];

export default function ArSubprocessorsPage() {
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
            المعالجون الفرعيون
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            الأطراف الثالثة التي قد تعالج البيانات نيابةً عن Chairman.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="المعالجون الفرعيون الحاليون"
          subtitle="فئات الخدمات الخارجية التي يتعامل معها Chairman."
          align="left"
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-right font-semibold text-foreground">الاسم / الفئة</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">الفئة</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">الغرض</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">البيانات المعالَجة</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">سياسة الخصوصية</th>
              </tr>
            </thead>
            <tbody>
              {subprocessors.map((sp, i) => (
                <tr
                  key={sp.name}
                  className={`border-b border-white/5 ${i % 2 === 0 ? "bg-panel" : "bg-panel/60"}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{sp.name}</td>
                  <td className="px-4 py-3 text-muted">{sp.category}</td>
                  <td className="px-4 py-3 text-muted">{sp.purpose}</td>
                  <td className="px-4 py-3 text-muted">{sp.data}</td>
                  <td className="px-4 py-3 text-muted">{sp.policy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notice */}
        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">إشعار تحديث القائمة</p>
          <p className="text-sm leading-7 text-muted">
            ستُحدَّث هذه القائمة عند تأكيد Chairman لاتفاقيات مزودين محددين. ستُدرج أسماء المزودين
            المحددة بمجرد إبرام اتفاقيات DPA. لا ننشر أسماء المزودين الذين لم نتعاقد معهم أو
            نراجعهم رسمياً.
          </p>
        </div>
      </section>

      {/* Additional Info */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="text-base font-semibold text-foreground">اتفاقيات معالجة البيانات</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                يعمل Chairman على إبرام اتفاقيات معالجة البيانات (DPA) الرسمية مع المعالجين
                الفرعيين الرئيسيين. يجب على عملاء المؤسسات الذين يحتاجون إلى DPA منفَّذة التواصل
                مع فريق Chairman لمناقشة التوفر والجدول الزمني.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">نطاق معالجة الذكاء الاصطناعي</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                لا تُستدعى البنية التحتية لمعالجة الذكاء الاصطناعي السحابي إلا عندما تختار صراحةً
                وضع الذكاء السحابي وتوافق على إرسال النص المحدد. ملفاتك المحلية الخاصة وأرشيفك
                الكامل لا يُرسَلان أبداً إلى بنية تحتية لمعالجة الذكاء الاصطناعي تلقائياً.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
