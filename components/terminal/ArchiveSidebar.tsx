"use client";

import type { TerminalSession } from "@/lib/demo/types";

type ArchiveSidebarProps = {
  locale: "en" | "ar";
  sessions: TerminalSession[];
  activeId: string | null;
  search: string;
  calendarDay: string;
  onSearch: (q: string) => void;
  onNewSession: () => void;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onClose?: () => void;
};

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.floor(ms / 86400000);
}

export function ArchiveSidebar({
  locale,
  sessions,
  activeId,
  search,
  calendarDay,
  onSearch,
  onNewSession,
  onSelect,
  onRename,
  onDelete,
  onClose,
}: ArchiveSidebarProps) {
  const isArabic = locale === "ar";
  const labels = isArabic
    ? {
        title: "الأرشيف",
        new: "جلسة جديدة",
        search: "البحث في الأرشيف",
        today: "اليوم",
        week: "هذا الأسبوع",
        reports: "التقارير المحفوظة",
        decisions: "القرارات",
        risks: "مراجعات المخاطر",
        rename: "إعادة تسمية",
        delete: "حذف",
        empty: "لا توجد جلسات بعد",
      }
    : {
        title: "Archive",
        new: "New Session",
        search: "Search archive",
        today: "Today",
        week: "This Week",
        reports: "Saved Reports",
        decisions: "Decisions",
        risks: "Risk Reviews",
        rename: "Rename",
        delete: "Delete",
        empty: "No sessions yet",
      };

  const filtered = sessions
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const today = filtered.filter((s) => dayKey(s.updatedAt) === calendarDay);
  const week = filtered.filter((s) => {
    const diff = daysBetween(dayKey(s.updatedAt), calendarDay);
    return diff > 0 && diff < 7;
  });
  const reports = filtered.filter((s) => s.savedReport);
  const decisions = filtered.filter((s) => s.isDecision);
  const risks = filtered.filter((s) => s.isRiskReview);

  return (
    <aside
      dir={isArabic ? "rtl" : "ltr"}
      className="flex h-full flex-col border-white/8 bg-panel lg:border-e"
    >
      <div className="flex items-center justify-between border-b border-white/8 p-4">
        <h2 className="text-sm font-semibold text-foreground">{labels.title}</h2>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted hover:text-foreground lg:hidden"
            aria-label="Close"
          >
            ✕
          </button>
        ) : null}
      </div>

      <div className="space-y-3 p-4">
        <button
          type="button"
          onClick={onNewSession}
          className="w-full rounded-xl border border-emerald/30 bg-emerald/10 px-3 py-2.5 text-sm font-medium text-emerald transition-colors hover:bg-emerald/15"
        >
          + {labels.new}
        </button>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={labels.search}
          className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald/40"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {filtered.length === 0 ? (
          <p className="px-2 text-xs text-muted">{labels.empty}</p>
        ) : (
          <>
            <SessionGroup
              title={labels.today}
              sessions={today}
              activeId={activeId}
              labels={labels}
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
            />
            <SessionGroup
              title={labels.week}
              sessions={week}
              activeId={activeId}
              labels={labels}
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
            />
            {reports.length > 0 ? (
              <SessionGroup
                title={labels.reports}
                sessions={reports}
                activeId={activeId}
                labels={labels}
                onSelect={onSelect}
                onRename={onRename}
                onDelete={onDelete}
              />
            ) : null}
            {decisions.length > 0 ? (
              <SessionGroup
                title={labels.decisions}
                sessions={decisions}
                activeId={activeId}
                labels={labels}
                onSelect={onSelect}
                onRename={onRename}
                onDelete={onDelete}
              />
            ) : null}
            {risks.length > 0 ? (
              <SessionGroup
                title={labels.risks}
                sessions={risks}
                activeId={activeId}
                labels={labels}
                onSelect={onSelect}
                onRename={onRename}
                onDelete={onDelete}
              />
            ) : null}
          </>
        )}
      </div>
    </aside>
  );
}

function SessionGroup({
  title,
  sessions,
  activeId,
  labels,
  onSelect,
  onRename,
  onDelete,
}: {
  title: string;
  sessions: TerminalSession[];
  activeId: string | null;
  labels: { rename: string; delete: string };
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}) {
  if (sessions.length === 0) return null;
  return (
    <div className="mb-4">
      <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-muted">
        {title}
      </p>
      <ul className="space-y-0.5">
        {sessions.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onSelect(s.id)}
              className={`group flex w-full items-center justify-between rounded-lg px-2 py-2 text-start text-sm transition-colors ${
                activeId === s.id
                  ? "bg-emerald/10 text-foreground"
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <span className="truncate">{s.title}</span>
              <span className="hidden gap-1 group-hover:flex">
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    const t = prompt(labels.rename, s.title);
                    if (t) onRename(s.id, t);
                  }}
                  className="text-[10px] text-gold"
                >
                  ✎
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(labels.delete)) onDelete(s.id);
                  }}
                  className="text-[10px] text-red-400"
                >
                  ✕
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
