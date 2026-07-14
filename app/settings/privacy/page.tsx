"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

type PrivacyMode = "local" | "cloud" | "ask";

export default function PrivacySettingsPage() {
  const [mode, setMode] = useState<PrivacyMode>("ask");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-emerald uppercase">
          Settings
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Privacy &amp; Data
        </h1>
        <p className="mt-3 text-base text-muted">
          Control how Chameleon Eye AI processes your data and when cloud intelligence is used.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Data Mode */}
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-1">Data Mode</h2>
          <p className="text-sm text-muted mb-6">
            Choose how Chameleon Eye AI handles intelligence requests by default.
          </p>
          <div className="space-y-3">
            {/* Local Mode */}
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                mode === "local"
                  ? "border-emerald/30 bg-emerald/5"
                  : "border-white/8 bg-panel2 hover:border-white/15"
              }`}
            >
              <input
                type="radio"
                name="privacy-mode"
                value="local"
                checked={mode === "local"}
                onChange={() => setMode("local")}
                className="mt-1 accent-emerald"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Private Local Mode
                </p>
                <p className="mt-1 text-sm text-muted">
                  Use local intelligence only. No cloud AI requests. No network calls for analysis.
                  Requires desktop app installation.
                </p>
              </div>
            </label>

            {/* Cloud Mode */}
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                mode === "cloud"
                  ? "border-emerald/30 bg-emerald/5"
                  : "border-white/8 bg-panel2 hover:border-white/15"
              }`}
            >
              <input
                type="radio"
                name="privacy-mode"
                value="cloud"
                checked={mode === "cloud"}
                onChange={() => setMode("cloud")}
                className="mt-1 accent-emerald"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Cloud Intelligence Mode
                </p>
                <p className="mt-1 text-sm text-muted">
                  Use cloud intelligence with consent. Selected text may be sent to approved
                  infrastructure after your confirmation.
                </p>
              </div>
            </label>

            {/* Ask Mode */}
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                mode === "ask"
                  ? "border-emerald/30 bg-emerald/5"
                  : "border-white/8 bg-panel2 hover:border-white/15"
              }`}
            >
              <input
                type="radio"
                name="privacy-mode"
                value="ask"
                checked={mode === "ask"}
                onChange={() => setMode("ask")}
                className="mt-1 accent-emerald"
              />
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-foreground">
                  Ask every time before cloud use
                </p>
                <span className="inline-flex items-center rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 text-xs font-medium text-emerald">
                  Recommended
                </span>
              </div>
              <p className="mt-1 text-sm text-muted hidden">
                Prompts you before any cloud analysis. You stay in control of every request.
              </p>
            </label>
          </div>
          <p className="mt-4 text-xs text-muted border-t border-white/8 pt-4">
            Your privacy mode preference is saved locally. Backend sync coming.
          </p>
        </Card>

        {/* Section 2: Cloud Consent History */}
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Cloud Consent History
          </h2>
          <p className="text-sm text-muted mb-6">
            A log of times you approved cloud analysis for selected content.
          </p>
          <div className="rounded-xl border border-white/8 bg-panel2 p-8 text-center">
            <p className="text-sm text-muted">No cloud analysis requests recorded yet.</p>
          </div>
          <p className="mt-4 text-xs text-muted">
            Cloud consent history will appear here when backend is connected.
          </p>
        </Card>

        {/* Section 3: Data Controls */}
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-1">Data Controls</h2>
          <p className="text-sm text-muted mb-6">
            Export or delete your Chameleon Eye AI data. Requests are processed within 30 days.
          </p>

          {/* Cloud Safety Notice */}
          <div className="mb-6 rounded-xl border border-emerald/20 bg-emerald/5 p-4">
            <p className="text-xs leading-6 text-muted">
              <span className="font-semibold text-emerald">Privacy guarantee: </span>
              Chameleon Eye AI will not send private documents, full archives, or local memory to cloud
              intelligence unless you explicitly approve selected text.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="/trust/data-deletion" variant="secondary">
              Export My Data
            </Button>
            <Button href="/trust/data-deletion" variant="ghost">
              Request Data Deletion
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted border-t border-white/8 pt-4">
            Full automated self-service data deletion is in development. Current requests are
            processed by the Chameleon Eye team.
          </p>
        </Card>
      </div>
    </div>
  );
}
