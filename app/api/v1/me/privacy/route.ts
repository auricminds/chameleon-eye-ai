// User privacy settings
// Returns 503 until Supabase auth is connected
import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({ error: 'Authentication required.' }, { status: 503 })
}
export async function PATCH() {
  return NextResponse.json({ error: 'Authentication required.' }, { status: 503 })
}
