'use client'

import { useState } from 'react'

export function ApiKeyActions({ keyId, currentStatus }: { keyId: string; currentStatus: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState(currentStatus)

  async function act(action: string, reason: string) {
    setLoading(action)
    setError('')
    try {
      const res = await fetch(`/api/admin/api-keys/${keyId}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason }),
      })
      const json = await res.json() as { error?: string }
      if (!res.ok) {
        setError(json.error ?? 'Action failed.')
        return
      }
      if (action === 'disable') setStatus('disabled')
      else if (action === 'enable') setStatus('active')
      else if (action === 'revoke') setStatus('revoked')
      else if (action === 'mark_compromised') setStatus('compromised')
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

  if (status === 'revoked' || status === 'compromised') {
    return <span className="text-xs text-muted capitalize">{status}</span>
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {status === 'active' && (
          <button
            onClick={() => handleAction('disable')}
            disabled={loading !== null}
            className="rounded border border-white/10 px-2 py-1 text-xs text-muted hover:text-foreground disabled:opacity-50 transition-colors"
          >
            {loading === 'disable' ? '…' : 'Disable'}
          </button>
        )}
        {status === 'disabled' && (
          <button
            onClick={() => handleAction('enable')}
            disabled={loading !== null}
            className="rounded border border-emerald/20 px-2 py-1 text-xs text-emerald hover:bg-emerald/10 disabled:opacity-50 transition-colors"
          >
            {loading === 'enable' ? '…' : 'Enable'}
          </button>
        )}
        <button
          onClick={() => handleAction('revoke')}
          disabled={loading !== null}
          className="rounded border border-red-400/20 px-2 py-1 text-xs text-red-400 hover:bg-red-400/10 disabled:opacity-50 transition-colors"
        >
          {loading === 'revoke' ? '…' : 'Revoke'}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
