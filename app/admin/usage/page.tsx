import type { Metadata } from 'next'
import { KpiCard } from '@/components/admin/KpiCard'
import { DateFilter } from '@/components/admin/DateFilter'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Usage — Admin',
}

interface UsageSummary {
  total_requests: number
  successful_requests: number
  failed_requests: number
  avg_latency: number
  total_tokens: number
  input_tokens: number
  output_tokens: number
  cached_tokens: number
  provider_cost_micros: number
  user_charge_micros: number
}

export default async function UsagePage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let summary: Partial<UsageSummary> = {}

  if (isConfigured) {
    const { data } = await adminQuery<UsageSummary[]>(
      `ai_usage_logs?select=input_tokens.sum(),output_tokens.sum(),cached_input_tokens.sum(),total_tokens.sum(),provider_cost_micros.sum(),user_charge_micros.sum(),latency_ms.avg()&limit=1`
    )
    if (data && data.length > 0) summary = data[0]
  }

  function fmtTokens(n: number | undefined) {
    if (n === undefined) return '—'
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
    return n.toString()
  }

  function fmtCost(micros: number | undefined) {
    if (micros === undefined) return '$—'
    return `$${(micros / 1_000_000).toFixed(4)}`
  }

  const profit = (summary.user_charge_micros ?? 0) - (summary.provider_cost_micros ?? 0)
  const margin = summary.user_charge_micros
    ? Math.round((profit / summary.user_charge_micros) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">AI Usage</h1>
          <p className="mt-0.5 text-sm text-muted">Request volume, token consumption, and cost analysis.</p>
        </div>
        <DateFilter />
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to load usage data.</p>
        </div>
      )}

      {/* KPIs */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Requests</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Total Requests" value="—" accent />
          <KpiCard label="Successful" value="—" trend="up" />
          <KpiCard label="Failed" value="—" />
          <KpiCard label="Rate Limited" value="—" />
          <KpiCard label="Avg Latency" value="— ms" />
          <KpiCard label="Streaming %" value="—%" />
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Tokens</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Input Tokens" value={fmtTokens(summary.input_tokens)} />
          <KpiCard label="Output Tokens" value={fmtTokens(summary.output_tokens)} />
          <KpiCard label="Cached Tokens" value={fmtTokens(summary.cached_tokens)} />
          <KpiCard label="Total Tokens" value={fmtTokens(summary.total_tokens)} accent />
          <KpiCard label="Provider Cost" value={fmtCost(summary.provider_cost_micros)} />
          <KpiCard label="User Charges" value={fmtCost(summary.user_charge_micros)} />
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Economics</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <KpiCard label="Gross Profit" value={fmtCost(profit > 0 ? profit : undefined)} accent={profit > 0} />
          <KpiCard label="Gross Margin" value={`${margin}%`} trend={margin > 50 ? 'up' : margin > 0 ? 'neutral' : 'down'} />
          <KpiCard label="Avg Cost/Request" value="$—" />
          <KpiCard label="Avg Revenue/Request" value="$—" />
        </div>
      </div>

      {/* Bar chart — requests over time (div-based) */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Requests Over Time</h2>
        <p className="text-xs text-muted mb-4">Daily request volume — last 30 days</p>
        {!isConfigured ? (
          <div className="flex items-end gap-1 h-24">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-emerald/10"
                style={{ height: `${20 + Math.sin(i * 0.5) * 15}%` }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Chart data will appear when Supabase is connected.</p>
        )}
        {!isConfigured && (
          <p className="mt-2 text-xs text-muted/60">Preview — connect Supabase for real data</p>
        )}
      </div>

      {/* Token chart */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Token Consumption Over Time</h2>
        <p className="text-xs text-muted mb-4">Input vs output tokens — last 30 days</p>
        {!isConfigured ? (
          <div className="flex items-end gap-1 h-24">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col gap-0.5 items-stretch">
                <div
                  className="rounded-t bg-sky-400/20"
                  style={{ height: `${10 + Math.cos(i * 0.4) * 8}px` }}
                />
                <div
                  className="rounded-t bg-emerald/20"
                  style={{ height: `${15 + Math.sin(i * 0.6) * 10}px` }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Chart data will appear when Supabase is connected.</p>
        )}
      </div>

      {/* Revenue vs cost chart */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Revenue vs Provider Cost</h2>
        <p className="text-xs text-muted mb-4">Daily revenue, cost, and profit — last 30 days</p>
        <p className="text-sm text-muted">
          {isConfigured ? 'Data loading...' : 'Connect Supabase to see revenue vs cost chart.'}
        </p>
      </div>
    </div>
  )
}
