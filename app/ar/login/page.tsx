import type { Metadata } from "next";
import { LoginForm } from "@/components/demo/LoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول — Chameleon Eye AI",
};

export default function ArabicLoginPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <LoginForm locale="ar" />
    </div>
  );
}
