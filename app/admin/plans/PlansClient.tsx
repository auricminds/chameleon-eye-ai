'use client'

import { useState } from 'react'

interface Plan {
  id: string
  public_name: string
  status: string
}

export function CreatePlanButton() {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    internal_name: '',
    public_name: '',
    description: '',
    monthly_price_micros: '',
    annual_price_micros: '',
    monthly_tokens: '',
    api_access: false,
    api_key_count: '0',
    team_seats: '1',
    support_level: 'standard',
    status: 'draft',
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.internal_name || !form.public_name) {
      setError('Internal name and public name are required.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internal_name: form.internal_name,
          public_name: form.public_name,
          description: form.description || null,
          monthly_price_micros: parseInt(form.monthly_price_micros || '0'),
          annual_price_micros: parseInt(form.annual_price_micros || '0'),
          monthly_tokens: parseInt(form.monthly_tokens || '0'),
          api_access: form.api_access,
          api_key_count: parseInt(form.api_key_count || '0'),
          team_seats: parseInt(form.team_seats || '1'),
          support_level: form.support_level,
          status: form.status,
        }),
      })
      const json = await res.json() as { error?: string }
      if (!res.ok) {
        setError(json.error ?? 'Failed to create plan.')
        return
      }
      window.location.reload()
    } finally {
      setLoading(false)
    }
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="rounded-full bg-emerald/10 border border-emerald/20 text-emerald px-4 py-2 text-sm font-medium hover:bg-emerald/20 transition-colors"
      >
        + Create Plan
      </button>
    )
  }

  return (
    <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-5">
      <h2 className="text-sm font-semibold text-foreground mb-4">Create Plan</h2>
      <form onSubmit={handleCreate} className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted mb-1">Internal Name *</label>
          <input
            value={form.internal_name}
            onChange={e => setForm(f => ({ ...f, internal_name: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
            placeholder="pro_monthly"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Public Name *</label>
          <input
            value={form.public_name}
            onChange={e => setForm(f => ({ ...f, public_name: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
            placeholder="Pro"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Monthly Price (micros, e.g. 9000000 = $9)</label>
          <input
            type="number"
            value={form.monthly_price_micros}
            onChange={e => setForm(f => ({ ...f, monthly_price_micros: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
            placeholder="9000000"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Annual Price (micros)</label>
          <input
            type="number"
            value={form.annual_price_micros}
            onChange={e => setForm(f => ({ ...f, annual_price_micros: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
            placeholder="86400000"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Monthly Tokens</label>
          <input
            type="number"
            value={form.monthly_tokens}
            onChange={e => setForm(f => ({ ...f, monthly_tokens: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
            placeholder="1000000"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Status</label>
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground focus:border-emerald/40 focus:outline-none"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-muted mb-1">Description</label>
          <input
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
            placeholder="Plan description"
          />
        </div>
        {error && <p className="col-span-2 text-xs text-red-400">{error}</p>}
        <div className="col-span-2 flex justify-end gap-2">
          <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="rounded-full bg-emerald/10 border border-emerald/20 text-emerald px-4 py-2 text-sm font-medium hover:bg-emerald/20 transition-colors disabled:opacity-50">
            {loading ? 'Creating…' : 'Create Plan'}
          </button>
        </div>
      </form>
    </div>
  )
}

export function PlanActions({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function changeStatus(status: string) {
    setLoading(status)
    setError('')
    try {
      const res = await fetch(`/api/admin/plans/${plan.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const json = await res.json() as { error?: string }
      if (!res.ok) {
        setError(json.error ?? 'Failed to update plan.')
        return
      }
      window.location.reload()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {plan.status !== 'active' && (
          <button
            onClick={() => changeStatus('active')}
            disabled={loading === 'active'}
            className="rounded border border-emerald/20 px-2 py-1 text-xs text-emerald hover:bg-emerald/10 transition-colors disabled:opacity-50"
          >
            {loading === 'active' ? '…' : 'Activate'}
          </button>
        )}
        {plan.status === 'active' && (
          <button
            onClick={() => changeStatus('hidden')}
            disabled={loading === 'hidden'}
            className="rounded border border-white/10 px-2 py-1 text-xs text-muted hover:text-foreground transition-colors disabled:opacity-50"
          >
            {loading === 'hidden' ? '…' : 'Hide'}
          </button>
        )}
        {plan.status !== 'archived' && (
          <button
            onClick={() => changeStatus('archived')}
            disabled={loading === 'archived'}
            className="rounded border border-red-400/20 px-2 py-1 text-xs text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
          >
            {loading === 'archived' ? '…' : 'Archive'}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
