import { SignupForm } from "@/components/demo/SignupForm";

export const metadata = {
  title: "Sign Up — Chameleon Eye AI",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SignupForm locale="en" />
    </div>
  );
}
