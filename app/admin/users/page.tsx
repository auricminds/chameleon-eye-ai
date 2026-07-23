import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'
import { SyncAuthButton } from './SyncAuthButton'

export const metadata: Metadata = {
  title: 'Users — Admin',
}

interface PlatformUser {
  id: string
  email: string
  full_name: string | null
  account_status: string
  created_at: string
  last_active_at: string | null
  last_login_at: string | null
  login_count: number
  registration_source: string
}

type SearchParams = Promise<{ q?: string; status?: string; page?: string }>

const PAGE_SIZE = 50

const statusFilters = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'banned', label: 'Banned' },
  { value: 'pending_verification', label: 'Pending' },
  { value: 'locked', label: 'Locked' },
]

export default async function AdminUsersPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const q = params.q ?? ''
  const status = params.status ?? ''
  const page = parseInt(params.page ?? '1', 10)
  const offset = (page - 1) * PAGE_SIZE

  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let users: PlatformUser[] = []
  const totalCount = 0
  let queryError: string | null = null

  if (isConfigured) {
    let path = `platform_users?select=id,email,full_name,account_status,created_at,last_active_at,last_login_at,login_count,registration_source`
    if (status) path += `&account_status=eq.${status}`
    if (q) path += `&or=(email.ilike.*${q}*,full_name.ilike.*${q}*)`
    path += `&order=created_at.desc&limit=${PAGE_SIZE}&offset=${offset}`

    const { data, error } = await adminQuery<PlatformUser[]>(path)
    users = data ?? []
    queryError = error
  }

  function formatDate(d: string | null) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Users</h1>
          <p className="mt-0.5 text-sm text-muted">All platform user accounts.</p>
        </div>
        {isConfigured && <SyncAuthButton />}
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to load user data.</p>
        </div>
      )}

      {queryError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
          <p className="text-sm font-medium text-red-400">Database query error</p>
          <p className="mt-1 text-xs text-red-400/70 font-mono">{queryError}</p>
        </div>
      )}

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <form method="GET" className="flex-1 min-w-48">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name, email, or user ID…"
            className="w-full rounded-lg border border-white/10 bg-panel px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
          />
        </form>
        <div className="flex gap-1">
          {statusFilters.map((f) => (
            <Link
              key={f.value}
              href={`/admin/users?${new URLSearchParams({ q, status: f.value }).toString()}`}
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Source</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Registered</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Last Active</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Logins</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted text-sm">
                  {!isConfigured
                    ? 'Connect Supabase to see users.'
                    : queryError
                    ? 'Query failed — see error above.'
                    : 'No users found. Click "Sync from Auth" to import existing Supabase Auth users.'}
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{user.full_name ?? '(no name)'}</p>
                      <p className="text-xs text-muted font-mono">{user.id.slice(0, 8)}…</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{user.email}</td>
                  <td className="px-4 py-3">
                    <AdminBadge status={user.account_status} />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{user.registration_source}</td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">
                    {formatDate(user.last_active_at)}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{user.login_count}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted hover:border-emerald/30 hover:text-emerald transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {users.length === PAGE_SIZE && (
        <div className="flex justify-end gap-2">
          {page > 1 && (
            <Link
              href={`/admin/users?${new URLSearchParams({ q, status, page: String(page - 1) }).toString()}`}
              className="rounded-lg border border-white/10 bg-panel px-3 py-1.5 text-xs text-muted hover:text-foreground"
            >
              Previous
            </Link>
          )}
          <Link
            href={`/admin/users?${new URLSearchParams({ q, status, page: String(page + 1) }).toString()}`}
            className="rounded-lg border border-white/10 bg-panel px-3 py-1.5 text-xs text-muted hover:text-foreground"
          >
            Next
          </Link>
        </div>
      )}
    </div>
  )
}
