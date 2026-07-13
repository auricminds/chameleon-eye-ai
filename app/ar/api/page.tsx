import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import {
  AR_API_ENDPOINTS,
  AR_API_WORKFLOW_CARDS,
  AR_SECURITY_SENTENCE,
} from "@/lib/i18n/ar";

export const metadata: Metadata = {
  title: "API",
};

export default function ArabicApiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Chameleon Eye API"
        subtitle="واجهات ذكاء أعمال منظمة للمواقع، التطبيقات، المنصات، الألعاب، الأسواق الرقمية، برامج سطح المكتب، وأنظمة المؤسسات."
      />

      <div className="mt-16 space-y-8">
        <Card>
          <h2 className="text-xl font-semibold text-foreground">ماذا تقدم API؟</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            لا تقدم Chameleon Eye API محادثة عامة. إنها تقدم مخرجات أعمال منظمة
            يمكن دمجها مباشرة داخل منتجك أو نظامك.
          </p>
          <ul className="ar-list mt-4 grid gap-2 sm:grid-cols-2 text-sm text-muted">
            <li>تقييم الجاهزية</li>
            <li>فحص المخاطر</li>
            <li>مسودات آمنة</li>
            <li>مذكرات قرار</li>
            <li>أحداث Pulse</li>
            <li>تقييم أعمال</li>
            <li>مخرجات سير عمل مخصصة</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-foreground">
            أمثلة على سير العمل
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {AR_API_WORKFLOW_CARDS.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-white/8 bg-panel2 p-4"
              >
                <p className="text-sm font-medium text-foreground ltr text-start">
                  {item.name}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-foreground">أمثلة endpoints</h2>
          <div className="mt-4 space-y-2 font-mono text-sm text-muted ltr" dir="ltr">
            {AR_API_ENDPOINTS.map((endpoint) => (
              <p key={endpoint}>{endpoint}</p>
            ))}
          </div>
        </Card>

        <Card className="border-emerald/20 bg-panel2">
          <h2 className="text-xl font-semibold text-foreground">
            المفاتيح الأساسية تبقى على الخادم
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            يجب ألا يتم وضع مفاتيح API الرئيسية داخل تطبيقات الموبايل أو سطح
            المكتب. التكامل الآمن يتم عبر خادم الشركة، أو تفعيل الجهاز، أو
            رموز قصيرة المدة.
          </p>
          <p className="mt-4 text-sm leading-7 text-gold">{AR_SECURITY_SENTENCE}</p>
        </Card>
      </div>

      <div className="mt-12">
        <Button href="/ar/contact">اطلب وصول API</Button>
      </div>
    </div>
  );
}
