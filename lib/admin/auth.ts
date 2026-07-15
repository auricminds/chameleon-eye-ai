import 'server-only'
import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

export type AdminRole =
  | 'super_admin'
  | 'operations_admin'
  | 'finance_admin'
  | 'support_admin'
  | 'developer_admin'
  | 'security_admin'
  | 'content_moderator'
  | 'analyst'
  | 'read_only_admin'

export interface AdminSession {
  adminUserId: string
  email: string
  role: AdminRole
  fullName: string
}

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ['*'],
  operations_admin: [
    'users.view', 'users.manage', 'users.suspend', 'users.ban', 'users.end_sessions',
    'subscriptions.view', 'subscriptions.manage', 'subscriptions.cancel',
    'api_applications.view', 'api_applications.approve', 'api_applications.reject',
    'api_keys.view', 'api_keys.disable', 'api_keys.revoke',
    'credits.view', 'credits.manage',
    'support.view', 'support.reply',
    'usage.view', 'usage.export',
    'reports.view',
  ],
  finance_admin: [
    'payments.view', 'payments.refund',
    'invoices.view',
    'subscriptions.view',
    'usage.view', 'usage.export',
    'reports.view',
    'providers.view',
  ],
  support_admin: [
    'users.view',
    'subscriptions.view',
    'usage.view',
    'support.view', 'support.reply',
    'api_applications.view',
  ],
  developer_admin: [
    'usage.view', 'usage.export',
    'models.view', 'models.manage',
    'providers.view', 'providers.manage',
    'api_keys.view',
    'security.view',
    'system_health.view',
    'audit_logs.view',
    'reports.view',
  ],
  security_admin: [
    'security.view', 'security.manage',
    'audit_logs.view',
    'admin_users.view', 'admin_users.manage',
    'api_keys.view', 'api_keys.disable', 'api_keys.revoke',
    'users.view',
  ],
  content_moderator: [
    'users.view',
    'support.view', 'support.reply',
  ],
  analyst: [
    'usage.view', 'usage.export',
    'reports.view',
    'users.view',
    'subscriptions.view',
    'payments.view',
  ],
  read_only_admin: [
    'users.view',
    'subscriptions.view',
    'payments.view',
    'usage.view',
    'models.view',
    'providers.view',
    'audit_logs.view',
    'reports.view',
  ],
}

export function hasPermission(role: AdminRole, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role]
  if (!perms) return false
  if (perms.includes('*')) return true
  return perms.includes(permission)
}

export function requirePermission(role: AdminRole, permission: string): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Permission denied: requires ${permission}`)
  }
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'dev-secret-change-in-prod-32chars'
}

export function hashToken(token: string): string {
  return createHmac('sha256', getSecret()).update(token).digest('hex')
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token) return null

    const dotIndex = token.lastIndexOf('.')
    if (dotIndex === -1) return null

    const payload = token.substring(0, dotIndex)
    const sig = token.substring(dotIndex + 1)
    const expectedSig = hashToken(payload)

    if (sig.length !== expectedSig.length) return null
    if (!timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expectedSig, 'hex'))) return null

    const session = JSON.parse(Buffer.from(payload, 'base64').toString()) as AdminSession
    if (!session.adminUserId || !session.email || !session.role) return null
    return session
  } catch {
    return null
  }
}

export function createSessionToken(session: AdminSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64')
  const sig = hashToken(payload)
  return `${payload}.${sig}`
}
