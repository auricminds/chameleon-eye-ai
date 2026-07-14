import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal, Cairo } from "next/font/google";
import { headers } from "next/headers";
import { AppShell } from "@/components/AppShell";
import { LocaleHtmlSync } from "@/components/LocaleHtmlSync";
import { PwaRegister } from "@/components/PwaRegister";
import type { Locale } from "@/lib/i18n/locale";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Chameleon Eye AI — Private AI Intelligence",
    template: "%s | Chameleon Eye AI",
  },
  description:
    "Private AI intelligence for companies that need to see what is hidden. Analyze approved data, detect risks, and generate confidential reports.",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://chameleoneye.ai"),
  openGraph: {
    type: "website",
    siteName: "Chameleon Eye AI",
    title: "Chameleon Eye AI — Private Business Intelligence",
    description:
      "Commercial private AI intelligence platform with local-first options, verified compliance documentation, and approval-based cloud processing.",
    url: "https://chameleoneye.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chameleon Eye AI — Private Business Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chameleon Eye AI — Private Business Intelligence",
    description:
      "Commercial private AI intelligence platform with local-first options, verified compliance documentation, and approval-based cloud processing.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chameleon AI",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport = {
  themeColor: "#06110D",
};

const jsonLdSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chameleon Eye",
    url: "https://chameleoneye.ai",
    logo: "https://chameleoneye.ai/logo.png",
    description:
      "Chameleon Eye AI is a commercial private AI intelligence platform for businesses.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@chameleoneye.ai",
    },
    sameAs: [
      "https://linkedin.com/company/chameleon-eye",
      "https://twitter.com/chameleoneye",
      "https://github.com/chameleon-eye",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Chameleon Eye AI",
    url: "https://chameleoneye.ai",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, macOS, Windows",
    description:
      "Private AI intelligence workspace for business risk analysis, cash waste detection, marketing intelligence, and structured business reports.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "0",
      description: "Free tools available. Workspace plans available.",
    },
  },
];

async function getLocale(): Promise<Locale> {
  const headersList = await headers();
  return headersList.get("x-locale") === "ar" ? "ar" : "en";
}

const localeBootstrapScript = `(function(){try{var p=location.pathname;var a=p==="/ar"||p.indexOf("/ar/")===0;document.documentElement.setAttribute("dir",a?"rtl":"ltr");document.documentElement.setAttribute("lang",a?"ar":"en");}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const lang = locale;

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} ${cairo.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBootstrapScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Chameleon AI" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <LocaleHtmlSync />
        <PwaRegister />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
