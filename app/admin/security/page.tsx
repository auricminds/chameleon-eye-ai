import type { Metadata } from 'next'
import { adminQuery } from '@/lib/admin/supabase'
import { countQuery } from '@/lib/admin/queries'

export const metadata: Metadata = {
  title: 'Security — Admin',
}

interface AuditLog {
  id: string
  admin_email: string
  action: string
  target_type: string | null
  target_id: string | null
  reason: string | null
  ip_address: string | null
  created_at: string
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const SECURITY_ACTIONS = ['ban', 'suspend', 'revoke', 'mark_compromised', 'end_sessions']

export default async function SecurityPage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let events: AuditLog[] = []
  let bannedToday = 0
  let suspendedToday = 0
  let revokedToday = 0

  if (isConfigured) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayISO = today.toISOString()

    // Fetch security-relevant audit log entries
    const actionFilter = SECURITY_ACTIONS.map(a => `action.like.*${a}*`).join(',')
    const { data } = await adminQuery<AuditLog[]>(
      `admin_audit_logs?select=id,admin_email,action,target_type,target_id,reason,ip_address,created_at&or=(${actionFilter})&order=created_at.desc&limit=50`
    )
    events = data ?? []

    const [b, s, r] = await Promise.all([
      countQuery('platform_users', `account_status=eq.banned&updated_at=gte.${todayISO}`),
      countQuery('platform_users', `account_status=eq.suspended&updated_at=gte.${todayISO}`),
      countQuery('api_keys', `status=eq.revoked&updated_at=gte.${todayISO}`),
    ])
    bannedToday = b
    suspendedToday = s
    revokedToday = r
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Security</h1>
        <p className="mt-0.5 text-sm text-muted">Security events, suspicious activity, and threat monitoring.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see security data.</p>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4">
          <p className="text-xs text-muted">Banned Today</p>
          <p className="mt-1 text-2xl font-semibold text-red-400">{bannedToday}</p>
        </div>
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
          <p className="text-xs text-muted">Suspended Today</p>
          <p className="mt-1 text-2xl font-semibold text-amber-400">{suspendedToday}</p>
        </div>
        <div className="rounded-xl border border-white/8 bg-panel p-4">
          <p className="text-xs text-muted">API Keys Revoked Today</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{revokedToday}</p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Recent Security Events</h2>
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Action</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Target</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">IP</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Reason</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted text-sm">
                    {isConfigured ? 'No security events found.' : 'Connect Supabase to see security events.'}
                  </td>
                </tr>
              ) : (
                events.map((e) => (
                  <tr key={e.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                    <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(e.created_at)}</td>
                    <td className="px-4 py-3 text-muted text-xs">{e.admin_email}</td>
                    <td className="px-4 py-3 font-mono text-xs text-amber-400">{e.action}</td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {e.target_type && <span className="capitalize">{e.target_type.replace(/_/g, ' ')}</span>}
                      {e.target_id && <span className="font-mono ml-1">{e.target_id.slice(0, 8)}…</span>}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">{e.ip_address ?? '—'}</td>
                    <td className="px-4 py-3 text-muted text-xs max-w-48 truncate">{e.reason ?? '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
