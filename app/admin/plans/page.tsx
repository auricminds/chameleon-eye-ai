import type { Metadata } from 'next'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'Subscription Plans — Admin',
}

interface SubscriptionPlan {
  id: string
  internal_name: string
  public_name: string
  description: string | null
  status: string
  monthly_price_micros: number
  annual_price_micros: number
  currency: string
  monthly_tokens: number
  api_access: boolean
  api_key_count: number
  team_seats: number
  support_level: string
  created_at: string
}

export default async function PlansPage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let plans: SubscriptionPlan[] = []
  if (isConfigured) {
    const { data } = await adminQuery<SubscriptionPlan[]>(
      `subscription_plans?order=created_at.asc`
    )
    plans = data ?? []
  }

  function formatPrice(micros: number, currency: string) {
    return `$${(micros / 1_000_000).toFixed(2)} ${currency}`
  }

  function formatTokens(tokens: number) {
    if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`
    if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(0)}K`
    return tokens.toString()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Subscription Plans</h1>
          <p className="mt-0.5 text-sm text-muted">Manage pricing plans and feature entitlements.</p>
        </div>
        <button
          disabled
          className="rounded-full bg-emerald/10 border border-emerald/20 text-emerald px-4 py-2 text-sm font-medium hover:bg-emerald/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Connect Supabase to create plans"
        >
          + Create Plan
        </button>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to load subscription plans.</p>
        </div>
      )}

      {plans.length === 0 && isConfigured && (
        <p className="text-sm text-muted">No plans configured yet.</p>
      )}

      {!isConfigured && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Free', 'Pro', 'Business', 'Enterprise'].map((name) => (
            <div key={name} className="rounded-xl border border-white/8 bg-panel p-5 opacity-40">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{name}</h3>
                  <p className="text-xs text-muted mt-0.5">—</p>
                </div>
                <AdminBadge status="draft" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Monthly</span>
                  <span className="text-foreground">$—</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Annual</span>
                  <span className="text-foreground">$—</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Monthly tokens</span>
                  <span className="text-foreground">—</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">API access</span>
                  <span className="text-muted">—</span>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                <button disabled className="rounded border border-white/10 px-2 py-1 text-xs text-muted disabled:opacity-50 disabled:cursor-not-allowed">Edit</button>
                <button disabled className="rounded border border-white/10 px-2 py-1 text-xs text-muted disabled:opacity-50 disabled:cursor-not-allowed">Duplicate</button>
                <button disabled className="rounded border border-white/10 px-2 py-1 text-xs text-muted disabled:opacity-50 disabled:cursor-not-allowed">Archive</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {plans.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="rounded-xl border border-white/8 bg-panel p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{plan.public_name}</h3>
                  <p className="text-xs text-muted mt-0.5">{plan.description ?? plan.internal_name}</p>
                </div>
                <AdminBadge status={plan.status} />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Monthly</span>
                  <span className="text-foreground">{formatPrice(plan.monthly_price_micros, plan.currency)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Annual</span>
                  <span className="text-foreground">{formatPrice(plan.annual_price_micros, plan.currency)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Monthly tokens</span>
                  <span className="text-foreground">{formatTokens(plan.monthly_tokens)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">API access</span>
                  <span className={plan.api_access ? 'text-emerald' : 'text-muted'}>
                    {plan.api_access ? `Yes (${plan.api_key_count} keys)` : 'No'}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Team seats</span>
                  <span className="text-foreground">{plan.team_seats}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Support</span>
                  <span className="text-foreground capitalize">{plan.support_level}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                <button disabled className="rounded border border-white/10 px-2 py-1 text-xs text-muted disabled:opacity-50 disabled:cursor-not-allowed">Edit</button>
                <button disabled className="rounded border border-white/10 px-2 py-1 text-xs text-muted disabled:opacity-50 disabled:cursor-not-allowed">Duplicate</button>
                <button disabled className="rounded border border-white/10 px-2 py-1 text-xs text-muted disabled:opacity-50 disabled:cursor-not-allowed">Archive</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
