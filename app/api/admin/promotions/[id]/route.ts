import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ id: string }>

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { session, error } = await requireAdminAuth('credits.manage')
  if (error) return error

  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { data, error: dbErr } = await adminQuery(`promotions?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'update_promotion',
    targetType: 'promotion',
    targetId: id,
    reason: 'Promotion updated via admin',
    metadata: { changes: body },
    ip,
  })

  return NextResponse.json({ data })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { session, error } = await requireAdminAuth('credits.manage')
  if (error) return error

  const { id } = await params

  // Only allow delete if uses_count = 0
  const { data: existing } = await adminQuery<Array<{ uses_count: number }>>(
    `promotions?id=eq.${id}&select=uses_count`
  )
  if (existing && existing.length > 0 && existing[0].uses_count > 0) {
    return NextResponse.json({ error: 'Cannot delete a promotion that has been used. Deactivate it instead.' }, { status: 400 })
  }

  const { error: dbErr } = await adminQuery(`promotions?id=eq.${id}`, {
    method: 'DELETE',
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'delete_promotion',
    targetType: 'promotion',
    targetId: id,
    reason: 'Promotion deleted via admin (no uses)',
    ip,
  })

  return NextResponse.json({ ok: true })
}
