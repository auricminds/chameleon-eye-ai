import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession, hasPermission } from '@/lib/admin/auth'
import { adminQuery } from '@/lib/admin/supabase'

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await adminQuery('subscription_plans?order=created_at.asc')
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.role, '*') && !hasPermission(session.role, 'subscriptions.manage')) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body.internal_name || !body.public_name) {
    return NextResponse.json({ error: 'internal_name and public_name are required.' }, { status: 400 })
  }

  const { data, error } = await adminQuery('subscription_plans', {
    method: 'POST',
    body: JSON.stringify({ ...body, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }),
  })

  if (error) return NextResponse.json({ error }, { status: 500 })

  // Audit log
  await adminQuery('admin_audit_logs', {
    method: 'POST',
    body: JSON.stringify({
      admin_user_id: session.adminUserId !== 'bootstrap' ? session.adminUserId : null,
      admin_email: session.email,
      action: 'create_plan',
      target_type: 'subscription_plan',
      reason: 'Plan created via admin API',
      metadata: { plan: body },
    }),
  })

  return NextResponse.json({ data })
}
