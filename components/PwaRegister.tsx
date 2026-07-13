"use client";

import { useEffect } from "react";

/** Registers minimal offline service worker (production only). */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* optional — PWA still installable via manifest */
    });
  }, []);
  return null;
}
