'use client'

import { useState } from 'react'

export function ApiAppActions({ appId }: { appId: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function act(action: string, reason: string) {
    setLoading(action)
    setError('')
    try {
      const res = await fetch(`/api/admin/api-applications/${appId}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason }),
      })
      const json = await res.json() as { error?: string }
      if (!res.ok) {
        setError(json.error ?? 'Action failed.')
        return
      }
      setDone(true)
      window.location.reload()
    } finally {
      setLoading(null)
    }
  }

  function handleAction(action: string) {
    const reason = prompt(`Reason for ${action} (min 10 chars):`)
    if (!reason || reason.length < 10) {
      alert('Please provide a reason of at least 10 characters.')
      return
    }
    act(action, reason)
  }

  if (done) return <span className="text-xs text-emerald">Done</span>

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <button
          onClick={() => handleAction('approve')}
          disabled={loading !== null}
          className="rounded-lg border border-emerald/20 bg-emerald/5 px-2 py-1 text-xs text-emerald hover:bg-emerald/10 disabled:opacity-50 transition-colors"
        >
          {loading === 'approve' ? '…' : 'Approve'}
        </button>
        <button
          onClick={() => handleAction('reject')}
          disabled={loading !== null}
          className="rounded-lg border border-red-400/20 bg-red-400/5 px-2 py-1 text-xs text-red-400 hover:bg-red-400/10 disabled:opacity-50 transition-colors"
        >
          {loading === 'reject' ? '…' : 'Reject'}
        </button>
        <button
          onClick={() => handleAction('request_more_info')}
          disabled={loading !== null}
          className="rounded-lg border border-white/10 px-2 py-1 text-xs text-muted hover:text-foreground disabled:opacity-50 transition-colors"
        >
          {loading === 'request_more_info' ? '…' : 'More Info'}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
