import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin/auth'
import { adminQuery } from '@/lib/admin/supabase'

const REQUIRED_TABLES = [
  'admin_users',
  'admin_audit_logs',
  'platform_users',
  'subscriptions',
  'subscription_plans',
  'payments',
  'invoices',
  'api_keys',
  'api_applications',
  'ai_usage_logs',
  'ai_models',
  'ai_providers',
  'support_tickets',
  'webhook_events',
  'feature_flags',
  'platform_settings',
  'admin_notifications',
  'promotions',
  'token_ledger',
]

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const configured = !!(supabaseUrl && supabaseKey)

  if (!configured) {
    return NextResponse.json({
      ok: false,
      configured: false,
      message: 'NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set',
      tables: {},
    })
  }

  // Test each table by doing a COUNT(0) — fast, no data returned
  const results: Record<string, 'ok' | 'missing' | 'error'> = {}

  await Promise.all(
    REQUIRED_TABLES.map(async (table) => {
      const { data, error } = await adminQuery<{ count: string }[]>(
        `${table}?select=count&limit=1`,
        { headers: { Prefer: 'count=exact', Range: '0-0' } },
      )
      if (error) {
        // Supabase returns 42P01 code when table doesn't exist
        results[table] = error.includes('42P01') || error.includes('does not exist')
          ? 'missing'
          : 'error'
      } else {
        results[table] = 'ok'
      }
    }),
  )

  const missing = Object.entries(results).filter(([, v]) => v === 'missing').map(([k]) => k)
  const errors = Object.entries(results).filter(([, v]) => v === 'error').map(([k]) => k)
  const ok = missing.length === 0 && errors.length === 0

  return NextResponse.json({
    ok,
    configured: true,
    supabaseUrl: supabaseUrl?.replace(/https?:\/\//, '').split('.')[0] + '.supabase.co',
    tables: results,
    summary: {
      total: REQUIRED_TABLES.length,
      healthy: Object.values(results).filter((v) => v === 'ok').length,
      missing: missing.length,
      errors: errors.length,
    },
    missingTables: missing,
    errorTables: errors,
    message: ok
      ? 'All database tables are present and reachable.'
      : missing.length > 0
      ? `${missing.length} table(s) missing — run the migrations in your Supabase SQL editor.`
      : 'Some tables returned unexpected errors.',
  })
}
