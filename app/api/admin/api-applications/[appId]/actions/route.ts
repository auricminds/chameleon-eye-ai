import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession, hasPermission } from '@/lib/admin/auth'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ appId: string }>

const VALID_ACTIONS = ['approve', 'reject', 'request_more_info', 'assign_reviewer', 'update_limits']

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.role, 'api_applications') && !hasPermission(session.role, '*')) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 })
  }

  const { appId } = await params

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
      case 'approve':
        await adminQuery(`api_applications?id=eq.${appId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: 'approved',
            approved_at: now,
            admin_notes: reason,
            monthly_token_quota: extra.monthly_token_quota ?? null,
            requests_per_minute: extra.requests_per_minute ?? null,
            requests_per_day: extra.requests_per_day ?? null,
            allowed_models: extra.allowed_models ?? null,
            updated_at: now,
          }),
        })
        break

      case 'reject':
        await adminQuery(`api_applications?id=eq.${appId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: 'rejected',
            rejected_at: now,
            rejection_reason: reason,
            admin_notes: reason,
            updated_at: now,
          }),
        })
        break

      case 'request_more_info':
        await adminQuery(`api_applications?id=eq.${appId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            status: 'more_information_required',
            admin_notes: reason,
            updated_at: now,
          }),
        })
        break

      case 'assign_reviewer':
        await adminQuery(`api_applications?id=eq.${appId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            assigned_reviewer_id: extra.reviewer_id ?? session.adminUserId,
            status: 'under_review',
            updated_at: now,
          }),
        })
        break

      case 'update_limits':
        await adminQuery(`api_applications?id=eq.${appId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            monthly_token_quota: extra.monthly_token_quota ?? null,
            requests_per_minute: extra.requests_per_minute ?? null,
            requests_per_day: extra.requests_per_day ?? null,
            admin_notes: reason,
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
        target_type: 'api_application',
        target_id: appId,
        reason,
        metadata: { extra },
        ip_address: ip,
      }),
    })

    return NextResponse.json({ ok: true, action, appId })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
