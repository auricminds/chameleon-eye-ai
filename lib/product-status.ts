export type ProductStatus =
  | "available"
  | "public_beta"
  | "private_beta"
  | "development_preview"
  | "early_access"
  | "coming_soon"
  | "planned"
  | "temporarily_unavailable";

export const PRODUCT_STATUS = {
  webApp: {
    status: "development_preview" as ProductStatus,
    label: "Development Preview",
    version: "0.2.0",
    description: "Local browser demo — no cloud account required",
    cta: "Try Demo",
    ctaHref: "/terminal",
  },
  pwa: {
    status: "development_preview" as ProductStatus,
    label: "Development Preview",
    description: "Install from browser for offline-capable access",
    cta: "Install Instructions",
  },
  macOsApp: {
    status: "early_access" as ProductStatus,
    label: "Early Access",
    version: "0.2.0",
    description: "Apple Silicon · Development build · Requires Ollama",
    warning:
      "Development build — macOS security warning expected. Right-click → Open to run.",
    cta: "Download for macOS",
    ctaHref:
      "https://github.com/auricminds/chameleon-eye-ai/releases/download/v0.2.0/ChameleonEyeDesktop-0.2.0-arm64.dmg",
    architecture: "arm64 (Apple Silicon)",
    minOS: "macOS 12 Ventura",
    signed: false,
    notarized: false,
  },
  windowsApp: {
    status: "coming_soon" as ProductStatus,
    label: "Coming Soon",
    cta: "Notify Me",
  },
  iOSApp: {
    status: "planned" as ProductStatus,
    label: "In Development",
    cta: "Join Waitlist",
  },
  androidApp: {
    status: "planned" as ProductStatus,
    label: "In Development",
    cta: "Join Waitlist",
  },
  api: {
    status: "development_preview" as ProductStatus,
    label: "Developer Preview",
    description:
      "API structures defined — production access not yet generally available",
    cta: "Join API Early Access",
  },
  localMode: {
    status: "early_access" as ProductStatus,
    label: "Early Access",
    description: "Requires Ollama + qwen3:8b running locally",
  },
  cloudMode: {
    status: "development_preview" as ProductStatus,
    label: "Development Preview",
    description: "Via Chameleon Eye backend — in development",
  },
} as const;
