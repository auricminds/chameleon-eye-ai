import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Feature Flags — Admin',
}

export default function FeatureFlagsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Feature Flags</h1>
        <p className="mt-0.5 text-sm text-muted">Feature flag configuration, rollout percentages, and targeting rules.</p>
      </div>
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-8 text-center">
        <p className="text-sm text-amber-400 font-medium">Coming soon</p>
        <p className="mt-1 text-xs text-muted">Data will load when Supabase is connected.</p>
      </div>
    </div>
  )
}
