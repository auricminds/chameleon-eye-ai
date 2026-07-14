import type { Metadata } from "next";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "مسارات المزودين والخصوصية — عرض المالك",
  description: "العرض الداخلي للمالك لإعداد مسارات المزودين والخصوصية.",
};

const demoRoutes = [
  {
    key: "intelligence.general",
    ownerLabel: "مسار الأعمال العام",
    category: "Approved Cloud AI",
    enabled: "نعم",
    zdrRequired: "لا",
    dataCollectionDenied: "نعم",
    fallbackAllowed: "لا",
    notes: "المسار الافتراضي",
  },
  {
    key: "intelligence.private",
    ownerLabel: "مسار الوضع الخاص",
    category: "Local / ZDR Cloud",
    enabled: "نعم",
    zdrRequired: "نعم",
    dataCollectionDenied: "نعم",
    fallbackAllowed: "لا",
    notes: "يتطلب ZDR",
  },
];

export default function ArOwnerProviderRoutesPage() {
  return (
    <div dir="rtl">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,180,106,0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            وصول المالك
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            مسارات المزودين والخصوصية
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            عرض داخلي. غير مرئي للمستخدمين العاديين.
          </p>
        </div>
      </section>

      {/* Access Notice */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">
            مطلوب وصول المالك
          </p>
          <p className="text-sm leading-7 text-muted">
            هذه الصفحة مرئية لأصحاب المنصة فقط. يتطلب التنفيذ الكامل مصادقة
            المالك. هذا العرض التجريبي للمعاينة فقط. لن تُعرض بيانات الإنتاج
            حتى يتم ربط مصادقة المالك.
          </p>
        </div>
      </section>

      {/* Access Note */}
      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <Card>
          <p className="text-sm font-semibold text-foreground mb-2">
            ملاحظة
          </p>
          <p className="text-sm leading-7 text-muted">
            هذه الصفحة مرئية لأصحاب المنصة فقط. يتطلب التنفيذ الكامل مصادقة
            المالك.
          </p>
        </Card>
      </section>

      {/* Demo Table */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          إعداد المسارات (معاينة تجريبية)
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">مفتاح المسار</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">تسمية المالك</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">فئة المزود</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">مُفعَّل</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">ZDR مطلوب</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">جمع البيانات محظور</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">السقوط الاحتياطي مسموح</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {demoRoutes.map((route, i) => (
                <tr
                  key={route.key}
                  className={`border-b border-white/5 ${i % 2 === 0 ? "bg-panel" : "bg-panel/60"}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-emerald">{route.key}</td>
                  <td className="px-4 py-3 text-foreground">{route.ownerLabel}</td>
                  <td className="px-4 py-3 text-muted">{route.category}</td>
                  <td className="px-4 py-3 text-muted">{route.enabled}</td>
                  <td className="px-4 py-3 text-muted">{route.zdrRequired}</td>
                  <td className="px-4 py-3 text-muted">{route.dataCollectionDenied}</td>
                  <td className="px-4 py-3 text-muted">{route.fallbackAllowed}</td>
                  <td className="px-4 py-3 text-muted">{route.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-sm font-semibold text-gold mb-2">تحذير</p>
          <p className="text-sm leading-7 text-muted">
            يجب على المالك المصادقة قبل عرض بيانات الإنتاج. هذا العرض التجريبي
            للمعاينة فقط.
          </p>
        </div>
      </section>
    </div>
  );
}
