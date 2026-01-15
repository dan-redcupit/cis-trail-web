'use client';

import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  accuracy: number;
  survivors: number;
  completedAt: string;
  won: boolean;
}

interface LeaderboardScreenProps {
  onClose: () => void;
}

export default function LeaderboardScreen({ onClose }: LeaderboardScreenProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/scores');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        <h1 className="text-terminal-green text-xl sm:text-2xl font-bold mb-4">
          LEADERBOARD
        </h1>

        {loading && (
          <p className="text-terminal-cyan">Loading scores...</p>
        )}

        {error && (
          <p className="text-terminal-red">{error}</p>
        )}

        {!loading && !error && entries.length === 0 && (
          <p className="text-terminal-yellow">No scores yet. Be the first!</p>
        )}

        {!loading && !error && entries.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-terminal-green">
                  <th className="py-2 px-1 text-terminal-cyan">#</th>
                  <th className="py-2 px-1 text-terminal-cyan">Name</th>
                  <th className="py-2 px-1 text-terminal-cyan">Miles</th>
                  <th className="py-2 px-1 text-terminal-cyan">Acc%</th>
                  <th className="py-2 px-1 text-terminal-cyan">Status</th>
                </tr>
              </thead>
              <tbody>
                {entries.slice(0, 20).map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-terminal-darkgreen ${
                      index < 3 ? 'text-terminal-yellow' : 'text-terminal-green'
                    }`}
                  >
                    <td className="py-2 px-1">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </td>
                    <td className="py-2 px-1 truncate max-w-[100px]">{entry.playerName}</td>
                    <td className="py-2 px-1">{entry.score}</td>
                    <td className="py-2 px-1">{entry.accuracy}%</td>
                    <td className="py-2 px-1">
                      {entry.won ? (
                        <span className="text-terminal-green">✓ Certified</span>
                      ) : (
                        <span className="text-terminal-red">✗ Failed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <button className="terminal-btn mt-6" onClick={onClose}>
        Back to Game
      </button>
    </div>
  );
}
