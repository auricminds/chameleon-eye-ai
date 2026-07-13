import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        title="Request Chameleon Eye AI access"
        subtitle="Tell us what you want to build or analyze."
      />

      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
