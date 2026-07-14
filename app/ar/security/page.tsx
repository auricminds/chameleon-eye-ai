import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "البنية الأمنية — Chameleon",
  description:
    "كيف تحمي Chameleon مفاتيح AI وتعزل مساحات العمل وتتحكم في الوصول إلى البيانات في كل طبقة.",
};

const principles = [
  {
    title: "لا مفاتيح AI في الواجهة الأمامية",
    description: "مفاتيح بنية AI التحتية لا تُضمّن أبداً في كود المتصفح أو متغيرات البيئة الأمامية أو حزم العميل. تبقى حصراً على الخادم.",
  },
  {
    title: "معالجة الطلبات من جانب الخادم",
    description: "جميع طلبات تحليل AI تُعالج عبر مسارات الخادم الخاصة بـ Chameleon. لا يتصل المتصفح ببنية AI خارجية مباشرة.",
  },
  {
    title: "فصل مساحات العمل",
    description: "كل منطقة منتج — AI Terminal وأنظمة الفنادق والمستشفيات والعقارات ومركز القابضة — تعمل كمساحة عمل مستقلة.",
  },
  {
    title: "فصل المنتجات",
    description: "وحدات الصناعة معزولة عن بعضها. بيانات نظام الفندق لا تتسرب إلى سياق المستشفى أو العقارات دون تفويض صريح.",
  },
  {
    title: "الصلاحيات القائمة على الأدوار",
    description: "الوصول محدد النطاق حسب الدور. المالك والمدير والموظف والخارجي والمدقق — كل منهم يحصل فقط على مستوى الوصول المناسب لوظيفته.",
  },
  {
    title: "الحد الأدنى من الصلاحيات",
    description: "كل مفتاح API وجلسة مستخدم واتصال خدمة داخلية محدود النطاق بالحد الأدنى من الوصول المطلوب.",
  },
  {
    title: "ضوابط رؤية البيانات",
    description: "يرى المستخدمون فقط البيانات المصرح لهم بالوصول إليها. البيانات المالية والطبية والشخصية الحساسة محمية خلف صلاحيات الأدوار.",
  },
  {
    title: "خارطة طريق إمكانية التدقيق",
    description: "سجلات التدقيق الكاملة في خارطة الطريق. عند التنفيذ، ستُسجّل جميع طلبات AI وعمليات الوصول إلى المستندات وتغييرات الصلاحيات.",
  },
];

const roles = [
  { role: "المالك", access: "الوصول الكامل للمنصة وجميع التقارير والبيانات والفوترة وإدارة المستخدمين." },
  { role: "المدير العام", access: "التقارير التشغيلية وبيانات الفرق ومراجعات المخاطر والتحليلات على مستوى الأقسام." },
  { role: "موظف الاستقبال", access: "إدارة النزلاء وحالة الغرف وتسجيل الشكاوى — دون بيانات مالية أو HR." },
  { role: "التدبير المنزلي", access: "قوائم مهام الغرف وتحديثات الحالة — دون بيانات مالية للنزلاء." },
  { role: "شركة سياحية خارجية", access: "توافر الغرف وتكامل الحجز فقط — وصول موصل محدود النطاق." },
  { role: "المدقق", access: "وصول للقراءة فقط للتقارير المعتمدة ومسارات التدقيق — دون صلاحيات الكتابة التشغيلية." },
];

const roadmap = [
  { feature: "لا مفاتيح AI أمامية", status: "implemented" as const },
  { feature: "توجيه AI من جانب الخادم", status: "implemented" as const },
  { feature: "فصل مساحات العمل", status: "implemented" as const },
  { feature: "مفاتيح API محددة النطاق (قراءة فقط، اختبار/إنتاج)", status: "implemented" as const },
  { feature: "إلغاء مفاتيح API", status: "implemented" as const },
  { feature: "التحكم في الوصول القائم على الأدوار", status: "planned" as const },
  { feature: "سجلات التدقيق", status: "planned" as const },
  { feature: "حدود المعدل", status: "planned" as const },
  { feature: "ضوابط الاحتفاظ بالبيانات", status: "planned" as const },
  { feature: "مراجعة الامتثال لـ SOC 2", status: "planned" as const },
  { feature: "خيار النشر الخاص", status: "enterprise" as const },
  { feature: "سياسات التوجيه المخصصة", status: "enterprise" as const },
  { feature: "تكوين التخزين الخاص", status: "enterprise" as const },
];

export default function ArSecurityPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            الأمان
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            البنية الأمنية
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Chameleon مصممة بحيث لا تصل مفاتيح AI إلى المتصفح أبداً، ومساحات
            العمل معزولة، والوصول مُتحكم به حسب الدور في كل طبقة.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="مبادئ الأمان"
          subtitle="القرارات المعمارية الأساسية التي تحدد كيفية تعامل Chameleon مع البيانات والمفاتيح والوصول."
          align="left"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <Card key={p.title} hover>
              <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{p.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="أمان شبكة المتصفح"
            subtitle="ما يمكن وما لا يمكن للمتصفح الاتصال به."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="border-emerald/20">
              <h3 className="text-sm font-semibold text-emerald">استدعاءات المتصفح المسموح بها</h3>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted">
                <li className="flex gap-2"><span className="text-emerald">+</span><span>مسارات API الخلفية لـ Chameleon (مصادق عليها)</span></li>
                <li className="flex gap-2"><span className="text-emerald">+</span><span>مسارات مساحة العمل ومنتجات Chameleon</span></li>
                <li className="flex gap-2"><span className="text-emerald">+</span><span>اشتراكات أحداث Webhook الخاصة بـ Chameleon</span></li>
              </ul>
            </Card>
            <Card className="border-gold/20">
              <h3 className="text-sm font-semibold text-gold">لا يُكشف للمتصفح أبداً</h3>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-muted">
                <li className="flex gap-2"><span className="text-gold">—</span><span>نقاط نهاية مزودي بنية AI التحتية</span></li>
                <li className="flex gap-2"><span className="text-gold">—</span><span>مفاتيح API لمزودي AI (لا NEXT_PUBLIC لمفاتيح AI)</span></li>
                <li className="flex gap-2"><span className="text-gold">—</span><span>مفاتيح رئيسية أو اعتمادات حساب الخدمة</span></li>
                <li className="flex gap-2"><span className="text-gold">—</span><span>تكوين التوجيه الداخلي أو منطق اختيار النماذج</span></li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="أمثلة على التحكم في الوصول القائم على الأدوار"
          subtitle="الوصول محدود بالدور — يحصل المستخدمون فقط على ما تتطلبه وظيفتهم."
          align="left"
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-6 py-3 text-right font-medium text-muted">الدور</th>
                <th className="px-6 py-3 text-right font-medium text-muted">نطاق الوصول</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {roles.map((r) => (
                <tr key={r.role} className="bg-panel hover:bg-panel2 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{r.role}</td>
                  <td className="px-6 py-4 text-muted">{r.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="خارطة طريق الأمان"
            subtitle="القدرات الأمنية الحالية والمخططة عبر المنصة."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {roadmap.map((item) => (
              <Card key={item.feature} className="flex items-center justify-between gap-4">
                <span className="text-sm text-foreground">{item.feature}</span>
                <StatusChip status={item.status} />
              </Card>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/ar/trust" variant="secondary">مركز الثقة</Button>
            <Button href="/ar/privacy" variant="ghost">وضع الخصوصية</Button>
          </div>
        </div>
      </section>
    </>
  );
}
