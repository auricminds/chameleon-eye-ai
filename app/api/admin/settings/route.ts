import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

export async function GET() {
  const { error } = await requireAdminAuth('users.view')
  if (error) return error

  const { data, error: dbErr } = await adminQuery(
    `platform_settings?select=key,value,description,category&order=category.asc,key.asc`
  )
  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest) {
  const { session, error } = await requireAdminAuth('*')
  if (error) return error

  let body: { key?: string; value?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body.key) {
    return NextResponse.json({ error: 'key is required.' }, { status: 400 })
  }
  if (body.value === undefined) {
    return NextResponse.json({ error: 'value is required.' }, { status: 400 })
  }

  const { data, error: dbErr } = await adminQuery(`platform_settings?key=eq.${body.key}`, {
    method: 'PATCH',
    body: JSON.stringify({
      value: body.value,
      updated_by: session!.adminUserId !== 'bootstrap' ? session!.adminUserId : null,
      updated_at: new Date().toISOString(),
    }),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'update_platform_setting',
    targetType: 'platform_setting',
    targetId: body.key,
    reason: `Changed ${body.key} to ${JSON.stringify(body.value)}`,
    ip,
  })

  return NextResponse.json({ data })
}
