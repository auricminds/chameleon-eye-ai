"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname, type Locale } from "./locale";

export function useLocale(): Locale {
  const pathname = usePathname();
  return getLocaleFromPathname(pathname);
}
