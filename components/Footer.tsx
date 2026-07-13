"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/use-locale";
import { getFooterLinks, UI } from "@/lib/i18n/ui";

export function Footer() {
  const locale = useLocale();
  const footerLinks = getFooterLinks(locale);
  const ui = UI[locale].footer;
  const isArabic = locale === "ar";

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="mt-auto border-t border-white/8 bg-panel"
    >
      <div
        className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 ${isArabic ? "text-right" : ""}`}
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-lg font-semibold text-foreground">
              <span className="text-emerald">Chameleon Eye</span> AI
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              {ui.tagline}
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted">
              <p className="font-medium text-foreground">{ui.domainsHeading}</p>
              <p>
                <span className="text-foreground">chameleoneye.com</span> —{" "}
                {ui.comDomain}
              </p>
              <p>
                <span className="text-foreground">chameleoneye.ai</span> —{" "}
                {ui.aiDomain}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-foreground">
              {UI[locale].footer.linksHeading}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 pt-6">
          <p className="text-xs leading-6 text-muted">{ui.legal}</p>
        </div>
      </div>
    </footer>
  );
}
