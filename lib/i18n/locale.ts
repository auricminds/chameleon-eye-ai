export type Locale = "en" | "ar";

export const LOCALES: Locale[] = ["en", "ar"];

export function isArabicPath(pathname: string): boolean {
  return pathname === "/ar" || pathname.startsWith("/ar/");
}

export function getLocaleFromPathname(pathname: string): Locale {
  return isArabicPath(pathname) ? "ar" : "en";
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3) || "/";
  return pathname;
}

export function localePath(pathname: string, locale: Locale): string {
  const base = stripLocalePrefix(pathname);
  if (locale === "en") return base;
  return base === "/" ? "/ar" : `/ar${base}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}
