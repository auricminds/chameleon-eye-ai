'use client'

import { useState, useEffect } from 'react'

interface PlatformSetting {
  key: string
  value: unknown
  description: string | null
  category: string
}

function groupByCategory(settings: PlatformSetting[]): Record<string, PlatformSetting[]> {
  return settings.reduce<Record<string, PlatformSetting[]>>((acc, s) => {
    const cat = s.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})
}

function renderValue(value: unknown): string {
  if (typeof value === 'string') return value
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') return String(value)
  return JSON.stringify(value)
}

function inferType(value: unknown): 'boolean' | 'number' | 'string' {
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  const str = renderValue(value).replace(/^"|"$/g, '')
  if (str === 'true' || str === 'false') return 'boolean'
  if (!isNaN(Number(str)) && str.trim() !== '') return 'number'
  return 'string'
}

function SettingRow({ setting, onSave }: { setting: PlatformSetting; onSave: (key: string, value: unknown) => Promise<void> }) {
  const raw = renderValue(setting.value).replace(/^"|"$/g, '')
  const type = inferType(setting.value)
  const [inputVal, setInputVal] = useState(raw)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [err, setErr] = useState('')

  async function handleSave() {
    setSaving(true)
    setErr('')
    setSaved(false)
    try {
      let parsed: unknown = inputVal
      if (type === 'boolean') parsed = inputVal === 'true'
      else if (type === 'number') parsed = Number(inputVal)
      await onSave(setting.key, parsed)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      setErr(String(e))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground font-mono">{setting.key}</p>
        {setting.description && <p className="text-xs text-muted mt-0.5">{setting.description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {type === 'boolean' ? (
          <select
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="rounded-lg border border-white/10 bg-background px-3 py-1.5 text-sm text-foreground focus:border-emerald/40 focus:outline-none"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        ) : type === 'number' ? (
          <input
            type="number"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="w-24 rounded-lg border border-white/10 bg-background px-3 py-1.5 text-sm text-foreground focus:border-emerald/40 focus:outline-none"
          />
        ) : (
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="w-48 rounded-lg border border-white/10 bg-background px-3 py-1.5 text-sm text-foreground focus:border-emerald/40 focus:outline-none"
          />
        )}
        <button
          onClick={handleSave}
          disabled={saving || inputVal === raw}
          className="rounded-lg border border-emerald/20 bg-emerald/10 px-3 py-1.5 text-xs font-medium text-emerald hover:bg-emerald/20 transition-colors disabled:opacity-40"
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
      {err && <p className="text-xs text-red-400">{err}</p>}
    </div>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<PlatformSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then((d: { data?: PlatformSetting[]; error?: string }) => {
        if (d.error) setLoadError(d.error)
        else setSettings(d.data ?? [])
      })
      .catch(() => setLoadError('Failed to load settings.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSave(key: string, value: unknown) {
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    })
    const json = await res.json() as { error?: string }
    if (!res.ok) throw new Error(json.error ?? 'Save failed.')
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s))
  }

  const grouped = groupByCategory(settings)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="mt-0.5 text-sm text-muted">Platform configuration, API settings, and environment management.</p>
      </div>

      {loading && (
        <div className="rounded-xl border border-white/8 bg-panel px-4 py-8 text-center">
          <p className="text-sm text-muted">Loading settings…</p>
        </div>
      )}

      {loadError && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">
          <p className="text-sm text-red-400">{loadError}</p>
        </div>
      )}

      {!loading && !loadError && settings.length === 0 && (
        <div className="rounded-xl border border-white/8 bg-panel px-4 py-8 text-center">
          <p className="text-sm text-muted">No platform settings found. Run the migration to seed defaults.</p>
        </div>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="rounded-xl border border-white/8 bg-panel p-5">
          <h2 className="text-xs font-semibold tracking-[0.12em] uppercase text-muted/60 mb-3 capitalize">{category}</h2>
          {items.map((setting) => (
            <SettingRow key={setting.key} setting={setting} onSave={handleSave} />
          ))}
        </div>
      ))}
    </div>
  )
}
