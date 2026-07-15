import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ id: string }>

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { session, error } = await requireAdminAuth('*')
  if (error) return error

  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const now = new Date().toISOString()
  const { data, error: dbErr } = await adminQuery(`feature_flags?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...body,
      updated_by: session!.adminUserId !== 'bootstrap' ? session!.adminUserId : null,
      updated_at: now,
    }),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'update_feature_flag',
    targetType: 'feature_flag',
    targetId: id,
    reason: `Updated flag: ${JSON.stringify(body)}`,
    ip,
  })

  return NextResponse.json({ data })
}
