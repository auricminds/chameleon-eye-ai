import type { Metadata } from "next";
import { SignupForm } from "@/components/demo/SignupForm";

export const metadata: Metadata = {
  title: "التسجيل — Chameleon Eye AI",
};

export default function ArabicSignupPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SignupForm locale="ar" />
    </div>
  );
}
