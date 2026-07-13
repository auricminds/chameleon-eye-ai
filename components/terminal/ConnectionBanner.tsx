"use client";

import { useEffect, useState } from "react";

type ConnectionBannerProps = {
  locale: "en" | "ar";
};

export function ConnectionBanner({ locale }: ConnectionBannerProps) {
  const isArabic = locale === "ar";
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (online) return null;

  const message = isArabic
    ? "أنت غير متصل بالإنترنت. يمكن استخدام تجربة Chameleon Terminal محلياً، لكن ميزات AI والحساب ستحتاج إلى اتصال."
    : "You are offline. Chameleon Terminal demo is available locally, but live AI and account features will require connection.";

  return (
    <div className="border-b border-gold/20 bg-gold/5 px-3 py-1.5 text-center text-[10px] leading-4 text-gold sm:text-xs">
      {message}
    </div>
  );
}
