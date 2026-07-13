import { CompareSection } from "@/components/CompareSection";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Compare",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Chameleon Eye AI vs. everything else"
        subtitle="A private business intelligence AI, not a general chatbot. Here's how it fits alongside the tools you already use."
      />

      <div className="mt-16">
        <CompareSection locale="en" />
      </div>
    </div>
  );
}
