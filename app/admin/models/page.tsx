import type { Metadata } from 'next'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Models — Admin',
}

interface AiModel {
  id: string
  provider: string
  model_id: string
  display_name: string
  is_active: boolean
  is_maintenance: boolean
  context_size: number | null
  input_price_micros: number
  output_price_micros: number
  health_status: string
  error_rate_percent: number
  avg_latency_ms: number | null
}

function fmtPrice(micros: number) {
  if (micros === 0) return '$0'
  return `$${(micros / 1_000_000).toFixed(4)}/1K`
}

export default async function ModelsPage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let models: AiModel[] = []
  if (isConfigured) {
    const { data } = await adminQuery<AiModel[]>(
      `ai_models?select=id,provider,model_id,display_name,is_active,is_maintenance,context_size,input_price_micros,output_price_micros,health_status,error_rate_percent,avg_latency_ms&order=provider.asc,display_name.asc`
    )
    models = data ?? []
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Models</h1>
        <p className="mt-0.5 text-sm text-muted">AI model configuration, availability, and routing rules.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see model data.</p>
        </div>
      )}

      {isConfigured && models.length === 0 && (
        <div className="rounded-xl border border-white/8 bg-panel px-4 py-8 text-center">
          <p className="text-sm text-muted">No AI models configured. Add models to the <code className="font-mono text-xs">ai_models</code> table.</p>
        </div>
      )}

      {models.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Model</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Health</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Context</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Input Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Output Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Error Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Avg Latency</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{m.display_name}</p>
                    <p className="text-xs text-muted font-mono">{m.model_id}</p>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs capitalize">{m.provider}</td>
                  <td className="px-4 py-3">
                    {m.is_maintenance
                      ? <AdminBadge status="maintenance" label="Maintenance" variant="warning" />
                      : m.is_active
                      ? <AdminBadge status="active" />
                      : <AdminBadge status="disabled" />}
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge
                      status={m.health_status}
                      variant={m.health_status === 'healthy' ? 'active' : m.health_status === 'degraded' ? 'warning' : 'danger'}
                    />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {m.context_size ? `${(m.context_size / 1000).toFixed(0)}K` : '—'}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{fmtPrice(m.input_price_micros)}</td>
                  <td className="px-4 py-3 text-muted text-xs">{fmtPrice(m.output_price_micros)}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className={m.error_rate_percent > 5 ? 'text-red-400' : 'text-muted'}>
                      {m.error_rate_percent.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {m.avg_latency_ms ? `${m.avg_latency_ms}ms` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <ModelActions modelId={m.id} isActive={m.is_active} isMaintenance={m.is_maintenance} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ModelActions({ modelId, isActive, isMaintenance }: { modelId: string; isActive: boolean; isMaintenance: boolean }) {
  return (
    <div className="flex gap-1">
      <form action={`/api/admin/models/${modelId}/actions`} method="POST">
        <input type="hidden" name="action" value={isActive ? 'disable' : 'enable'} />
        <button
          type="submit"
          className={`rounded border px-2 py-1 text-xs transition-colors ${
            isActive
              ? 'border-amber-400/20 text-amber-400 hover:bg-amber-400/10'
              : 'border-emerald/20 text-emerald hover:bg-emerald/10'
          }`}
        >
          {isActive ? 'Disable' : 'Enable'}
        </button>
      </form>
      <form action={`/api/admin/models/${modelId}/actions`} method="POST">
        <input type="hidden" name="action" value={isMaintenance ? 'clear_maintenance' : 'set_maintenance'} />
        <button
          type="submit"
          className="rounded border border-white/10 px-2 py-1 text-xs text-muted hover:text-foreground transition-colors"
        >
          {isMaintenance ? 'Clear Maint.' : 'Set Maint.'}
        </button>
      </form>
    </div>
  )
}
