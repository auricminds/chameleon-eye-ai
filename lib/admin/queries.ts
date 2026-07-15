import 'server-only'

// Returns count from content-range header or 0
export async function countQuery(table: string, params = ''): Promise<number> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return 0
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id${params ? '&' + params : ''}`, {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'count=exact',
        'Range': '0-0',
      },
      next: { revalidate: 0 },
    })
    const range = res.headers.get('content-range') || ''
    const match = range.match(/\/(\d+)$/)
    return match ? parseInt(match[1], 10) : 0
  } catch {
    return 0
  }
}

export async function sumQuery(
  table: string,
  column: string,
  params = ''
): Promise<number> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return 0
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?select=${column}.sum()${params ? '&' + params : ''}`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 0 },
      }
    )
    if (!res.ok) return 0
    const data = await res.json() as Array<Record<string, number>>
    return data?.[0]?.[`${column}.sum()`] ?? data?.[0]?.sum ?? 0
  } catch {
    return 0
  }
}
