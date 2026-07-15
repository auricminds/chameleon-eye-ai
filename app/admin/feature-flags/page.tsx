'use client'

import { useState, useEffect } from 'react'
import { AdminBadge } from '@/components/admin/AdminBadge'

interface FeatureFlag {
  id: string
  key: string
  display_name: string
  description: string | null
  is_enabled: boolean
  rollout_percentage: number
  enabled_for_plans: string[]
  created_at: string
}

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [togglingId, setTogglingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/feature-flags')
      .then(r => r.json())
      .then((d: { data?: FeatureFlag[]; error?: string }) => {
        if (d.error) setError(d.error)
        else setFlags(d.data ?? [])
      })
      .catch(() => setError('Failed to load feature flags.'))
      .finally(() => setLoading(false))
  }, [])

  async function toggleFlag(flag: FeatureFlag) {
    setTogglingId(flag.id)
    try {
      const res = await fetch(`/api/admin/feature-flags/${flag.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_enabled: !flag.is_enabled }),
      })
      const json = await res.json() as { error?: string }
      if (!res.ok) {
        alert(json.error ?? 'Failed to update flag.')
        return
      }
      setFlags(prev => prev.map(f => f.id === flag.id ? { ...f, is_enabled: !f.is_enabled } : f))
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Feature Flags</h1>
          <p className="mt-0.5 text-sm text-muted">Feature flag configuration, rollout percentages, and targeting rules.</p>
        </div>
      </div>

      {loading && (
        <div className="rounded-xl border border-white/8 bg-panel px-4 py-8 text-center">
          <p className="text-sm text-muted">Loading feature flags…</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-panel2">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Flag</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Key</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Rollout</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Plans</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Toggle</th>
              </tr>
            </thead>
            <tbody>
              {flags.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted text-sm">
                    No feature flags configured. Add flags to the <code className="font-mono text-xs">feature_flags</code> table.
                  </td>
                </tr>
              ) : (
                flags.map((flag) => (
                  <tr key={flag.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{flag.display_name}</p>
                      {flag.description && <p className="text-xs text-muted">{flag.description}</p>}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">{flag.key}</td>
                    <td className="px-4 py-3">
                      <AdminBadge status={flag.is_enabled ? 'active' : 'disabled'} />
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{flag.rollout_percentage}%</td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {flag.enabled_for_plans.length > 0 ? flag.enabled_for_plans.join(', ') : 'All'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleFlag(flag)}
                        disabled={togglingId === flag.id}
                        className={`relative h-6 w-11 rounded-full border transition-colors disabled:opacity-50 ${
                          flag.is_enabled
                            ? 'bg-emerald/20 border-emerald/30'
                            : 'bg-white/10 border-white/20'
                        }`}
                        aria-label={flag.is_enabled ? 'Disable flag' : 'Enable flag'}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full border transition-transform ${
                            flag.is_enabled
                              ? 'translate-x-5 bg-emerald border-emerald/50'
                              : 'translate-x-0.5 bg-white/40 border-white/20'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
