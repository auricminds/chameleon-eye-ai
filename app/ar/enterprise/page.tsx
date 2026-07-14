import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "AI خاص للمؤسسات وأنظمة الصناعة — Chameleon",
  description:
    "ضوابط مؤسسية وخيارات نشر خاص وأنظمة AI متخصصة للصناعة للمؤسسات ذات المتطلبات المتقدمة.",
};

const enterpriseCapabilities = [
  { label: "منصة AI خاصة المصدر", status: "implemented" as const, desc: "منصة Chameleon الكاملة خاصة المصدر وجاهزة للمؤسسات في تصميمها الأساسي." },
  { label: "أنظمة الصناعة (فنادق، مستشفيات، عقارات)", status: "implemented" as const, desc: "وحدات تشغيلية مخصصة لقطاعي الضيافة والرعاية الصحية والعقارات." },
  { label: "فصل مساحات العمل", status: "implemented" as const, desc: "كل منطقة منتج تعمل في سياق مساحة عمل معزولة." },
  { label: "ضوابط API (مفاتيح محددة النطاق، اختبار/إنتاج، إلغاء)", status: "implemented" as const, desc: "إدارة دورة حياة مفاتيح API الكاملة مع صلاحيات محددة النطاق." },
  { label: "الوضع المحلي والخاص", status: "implemented" as const, desc: "سير عمل محلية أولاً حيث تبقى الملفات الحساسة على الجهاز." },
  { label: "سياسة البنية التحتية المعتمدة", status: "implemented" as const, desc: "جميع البنية التحتية لـ AI يختارها ويعتمدها Chameleon — لا يمكن للمستخدمين تكوينها من الواجهة الأمامية." },
  { label: "الصلاحيات القائمة على الأدوار", status: "planned" as const, desc: "إدارة الأدوار والصلاحيات التفصيلية عبر أعضاء مساحة العمل." },
  { label: "سجلات التدقيق", status: "planned" as const, desc: "تسجيل كامل للنشاط لطلبات AI والوصول إلى المستندات وتغييرات الصلاحيات." },
  { label: "ضوابط الاحتفاظ بالبيانات", status: "planned" as const, desc: "فترات احتفاظ قابلة للتكوين وسياسات الحذف للامتثال المؤسسي." },
  { label: "خيار النشر الخاص", status: "enterprise" as const, desc: "النشر على بنية تحتية خاصة متاح للنقاش. النطاق والتوافر يعتمدان على التنفيذ." },
  { label: "قواعد التوجيه المخصصة", status: "enterprise" as const, desc: "سياسات توجيه ذكاء مخصصة للمؤسسات ذات متطلبات بنية تحتية محددة." },
  { label: "دعم المؤسسات وSLA", status: "enterprise" as const, desc: "دعم مخصص وإعداد واتفاقيات مستوى الخدمة لحسابات المؤسسات." },
];

const enterpriseUseCases = [
  {
    title: "مجموعات الفنادق متعددة العقارات",
    desc: "ذكاء تشغيلي مركزي عبر عقارات متعددة. إدارة الغرف وذكاء النزلاء وتتبع الشكاوى وتحليل الإيرادات على مستوى المجموعة.",
  },
  {
    title: "المنظمات الصحية",
    desc: "ذكاء عمليات المستشفيات المعزول مع فصل صارم لمساحات العمل. دعم الجدولة وملخصات الحوادث والتحليلات التشغيلية — منفصل تماماً عن جميع البيانات الأخرى.",
  },
  {
    title: "محافظ العقارات",
    desc: "ذكاء العقارات على مستوى المحفظة وكشف إشارات السوق وتحليل الاستثمار مع وصول محدود حسب الدور للمستثمرين والمديرين والمحللين.",
  },
  {
    title: "شركات القابضة",
    desc: "مركز قيادة عبر المحافظ مع عزل الشركات التابعة. التقارير على مستوى المجموعة ومراقبة المخاطر والذكاء التنفيذي دون الكشف عن بيانات الشركات التابعة عبر وحدات الأعمال.",
  },
];

export default function ArEnterprisePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.06),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            المؤسسات
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            AI خاص للمؤسسات وأنظمة الصناعة
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon مصممة للمؤسسات التي تحتاج AI على مستوى الأعمال مع توجيه
            متحكم به وعزل لمساحات العمل وذكاء متخصص للصناعة — وليس أدوات AI
            عامة مطبّقة على مشاكل المؤسسات.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/ar/contact">تواصل للمؤسسات</Button>
            <Button href="/ar/architecture" variant="secondary">بنية المنصة</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="قدرات المؤسسات"
          subtitle="ما هو متاح الآن، وما هو قادم، وما هو متاح للنقاش كخيار مؤسسي."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {enterpriseCapabilities.map((cap) => (
            <Card key={cap.label}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{cap.label}</h3>
                  <p className="mt-2 text-xs leading-6 text-muted">{cap.desc}</p>
                </div>
                <StatusChip status={cap.status} className="shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="حالات استخدام المؤسسات"
            subtitle="كيف تنشر المؤسسات في القطاعات الرئيسية Chameleon."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {enterpriseUseCases.map((uc) => (
              <Card key={uc.title} hover>
                <h3 className="text-base font-semibold text-foreground">{uc.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{uc.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-gold/20 bg-gold/5 max-w-3xl">
          <h2 className="text-base font-semibold text-foreground">ملاحظة حول خيارات المؤسسات</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            قدرات المؤسسات المصنّفة كـ{" "}
            <span className="text-blue-400">خيار مؤسسي</span> متاحة للنقاش
            والتحديد. النشر الخاص وسياسات التوجيه المخصصة والدعم المخصص تعتمد
            على نطاق التنفيذ والمتطلبات والجداول الزمنية المتفق عليها. تواصل
            مع الفريق للبدء في محادثة تحديد النطاق المؤسسي.
          </p>
        </Card>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/ar/contact" variant="secondary">تواصل مع فريق المؤسسات</Button>
          <Button href="/ar/trust" variant="ghost">مركز الثقة</Button>
          <Button href="/ar/security" variant="ghost">البنية الأمنية</Button>
        </div>
      </section>
    </>
  );
}
