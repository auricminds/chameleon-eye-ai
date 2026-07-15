import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Invoices — Admin',
}

interface Invoice {
  id: string
  user_id: string | null
  amount_micros: number
  currency: string
  status: string
  period_start: string | null
  period_end: string | null
  due_date: string | null
  paid_at: string | null
  pdf_url: string | null
  created_at: string
}

type SearchParams = Promise<{ status?: string }>

const statusFilters = [
  { value: '', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'open', label: 'Open' },
  { value: 'draft', label: 'Draft' },
  { value: 'void', label: 'Void' },
  { value: 'uncollectible', label: 'Uncollectible' },
]

function fmtMoney(micros: number, currency: string) {
  return `$${(micros / 1_000_000).toFixed(2)} ${currency}`
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function InvoicesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const status = params.status ?? ''
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let invoices: Invoice[] = []
  if (isConfigured) {
    let path = `invoices?select=id,user_id,amount_micros,currency,status,period_start,period_end,due_date,paid_at,pdf_url,created_at&order=created_at.desc&limit=50`
    if (status) path += `&status=eq.${status}`
    const { data } = await adminQuery<Invoice[]>(path)
    invoices = data ?? []
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Invoices</h1>
        <p className="mt-0.5 text-sm text-muted">Invoice generation, downloads, and billing records.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see invoice data.</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-1">
        {statusFilters.map((f) => (
          <Link
            key={f.value || 'all'}
            href={`/admin/invoices?${f.value ? `status=${f.value}` : ''}`}
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Invoice ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Period</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Due</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Paid</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">PDF</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No invoices found.' : 'Connect Supabase to see invoices.'}
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{inv.id.slice(0, 8)}…</td>
                  <td className="px-4 py-3">
                    {inv.user_id ? (
                      <Link href={`/admin/users/${inv.user_id}`} className="font-mono text-xs text-emerald hover:underline">
                        {inv.user_id.slice(0, 8)}…
                      </Link>
                    ) : (
                      <span className="text-xs text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground font-medium">
                    {fmtMoney(inv.amount_micros, inv.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge status={inv.status} />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">
                    {inv.period_start && inv.period_end
                      ? `${fmtDate(inv.period_start)} – ${fmtDate(inv.period_end)}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(inv.due_date)}</td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(inv.paid_at)}</td>
                  <td className="px-4 py-3">
                    {inv.pdf_url ? (
                      <a
                        href={inv.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded border border-white/10 px-2 py-1 text-xs text-muted hover:border-emerald/30 hover:text-emerald transition-colors"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-xs text-muted">—</span>
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
