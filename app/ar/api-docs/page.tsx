import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "Chameleon API",
  description:
    "API ذكاء الأعمال من Chameleon — ربط سير العمل والمستندات والتقارير ومراجعات المخاطر وأنظمة الصناعة.",
};

const endpoints = [
  { method: "POST", path: "/api/v1/intelligence/analyze", desc: "إرسال طلب تحليل ذكاء الأعمال." },
  { method: "POST", path: "/api/v1/documents/review", desc: "إرسال مستند معتمد للمراجعة المنظمة." },
  { method: "POST", path: "/api/v1/risk-reviews/create", desc: "إنشاء مراجعة مخاطر منظمة لسياق أعمال." },
  { method: "POST", path: "/api/v1/reports/generate", desc: "إنشاء تقرير ذكاء أعمال منسّق." },
  { method: "POST", path: "/api/v1/webhooks/events", desc: "الاشتراك في أحداث Webhook للمنصة." },
  { method: "POST", path: "/api/v1/hotel/rooms/update", desc: "تحديث حالة الغرفة في نظام الفنادق." },
  { method: "POST", path: "/api/v1/hotel/guest-complaints/create", desc: "تسجيل شكوى نزيل في نظام الفنادق." },
];

const webhookEvents = [
  { event: "hotel.room.status_changed", desc: "يُطلق عند تحديث حالة الغرفة." },
  { event: "hotel.guest.complaint_created", desc: "يُطلق عند تسجيل شكوى نزيل جديدة." },
  { event: "report.generated", desc: "يُطلق عند اكتمال إنشاء تقرير." },
  { event: "risk_review.created", desc: "يُطلق عند إنشاء مراجعة مخاطر." },
];

const apiSafety = [
  { label: "مفاتيح API محددة النطاق", status: "implemented" as const },
  { label: "نوع مفتاح القراءة فقط", status: "implemented" as const },
  { label: "فصل مفاتيح الاختبار والإنتاج", status: "implemented" as const },
  { label: "إلغاء المفاتيح", status: "implemented" as const },
  { label: "سجلات التدقيق للوصول إلى API", status: "planned" as const },
  { label: "حدود المعدل", status: "planned" as const },
];

export default function ArApiDocsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
            API
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Chameleon API
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            API ذكاء أعمال — ليس raw model API. اربط سير عملك والمستندات
            والتقارير ومراجعات المخاطر وأنظمة الصناعة ومخرجات الذكاء الخاص
            بـ Chameleon عبر نقاط نهاية منظمة ومحددة النطاق.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="نقاط النهاية المثالية"
          subtitle="نقاط نهاية تمثيلية متاحة في Chameleon API."
          align="left"
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/8 bg-background">
          <div className="border-b border-white/8 px-6 py-3">
            <span className="text-xs font-medium text-muted">Chameleon API v1</span>
          </div>
          <div className="divide-y divide-white/8">
            {endpoints.map((ep) => (
              <div key={ep.path} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
                <span className="shrink-0 rounded bg-emerald/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald">
                  {ep.method}
                </span>
                <span className="font-mono text-sm text-foreground" dir="ltr">{ep.path}</span>
                <span className="text-sm text-muted sm:mr-auto">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="المصادقة"
            subtitle="مفاتيح API محددة النطاق تتبع تنسيق تسمية منظم."
            align="left"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="text-sm font-semibold text-foreground">تنسيق المفتاح</h3>
              <div className="mt-4 rounded-xl border border-white/8 bg-background px-4 py-3 font-mono text-sm text-muted" dir="ltr">
                che_live_<span className="text-emerald">************</span>
              </div>
              <p className="mt-4 text-xs leading-6 text-muted">
                مفاتيح Chameleon API تتبع هذا التنسيق. مفاتيح الاختبار تستخدم البادئة{" "}
                <code className="rounded bg-panel2 px-1" dir="ltr">che_test_</code>.
                المفاتيح محددة النطاق ويمكن إلغاؤها في أي وقت. لا تُعرض المفاتيح الحقيقية في التوثيق أو الكود الأمامي.
              </p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-foreground">أنواع المفاتيح</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-emerald">·</span>
                  <span><strong className="text-foreground">مفتاح الإنتاج</strong> — للاستخدام في الإنتاج، محدود النطاق للعمليات المعتمدة</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald">·</span>
                  <span><strong className="text-foreground">مفتاح الاختبار</strong> — للتطوير واختبار التكامل</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald">·</span>
                  <span><strong className="text-foreground">مفتاح القراءة فقط</strong> — للوحات التحكم وتكاملات المراقبة</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="أحداث Webhook"
          subtitle="اشترك في أحداث المنصة لتشغيل سير عملك الخاص."
          align="left"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {webhookEvents.map((wh) => (
            <Card key={wh.event}>
              <code className="text-sm text-emerald" dir="ltr">{wh.event}</code>
              <p className="mt-2 text-xs leading-6 text-muted">{wh.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="ضوابط أمان API"
            subtitle="حالة إدارة المفاتيح والتحكم في الوصول."
            align="left"
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {apiSafety.map((item) => (
              <Card key={item.label} className="flex items-center justify-between gap-4">
                <span className="text-sm text-foreground">{item.label}</span>
                <StatusChip status={item.status} />
              </Card>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/ar/contact" variant="secondary">طلب وصول API</Button>
            <Button href="/ar/trust" variant="ghost">مركز الثقة</Button>
          </div>
        </div>
      </section>
    </>
  );
}
