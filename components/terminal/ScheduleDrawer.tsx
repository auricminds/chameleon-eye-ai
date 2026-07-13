"use client";

import { useState } from "react";
import { DemoDrawer } from "./DemoDrawer";
import { deleteSchedule, uid, upsertSchedule } from "@/lib/demo/storage";
import { useProjects, useSchedules } from "@/lib/demo/hooks";
import type { DemoSchedule, ScheduleCheckType, ScheduleFrequency } from "@/lib/demo/types";

const CHECK_TYPES: ScheduleCheckType[] = [
  "cash_waste",
  "operational_risk",
  "customer_journey",
  "marketing_intel",
  "team_effectiveness",
  "decision_followup",
  "private_mode",
  "custom",
];

const CHECK_TYPE_LABELS: Record<"en" | "ar", Record<ScheduleCheckType, string>> = {
  en: {
    cash_waste: "Cash Waste Check",
    operational_risk: "Operational Risk Review",
    customer_journey: "Customer Journey Review",
    marketing_intel: "Marketing Intelligence Review",
    team_effectiveness: "Team Effectiveness Review",
    decision_followup: "Decision Follow-up",
    private_mode: "Private Mode Review",
    custom: "Custom Check",
  },
  ar: {
    cash_waste: "فحص الهدر المالي",
    operational_risk: "مراجعة المخاطر التشغيلية",
    customer_journey: "مراجعة رحلة العميل",
    marketing_intel: "مراجعة ذكاء التسويق",
    team_effectiveness: "مراجعة فعالية الفريق",
    decision_followup: "متابعة قرار",
    private_mode: "مراجعة الوضع الخاص",
    custom: "فحص مخصص",
  },
};

const FREQUENCIES: ScheduleFrequency[] = ["one_time", "daily", "weekly", "monthly", "quarterly"];

const FREQUENCY_LABELS: Record<"en" | "ar", Record<ScheduleFrequency, string>> = {
  en: {
    one_time: "One time",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
  },
  ar: {
    one_time: "مرة واحدة",
    daily: "يومي",
    weekly: "أسبوعي",
    monthly: "شهري",
    quarterly: "ربع سنوي",
  },
};

type ScheduleDrawerProps = {
  locale: "en" | "ar";
  onClose: () => void;
  prefill?: { title: string; checkType: ScheduleCheckType; frequency: ScheduleFrequency };
};

export function ScheduleDrawer({ locale, onClose, prefill }: ScheduleDrawerProps) {
  const isArabic = locale === "ar";
  const schedules = useSchedules();
  const projects = useProjects();
  const [creating, setCreating] = useState(Boolean(prefill));
  const [title, setTitle] = useState(prefill?.title ?? "");
  const [checkType, setCheckType] = useState<ScheduleCheckType>(prefill?.checkType ?? "cash_waste");
  const [frequency, setFrequency] = useState<ScheduleFrequency>(prefill?.frequency ?? "weekly");
  const [projectId, setProjectId] = useState<string>("");
  const [notes, setNotes] = useState("");

  const labels = isArabic
    ? {
        title: "الجدولة",
        subtitle: "خطط لفحوصات الذكاء الخاصة بالمخاطر والتقارير والمشاريع والمتابعة.",
        demoNote:
          "وضع تجريبي: يتم حفظ الفحوصات المجدولة محلياً فقط. التذكيرات التلقائية والمتابعة الحقيقية ستكون متاحة بعد إعداد الخادم الخلفي.",
        newSchedule: "فحص مجدول جديد",
        upcoming: "القادم",
        markDone: "تم",
        delete: "حذف",
        done: "منجز",
        save: "حفظ",
        cancel: "إلغاء",
        create: "إنشاء الجدولة",
        titleLabel: "العنوان",
        checkTypeLabel: "نوع الفحص",
        frequencyLabel: "التكرار",
        projectLabel: "المشروع (اختياري)",
        noProject: "بدون مشروع",
        notesLabel: "ملاحظات",
        emptyTitle: "لا توجد فحوصات مجدولة بعد.",
        emptyBody: "أنشئ جدولة تجريبية لتخطيط مراجعات الذكاء القادمة.",
        emptyCta: "إنشاء أول جدولة",
        confirmDelete: "حذف هذه الجدولة؟ لا يمكن التراجع.",
      }
    : {
        title: "Schedule",
        subtitle: "Plan intelligence checks for risks, reports, projects, and follow-ups.",
        demoNote:
          "Demo mode: scheduled checks are saved locally only. Automatic reminders and real monitoring will be available after backend setup.",
        newSchedule: "New Scheduled Check",
        upcoming: "Upcoming",
        markDone: "Mark done",
        delete: "Delete",
        done: "Done",
        save: "Save",
        cancel: "Cancel",
        create: "Create Schedule",
        titleLabel: "Title",
        checkTypeLabel: "Check type",
        frequencyLabel: "Frequency",
        projectLabel: "Project (optional)",
        noProject: "No project",
        notesLabel: "Notes",
        emptyTitle: "No scheduled checks yet.",
        emptyBody: "Create a demo schedule to plan future intelligence reviews.",
        emptyCta: "Create First Schedule",
        confirmDelete: "Delete this schedule? This cannot be undone.",
      };

  function resetForm() {
    setTitle("");
    setCheckType("cash_waste");
    setFrequency("weekly");
    setProjectId("");
    setNotes("");
    setCreating(false);
  }

  function handleCreate() {
    const trimmed = title.trim();
    if (!trimmed) return;
    const now = new Date().toISOString();
    const schedule: DemoSchedule = {
      id: uid(),
      title: trimmed,
      checkType,
      frequency,
      projectId: projectId || null,
      nextRunLabel: FREQUENCY_LABELS[locale][frequency],
      notes: notes.trim(),
      createdAt: now,
      updatedAt: now,
      status: "upcoming",
      language: locale,
    };
    upsertSchedule(schedule);
    resetForm();
  }

  function handleMarkDone(schedule: DemoSchedule) {
    upsertSchedule({ ...schedule, status: "done", updatedAt: new Date().toISOString() });
  }

  function handleDelete(id: string) {
    if (confirm(labels.confirmDelete)) deleteSchedule(id);
  }

  function projectName(id: string | null) {
    if (!id) return labels.noProject;
    return projects.find((p) => p.id === id)?.name ?? labels.noProject;
  }

  const sorted = [...schedules].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <DemoDrawer locale={locale} title={labels.title} onClose={onClose}>
      <p className="text-sm leading-6 text-muted">{labels.subtitle}</p>
      <p className="mt-3 rounded-lg border border-gold/20 bg-gold/5 px-3 py-2 text-[11px] leading-5 text-gold">
        {labels.demoNote}
      </p>

      {!creating ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-xs font-medium text-emerald transition-colors hover:bg-emerald/15"
          >
            + {labels.newSchedule}
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-background/60 p-3">
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              {labels.titleLabel}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              {labels.checkTypeLabel}
            </label>
            <select
              value={checkType}
              onChange={(e) => setCheckType(e.target.value as ScheduleCheckType)}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
            >
              {CHECK_TYPES.map((c) => (
                <option key={c} value={c}>
                  {CHECK_TYPE_LABELS[locale][c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              {labels.frequencyLabel}
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as ScheduleFrequency)}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
            >
              {FREQUENCIES.map((f) => (
                <option key={f} value={f}>
                  {FREQUENCY_LABELS[locale][f]}
                </option>
              ))}
            </select>
          </div>
          {projects.length > 0 ? (
            <div>
              <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
                {labels.projectLabel}
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
              >
                <option value="">{labels.noProject}</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div>
            <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              {labels.notesLabel}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCreate}
              disabled={!title.trim()}
              className="rounded-full border border-emerald/30 bg-emerald px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-emerald/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {labels.create}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-white/10 px-4 py-2 text-xs text-muted transition-colors hover:text-foreground"
            >
              {labels.cancel}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {sorted.length === 0 && !creating ? (
          <div className="rounded-xl border border-white/10 bg-background/40 p-5 text-center">
            <p className="text-sm font-medium text-foreground">{labels.emptyTitle}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{labels.emptyBody}</p>
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="mt-3 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-xs font-medium text-emerald transition-colors hover:bg-emerald/15"
            >
              {labels.emptyCta}
            </button>
          </div>
        ) : (
          sorted.map((schedule) => (
            <div
              key={schedule.id}
              className={`rounded-xl border p-3 ${
                schedule.status === "done"
                  ? "border-white/10 bg-background/20 opacity-60"
                  : "border-white/10 bg-background/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{schedule.title}</p>
                  <p className="mt-0.5 text-[10px] text-muted">
                    {CHECK_TYPE_LABELS[locale][schedule.checkType]} ·{" "}
                    {FREQUENCY_LABELS[locale][schedule.frequency]} ·{" "}
                    {projectName(schedule.projectId)}
                  </p>
                  {schedule.notes ? (
                    <p className="mt-1 line-clamp-2 text-xs text-muted">{schedule.notes}</p>
                  ) : null}
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${
                    schedule.status === "done"
                      ? "border-white/10 text-muted"
                      : "border-emerald/30 bg-emerald/10 text-emerald"
                  }`}
                >
                  {schedule.status === "done" ? labels.done : labels.upcoming}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {schedule.status !== "done" ? (
                  <button
                    type="button"
                    onClick={() => handleMarkDone(schedule)}
                    className="rounded-lg border border-emerald/30 px-2.5 py-1 text-[10px] text-emerald transition-colors hover:bg-emerald/5"
                  >
                    {labels.markDone}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => handleDelete(schedule.id)}
                  className="rounded-lg border border-red-400/30 px-2.5 py-1 text-[10px] text-red-400 transition-colors hover:bg-red-400/5"
                >
                  {labels.delete}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DemoDrawer>
  );
}
