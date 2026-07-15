'use client'

import type { AdminSession } from '@/lib/admin/auth'

interface AdminHeaderProps {
  session: AdminSession
}

export function AdminHeader({ session }: AdminHeaderProps) {
  async function handleSignOut() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const roleLabel = session.role.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/8 bg-panel px-6">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted">Admin Control Center</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">{session.fullName}</span>
          <span className="rounded-full bg-emerald/10 border border-emerald/20 px-2 py-0.5 text-xs font-medium text-emerald">
            {roleLabel}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-400 transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
