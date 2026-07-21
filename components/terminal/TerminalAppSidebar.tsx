"use client";

import { useRouter } from "next/navigation";
import { translateBusinessDnaValue } from "@/lib/demo/dnaTranslations";
import { DEMO_ROUTES } from "@/lib/demo/routes";
import type { TerminalSession } from "@/lib/demo/types";

export type SidebarFilter =
  | "chats"
  | "reports"
  | "decisions"
  | "risks"
  | "archive";

type TerminalAppSidebarProps = {
  locale: "en" | "ar";
  sessions: TerminalSession[];
  activeId: string | null;
  search: string;
  filter: SidebarFilter;
  privacyMode: string;
  activeProjectName?: string;
  onSearch: (q: string) => void;
  onFilterChange: (f: SidebarFilter) => void;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onOpenDna: () => void;
  onProjects: () => void;
  onSchedule: () => void;
  onRiskReviews: () => void;
  onClose?: () => void;
};

export function TerminalAppSidebar({
  locale,
  sessions,
  activeId,
  search,
  filter,
  privacyMode,
  activeProjectName,
  onSearch,
  onFilterChange,
  onNewChat,
  onSelectSession,
  onOpenDna,
  onProjects,
  onSchedule,
  onRiskReviews,
  onClose,
}: TerminalAppSidebarProps) {
  const router = useRouter();
  const isArabic = locale === "ar";

  const labels = isArabic
    ? {
        brand: "Chameleon Eye AI",
        subtitle: "طرفية الذكاء الخاص",
        newChat: "+ جلسة جديدة",
        search: "البحث في المحادثات...",
        chats: "المحادثات",
        archive: "الأرشيف / المكتبة",
        reports: "التقارير المحفوظة",
        decisions: "القرارات",
        risks: "مراجعات المخاطر",
        projects: "المشاريع",
        schedule: "الجدولة",
        dna: "Business DNA",
        settings: "الإعدادات",
        privacy: "وضع الخصوصية",
        demo: "وضع تجريبي",
        exit: "الخروج من Terminal",
        empty: "لا توجد محادثات",
      }
    : {
        brand: "Chameleon Eye AI",
        subtitle: "Private Intelligence Terminal",
        newChat: "+ New Chat",
        search: "Search chats...",
        chats: "Chats",
        archive: "Archive / Library",
        reports: "Saved Reports",
        decisions: "Decisions",
        risks: "Risk Reviews",
        projects: "Projects",
        schedule: "Schedule",
        dna: "Business DNA",
        settings: "Settings",
        privacy: "Privacy Mode",
        demo: "Demo mode",
        exit: "Exit Terminal",
        empty: "No chats yet",
      };

  const menuItems: { id: SidebarFilter | "projects" | "schedule" | "dna" | "settings"; label: string; action: () => void }[] = [
    { id: "chats", label: labels.chats, action: () => onFilterChange("chats") },
    { id: "archive", label: labels.archive, action: () => router.push(DEMO_ROUTES.archive(locale)) },
    { id: "reports", label: labels.reports, action: () => onFilterChange("reports") },
    { id: "decisions", label: labels.decisions, action: () => onFilterChange("decisions") },
    { id: "risks", label: labels.risks, action: onRiskReviews },
    { id: "projects", label: labels.projects, action: onProjects },
    { id: "schedule", label: labels.schedule, action: onSchedule },
    { id: "dna", label: labels.dna, action: onOpenDna },
    { id: "settings", label: labels.settings, action: () => router.push(DEMO_ROUTES.settings(locale)) },
  ];

  const filtered = sessions
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => {
      if (filter === "reports") return !!s.savedReport;
      if (filter === "decisions") return !!s.isDecision;
      if (filter === "risks") return !!s.isRiskReview;
      return true;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const privacyLabel = translateBusinessDnaValue(privacyMode, locale);

  return (
    <aside
      dir={isArabic ? "rtl" : "ltr"}
      className="flex h-full w-[280px] shrink-0 flex-col border-white/8 bg-panel/95 backdrop-blur-xl lg:border-e"
    >
      <div className="border-b border-white/8 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-emerald">{labels.brand}</p>
            <p className="mt-0.5 text-[10px] text-muted">{labels.subtitle}</p>
          </div>
          {onClose ? (
            <button type="button" onClick={onClose} className="text-muted hover:text-foreground lg:hidden">
              ✕
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onNewChat}
          className="mt-4 w-full rounded-xl border border-emerald/30 bg-emerald/10 px-3 py-2.5 text-sm font-medium text-emerald transition-colors hover:bg-emerald/15"
        >
          {labels.newChat}
        </button>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={labels.search}
          className="mt-3 w-full rounded-lg border border-white/10 bg-background/80 px-3 py-2 text-xs text-foreground outline-none focus:border-emerald/40"
        />
      </div>

      <nav className="space-y-0.5 px-2 py-3">
        {menuItems.map((item) => {
          const active =
            (item.id === filter && ["chats", "reports", "decisions"].includes(item.id)) || false;
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={item.action}
                className={`w-full rounded-lg px-3 py-2 text-start text-xs transition-colors ${
                  active
                    ? "bg-emerald/10 text-emerald"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
              {item.id === "projects" && activeProjectName ? (
                <p className="truncate px-3 text-[10px] text-emerald/70">{activeProjectName}</p>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {filtered.length === 0 ? (
          <p className="px-2 py-2 text-[10px] text-muted">{labels.empty}</p>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelectSession(s.id)}
                  className={`w-full truncate rounded-lg px-3 py-2 text-start text-xs transition-colors ${
                    activeId === s.id
                      ? "bg-white/8 text-foreground"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2 border-t border-white/8 p-4 text-[10px] text-muted">
        <p>
          {labels.privacy}: <span className="text-foreground">{privacyLabel}</span>
        </p>
        <span className="inline-block rounded-full border border-gold/20 bg-gold/5 px-2 py-0.5 text-gold">
          {labels.demo}
        </span>
        <button
          type="button"
          onClick={() => router.push(isArabic ? "/ar" : "/")}
          className="block w-full rounded-lg border border-white/10 px-3 py-2 text-xs text-muted transition-colors hover:border-gold/30 hover:text-gold"
        >
          {labels.exit}
        </button>
      </div>
    </aside>
  );
}
