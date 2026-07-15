'use client'

export function AdminUsersClient({ showInvite }: { showInvite?: boolean }) {
  if (!showInvite) return null
  // Invite flow: direct to the API creation form
  // For now, show a link to the API — full invite UI would be a separate modal
  return (
    <a
      href="/api/admin/admin-users"
      className="rounded-full bg-emerald/10 border border-emerald/20 text-emerald px-4 py-2 text-sm font-medium hover:bg-emerald/20 transition-colors"
      onClick={(e) => {
        e.preventDefault()
        const email = prompt('New admin email:')
        const fullName = prompt('Full name:')
        const role = prompt('Role (super_admin, operations_admin, finance_admin, support_admin, developer_admin, security_admin, analyst, read_only_admin):')
        const password = prompt('Temporary password (min 12 chars):')
        if (!email || !fullName || !role || !password) return
        fetch('/api/admin/admin-users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, full_name: fullName, role, password }),
        }).then(r => r.json()).then((d: { error?: string }) => {
          if (d.error) alert('Error: ' + d.error)
          else { alert('Admin user created.'); window.location.reload() }
        }).catch(() => alert('Request failed.'))
      }}
    >
      + Invite Admin
    </a>
  )
}
