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
  password: string;
  cta: string;
  submitting: string;
  errorPrefix: string;
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
    password: "Password",
    cta: "Continue to Business DNA",
    submitting: "Creating account…",
    errorPrefix: "Error: ",
  },
  ar: {
    title: "ابدأ مع Chameleon Eye AI",
    subtitle:
      "أنشئ مساحة الذكاء الخاصة بك. أولاً سيتعرف Chameleon على Business DNA الخاص بك، ثم يفتح لك Terminal.",
    fullName: "الاسم الكامل",
    workEmail: "بريد العمل",
    companyName: "اسم الشركة",
    role: "الدور",
    password: "كلمة المرور",
    cta: "المتابعة إلى Business DNA",
    submitting: "جارٍ إنشاء الحساب…",
    errorPrefix: "خطأ: ",
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
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          workEmail: form.workEmail.trim(),
          companyName: form.companyName.trim(),
          role: form.role.trim(),
          password: form.password,
          locale,
        }),
      });

      if (res.ok) {
        // Also persist locally so the terminal session works immediately
        const user: DemoUser = {
          id: uid(),
          fullName: form.fullName.trim() || (isArabic ? "مستخدم" : "User"),
          workEmail: form.workEmail.trim(),
          companyName: form.companyName.trim(),
          role: form.role.trim(),
          createdAt: new Date().toISOString(),
        };
        saveDemoUser(user);
        setTerminalLanguage(locale);
        router.push(DEMO_ROUTES.businessDna(locale));
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
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
            required
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
          <Field
            label={copy.password}
            name="password"
            type="password"
            required
            value={form.password}
            onChange={(v) => setForm((f) => ({ ...f, password: v }))}
          />

          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-400">
              {copy.errorPrefix}{error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? copy.submitting : copy.cta}
          </Button>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/40"
      />
    </div>
  );
}
