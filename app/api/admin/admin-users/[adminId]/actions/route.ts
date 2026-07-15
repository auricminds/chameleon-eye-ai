import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ adminId: string }>

const VALID_ACTIONS = ['deactivate', 'reactivate', 'change_role']
const VALID_ROLES = [
  'super_admin', 'operations_admin', 'finance_admin', 'support_admin',
  'developer_admin', 'security_admin', 'content_moderator', 'analyst', 'read_only_admin',
]

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { session, error } = await requireAdminAuth('admin_users.manage')
  if (error) return error

  const { adminId } = await params

  let action: string | undefined
  let newRole: string | undefined
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({})) as Record<string, string>
    action = body.action
    newRole = body.role
  } else {
    const form = await request.formData().catch(() => null)
    action = form?.get('action')?.toString()
    newRole = form?.get('role')?.toString()
  }

  if (!action || !VALID_ACTIONS.includes(action)) {
    return NextResponse.json({ error: `Invalid action. Valid: ${VALID_ACTIONS.join(', ')}` }, { status: 400 })
  }

  const now = new Date().toISOString()
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  let patch: Record<string, unknown>
  switch (action) {
    case 'deactivate':
      patch = { is_active: false, updated_at: now }
      break
    case 'reactivate':
      patch = { is_active: true, updated_at: now }
      break
    case 'change_role':
      if (!newRole || !VALID_ROLES.includes(newRole)) {
        return NextResponse.json({ error: `Invalid role. Valid: ${VALID_ROLES.join(', ')}` }, { status: 400 })
      }
      patch = { role: newRole, updated_at: now }
      break
    default:
      return NextResponse.json({ error: 'Unhandled action.' }, { status: 400 })
  }

  const { error: dbErr } = await adminQuery(`admin_users?id=eq.${adminId}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: `admin_user_${action}`,
    targetType: 'admin_user',
    targetId: adminId,
    reason: newRole ? `Changed role to ${newRole}` : action,
    ip,
  })

  if (!contentType.includes('application/json')) {
    return NextResponse.redirect(new URL('/admin/admin-users', request.url))
  }

  return NextResponse.json({ ok: true, action, adminId })
}
