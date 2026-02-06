'use client';

import { useEffect, useState } from 'react';
import { GameState } from '@/lib/gameState';
import { playVictory, playCheatActivated } from '@/lib/sounds';
import MattLeeCharacter from './MattLeeCharacter';

interface VictoryScreenProps {
  state: GameState;
  onRestart: () => void;
  onSubmitScore: () => void;
}

// Check for special ending conditions
function getSpecialEnding(state: GameState, survivors: { name: string; alive: boolean }[], accuracy: number): {
  title: string;
  subtitle: string;
  special: string | null;
  color: string;
} | null {
  // Perfect Run: 0 deaths + 100% accuracy
  if (survivors.length === state.party.length && accuracy === 100) {
    return {
      title: '★ LEGENDARY CISO ★',
      subtitle: 'PERFECT COMPLIANCE RUN',
      special: 'Zero casualties. 100% accuracy. You are a compliance god.',
      color: 'text-yellow-400'
    };
  }

  // Intern's Revenge: Only the intern survives
  const internSurvived = survivors.length === 1 &&
    (survivors[0].name.toLowerCase().includes('intern') || survivors[0].name === 'The Intern (unnamed)');
  if (internSurvived) {
    return {
      title: '★ INTERN\'S REVENGE ★',
      subtitle: 'THE INTERN BECOMES CISO',
      special: 'Against all odds, the intern was the only survivor. They are now the new CISO.',
      color: 'text-purple-400'
    };
  }

  // Solo Survivor: Only 1 person survives (not intern)
  if (survivors.length === 1) {
    return {
      title: '★ SOLE SURVIVOR ★',
      subtitle: 'LONE WOLF COMPLIANCE',
      special: `${survivors[0].name} carried the team on their back. Respect.`,
      color: 'text-orange-400'
    };
  }

  // Against All Odds: Won with negative SPRS
  if (state.sprsScore < 0) {
    return {
      title: '★ AGAINST ALL ODDS ★',
      subtitle: 'CERTIFIED DESPITE EVERYTHING',
      special: `You achieved certification with a SPRS of ${state.sprsScore}. The auditors are baffled.`,
      color: 'text-red-400'
    };
  }

  return null;
}

export default function VictoryScreen({ state, onRestart, onSubmitScore }: VictoryScreenProps) {
  const [showSpecial, setShowSpecial] = useState(false);

  const survivors = state.party.filter(m => m.alive);
  const fallen = state.party.filter(m => !m.alive);
  const accuracy = state.questionsAnswered > 0
    ? Math.round((state.correctAnswers / state.questionsAnswered) * 100)
    : 0;

  const specialEnding = getSpecialEnding(state, survivors, accuracy);

  useEffect(() => {
    if (specialEnding) {
      playCheatActivated();
      setTimeout(() => setShowSpecial(true), 500);
    } else {
      playVictory();
    }
  }, [specialEnding]);

  // Special ending display
  if (specialEnding && showSpecial) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className={`border-4 ${specialEnding.color.replace('text-', 'border-')} p-4 sm:p-6 animate-pulse`}>
          <div className={`${specialEnding.color} text-xl sm:text-3xl font-bold mb-2`}>
            {specialEnding.title}
          </div>
          <div className={`${specialEnding.color} text-lg sm:text-xl mb-4`}>
            {specialEnding.subtitle}
          </div>
          <div className="text-terminal-green text-sm sm:text-base mb-4 italic">
            {specialEnding.special}
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
              <span>Final SPRS Score:</span>
              <span>{state.sprsScore}</span>
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

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        {/* Celebrating Matt Lee character */}
        <div className="flex justify-center mb-4">
          <MattLeeCharacter
            animation="celebrating"
            size="compact"
            style={{ transform: 'scale(1.5)' }}
          />
        </div>

        <div className="text-terminal-green text-xl sm:text-3xl font-bold mb-2">
          ★ ★ ★ COMPLIANT ★ ★ ★
        </div>
        <div className="text-terminal-green text-lg sm:text-xl mb-4">
          CIS V8 IG2 - ACHIEVED!
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
          (...until next year's CIS benchmark update)
        </p>
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
