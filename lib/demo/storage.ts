"use client";

import type {
  BusinessDnaRecord,
  DemoProject,
  DemoSchedule,
  DemoUser,
  RiskReview,
  TerminalSession,
} from "./types";
import { STORAGE_KEYS } from "./types";

const jsonSnapshotCache = new Map<string, { raw: string | null; value: unknown }>();

// Shared stable reference so array-returning getters used as useSyncExternalStore
// snapshots don't return a fresh `[]` literal (and thus a new reference) on every
// call when the underlying storage entry is empty/unset.
const EMPTY_ARRAY: readonly never[] = Object.freeze([]);

// Returns a referentially stable value when the underlying localStorage entry
// hasn't changed. useSyncExternalStore compares snapshots with Object.is, so a
// getSnapshot that re-parses JSON on every call returns a new object each time
// and causes an infinite render loop ("Maximum update depth exceeded").
function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  let raw: string | null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    raw = null;
  }

  const cached = jsonSnapshotCache.get(key);
  if (cached && cached.raw === raw) {
    return cached.value as T | null;
  }

  let value: T | null = null;
  if (raw) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = null;
    }
  }

  jsonSnapshotCache.set(key, { raw, value });
  return value;
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getDemoUser(): DemoUser | null {
  return readJson<DemoUser>(STORAGE_KEYS.DEMO_USER);
}

export function saveDemoUser(user: DemoUser) {
  writeJson(STORAGE_KEYS.DEMO_USER, user);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("chameleon-demo-update"));
  }
}

export function clearDemoUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.DEMO_USER);
  window.dispatchEvent(new Event("chameleon-demo-update"));
}

export function getBusinessDna(): BusinessDnaRecord | null {
  return readJson<BusinessDnaRecord>(STORAGE_KEYS.BUSINESS_DNA);
}

export function saveBusinessDna(dna: BusinessDnaRecord) {
  writeJson(STORAGE_KEYS.BUSINESS_DNA, dna);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("chameleon-demo-update"));
  }
}

export function clearBusinessDna() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.BUSINESS_DNA);
}

export function getTerminalSessions(): TerminalSession[] {
  return readJson<TerminalSession[]>(STORAGE_KEYS.TERMINAL_SESSIONS) ?? (EMPTY_ARRAY as unknown as TerminalSession[]);
}

export function saveTerminalSessions(sessions: TerminalSession[]) {
  writeJson(STORAGE_KEYS.TERMINAL_SESSIONS, sessions);
}

export function getActiveSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
}

export function setActiveSessionId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, id);
  else localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
}

export function getVoiceEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEYS.VOICE_ENABLED) === "true";
}

export function setVoiceEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.VOICE_ENABLED, enabled ? "true" : "false");
  window.dispatchEvent(new Event("chameleon-demo-update"));
}

export function getTerminalLanguage(): "en" | "ar" | null {
  if (typeof window === "undefined") return null;
  const lang = localStorage.getItem(STORAGE_KEYS.TERMINAL_LANGUAGE);
  return lang === "ar" || lang === "en" ? lang : null;
}

export function setTerminalLanguage(language: "en" | "ar") {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.TERMINAL_LANGUAGE, language);
  window.dispatchEvent(new Event("chameleon-demo-update"));
}

export function clearAllDemoData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.DEMO_USER);
  localStorage.removeItem(STORAGE_KEYS.BUSINESS_DNA);
  localStorage.removeItem(STORAGE_KEYS.TERMINAL_SESSIONS);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  localStorage.removeItem(STORAGE_KEYS.VOICE_ENABLED);
  localStorage.removeItem(STORAGE_KEYS.TERMINAL_LANGUAGE);
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROJECT);
  localStorage.removeItem(STORAGE_KEYS.SCHEDULES);
  localStorage.removeItem(STORAGE_KEYS.RISK_REVIEWS);
  window.dispatchEvent(new Event("chameleon-demo-update"));
}

export function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function upsertSession(session: TerminalSession) {
  const sessions = [...getTerminalSessions()];
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) sessions[idx] = session;
  else sessions.unshift(session);
  saveTerminalSessions(sessions);
}

export function deleteSession(id: string) {
  const sessions = getTerminalSessions().filter((s) => s.id !== id);
  saveTerminalSessions(sessions);
  if (getActiveSessionId() === id) setActiveSessionId(null);
}

export function getSessionById(id: string): TerminalSession | null {
  return getTerminalSessions().find((s) => s.id === id) ?? null;
}

export function createSession(
  language: "en" | "ar",
  mode: TerminalSession["mode"] = "quick_scan",
): TerminalSession {
  const now = new Date().toISOString();
  const session: TerminalSession = {
    id: uid(),
    title: language === "ar" ? "جلسة جديدة" : "New Chat",
    language,
    createdAt: now,
    updatedAt: now,
    messages: [],
    tags: [],
    mode,
  };
  upsertSession(session);
  setActiveSessionId(session.id);
  return session;
}

export function getProjects(): DemoProject[] {
  return readJson<DemoProject[]>(STORAGE_KEYS.PROJECTS) ?? (EMPTY_ARRAY as unknown as DemoProject[]);
}

export function saveProjects(projects: DemoProject[]) {
  writeJson(STORAGE_KEYS.PROJECTS, projects);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("chameleon-demo-update"));
  }
}

export function upsertProject(project: DemoProject) {
  const projects = [...getProjects()];
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) projects[idx] = project;
  else projects.unshift(project);
  saveProjects(projects);
}

export function deleteProject(id: string) {
  saveProjects(getProjects().filter((p) => p.id !== id));
  if (getActiveProjectId() === id) setActiveProjectId(null);
}

export function getActiveProjectId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT);
}

export function setActiveProjectId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT, id);
  else localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROJECT);
  window.dispatchEvent(new Event("chameleon-demo-update"));
}

/** Seeds a starter project on first-ever visit only (never re-seeds after the user empties their list). */
export function ensureDefaultProject(locale: "en" | "ar") {
  if (typeof window === "undefined") return;
  let alreadyInitialized: boolean;
  try {
    alreadyInitialized = localStorage.getItem(STORAGE_KEYS.PROJECTS) !== null;
  } catch {
    alreadyInitialized = true;
  }
  if (alreadyInitialized) return;

  const now = new Date().toISOString();
  const project: DemoProject = {
    id: uid(),
    name: locale === "ar" ? "مراجعة الأعمال الرئيسية" : "Main Business Review",
    description: "",
    type: "company_review",
    createdAt: now,
    updatedAt: now,
    sessionIds: [],
    language: locale,
  };
  saveProjects([project]);
  setActiveProjectId(project.id);
}

export function attachSessionToProject(projectId: string, sessionId: string) {
  const project = getProjects().find((p) => p.id === projectId);
  if (!project) return;
  if (!project.sessionIds.includes(sessionId)) {
    upsertProject({
      ...project,
      sessionIds: [...project.sessionIds, sessionId],
      updatedAt: new Date().toISOString(),
    });
  }
}

export function getSchedules(): DemoSchedule[] {
  return readJson<DemoSchedule[]>(STORAGE_KEYS.SCHEDULES) ?? (EMPTY_ARRAY as unknown as DemoSchedule[]);
}

export function saveSchedules(schedules: DemoSchedule[]) {
  writeJson(STORAGE_KEYS.SCHEDULES, schedules);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("chameleon-demo-update"));
  }
}

export function upsertSchedule(schedule: DemoSchedule) {
  const schedules = [...getSchedules()];
  const idx = schedules.findIndex((s) => s.id === schedule.id);
  if (idx >= 0) schedules[idx] = schedule;
  else schedules.unshift(schedule);
  saveSchedules(schedules);
}

export function deleteSchedule(id: string) {
  saveSchedules(getSchedules().filter((s) => s.id !== id));
}

export function getRiskReviews(): RiskReview[] {
  return readJson<RiskReview[]>(STORAGE_KEYS.RISK_REVIEWS) ?? (EMPTY_ARRAY as unknown as RiskReview[]);
}

export function saveRiskReviews(riskReviews: RiskReview[]) {
  writeJson(STORAGE_KEYS.RISK_REVIEWS, riskReviews);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("chameleon-demo-update"));
  }
}

export function upsertRiskReview(riskReview: RiskReview) {
  const riskReviews = [...getRiskReviews()];
  const idx = riskReviews.findIndex((r) => r.id === riskReview.id);
  if (idx >= 0) riskReviews[idx] = riskReview;
  else riskReviews.unshift(riskReview);
  saveRiskReviews(riskReviews);
}

export function deleteRiskReview(id: string) {
  saveRiskReviews(getRiskReviews().filter((r) => r.id !== id));
}
