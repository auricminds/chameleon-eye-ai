interface KpiCardProps {
  label: string
  value: string | number
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
  trendLabel?: string
  accent?: boolean
}

export function KpiCard({ label, value, sub, trend, trendLabel, accent = false }: KpiCardProps) {
  const trendColor =
    trend === 'up' ? 'text-emerald' : trend === 'down' ? 'text-red-400' : 'text-muted'
  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '–'

  return (
    <div className={`rounded-xl border bg-panel p-4 ${accent ? 'border-emerald/20' : 'border-white/8'}`}>
      <p className="text-xs font-medium text-muted truncate">{label}</p>
      <p className={`mt-1.5 text-2xl font-semibold tracking-tight ${accent ? 'text-emerald' : 'text-foreground'}`}>
        {value}
      </p>
      {(sub || trendLabel) && (
        <div className="mt-1 flex items-center gap-1.5">
          {trendLabel && (
            <span className={`text-xs font-medium ${trendColor}`}>
              {trendArrow} {trendLabel}
            </span>
          )}
          {sub && !trendLabel && (
            <span className="text-xs text-muted">{sub}</span>
          )}
        </div>
      )}
    </div>
  )
}
