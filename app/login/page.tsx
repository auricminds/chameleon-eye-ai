import { LoginForm } from "@/components/demo/LoginForm";

export const metadata = {
  title: "Sign In — Chameleon Eye AI",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <LoginForm locale="en" />
    </div>
  );
}
