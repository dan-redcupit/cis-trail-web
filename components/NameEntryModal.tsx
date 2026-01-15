'use client';

import { useState } from 'react';

interface NameEntryModalProps {
  score: number;
  accuracy: number;
  survivors: number;
  won: boolean;
  onSubmit: (name: string) => void;
  onSkip: () => void;
}

export default function NameEntryModal({
  score,
  accuracy,
  survivors,
  won,
  onSubmit,
  onSkip
}: NameEntryModalProps) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rank, setRank] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: name.trim(),
          score,
          accuracy,
          survivors,
          won
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRank(data.rank);
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="border-2 border-terminal-green p-6 max-w-md mx-4 bg-terminal-bg">
          <h2 className="text-terminal-green text-xl font-bold mb-4 text-center">
            SCORE SUBMITTED!
          </h2>

          {rank && (
            <p className="text-terminal-yellow text-center text-lg mb-4">
              You ranked #{rank} on the leaderboard!
            </p>
          )}

          <button
            className="terminal-btn w-full"
            onClick={() => onSubmit(name)}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="border-2 border-terminal-green p-6 max-w-md mx-4 bg-terminal-bg">
        <h2 className="text-terminal-green text-xl font-bold mb-4 text-center">
          SUBMIT YOUR SCORE
        </h2>

        <div className="text-terminal-cyan text-center mb-4">
          <div>Miles: {score}</div>
          <div>Accuracy: {accuracy}%</div>
          <div>Status: {won ? 'Certified!' : 'Failed'}</div>
        </div>

        <div className="mb-4">
          <label className="text-terminal-green block mb-2">
            Enter your name:
          </label>
          <input
            type="text"
            className="terminal-input w-full"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            disabled={submitting}
          />
        </div>

        <div className="flex gap-2">
          <button
            className="terminal-btn flex-1"
            onClick={handleSubmit}
            disabled={submitting || !name.trim()}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            className="terminal-btn flex-1 text-terminal-yellow border-terminal-yellow hover:bg-terminal-yellow"
            onClick={onSkip}
            disabled={submitting}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
