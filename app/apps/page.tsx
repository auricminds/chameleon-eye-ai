import { AppsAccessSection } from "@/components/AppsAccessSection";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Apps",
};

export default function AppsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Use Chameleon Eye AI Anywhere"
        subtitle="Start in the browser, install it as an app, or use Chameleon Eye AI from Windows, macOS, iPhone, and iPad."
      />

      <div className="mt-16">
        <AppsAccessSection locale="en" />
      </div>
    </div>
  );
}
