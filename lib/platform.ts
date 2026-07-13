export type PlatformKind = "browser" | "pwa" | "desktop" | "ios" | "mobile-web";

export type PlatformInfo = {
  kind: PlatformKind;
  label: string;
  isMobile: boolean;
  isStandalone: boolean;
};

const HOSTED_APP_URL = "https://chameleon-eye-ai-tau.vercel.app";

export { HOSTED_APP_URL };

function hasWindow(): boolean {
  return typeof window !== "undefined";
}

/** Detect Tauri desktop shell */
export function isTauri(): boolean {
  if (!hasWindow()) return false;
  return "__TAURI_INTERNALS__" in window || "__TAURI__" in window;
}

/** Detect Capacitor native shell (iOS/Android) */
export function isCapacitorNative(): boolean {
  if (!hasWindow()) return false;
  const cap = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } })
    .Capacitor;
  return Boolean(cap?.isNativePlatform?.());
}

/** PWA standalone (installed from browser) */
export function isPwaStandalone(): boolean {
  if (!hasWindow()) return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function isMobileUserAgent(): boolean {
  if (!hasWindow()) return false;
  return /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
}

// Tauri/Capacitor/standalone status cannot change during a page's lifetime, so
// the result is cached after the first real (client-side) detection. Callers
// that need a referentially stable value (e.g. useSyncExternalStore snapshots)
// can rely on repeated calls returning the same object, not a fresh literal.
let cachedPlatform: PlatformInfo | null = null;

export function detectPlatform(): PlatformInfo {
  if (cachedPlatform) return cachedPlatform;

  if (!hasWindow()) {
    // Not cached: this is the SSR/pre-mount fallback, not a real detection.
    return { kind: "browser", label: "Browser", isMobile: false, isStandalone: false };
  }

  let result: PlatformInfo;

  if (isTauri()) {
    result = { kind: "desktop", label: "Desktop", isMobile: false, isStandalone: true };
  } else if (isCapacitorNative()) {
    const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    result = {
      kind: ios ? "ios" : "mobile-web",
      label: ios ? "iOS" : "Mobile",
      isMobile: true,
      isStandalone: true,
    };
  } else if (isPwaStandalone()) {
    result = {
      kind: "pwa",
      label: "PWA",
      isMobile: isMobileUserAgent(),
      isStandalone: true,
    };
  } else if (isMobileUserAgent()) {
    result = { kind: "mobile-web", label: "Mobile", isMobile: true, isStandalone: false };
  } else {
    result = { kind: "browser", label: "Browser", isMobile: false, isStandalone: false };
  }

  cachedPlatform = result;
  return result;
}
