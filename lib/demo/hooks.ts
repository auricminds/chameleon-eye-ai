"use client";

import { useSyncExternalStore } from "react";
import {
  getActiveProjectId,
  getBusinessDna,
  getDemoUser,
  getProjects,
  getRiskReviews,
  getSchedules,
  getTerminalLanguage,
  getVoiceEnabled,
} from "./storage";
import type { BusinessDnaRecord, DemoProject, DemoSchedule, DemoUser, RiskReview } from "./types";

const DEMO_EVENT = "chameleon-demo-update";
const EMPTY_ARRAY: readonly never[] = Object.freeze([]);

export function notifyDemoUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DEMO_EVENT));
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(DEMO_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(DEMO_EVENT, onStoreChange);
  };
}

export function useDemoUser(): DemoUser | null {
  return useSyncExternalStore(
    subscribe,
    () => getDemoUser(),
    () => null,
  );
}

export function useHasDemoUser(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => !!getDemoUser(),
    () => false,
  );
}

export function useBusinessDna(): BusinessDnaRecord | null {
  return useSyncExternalStore(
    subscribe,
    () => getBusinessDna(),
    () => null,
  );
}

export function useVoiceEnabledStore(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => getVoiceEnabled(),
    () => false,
  );
}

export function useTerminalLanguageStore(): "en" | "ar" | null {
  return useSyncExternalStore(
    subscribe,
    () => getTerminalLanguage(),
    () => null,
  );
}

export function useProjects(): DemoProject[] {
  return useSyncExternalStore(
    subscribe,
    () => getProjects(),
    () => EMPTY_ARRAY as unknown as DemoProject[],
  );
}

export function useSchedules(): DemoSchedule[] {
  return useSyncExternalStore(
    subscribe,
    () => getSchedules(),
    () => EMPTY_ARRAY as unknown as DemoSchedule[],
  );
}

export function useActiveProjectId(): string | null {
  return useSyncExternalStore(
    subscribe,
    () => getActiveProjectId(),
    () => null,
  );
}

export function useRiskReviews(): RiskReview[] {
  return useSyncExternalStore(
    subscribe,
    () => getRiskReviews(),
    () => EMPTY_ARRAY as unknown as RiskReview[],
  );
}
