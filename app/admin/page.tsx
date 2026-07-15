import type { Metadata } from 'next'
import { KpiCard } from '@/components/admin/KpiCard'
import { DateFilter } from '@/components/admin/DateFilter'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Dashboard — Admin',
}

const isConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fetchDashboardData() {
  if (!isConfigured) return null

  const [users, apiKeys, plans] = await Promise.all([
    adminQuery<{ count: number }>('platform_users?select=count', {
      headers: { 'Prefer': 'count=exact', 'Range': '0-0' },
    }),
    adminQuery<{ count: number }>('api_keys?status=eq.active&select=count', {
      headers: { 'Prefer': 'count=exact', 'Range': '0-0' },
    }),
    adminQuery<{ count: number }>('api_applications?status=eq.submitted&select=count', {
      headers: { 'Prefer': 'count=exact', 'Range': '0-0' },
    }),
  ])

  return { users, apiKeys, plans }
}

export default async function AdminDashboardPage() {
  const data = await fetchDashboardData()

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted">Platform overview and key metrics.</p>
        </div>
        <DateFilter />
      </div>

      {/* Supabase notice */}
      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">
            <span className="font-semibold">Connect Supabase</span> to see live data. Set{' '}
            <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code className="font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code> in your environment.
          </p>
        </div>
      )}

      {/* KPI grid — Users */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Users</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Total Registered" value={isConfigured ? '—' : '—'} sub="All time" />
          <KpiCard label="New Today" value="—" trend="up" trendLabel="vs yesterday" />
          <KpiCard label="Active Users" value="—" sub="Last 30 days" accent />
          <KpiCard label="Free / Paid / Trial" value="— / — / —" />
          <KpiCard label="Suspended" value="—" />
          <KpiCard label="Banned" value="—" />
        </div>
      </div>

      {/* KPI grid — API */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">API</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="API Accounts" value="—" />
          <KpiCard label="Active API Keys" value="—" accent />
          <KpiCard label="Total AI Requests" value="—" sub="This period" />
          <KpiCard label="Successful Requests" value="—" trend="up" />
          <KpiCard label="Failed Requests" value="—" trend="down" />
          <KpiCard label="Avg Latency" value="— ms" />
        </div>
      </div>

      {/* KPI grid — Tokens */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Tokens</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Input Tokens" value="—" />
          <KpiCard label="Output Tokens" value="—" />
          <KpiCard label="Total Tokens" value="—" accent />
          <KpiCard label="Cached Tokens" value="—" />
          <KpiCard label="Provider Cost" value="$—" />
          <KpiCard label="Gross Margin" value="—%" />
        </div>
      </div>

      {/* KPI grid — Revenue */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Revenue</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="MRR" value="$—" accent />
          <KpiCard label="Revenue Today" value="$—" />
          <KpiCard label="Revenue This Month" value="$—" />
          <KpiCard label="Failed Payments" value="—" />
          <KpiCard label="Upcoming Renewals" value="—" sub="Next 7 days" />
          <KpiCard label="Gross Profit" value="$—" />
        </div>
      </div>

      {/* Attention panel */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">
          Attention Required
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'Failed payments', value: '—', color: 'text-red-400', bg: 'bg-red-400/5 border-red-400/20' },
            { label: 'Expiring subscriptions (7d)', value: '—', color: 'text-amber-400', bg: 'bg-amber-400/5 border-amber-400/20' },
            { label: 'API applications pending', value: '—', color: 'text-amber-400', bg: 'bg-amber-400/5 border-amber-400/20' },
            { label: 'Open critical tickets', value: '—', color: 'text-red-400', bg: 'bg-red-400/5 border-red-400/20' },
            { label: 'Security alerts', value: '—', color: 'text-red-400', bg: 'bg-red-400/5 border-red-400/20' },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl border p-4 ${item.bg}`}>
              <p className="text-xs text-muted">{item.label}</p>
              <p className={`mt-1 text-2xl font-semibold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
