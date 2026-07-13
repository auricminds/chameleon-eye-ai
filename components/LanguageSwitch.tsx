"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLocale, getLocaleFromPathname, localePath } from "@/lib/i18n/locale";
import { setTerminalLanguage } from "@/lib/demo/storage";
import { UI } from "@/lib/i18n/ui";

export function LanguageSwitch() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const targetLocale = alternateLocale(locale);
  const href = localePath(pathname, targetLocale);
  const labels = UI[locale].languageSwitch;

  function handleSwitch() {
    setTerminalLanguage(targetLocale);
  }

  return (
    <div className="flex items-center gap-1.5 text-xs sm:text-sm">
      {locale === "en" ? (
        <>
          <span className="font-medium text-foreground">{labels.current}</span>
          <span className="text-muted/60">/</span>
          <Link
            href={href}
            onClick={handleSwitch}
            className="text-muted transition-colors hover:text-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
          >
            {labels.alternate}
          </Link>
        </>
      ) : (
        <>
          <Link
            href={href}
            onClick={handleSwitch}
            className="text-muted transition-colors hover:text-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
          >
            {labels.current}
          </Link>
          <span className="text-muted/60">/</span>
          <span className="font-medium text-foreground">{labels.alternate}</span>
        </>
      )}
    </div>
  );
}
