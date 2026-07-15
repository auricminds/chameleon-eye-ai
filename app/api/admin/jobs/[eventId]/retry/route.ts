import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ eventId: string }>

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { session, error } = await requireAdminAuth('usage.view')
  if (error) return error

  const { eventId } = await params
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  const { error: dbErr } = await adminQuery(`webhook_events?id=eq.${eventId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      processing_status: 'pending',
      last_error: null,
    }),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'retry_webhook_event',
    targetType: 'webhook_event',
    targetId: eventId,
    reason: 'Manual retry via admin jobs page',
    ip,
  })

  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return NextResponse.redirect(new URL('/admin/jobs', request.url))
  }

  return NextResponse.json({ ok: true, eventId })
}
