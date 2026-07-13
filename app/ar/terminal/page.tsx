import type { Metadata } from "next";
import { TerminalPageClient } from "@/components/terminal/TerminalPageClient";

export const metadata: Metadata = {
  title: "Chameleon Terminal — Chameleon Eye AI",
};

export default function ArabicTerminalPage() {
  return <TerminalPageClient locale="ar" />;
}
