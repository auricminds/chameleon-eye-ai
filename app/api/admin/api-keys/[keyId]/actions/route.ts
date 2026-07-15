import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession, hasPermission } from '@/lib/admin/auth'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ keyId: string }>

const VALID_ACTIONS = ['disable', 'enable', 'revoke', 'mark_compromised', 'update_limits']

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.role, 'api_keys.disable') && !hasPermission(session.role, '*')) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 })
  }

  const { keyId } = await params

  let body: { action?: string; reason?: string; [key: string]: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { action, reason, ...extra } = body

  if (!action || !VALID_ACTIONS.includes(action)) {
    return NextResponse.json({ error: `Invalid action. Valid: ${VALID_ACTIONS.join(', ')}` }, { status: 400 })
  }

  if (!reason || reason.trim().length < 10) {
    return NextResponse.json({ error: 'A reason of at least 10 characters is required.' }, { status: 400 })
  }

  const now = new Date().toISOString()
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  try {
    switch (action) {
      case 'disable':
        await adminQuery(`api_keys?id=eq.${keyId}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: 'disabled', updated_at: now }),
        })
        break

      case 'enable':
        await adminQuery(`api_keys?id=eq.${keyId}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: 'active', updated_at: now }),
        })
        break

      case 'revoke':
        await adminQuery(`api_keys?id=eq.${keyId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: 'revoked',
            revoked_at: now,
            revoke_reason: reason,
            updated_at: now,
          }),
        })
        break

      case 'mark_compromised':
        await adminQuery(`api_keys?id=eq.${keyId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: 'compromised',
            revoked_at: now,
            revoke_reason: reason,
            updated_at: now,
          }),
        })
        break

      case 'update_limits':
        await adminQuery(`api_keys?id=eq.${keyId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            monthly_quota: extra.monthly_quota ?? null,
            requests_per_minute: extra.requests_per_minute ?? null,
            requests_per_day: extra.requests_per_day ?? null,
            updated_at: now,
          }),
        })
        break
    }

    // Audit log
    await adminQuery('admin_audit_logs', {
      method: 'POST',
      body: JSON.stringify({
        admin_user_id: session.adminUserId !== 'bootstrap' ? session.adminUserId : null,
        admin_email: session.email,
        action,
        target_type: 'api_key',
        target_id: keyId,
        reason,
        metadata: { extra },
        ip_address: ip,
      }),
    })

    return NextResponse.json({ ok: true, action, keyId })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
