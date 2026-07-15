'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: '▦' },
    ],
  },
  {
    label: 'Users & Access',
    items: [
      { href: '/admin/users', label: 'Users', icon: '◎' },
      { href: '/admin/api-applications', label: 'API Applications', icon: '◈' },
      { href: '/admin/api-keys', label: 'API Keys', icon: '⬡' },
    ],
  },
  {
    label: 'Billing',
    items: [
      { href: '/admin/plans', label: 'Plans', icon: '◇' },
      { href: '/admin/subscriptions', label: 'Subscriptions', icon: '↻' },
      { href: '/admin/payments', label: 'Payments', icon: '$' },
      { href: '/admin/invoices', label: 'Invoices', icon: '▤' },
      { href: '/admin/credits', label: 'Credits', icon: '◈' },
      { href: '/admin/promotions', label: 'Promotions', icon: '%' },
    ],
  },
  {
    label: 'AI Platform',
    items: [
      { href: '/admin/usage', label: 'Usage', icon: '▲' },
      { href: '/admin/requests', label: 'Requests', icon: '→' },
      { href: '/admin/models', label: 'Models', icon: '◆' },
      { href: '/admin/providers', label: 'Providers', icon: '⬢' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/admin/support', label: 'Support', icon: '?' },
      { href: '/admin/notifications', label: 'Notifications', icon: '🔔' },
      { href: '/admin/jobs', label: 'Jobs', icon: '⚙' },
      { href: '/admin/system-health', label: 'System Health', icon: '♥' },
    ],
  },
  {
    label: 'Security & Compliance',
    items: [
      { href: '/admin/security', label: 'Security', icon: '⬡' },
      { href: '/admin/audit-logs', label: 'Audit Logs', icon: '▤' },
      { href: '/admin/feature-flags', label: 'Feature Flags', icon: '⚑' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { href: '/admin/admin-users', label: 'Admin Users', icon: '◉' },
      { href: '/admin/settings', label: 'Settings', icon: '⚙' },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-white/8 bg-panel">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-white/8 px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald/10 border border-emerald/20">
          <span className="text-emerald text-xs font-bold">C</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground leading-tight">Chameleon Eye AI</p>
          <p className="text-[10px] text-muted leading-tight">Admin</p>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 py-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            <p className="px-4 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-muted/60">
              {group.label}
            </p>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? 'bg-emerald/10 text-emerald border-r-2 border-emerald'
                    : 'text-muted hover:bg-white/4 hover:text-foreground'
                }`}
              >
                <span className="w-4 text-center text-xs opacity-60">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
