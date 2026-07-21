"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const sections = [
    {
      title: "Business DNA",
      description: "Edit your business profile, goals, concerns, and intelligence preferences.",
      href: "/settings/business-dna",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
    },
    {
      title: "Privacy & Data",
      description: "Control how Chameleon Eye handles your data and when cloud intelligence is used.",
      href: "/settings/privacy",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <button
        type="button"
        onClick={() => router.push("/terminal")}
        className="mb-8 flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span>
        Back to Terminal
      </button>

      <p className="text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
        Settings
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground">
        Your preferences
      </h1>
      <p className="mt-2 text-sm text-muted">
        Manage your Business DNA profile, privacy mode, and data controls.
      </p>

      <div className="mt-10 space-y-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-start gap-4 rounded-2xl border border-white/8 bg-panel p-5 transition-colors hover:border-emerald/20 hover:bg-panel2"
          >
            <span className="mt-0.5 text-emerald">{s.icon}</span>
            <div>
              <p className="font-medium text-foreground">{s.title}</p>
              <p className="mt-1 text-sm text-muted">{s.description}</p>
            </div>
            <span className="ms-auto mt-0.5 text-muted">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
