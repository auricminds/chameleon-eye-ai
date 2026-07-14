import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({ error: 'Owner authentication required.' }, { status: 503 })
}
