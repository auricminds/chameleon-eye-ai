import type { Metadata } from "next";
import { BusinessDnaEditor } from "@/components/business-dna/BusinessDnaEditor";

export const metadata: Metadata = {
  title: "تعديل Business DNA — Chameleon Eye AI",
};

export default function ArabicSettingsBusinessDnaPage() {
  return <BusinessDnaEditor locale="ar" />;
}
