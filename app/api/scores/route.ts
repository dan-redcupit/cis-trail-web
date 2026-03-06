import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';
import { validateSession, rotateToken, getDadJoke } from '@/lib/session';

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  accuracy: number;
  survivors: number;
  completedAt: string;
  won: boolean;
}

const LEADERBOARD_KEY = 'cis-trail-leaderboard';
const MAX_ENTRIES = 100;

// In-memory fallback for development
let inMemoryLeaderboard: LeaderboardEntry[] = [];

async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const { env } = await getCloudflareContext();
    const data = await env.LEADERBOARD.get<LeaderboardEntry[]>(LEADERBOARD_KEY, 'json');
    return data || [];
  } catch {
    // Fallback to in-memory for local dev without KV
    console.log('Using in-memory leaderboard (KV not configured)');
    return inMemoryLeaderboard;
  }
}

async function saveLeaderboard(entries: LeaderboardEntry[]): Promise<void> {
  try {
    const { env } = await getCloudflareContext();
    await env.LEADERBOARD.put(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch {
    // Fallback to in-memory
    inMemoryLeaderboard = entries;
  }
}

// GET - Fetch leaderboard (no auth required)
export async function GET() {
  try {
    const leaderboard = await getLeaderboard();

    // Sort by score (miles), then by accuracy
    const sorted = leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.accuracy - a.accuracy;
    });

    return NextResponse.json(sorted.slice(0, MAX_ENTRIES));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST - Submit a new score (requires valid session)
export async function POST(request: Request) {
  try {
    // Validate session
    const { valid, sessionId } = await validateSession(request);
    if (!valid || !sessionId) {
      const joke = await getDadJoke();
      return NextResponse.json({ error: joke }, { status: 422 });
    }

    // Re-parse body since validateSession consumed it
    const body = await request.json();
    const { playerName, score, accuracy, survivors, won } = body;

    // Validate input
    if (!playerName || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // Sanitize player name (max 20 chars, alphanumeric + spaces)
    const sanitizedName = playerName
      .slice(0, 20)
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim() || 'Anonymous';

    const newEntry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      playerName: sanitizedName,
      score: Math.max(0, Math.min(2000, score)),
      accuracy: Math.max(0, Math.min(100, accuracy || 0)),
      survivors: Math.max(0, Math.min(5, survivors || 0)),
      completedAt: new Date().toISOString(),
      won: Boolean(won),
    };

    const leaderboard = await getLeaderboard();
    leaderboard.push(newEntry);

    // Sort and keep top entries
    const sorted = leaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.accuracy - a.accuracy;
    }).slice(0, MAX_ENTRIES);

    await saveLeaderboard(sorted);

    // Rotate token for next request
    const newToken = await rotateToken(sessionId);

    // Find rank of new entry
    const rank = sorted.findIndex(e => e.id === newEntry.id) + 1;

    return NextResponse.json({
      success: true,
      rank,
      entry: newEntry,
      session_token: newToken,
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    return NextResponse.json(
      { error: 'Failed to submit score' },
      { status: 500 }
    );
  }
}
