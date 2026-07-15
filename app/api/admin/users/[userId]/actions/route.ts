import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession, hasPermission } from '@/lib/admin/auth'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ userId: string }>

const VALID_ACTIONS = [
  'suspend',
  'reactivate',
  'ban',
  'remove_ban',
  'lock',
  'send_password_reset',
  'send_email_verification',
  'end_sessions',
  'revoke_api_keys',
  'add_note',
  'update_quota',
  'update_rate_limit',
  'add_credits',
  'change_plan',
  'cancel_subscription',
  'export_data',
]

async function writeAuditLog(
  adminUserId: string,
  adminEmail: string,
  action: string,
  targetId: string,
  reason: string,
  metadata: Record<string, unknown>,
  ip: string
) {
  await adminQuery('admin_audit_logs', {
    method: 'POST',
    body: JSON.stringify({
      admin_user_id: adminUserId !== 'bootstrap' ? adminUserId : null,
      admin_email: adminEmail,
      action,
      target_type: 'platform_user',
      target_id: targetId,
      reason,
      metadata,
      ip_address: ip,
    }),
  })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { userId } = await params

  let body: { action?: string; reason?: string; [key: string]: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { action, reason, ...extra } = body

  if (!action || !VALID_ACTIONS.includes(action)) {
    return NextResponse.json({ error: `Invalid action. Valid actions: ${VALID_ACTIONS.join(', ')}` }, { status: 400 })
  }

  if (!reason || reason.trim().length < 10) {
    return NextResponse.json({ error: 'A reason of at least 10 characters is required.' }, { status: 400 })
  }

  if (!hasPermission(session.role, 'users') && !hasPermission(session.role, '*')) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 })
  }

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const now = new Date().toISOString()

  try {
    switch (action) {
      case 'suspend':
        await adminQuery(`platform_users?id=eq.${userId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            account_status: 'suspended',
            suspension_reason: reason,
            suspension_ends_at: extra.suspension_ends_at ?? null,
            updated_at: now,
          }),
        })
        break

      case 'reactivate':
        await adminQuery(`platform_users?id=eq.${userId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            account_status: 'active',
            suspension_reason: null,
            suspension_ends_at: null,
            ban_reason: null,
            updated_at: now,
          }),
        })
        break

      case 'ban':
        await adminQuery(`platform_users?id=eq.${userId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            account_status: 'banned',
            ban_reason: reason,
            updated_at: now,
          }),
        })
        break

      case 'remove_ban':
        await adminQuery(`platform_users?id=eq.${userId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            account_status: 'active',
            ban_reason: null,
            updated_at: now,
          }),
        })
        break

      case 'lock':
        await adminQuery(`platform_users?id=eq.${userId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            account_status: 'locked',
            updated_at: now,
          }),
        })
        break

      case 'add_note':
        await adminQuery(`platform_users?id=eq.${userId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            internal_notes: extra.note ?? reason,
            updated_at: now,
          }),
        })
        break

      case 'revoke_api_keys':
        await adminQuery(`api_keys?user_id=eq.${userId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: 'revoked',
            revoked_at: now,
            revoke_reason: reason,
            updated_at: now,
          }),
        })
        break

      case 'add_credits':
        if (!extra.credit_amount || typeof extra.credit_amount !== 'number') {
          return NextResponse.json({ error: 'credit_amount is required.' }, { status: 400 })
        }
        await adminQuery('token_ledger', {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
            entry_type: 'admin_adjustment',
            credit_amount: extra.credit_amount,
            debit_amount: 0,
            balance_after: 0, // would need to compute from current balance
            reason,
            admin_user_id: session.adminUserId !== 'bootstrap' ? session.adminUserId : null,
            admin_reason: reason,
          }),
        })
        break

      case 'cancel_subscription':
        await adminQuery(`subscriptions?user_id=eq.${userId}&status=neq.cancelled`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: 'cancelled',
            cancelled_at: now,
            cancellation_reason: reason,
            updated_at: now,
          }),
        })
        break

      case 'send_password_reset':
      case 'send_email_verification':
      case 'end_sessions':
      case 'update_quota':
      case 'update_rate_limit':
      case 'change_plan':
      case 'export_data':
        // Placeholder — implement with specific provider/logic when needed
        break

      default:
        return NextResponse.json({ error: 'Unhandled action.' }, { status: 400 })
    }

    // Write audit log
    await writeAuditLog(
      session.adminUserId,
      session.email,
      action,
      userId,
      reason,
      { extra },
      ip
    )

    return NextResponse.json({ ok: true, action, userId })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
