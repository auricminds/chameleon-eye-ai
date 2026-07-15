import type { Metadata } from 'next'
import { adminQuery } from '@/lib/admin/supabase'
import { countQuery } from '@/lib/admin/queries'

export const metadata: Metadata = {
  title: 'System Health — Admin',
}

interface AiProvider {
  name: string
  display_name: string
  is_active: boolean
  is_maintenance: boolean
  error_rate_percent: number
  last_error_at: string | null
  last_error_message: string | null
}

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
      ok
        ? 'text-emerald bg-emerald/10 border-emerald/20'
        : 'text-red-400 bg-red-400/10 border-red-400/20'
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? 'bg-emerald' : 'bg-red-400'}`} />
      {label}
    </span>
  )
}

export default async function SystemHealthPage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  // Check environment variables (just existence, never values)
  const envChecks = [
    { key: 'NEXT_PUBLIC_SUPABASE_URL', label: 'Supabase URL', configured: !!process.env.NEXT_PUBLIC_SUPABASE_URL },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', label: 'Supabase Service Role Key', configured: !!process.env.SUPABASE_SERVICE_ROLE_KEY },
    { key: 'ADMIN_SESSION_SECRET', label: 'Admin Session Secret', configured: !!process.env.ADMIN_SESSION_SECRET },
    { key: 'OPENROUTER_API_KEY', label: 'OpenRouter API Key', configured: !!process.env.OPENROUTER_API_KEY },
  ]

  let dbOk = false
  let providers: AiProvider[] = []
  let failedWebhooks = 0

  if (isConfigured) {
    // Test DB connectivity with a simple count
    try {
      const count = await countQuery('platform_users')
      dbOk = count >= 0
    } catch {
      dbOk = false
    }

    const [providersData, webhookFails] = await Promise.all([
      adminQuery<AiProvider[]>(
        `ai_providers?select=name,display_name,is_active,is_maintenance,error_rate_percent,last_error_at,last_error_message&order=fallback_priority.asc`
      ),
      countQuery('webhook_events', 'processing_status=eq.failed'),
    ])
    providers = providersData.data ?? []
    failedWebhooks = webhookFails
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">System Health</h1>
        <p className="mt-0.5 text-sm text-muted">Service uptime, error rates, and infrastructure status. Read-only monitoring.</p>
      </div>

      {/* Environment Variables */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Environment Variables</h2>
        <div className="grid grid-cols-2 gap-3">
          {envChecks.map((check) => (
            <div key={check.key} className="flex items-center justify-between rounded-lg border border-white/5 bg-background px-3 py-2">
              <span className="text-xs text-muted">{check.label}</span>
              <StatusBadge ok={check.configured} label={check.configured ? 'Configured' : 'Missing'} />
            </div>
          ))}
        </div>
      </div>

      {/* Database */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Database</h2>
        <div className="flex items-center justify-between rounded-lg border border-white/5 bg-background px-3 py-2">
          <span className="text-xs text-muted">Supabase PostgREST</span>
          {isConfigured ? (
            <StatusBadge ok={dbOk} label={dbOk ? 'Connected' : 'Connection Failed'} />
          ) : (
            <StatusBadge ok={false} label="Not Configured" />
          )}
        </div>
      </div>

      {/* AI Providers */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">AI Providers</h2>
        {!isConfigured ? (
          <p className="text-sm text-muted">Connect Supabase to see provider status.</p>
        ) : providers.length === 0 ? (
          <p className="text-sm text-muted">No providers configured. Run migration to seed providers.</p>
        ) : (
          <div className="space-y-2">
            {providers.map((p) => (
              <div key={p.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-background px-3 py-2">
                <div>
                  <span className="text-sm text-foreground">{p.display_name}</span>
                  {p.error_rate_percent > 0 && (
                    <span className="ml-2 text-xs text-amber-400">{p.error_rate_percent.toFixed(1)}% error rate</span>
                  )}
                  {p.last_error_message && (
                    <p className="mt-0.5 text-xs text-red-400 truncate max-w-xs">{p.last_error_message}</p>
                  )}
                </div>
                <StatusBadge
                  ok={p.is_active && !p.is_maintenance}
                  label={p.is_maintenance ? 'Maintenance' : p.is_active ? 'Active' : 'Disabled'}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Webhook Events */}
      <div className="rounded-xl border border-white/8 bg-panel p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Webhook Processing</h2>
        <div className="flex items-center justify-between rounded-lg border border-white/5 bg-background px-3 py-2">
          <span className="text-xs text-muted">Failed webhook events</span>
          {isConfigured ? (
            <StatusBadge ok={failedWebhooks === 0} label={failedWebhooks === 0 ? 'None' : `${failedWebhooks} failed`} />
          ) : (
            <span className="text-xs text-muted">—</span>
          )}
        </div>
      </div>
    </div>
  )
}
