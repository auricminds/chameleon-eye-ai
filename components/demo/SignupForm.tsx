"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DEMO_ROUTES } from "@/lib/demo/routes";
import { saveDemoUser, setTerminalLanguage, uid } from "@/lib/demo/storage";
import type { DemoUser } from "@/lib/demo/types";

type SignupCopy = {
  title: string;
  subtitle: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  role: string;
  cta: string;
  note: string;
};

const COPY: Record<"en" | "ar", SignupCopy> = {
  en: {
    title: "Start Chameleon Eye AI",
    subtitle:
      "Create your private intelligence workspace. First, Chameleon will learn your Business DNA, then open your Terminal.",
    fullName: "Full name",
    workEmail: "Work email",
    companyName: "Company name",
    role: "Role",
    cta: "Continue to Business DNA",
    note: "Demo mode: account data is saved locally in this browser until production authentication is connected.",
  },
  ar: {
    title: "ابدأ مع Chameleon Eye AI",
    subtitle:
      "أنشئ مساحة الذكاء الخاصة بك. أولاً سيتعرف Chameleon على Business DNA الخاص بك، ثم يفتح لك Terminal.",
    fullName: "الاسم الكامل",
    workEmail: "بريد العمل",
    companyName: "اسم الشركة",
    role: "الدور",
    cta: "المتابعة إلى Business DNA",
    note: "وضع تجريبي: يتم حفظ البيانات محلياً في هذا المتصفح حتى يتم ربط تسجيل الدخول الإنتاجي.",
  },
};

export function SignupForm({ locale }: { locale: "en" | "ar" }) {
  const router = useRouter();
  const copy = COPY[locale];
  const isArabic = locale === "ar";
  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    role: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user: DemoUser = {
      id: uid(),
      fullName: form.fullName.trim() || (isArabic ? "مستخدم تجريبي" : "Demo User"),
      workEmail: form.workEmail.trim() || "demo@chameleoneye.ai",
      companyName: form.companyName.trim() || (isArabic ? "شركة تجريبية" : "Demo Company"),
      role: form.role.trim() || (isArabic ? "مدير" : "Manager"),
      createdAt: new Date().toISOString(),
    };
    saveDemoUser(user);
    setTerminalLanguage(locale);
    router.push(DEMO_ROUTES.businessDna(locale));
  }

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className={isArabic ? "arabic-page" : ""}>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {copy.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{copy.subtitle}</p>

      <Card className="mx-auto mt-12 max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field
            label={copy.fullName}
            name="fullName"
            value={form.fullName}
            onChange={(v) => setForm((f) => ({ ...f, fullName: v }))}
          />
          <Field
            label={copy.workEmail}
            name="workEmail"
            type="email"
            value={form.workEmail}
            onChange={(v) => setForm((f) => ({ ...f, workEmail: v }))}
          />
          <Field
            label={copy.companyName}
            name="companyName"
            value={form.companyName}
            onChange={(v) => setForm((f) => ({ ...f, companyName: v }))}
          />
          <Field
            label={copy.role}
            name="role"
            value={form.role}
            onChange={(v) => setForm((f) => ({ ...f, role: v }))}
          />
          <Button type="submit" className="w-full">
            {copy.cta}
          </Button>
        </form>
        <p className="mt-6 text-xs leading-6 text-muted">{copy.note}</p>
      </Card>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/40"
      />
    </div>
  );
}
