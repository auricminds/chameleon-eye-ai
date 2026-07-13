import { FreeToolsHub } from "@/components/tools/FreeToolsHub";
import { SectionTitle } from "@/components/SectionTitle";
import { FREE_TOOLS_EN } from "@/lib/tools/free-tools/list";

export const metadata = {
  title: "Free Business Intelligence Tools",
};

export default function FreeToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        align="left"
        title="Free Business Intelligence Tools"
        subtitle="Try simple Chameleon Eye AI scanners before starting a full private intelligence workspace."
      />

      <div className="mt-16">
        <FreeToolsHub locale="en" tools={FREE_TOOLS_EN} />
      </div>
    </div>
  );
}
