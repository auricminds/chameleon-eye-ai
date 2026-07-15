import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

type Params = Promise<{ modelId: string }>

const VALID_ACTIONS = ['enable', 'disable', 'set_maintenance', 'clear_maintenance']

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { session, error } = await requireAdminAuth('models.manage')
  if (error) return error

  const { modelId } = await params

  let action: string | undefined
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({})) as Record<string, string>
    action = body.action
  } else {
    const form = await request.formData().catch(() => null)
    action = form?.get('action')?.toString()
  }

  if (!action || !VALID_ACTIONS.includes(action)) {
    return NextResponse.json({ error: `Invalid action. Valid: ${VALID_ACTIONS.join(', ')}` }, { status: 400 })
  }

  const now = new Date().toISOString()
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  let patch: Record<string, unknown>
  switch (action) {
    case 'enable':
      patch = { is_active: true, updated_at: now }
      break
    case 'disable':
      patch = { is_active: false, updated_at: now }
      break
    case 'set_maintenance':
      patch = { is_maintenance: true, updated_at: now }
      break
    case 'clear_maintenance':
      patch = { is_maintenance: false, updated_at: now }
      break
    default:
      return NextResponse.json({ error: 'Unhandled action' }, { status: 400 })
  }

  const { error: dbErr } = await adminQuery(`ai_models?id=eq.${modelId}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  })

  if (dbErr) {
    return NextResponse.json({ error: dbErr }, { status: 500 })
  }

  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: `model_${action}`,
    targetType: 'ai_model',
    targetId: modelId,
    reason: `Admin action: ${action}`,
    ip,
  })

  // For form submissions, redirect back to models page
  if (!contentType.includes('application/json')) {
    return NextResponse.redirect(new URL('/admin/models', request.url))
  }

  return NextResponse.json({ ok: true, action, modelId })
}
