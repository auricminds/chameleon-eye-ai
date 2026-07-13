import Link from "next/link";
import { Card } from "@/components/Card";
import type { FreeToolListItem } from "@/lib/tools/free-tools/list";

type Copy = {
  whatItChecksLabel: string;
  timeLabel: string;
  resultLabel: string;
  cta: string;
};

const EN_COPY: Copy = {
  whatItChecksLabel: "What it checks:",
  timeLabel: "Time required:",
  resultLabel: "Result:",
  cta: "Start Tool",
};

const AR_COPY: Copy = {
  whatItChecksLabel: "ما الذي يفحصه:",
  timeLabel: "الوقت المطلوب:",
  resultLabel: "النتيجة:",
  cta: "ابدأ الأداة",
};

export function FreeToolsHub({
  locale = "en",
  tools,
}: {
  locale?: "en" | "ar";
  tools: FreeToolListItem[];
}) {
  const copy = locale === "ar" ? AR_COPY : EN_COPY;
  const basePath = locale === "ar" ? "/ar/free-tools" : "/free-tools";

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map(({ slug, config }) => (
        <Card key={slug} hover className="flex h-full flex-col">
          <h3 className="text-lg font-semibold text-foreground">{config.toolTitle}</h3>

          <div className="mt-3 flex-1 space-y-2 text-sm leading-6 text-muted">
            <p>
              <span className="font-medium text-gold">{copy.whatItChecksLabel}</span>{" "}
              {config.toolSubtitle}
            </p>
            <p>
              <span className="font-medium text-gold">{copy.timeLabel}</span> {config.timeEstimate}
            </p>
            <p>
              <span className="font-medium text-gold">{copy.resultLabel}</span> {config.resultTitle}
            </p>
          </div>

          <div className="mt-5">
            <Link
              href={`${basePath}/${slug}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-emerald/30 bg-emerald px-5 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:bg-emerald/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A]"
            >
              {copy.cta}
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
