import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'User Detail — Admin',
}

interface PlatformUser {
  id: string
  auth_user_id: string | null
  email: string
  full_name: string | null
  phone: string | null
  company: string | null
  country: string | null
  timezone: string | null
  language: string
  registration_source: string
  referral_source: string | null
  account_status: string
  email_verified: boolean
  email_verified_at: string | null
  last_login_at: string | null
  last_active_at: string | null
  login_count: number
  suspension_reason: string | null
  ban_reason: string | null
  suspension_ends_at: string | null
  internal_notes: string | null
  created_at: string
  updated_at: string
}

interface Subscription {
  id: string
  status: string
  billing_cycle: string
  start_date: string | null
  trial_end_date: string | null
  current_period_start: string | null
  current_period_end: string | null
  next_renewal_date: string | null
  included_tokens: number
  used_tokens: number
  auto_renewal: boolean
  payment_provider: string | null
  plan_id: string
}

type Params = Promise<{ userId: string }>

function formatDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-white/5 last:border-0">
      <dt className="w-44 shrink-0 text-xs font-medium text-muted">{label}</dt>
      <dd className="flex-1 text-sm text-foreground">{value ?? '—'}</dd>
    </div>
  )
}

export default async function UserDetailPage({ params }: { params: Params }) {
  const { userId } = await params
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let user: PlatformUser | null = null
  let subscriptions: Subscription[] = []
  let apiKeysCount = 0

  if (isConfigured) {
    const { data } = await adminQuery<PlatformUser[]>(
      `platform_users?id=eq.${userId}&limit=1`
    )
    if (!data || data.length === 0) notFound()
    user = data[0]

    const [subData, keysData] = await Promise.all([
      adminQuery<Subscription[]>(`subscriptions?user_id=eq.${userId}&order=created_at.desc&limit=5`),
      adminQuery<{ count: number }>(`api_keys?user_id=eq.${userId}&select=count`, {
        headers: { 'Prefer': 'count=exact', 'Range': '0-0' },
      }),
    ])
    subscriptions = subData.data ?? []
    apiKeysCount = 0
  }

  const tabs = ['Account', 'Subscription', 'Usage', 'Payments', 'API', 'Security', 'Support']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-semibold text-foreground">
              {user?.full_name ?? user?.email ?? userId}
            </h1>
            {user && <AdminBadge status={user.account_status} />}
          </div>
          <p className="text-sm text-muted font-mono">{userId}</p>
        </div>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to load user data.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Account section */}
          <div className="rounded-xl border border-white/8 bg-panel p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Account Information</h2>
            {user ? (
              <dl>
                <DetailRow label="Full name" value={user.full_name} />
                <DetailRow label="Email" value={user.email} />
                <DetailRow label="User ID" value={<span className="font-mono text-xs">{user.id}</span>} />
                <DetailRow label="Auth user ID" value={user.auth_user_id ? <span className="font-mono text-xs">{user.auth_user_id}</span> : '—'} />
                <DetailRow label="Phone" value={user.phone} />
                <DetailRow label="Company" value={user.company} />
                <DetailRow label="Country" value={user.country} />
                <DetailRow label="Timezone" value={user.timezone} />
                <DetailRow label="Language" value={user.language} />
                <DetailRow label="Registration source" value={user.registration_source} />
                <DetailRow label="Referral source" value={user.referral_source} />
                <DetailRow label="Registered" value={formatDate(user.created_at)} />
                <DetailRow label="Last login" value={formatDate(user.last_login_at)} />
                <DetailRow label="Last active" value={formatDate(user.last_active_at)} />
                <DetailRow label="Login count" value={user.login_count} />
                <DetailRow label="Email verified" value={
                  <span className={user.email_verified ? 'text-emerald' : 'text-amber-400'}>
                    {user.email_verified ? `Yes — ${formatDate(user.email_verified_at)}` : 'No'}
                  </span>
                } />
                <DetailRow label="Account status" value={<AdminBadge status={user.account_status} />} />
                {user.suspension_reason && (
                  <DetailRow label="Suspension reason" value={<span className="text-amber-400">{user.suspension_reason}</span>} />
                )}
                {user.suspension_ends_at && (
                  <DetailRow label="Suspension ends" value={formatDate(user.suspension_ends_at)} />
                )}
                {user.ban_reason && (
                  <DetailRow label="Ban reason" value={<span className="text-red-400">{user.ban_reason}</span>} />
                )}
                {user.internal_notes && (
                  <DetailRow label="Internal notes" value={
                    <span className="whitespace-pre-wrap text-xs text-muted">{user.internal_notes}</span>
                  } />
                )}
              </dl>
            ) : (
              <p className="text-sm text-muted">No user data available.</p>
            )}
          </div>

          {/* Subscription section */}
          <div className="rounded-xl border border-white/8 bg-panel p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Subscriptions</h2>
            {subscriptions.length === 0 ? (
              <p className="text-sm text-muted">No subscriptions found.</p>
            ) : (
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="rounded-lg border border-white/8 bg-background p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Subscription</span>
                      <AdminBadge status={sub.status} />
                    </div>
                    <dl className="space-y-1">
                      <div className="flex gap-4">
                        <dt className="w-36 text-xs text-muted">Billing cycle</dt>
                        <dd className="text-xs text-foreground capitalize">{sub.billing_cycle}</dd>
                      </div>
                      <div className="flex gap-4">
                        <dt className="w-36 text-xs text-muted">Period</dt>
                        <dd className="text-xs text-foreground">
                          {sub.current_period_start} – {sub.current_period_end}
                        </dd>
                      </div>
                      <div className="flex gap-4">
                        <dt className="w-36 text-xs text-muted">Next renewal</dt>
                        <dd className="text-xs text-foreground">{sub.next_renewal_date ?? '—'}</dd>
                      </div>
                      <div className="flex gap-4">
                        <dt className="w-36 text-xs text-muted">Token usage</dt>
                        <dd className="text-xs text-foreground">
                          {sub.used_tokens.toLocaleString()} / {sub.included_tokens.toLocaleString()}
                        </dd>
                      </div>
                      <div className="flex gap-4">
                        <dt className="w-36 text-xs text-muted">Auto renewal</dt>
                        <dd className={`text-xs ${sub.auto_renewal ? 'text-emerald' : 'text-muted'}`}>
                          {sub.auto_renewal ? 'On' : 'Off'}
                        </dd>
                      </div>
                      <div className="flex gap-4">
                        <dt className="w-36 text-xs text-muted">Payment provider</dt>
                        <dd className="text-xs text-foreground">{sub.payment_provider ?? '—'}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Usage section */}
          <div className="rounded-xl border border-white/8 bg-panel p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Usage</h2>
            <p className="text-sm text-muted">Usage data will load when Supabase is connected.</p>
          </div>

          {/* Payments section */}
          <div className="rounded-xl border border-white/8 bg-panel p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Payments</h2>
            <p className="text-sm text-muted">Payment history will load when Supabase is connected.</p>
          </div>

          {/* API section */}
          <div className="rounded-xl border border-white/8 bg-panel p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">API Keys</h2>
            <p className="text-sm text-muted">
              {apiKeysCount > 0
                ? `${apiKeysCount} active key(s). Full key values are never displayed — only prefix and last 4 chars.`
                : 'No API keys found.'}
            </p>
          </div>

          {/* Security section */}
          <div className="rounded-xl border border-white/8 bg-panel p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Security</h2>
            <p className="text-sm text-muted">Security event log will load when Supabase is connected.</p>
          </div>

          {/* Support section */}
          <div className="rounded-xl border border-white/8 bg-panel p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Support</h2>
            <p className="text-sm text-muted">Support ticket history will load when Supabase is connected.</p>
          </div>
        </div>

        {/* Admin Actions sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/8 bg-panel p-4">
            <h2 className="text-sm font-semibold text-foreground mb-3">Admin Actions</h2>
            <p className="text-xs text-muted mb-3">
              All actions require a written reason and are logged to the audit trail.
            </p>
            <div className="space-y-1.5">
              {[
                { label: 'Suspend Account', action: 'suspend', danger: true },
                { label: 'Reactivate Account', action: 'reactivate' },
                { label: 'Ban User', action: 'ban', danger: true },
                { label: 'Remove Ban', action: 'remove_ban' },
                { label: 'Lock Temporarily', action: 'lock', danger: true },
                null, // divider
                { label: 'Send Password Reset', action: 'send_password_reset' },
                { label: 'Send Email Verification', action: 'send_email_verification' },
                { label: 'End All Sessions', action: 'end_sessions', danger: true },
                { label: 'Revoke All API Keys', action: 'revoke_api_keys', danger: true },
                null,
                { label: 'Add Promotional Credits', action: 'add_credits' },
                { label: 'Change Subscription Plan', action: 'change_plan' },
                { label: 'Cancel Subscription', action: 'cancel_subscription', danger: true },
                null,
                { label: 'Add Internal Note', action: 'add_note' },
                { label: 'Export User Data', action: 'export_data' },
              ].map((item, i) => {
                if (item === null) {
                  return <div key={i} className="my-2 border-t border-white/8" />
                }
                return (
                  <button
                    key={item.action}
                    disabled
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                      item.danger
                        ? 'border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10'
                        : 'border border-white/8 bg-white/3 text-muted hover:border-emerald/20 hover:text-foreground'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title="Actions require Supabase to be connected"
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-muted/60">
              Actions are disabled until Supabase is connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
