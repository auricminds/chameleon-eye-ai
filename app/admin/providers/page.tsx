import type { Metadata } from 'next'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Providers — Admin',
}

interface AiProvider {
  id: string
  name: string
  display_name: string
  is_active: boolean
  is_maintenance: boolean
  has_secret_configured: boolean
  total_requests: number
  total_tokens: number
  total_cost_micros: number
  error_rate_percent: number
  avg_latency_ms: number | null
  last_success_at: string | null
  last_error_at: string | null
  last_error_message: string | null
  fallback_priority: number
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function fmtCost(micros: number) {
  return `$${(micros / 1_000_000).toFixed(4)}`
}

export default async function ProvidersPage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let providers: AiProvider[] = []
  if (isConfigured) {
    const { data } = await adminQuery<AiProvider[]>(
      `ai_providers?select=id,name,display_name,is_active,is_maintenance,has_secret_configured,total_requests,total_tokens,total_cost_micros,error_rate_percent,avg_latency_ms,last_success_at,last_error_at,last_error_message,fallback_priority&order=fallback_priority.asc`
    )
    providers = data ?? []
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Providers</h1>
        <p className="mt-0.5 text-sm text-muted">AI provider integrations, cost tracking, and failover settings.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see provider data.</p>
        </div>
      )}

      {isConfigured && providers.length === 0 && (
        <div className="rounded-xl border border-white/8 bg-panel px-4 py-8 text-center">
          <p className="text-sm text-muted">No AI providers configured. Run the migration to seed initial providers.</p>
        </div>
      )}

      {providers.length > 0 && (
        <div className="grid gap-4">
          {providers.map((p) => (
            <div key={p.id} className="rounded-xl border border-white/8 bg-panel p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{p.display_name}</h3>
                    <span className="text-xs text-muted font-mono">#{p.fallback_priority}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.is_maintenance
                      ? <AdminBadge status="maintenance" label="Maintenance" variant="warning" />
                      : p.is_active
                      ? <AdminBadge status="active" />
                      : <AdminBadge status="disabled" />}
                    {p.has_secret_configured
                      ? <span className="text-xs text-emerald">API key configured</span>
                      : <span className="text-xs text-amber-400">No API key — configure in env</span>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <form action={`/api/admin/providers/${p.id}/actions`} method="POST">
                    <input type="hidden" name="action" value={p.is_active ? 'disable' : 'enable'} />
                    <button
                      type="submit"
                      className={`rounded border px-3 py-1.5 text-xs transition-colors ${
                        p.is_active
                          ? 'border-amber-400/20 text-amber-400 hover:bg-amber-400/10'
                          : 'border-emerald/20 text-emerald hover:bg-emerald/10'
                      }`}
                    >
                      {p.is_active ? 'Disable' : 'Enable'}
                    </button>
                  </form>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-muted">Total Requests</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{p.total_requests.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Total Cost</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{fmtCost(p.total_cost_micros)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Error Rate</p>
                  <p className={`mt-0.5 text-sm font-medium ${p.error_rate_percent > 5 ? 'text-red-400' : 'text-foreground'}`}>
                    {p.error_rate_percent.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted">Avg Latency</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{p.avg_latency_ms ? `${p.avg_latency_ms}ms` : '—'}</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/5 pt-3">
                <div>
                  <p className="text-xs text-muted">Last Success</p>
                  <p className="mt-0.5 text-xs text-foreground">{fmtDate(p.last_success_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Last Error</p>
                  <p className="mt-0.5 text-xs text-red-400">{fmtDate(p.last_error_at)}</p>
                  {p.last_error_message && (
                    <p className="mt-0.5 text-xs text-muted truncate max-w-xs">{p.last_error_message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
