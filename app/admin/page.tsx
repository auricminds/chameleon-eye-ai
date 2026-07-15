import type { Metadata } from 'next'
import Link from 'next/link'
import { KpiCard } from '@/components/admin/KpiCard'
import { countQuery } from '@/lib/admin/queries'

export const metadata: Metadata = {
  title: 'Dashboard — Admin',
}

const isConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fetchDashboardData() {
  if (!isConfigured) {
    return {
      totalUsers: 0, activeUsers: 0, suspendedUsers: 0, bannedUsers: 0,
      trialUsers: 0, activeSubscriptions: 0, pastDueSubscriptions: 0,
      pendingApiApps: 0, activeApiKeys: 0,
      totalRequests: 0, successRequests: 0, failedRequests: 0,
      failedPayments: 0,
    }
  }

  const [
    totalUsers, activeUsers, suspendedUsers, bannedUsers, trialUsers,
    activeSubscriptions, pastDueSubscriptions,
    pendingApiApps, activeApiKeys,
    totalRequests, successRequests, failedRequests,
    failedPayments,
  ] = await Promise.all([
    countQuery('platform_users'),
    countQuery('platform_users', 'account_status=eq.active'),
    countQuery('platform_users', 'account_status=eq.suspended'),
    countQuery('platform_users', 'account_status=eq.banned'),
    countQuery('subscriptions', 'status=eq.trialing'),
    countQuery('subscriptions', 'status=eq.active'),
    countQuery('subscriptions', 'status=eq.past_due'),
    countQuery('api_applications', 'status=eq.submitted'),
    countQuery('api_keys', 'status=eq.active'),
    countQuery('ai_usage_logs'),
    countQuery('ai_usage_logs', 'request_status=eq.success'),
    countQuery('ai_usage_logs', 'request_status=eq.error'),
    countQuery('payments', 'status=eq.failed'),
  ])

  return {
    totalUsers, activeUsers, suspendedUsers, bannedUsers, trialUsers,
    activeSubscriptions, pastDueSubscriptions,
    pendingApiApps, activeApiKeys,
    totalRequests, successRequests, failedRequests,
    failedPayments,
  }
}

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

export default async function AdminDashboardPage() {
  const d = await fetchDashboardData()

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted">Platform overview and key metrics.</p>
        </div>
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
          <KpiCard label="Total Registered" value={fmt(d.totalUsers)} sub="All time" />
          <KpiCard label="Active" value={fmt(d.activeUsers)} accent />
          <KpiCard label="Trialing" value={fmt(d.trialUsers)} sub="Free trial" />
          <KpiCard label="Suspended" value={fmt(d.suspendedUsers)} />
          <KpiCard label="Banned" value={fmt(d.bannedUsers)} />
          <KpiCard label="API Keys Active" value={fmt(d.activeApiKeys)} />
        </div>
      </div>

      {/* KPI grid — Subscriptions */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">Subscriptions</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <KpiCard label="Active Subscriptions" value={fmt(d.activeSubscriptions)} accent />
          <KpiCard label="Past Due" value={fmt(d.pastDueSubscriptions)} />
          <KpiCard label="Pending API Apps" value={fmt(d.pendingApiApps)} />
          <KpiCard label="Failed Payments" value={fmt(d.failedPayments)} />
        </div>
      </div>

      {/* KPI grid — AI Requests */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">AI Requests (All Time)</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <KpiCard label="Total Requests" value={fmt(d.totalRequests)} accent />
          <KpiCard label="Successful" value={fmt(d.successRequests)} trend="up" />
          <KpiCard label="Failed" value={fmt(d.failedRequests)} trend={d.failedRequests > 0 ? 'down' : 'neutral'} />
        </div>
      </div>

      {/* Attention panel */}
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.12em] uppercase text-muted/60">
          Attention Required
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/payments?status=failed" className="block rounded-xl border border-red-400/20 bg-red-400/5 p-4 hover:bg-red-400/10 transition-colors">
            <p className="text-xs text-muted">Failed payments</p>
            <p className="mt-1 text-2xl font-semibold text-red-400">{d.failedPayments}</p>
          </Link>
          <Link href="/admin/subscriptions?status=past_due" className="block rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 hover:bg-amber-400/10 transition-colors">
            <p className="text-xs text-muted">Past due subscriptions</p>
            <p className="mt-1 text-2xl font-semibold text-amber-400">{d.pastDueSubscriptions}</p>
          </Link>
          <Link href="/admin/api-applications?status=submitted" className="block rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 hover:bg-amber-400/10 transition-colors">
            <p className="text-xs text-muted">API applications pending</p>
            <p className="mt-1 text-2xl font-semibold text-amber-400">{d.pendingApiApps}</p>
          </Link>
          <Link href="/admin/users?status=suspended" className="block rounded-xl border border-white/8 bg-panel p-4 hover:bg-white/4 transition-colors">
            <p className="text-xs text-muted">Suspended accounts</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{d.suspendedUsers}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
