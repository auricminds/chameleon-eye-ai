'use client'

import { useState } from 'react'
import { AdminBadge } from '@/components/admin/AdminBadge'

interface Promotion {
  id: string
  code: string | null
  display_name: string
  description: string | null
  credit_amount: number
  max_uses: number | null
  uses_count: number
  valid_from: string
  valid_until: string | null
  is_active: boolean
  created_at: string
}

function fmtTokens(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState('')
  const [form, setForm] = useState({
    display_name: '',
    code: '',
    description: '',
    credit_amount: '',
    max_uses: '',
    valid_until: '',
  })

  async function loadPromotions() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/promotions')
      if (res.ok) {
        const json = await res.json() as { data: Promotion[] }
        setPromotions(json.data ?? [])
        setLoaded(true)
      }
    } finally {
      setLoading(false)
    }
  }

  async function deactivate(id: string) {
    const res = await fetch(`/api/admin/promotions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: false }),
    })
    if (res.ok) {
      setPromotions(prev => prev.map(p => p.id === id ? { ...p, is_active: false } : p))
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreateError('')
    if (!form.display_name || !form.credit_amount) {
      setCreateError('Name and credit amount are required.')
      return
    }
    setCreateLoading(true)
    try {
      const res = await fetch('/api/admin/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: form.display_name,
          code: form.code || null,
          description: form.description || null,
          credit_amount: parseInt(form.credit_amount),
          max_uses: form.max_uses ? parseInt(form.max_uses) : null,
          valid_until: form.valid_until || null,
        }),
      })
      const json = await res.json() as { error?: string; data: Promotion[] }
      if (!res.ok) {
        setCreateError(json.error ?? 'Failed to create promotion.')
        return
      }
      setPromotions(prev => [...(json.data ?? []), ...prev])
      setShowCreate(false)
      setForm({ display_name: '', code: '', description: '', credit_amount: '', max_uses: '', valid_until: '' })
    } finally {
      setCreateLoading(false)
    }
  }

  if (!loaded) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Promotions</h1>
            <p className="mt-0.5 text-sm text-muted">Promotional credit campaigns, coupon codes, and eligibility rules.</p>
          </div>
        </div>
        <div className="rounded-xl border border-white/8 bg-panel px-4 py-8 text-center">
          <p className="text-sm text-muted mb-3">Load promotions from the database.</p>
          <button
            onClick={loadPromotions}
            disabled={loading}
            className="rounded-full bg-emerald/10 border border-emerald/20 text-emerald px-4 py-2 text-sm font-medium hover:bg-emerald/20 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Load Promotions'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Promotions</h1>
          <p className="mt-0.5 text-sm text-muted">Promotional credit campaigns, coupon codes, and eligibility rules.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="rounded-full bg-emerald/10 border border-emerald/20 text-emerald px-4 py-2 text-sm font-medium hover:bg-emerald/20 transition-colors"
        >
          + Create Promotion
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Create Promotion</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted mb-1">Display Name *</label>
              <input
                value={form.display_name}
                onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
                placeholder="Summer Campaign"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Code (optional)</label>
              <input
                value={form.code}
                onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
                placeholder="SUMMER2026"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Credit Amount (tokens) *</label>
              <input
                type="number"
                value={form.credit_amount}
                onChange={e => setForm(f => ({ ...f, credit_amount: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
                placeholder="100000"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Max Uses (optional)</label>
              <input
                type="number"
                value={form.max_uses}
                onChange={e => setForm(f => ({ ...f, max_uses: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
                placeholder="Unlimited"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Valid Until (optional)</label>
              <input
                type="date"
                value={form.valid_until}
                onChange={e => setForm(f => ({ ...f, valid_until: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground focus:border-emerald/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Description (optional)</label>
              <input
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
                placeholder="Internal description"
              />
            </div>
            {createError && <p className="col-span-2 text-xs text-red-400">{createError}</p>}
            <div className="col-span-2 flex justify-end gap-2">
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={createLoading} className="rounded-full bg-emerald/10 border border-emerald/20 text-emerald px-4 py-2 text-sm font-medium hover:bg-emerald/20 transition-colors disabled:opacity-50">
                {createLoading ? 'Creating…' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Credits</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Uses</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Valid Until</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted text-sm">
                  No promotions found.
                </td>
              </tr>
            ) : (
              promotions.map((p) => (
                <tr key={p.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{p.display_name}</p>
                    {p.description && <p className="text-xs text-muted">{p.description}</p>}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">{p.code ?? '—'}</td>
                  <td className="px-4 py-3 text-emerald text-sm font-medium">{fmtTokens(p.credit_amount)}</td>
                  <td className="px-4 py-3 text-muted text-xs">
                    {p.uses_count} / {p.max_uses ?? '∞'}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(p.valid_until)}</td>
                  <td className="px-4 py-3">
                    <AdminBadge status={p.is_active ? 'active' : 'disabled'} />
                  </td>
                  <td className="px-4 py-3">
                    {p.is_active && (
                      <button
                        onClick={() => deactivate(p.id)}
                        className="rounded border border-amber-400/20 px-2 py-1 text-xs text-amber-400 hover:bg-amber-400/10 transition-colors"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
