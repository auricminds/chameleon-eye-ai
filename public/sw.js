/**
 * Minimal service worker — caches only the offline shell.
 * Does NOT cache Terminal sessions, Business DNA, or other sensitive demo data.
 */
const OFFLINE_CACHE = "chameleon-offline-v1";
const OFFLINE_URL = "/offline";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then((cache) => cache.add(OFFLINE_URL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== OFFLINE_CACHE).map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Never intercept app workspace API or dynamic routes with sensitive data patterns
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.includes("_next/data")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(async () => {
      if (event.request.mode === "navigate") {
        const cached = await caches.match(OFFLINE_URL);
        if (cached) return cached;
      }
      return caches.match(OFFLINE_URL);
    }),
  );
});
