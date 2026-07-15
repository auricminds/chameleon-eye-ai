import 'server-only'

// Admin Supabase client using service role key
// Only use in Server Components and API routes
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function adminQuery<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return { data: null, error: 'Supabase not configured' }
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=representation',
        ...(options.headers as Record<string, string> | undefined),
      },
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      const err = await res.text()
      return { data: null, error: err }
    }
    const data = await res.json()
    return { data, error: null }
  } catch (e) {
    return { data: null, error: String(e) }
  }
}
