import type { Metadata } from 'next'
import Link from 'next/link'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Credits — Admin',
}

interface LedgerEntry {
  id: string
  user_id: string
  entry_type: string
  credit_amount: number
  debit_amount: number
  balance_after: number
  reason: string | null
  admin_reason: string | null
  created_at: string
}

type SearchParams = Promise<{ entry_type?: string }>

const entryTypes = [
  { value: '', label: 'All' },
  { value: 'admin_adjustment', label: 'Admin Adjustment' },
  { value: 'plan_allocation', label: 'Plan Allocation' },
  { value: 'monthly_renewal', label: 'Monthly Renewal' },
  { value: 'purchased_credits', label: 'Purchased' },
  { value: 'promotional_credits', label: 'Promotional' },
  { value: 'usage_deduction', label: 'Usage Deduction' },
  { value: 'refund_reversal', label: 'Refund Reversal' },
  { value: 'expiration', label: 'Expiration' },
]

function fmtTokens(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function CreditsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const entryType = params.entry_type ?? ''
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let entries: LedgerEntry[] = []
  if (isConfigured) {
    let path = `token_ledger?select=id,user_id,entry_type,credit_amount,debit_amount,balance_after,reason,admin_reason,created_at&order=created_at.desc&limit=50`
    if (entryType) path += `&entry_type=eq.${entryType}`
    const { data } = await adminQuery<LedgerEntry[]>(path)
    entries = data ?? []
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Credits</h1>
          <p className="mt-0.5 text-sm text-muted">Token credit ledger, adjustments, and expiration management.</p>
        </div>
        {isConfigured && (
          <AddCreditButton />
        )}
        {!isConfigured && (
          <button
            disabled
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted disabled:opacity-50 disabled:cursor-not-allowed"
            title="Connect Supabase to add credits"
          >
            + Add Credit Adjustment
          </button>
        )}
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see credit ledger data.</p>
        </div>
      )}

      {/* Entry type filter */}
      <div className="flex flex-wrap gap-1">
        {entryTypes.map((f) => (
          <Link
            key={f.value || 'all'}
            href={`/admin/credits?${f.value ? `entry_type=${f.value}` : ''}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              entryType === f.value
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Credit</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Debit</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Balance After</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Reason</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No ledger entries found.' : 'Connect Supabase to see the credit ledger.'}
                </td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${e.user_id}`} className="font-mono text-xs text-emerald hover:underline">
                      {e.user_id.slice(0, 8)}…
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs capitalize">
                    {e.entry_type.replace(/_/g, ' ')}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {e.credit_amount > 0 ? (
                      <span className="text-emerald">+{fmtTokens(e.credit_amount)}</span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {e.debit_amount > 0 ? (
                      <span className="text-red-400">-{fmtTokens(e.debit_amount)}</span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-foreground text-xs font-medium">{fmtTokens(e.balance_after)}</td>
                  <td className="px-4 py-3 text-muted text-xs max-w-48 truncate">
                    {e.admin_reason ?? e.reason ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(e.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AddCreditButton() {
  return (
    <a
      href="/admin/credits/add"
      className="rounded-full bg-emerald/10 border border-emerald/20 text-emerald px-4 py-2 text-sm font-medium hover:bg-emerald/20 transition-colors"
    >
      + Add Credit Adjustment
    </a>
  )
}
