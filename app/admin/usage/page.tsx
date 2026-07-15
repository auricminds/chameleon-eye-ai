import type { Metadata } from 'next'
import { KpiCard } from '@/components/admin/KpiCard'
import { adminQuery } from '@/lib/admin/supabase'
import { countQuery } from '@/lib/admin/queries'

export const metadata: Metadata = {
  title: 'Usage — Admin',
}

interface UsageSummary {
  'input_tokens.sum()': number
  'output_tokens.sum()': number
  'cached_input_tokens.sum()': number
  'total_tokens.sum()': number
  'provider_cost_micros.sum()': number
  'user_charge_micros.sum()': number
  'latency_ms.avg()': number
}

interface DailyUsage {
  day: string
  request_count: number
  input_tokens: number
  output_tokens: number
}

interface TopUser {
  user_id: string
  total_tokens: number
}

export default async function UsagePage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let inputTokens = 0
  let outputTokens = 0
  let cachedTokens = 0
  let totalTokens = 0
  let providerCostMicros = 0
  let userChargeMicros = 0
  let avgLatencyMs = 0
  let totalRequests = 0
  let successRequests = 0
  let failedRequests = 0
  let dailyData: DailyUsage[] = []

  if (isConfigured) {
    const [summaryData, total, success, failed] = await Promise.all([
      adminQuery<UsageSummary[]>(
        `ai_usage_logs?select=input_tokens.sum(),output_tokens.sum(),cached_input_tokens.sum(),total_tokens.sum(),provider_cost_micros.sum(),user_charge_micros.sum(),latency_ms.avg()`
      ),
      countQuery('ai_usage_logs'),
      countQuery('ai_usage_logs', 'request_status=eq.success'),
      countQuery('ai_usage_logs', 'request_status=eq.error'),
    ])

    if (summaryData.data && summaryData.data.length > 0) {
      const s = summaryData.data[0]
      inputTokens = s['input_tokens.sum()'] ?? 0
      outputTokens = s['output_tokens.sum()'] ?? 0
      cachedTokens = s['cached_input_tokens.sum()'] ?? 0
      totalTokens = s['total_tokens.sum()'] ?? 0
      providerCostMicros = s['provider_cost_micros.sum()'] ?? 0
      userChargeMicros = s['user_charge_micros.sum()'] ?? 0
      avgLatencyMs = Math.round(s['latency_ms.avg()'] ?? 0)
    }

    totalRequests = total
    successRequests = success
    failedRequests = failed

    // Daily data for chart (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const { data: rawDaily } = await adminQuery<Array<{ created_at: string; input_tokens: number; output_tokens: number }>>(
      `ai_usage_logs?select=created_at,input_tokens,output_tokens&created_at=gte.${thirtyDaysAgo.toISOString()}&order=created_at.asc&limit=1000`
    )

    if (rawDaily) {
      const byDay: Record<string, { count: number; input: number; output: number }> = {}
      for (const row of rawDaily) {
        const day = row.created_at.slice(0, 10)
        if (!byDay[day]) byDay[day] = { count: 0, input: 0, output: 0 }
        byDay[day].count++
        byDay[day].input += row.input_tokens
        byDay[day].output += row.output_tokens
      }
      dailyData = Object.entries(byDay).map(([day, d]) => ({
        day,
        request_count: d.count,
        input_tokens: d.input,
        output_tokens: d.output,
      }))
    }
  }

  function fmtTokens(n: number) {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
    return n.toString()
  }

  function fmtCost(micros: number) {
    if (micros === 0) return '$0.00'
    return `$${(micros / 1_000_000).toFixed(4)}`
  }

  const profit = userChargeMicros - providerCostMicros
  const margin = userChargeMicros > 0
    ? Math.round((profit / userChargeMicros) * 100)
    : 0

  const maxRequests = Math.max(...dailyData.map(d => d.request_count), 1)
  const maxTokens = Math.max(...dailyData.map(d => d.input_tokens + d.output_tokens), 1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">AI Usage</h1>
          <p className="mt-0.5 text-sm text-muted">Request volume, token consumption, and cost analysis.</p>
        </div>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to load usage data.</p>
        </div>
      )}

      {/* Request KPIs */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Requests (All Time)</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <KpiCard label="Total Requests" value={fmtTokens(totalRequests)} accent />
          <KpiCard label="Successful" value={fmtTokens(successRequests)} trend="up" />
          <KpiCard label="Failed" value={fmtTokens(failedRequests)} trend={failedRequests > 0 ? 'down' : 'neutral'} />
          <KpiCard label="Avg Latency" value={avgLatencyMs > 0 ? `${avgLatencyMs}ms` : '—'} />
        </div>
      </div>

      {/* Token KPIs */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Tokens (All Time)</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Input Tokens" value={fmtTokens(inputTokens)} />
          <KpiCard label="Output Tokens" value={fmtTokens(outputTokens)} />
          <KpiCard label="Cached Tokens" value={fmtTokens(cachedTokens)} />
          <KpiCard label="Total Tokens" value={fmtTokens(totalTokens)} accent />
          <KpiCard label="Provider Cost" value={fmtCost(providerCostMicros)} />
          <KpiCard label="User Charges" value={fmtCost(userChargeMicros)} />
        </div>
      </div>

      {/* Economics */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Economics</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <KpiCard label="Gross Profit" value={fmtCost(profit)} accent={profit > 0} />
          <KpiCard label="Gross Margin" value={`${margin}%`} trend={margin > 50 ? 'up' : margin > 0 ? 'neutral' : 'down'} />
          <KpiCard
            label="Avg Cost/Request"
            value={totalRequests > 0 ? fmtCost(Math.round(providerCostMicros / totalRequests)) : '—'}
          />
          <KpiCard
            label="Avg Revenue/Request"
            value={totalRequests > 0 ? fmtCost(Math.round(userChargeMicros / totalRequests)) : '—'}
          />
        </div>
      </div>

      {/* Requests Over Time */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Requests Over Time</h2>
        <p className="text-xs text-muted mb-4">Daily request volume — last 30 days</p>
        {dailyData.length === 0 ? (
          <p className="text-sm text-muted">
            {isConfigured ? 'No request data for the last 30 days.' : 'Connect Supabase to see chart data.'}
          </p>
        ) : (
          <div className="flex items-end gap-1 h-24">
            {dailyData.map((d) => (
              <div
                key={d.day}
                className="flex-1 rounded-t bg-emerald/30 hover:bg-emerald/50 transition-colors"
                style={{ height: `${Math.max(4, (d.request_count / maxRequests) * 100)}%` }}
                title={`${d.day}: ${d.request_count} requests`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Token Consumption */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-1">Token Consumption Over Time</h2>
        <p className="text-xs text-muted mb-4">Input vs output tokens — last 30 days</p>
        {dailyData.length === 0 ? (
          <p className="text-sm text-muted">
            {isConfigured ? 'No token data for the last 30 days.' : 'Connect Supabase to see chart data.'}
          </p>
        ) : (
          <div className="flex items-end gap-1 h-24">
            {dailyData.map((d) => {
              const total = d.input_tokens + d.output_tokens
              const totalPct = Math.max(4, (total / maxTokens) * 100)
              const inputPct = total > 0 ? (d.input_tokens / total) * totalPct : 0
              const outputPct = totalPct - inputPct
              return (
                <div key={d.day} className="flex-1 flex flex-col-reverse gap-0.5" style={{ height: `${totalPct}%` }} title={`${d.day}: ${fmtTokens(d.input_tokens)} in, ${fmtTokens(d.output_tokens)} out`}>
                  <div className="rounded-t bg-sky-400/30" style={{ flex: `0 0 ${inputPct}%` }} />
                  <div className="rounded-t bg-emerald/30" style={{ flex: `0 0 ${outputPct}%` }} />
                </div>
              )
            })}
          </div>
        )}
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span className="h-2 w-2 rounded-sm bg-sky-400/30" />
            Input tokens
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span className="h-2 w-2 rounded-sm bg-emerald/30" />
            Output tokens
          </div>
        </div>
      </div>
    </div>
  )
}
