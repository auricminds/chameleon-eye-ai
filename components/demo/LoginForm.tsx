"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useBusinessDna, useDemoUser } from "@/lib/demo/hooks";
import { DEMO_ROUTES } from "@/lib/demo/routes";

type LoginCopy = {
  title: string;
  subtitle: string;
  email: string;
  password: string;
  signIn: string;
  noAccount: string;
  startFree: string;
  demoNote: string;
  continueWorkspace: string;
};

const COPY: Record<"en" | "ar", LoginCopy> = {
  en: {
    title: "Sign in to Chameleon Eye AI",
    subtitle: "Demo mode: use your saved local workspace or start a new one.",
    email: "Work email",
    password: "Password",
    signIn: "Continue to workspace",
    noAccount: "No workspace yet?",
    startFree: "Start Free",
    demoNote:
      "Production sign-in will require secure authentication. Demo data stays in this browser only.",
    continueWorkspace: "Open Chameleon Terminal",
  },
  ar: {
    title: "تسجيل الدخول إلى Chameleon Eye AI",
    subtitle: "وضع تجريبي: استخدم مساحة العمل المحفوظة محلياً أو ابدأ جديدة.",
    email: "بريد العمل",
    password: "كلمة المرور",
    signIn: "المتابعة إلى مساحة العمل",
    noAccount: "لا توجد مساحة عمل بعد؟",
    startFree: "ابدأ مجاناً",
    demoNote:
      "تسجيل الدخول الإنتاجي سيتطلب مصادقة آمنة. بيانات التجربة تبقى في هذا المتصفح فقط.",
    continueWorkspace: "فتح Chameleon Terminal",
  },
};

export function LoginForm({ locale }: { locale: "en" | "ar" }) {
  const router = useRouter();
  const copy = COPY[locale];
  const isArabic = locale === "ar";
  const demoUser = useDemoUser();
  const dna = useBusinessDna();

  useEffect(() => {
    if (!demoUser) return;
    if (dna) router.replace(DEMO_ROUTES.terminal(locale));
    else router.replace(DEMO_ROUTES.businessDna(locale));
  }, [demoUser, dna, locale, router]);

  if (demoUser) {
    return (
      <div dir={isArabic ? "rtl" : "ltr"} className={isArabic ? "arabic-page" : ""}>
        <p className="text-muted">{copy.subtitle}</p>
      </div>
    );
  }

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className={isArabic ? "arabic-page" : ""}>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {copy.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{copy.subtitle}</p>

      <Card className="mx-auto mt-12 max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(DEMO_ROUTES.signup(locale));
          }}
          className="space-y-5"
        >
          <Field label={copy.email} name="email" type="email" />
          <Field label={copy.password} name="password" type="password" />
          <Button type="submit" className="w-full">
            {copy.signIn}
          </Button>
        </form>
        <p className="mt-6 text-xs leading-6 text-muted">{copy.demoNote}</p>
        <p className="mt-4 text-sm text-muted">
          {copy.noAccount}{" "}
          <Link href={DEMO_ROUTES.signup(locale)} className="text-emerald hover:underline">
            {copy.startFree}
          </Link>
        </p>
      </Card>
    </div>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
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
        className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/40"
      />
    </div>
  );
}
