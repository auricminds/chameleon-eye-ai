import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroWorkspacePreview } from "@/components/HeroWorkspacePreview";
import { SectionTitle } from "@/components/SectionTitle";
import { AR_PRIVACY_SENTENCE } from "@/lib/i18n/ar";

export const metadata: Metadata = {
  title: "Chameleon Eye AI — ذكاء AI خاص للأعمال",
  description:
    "تساعد Chameleon Eye AI الشركات على تحليل البيانات المصرح بها واكتشاف المخاطر الخفية ودعم القرارات.",
};

export default function ArabicHomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,174,130,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(215,180,106,0.08),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div>
            <Badge>ذكاء AI خاص للأعمال</Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              اسأل شركتك عمّا تخفيه.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
              تساعد Chameleon Eye AI الشركات على تحليل الملفات والتقارير وسير
              العمل ومؤشرات الفرق ورحلة العملاء والبيانات التشغيلية المصرح بها،
              لاكتشاف المخاطر الخفية، والهدر المالي، وضعف الأداء، والمؤشرات
              المبكرة.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              استخدمها مباشرة داخل مساحة عمل خاصة، أو اربطها بمنتجك عبر API،
              أو شغّلها بأسلوب محلي خاص لملفاتك الحساسة.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/ar/signup">ابدأ مجاناً</Button>
              <Button href="/ar/api" variant="secondary">
                استكشف API
              </Button>
              <Button href="/ar/private-mode" variant="ghost">
                الوضع الخاص
              </Button>
            </div>
          </div>
          <HeroWorkspacePreview locale="ar" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          title="استخدم Chameleon Eye AI بالطريقة المناسبة لك."
          subtitle="اختر المسار الذي يناسب فريقك أو منتجك أو متطلبات الأمان لديك."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            rtl
            title="مساحة عمل AI خاصة"
            copy="استخدم Chameleon Eye AI مباشرة لمراجعة معلومات الأعمال المصرح بها وإنشاء تقارير استخباراتية سرية."
            bestForLabel="مناسب لـ:"
            bestFor="أصحاب الشركات، المديرون، المستشارون، المدققون، وفرق العمليات."
            cta={{ label: "استكشف المنتج", href: "/ar/product" }}
          />
          <FeatureCard
            rtl
            title="Chameleon Eye API"
            copy="أضف ذكاء الأعمال داخل موقعك، أو تطبيقك، أو منصتك، أو السوق الرقمي، أو اللعبة، أو نظام CRM، أو نظام HR، أو أداة شركتك الداخلية."
            cta={{ label: "استكشف API", href: "/ar/api" }}
          />
          <FeatureCard
            rtl
            title="Desktop Connector"
            copy="اربط تطبيقات سطح المكتب بأمان باستخدام تسجيل دخول آمن، أو تفعيل جهاز، أو رموز قصيرة المدة، أو خادم الشركة."
            cta={{ label: "استكشف سطح المكتب", href: "/ar/desktop" }}
          />
        </div>
      </section>

      <section className="border-y border-white/8 bg-panel/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="ملفاتك يمكن أن تبقى على جهازك."
            subtitle="بعض ملفات الأعمال لا يجب أن تغادر كمبيوتر الشركة. يمكن أن تدعم Chameleon Eye AI أسلوباً محلياً أو هجيناً، بحيث تبقى الملفات الحساسة خاصة، ولا يتم إرسال أي ملخص أو بيانات مختارة إلى السحابة إلا عندما يوافق المستخدم."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              rtl
              title="الوضع المحلي الخاص"
              copy="تبقى الملفات على جهاز العميل. مناسب للعقود، التقارير الداخلية، الملفات الحساسة، والمراجعات المبكرة."
            />
            <FeatureCard
              rtl
              title="الوضع الهجين بالموافقة"
              copy="محلي أولاً. السحابة فقط بعد موافقة المستخدم. مناسب للشركات التي تريد تحليلاً أقوى مع الحفاظ على التحكم."
            />
            <FeatureCard
              rtl
              title="وضع السحابة / API"
              copy="يتم إرسال البيانات المصرح بها فقط بشكل آمن. مناسب للواجهات البرمجية، لوحات التحكم، التقييمات، أحداث Pulse، وسير عمل الفرق."
            />
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-7 text-gold">
            {AR_PRIVACY_SENTENCE}
          </p>
          <div className="mt-8 text-center">
            <Button href="/ar/private-mode" variant="secondary">
              استكشف الوضع الخاص
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
