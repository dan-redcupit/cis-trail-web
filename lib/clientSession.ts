// Client-side session management for CSRF protection

const TOKEN_KEY = 'token';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(TOKEN_KEY, token);
}

export async function bootstrap(): Promise<string> {
  const response = await fetch('/api/bootstrap', {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to bootstrap session');
  }

  const data = await response.json();
  const token = data.session_token;
  setStoredToken(token);
  return token;
}

export async function ensureToken(): Promise<string> {
  const existing = getStoredToken();
  if (existing) return existing;
  return bootstrap();
}

interface AuthenticatedPostOptions {
  url: string;
  body: Record<string, unknown>;
}

interface PostResponse<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export async function authenticatedPost<T = unknown>(
  options: AuthenticatedPostOptions
): Promise<PostResponse<T>> {
  const { url, body } = options;

  // Get or create token
  let token = await ensureToken();

  // First attempt
  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ ...body, token }),
  });

  // If 422, retry once with fresh token
  if (response.status === 422) {
    token = await bootstrap();

    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...body, token }),
    });

    // Still failing after retry
    if (response.status === 422) {
      const data = await response.json();
      return { ok: false, status: 422, error: data.error };
    }
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    return { ok: false, status: response.status, error: data.error };
  }

  const data = await response.json();

  // Update token if new one provided
  if (data.session_token) {
    setStoredToken(data.session_token);
  }

  return { ok: true, status: response.status, data };
}
