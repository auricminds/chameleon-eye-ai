"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useBusinessDna, useDemoUser } from "@/lib/demo/hooks";
import { translateIntelligenceTag } from "@/lib/demo/dnaTranslations";
import { DEMO_ROUTES } from "@/lib/demo/routes";
import { deleteSession, getTerminalSessions, setActiveSessionId } from "@/lib/demo/storage";
import type { TerminalSession } from "@/lib/demo/types";
import { formatStructuredAsText } from "@/lib/demo/chameleonResponse";
import { INTELLIGENCE_MODES } from "@/lib/demo/chameleonResponse";
import { TerminalTopBar } from "./TerminalTopBar";

type Filter = "all" | "reports" | "decisions" | "risks";

export function ArchivePage({ locale }: { locale: "en" | "ar" }) {
  const router = useRouter();
  const isArabic = locale === "ar";
  const demoUser = useDemoUser();
  const dna = useBusinessDna();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!demoUser) router.replace(DEMO_ROUTES.signup(locale));
    }, 0);
    return () => clearTimeout(timer);
  }, [demoUser, locale, router]);

  const [sessions, setSessions] = useState<TerminalSession[]>(() => getTerminalSessions());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const labels = isArabic
    ? {
        title: "الأرشيف / المكتبة",
        subtitle: "محادثاتك وتقاريرك وقراراتك المحفوظة",
        search: "البحث...",
        all: "كل المحادثات",
        reports: "التقارير المحفوظة",
        decisions: "القرارات",
        risks: "مراجعات المخاطر",
        open: "فتح",
        delete: "حذف",
        export: "تصدير",
        empty: "لا توجد جلسات",
        mode: "الوضع",
        language: "اللغة",
        tags: "الوسوم",
        loading: "جاري التحميل...",
      }
    : {
        title: "Archive / Library",
        subtitle: "Your saved chats, reports, and decisions",
        search: "Search...",
        all: "All chats",
        reports: "Saved Reports",
        decisions: "Decisions",
        risks: "Risk Reviews",
        open: "Open",
        delete: "Delete",
        export: "Export",
        empty: "No sessions",
        mode: "Mode",
        language: "Language",
        tags: "Tags",
        loading: "Loading...",
      };

  const filtered = useMemo(() => {
    let list = sessions.filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase()),
    );
    if (filter === "reports") list = list.filter((s) => s.savedReport);
    if (filter === "decisions") list = list.filter((s) => s.isDecision);
    if (filter === "risks") list = list.filter((s) => s.isRiskReview);
    return list.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [sessions, search, filter]);

  if (!demoUser) {
    return (
      <div className="terminal-app flex h-screen items-center justify-center text-muted">
        {labels.loading}
      </div>
    );
  }

  function handleDelete(id: string) {
    if (!confirm(isArabic ? "حذف هذه الجلسة؟" : "Delete this session?")) return;
    deleteSession(id);
    setSessions(getTerminalSessions());
  }

  function exportSession(session: TerminalSession) {
    const lines = session.messages.map((m) => {
      if (m.structured) return formatStructuredAsText(m.structured, locale);
      return `${m.role === "user" ? (isArabic ? "أنت" : "You") : "Chameleon"}:\n${m.content}`;
    });
    const blob = new Blob([lines.join("\n\n---\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${session.title.replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function modeLabel(modeId: string) {
    const m = INTELLIGENCE_MODES.find((x) => x.id === modeId);
    if (!m) return modeId;
    return isArabic ? m.labelAr : m.labelEn;
  }

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: labels.all },
    { id: "reports", label: labels.reports },
    { id: "decisions", label: labels.decisions },
    { id: "risks", label: labels.risks },
  ];

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`terminal-app flex h-screen flex-col overflow-hidden bg-background ${isArabic ? "arabic-page" : ""}`}
    >
      <TerminalTopBar
        locale={locale}
        mode="archive"
        privacyMode={dna?.privacyMode ?? ""}
      />

      <div className="flex min-h-0 flex-1">
        {/* Filter sidebar */}
        <aside className="hidden w-[240px] shrink-0 flex-col border-white/8 bg-panel/80 p-4 sm:flex sm:border-e">
          <h1 className="text-lg font-semibold text-foreground">{labels.title}</h1>
          <p className="mt-1 text-xs text-muted">{labels.subtitle}</p>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={labels.search}
            className="mt-4 w-full rounded-lg border border-white/10 bg-background/80 px-3 py-2 text-xs"
          />
          <nav className="mt-4 space-y-0.5">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`w-full rounded-lg px-3 py-2 text-start text-xs transition-colors ${
                  filter === f.id
                    ? "bg-emerald/10 text-emerald"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main list */}
        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mb-4 sm:hidden">
            <h1 className="text-xl font-semibold">{labels.title}</h1>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={labels.search}
              className="mt-3 w-full rounded-lg border border-white/10 bg-panel2/80 px-3 py-2 text-sm"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    filter === f.id
                      ? "border-emerald/40 bg-emerald/10 text-emerald"
                      : "border-white/10 text-muted"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="mx-auto max-w-3xl space-y-3">
            {filtered.length === 0 ? (
              <li className="text-sm text-muted">{labels.empty}</li>
            ) : (
              filtered.map((s) => (
                <li
                  key={s.id}
                  className="rounded-2xl border border-white/10 bg-panel2/70 p-4 backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">{s.title}</p>
                      <p className="mt-1 text-xs text-muted">
                        {new Date(s.updatedAt).toLocaleDateString(isArabic ? "ar" : "en")}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-muted">
                        <span>
                          {labels.mode}: {modeLabel(s.mode)}
                        </span>
                        <span>
                          {labels.language}: {s.language === "ar" ? "العربية" : "English"}
                        </span>
                      </div>
                      {s.tags.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {s.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-emerald/20 bg-emerald/5 px-2 py-0.5 text-[10px] text-emerald"
                            >
                              {translateIntelligenceTag(tag, locale)}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Link
                        href={DEMO_ROUTES.terminal(locale)}
                        onClick={() => setActiveSessionId(s.id)}
                        className="rounded-lg border border-emerald/30 px-3 py-1.5 text-xs text-emerald"
                      >
                        {labels.open}
                      </Link>
                      <button
                        type="button"
                        onClick={() => exportSession(s)}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted"
                      >
                        {labels.export}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        className="rounded-lg border border-red-400/30 px-3 py-1.5 text-xs text-red-400"
                      >
                        {labels.delete}
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}
