import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

export async function GET() {
  const { session, error } = await requireAdminAuth()
  if (error) return error

  const adminId = session!.adminUserId
  const path = adminId !== 'bootstrap'
    ? `admin_notifications?admin_user_id=eq.${adminId}&select=id,type,title,body,is_read,created_at&order=created_at.desc&limit=50`
    : `admin_notifications?select=id,type,title,body,is_read,created_at&order=created_at.desc&limit=50`

  const { data, error: dbErr } = await adminQuery(path)
  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireAdminAuth()
  if (error) return error

  let body: { id?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body.id) {
    return NextResponse.json({ error: 'id is required.' }, { status: 400 })
  }

  const { data, error: dbErr } = await adminQuery(`admin_notifications?id=eq.${body.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ is_read: true }),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
  return NextResponse.json({ data })
}
