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

// Role permission matrix
export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ['*'],
  operations_admin: ['users', 'subscriptions', 'credits', 'api_applications', 'support', 'reports'],
  finance_admin: ['payments', 'revenue', 'invoices', 'refunds', 'renewals', 'provider_costs'],
  support_admin: ['user_details', 'subscription_status', 'usage_basic', 'support_tickets'],
  developer_admin: ['ai_requests', 'api_requests', 'error_logs', 'models', 'providers', 'webhooks', 'jobs', 'system_health'],
  security_admin: ['security_events', 'audit_logs', 'api_keys', 'admin_users'],
  content_moderator: ['content', 'user_content'],
  analyst: ['analytics', 'reports'],
  read_only_admin: ['read_only'],
}

export function hasPermission(role: AdminRole, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role]
  return perms.includes('*') || perms.includes(permission)
}

export function hashToken(token: string): string {
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'dev-secret-change-in-prod')
    .update(token)
    .digest('hex')
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null

  // In production: look up token_hash in admin_sessions table via Supabase
  // For now, validate the structured token directly (in prod replace with DB lookup)
  try {
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return null
    const expectedSig = hashToken(payload)
    if (!timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expectedSig, 'hex'))) return null
    return JSON.parse(Buffer.from(payload, 'base64').toString()) as AdminSession
  } catch {
    return null
  }
}

export function createSessionToken(session: AdminSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64')
  const sig = hashToken(payload)
  return `${payload}.${sig}`
}
