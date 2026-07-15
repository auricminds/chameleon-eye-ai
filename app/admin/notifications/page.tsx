'use client'

import { useState, useEffect } from 'react'

interface AdminNotification {
  id: string
  type: string
  title: string
  body: string | null
  is_read: boolean
  created_at: string
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/notifications')
      .then(r => r.json())
      .then((d: { data?: AdminNotification[]; error?: string }) => {
        if (d.error) setError(d.error)
        else setNotifications(d.data ?? [])
      })
      .catch(() => setError('Failed to load notifications.'))
      .finally(() => setLoading(false))
  }, [])

  async function markRead(id: string) {
    const res = await fetch(`/api/admin/notifications`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    }
  }

  async function markAllRead() {
    const unread = notifications.filter(n => !n.is_read)
    await Promise.all(unread.map(n => markRead(n.id)))
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
          <p className="mt-0.5 text-sm text-muted">System notifications and alerts for your admin account.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            Mark all read ({unreadCount})
          </button>
        )}
      </div>

      {loading && (
        <div className="rounded-xl border border-white/8 bg-panel px-4 py-8 text-center">
          <p className="text-sm text-muted">Loading notifications…</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="rounded-xl border border-white/8 bg-panel px-4 py-10 text-center">
              <p className="text-sm text-muted">No notifications found.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`rounded-xl border p-4 transition-colors ${
                  n.is_read
                    ? 'border-white/8 bg-panel'
                    : 'border-emerald/20 bg-emerald/5'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted capitalize">{n.type.replace(/_/g, ' ')}</span>
                      {!n.is_read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                      )}
                    </div>
                    <p className={`text-sm font-medium ${n.is_read ? 'text-muted' : 'text-foreground'}`}>{n.title}</p>
                    {n.body && <p className="mt-0.5 text-xs text-muted">{n.body}</p>}
                    <p className="mt-1 text-xs text-muted/60">{fmtDate(n.created_at)}</p>
                  </div>
                  {!n.is_read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="rounded border border-white/10 px-2 py-1 text-xs text-muted hover:text-foreground transition-colors shrink-0"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
