import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'

export const metadata: Metadata = {
  title: 'API Keys — Admin',
}

interface ApiKey {
  id: string
  key_name: string
  key_prefix: string
  key_suffix: string
  environment: string
  status: string
  total_requests: number
  current_month_requests: number
  current_month_tokens: number
  last_used_at: string | null
  created_at: string
  user_id: string
}

type SearchParams = Promise<{ status?: string; env?: string }>

export default async function ApiKeysPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const status = params.status ?? ''
  const env = params.env ?? ''
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let keys: ApiKey[] = []
  if (isConfigured) {
    let path = `api_keys?select=id,key_name,key_prefix,key_suffix,environment,status,total_requests,current_month_requests,current_month_tokens,last_used_at,created_at,user_id&order=created_at.desc&limit=50`
    if (status) path += `&status=eq.${status}`
    if (env) path += `&environment=eq.${env}`
    const { data } = await adminQuery<ApiKey[]>(path)
    keys = data ?? []
  }

  function formatDate(d: string | null) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const statusFilters = ['', 'active', 'disabled', 'expired', 'revoked', 'compromised']
  const envFilters = ['', 'live', 'test']

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">API Keys</h1>
        <p className="mt-0.5 text-sm text-muted">
          Manage API keys. Full key values are never displayed.
        </p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to load API keys.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1">
          {statusFilters.map((f) => (
            <Link
              key={f || 'all'}
              href={`/admin/api-keys?${new URLSearchParams({ status: f, env }).toString()}`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                status === f
                  ? 'bg-emerald/10 text-emerald border border-emerald/20'
                  : 'border border-white/10 text-muted hover:text-foreground'
              }`}
            >
              {f || 'All Status'}
            </Link>
          ))}
        </div>
        <div className="flex gap-1">
          {envFilters.map((f) => (
            <Link
              key={f || 'all-env'}
              href={`/admin/api-keys?${new URLSearchParams({ status, env: f }).toString()}`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                env === f
                  ? 'bg-emerald/10 text-emerald border border-emerald/20'
                  : 'border border-white/10 text-muted hover:text-foreground'
              }`}
            >
              {f || 'All Envs'}
            </Link>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Key Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Key</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Env</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Total Requests</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Monthly Usage</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Last Used</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No API keys found.' : 'Connect Supabase to see API keys.'}
                </td>
              </tr>
            ) : (
              keys.map((key) => (
                <tr key={key.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{key.key_name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {key.key_prefix}…{key.key_suffix}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${key.environment === 'live' ? 'text-emerald' : 'text-sky-400'}`}>
                      {key.environment}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge status={key.status} />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {key.total_requests.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {key.current_month_requests.toLocaleString()} req
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">
                    {formatDate(key.last_used_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button disabled className="rounded border border-white/10 px-2 py-1 text-xs text-muted disabled:opacity-50 disabled:cursor-not-allowed">
                        Disable
                      </button>
                      <button disabled className="rounded border border-red-400/20 px-2 py-1 text-xs text-red-400 disabled:opacity-50 disabled:cursor-not-allowed">
                        Revoke
                      </button>
                    </div>
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
