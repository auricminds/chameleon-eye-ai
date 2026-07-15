import type { Metadata } from 'next'
import Link from 'next/link'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Audit Logs — Admin',
}

interface AuditLog {
  id: string
  admin_user_id: string | null
  admin_email: string
  action: string
  target_type: string | null
  target_id: string | null
  reason: string | null
  ip_address: string | null
  created_at: string
}

type SearchParams = Promise<{ action?: string; page?: string }>

const PAGE_SIZE = 50

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function AuditLogsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const action = params.action ?? ''
  const page = parseInt(params.page ?? '1', 10)
  const offset = (page - 1) * PAGE_SIZE
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let logs: AuditLog[] = []
  if (isConfigured) {
    let path = `admin_audit_logs?select=id,admin_user_id,admin_email,action,target_type,target_id,reason,ip_address,created_at&order=created_at.desc&limit=${PAGE_SIZE}&offset=${offset}`
    if (action) path += `&action=ilike.*${action}*`
    const { data } = await adminQuery<AuditLog[]>(path)
    logs = data ?? []
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Audit Logs</h1>
        <p className="mt-0.5 text-sm text-muted">Complete admin action audit trail. Read-only.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see audit logs.</p>
        </div>
      )}

      {/* Search */}
      <form method="GET" className="flex gap-2">
        <input
          name="action"
          defaultValue={action}
          placeholder="Filter by action (e.g. suspend, ban, revoke)…"
          className="flex-1 rounded-lg border border-white/10 bg-panel px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
        />
        <button type="submit" className="rounded-lg border border-white/10 bg-panel px-4 py-2 text-sm text-muted hover:text-foreground transition-colors">
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Time</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Admin</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Action</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Target Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Target ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Reason</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">IP</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No audit logs found.' : 'Connect Supabase to see audit logs.'}
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(log.created_at)}</td>
                  <td className="px-4 py-3 text-muted text-xs">{log.admin_email}</td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{log.action}</td>
                  <td className="px-4 py-3 text-muted text-xs capitalize">
                    {log.target_type?.replace(/_/g, ' ') ?? '—'}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {log.target_id ? `${log.target_id.slice(0, 8)}…` : '—'}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs max-w-48 truncate">{log.reason ?? '—'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">{log.ip_address ?? '—'}</td>
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
              href={`/admin/audit-logs?${new URLSearchParams({ action, page: String(page - 1) }).toString()}`}
              className="rounded-lg border border-white/10 bg-panel px-3 py-1.5 text-xs text-muted hover:text-foreground"
            >
              Previous
            </Link>
          )}
          {logs.length === PAGE_SIZE && (
            <Link
              href={`/admin/audit-logs?${new URLSearchParams({ action, page: String(page + 1) }).toString()}`}
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
