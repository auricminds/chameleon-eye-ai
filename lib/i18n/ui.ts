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
    noTraining: string;
  };
};

// ─── Flat nav links (kept for footer / legacy usage) ─────────────────────────

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

const EN_TRUST_LINKS: NavLink[] = [
  { label: "Trust Center", href: "/trust" },
  { label: "Security", href: "/security" },
  { label: "Privacy", href: "/privacy" },
  { label: "SOC 2", href: "/trust/compliance/soc-2" },
  { label: "ISO 27001", href: "/trust/compliance/iso-27001" },
  { label: "Penetration Testing", href: "/trust/penetration-testing" },
  { label: "DPA", href: "/trust/dpa" },
  { label: "Data Retention", href: "/trust/data-retention" },
  { label: "Subprocessors", href: "/trust/subprocessors" },
  { label: "AI Providers", href: "/trust/ai-providers" },
  { label: "API Docs", href: "/api-docs" },
  { label: "Developers", href: "/developers" },
  { label: "Changelog", href: "/changelog" },
  { label: "Responsible Disclosure", href: "/trust/responsible-disclosure" },
  { label: "Company Transparency", href: "/trust/company" },
  { label: "Trust Pack", href: "/trust/trust-pack" },
];

const AR_TRUST_LINKS: NavLink[] = [
  { label: "مركز الثقة", href: "/ar/trust" },
  { label: "الأمان", href: "/ar/trust/security" },
  { label: "الخصوصية", href: "/ar/trust/privacy" },
  { label: "الامتثال", href: "/ar/trust/compliance" },
  { label: "سياسة عدم التدريب", href: "/ar/trust/no-training-policy" },
  { label: "الإفصاح المسؤول", href: "/ar/trust/responsible-disclosure" },
  { label: "المؤسسات", href: "/ar/enterprise" },
];

export function getNavLinks(locale: Locale): NavLink[] {
  return locale === "ar" ? AR_NAV : EN_NAV;
}

export function getFooterLinks(locale: Locale): NavLink[] {
  const links = getNavLinks(locale);
  const trustLinks = locale === "ar" ? AR_TRUST_LINKS : EN_TRUST_LINKS;
  return [
    ...links,
    locale === "ar"
      ? { label: "التواصل", href: "/ar/contact" }
      : { label: "Contact", href: "/contact" },
    ...trustLinks,
  ];
}

// ─── Structured nav items (used by the new Header) ───────────────────────────

export type NavChild = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

export type NavGroup = {
  heading?: string;
  items: NavChild[];
};

export type NavItem = {
  label: string;
  href?: string;
  /** Key matched against getActiveSection() to highlight this item */
  activeKey: string;
  children?: NavGroup[];
};

const EN_NAV_ITEMS: NavItem[] = [
  {
    label: "Product",
    activeKey: "product",
    children: [
      {
        items: [
          {
            label: "Overview",
            href: "/product",
            description: "The complete Chameleon Eye AI workspace.",
          },
          {
            label: "Private Mode",
            href: "/private-mode",
            description: "Work with sensitive context using privacy-first controls.",
          },
          {
            label: "Local Mode",
            href: "/local-mode",
            description: "Run analysis entirely on your device.",
          },
          {
            label: "AI Routing",
            href: "/ai-routing",
            description: "Control which AI models handle your requests.",
          },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/enterprise",
    activeKey: "solutions",
  },
  {
    label: "AI Reports",
    href: "/reports",
    activeKey: "reports",
  },
  {
    label: "Apps",
    activeKey: "apps",
    children: [
      {
        items: [
          {
            label: "Apps Overview",
            href: "/apps",
            description: "All Chameleon Eye AI clients in one place.",
          },
          {
            label: "Desktop App",
            href: "/desktop",
            description: "Native macOS client.",
            badge: "Beta",
          },
        ],
      },
    ],
  },
  {
    label: "Developers",
    activeKey: "developers",
    children: [
      {
        items: [
          {
            label: "API",
            href: "/api",
            description: "Integrate Chameleon Eye intelligence into your products.",
          },
          {
            label: "API Documentation",
            href: "/api-docs",
            description: "Explore endpoints, authentication, and implementation guides.",
          },
          {
            label: "Terminal",
            href: "/terminal",
            description: "Developer-focused intelligence interface.",
          },
          {
            label: "Developers Hub",
            href: "/developers",
            description: "Tools, usage limits, and platform resources.",
          },
          {
            label: "Changelog",
            href: "/changelog",
            description: "Recent updates and releases.",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    activeKey: "resources",
    children: [
      {
        heading: "Tools",
        items: [
          {
            label: "Compare",
            href: "/compare",
            description: "See how Chameleon Eye AI compares.",
          },
          {
            label: "Free Tools",
            href: "/free-tools",
            description: "No-signup intelligence tools.",
          },
        ],
      },
      {
        heading: "Company",
        items: [
          {
            label: "Trust Center",
            href: "/trust",
            description: "Security, privacy, and compliance.",
          },
          {
            label: "Security",
            href: "/security",
          },
          {
            label: "Privacy",
            href: "/privacy",
          },
          {
            label: "Architecture",
            href: "/architecture",
          },
        ],
      },
    ],
  },
];

const AR_NAV_ITEMS: NavItem[] = [
  {
    label: "المنتج",
    activeKey: "product",
    children: [
      {
        items: [
          {
            label: "نظرة عامة",
            href: "/ar/product",
            description: "مساحة عمل Chameleon Eye AI الكاملة.",
          },
          {
            label: "الوضع الخاص",
            href: "/ar/private-mode",
            description: "اعمل في سياقات حساسة بضوابط تحافظ على الخصوصية أولاً.",
          },
          {
            label: "الوضع المحلي",
            href: "/ar/local-mode",
            description: "شغّل التحليل بالكامل على جهازك.",
          },
          {
            label: "توجيه الذكاء الاصطناعي",
            href: "/ar/ai-routing",
            description: "تحكم في نماذج AI التي تعالج طلباتك.",
          },
        ],
      },
    ],
  },
  {
    label: "الحلول",
    href: "/ar/enterprise",
    activeKey: "solutions",
  },
  {
    label: "تقارير AI",
    href: "/ar/reports",
    activeKey: "reports",
  },
  {
    label: "التطبيقات",
    activeKey: "apps",
    children: [
      {
        items: [
          {
            label: "نظرة عامة على التطبيقات",
            href: "/ar/apps",
            description: "جميع عملاء Chameleon Eye AI في مكان واحد.",
          },
          {
            label: "تطبيق سطح المكتب",
            href: "/ar/desktop",
            description: "عميل macOS الأصلي.",
            badge: "تجريبي",
          },
        ],
      },
    ],
  },
  {
    label: "المطورون",
    activeKey: "developers",
    children: [
      {
        items: [
          {
            label: "API",
            href: "/ar/api",
            description: "ادمج ذكاء Chameleon Eye في منتجاتك.",
          },
          {
            label: "توثيق API",
            href: "/ar/api-docs",
            description: "استكشف نقاط النهاية وأدلة المصادقة.",
          },
          {
            label: "Terminal",
            href: "/ar/terminal",
            description: "واجهة ذكاء موجهة للمطورين.",
          },
          {
            label: "مركز المطورين",
            href: "/ar/developers",
            description: "الأدوات والحدود وموارد المنصة.",
          },
          {
            label: "سجل التغييرات",
            href: "/ar/changelog",
            description: "آخر التحديثات والإصدارات.",
          },
        ],
      },
    ],
  },
  {
    label: "الموارد",
    activeKey: "resources",
    children: [
      {
        heading: "الأدوات",
        items: [
          {
            label: "المقارنة",
            href: "/ar/compare",
            description: "اكتشف كيف يتميز Chameleon Eye AI.",
          },
          {
            label: "أدوات مجانية",
            href: "/ar/free-tools",
            description: "أدوات ذكاء لا تحتاج إلى تسجيل.",
          },
        ],
      },
      {
        heading: "الشركة",
        items: [
          {
            label: "مركز الثقة",
            href: "/ar/trust",
            description: "الأمان والخصوصية والامتثال.",
          },
          {
            label: "الأمان",
            href: "/ar/security",
          },
          {
            label: "الخصوصية",
            href: "/ar/privacy",
          },
          {
            label: "البنية التقنية",
            href: "/ar/architecture",
          },
        ],
      },
    ],
  },
];

export function getNavItems(locale: Locale): NavItem[] {
  return locale === "ar" ? AR_NAV_ITEMS : EN_NAV_ITEMS;
}

// ─── Route helpers ────────────────────────────────────────────────────────────

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

// ─── UI strings ───────────────────────────────────────────────────────────────

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
      noTraining:
        "Chameleon Eye AI does not use customer private files, prompts, or business data to train a public model.",
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
      noTraining:
        "لا تستخدم Chameleon Eye AI ملفات العملاء الخاصة أو نصوص الطلبات أو بيانات الأعمال لتدريب نموذج عام.",
    },
  },
};
