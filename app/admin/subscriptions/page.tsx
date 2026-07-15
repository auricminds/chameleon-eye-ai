import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Subscriptions — Admin',
}

interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: string
  billing_cycle: string
  start_date: string | null
  next_renewal_date: string | null
  current_period_end: string | null
  included_tokens: number
  used_tokens: number
  auto_renewal: boolean
  created_at: string
}

type SearchParams = Promise<{ status?: string; cycle?: string }>

const statusFilters = [
  { value: '', label: 'All' },
  { value: 'trialing', label: 'Trialing' },
  { value: 'active', label: 'Active' },
  { value: 'past_due', label: 'Past Due' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'paused', label: 'Paused' },
  { value: 'cancel_at_period_end', label: 'Cancelling' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'expired', label: 'Expired' },
]

export default async function SubscriptionsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const status = params.status ?? ''
  const cycle = params.cycle ?? ''
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let subscriptions: Subscription[] = []
  let renewingToday = 0
  let renewingWeek = 0
  let renewingMonth = 0

  if (isConfigured) {
    let path = `subscriptions?order=created_at.desc&limit=50`
    if (status) path += `&status=eq.${status}`
    if (cycle) path += `&billing_cycle=eq.${cycle}`
    const { data } = await adminQuery<Subscription[]>(path)
    subscriptions = data ?? []
  }

  function formatDate(d: string | null) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  function tokenUsagePct(used: number, included: number) {
    if (included === 0) return 0
    return Math.min(100, Math.round((used / included) * 100))
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Subscriptions</h1>
        <p className="mt-0.5 text-sm text-muted">Monitor all customer subscriptions and renewals.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to load subscription data.</p>
        </div>
      )}

      {/* Renewal monitoring */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Renewals Today', value: renewingToday || '—', color: 'border-emerald/20' },
          { label: 'Renewals — Next 7 Days', value: renewingWeek || '—', color: 'border-white/8' },
          { label: 'Renewals — Next 30 Days', value: renewingMonth || '—', color: 'border-white/8' },
        ].map((item) => (
          <div key={item.label} className={`rounded-xl border ${item.color} bg-panel p-4`}>
            <p className="text-xs text-muted">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1">
        {statusFilters.map((f) => (
          <Link
            key={f.value || 'all'}
            href={`/admin/subscriptions?${new URLSearchParams({ status: f.value, cycle }).toString()}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              status === f.value
                ? 'bg-emerald/10 text-emerald border border-emerald/20'
                : 'border border-white/10 text-muted hover:text-foreground'
            }`}
          >
            {f.label}
          </Link>
        ))}
        <div className="ml-2 flex gap-1">
          {['', 'monthly', 'annual'].map((c) => (
            <Link
              key={c || 'all-cycle'}
              href={`/admin/subscriptions?${new URLSearchParams({ status, cycle: c }).toString()}`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                cycle === c
                  ? 'bg-emerald/10 text-emerald border border-emerald/20'
                  : 'border border-white/10 text-muted hover:text-foreground'
              }`}
            >
              {c || 'All Cycles'}
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">User ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Billing</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Start</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Next Renewal</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Token Usage</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Auto</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No subscriptions found.' : 'Connect Supabase to see subscriptions.'}
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => {
                const pct = tokenUsagePct(sub.used_tokens, sub.included_tokens)
                return (
                  <tr key={sub.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/users/${sub.user_id}`} className="font-mono text-xs text-emerald hover:underline">
                        {sub.user_id.slice(0, 8)}…
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <AdminBadge status={sub.status} />
                    </td>
                    <td className="px-4 py-3 text-muted text-xs capitalize">{sub.billing_cycle}</td>
                    <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{formatDate(sub.start_date)}</td>
                    <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{formatDate(sub.next_renewal_date)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full ${pct > 90 ? 'bg-red-400' : pct > 70 ? 'bg-amber-400' : 'bg-emerald'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${sub.auto_renewal ? 'text-emerald' : 'text-muted'}`}>
                        {sub.auto_renewal ? 'On' : 'Off'}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
