"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "./Badge";
import { Card } from "./Card";

function WebIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-emerald" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PwaIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-emerald" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 17h6M12 7v6" strokeLinecap="round" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-gold" fill="currentColor">
      <path d="M3 5.5 10.5 4.3v7.4H3V5.5Zm0 8.5h7.5v7.2L3 19.9V14Zm9.5-9.9L21 3.1v7.4h-8.5V4.1Zm0 9.9H21v7.4l-8.5-1.4V14Z" />
    </svg>
  );
}

function MacOSIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M2 18h20" strokeLinecap="round" />
      <path d="M10 18v2h4v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IosIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M10.5 19h3" strokeLinecap="round" />
    </svg>
  );
}

type AppCard = {
  icon: React.ReactNode;
  title: string;
  status: string;
  statusVariant: "emerald" | "gold" | "muted";
  description: string;
  warning?: string;
  cta: string;
  ctaHref?: string;
  ctaAction?: "pwa-instructions";
  ctaVariant: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  download?: boolean;
};

function buildApps(locale: "en" | "ar"): AppCard[] {
  const terminalHref = locale === "ar" ? "/ar/terminal" : "/terminal";

  if (locale === "ar") {
    return [
      {
        icon: <WebIcon />,
        title: "تطبيق الويب",
        status: "معاينة تطوير",
        statusVariant: "gold",
        description: "استخدم Chameleon Eye AI عبر الإنترنت دون تثبيت. معاينة محلية — لا يتم إنشاء حساب سحابي.",
        cta: "فتح Terminal",
        ctaHref: terminalHref,
        ctaVariant: "primary",
      },
      {
        icon: <PwaIcon />,
        title: "PWA — التثبيت من المتصفح",
        status: "معاينة تطوير",
        statusVariant: "gold",
        description: "ثبّت Chameleon Eye AI من متصفحك للوصول السريع كتطبيق مستقل.",
        cta: "تعليمات التثبيت",
        ctaAction: "pwa-instructions",
        ctaVariant: "secondary",
      },
      {
        icon: <WindowsIcon />,
        title: "تطبيق Windows لسطح المكتب",
        status: "قريباً",
        statusVariant: "gold",
        description:
          "لسير العمل المحلي والخاص، تفعيل الجهاز، والوصول الآمن من سطح المكتب.",
        cta: "تطبيق Windows — قريباً",
        ctaVariant: "ghost",
        disabled: true,
      },
      {
        icon: <MacOSIcon />,
        title: "تطبيق macOS لسطح المكتب",
        status: "وصول مبكر",
        statusVariant: "gold",
        description: "لمستخدمي Mac. Apple Silicon · الإصدار 0.2.0 · إصدار تطوير.",
        warning: "إصدار تطوير — قد يظهر تحذير أمان من macOS. انقر بالزر الأيمن ← فتح للتشغيل. macOS 12+ مطلوب.",
        cta: "تنزيل لـ macOS",
        ctaHref: "https://github.com/auricminds/chameleon-eye-ai/releases/download/v0.2.0/ChameleonEyeDesktop-0.2.0-arm64.dmg",
        ctaVariant: "secondary",
        download: true,
      },
      {
        icon: <IosIcon />,
        title: "تطبيق iOS لـ iPhone و iPad",
        status: "قيد التطوير",
        statusVariant: "muted",
        description:
          "راجع التقارير، اعتمد التحليلات، استخدم الصوت، وتابع Chameleon Terminal من الجوال.",
        cta: "تطبيق iOS — قيد التطوير",
        ctaVariant: "ghost",
        disabled: true,
      },
    ];
  }

  return [
    {
      icon: <WebIcon />,
      title: "Web App",
      status: "Development Preview",
      statusVariant: "gold",
      description: "Use Chameleon Eye AI online with no installation. Local browser preview — no cloud account created.",
      cta: "Open Terminal",
      ctaHref: terminalHref,
      ctaVariant: "primary",
    },
    {
      icon: <PwaIcon />,
      title: "Installable PWA",
      status: "Development Preview",
      statusVariant: "gold",
      description: "Install Chameleon Eye AI from your browser for fast access.",
      cta: "Install instructions",
      ctaAction: "pwa-instructions",
      ctaVariant: "secondary",
    },
    {
      icon: <WindowsIcon />,
      title: "Windows Desktop App",
      status: "Coming Soon",
      statusVariant: "gold",
      description:
        "For local/private workflows, device activation, and secure desktop access.",
      cta: "Windows App — Coming Soon",
      ctaVariant: "ghost",
      disabled: true,
    },
    {
      icon: <MacOSIcon />,
      title: "macOS Desktop App",
      status: "Early Access",
      statusVariant: "gold",
      description: "For Mac users who need Chameleon Terminal in a desktop workspace. Apple Silicon · v0.2.0 · Development build.",
      warning: "Development build — macOS may display a security warning (Gatekeeper). Right-click → Open to bypass. Requires macOS 12+.",
      cta: "Download for macOS",
      ctaHref: "https://github.com/auricminds/chameleon-eye-ai/releases/download/v0.2.0/ChameleonEyeDesktop-0.2.0-arm64.dmg",
      ctaVariant: "secondary",
      download: true,
    },
    {
      icon: <IosIcon />,
      title: "iPhone and iPad App",
      status: "In Development",
      statusVariant: "muted",
      description:
        "Review reports, approve analysis, use voice, and continue Chameleon Terminal from mobile.",
      cta: "iOS App — In Development",
      ctaVariant: "ghost",
      disabled: true,
    },
  ];
}

function buildCopy(locale: "en" | "ar") {
  const contactHref = locale === "ar" ? "/ar/contact" : "/contact";
  if (locale === "ar") {
    return {
      apps: buildApps("ar"),
      earlyAccess: "اطلب وصولاً مبكراً",
      earlyAccessHref: contactHref,
      pwaTitle: "تثبيت PWA",
      pwaSteps: [
        "افتح chameleoneye.ai في Chrome أو Edge أو Safari.",
        "سجّل الدخول وأكمل Business DNA إذا طُلب منك.",
        "في Chrome/Edge: قائمة المتصفح ← تثبيت التطبيق أو Install app.",
        "في Safari على iOS: مشاركة ← Add to Home Screen.",
        "افتح التطبيق المثبّت — سيبدأ من Terminal.",
      ],
      flowTitle: "عقل منتج واحد — Chameleon Eye AI Web Core",
      flowSteps: [
        "المتصفح / PWA / Windows / macOS / iOS",
        "Chameleon Eye App Shell",
        "Chameleon Terminal + Business DNA + Archive",
        "خادم Chameleon Eye (لاحقاً)",
        "OpenRouter / AI Models (لاحقاً)",
      ],
      securityTitle: "قواعد الأمان",
      securityRules: [
        "لا مفاتيح OpenRouter في الواجهة أو سطح المكتب أو iOS",
        "كل استدعاءات AI عبر خادم Chameleon Eye فقط (لاحقاً)",
        "تطبيق سطح المكتب يستخدم تفعيل الجهاز أو رموز قصيرة العمر (لاحقاً)",
        "الملفات المحلية تبقى على الجهاز حتى يوافق المستخدم",
      ],
    };
  }

  return {
    apps: buildApps("en"),
    earlyAccess: "Request Early Access",
    earlyAccessHref: contactHref,
    pwaTitle: "Install PWA",
    pwaSteps: [
      "Open chameleoneye.ai in Chrome, Edge, or Safari.",
      "Sign in and complete Business DNA if prompted.",
      "In Chrome/Edge: browser menu → Install app.",
      "On iOS Safari: Share → Add to Home Screen.",
      "Open the installed app — it starts at Terminal.",
    ],
    flowTitle: "One product brain — Chameleon Eye AI Web Core",
    flowSteps: [
      "Browser / PWA / Windows / macOS / iOS",
      "Chameleon Eye App Shell",
      "Chameleon Terminal + Business DNA + Archive",
      "Chameleon Eye Backend (future)",
      "OpenRouter / AI Models (future)",
    ],
    securityTitle: "Security rules",
    securityRules: [
      "No OpenRouter keys in frontend, desktop, or iOS",
      "All AI calls through Chameleon Eye backend only (future)",
      "Desktop app uses device activation or short-lived tokens (future)",
      "Local files stay on device until user approves sharing",
    ],
  };
}

export function AppsAccessSection({ locale = "en" }: { locale?: "en" | "ar" }) {
  const copy = buildCopy(locale);
  const [pwaOpen, setPwaOpen] = useState(false);

  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {copy.apps.map((app) => (
          <Card key={app.title} className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/8 bg-background/60">
                {app.icon}
              </div>
              <Badge variant={app.statusVariant}>{app.status}</Badge>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{app.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-muted">{app.description}</p>
            {app.warning && (
              <p className="mt-2 text-xs leading-5 text-gold rounded-lg border border-gold/20 bg-gold/5 px-3 py-2">
                {app.warning}
              </p>
            )}
            <div className="mt-5">
              {app.ctaAction === "pwa-instructions" ? (
                <button
                  type="button"
                  onClick={() => setPwaOpen((v) => !v)}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-panel2 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-gold/30 hover:bg-panel"
                >
                  {app.cta}
                </button>
              ) : app.disabled ? (
                <span className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/8 px-5 py-2.5 text-sm text-muted">
                  {app.cta}
                </span>
              ) : app.download ? (
                <a
                  href={app.ctaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-panel2 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-gold/30 hover:bg-panel"
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                    <path d="M10 14l-5-5h3V3h4v6h3l-5 5z" />
                    <path d="M3 17h14v-2H3v2z" />
                  </svg>
                  {app.cta}
                </a>
              ) : (
                <Link
                  href={app.ctaHref ?? "#"}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    app.ctaVariant === "primary"
                      ? "border border-emerald/30 bg-emerald text-background hover:bg-emerald/90"
                      : "border border-white/10 bg-panel2 text-foreground hover:border-gold/30 hover:bg-panel"
                  }`}
                >
                  {app.cta}
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>

      {pwaOpen ? (
        <Card className="border-emerald/20 bg-panel2">
          <h3 className="text-lg font-semibold text-foreground">{copy.pwaTitle}</h3>
          <ol className={`mt-4 list-decimal space-y-2 ps-5 text-sm leading-7 text-muted ${locale === "ar" ? "ar-list" : ""}`}>
            {copy.pwaSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
      ) : null}

      <div className="text-center">
        <Link
          href={copy.earlyAccessHref}
          className="inline-flex items-center justify-center rounded-full border border-gold/30 bg-gold/10 px-6 py-3 text-sm font-medium text-gold transition-colors hover:border-gold/50"
        >
          {copy.earlyAccess}
        </Link>
      </div>

      <div>
        <h2 className="mb-6 text-xl font-semibold text-foreground">{copy.flowTitle}</h2>
        <div className="mx-auto max-w-xl rounded-2xl border border-white/8 bg-panel p-6">
          <div className="space-y-3">
            {copy.flowSteps.map((step, index) => (
              <div key={`${step}-${index}`}>
                <div className="rounded-xl border border-emerald/20 bg-panel2 px-4 py-3 text-center text-sm text-foreground">
                  {step}
                </div>
                {index < copy.flowSteps.length - 1 ? (
                  <div className="flex justify-center py-1 text-emerald">↓</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="border-emerald/20 bg-panel2">
        <h2 className="text-xl font-semibold text-foreground">{copy.securityTitle}</h2>
        <ul className={`mt-4 grid gap-2 text-sm leading-7 text-muted sm:grid-cols-2 ${locale === "ar" ? "ar-list" : ""}`}>
          {copy.securityRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
