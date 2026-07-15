import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { createSessionToken, type AdminRole } from '@/lib/admin/auth'
import { adminQuery } from '@/lib/admin/supabase'

// Simple in-memory rate limiter (per instance — use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const window = 15 * 60 * 1000 // 15 minutes
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

function hashPassword(password: string): string {
  // In production, use bcrypt. For bootstrap, use HMAC-SHA256 with a secret.
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'dev-secret-change-in-prod')
    .update(password)
    .digest('hex')
}

interface AdminUserRow {
  id: string
  email: string
  password_hash: string
  role: AdminRole
  full_name: string
  is_active: boolean
}

export async function POST(request: NextRequest) {
  // Get IP for rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please wait 15 minutes and try again.' },
      { status: 429 }
    )
  }

  let body: { email?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { email, password } = body
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  // Bootstrap admin: check env vars first (for initial setup before DB is seeded)
  const bootstrapEmail = process.env.ADMIN_BOOTSTRAP_EMAIL
  const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD
  const bootstrapRole = (process.env.ADMIN_BOOTSTRAP_ROLE as AdminRole) || 'super_admin'

  if (bootstrapEmail && bootstrapPassword && email === bootstrapEmail && password === bootstrapPassword) {
    const session = {
      adminUserId: 'bootstrap',
      email: bootstrapEmail,
      role: bootstrapRole,
      fullName: 'Bootstrap Admin',
    }
    const token = createSessionToken(session)
    const response = NextResponse.json({ ok: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    })
    return response
  }

  // DB lookup
  const { data, error } = await adminQuery<AdminUserRow[]>(
    `admin_users?email=eq.${encodeURIComponent(email)}&select=id,email,password_hash,role,full_name,is_active&limit=1`
  )

  if (error || !data || data.length === 0) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  const user = data[0]
  if (!user.is_active) {
    return NextResponse.json({ error: 'This admin account has been deactivated.' }, { status: 401 })
  }

  const passwordHash = hashPassword(password)
  if (passwordHash !== user.password_hash) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  const session = {
    adminUserId: user.id,
    email: user.email,
    role: user.role,
    fullName: user.full_name,
  }
  const token = createSessionToken(session)

  // Update last_login_at
  await adminQuery(`admin_users?id=eq.${user.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ last_login_at: new Date().toISOString(), login_count: user.id }),
  })

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  })
  return response
}
