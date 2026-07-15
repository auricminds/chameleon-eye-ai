import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Payments — Admin',
}

interface Payment {
  id: string
  user_id: string | null
  amount_micros: number
  currency: string
  status: string
  payment_provider: string
  description: string | null
  failure_reason: string | null
  created_at: string
}

type SearchParams = Promise<{ status?: string }>

const statusFilters = [
  { value: '', label: 'All' },
  { value: 'succeeded', label: 'Succeeded' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'pending', label: 'Pending' },
  { value: 'disputed', label: 'Disputed' },
]

function fmtMoney(micros: number, currency: string) {
  return `$${(micros / 1_000_000).toFixed(2)} ${currency}`
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function PaymentsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const status = params.status ?? ''
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let payments: Payment[] = []
  if (isConfigured) {
    let path = `payments?select=id,user_id,amount_micros,currency,status,payment_provider,description,failure_reason,created_at&order=created_at.desc&limit=50`
    if (status) path += `&status=eq.${status}`
    const { data } = await adminQuery<Payment[]>(path)
    payments = data ?? []
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Payments</h1>
        <p className="mt-0.5 text-sm text-muted">Payment history, failed charges, and refund management.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see payment data.</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-1">
        {statusFilters.map((f) => (
          <Link
            key={f.value || 'all'}
            href={`/admin/payments?${f.value ? `status=${f.value}` : ''}`}
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

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Provider</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No payments found.' : 'Connect Supabase to see payment data.'}
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{p.id.slice(0, 8)}…</td>
                  <td className="px-4 py-3">
                    {p.user_id ? (
                      <Link href={`/admin/users/${p.user_id}`} className="font-mono text-xs text-emerald hover:underline">
                        {p.user_id.slice(0, 8)}…
                      </Link>
                    ) : (
                      <span className="text-xs text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground font-medium">
                    {fmtMoney(p.amount_micros, p.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs capitalize">{p.payment_provider}</td>
                  <td className="px-4 py-3 text-muted text-xs max-w-48 truncate">
                    {p.failure_reason
                      ? <span className="text-red-400">{p.failure_reason}</span>
                      : (p.description ?? '—')}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(p.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
