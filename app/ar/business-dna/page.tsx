import type { Metadata } from "next";
import { BusinessDnaQuiz } from "@/components/business-dna/BusinessDnaQuiz";

export const metadata: Metadata = {
  title: "Business DNA — Chameleon Eye AI",
};

export default function ArabicBusinessDnaPage() {
  return <BusinessDnaQuiz locale="ar" />;
}
