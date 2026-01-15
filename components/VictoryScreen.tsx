'use client';

import { GameState } from '@/lib/gameState';

interface VictoryScreenProps {
  state: GameState;
  onRestart: () => void;
}

export default function VictoryScreen({ state, onRestart }: VictoryScreenProps) {
  const survivors = state.party.filter(m => m.alive);
  const fallen = state.party.filter(m => !m.alive);
  const accuracy = state.questionsAnswered > 0
    ? Math.round((state.correctAnswers / state.questionsAnswered) * 100)
    : 0;

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        <div className="text-terminal-green text-xl sm:text-3xl font-bold mb-2">
          ★ ★ ★ CERTIFIED ★ ★ ★
        </div>
        <div className="text-terminal-green text-lg sm:text-xl mb-4">
          CMMC LEVEL 2 - ACHIEVED!
        </div>

        <div className="border-t border-terminal-green pt-4 space-y-2 text-sm sm:text-base">
          <div className="flex justify-between">
            <span>Survivors:</span>
            <span>{survivors.length}/{state.party.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Questions Answered:</span>
            <span>{state.questionsAnswered}</span>
          </div>
          <div className="flex justify-between">
            <span>Accuracy:</span>
            <span>{accuracy}%</span>
          </div>
          <div className="flex justify-between">
            <span>Final Morale:</span>
            <span>{state.morale}%</span>
          </div>
          <div className="flex justify-between">
            <span>Final SPRS Score:</span>
            <span>{state.sprsScore}</span>
          </div>
        </div>

        <div className="border-t border-terminal-green pt-4 mt-4 text-left text-sm sm:text-base">
          <div className="text-terminal-green font-bold">SURVIVORS:</div>
          {survivors.map((m, i) => (
            <div key={i} className="text-terminal-green ml-2">🏆 {m.name}</div>
          ))}

          {fallen.length > 0 && (
            <>
              <div className="text-terminal-red font-bold mt-2">FALLEN:</div>
              {fallen.map((m, i) => (
                <div key={i} className="text-terminal-red ml-2">⚰️ {m.name}</div>
              ))}
            </>
          )}
        </div>

        <p className="text-terminal-yellow text-sm mt-4 italic">
          (...until next year's reassessment)
        </p>
      </div>

      <button className="terminal-btn mt-6" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}
