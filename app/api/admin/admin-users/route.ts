import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth, writeAuditLog } from '@/lib/admin/api-helpers'
import { adminQuery } from '@/lib/admin/supabase'
import { createHash } from 'crypto'

const VALID_ROLES = [
  'super_admin', 'operations_admin', 'finance_admin', 'support_admin',
  'developer_admin', 'security_admin', 'content_moderator', 'analyst', 'read_only_admin',
]

export async function GET() {
  const { error } = await requireAdminAuth('admin_users.view')
  if (error) return error

  const { data, error: dbErr } = await adminQuery(
    `admin_users?select=id,email,full_name,role,is_active,mfa_enabled,last_login_at,login_count,created_at&order=created_at.asc`
  )
  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireAdminAuth('admin_users.manage')
  if (error) return error

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { email, full_name, role, password } = body as {
    email?: string
    full_name?: string
    role?: string
    password?: string
  }

  if (!email || !full_name || !role || !password) {
    return NextResponse.json({ error: 'email, full_name, role, and password are required.' }, { status: 400 })
  }
  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: `Invalid role. Valid: ${VALID_ROLES.join(', ')}` }, { status: 400 })
  }
  if (typeof password !== 'string' || password.length < 12) {
    return NextResponse.json({ error: 'Password must be at least 12 characters.' }, { status: 400 })
  }

  // Hash password with SHA-256 (in production use bcrypt via edge function)
  const passwordHash = createHash('sha256').update(password).digest('hex')

  const { data, error: dbErr } = await adminQuery('admin_users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      full_name,
      role,
      password_hash: passwordHash,
      is_active: true,
    }),
  })

  if (dbErr) return NextResponse.json({ error: dbErr }, { status: 500 })

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  await writeAuditLog({
    adminUserId: session!.adminUserId,
    adminEmail: session!.email,
    action: 'create_admin_user',
    targetType: 'admin_user',
    reason: `Created admin user ${email} with role ${role}`,
    ip,
  })

  return NextResponse.json({ data })
}
