import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/Button";
import { StatusChip } from "@/components/trust/StatusChip";

export const metadata: Metadata = {
  title: "الأمان — مركز ثقة Chameleon Eye AI",
  description:
    "كيف تحمي Chameleon Eye AI بياناتك: إدارة المفاتيح من جانب الخادم، المصادقة، حارس الخصوصية، وتحديد المعدلات.",
};

const securityPrinciples = [
  {
    label: "لا مفاتيح API للمزودين في كود الواجهة الأمامية",
    status: "implemented" as const,
    detail:
      "بيانات اعتماد البنية التحتية للذكاء الاصطناعي محفوظة حصراً على الخادم. الواجهة الأمامية لا تحتوي أبداً على أي مفتاح API لأي مزود.",
  },
  {
    label: "لا مفاتيح للمزودين في المتصفح أو تطبيق سطح المكتب",
    status: "implemented" as const,
    detail:
      "تطبيق الويب وتطبيق سطح المكتب لا يخزّنان أو يرسلان أو يتطلبان أي مفتاح لمزود الذكاء الاصطناعي على طبقة العميل.",
  },
  {
    label: "إدارة المفاتيح من جانب الخادم",
    status: "implemented" as const,
    detail:
      "جميع بيانات اعتماد المزودين تُدار من جانب الخادم، وتُحدَّث بشكل دوري، ولا تُكتب أبداً في تخزين يمكن للعميل قراءته.",
  },
  {
    label: "الأسرار لا تُكتب في السجلات",
    status: "implemented" as const,
    detail:
      "يُطبَّق تنقية السجلات على طبقة الخادم. تُحذف مفاتيح API والرموز والحقول الحساسة قبل أي كتابة في السجل.",
  },
  {
    label: "عزل بيانات المستخدم",
    status: "implemented" as const,
    detail:
      "كل مساحة عمل معزولة على طبقة البيانات. الاستعلامات محددة النطاق بالهوية المصادقة وسياق مساحة العمل.",
  },
  {
    label: "تحديد المعدل",
    status: "implemented" as const,
    detail:
      "مسارات API ونقاط نهاية الذكاء الاصطناعي محدودة المعدل لكل مستخدم ولكل مفتاح لمنع الإساءة واستنزاف الموارد.",
  },
  {
    label: "رؤوس الأمان",
    status: "implemented" as const,
    detail:
      "جميع الردود تتضمن رؤوس X-Frame-Options و X-Content-Type-Options و Referrer-Policy و Permissions-Policy و Content-Security-Policy.",
  },
  {
    label: "بوابة موافقة السحابة",
    status: "implemented" as const,
    detail:
      "يتطلب التحليل السحابي موافقة صريحة من المستخدم عبر بوابة الموافقة قبل إرسال أي نص محدد.",
  },
  {
    label: "بيانات وصف سجل التدقيق",
    status: "implemented" as const,
    detail:
      "بيانات وصف الطلب — الوضع والطابع الزمني والحالة وعدد الرموز — مسجّلة لمراجعة المالك. لا يُسجَّل المحتوى الخام.",
  },
  {
    label: "اختبار الاختراق",
    status: "planned" as const,
    detail:
      "مخطط اختبار اختراق مستقل قبل الإتاحة العامة للمنتج السحابي.",
  },
  {
    label: "استعداد SOC 2",
    status: "planned" as const,
    detail:
      "استعداد SOC 2 Type II موجود في خارطة طريق الامتثال. راجع خارطة طريق الامتثال للجدول الزمني.",
  },
];

const architectureNodes = [
  { label: "تطبيق المستخدم", color: "border-muted/40 bg-panel" },
  { label: "Chairman API", color: "border-emerald/30 bg-emerald/8" },
  { label: "المصادقة", color: "border-emerald/30 bg-emerald/8" },
  { label: "حارس الخصوصية", color: "border-gold/30 bg-gold/8" },
  { label: "التحقق من الصلاحيات", color: "border-gold/30 bg-gold/8" },
  { label: "موجّه الذكاء الاصطناعي", color: "border-emerald/30 bg-emerald/8" },
  { label: "المحرك المعتمد", color: "border-white/15 bg-panel2" },
];

export default function ArTrustSecurityPage() {
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
            الأمان
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            كيف تحمي Chameleon بياناتك من خلال البنية المعمارية والتحكم في
            الوصول وممارسات الأمن التشغيلي.
          </p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="border-b border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="البنية الأمنية"
            subtitle="كل طلب يمر عبر المصادقة وحارس الخصوصية والتحقق من الصلاحيات قبل الوصول إلى موجّه الذكاء الاصطناعي."
            align="left"
          />
          <div className="mt-10 overflow-x-auto">
            <div className="flex min-w-max items-center gap-3">
              {architectureNodes.map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-3">
                  <div
                    className={`rounded-xl border px-4 py-3 text-center text-xs font-medium text-foreground ${node.color} max-w-[140px]`}
                  >
                    {node.label}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-muted">←</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs leading-6 text-muted">
            يتواصل المتصفح فقط مع مسارات API التي تتحكم فيها Chameleon. لا
            تُعرض مفاتيح مزود الذكاء الاصطناعي في الواجهة الأمامية. يصل
            المحرك المعتمد فقط بعد اجتياز جميع الفحوصات.
          </p>
        </div>
      </section>

      {/* Security Principles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          title="مبادئ الأمان الرئيسية"
          subtitle="حالة التنفيذ عبر جميع أبعاد الأمان الرئيسية."
          align="left"
        />
        <div className="mt-10 space-y-4">
          {securityPrinciples.map((item) => (
            <Card key={item.label}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.label}
                  </h3>
                  <StatusChip status={item.status} />
                </div>
                <p className="text-sm leading-7 text-muted">{item.detail}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Security Measures */}
      <section className="border-y border-white/8 bg-panel/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="تدابير أمنية إضافية"
            subtitle="ممارسات الأمن التشغيلي والبنية التحتية."
            align="left"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                أمان النقل
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                جميع حركة المرور بين العميل وخوادم Chameleon تستخدم
                HTTPS/TLS. رؤوس Strict-Transport-Security تفرض TLS في بيئات
                الإنتاج.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                وضع الخصوصية المحلي
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                في الوضع المحلي، لا تُرسَل أي بيانات إلى Chameleon أو أي
                مزود ذكاء اصطناعي. تبقى المعالجة على الجهاز لأقصى عزل. راجع{" "}
                <a
                  href="/ar/local-mode"
                  className="text-emerald hover:underline"
                >
                  الوضع المحلي
                </a>{" "}
                للتفاصيل.
              </p>
            </Card>
            <Card>
              <h3 className="text-base font-semibold text-foreground">
                إدارة التبعيات
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                تُراجَع تبعيات الطرف الثالث قبل الإضافة. تُطبَّق ممارسات
                أمان سلسلة التوريد لتجنب إدخال حزم معطوبة أو ضارة.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              جهة الاتصال الأمنية
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              للإبلاغ عن ثغرة أمنية أو طرح سؤال أمني، تواصل مع فريق الأمان
              مباشرة.
            </p>
          </div>
          <Button href="mailto:security@chameleoneye.ai" variant="primary">
            security@chameleoneye.ai
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/ar/trust/responsible-disclosure" variant="secondary">
            الإفصاح المسؤول
          </Button>
          <Button href="/ar/trust/compliance-roadmap" variant="ghost">
            خارطة طريق الامتثال
          </Button>
          <Button href="/ar/security" variant="ghost">
            البنية الأمنية
          </Button>
        </div>
      </section>
    </div>
  );
}
