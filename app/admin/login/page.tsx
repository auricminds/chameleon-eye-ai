'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { Button } from '@/components/Button'

// Note: metadata export requires a Server Component; we handle it in the layout
// Since this is client component for the form, metadata is omitted here.

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed. Please check your credentials.')
      } else {
        window.location.href = '/admin'
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 border border-emerald/20">
          <span className="text-emerald text-xl font-bold">C</span>
        </div>
        <h1 className="text-xl font-semibold text-foreground">Chameleon Eye AI</h1>
        <p className="mt-1 text-sm text-muted">Admin Control Center</p>
      </div>

      <div className="rounded-2xl border border-white/8 bg-panel p-6 shadow-2xl">
        <h2 className="text-base font-semibold text-foreground mb-5">Sign in to Admin</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-muted mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-emerald/40 focus:outline-none transition-colors"
              placeholder="admin@chameleoneye.ai"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-muted mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-emerald/40 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2.5">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-emerald text-background hover:bg-emerald/90 border border-emerald/30 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted">
          Rate-limited to 5 attempts per 15 minutes. All sign-in attempts are logged.
        </p>
      </div>
    </div>
  )
}
