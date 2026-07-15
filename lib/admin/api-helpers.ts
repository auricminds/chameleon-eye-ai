import 'server-only'
import { NextResponse } from 'next/server'
import { getAdminSession, hasPermission, type AdminRole } from './auth'
import { adminQuery } from './supabase'

export async function requireAdminAuth(permission?: string) {
  const session = await getAdminSession()
  if (!session) {
    return { session: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  if (permission && !hasPermission(session.role as AdminRole, permission)) {
    return { session, error: NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 }) }
  }
  return { session, error: null }
}

export async function writeAuditLog(params: {
  adminUserId: string
  adminEmail: string
  action: string
  targetType?: string
  targetId?: string
  reason?: string
  metadata?: Record<string, unknown>
  ip?: string
}) {
  await adminQuery('admin_audit_logs', {
    method: 'POST',
    body: JSON.stringify({
      admin_user_id: params.adminUserId === 'bootstrap' ? null : params.adminUserId,
      admin_email: params.adminEmail,
      action: params.action,
      target_type: params.targetType,
      target_id: params.targetId,
      reason: params.reason,
      metadata: params.metadata || {},
      ip_address: params.ip,
    }),
  })
}
