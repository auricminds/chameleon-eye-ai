import type { Metadata } from 'next'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Jobs — Admin',
}

interface WebhookEvent {
  id: string
  provider: string
  event_type: string
  processing_status: string
  attempts: number
  last_error: string | null
  created_at: string
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function JobsPage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let pendingEvents: WebhookEvent[] = []
  let failedEvents: WebhookEvent[] = []

  if (isConfigured) {
    const [pending, failed] = await Promise.all([
      adminQuery<WebhookEvent[]>(
        `webhook_events?processing_status=eq.pending&select=id,provider,event_type,processing_status,attempts,last_error,created_at&order=created_at.desc&limit=25`
      ),
      adminQuery<WebhookEvent[]>(
        `webhook_events?processing_status=eq.failed&select=id,provider,event_type,processing_status,attempts,last_error,created_at&order=created_at.desc&limit=25`
      ),
    ])
    pendingEvents = pending.data ?? []
    failedEvents = failed.data ?? []
  }

  const allEvents = [...failedEvents, ...pendingEvents]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Jobs</h1>
        <p className="mt-0.5 text-sm text-muted">Background job queue and webhook event processing status.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see job data.</p>
        </div>
      )}

      {isConfigured && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/8 bg-panel p-4">
            <p className="text-xs text-muted">Pending Webhook Events</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{pendingEvents.length}</p>
          </div>
          <div className={`rounded-xl border bg-panel p-4 ${failedEvents.length > 0 ? 'border-red-400/20 bg-red-400/5' : 'border-white/8'}`}>
            <p className="text-xs text-muted">Failed Webhook Events</p>
            <p className={`mt-1 text-2xl font-semibold ${failedEvents.length > 0 ? 'text-red-400' : 'text-foreground'}`}>
              {failedEvents.length}
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Event ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Provider</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Event Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Attempts</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Last Error</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Created</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No pending or failed webhook events.' : 'Connect Supabase to see jobs.'}
                </td>
              </tr>
            ) : (
              allEvents.map((e) => (
                <tr key={e.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{e.id.slice(0, 8)}…</td>
                  <td className="px-4 py-3 text-muted text-xs capitalize">{e.provider}</td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{e.event_type}</td>
                  <td className="px-4 py-3">
                    <AdminBadge
                      status={e.processing_status}
                      variant={e.processing_status === 'failed' ? 'danger' : e.processing_status === 'pending' ? 'warning' : 'default'}
                    />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{e.attempts}</td>
                  <td className="px-4 py-3 text-xs max-w-48 truncate">
                    {e.last_error ? <span className="text-red-400">{e.last_error}</span> : <span className="text-muted">—</span>}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(e.created_at)}</td>
                  <td className="px-4 py-3">
                    {e.processing_status === 'failed' && (
                      <form action={`/api/admin/jobs/${e.id}/retry`} method="POST">
                        <button
                          type="submit"
                          className="rounded border border-emerald/20 px-2 py-1 text-xs text-emerald hover:bg-emerald/10 transition-colors"
                        >
                          Retry
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
