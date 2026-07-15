import type { Metadata } from 'next'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'
import { getAdminSession } from '@/lib/admin/auth'
import { AdminUsersClient } from './AdminUsersClient'

export const metadata: Metadata = {
  title: 'Admin Users — Admin',
}

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  is_active: boolean
  mfa_enabled: boolean
  last_login_at: string | null
  login_count: number
  created_at: string
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function AdminUsersPage() {
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  const session = await getAdminSession()
  const isSuperAdmin = session?.role === 'super_admin'

  let adminUsers: AdminUser[] = []
  if (isConfigured) {
    const { data } = await adminQuery<AdminUser[]>(
      `admin_users?select=id,email,full_name,role,is_active,mfa_enabled,last_login_at,login_count,created_at&order=created_at.asc`
    )
    adminUsers = data ?? []
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Admin Users</h1>
          <p className="mt-0.5 text-sm text-muted">Admin account management, role assignments, and MFA enforcement.</p>
        </div>
        {isSuperAdmin && isConfigured ? (
          <AdminUsersClient showInvite />
        ) : (
          <button
            disabled
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted disabled:opacity-50 disabled:cursor-not-allowed"
            title={!isSuperAdmin ? 'Requires super_admin role' : 'Connect Supabase'}
          >
            + Invite Admin
          </button>
        )}
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to see admin users.</p>
        </div>
      )}

      {!isSuperAdmin && isConfigured && (
        <div className="rounded-xl border border-white/8 bg-panel px-4 py-3">
          <p className="text-sm text-muted">Admin user management requires the <code className="font-mono text-xs text-emerald">super_admin</code> role.</p>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Active</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">MFA</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Last Login</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Logins</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Created</th>
              {isSuperAdmin && <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {adminUsers.length === 0 ? (
              <tr>
                <td colSpan={isSuperAdmin ? 9 : 8} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No admin users found.' : 'Connect Supabase to see admin users.'}
                </td>
              </tr>
            ) : (
              adminUsers.map((u) => (
                <tr key={u.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{u.full_name}</td>
                  <td className="px-4 py-3 text-muted text-xs">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald/10 border border-emerald/20 px-2 py-0.5 text-xs font-medium text-emerald capitalize">
                      {u.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge status={u.is_active ? 'active' : 'disabled'} />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${u.mfa_enabled ? 'text-emerald' : 'text-muted'}`}>
                      {u.mfa_enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(u.last_login_at)}</td>
                  <td className="px-4 py-3 text-muted text-xs">{u.login_count}</td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(u.created_at)}</td>
                  {isSuperAdmin && (
                    <td className="px-4 py-3">
                      <AdminUserActions adminId={u.id} isActive={u.is_active} currentRole={u.role} />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminUserActions({ adminId, isActive, currentRole }: { adminId: string; isActive: boolean; currentRole: string }) {
  return (
    <div className="flex gap-1">
      <form action={`/api/admin/admin-users/${adminId}/actions`} method="POST">
        <input type="hidden" name="action" value={isActive ? 'deactivate' : 'reactivate'} />
        <button
          type="submit"
          className={`rounded border px-2 py-1 text-xs transition-colors ${
            isActive
              ? 'border-red-400/20 text-red-400 hover:bg-red-400/10'
              : 'border-emerald/20 text-emerald hover:bg-emerald/10'
          }`}
        >
          {isActive ? 'Deactivate' : 'Reactivate'}
        </button>
      </form>
    </div>
  )
}
