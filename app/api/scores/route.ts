import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  accuracy: number;
  survivors: number;
  completedAt: string;
  won: boolean;
}

const LEADERBOARD_KEY = 'cmmc-trail-leaderboard';
const MAX_ENTRIES = 100;

// In-memory fallback for development
let inMemoryLeaderboard: LeaderboardEntry[] = [];

async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const data = await kv.get<LeaderboardEntry[]>(LEADERBOARD_KEY);
    return data || [];
  } catch (error) {
    // Fallback to in-memory for local dev without KV
    console.log('Using in-memory leaderboard (KV not configured)');
    return inMemoryLeaderboard;
  }
}

async function saveLeaderboard(entries: LeaderboardEntry[]): Promise<void> {
  try {
    await kv.set(LEADERBOARD_KEY, entries);
  } catch (error) {
    // Fallback to in-memory
    inMemoryLeaderboard = entries;
  }
}

// GET - Fetch leaderboard
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

// POST - Submit a new score
export async function POST(request: Request) {
  try {
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

    // Find rank of new entry
    const rank = sorted.findIndex(e => e.id === newEntry.id) + 1;

    return NextResponse.json({
      success: true,
      rank,
      entry: newEntry
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    return NextResponse.json(
      { error: 'Failed to submit score' },
      { status: 500 }
    );
  }
}
