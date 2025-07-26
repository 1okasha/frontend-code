// /app/api/verify-otp/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const response = await fetch('https://saas-backend-production-fb63.up.railway.app/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // expects { email, otp }
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data?.detail || 'OTP verification failed' }, { status: response.status })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: error?.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
