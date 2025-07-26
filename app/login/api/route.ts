import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const backendRes = await fetch('https://saas-backend-production-fb63.up.railway.app/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await backendRes.json();
    // console.log(data)
    if (!backendRes.ok) {
      return NextResponse.json({ error: data.message || 'Login failed' }, { status: backendRes.status });
    }

    // ✅ Set cookie with token
    const response = NextResponse.json({ message: 'Login successful' });
    // console.log("Setting token:", data.data.access_token)

    response.cookies.set('token', data.data.access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false, // for localhost
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
