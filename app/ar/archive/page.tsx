import type { Metadata } from "next";
import { ArchivePage } from "@/components/terminal/ArchivePage";

export const metadata: Metadata = {
  title: "الأرشيف — Chameleon Eye AI",
};

export default function ArabicArchivePage() {
  return <ArchivePage locale="ar" />;
}
