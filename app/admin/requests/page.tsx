import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'AI Requests — Admin',
}

interface UsageLog {
  id: string
  user_id: string | null
  provider: string | null
  requested_model: string | null
  actual_model: string | null
  input_tokens: number
  output_tokens: number
  total_tokens: number
  provider_cost_micros: number
  user_charge_micros: number
  latency_ms: number | null
  request_status: string
  request_source: string | null
  created_at: string
}

type SearchParams = Promise<{ status?: string; page?: string; provider?: string }>

const PAGE_SIZE = 50

const statusFilters = [
  { value: '', label: 'All' },
  { value: 'success', label: 'Success' },
  { value: 'error', label: 'Error' },
  { value: 'timeout', label: 'Timeout' },
  { value: 'rate_limited', label: 'Rate Limited' },
  { value: 'cancelled', label: 'Cancelled' },
]

function fmtTokens(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function fmtCost(micros: number) {
  if (micros === 0) return '$0'
  return `$${(micros / 1_000_000).toFixed(4)}`
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function AIRequestsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const status = params.status ?? ''
  const provider = params.provider ?? ''
  const page = parseInt(params.page ?? '1', 10)
  const offset = (page - 1) * PAGE_SIZE
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let logs: UsageLog[] = []
  if (isConfigured) {
    let path = `ai_usage_logs?select=id,user_id,provider,requested_model,actual_model,input_tokens,output_tokens,total_tokens,provider_cost_micros,user_charge_micros,latency_ms,request_status,request_source,created_at&order=created_at.desc&limit=${PAGE_SIZE}&offset=${offset}`
    if (status) path += `&request_status=eq.${status}`
    if (provider) path += `&provider=eq.${provider}`
    const { data } = await adminQuery<UsageLog[]>(path)
    logs = data ?? []
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">AI Requests</h1>
        <p className="mt-0.5 text-sm text-muted">Detailed AI request logs, traces, and error analysis.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see AI request logs.</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-wrap gap-1">
          {statusFilters.map((f) => (
            <Link
              key={f.value || 'all'}
              href={`/admin/requests?${new URLSearchParams({ status: f.value, provider, page: '1' }).toString()}`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                status === f.value
                  ? 'bg-emerald/10 text-emerald border border-emerald/20'
                  : 'border border-white/10 text-muted hover:text-foreground'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Source</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Provider</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Model</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Tokens In</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Tokens Out</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Cost</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Charge</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Latency</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No AI requests found.' : 'Connect Supabase to see AI request logs.'}
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{log.id.slice(0, 8)}…</td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(log.created_at)}</td>
                  <td className="px-4 py-3">
                    {log.user_id ? (
                      <Link href={`/admin/users/${log.user_id}`} className="font-mono text-xs text-emerald hover:underline">
                        {log.user_id.slice(0, 8)}…
                      </Link>
                    ) : (
                      <span className="text-xs text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{log.request_source?.replace(/_/g, ' ') ?? '—'}</td>
                  <td className="px-4 py-3 text-muted text-xs capitalize">{log.provider ?? '—'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted max-w-32 truncate">
                    {log.actual_model ?? log.requested_model ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{fmtTokens(log.input_tokens)}</td>
                  <td className="px-4 py-3 text-muted text-xs">{fmtTokens(log.output_tokens)}</td>
                  <td className="px-4 py-3 text-muted text-xs">{fmtCost(log.provider_cost_micros)}</td>
                  <td className="px-4 py-3 text-muted text-xs">{fmtCost(log.user_charge_micros)}</td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {log.latency_ms ? `${log.latency_ms}ms` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge
                      status={log.request_status}
                      variant={log.request_status === 'success' ? 'active' : log.request_status === 'error' || log.request_status === 'timeout' ? 'danger' : 'warning'}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {(logs.length === PAGE_SIZE || page > 1) && (
        <div className="flex justify-end gap-2">
          {page > 1 && (
            <Link
              href={`/admin/requests?${new URLSearchParams({ status, provider, page: String(page - 1) }).toString()}`}
              className="rounded-lg border border-white/10 bg-panel px-3 py-1.5 text-xs text-muted hover:text-foreground"
            >
              Previous
            </Link>
          )}
          {logs.length === PAGE_SIZE && (
            <Link
              href={`/admin/requests?${new URLSearchParams({ status, provider, page: String(page + 1) }).toString()}`}
              className="rounded-lg border border-white/10 bg-panel px-3 py-1.5 text-xs text-muted hover:text-foreground"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
