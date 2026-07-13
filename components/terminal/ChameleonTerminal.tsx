"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  formatStructuredAsText,
  generateChameleonDemoResponse,
  getWelcomeMessage,
} from "@/lib/demo/chameleonResponse";
import {
  useActiveProjectId,
  useBusinessDna,
  useDemoUser,
  useProjects,
  useVoiceEnabledStore,
} from "@/lib/demo/hooks";
import { DEMO_ROUTES } from "@/lib/demo/routes";
import { buildScheduleFollowUp } from "@/lib/demo/riskReview";
import { riskReviewOptionLabel } from "@/lib/demo/riskReviewQuestions";
import {
  createSession,
  getActiveSessionId,
  getTerminalSessions,
  setActiveSessionId,
  setVoiceEnabled,
  uid,
  upsertRiskReview,
  upsertSession,
} from "@/lib/demo/storage";
import type {
  IntelligenceMode,
  RiskReview,
  ScheduleCheckType,
  ScheduleFrequency,
  TerminalMessage,
  TerminalSession,
} from "@/lib/demo/types";
import { BusinessDnaPanel } from "./BusinessDnaPanel";
import { MessageBubble } from "./MessageBubble";
import { ProjectsDrawer } from "./ProjectsDrawer";
import { RiskReviewDrawer } from "./RiskReviewDrawer";
import { RiskReviewsDrawer } from "./RiskReviewsDrawer";
import { ScheduleDrawer } from "./ScheduleDrawer";
import { TerminalAppSidebar, type SidebarFilter } from "./TerminalAppSidebar";
import { TerminalComposer } from "./TerminalComposer";
import { TerminalTopBar } from "./TerminalTopBar";
import { ConnectionBanner } from "./ConnectionBanner";
import type { VoiceControlsHandle } from "./VoiceControls";

// The DNA panel/drawer must flip visibility at the same breakpoint the desktop
// panel container uses (xl, 1280px) — the shared Drawer component below hides
// itself at lg (1024px) via CSS. Any value between those two breakpoints would
// leave the button appearing to do nothing (state flips, nothing is visible).
const DNA_DESKTOP_BREAKPOINT = 1280;

type ChameleonTerminalProps = {
  locale: "en" | "ar";
};

function ensureActiveSession(locale: "en" | "ar"): TerminalSession {
  const existing = getTerminalSessions();
  const activeId = getActiveSessionId();
  let session = activeId ? existing.find((s) => s.id === activeId) : null;
  if (!session) {
    session = createSession(locale, "quick_scan");
    const welcome: TerminalMessage = {
      id: uid(),
      role: "assistant",
      content: getWelcomeMessage(locale),
      createdAt: new Date().toISOString(),
    };
    session.messages = [welcome];
    upsertSession(session);
  }
  return session;
}

export function ChameleonTerminal({ locale }: ChameleonTerminalProps) {
  const router = useRouter();
  const isArabic = locale === "ar";
  const demoUser = useDemoUser();
  const dna = useBusinessDna();
  const voiceEnabled = useVoiceEnabledStore();
  const projects = useProjects();
  const activeProjectId = useActiveProjectId();
  const activeProjectName = projects.find((p) => p.id === activeProjectId)?.name;
  const voiceRef = useRef<VoiceControlsHandle>(null);

  const [sessions, setSessions] = useState<TerminalSession[]>(() => getTerminalSessions());
  const [activeSession, setActiveSession] = useState<TerminalSession>(() =>
    ensureActiveSession(locale),
  );
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<IntelligenceMode>(() => activeSession.mode);
  const [search, setSearch] = useState("");
  const [sidebarFilter, setSidebarFilter] = useState<SidebarFilter>("chats");
  const [analyzing, setAnalyzing] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleFollowUpPrefill, setScheduleFollowUpPrefill] = useState<
    { title: string; checkType: ScheduleCheckType; frequency: ScheduleFrequency } | undefined
  >(undefined);
  const [riskReviewOpen, setRiskReviewOpen] = useState(false);
  const [riskReviewsListOpen, setRiskReviewsListOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dnaOpen, setDnaOpen] = useState(true);
  const [dnaDrawerOpen, setDnaDrawerOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lastReplyText = useMemo(() => {
    const last = [...activeSession.messages].reverse().find((m) => m.role === "assistant");
    return last?.content;
  }, [activeSession.messages]);

  const labels = isArabic
    ? {
        attachTitle: "تحليل الملفات",
        attachBody:
          "تحليل الملفات غير متصل في وضع التجربة. في النسخة الإنتاجية سيتم دعم الملفات المصرح بها وسير العمل المحلي والخاص.",
        close: "إغلاق",
        loading: "جاري التحميل...",
        menu: "القائمة",
      }
    : {
        attachTitle: "File analysis",
        attachBody:
          "File analysis is not connected in demo mode. Production will support approved uploads and local/private workflows.",
        close: "Close",
        loading: "Loading...",
        menu: "Menu",
      };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!demoUser) router.replace(DEMO_ROUTES.signup(locale));
      else if (!dna) router.replace(DEMO_ROUTES.businessDna(locale));
    }, 0);
    return () => clearTimeout(timer);
  }, [demoUser, dna, locale, router]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeSession.messages, analyzing]);

  function persistSession(updated: TerminalSession) {
    upsertSession(updated);
    setActiveSession(updated);
    setSessions(getTerminalSessions());
  }

  function handleSend(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text || !activeSession || !dna || analyzing) return;

    voiceRef.current?.stopListening();

    const userMsg: TerminalMessage = {
      id: uid(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    let updated: TerminalSession = {
      ...activeSession,
      updatedAt: new Date().toISOString(),
      mode,
      messages: [...activeSession.messages, userMsg],
    };

    const defaultTitle = isArabic ? "جلسة جديدة" : "New Chat";
    if (updated.title === defaultTitle || updated.title === "New Session") {
      updated.title = text.slice(0, 48) + (text.length > 48 ? "…" : "");
    }

    persistSession(updated);
    setInput("");
    setAnalyzing(true);

    const historyMessages = updated.messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: historyMessages,
        dna,
        mode,
        locale,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("api_error");
        return res.json() as Promise<{ content: string }>;
      })
      .then(({ content: replyText }) => {
        const assistantMsg: TerminalMessage = {
          id: uid(),
          role: "assistant",
          content: replyText,
          createdAt: new Date().toISOString(),
        };
        updated = {
          ...updated,
          messages: [...updated.messages, assistantMsg],
          updatedAt: new Date().toISOString(),
        };
        persistSession(updated);
        if (voiceEnabled) voiceRef.current?.speak(replyText);
        setAnalyzing(false);
      })
      .catch(() => {
        // Fallback to demo response if API is unavailable
        const structured = generateChameleonDemoResponse(text, dna, mode, locale);
        const replyText = formatStructuredAsText(structured, locale);
        const assistantMsg: TerminalMessage = {
          id: uid(),
          role: "assistant",
          content: replyText,
          structured,
          createdAt: new Date().toISOString(),
        };
        updated = {
          ...updated,
          messages: [...updated.messages, assistantMsg],
          updatedAt: new Date().toISOString(),
        };
        persistSession(updated);
        if (voiceEnabled) voiceRef.current?.speak(replyText);
        setAnalyzing(false);
      });
  }

  function handleNewSession() {
    const session = createSession(locale, mode);
    const welcome: TerminalMessage = {
      id: uid(),
      role: "assistant",
      content: getWelcomeMessage(locale),
      createdAt: new Date().toISOString(),
    };
    session.messages = [welcome];
    upsertSession(session);
    setActiveSession(session);
    setSessions(getTerminalSessions());
    setSidebarOpen(false);
    setSidebarFilter("chats");
  }

  function handleSelectSession(id: string) {
    const s = getTerminalSessions().find((x) => x.id === id);
    if (s) {
      setActiveSessionId(id);
      setActiveSession(s);
      setMode(s.mode);
      setSidebarOpen(false);
    }
  }

  function handleGenerateReport() {
    const lastAssistant = [...activeSession.messages].reverse().find((m) => m.role === "assistant");
    if (!lastAssistant?.structured) return;
    persistSession({
      ...activeSession,
      savedReport: {
        id: uid(),
        sessionId: activeSession.id,
        title: lastAssistant.structured.suggestedReport,
        summary: lastAssistant.structured.directAnswer,
        reportType: lastAssistant.structured.suggestedReport,
        createdAt: new Date().toISOString(),
        language: locale,
      },
    });
  }

  function handleSaveDecision() {
    persistSession({ ...activeSession, isDecision: true });
  }

  function handleOpenRiskReview() {
    setRiskReviewOpen(true);
  }

  function handleRiskReviewComplete(review: RiskReview) {
    const focusLabel = riskReviewOptionLabel("focusArea", review.focusArea, locale);
    const defaultTitle = isArabic ? "جلسة جديدة" : "New Chat";
    const riskReviewMsg: TerminalMessage = {
      id: uid(),
      role: "assistant",
      content: review.summary,
      riskReview: review,
      createdAt: new Date().toISOString(),
    };
    const updated: TerminalSession = {
      ...activeSession,
      title:
        activeSession.title === defaultTitle || activeSession.title === "New Session"
          ? (isArabic ? `مراجعة مخاطر — ${focusLabel}` : `Risk Review — ${focusLabel}`)
          : activeSession.title,
      isRiskReview: true,
      updatedAt: new Date().toISOString(),
      messages: [...activeSession.messages, riskReviewMsg],
    };
    persistSession(updated);
    upsertRiskReview(review);
  }

  function handleCreateScheduleFollowUp(review: RiskReview) {
    setScheduleFollowUpPrefill(buildScheduleFollowUp(review, locale));
    setRiskReviewOpen(false);
    setRiskReviewsListOpen(false);
    setScheduleOpen(true);
  }

  function handleOpenRiskReviewSession(sessionId: string) {
    handleSelectSession(sessionId);
    setRiskReviewsListOpen(false);
  }

  function handleSaveToArchive() {
    persistSession({ ...activeSession, updatedAt: new Date().toISOString() });
  }

  function openDnaPanel() {
    if (typeof window !== "undefined" && window.innerWidth < DNA_DESKTOP_BREAKPOINT) {
      setDnaDrawerOpen(true);
    } else {
      setDnaOpen(true);
    }
  }

  if (!demoUser || !dna) {
    return (
      <div className="terminal-app flex h-screen items-center justify-center text-muted">
        {labels.loading}
      </div>
    );
  }

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="terminal-app flex h-screen flex-col overflow-hidden bg-background"
    >
      <TerminalTopBar
        locale={locale}
        mode="terminal"
        voiceEnabled={voiceEnabled}
        isListening={isListening}
        privacyMode={dna.privacyMode}
        onNewSession={handleNewSession}
        onOpenArchive={() => router.push(DEMO_ROUTES.archive(locale))}
        onOpenDna={openDnaPanel}
      />

      <ConnectionBanner locale={locale} />

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <TerminalAppSidebar
            locale={locale}
            sessions={sessions}
            activeId={activeSession.id}
            search={search}
            filter={sidebarFilter}
            privacyMode={dna.privacyMode}
            activeProjectName={activeProjectName}
            onSearch={setSearch}
            onFilterChange={setSidebarFilter}
            onNewChat={handleNewSession}
            onSelectSession={handleSelectSession}
            onOpenDna={openDnaPanel}
            onProjects={() => setProjectsOpen(true)}
            onSchedule={() => setScheduleOpen(true)}
            onRiskReviews={() => setRiskReviewsListOpen(true)}
          />
        </div>

        {/* Center chat column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile menu button */}
          <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted"
            >
              ☰ {labels.menu}
            </button>
            <button
              type="button"
              onClick={openDnaPanel}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted"
            >
              Business DNA
            </button>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto py-4 sm:py-6">
            <div className="mx-auto flex w-full max-w-[780px] flex-col gap-5 px-3 sm:px-4">
              {activeSession.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} locale={locale} />
              ))}
              {analyzing ? (
                <MessageBubble message={{} as TerminalMessage} locale={locale} isAnalyzing />
              ) : null}
            </div>
          </div>

          <TerminalComposer
            locale={locale}
            mode={mode}
            onModeChange={setMode}
            input={input}
            onInputChange={setInput}
            onSend={() => handleSend()}
            onGenerateReport={handleGenerateReport}
            onSaveDecision={handleSaveDecision}
            onCreateRiskReview={handleOpenRiskReview}
            onSaveToArchive={handleSaveToArchive}
            onAttach={() => setShowAttachModal(true)}
            voiceEnabled={voiceEnabled}
            onVoiceToggle={setVoiceEnabled}
            onListeningChange={setIsListening}
            voiceRef={voiceRef}
            lastReplyText={lastReplyText}
            sending={analyzing}
            voiceExpanded={isListening}
            isListening={isListening}
          />
        </div>

        {/* Desktop DNA panel */}
        {dnaOpen ? (
          <div className="hidden w-[320px] shrink-0 border-white/8 xl:block xl:border-s">
            <BusinessDnaPanel
              locale={locale}
              dna={dna}
              onClose={() => setDnaOpen(false)}
              onReset={() => router.push(DEMO_ROUTES.signup(locale))}
            />
          </div>
        ) : (
          <div className="hidden xl:flex xl:flex-col xl:items-center xl:border-s xl:border-white/8 xl:py-4">
            <button
              type="button"
              onClick={() => setDnaOpen(true)}
              className="rounded-lg border border-white/10 px-2 py-6 text-[10px] text-muted [writing-mode:vertical-rl]"
            >
              Business DNA
            </button>
          </div>
        )}
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen ? (
        <Drawer side={isArabic ? "end" : "start"} onClose={() => setSidebarOpen(false)}>
          <TerminalAppSidebar
            locale={locale}
            sessions={sessions}
            activeId={activeSession.id}
            search={search}
            filter={sidebarFilter}
            privacyMode={dna.privacyMode}
            activeProjectName={activeProjectName}
            onSearch={setSearch}
            onFilterChange={setSidebarFilter}
            onNewChat={handleNewSession}
            onSelectSession={handleSelectSession}
            onOpenDna={() => {
              setSidebarOpen(false);
              openDnaPanel();
            }}
            onProjects={() => {
              setSidebarOpen(false);
              setProjectsOpen(true);
            }}
            onSchedule={() => {
              setSidebarOpen(false);
              setScheduleOpen(true);
            }}
            onRiskReviews={() => {
              setSidebarOpen(false);
              setRiskReviewsListOpen(true);
            }}
            onClose={() => setSidebarOpen(false)}
          />
        </Drawer>
      ) : null}

      {/* Mobile DNA drawer */}
      {dnaDrawerOpen ? (
        <Drawer side={isArabic ? "start" : "end"} hideAt="xl" onClose={() => setDnaDrawerOpen(false)}>
          <BusinessDnaPanel
            locale={locale}
            dna={dna}
            onClose={() => setDnaDrawerOpen(false)}
            onReset={() => router.push(DEMO_ROUTES.signup(locale))}
          />
        </Drawer>
      ) : null}

      {showAttachModal ? (
        <Modal onClose={() => setShowAttachModal(false)} title={labels.attachTitle}>
          <p className="text-sm leading-6 text-muted">{labels.attachBody}</p>
          <button
            type="button"
            onClick={() => setShowAttachModal(false)}
            className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-foreground"
          >
            {labels.close}
          </button>
        </Modal>
      ) : null}

      {projectsOpen ? (
        <ProjectsDrawer
          locale={locale}
          activeSessionId={activeSession.id}
          onClose={() => setProjectsOpen(false)}
        />
      ) : null}

      {scheduleOpen ? (
        <ScheduleDrawer
          locale={locale}
          prefill={scheduleFollowUpPrefill}
          onClose={() => {
            setScheduleOpen(false);
            setScheduleFollowUpPrefill(undefined);
          }}
        />
      ) : null}

      {riskReviewOpen ? (
        <RiskReviewDrawer
          locale={locale}
          sessionId={activeSession.id}
          onClose={() => setRiskReviewOpen(false)}
          onComplete={handleRiskReviewComplete}
          onCreateScheduleFollowUp={handleCreateScheduleFollowUp}
        />
      ) : null}

      {riskReviewsListOpen ? (
        <RiskReviewsDrawer
          locale={locale}
          onClose={() => setRiskReviewsListOpen(false)}
          onOpenSession={handleOpenRiskReviewSession}
          onCreateScheduleFollowUp={handleCreateScheduleFollowUp}
        />
      ) : null}
    </div>
  );
}

function Drawer({
  children,
  side,
  onClose,
  hideAt = "lg",
}: {
  children: React.ReactNode;
  side: "start" | "end";
  onClose: () => void;
  /** Breakpoint at which this drawer disappears in favor of its desktop counterpart. Must match that counterpart's own breakpoint, or the drawer can end up open-but-invisible. */
  hideAt?: "lg" | "xl";
}) {
  const position = side === "start" ? "start-0" : "end-0";
  const hideClass = hideAt === "xl" ? "xl:hidden" : "lg:hidden";
  return (
    <div className={`fixed inset-0 z-50 ${hideClass}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute inset-y-0 ${position} w-[min(100%,280px)] border-white/10 bg-panel/95 shadow-2xl backdrop-blur-xl ${side === "start" ? "border-e" : "border-s"}`}
      >
        {children}
      </div>
    </div>
  );
}

function Modal({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-w-md rounded-2xl border border-white/10 bg-panel2 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
