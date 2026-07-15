import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'

export async function GET(request: NextRequest) {
  const { error } = await requireAdminAuth('credits.view')
  if (error) return error

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('user_id')

  let path = `token_ledger?select=id,user_id,entry_type,credit_amount,debit_amount,balance_after,reason,admin_reason,created_at&order=created_at.desc&limit=50`
  if (userId) path += `&user_id=eq.${userId}`

  const { data, error: dbErr } = await adminQuery(path)
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

  const { user_id, credit_amount, reason } = body as {
    user_id?: string
    credit_amount?: number
    reason?: string
  }

  if (!user_id) {
    return NextResponse.json({ error: 'user_id is required.' }, { status: 400 })
  }
  if (!credit_amount || typeof credit_amount !== 'number' || credit_amount <= 0) {
    return NextResponse.json({ error: 'credit_amount must be a positive number.' }, { status: 400 })
  }
  if (!reason || reason.trim().length < 10) {
    return NextResponse.json({ error: 'A reason of at least 10 characters is required.' }, { status: 400 })
  }

  // Get current balance
  const { data: ledgerData } = await adminQuery<Array<{ balance_after: number }>>(
    `token_ledger?user_id=eq.${user_id}&select=balance_after&order=created_at.desc&limit=1`
  )
  const currentBalance = ledgerData?.[0]?.balance_after ?? 0
  const newBalance = currentBalance + credit_amount

  const { data, error: dbErr } = await adminQuery('token_ledger', {
    method: 'POST',
    body: JSON.stringify({
      user_id,
      entry_type: 'admin_adjustment',
      credit_amount,
      debit_amount: 0,
      balance_after: newBalance,
      reason,
      admin_user_id: session!.adminUserId !== 'bootstrap' ? session!.adminUserId : null,
      admin_reason: reason,
    }),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'add_credits',
    targetType: 'platform_user',
    targetId: user_id,
    reason,
    metadata: { credit_amount, new_balance: newBalance },
    ip,
  })

  return NextResponse.json({ data, new_balance: newBalance })
}
