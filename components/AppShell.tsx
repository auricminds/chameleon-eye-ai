"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isAppRoute } from "@/lib/appRoutes";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isAppRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
