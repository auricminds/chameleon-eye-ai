'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'

interface ConfirmActionModalProps {
  isOpen: boolean
  title: string
  description: string
  actionLabel: string
  actionVariant?: 'primary' | 'secondary' | 'ghost'
  requireReason?: boolean
  onConfirm: (reason: string) => Promise<void>
  onClose: () => void
  danger?: boolean
}

export function ConfirmActionModal({
  isOpen,
  title,
  description,
  actionLabel,
  requireReason = true,
  onConfirm,
  onClose,
  danger = false,
}: ConfirmActionModalProps) {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  async function handleConfirm() {
    if (requireReason && reason.trim().length < 10) {
      setError('Please provide a reason (at least 10 characters).')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onConfirm(reason)
      setReason('')
      onClose()
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-panel p-6 shadow-2xl">
        <h2 className={`text-base font-semibold ${danger ? 'text-red-400' : 'text-foreground'}`}>
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted">{description}</p>

        {requireReason && (
          <div className="mt-4">
            <label className="block text-xs font-medium text-muted mb-1.5">
              Reason <span className="text-red-400">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Provide a clear reason for this action (min 10 chars)..."
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none resize-none"
            />
          </div>
        )}

        {error && (
          <p className="mt-2 text-xs text-red-400">{error}</p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-40 ${
              danger
                ? 'bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20'
                : 'bg-emerald text-background hover:bg-emerald/90 border border-emerald/30'
            }`}
          >
            {loading ? 'Processing...' : actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
