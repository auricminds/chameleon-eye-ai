// Public trust documents API
// Full implementation pending backend connection
import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({
    documents: [],
    note: 'Trust documents API — full implementation coming.'
  })
}
