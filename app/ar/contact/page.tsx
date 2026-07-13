import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "التواصل",
};

export default function ArabicContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        title="اطلب الوصول إلى Chameleon Eye AI"
        subtitle="أخبرنا بما تريد بناءه أو تحليله."
      />

      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
