type BadgeVariant = 'active' | 'success' | 'warning' | 'danger' | 'inactive' | 'info' | 'default'

const variantClasses: Record<BadgeVariant, string> = {
  active:   'text-emerald bg-emerald/10 border border-emerald/20',
  success:  'text-emerald bg-emerald/10 border border-emerald/20',
  warning:  'text-amber-400 bg-amber-400/10 border border-amber-400/20',
  danger:   'text-red-400 bg-red-400/10 border border-red-400/20',
  inactive: 'text-muted bg-white/5 border border-white/10',
  info:     'text-sky-400 bg-sky-400/10 border border-sky-400/20',
  default:  'text-muted bg-white/5 border border-white/10',
}

function statusToVariant(status: string): BadgeVariant {
  const s = status.toLowerCase()
  if (['active', 'approved', 'success', 'live'].includes(s)) return 'active'
  if (['suspended', 'past_due', 'unpaid', 'failed', 'compromised'].includes(s)) return 'danger'
  if (['banned', 'revoked', 'rejected'].includes(s)) return 'danger'
  if (['warning', 'trialing', 'cancel_at_period_end', 'more_information_required'].includes(s)) return 'warning'
  if (['paused', 'expired', 'cancelled', 'disabled', 'draft', 'archived'].includes(s)) return 'inactive'
  if (['pending_verification', 'submitted', 'under_review', 'incomplete'].includes(s)) return 'info'
  if (['test'].includes(s)) return 'info'
  return 'default'
}

interface AdminBadgeProps {
  status: string
  label?: string
  variant?: BadgeVariant
}

export function AdminBadge({ status, label, variant }: AdminBadgeProps) {
  const resolvedVariant = variant ?? statusToVariant(status)
  const displayLabel = label ?? status.replace(/_/g, ' ')

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${variantClasses[resolvedVariant]}`}>
      {displayLabel}
    </span>
  )
}
