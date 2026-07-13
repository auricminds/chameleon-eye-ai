import type { Locale } from "./locale";

export type NavLink = { label: string; href: string };

export type UiStrings = {
  signIn: string;
  startFree: string;
  signOut: string;
  terminal: string;
  archive: string;
  menu: string;
  toggleMenu: string;
  languageSwitch: { current: string; alternate: string };
  footer: {
    tagline: string;
    domainsHeading: string;
    comDomain: string;
    aiDomain: string;
    linksHeading: string;
    legal: string;
  };
};

const EN_NAV: NavLink[] = [
  { label: "Product", href: "/product" },
  { label: "API", href: "/api" },
  { label: "Apps", href: "/apps" },
  { label: "Private Mode", href: "/private-mode" },
  { label: "AI Reports", href: "/reports" },
  { label: "Compare", href: "/compare" },
  { label: "Free Tools", href: "/free-tools" },
  { label: "Terminal", href: "/terminal" },
];

const AR_NAV: NavLink[] = [
  { label: "المنتج", href: "/ar/product" },
  { label: "API", href: "/ar/api" },
  { label: "التطبيقات", href: "/ar/apps" },
  { label: "الوضع الخاص", href: "/ar/private-mode" },
  { label: "تقارير AI", href: "/ar/reports" },
  { label: "المقارنة", href: "/ar/compare" },
  { label: "أدوات مجانية", href: "/ar/free-tools" },
  { label: "Terminal", href: "/ar/terminal" },
];

export function getNavLinks(locale: Locale): NavLink[] {
  return locale === "ar" ? AR_NAV : EN_NAV;
}

export function getFooterLinks(locale: Locale): NavLink[] {
  const links = getNavLinks(locale);
  return [
    ...links,
    locale === "ar"
      ? { label: "التواصل", href: "/ar/contact" }
      : { label: "Contact", href: "/contact" },
  ];
}

export function getHomeHref(locale: Locale): string {
  return locale === "ar" ? "/ar" : "/";
}

export function getLoginHref(locale: Locale): string {
  return locale === "ar" ? "/ar/login" : "/login";
}

export function getSignupHref(locale: Locale): string {
  return locale === "ar" ? "/ar/signup" : "/signup";
}

export function getTerminalHref(locale: Locale): string {
  return locale === "ar" ? "/ar/terminal" : "/terminal";
}

export function getArchiveHref(locale: Locale): string {
  return locale === "ar" ? "/ar/archive" : "/archive";
}

export const UI: Record<Locale, UiStrings> = {
  en: {
    signIn: "Sign in",
    startFree: "Start Free",
    signOut: "Sign out",
    terminal: "Terminal",
    archive: "Archive",
    menu: "Menu",
    toggleMenu: "Toggle menu",
    languageSwitch: { current: "English", alternate: "العربية" },
    footer: {
      tagline:
        "Private AI intelligence for companies that need to see what is hidden.",
      domainsHeading: "Domains",
      comDomain: "company website for services and audits.",
      aiDomain: "AI product, private workspace, API, and future client portal.",
      linksHeading: "Links",
      legal:
        "Chameleon Eye AI works only with data, systems, files, and workflows the customer is authorized to use. Sensitive analysis must follow applicable laws, internal policies, and consent requirements.",
    },
  },
  ar: {
    signIn: "تسجيل الدخول",
    startFree: "ابدأ مجاناً",
    signOut: "تسجيل الخروج",
    terminal: "Terminal",
    archive: "الأرشيف",
    menu: "القائمة",
    toggleMenu: "فتح القائمة",
    languageSwitch: { current: "English", alternate: "العربية" },
    footer: {
      tagline:
        "ذكاء AI خاص للشركات التي تحتاج إلى رؤية ما هو مخفي داخل أعمالها.",
      domainsHeading: "النطاقات",
      comDomain:
        "موقع الشركة للخدمات والمراجعات والاستشارات.",
      aiDomain:
        "منتج AI، مساحة العمل الخاصة، API، وبوابة العملاء المستقبلية.",
      linksHeading: "روابط",
      legal:
        "تعمل Chameleon Eye AI فقط مع البيانات والأنظمة والملفات وسير العمل التي يملك العميل صلاحية استخدامها أو تحليلها. يجب أن تراعي التحليلات الحساسة القوانين والسياسات الداخلية ومتطلبات الموافقة.",
    },
  },
};
