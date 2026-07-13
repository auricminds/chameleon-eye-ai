"use client";

import { useState } from "react";
import { REPORT_TABS } from "@/lib/constants";
import { Card } from "./Card";
import { Badge } from "./Badge";

export function ReportTabs() {
  const [activeId, setActiveId] = useState<(typeof REPORT_TABS)[number]["id"]>(
    REPORT_TABS[0].id,
  );
  const active = REPORT_TABS.find((tab) => tab.id === activeId) ?? REPORT_TABS[0];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {REPORT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46A] ${
              activeId === tab.id
                ? "border-emerald/40 bg-emerald/15 text-emerald"
                : "border-white/10 bg-panel text-muted hover:border-emerald/20 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="mx-auto mt-8 max-w-2xl border-emerald/20 bg-panel2">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">{active.label}</h3>
          <Badge variant="gold">Risk level: {active.riskLevel}</Badge>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-emerald">Situation</p>
            <p className="mt-1 leading-7 text-muted">{active.situation}</p>
          </div>
          <div>
            <p className="font-medium text-emerald">Signals</p>
            <ul className="mt-2 space-y-1.5">
              {active.signals.map((signal) => (
                <li key={signal} className="flex items-start gap-2 text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-gold">Suggested action</p>
            <p className="mt-1 leading-7 text-foreground">{active.action}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
