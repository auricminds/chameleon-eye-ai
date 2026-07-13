import type { CapacitorConfig } from "@capacitor/cli";

/**
 * iOS shell loads the hosted Chameleon Eye AI web core.
 * No API keys, OpenRouter keys, or Supabase service keys belong in this config.
 *
 * Future: point to local bundled export or authenticated backend URLs.
 */
const config: CapacitorConfig = {
  appId: "com.chameleoneye.ai",
  appName: "Chameleon Eye AI",
  webDir: "capacitor-web",
  server: {
    url: "https://chameleon-eye-ai-tau.vercel.app/terminal",
    cleartext: false,
  },
  ios: {
    contentInset: "automatic",
    allowsLinkPreview: false,
  },
};

export default config;
