'use client';

import { useEffect } from 'react';
import { GameState } from '@/lib/gameState';
import { playGameOver } from '@/lib/sounds';

interface GameOverScreenProps {
  state: GameState;
  onRestart: () => void;
  onSubmitScore: () => void;
}

export default function GameOverScreen({ state, onRestart, onSubmitScore }: GameOverScreenProps) {
  useEffect(() => {
    playGameOver();
  }, []);

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-red p-4 sm:p-6">
        <div className="text-terminal-red text-2xl sm:text-4xl font-bold mb-4">
          GAME OVER
        </div>

        <p className="text-terminal-yellow text-base sm:text-lg mb-6">
          {state.gameOverReason}
        </p>

        <div className="border-t border-terminal-red pt-4">
          <div className="text-terminal-cyan text-lg font-bold mb-2">Final Statistics:</div>
          <div className="text-terminal-green space-y-1">
            <div>Miles Traveled: {state.milesTraveled}</div>
            <div>Questions Answered: {state.questionsAnswered}</div>
            <div>Correct Answers: {state.correctAnswers}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button className="terminal-btn" onClick={onRestart}>
          Play Again
        </button>
        <button
          className="terminal-btn text-terminal-yellow border-terminal-yellow hover:bg-terminal-yellow"
          onClick={onSubmitScore}
        >
          Submit Score
        </button>
      </div>
    </div>
  );
}
