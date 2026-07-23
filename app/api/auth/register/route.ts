import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
  }
}

export async function POST(req: NextRequest) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return NextResponse.json({ error: 'Server not configured.' }, { status: 503 })
  }

  let body: {
    fullName?: string
    workEmail?: string
    companyName?: string
    role?: string
    password?: string
    locale?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = (body.workEmail ?? '').trim().toLowerCase()
  const password = (body.password ?? '').trim()
  const fullName = (body.fullName ?? '').trim()
  const company = (body.companyName ?? '').trim()
  const role = (body.role ?? '').trim()
  const locale = body.locale === 'ar' ? 'ar' : 'en'

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 422 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 422 })
  }

  // ── 1. Create the user in Supabase Auth ────────────────────────────────────
  const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      email,
      password,
      email_confirm: true, // mark as confirmed so they can log in immediately
      user_metadata: { full_name: fullName, company, role },
    }),
  })

  const authData = await authRes.json()

  if (!authRes.ok) {
    // Duplicate email → 422 with "User already registered"
    const msg: string = authData?.msg ?? authData?.message ?? authData?.error_description ?? 'Registration failed.'
    const isDuplicate =
      authRes.status === 422 ||
      msg.toLowerCase().includes('already') ||
      msg.toLowerCase().includes('registered') ||
      msg.toLowerCase().includes('exist')

    return NextResponse.json(
      { error: isDuplicate ? 'An account with this email already exists.' : msg },
      { status: isDuplicate ? 409 : 400 },
    )
  }

  const authUserId: string = authData.id

  // ── 2. Insert into platform_users ─────────────────────────────────────────
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/platform_users`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      auth_user_id: authUserId,
      email,
      full_name: fullName || null,
      company: company || null,
      registration_source: 'web',
      language: locale,
      account_status: 'active',
      email_verified: true,
      email_verified_at: new Date().toISOString(),
    }),
  })

  if (!insertRes.ok) {
    // Auth user created but profile insert failed — still return success
    // so the user isn't stuck; the sync endpoint can backfill later.
    console.error('[register] platform_users insert failed:', await insertRes.text())
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
