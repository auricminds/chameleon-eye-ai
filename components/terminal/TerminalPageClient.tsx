"use client";

import dynamic from "next/dynamic";

const ChameleonTerminal = dynamic(
  () =>
    import("@/components/terminal/ChameleonTerminal").then((m) => ({
      default: m.ChameleonTerminal,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[60vh] items-center justify-center text-muted">{/* locale passed below */}</div>
    ),
  },
);

export function TerminalPageClient({ locale }: { locale: "en" | "ar" }) {
  return (
    <ChameleonTerminal
      locale={locale}
      key={locale}
    />
  );
}
