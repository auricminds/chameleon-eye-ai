import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Support — Admin',
}

interface SupportTicket {
  id: string
  user_id: string | null
  subject: string
  status: string
  priority: string
  admin_notes: string | null
  created_at: string
  updated_at: string
}

type SearchParams = Promise<{ status?: string; priority?: string }>

const statusFilters = [
  { value: '', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'waiting_on_user', label: 'Waiting' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
]

const priorityFilters = [
  { value: '', label: 'All Priorities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low' },
]

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function SupportPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const status = params.status ?? ''
  const priority = params.priority ?? ''
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let tickets: SupportTicket[] = []
  if (isConfigured) {
    let path = `support_tickets?select=id,user_id,subject,status,priority,admin_notes,created_at,updated_at&order=created_at.desc&limit=50`
    if (status) path += `&status=eq.${status}`
    if (priority) path += `&priority=eq.${priority}`
    const { data } = await adminQuery<SupportTicket[]>(path)
    tickets = data ?? []
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Support</h1>
        <p className="mt-0.5 text-sm text-muted">Customer support tickets, escalations, and resolution tracking.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see support tickets.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="flex flex-wrap gap-1">
          {statusFilters.map((f) => (
            <Link
              key={f.value || 'all'}
              href={`/admin/support?${new URLSearchParams({ status: f.value, priority }).toString()}`}
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
        <div className="flex flex-wrap gap-1">
          {priorityFilters.map((f) => (
            <Link
              key={f.value || 'all-pri'}
              href={`/admin/support?${new URLSearchParams({ status, priority: f.value }).toString()}`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                priority === f.value
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Created</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No support tickets found.' : 'Connect Supabase to see support tickets.'}
                </td>
              </tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{t.id.slice(0, 8)}…</td>
                  <td className="px-4 py-3">
                    {t.user_id ? (
                      <Link href={`/admin/users/${t.user_id}`} className="font-mono text-xs text-emerald hover:underline">
                        {t.user_id.slice(0, 8)}…
                      </Link>
                    ) : (
                      <span className="text-xs text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground text-sm max-w-64 truncate">{t.subject}</td>
                  <td className="px-4 py-3">
                    <AdminBadge
                      status={t.priority}
                      variant={t.priority === 'critical' ? 'danger' : t.priority === 'high' ? 'warning' : 'default'}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge status={t.status} />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(t.created_at)}</td>
                  <td className="px-4 py-3">
                    <TicketStatusForm ticketId={t.id} currentStatus={t.status} />
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

function TicketStatusForm({ ticketId, currentStatus }: { ticketId: string; currentStatus: string }) {
  const nextStatus = currentStatus === 'open' ? 'in_progress'
    : currentStatus === 'in_progress' ? 'resolved'
    : currentStatus === 'waiting_on_user' ? 'resolved'
    : null

  if (!nextStatus) return <span className="text-xs text-muted">—</span>

  return (
    <form action={`/api/admin/support/${ticketId}/actions`} method="POST">
      <input type="hidden" name="action" value="change_status" />
      <input type="hidden" name="new_status" value={nextStatus} />
      <button
        type="submit"
        className="rounded border border-white/10 px-2 py-1 text-xs text-muted hover:text-foreground transition-colors"
      >
        Mark {nextStatus.replace(/_/g, ' ')}
      </button>
    </form>
  )
}
