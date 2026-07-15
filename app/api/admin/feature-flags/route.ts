import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

export async function GET() {
  const { error } = await requireAdminAuth('users.view')
  if (error) return error

  const { data, error: dbErr } = await adminQuery(
    `feature_flags?select=id,key,display_name,description,is_enabled,rollout_percentage,enabled_for_plans,created_at&order=display_name.asc`
  )
  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireAdminAuth('*')
  if (error) return error

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body.key || !body.display_name) {
    return NextResponse.json({ error: 'key and display_name are required.' }, { status: 400 })
  }

  const { data, error: dbErr } = await adminQuery('feature_flags', {
    method: 'POST',
    body: JSON.stringify({
      ...body,
      created_by: session!.adminUserId !== 'bootstrap' ? session!.adminUserId : null,
      updated_by: session!.adminUserId !== 'bootstrap' ? session!.adminUserId : null,
    }),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'create_feature_flag',
    targetType: 'feature_flag',
    reason: `Created flag: ${body.key}`,
    ip,
  })

  return NextResponse.json({ data })
}
