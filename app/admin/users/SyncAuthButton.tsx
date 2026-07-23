"use client";

import { useState } from "react";

export function SyncAuthButton() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSync() {
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/users/sync-auth", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setState("done");
        setMessage(data.message ?? `Synced ${data.synced} user(s).`);
      } else {
        setState("error");
        setMessage(data.error ?? "Sync failed.");
      }
    } catch {
      setState("error");
      setMessage("Network error during sync.");
    }
  }

  return (
    <div className="flex items-center gap-3">
      {message && (
        <p
          className={`text-xs ${
            state === "error" ? "text-red-400" : "text-emerald"
          }`}
        >
          {message}
        </p>
      )}
      <button
        onClick={handleSync}
        disabled={state === "loading"}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted hover:border-emerald/30 hover:text-emerald transition-colors disabled:opacity-50"
      >
        {state === "loading" ? "Syncing…" : "Sync from Auth"}
      </button>
    </div>
  );
}
