import Link from "next/link";
import { PRIVACY_SENTENCE } from "@/lib/constants";
import { AR_PRIVACY_SENTENCE } from "@/lib/i18n/ar";
import type { Locale } from "@/lib/i18n/locale";

function WindowsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-10 w-10 text-emerald"
      fill="currentColor"
    >
      <path d="M3 5.5 10.5 4.3v7.4H3V5.5Zm0 8.5h7.5v7.2L3 19.9V14Zm9.5-9.9L21 3.1v7.4h-8.5V4.1Zm0 9.9H21v7.4l-8.5-1.4V14Z" />
    </svg>
  );
}

function MacOSIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-10 w-10 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M2 18h20" strokeLinecap="round" />
      <path d="M10 18v2h4v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type DownloadCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonLabel: string;
  comingSoon: string;
  downloadHref?: string;
  downloadLabel?: string;
};

function DownloadCard({
  icon,
  title,
  subtitle,
  buttonLabel,
  comingSoon,
  downloadHref,
  downloadLabel,
}: DownloadCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-panel p-6 transition-all duration-200 hover:border-emerald/30 hover:bg-panel2 hover:shadow-[0_0_30px_rgba(31,174,130,0.08)]">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/8 bg-background/60">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
      <div className="mt-6 flex flex-1 flex-col justify-end">
        {downloadHref ? (
          <a
            href={downloadHref}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 14l-5-5h3V3h4v6h3l-5 5z" />
              <path d="M3 17h14v-2H3v2z" />
            </svg>
            {downloadLabel}
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-panel2 px-5 py-2.5 text-sm font-medium text-muted opacity-70"
          >
            {comingSoon}
          </button>
        )}
        <p className="mt-2 text-center text-xs text-muted">{buttonLabel}</p>
      </div>
    </div>
  );
}

type DesktopDownloadCardsProps = {
  locale?: Locale;
};

export function DesktopDownloadCards({ locale = "en" }: DesktopDownloadCardsProps) {
  const isArabic = locale === "ar";
  const privacy = isArabic ? AR_PRIVACY_SENTENCE : PRIVACY_SENTENCE;
  const contactHref = isArabic ? "/ar/contact" : "/contact";

  const copy = isArabic
    ? {
        title: "تنزيل Chameleon Eye Desktop Connector",
        subtitle:
          "ثبّت موصل سطح المكتب الآمن لسير العمل المحلي والخاص، وتفعيل الأجهزة، والتحليل السحابي المصرح به.",
        windowsSubtitle: "لنظام Windows 10 و Windows 11",
        macSubtitle: "لأجهزة Apple Silicon و Intel Mac",
        comingSoon: "قريباً",
        windowsNote: "نسخة Windows قيد التحضير",
        macNote: "نسخة macOS قيد التحضير",
        security:
          "لن يحتاج موصل سطح المكتب إلى وضع مفاتيح API الرئيسية داخل التطبيق المثبت. يتم الوصول الآمن من خلال تسجيل الدخول، أو تفعيل الجهاز، أو رموز قصيرة المدة، أو حماية خادم الشركة.",
        earlyAccess: "تحتاج وصولاً مبكراً؟",
        cta: "اطلب تكامل سطح المكتب",
      }
    : {
        title: "Download Chameleon Eye Desktop Connector",
        subtitle:
          "Install the secure desktop connector for local/private workflows, device activation, and approved cloud intelligence.",
        windowsSubtitle: "For Windows 10 and Windows 11",
        macSubtitle: "For Apple Silicon and Intel Macs",
        comingSoon: "Coming soon",
        windowsNote: "Download for Windows · Installer coming soon",
        macNote: "Download for macOS · Installer coming soon",
        security:
          "The desktop connector will never require you to place master API keys inside the installed application. Secure access uses login, device activation, short-lived tokens, or company backend protection.",
        earlyAccess: "Need early access?",
        cta: "Request Desktop Integration",
      };

  const arrow = isArabic ? "←" : "→";

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {copy.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">
        {copy.subtitle}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <DownloadCard
          icon={<WindowsIcon />}
          title="Windows"
          subtitle={copy.windowsSubtitle}
          buttonLabel={copy.windowsNote}
          comingSoon={copy.comingSoon}
        />
        <DownloadCard
          icon={<MacOSIcon />}
          title="macOS"
          subtitle={copy.macSubtitle}
          buttonLabel={isArabic ? "macOS Apple Silicon · الإصدار 0.1.0" : "macOS Apple Silicon · v0.1.0"}
          comingSoon={copy.comingSoon}
          downloadHref="/downloads/ChameleonEyeAI-mac.dmg"
          downloadLabel={isArabic ? "تنزيل لـ macOS" : "Download for macOS"}
        />
      </div>

      <div className="mt-8 space-y-4 rounded-2xl border border-emerald/20 bg-panel2 p-6">
        <p className="text-sm leading-7 text-muted">{copy.security}</p>
        <p className="text-sm leading-7 text-gold">{privacy}</p>
      </div>

      <p className="mt-6 text-sm text-muted">
        {copy.earlyAccess}{" "}
        <Link
          href={contactHref}
          className="font-medium text-emerald transition-colors hover:text-emerald/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
        >
          {copy.cta} {arrow}
        </Link>
      </p>
    </section>
  );
}
