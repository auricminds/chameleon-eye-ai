export type FooterLink = {
  label: string
  href: string
  external?: true
}

export type FooterGroup = {
  id: string
  heading: string
  links: FooterLink[]
}

export type FooterCopy = {
  tagline: string
  corp: string
  corporateWebsiteLabel: string
  bottomLinks: FooterLink[]
  trustLine: string
  copyright: string
}

// ─── English ──────────────────────────────────────────────────────────────────

export const EN_GROUPS: FooterGroup[] = [
  {
    id: 'product',
    heading: 'Product',
    links: [
      { label: 'Product', href: '/product' },
      { label: 'Private Mode', href: '/private-mode' },
      { label: 'AI Reports', href: '/reports' },
      { label: 'Apps', href: '/apps' },
      { label: 'Compare', href: '/compare' },
      { label: 'Free Tools', href: '/free-tools' },
    ],
  },
  {
    id: 'developers',
    heading: 'Developers',
    links: [
      { label: 'API', href: '/api' },
      { label: 'API Docs', href: '/api-docs' },
      { label: 'Terminal', href: '/terminal' },
      { label: 'Developers', href: '/developers' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    id: 'trust',
    heading: 'Trust & Legal',
    links: [
      { label: 'Trust Center', href: '/trust' },
      { label: 'Security', href: '/security' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'DPA', href: '/trust/dpa' },
      { label: 'Data Retention', href: '/trust/data-retention' },
      { label: 'Subprocessors', href: '/trust/subprocessors' },
      { label: 'Responsible Disclosure', href: '/trust/responsible-disclosure' },
    ],
  },
  {
    id: 'company',
    heading: 'Company',
    links: [
      { label: 'Company Transparency', href: '/trust/company' },
      { label: 'Contact', href: '/contact' },
      { label: 'AI Providers', href: '/trust/ai-providers' },
      { label: 'Trust Pack', href: '/trust/trust-pack' },
    ],
  },
]

export const EN_COPY: FooterCopy = {
  tagline: 'Private intelligence for companies that need to see what others miss.',
  corp: 'CHAMELEONEYE LLC',
  corporateWebsiteLabel: 'Corporate Website',
  bottomLinks: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Security', href: '/security' },
    { label: 'Responsible Disclosure', href: '/trust/responsible-disclosure' },
  ],
  trustLine: 'Customer private data is not used to train public AI models.',
  copyright: `© ${new Date().getFullYear()} CHAMELEONEYE LLC. All rights reserved.`,
}

// ─── Arabic ───────────────────────────────────────────────────────────────────

export const AR_GROUPS: FooterGroup[] = [
  {
    id: 'product',
    heading: 'المنتج',
    links: [
      { label: 'المنتج', href: '/ar/product' },
      { label: 'الوضع الخاص', href: '/ar/private-mode' },
      { label: 'تقارير AI', href: '/ar/reports' },
      { label: 'التطبيقات', href: '/ar/apps' },
      { label: 'المقارنة', href: '/ar/compare' },
      { label: 'أدوات مجانية', href: '/ar/free-tools' },
    ],
  },
  {
    id: 'developers',
    heading: 'المطورون',
    links: [
      { label: 'API', href: '/ar/api' },
      { label: 'توثيق API', href: '/ar/api-docs' },
      { label: 'Terminal', href: '/ar/terminal' },
      { label: 'المطورون', href: '/developers' },
      { label: 'سجل التغييرات', href: '/changelog' },
    ],
  },
  {
    id: 'trust',
    heading: 'الثقة والشؤون القانونية',
    links: [
      { label: 'مركز الثقة', href: '/ar/trust' },
      { label: 'الأمان', href: '/ar/trust/security' },
      { label: 'الخصوصية', href: '/ar/trust/privacy' },
      { label: 'DPA', href: '/trust/dpa' },
      { label: 'الاحتفاظ بالبيانات', href: '/ar/trust/data-retention' },
      { label: 'معالجو البيانات', href: '/ar/trust/subprocessors' },
      { label: 'الإفصاح المسؤول', href: '/ar/trust/responsible-disclosure' },
    ],
  },
  {
    id: 'company',
    heading: 'الشركة',
    links: [
      { label: 'شفافية الشركة', href: '/trust/company' },
      { label: 'التواصل', href: '/ar/contact' },
      { label: 'موردو AI', href: '/ar/trust/ai-providers' },
      { label: 'Trust Pack', href: '/trust/trust-pack' },
    ],
  },
]

export const AR_COPY: FooterCopy = {
  tagline: 'ذكاء خاص للشركات التي تحتاج إلى رؤية ما لا يراه الآخرون.',
  corp: 'CHAMELEONEYE LLC',
  corporateWebsiteLabel: 'الموقع الرسمي للشركة',
  bottomLinks: [
    { label: 'الخصوصية', href: '/ar/trust/privacy' },
    { label: 'الأمان', href: '/ar/trust/security' },
    { label: 'الإفصاح المسؤول', href: '/ar/trust/responsible-disclosure' },
  ],
  trustLine: 'لا تُستخدم البيانات الخاصة للعملاء في تدريب نماذج AI عامة.',
  copyright: `© ${new Date().getFullYear()} CHAMELEONEYE LLC. جميع الحقوق محفوظة.`,
}
