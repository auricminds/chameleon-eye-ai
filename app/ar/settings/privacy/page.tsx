"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

type PrivacyMode = "local" | "cloud" | "ask";

export default function ArPrivacySettingsPage() {
  const [mode, setMode] = useState<PrivacyMode>("ask");

  return (
    <div dir="rtl" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
          الإعدادات
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          الخصوصية والبيانات
        </h1>
        <p className="mt-3 text-base text-muted">
          تحكم في كيفية معالجة Chairman لبياناتك ومتى يُستخدم الذكاء السحابي.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Data Mode */}
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-1">وضع البيانات</h2>
          <p className="text-sm text-muted mb-6">
            اختر كيف يتعامل Chairman مع طلبات الذكاء افتراضياً.
          </p>
          <div className="space-y-3">
            {/* Local Mode */}
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                mode === "local"
                  ? "border-emerald/30 bg-emerald/5"
                  : "border-white/8 bg-panel2 hover:border-white/15"
              }`}
            >
              <input
                type="radio"
                name="privacy-mode"
                value="local"
                checked={mode === "local"}
                onChange={() => setMode("local")}
                className="mt-1 accent-emerald"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  وضع الخصوصية المحلي
                </p>
                <p className="mt-1 text-sm text-muted">
                  استخدام الذكاء المحلي فقط. لا طلبات ذكاء اصطناعي سحابية. لا استدعاءات
                  شبكية للتحليل. يتطلب تثبيت تطبيق سطح المكتب.
                </p>
              </div>
            </label>

            {/* Cloud Mode */}
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                mode === "cloud"
                  ? "border-emerald/30 bg-emerald/5"
                  : "border-white/8 bg-panel2 hover:border-white/15"
              }`}
            >
              <input
                type="radio"
                name="privacy-mode"
                value="cloud"
                checked={mode === "cloud"}
                onChange={() => setMode("cloud")}
                className="mt-1 accent-emerald"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  وضع الذكاء السحابي
                </p>
                <p className="mt-1 text-sm text-muted">
                  استخدام الذكاء السحابي بموافقة. قد يُرسَل النص المحدد إلى بنية تحتية معتمدة
                  بعد تأكيدك.
                </p>
              </div>
            </label>

            {/* Ask Mode */}
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                mode === "ask"
                  ? "border-emerald/30 bg-emerald/5"
                  : "border-white/8 bg-panel2 hover:border-white/15"
              }`}
            >
              <input
                type="radio"
                name="privacy-mode"
                value="ask"
                checked={mode === "ask"}
                onChange={() => setMode("ask")}
                className="mt-1 accent-emerald"
              />
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-foreground">
                  السؤال في كل مرة قبل استخدام السحابة
                </p>
                <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 text-xs font-medium text-emerald">
                  موصى به
                </span>
              </div>
              <p className="mt-1 text-sm text-muted hidden">
                يطلب إذنك قبل أي تحليل سحابي. أنت تتحكم في كل طلب.
              </p>
            </label>
          </div>
          <p className="mt-4 text-xs text-muted border-t border-white/8 pt-4">
            يُحفظ تفضيل وضع الخصوصية محلياً. المزامنة مع الخادم قريباً.
          </p>
        </Card>

        {/* Section 2: Cloud Consent History */}
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            سجل الموافقة السحابية
          </h2>
          <p className="text-sm text-muted mb-6">
            سجل المرات التي وافقت فيها على التحليل السحابي للمحتوى المحدد.
          </p>
          <div className="rounded-xl border border-white/8 bg-panel2 p-8 text-center">
            <p className="text-sm text-muted">لم يتم تسجيل أي طلبات تحليل سحابي بعد.</p>
          </div>
          <p className="mt-4 text-xs text-muted">
            سيظهر سجل الموافقة السحابية هنا عند توصيل الخادم الخلفي.
          </p>
        </Card>

        {/* Section 3: Data Controls */}
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-1">ضوابط البيانات</h2>
          <p className="text-sm text-muted mb-6">
            صدّر بيانات Chairman أو احذفها. تُعالَج الطلبات خلال 30 يوماً.
          </p>

          {/* Cloud Safety Notice */}
          <div className="mb-6 rounded-xl border border-emerald/20 bg-emerald/5 p-4">
            <p className="text-xs leading-6 text-muted">
              <span className="font-semibold text-emerald">ضمان الخصوصية: </span>
              لن يُرسِل Chairman المستندات الخاصة أو الأرشيفات الكاملة أو الذاكرة المحلية إلى
              الذكاء السحابي إلا إذا وافقت صراحةً على النص المحدد.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="/ar/trust/data-deletion" variant="secondary">
              تصدير بياناتي
            </Button>
            <Button href="/ar/trust/data-deletion" variant="ghost">
              طلب حذف البيانات
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted border-t border-white/8 pt-4">
            الحذف الذاتي الآلي الكامل للبيانات قيد التطوير. تُعالَج الطلبات الحالية من قبل
            فريق Chairman.
          </p>
        </Card>
      </div>
    </div>
  );
}
