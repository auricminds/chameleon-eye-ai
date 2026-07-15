import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

export async function GET() {
  const { error } = await requireAdminAuth('credits.view')
  if (error) return error

  const { data, error: dbErr } = await adminQuery(
    `promotions?select=id,code,display_name,description,credit_amount,max_uses,uses_count,valid_from,valid_until,is_active,created_at&order=created_at.desc`
  )
  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireAdminAuth('credits.manage')
  if (error) return error

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body.display_name) {
    return NextResponse.json({ error: 'display_name is required.' }, { status: 400 })
  }
  if (!body.credit_amount || typeof body.credit_amount !== 'number' || body.credit_amount <= 0) {
    return NextResponse.json({ error: 'credit_amount must be a positive integer.' }, { status: 400 })
  }

  const { data, error: dbErr } = await adminQuery('promotions', {
    method: 'POST',
    body: JSON.stringify({
      ...body,
      created_by: session!.adminUserId !== 'bootstrap' ? session!.adminUserId : null,
    }),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'create_promotion',
    targetType: 'promotion',
    reason: `Created promotion: ${body.display_name}`,
    metadata: { promotion: body },
    ip,
  })

  return NextResponse.json({ data })
}
