import { getCloudflareContext } from '@opennextjs/cloudflare';

// Generate 16 random bytes as hex string
export function generateToken(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Fetch a dad joke for error messages
export async function getDadJoke(): Promise<string> {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'User-Agent': 'CISTrail 1.1',
        Accept: 'application/json',
      },
    });
    const data = await response.json() as { joke: string };
    return data.joke;
  } catch {
    return "Why don't scientists trust atoms? Because they make up everything!";
  }
}

// Validate session and token from request
export async function validateSession(
  request: Request
): Promise<{ valid: boolean; sessionId: string | null }> {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [key, ...rest] = c.trim().split('=');
      return [key, rest.join('=')];
    })
  );

  const sessionId = cookies['session'];
  if (!sessionId) {
    return { valid: false, sessionId: null };
  }

  let body: { token?: string };
  try {
    body = await request.clone().json();
  } catch {
    return { valid: false, sessionId };
  }

  const providedToken = body.token;
  if (!providedToken) {
    return { valid: false, sessionId };
  }

  try {
    const { env } = await getCloudflareContext();
    const storedToken = await env.SESSIONS.get(sessionId);

    if (!storedToken || storedToken !== providedToken) {
      return { valid: false, sessionId };
    }

    return { valid: true, sessionId };
  } catch {
    return { valid: false, sessionId };
  }
}

// Rotate the session token (same session ID, new token)
export async function rotateToken(sessionId: string): Promise<string> {
  const newToken = generateToken();
  const { env } = await getCloudflareContext();
  // Session tokens expire after 24 hours
  await env.SESSIONS.put(sessionId, newToken, { expirationTtl: 86400 });
  return newToken;
}

// Create session cookie header value
export function createSessionCookie(sessionId: string): string {
  return `session=${sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/`;
}
