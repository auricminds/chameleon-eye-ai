import type { Locale } from "@/lib/i18n/locale";

function hasArabicPrefix(path: string): boolean {
  return path === "/ar" || path.startsWith("/ar/");
}

export function demoPath(path: string, locale: Locale): string {
  if (locale === "ar") {
    if (path === "/") return "/ar";
    return hasArabicPrefix(path) ? path : `/ar${path}`;
  }
  return hasArabicPrefix(path) ? path.replace(/^\/ar/, "") || "/" : path;
}

export const DEMO_ROUTES = {
  signup: (l: Locale) => demoPath("/signup", l),
  businessDna: (l: Locale) => demoPath("/business-dna", l),
  terminal: (l: Locale) => demoPath("/terminal", l),
  archive: (l: Locale) => demoPath("/archive", l),
  settingsBusinessDna: (l: Locale) => demoPath("/settings/business-dna", l),
  login: (l: Locale) => demoPath("/login", l),
};
