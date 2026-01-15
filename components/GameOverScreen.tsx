'use client';

import { GameState } from '@/lib/gameState';

interface GameOverScreenProps {
  state: GameState;
  onRestart: () => void;
}

export default function GameOverScreen({ state, onRestart }: GameOverScreenProps) {
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

      <button className="terminal-btn mt-6" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}
