import { NextResponse } from 'next/server'
import { getAdminSession, hashToken } from '@/lib/admin/auth'
import { adminQuery } from '@/lib/admin/supabase'
import { cookies } from 'next/headers'

export async function POST() {
  const session = await getAdminSession()

  if (session) {
    // Revoke session token in DB if it exists
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (token) {
      const tokenHash = hashToken(token.split('.')[0] ?? '')
      await adminQuery(`admin_sessions?token_hash=eq.${tokenHash}`, {
        method: 'PATCH',
        body: JSON.stringify({ revoked_at: new Date().toISOString() }),
      })
    }
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}
