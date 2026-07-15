import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession, hasPermission } from '@/lib/admin/auth'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ planId: string }>

export async function GET(
  _request: NextRequest,
  { params }: { params: Params }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { planId } = await params
  const { data, error } = await adminQuery(`subscription_plans?id=eq.${planId}&limit=1`)
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.role, '*') && !hasPermission(session.role, 'subscriptions.manage')) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 })
  }

  const { planId } = await params

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { data, error } = await adminQuery(`subscription_plans?id=eq.${planId}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...body, updated_at: new Date().toISOString() }),
  })

  if (error) return NextResponse.json({ error }, { status: 500 })

  await adminQuery('admin_audit_logs', {
    method: 'POST',
    body: JSON.stringify({
      admin_user_id: session.adminUserId !== 'bootstrap' ? session.adminUserId : null,
      admin_email: session.email,
      action: 'update_plan',
      target_type: 'subscription_plan',
      target_id: planId,
      reason: 'Plan updated via admin API',
      metadata: { changes: body },
    }),
  })

  return NextResponse.json({ data })
}
