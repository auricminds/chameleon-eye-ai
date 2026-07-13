"use client";

import { DemoDrawer } from "./DemoDrawer";
import { deleteRiskReview, attachSessionToProject } from "@/lib/demo/storage";
import { useProjects, useRiskReviews } from "@/lib/demo/hooks";
import { riskReviewOptionLabel } from "@/lib/demo/riskReviewQuestions";
import type { RiskReview } from "@/lib/demo/types";

type RiskReviewsDrawerProps = {
  locale: "en" | "ar";
  onClose: () => void;
  onOpenSession: (sessionId: string) => void;
  onCreateScheduleFollowUp: (review: RiskReview) => void;
};

const RISK_COLORS: Record<RiskReview["riskLevel"], string> = {
  low: "border-emerald/30 bg-emerald/10 text-emerald",
  medium: "border-gold/30 bg-gold/10 text-gold",
  high: "border-red-400/30 bg-red-400/10 text-red-400",
  critical: "border-red-500/50 bg-red-500/10 text-red-300",
};

export function RiskReviewsDrawer({
  locale,
  onClose,
  onOpenSession,
  onCreateScheduleFollowUp,
}: RiskReviewsDrawerProps) {
  const isArabic = locale === "ar";
  const riskReviews = useRiskReviews();
  const projects = useProjects();

  const labels = isArabic
    ? {
        title: "مراجعات المخاطر",
        subtitle: "كل مراجعات المخاطر المحفوظة لديك.",
        open: "فتح",
        delete: "حذف",
        attachProject: "ربط بمشروع",
        attachPlaceholder: "ربط بمشروع...",
        createFollowUp: "إنشاء متابعة مجدولة",
        empty: "لا توجد مراجعات مخاطر بعد.",
        emptyBody: "استخدم زر \"إنشاء مراجعة مخاطر\" في المحادثة لإنشاء أول مراجعة.",
        confirmDelete: "حذف هذه المراجعة؟ لا يمكن التراجع.",
      }
    : {
        title: "Risk Reviews",
        subtitle: "All your saved risk reviews.",
        open: "Open",
        delete: "Delete",
        attachProject: "Attach to project",
        attachPlaceholder: "Attach to project...",
        createFollowUp: "Create Schedule Follow-up",
        empty: "No risk reviews yet.",
        emptyBody: "Use \"Create Risk Review\" in the composer to build your first one.",
        confirmDelete: "Delete this risk review? This cannot be undone.",
      };

  const riskLevelLabels: Record<RiskReview["riskLevel"], string> = isArabic
    ? { low: "منخفض", medium: "متوسط", high: "مرتفع", critical: "حرج" }
    : { low: "Low", medium: "Medium", high: "High", critical: "Critical" };

  const sorted = [...riskReviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  function handleDelete(id: string) {
    if (confirm(labels.confirmDelete)) deleteRiskReview(id);
  }

  return (
    <DemoDrawer locale={locale} title={labels.title} onClose={onClose}>
      <p className="text-sm leading-6 text-muted">{labels.subtitle}</p>

      <div className="mt-4 space-y-3">
        {sorted.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-background/40 p-5 text-center">
            <p className="text-sm font-medium text-foreground">{labels.empty}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{labels.emptyBody}</p>
          </div>
        ) : (
          sorted.map((review) => {
            const focusLabel = riskReviewOptionLabel("focusArea", review.focusArea, locale);
            return (
              <div key={review.id} className="rounded-xl border border-white/10 bg-background/40 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{focusLabel}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted">{review.summary}</p>
                    <p className="mt-1 text-[10px] text-muted">
                      {new Date(review.createdAt).toLocaleDateString(isArabic ? "ar" : "en")}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${RISK_COLORS[review.riskLevel]}`}
                  >
                    {riskLevelLabels[review.riskLevel]} · {review.riskScore}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenSession(review.sessionId)}
                    className="rounded-lg border border-emerald/30 px-2.5 py-1 text-[10px] text-emerald transition-colors hover:bg-emerald/5"
                  >
                    {labels.open}
                  </button>
                  {review.followUp !== "none" ? (
                    <button
                      type="button"
                      onClick={() => onCreateScheduleFollowUp(review)}
                      className="rounded-lg border border-gold/30 px-2.5 py-1 text-[10px] text-gold transition-colors hover:bg-gold/5"
                    >
                      {labels.createFollowUp}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => handleDelete(review.id)}
                    className="rounded-lg border border-red-400/30 px-2.5 py-1 text-[10px] text-red-400 transition-colors hover:bg-red-400/5"
                  >
                    {labels.delete}
                  </button>
                  {projects.length > 0 ? (
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        if (e.target.value) attachSessionToProject(e.target.value, review.sessionId);
                        e.target.value = "";
                      }}
                      className="rounded-lg border border-white/10 bg-background px-2 py-1 text-[10px] text-muted outline-none focus:border-emerald/40"
                      aria-label={labels.attachProject}
                    >
                      <option value="">{labels.attachPlaceholder}</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </DemoDrawer>
  );
}
