"use client";

import { useEffect, useState } from "react";
import { detectPlatform, type PlatformInfo } from "@/lib/platform";

const DEFAULT_PLATFORM: PlatformInfo = {
  kind: "browser",
  label: "Browser",
  isMobile: false,
  isStandalone: false,
};

export function PlatformBadge() {
  const [platform, setPlatform] = useState<PlatformInfo>(DEFAULT_PLATFORM);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => setPlatform(detectPlatform()), 0);
    return () => clearTimeout(timer);
  }, []);

  if (platform.kind === "browser") return null;

  return (
    <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted sm:inline">
      {platform.label}
    </span>
  );
}
