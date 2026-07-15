import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ ticketId: string }>

const VALID_ACTIONS = ['change_status', 'add_note', 'assign_to_me']
const VALID_STATUSES = ['open', 'in_progress', 'waiting_on_user', 'resolved', 'closed']

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { session, error } = await requireAdminAuth('support.reply')
  if (error) return error

  const { ticketId } = await params

  let action: string | undefined
  let newStatus: string | undefined
  let note: string | undefined
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({})) as Record<string, string>
    action = body.action
    newStatus = body.new_status
    note = body.note
  } else {
    const form = await request.formData().catch(() => null)
    action = form?.get('action')?.toString()
    newStatus = form?.get('new_status')?.toString()
    note = form?.get('note')?.toString()
  }

  if (!action || !VALID_ACTIONS.includes(action)) {
    return NextResponse.json({ error: `Invalid action. Valid: ${VALID_ACTIONS.join(', ')}` }, { status: 400 })
  }

  const now = new Date().toISOString()
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  switch (action) {
    case 'change_status': {
      if (!newStatus || !VALID_STATUSES.includes(newStatus)) {
        return NextResponse.json({ error: `Invalid status. Valid: ${VALID_STATUSES.join(', ')}` }, { status: 400 })
      }
      const patch: Record<string, unknown> = { status: newStatus, updated_at: now }
      if (newStatus === 'resolved') patch.resolved_at = now
      const { error: dbErr } = await adminQuery(`support_tickets?id=eq.${ticketId}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
      break
    }
    case 'add_note': {
      if (!note || note.trim().length < 1) {
        return NextResponse.json({ error: 'Note is required.' }, { status: 400 })
      }
      const { error: dbErr } = await adminQuery(`support_tickets?id=eq.${ticketId}`, {
        method: 'PATCH',
        body: JSON.stringify({ admin_notes: note, updated_at: now }),
      })
      if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
      break
    }
    case 'assign_to_me': {
      const adminId = session!.adminUserId !== 'bootstrap' ? session!.adminUserId : null
      const { error: dbErr } = await adminQuery(`support_tickets?id=eq.${ticketId}`, {
        method: 'PATCH',
        body: JSON.stringify({ assigned_admin_id: adminId, status: 'in_progress', updated_at: now }),
      })
      if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
      break
    }
  }

  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: `support_${action}`,
    targetType: 'support_ticket',
    targetId: ticketId,
    reason: newStatus ? `Changed status to ${newStatus}` : (note ?? action),
    ip,
  })

  if (!contentType.includes('application/json')) {
    return NextResponse.redirect(new URL('/admin/support', request.url))
  }

  return NextResponse.json({ ok: true, action, ticketId })
}
