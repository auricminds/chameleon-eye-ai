import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "خريطة طريق الامتثال — Chameleon Eye AI",
  description:
    "أين يقف Chairman اليوم وإلى أين يتجه في مجال الأمان والخصوصية والامتثال.",
};

const current = [
  "وضع الخصوصية المحلي أولاً",
  "حماية مفاتيح الذكاء الاصطناعي من جانب الخادم",
  "موافقة المستخدم على السحابة (قيد التنفيذ)",
  "سجلات الاستخدام والتدقيق",
  "نشر سياسة الاحتفاظ بالبيانات",
  "عملية الإفصاح المسؤول",
];

const inProgress = [
  "المراجعة القانونية لسياسة الخصوصية",
  "المراجعة القانونية لشروط الخدمة",
  "إعداد نموذج DPA",
  "تعزيز رؤوس أمان HTTP",
];

const next = [
  "نشر الورقة البيضاء للأمان",
  "اختبار الاختراق (خارجي)",
  "تقييم الاستعداد لـ SOC 2",
  "تقييم الاستعداد لـ ISO 27001",
];

const enterprise = [
  "تدقيق SOC 2 النوع الثاني",
  "شهادة ISO 27001",
  "DPA مخصص",
  "اتفاقية النشر الخاص",
];

export default function ArComplianceRoadmapPage() {
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
            خريطة طريق الامتثال
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            أين يقف Chairman اليوم وإلى أين يتجه.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">إشعار مهم</p>
          <p className="text-sm leading-7 text-muted">
            لا يحمل Chairman حالياً شهادة SOC 2 أو ISO 27001 أو الامتثال لـ HIPAA أو شهادة GDPR.
            تمثّل خريطة الطريق هذه نوايا وليست شهادات مكتملة. يستلزم استخدام Chairman لمعالجة
            البيانات الخاضعة للتنظيم إجراء مراجعتك القانونية والامتثالية الخاصة.
          </p>
        </div>
      </section>

      {/* Roadmap Sections */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Current */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-foreground">الحالي</h2>
              <StatusChip status="implemented" />
            </div>
            <ul className="space-y-3">
              {current.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-emerald shrink-0">+</span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* In Progress */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-foreground">قيد التنفيذ</h2>
              <StatusChip status="planned" />
            </div>
            <ul className="space-y-3">
              {inProgress.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-gold shrink-0">~</span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Next */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-foreground">التالي</h2>
              <StatusChip status="planned" />
            </div>
            <ul className="space-y-3">
              {next.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-gold shrink-0">←</span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Enterprise */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-foreground">المؤسسات</h2>
              <StatusChip status="enterprise" />
            </div>
            <ul className="space-y-3">
              {enterprise.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-blue-400 shrink-0">◆</span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted border-t border-white/8 pt-4">
              خيارات الامتثال المؤسسي متاحة عند الطلب. تواصل مع فريق Chairman لمناقشة متطلباتك
              المحددة والجدول الزمني.
            </p>
          </Card>
        </div>
      </section>

      {/* Additional Context */}
      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="الاستعداد لـ SOC 2"
            subtitle="نهجنا في الاستعداد للتدقيق الأمني."
            align="left"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Card>
              <h3 className="text-sm font-semibold text-foreground">تقييم الاستعداد</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                يخطط Chairman لإجراء تقييم استعداد خارجي لـ SOC 2. سيحدد هذا الفجوات بين الضوابط
                الحالية ومعايير خدمات الثقة لـ SOC 2.
              </p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-foreground">لا شهادة حالية</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                لا يحمل Chairman حالياً تقرير SOC 2 النوع الأول أو النوع الثاني. يجب التحقق من
                أي ادعاءات بشأن امتثال SOC 2 مباشرةً مع فريق Chairman.
              </p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-foreground">المسار المؤسسي</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                يمكن للعملاء المؤسسيين الذين يحتاجون إلى تقارير SOC 2 النوع الثاني مناقشة
                الجدول الزمني والنطاق مع فريق Chairman كجزء من تعامل مؤسسي.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
