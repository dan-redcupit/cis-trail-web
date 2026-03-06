import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';
import { generateToken, createSessionCookie } from '@/lib/session';

export async function GET() {
  try {
    const sessionId = generateToken();
    const sessionToken = generateToken();

    const { env } = await getCloudflareContext();
    // Session tokens expire after 24 hours
    await env.SESSIONS.put(sessionId, sessionToken, { expirationTtl: 86400 });

    const response = NextResponse.json({ session_token: sessionToken });
    response.headers.set('Set-Cookie', createSessionCookie(sessionId));

    return response;
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
