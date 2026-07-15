import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { adminQuery } from '@/lib/admin/supabase'
import { ApiAppActions } from './ApiAppActions'

export const metadata: Metadata = {
  title: 'API Applications — Admin',
}

interface ApiApplication {
  id: string
  organization: string | null
  business_purpose: string
  status: string
  created_at: string
  country: string | null
  user_id: string
}

type SearchParams = Promise<{ status?: string }>

const statusFilters = [
  { value: '', label: 'All' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'more_information_required', label: 'More Info Needed' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'revoked', label: 'Revoked' },
]

export default async function ApiApplicationsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const status = params.status ?? ''
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  let applications: ApiApplication[] = []

  if (isConfigured) {
    let path = `api_applications?select=id,organization,business_purpose,status,created_at,country,user_id&order=created_at.desc&limit=50`
    if (status) path += `&status=eq.${status}`
    const { data } = await adminQuery<ApiApplication[]>(path)
    applications = data ?? []
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">API Applications</h1>
        <p className="mt-0.5 text-sm text-muted">Review and manage API access requests.</p>
      </div>

      {!isConfigured && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
          <p className="text-sm text-amber-400">Connect Supabase to load API applications.</p>
        </div>
      )}

      {/* Status filters */}
      <div className="flex flex-wrap gap-1">
        {statusFilters.map((f) => (
          <Link
            key={f.value}
            href={`/admin/api-applications?${f.value ? `status=${f.value}` : ''}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              status === f.value
                ? 'bg-emerald/10 text-emerald border border-emerald/20'
                : 'border border-white/10 text-muted hover:text-foreground'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-panel2">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Organization</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Purpose</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Country</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Submitted</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted text-sm">
                  {isConfigured ? 'No applications found.' : 'Connect Supabase to see applications.'}
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="border-b border-white/5 bg-panel hover:bg-white/4 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{app.organization ?? '(no org)'}</p>
                      <p className="text-xs text-muted font-mono">{app.id.slice(0, 8)}…</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted text-xs max-w-56 truncate">
                    {app.business_purpose}
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs">{app.country ?? '—'}</td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">
                    {formatDate(app.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <ApiAppActions appId={app.id} />
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
