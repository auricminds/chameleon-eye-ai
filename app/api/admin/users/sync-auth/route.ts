import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin/auth'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function headers() {
  return {
    'Content-Type': 'application/json',
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
  }
}

interface AuthUser {
  id: string
  email?: string
  created_at: string
  user_metadata?: { full_name?: string; company?: string; role?: string }
  last_sign_in_at?: string
}

export async function POST() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return NextResponse.json({ error: 'Supabase not configured.' }, { status: 503 })
  }

  // ── 1. Fetch all users from Supabase Auth ──────────────────────────────────
  const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=1000`, {
    headers: headers(),
  })

  if (!authRes.ok) {
    return NextResponse.json(
      { error: `Auth API error: ${await authRes.text()}` },
      { status: 502 },
    )
  }

  const authData = await authRes.json()
  const authUsers: AuthUser[] = authData.users ?? []

  if (authUsers.length === 0) {
    return NextResponse.json({ synced: 0, skipped: 0, message: 'No auth users found.' })
  }

  // ── 2. Fetch existing platform_users auth_user_ids ─────────────────────────
  const existingRes = await fetch(
    `${SUPABASE_URL}/rest/v1/platform_users?select=auth_user_id`,
    { headers: { ...headers(), Prefer: 'return=representation' } },
  )

  const existing: { auth_user_id: string | null }[] = existingRes.ok
    ? await existingRes.json()
    : []

  const existingIds = new Set(
    existing.map((r) => r.auth_user_id).filter(Boolean) as string[],
  )

  // ── 3. Insert missing users ────────────────────────────────────────────────
  const toInsert = authUsers.filter((u) => u.email && !existingIds.has(u.id))

  if (toInsert.length === 0) {
    return NextResponse.json({
      synced: 0,
      skipped: authUsers.length,
      message: 'All auth users already have platform profiles.',
    })
  }

  const rows = toInsert.map((u) => ({
    auth_user_id: u.id,
    email: u.email!,
    full_name: u.user_metadata?.full_name ?? null,
    company: u.user_metadata?.company ?? null,
    registration_source: 'web',
    account_status: 'active',
    email_verified: true,
    email_verified_at: u.created_at,
    last_login_at: u.last_sign_in_at ?? null,
  }))

  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/platform_users`, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify(rows),
  })

  if (!insertRes.ok) {
    return NextResponse.json(
      { error: `Insert failed: ${await insertRes.text()}` },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    synced: toInsert.length,
    skipped: authUsers.length - toInsert.length,
    message: `Synced ${toInsert.length} user(s) from Supabase Auth into platform_users.`,
  })
}
