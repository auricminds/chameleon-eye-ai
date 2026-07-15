'use client'

import { useState } from 'react'
import { ConfirmActionModal } from '@/components/admin/ConfirmActionModal'

interface ActionDef {
  label: string
  action: string
  danger?: boolean
}

const ACTIONS: (ActionDef | null)[] = [
  { label: 'Suspend Account', action: 'suspend', danger: true },
  { label: 'Reactivate Account', action: 'reactivate' },
  { label: 'Ban User', action: 'ban', danger: true },
  { label: 'Remove Ban', action: 'remove_ban' },
  { label: 'Lock Temporarily', action: 'lock', danger: true },
  null,
  { label: 'Revoke All API Keys', action: 'revoke_api_keys', danger: true },
  null,
  { label: 'Cancel Subscription', action: 'cancel_subscription', danger: true },
  null,
  { label: 'Add Internal Note', action: 'add_note' },
]

export function UserActionPanel({ userId }: { userId: string }) {
  const [modal, setModal] = useState<ActionDef | null>(null)

  async function handleConfirm(reason: string) {
    if (!modal) return

    const res = await fetch(`/api/admin/users/${userId}/actions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: modal.action,
        reason,
        ...(modal.action === 'add_note' ? { note: reason } : {}),
      }),
    })

    const json = await res.json() as { error?: string }
    if (!res.ok) {
      throw new Error(json.error ?? 'Action failed.')
    }
    window.location.reload()
  }

  return (
    <div className="rounded-xl border border-white/8 bg-panel p-4">
      <h2 className="text-sm font-semibold text-foreground mb-3">Admin Actions</h2>
      <p className="text-xs text-muted mb-3">
        All actions require a written reason and are logged to the audit trail.
      </p>
      <div className="space-y-1.5">
        {ACTIONS.map((item, i) => {
          if (item === null) {
            return <div key={i} className="my-2 border-t border-white/8" />
          }
          return (
            <button
              key={item.action}
              onClick={() => setModal(item)}
              className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                item.danger
                  ? 'border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10'
                  : 'border border-white/8 bg-white/3 text-muted hover:border-emerald/20 hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <ConfirmActionModal
        isOpen={modal !== null}
        title={modal?.label ?? ''}
        description={`This action will be permanently logged to the audit trail. User: ${userId.slice(0, 8)}…`}
        actionLabel={modal?.label ?? ''}
        requireReason={true}
        onConfirm={handleConfirm}
        onClose={() => setModal(null)}
        danger={modal?.danger}
      />
    </div>
  )
}

export function AddCreditsPanel({ userId }: { userId: string }) {
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Enter a valid positive token amount.')
      return
    }
    if (!reason || reason.trim().length < 10) {
      setError('Reason must be at least 10 characters.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_credits',
          reason,
          credit_amount: Number(amount),
        }),
      })
      const json = await res.json() as { error?: string }
      if (!res.ok) {
        setError(json.error ?? 'Failed to add credits.')
        return
      }
      setSuccess(`Added ${Number(amount).toLocaleString()} tokens.`)
      setAmount('')
      setReason('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-white/8 bg-panel p-4">
      <h2 className="text-sm font-semibold text-foreground mb-3">Add Promotional Credits</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-muted mb-1">Token Amount</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="100000"
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Reason (min 10 chars)</label>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={2}
            placeholder="Reason for granting credits…"
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none resize-none"
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {success && <p className="text-xs text-emerald">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald/10 border border-emerald/20 text-emerald px-3 py-2 text-xs font-medium hover:bg-emerald/20 transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding…' : 'Add Credits'}
        </button>
      </form>
    </div>
  )
}
