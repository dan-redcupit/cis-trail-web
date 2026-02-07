'use client';

import { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '@/lib/gameState';
import * as sounds from '@/lib/sounds';

interface TitleScreenProps {
  onContinue: () => void;
  onLeaderboard: () => void;
  onAchievements: () => void;
  onGodMode: () => void;
  onSetDifficulty: (difficulty: Difficulty) => void;
  godMode: boolean;
  difficulty: Difficulty;
}

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const DIFFICULTY_LABELS: Record<Difficulty, { name: string; color: string; description: string }> = {
  easy: { name: 'IG1 Starter', color: 'text-green-400', description: '+50% morale, -50% death chance' },
  normal: { name: 'IG2 Professional', color: 'text-terminal-green', description: 'Standard difficulty' },
  hard: { name: 'Full Compliance', color: 'text-terminal-yellow', description: '+50% bad events, tougher questions' },
  nightmare: { name: 'External Audit', color: 'text-terminal-red', description: 'One wrong answer = game over' },
};

export default function TitleScreen({
  onContinue,
  onLeaderboard,
  onAchievements,
  onGodMode,
  onSetDifficulty,
  godMode,
  difficulty
}: TitleScreenProps) {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showCheatActivated, setShowCheatActivated] = useState(false);
  const [yearClicks, setYearClicks] = useState(0);
  const [retroMode, setRetroMode] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [helpClicks, setHelpClicks] = useState(0);
  const [showSecrets, setShowSecrets] = useState(false);

  // Konami code listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() === e.key ? e.key : e.key;
      const expected = KONAMI_CODE[konamiIndex];

      if (key === expected || (key.toLowerCase() === expected)) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);

        if (newIndex === KONAMI_CODE.length) {
          // Konami code completed!
          sounds.playCheatActivated();
          onGodMode();
          setShowCheatActivated(true);
          setKonamiIndex(0);
          setTimeout(() => setShowCheatActivated(false), 3000);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, onGodMode]);

  // Year click easter egg
  const handleYearClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const newClicks = yearClicks + 1;
    setYearClicks(newClicks);

    if (newClicks >= 10) {
      sounds.playSecretFound();
      setRetroMode(!retroMode);
      setYearClicks(0);
    }
  }, [yearClicks, retroMode]);

  // Help title click to reveal secrets
  const handleHelpTitleClick = () => {
    const newClicks = helpClicks + 1;
    setHelpClicks(newClicks);
    if (newClicks >= 5) {
      sounds.playSecretFound();
      setShowSecrets(true);
      setHelpClicks(0);
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    sounds.playSelect();
    onSetDifficulty(newDifficulty);
    setShowDifficulty(false);
  };

  const difficultyInfo = DIFFICULTY_LABELS[difficulty];

  return (
    <div className={`text-center max-w-2xl mx-auto ${retroMode ? 'font-mono' : ''}`}>
      {/* Cheat activated overlay */}
      {showCheatActivated && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-4xl font-bold text-terminal-cyan animate-pulse bg-terminal-bg/90 px-8 py-4 border-2 border-terminal-cyan">
            GOD MODE ACTIVATED
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/80 p-4">
          <div className="bg-terminal-bg border-2 border-terminal-green p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div
              className="text-terminal-green text-2xl font-bold mb-4 cursor-pointer select-none"
              onClick={handleHelpTitleClick}
            >
              HOW TO PLAY
            </div>

            <div className="text-left text-terminal-green text-sm space-y-4">
              <div>
                <div className="text-terminal-cyan font-bold">OBJECTIVE:</div>
                <p>Lead your security team 2,000 miles to CIS V8 compliance. Answer questions correctly to progress!</p>
              </div>

              <div>
                <div className="text-terminal-cyan font-bold">ANSWERS:</div>
                <p><span className="text-green-400">PERFECT</span> - Best answer: +50 miles, +10 morale</p>
                <p><span className="text-terminal-yellow">ACCEPTABLE</span> - Good answer: +35 miles, +5 morale</p>
                <p><span className="text-terminal-red">INCORRECT</span> - Wrong: +15 miles, -15 morale, 50% death chance</p>
              </div>

              <div>
                <div className="text-terminal-cyan font-bold">ACTIONS:</div>
                <p><span className="font-bold">Continue</span> - Travel forward and face a question or event</p>
                <p><span className="font-bold">Rest</span> - Recover morale (+15) but travel slowly</p>
                <p><span className="font-bold">Hunt Vulnerabilities</span> - Scan for issues (risky!)</p>
              </div>

              <div>
                <div className="text-terminal-cyan font-bold">SPECIAL EVENTS:</div>
                <p><span className="font-bold">River Crossing</span> - Choose how to cross (some options are risky)</p>
                <p><span className="font-bold">Valley of Despair</span> - Convince leadership CIS matters</p>
              </div>

              <div>
                <div className="text-terminal-cyan font-bold">WIN/LOSE:</div>
                <p>WIN: Reach 2,000 miles with at least one survivor</p>
                <p>LOSE: All team members die OR morale hits 0</p>
              </div>

              {/* Hidden Easter Eggs Section */}
              {showSecrets && (
                <div className="mt-6 pt-4 border-t border-terminal-cyan">
                  <div className="text-terminal-cyan font-bold mb-2">SECRET EASTER EGGS:</div>
                  <div className="text-terminal-green/80 space-y-2 text-xs">
                    <p><span className="text-terminal-yellow">Konami Code:</span> On title screen, press: Up Up Down Down Left Right Left Right B A</p>
                    <p><span className="text-terminal-yellow">Retro Mode:</span> Click the year "2024" 10 times</p>
                    <p><span className="text-terminal-yellow">Secret Names:</span> Try naming a party member: KEVIN, CLIPPY, ADMIN, SNOWDEN, or SATOSHI</p>
                    <p><span className="text-terminal-yellow">Tank Attack:</span> Click the tank 5 times rapidly</p>
                    <p><span className="text-terminal-yellow">404 Compliance:</span> Reach exactly 404 miles</p>
                    <p><span className="text-terminal-yellow">Intern's Revenge:</span> Win with only "The Intern" surviving</p>
                    <p><span className="text-terminal-yellow">Perfect Run:</span> Win with 0 deaths and 100% accuracy</p>
                  </div>
                </div>
              )}
            </div>

            <button
              className="mt-6 terminal-btn w-full py-2"
              onClick={() => { sounds.playClick(); setShowHelp(false); setShowSecrets(false); setHelpClicks(0); }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Help Button */}
      <button
        className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg flex items-center justify-center font-bold"
        onClick={() => { sounds.playClick(); setShowHelp(true); }}
        title="Help"
      >
        ?
      </button>

      <div className="border-2 border-terminal-green p-6 sm:p-8 cursor-pointer" onClick={onContinue}>
        {/* Simple clean title */}
        <div className="text-terminal-green">
          <div className="text-4xl sm:text-6xl font-bold tracking-wider mb-2">
            THE
          </div>
          <div className="text-5xl sm:text-7xl font-bold tracking-widest mb-2">
            CIS
          </div>
          <div className="text-4xl sm:text-6xl font-bold tracking-wider">
            TRAIL
          </div>
        </div>

        {/* Decorative line */}
        <div className="my-6 text-terminal-green text-2xl tracking-widest">
          - - - - - - - - - -
        </div>

        {/* Subtitle */}
        <div className="text-terminal-green text-lg sm:text-xl">
          The Journey to CIS V8 IG1 & IG2 Compliance
        </div>

        {/* Year - clickable easter egg */}
        <div
          className="mt-4 text-terminal-cyan text-base cursor-pointer select-none"
          onClick={handleYearClick}
        >
          ~ {retroMode ? '1848' : '2024'} ~
        </div>

        {/* Flavor text */}
        <div className="mt-6 text-terminal-yellow text-sm italic">
          "You have died of unpatched vulnerabilities"
        </div>

        {/* God Mode indicator */}
        {godMode && (
          <div className="mt-4 text-terminal-cyan text-xs animate-pulse">
            [ GOD MODE ENABLED ]
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button className="terminal-btn text-lg px-6 py-3" onClick={onContinue}>
          Start Game
        </button>
        <button
          className="terminal-btn text-lg px-6 py-3 text-terminal-yellow border-terminal-yellow hover:bg-terminal-yellow"
          onClick={(e) => { e.stopPropagation(); onLeaderboard(); }}
        >
          Leaderboard
        </button>
        <button
          className="terminal-btn text-lg px-6 py-3 text-terminal-cyan border-terminal-cyan hover:bg-terminal-cyan"
          onClick={(e) => { e.stopPropagation(); onAchievements(); }}
        >
          Achievements
        </button>
        <button
          className={`terminal-btn text-lg px-6 py-3 ${difficultyInfo.color} border-current hover:bg-current`}
          onClick={(e) => { e.stopPropagation(); sounds.playClick(); setShowDifficulty(!showDifficulty); }}
        >
          {difficultyInfo.name}
        </button>
      </div>

      {/* Difficulty selector */}
      {showDifficulty && (
        <div className="mt-4 border-2 border-terminal-green p-4 text-left">
          <div className="text-terminal-green text-sm mb-3">SELECT DIFFICULTY:</div>
          {(Object.keys(DIFFICULTY_LABELS) as Difficulty[]).map((diff) => {
            const info = DIFFICULTY_LABELS[diff];
            const isSelected = diff === difficulty;
            return (
              <button
                key={diff}
                className={`w-full text-left p-2 mb-2 border ${isSelected ? 'border-terminal-cyan bg-terminal-cyan/20' : 'border-terminal-green/50'} ${info.color} hover:bg-terminal-green/20`}
                onClick={() => handleDifficultyChange(diff)}
              >
                <div className="font-bold">{info.name}</div>
                <div className="text-xs opacity-70">{info.description}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* Version */}
      <div className="mt-8 text-terminal-green/50 text-xs">
        v1.0.2 {godMode && '(cheater)'}
      </div>

      {/* Credit */}
      <div className="mt-2 text-terminal-green/40 text-xs">
        Inspired by Matt Lee
      </div>

      {/* Retro mode footer */}
      {retroMode && (
        <div className="mt-4 text-terminal-green/30 text-xs">
          [ RETRO MODE - You found a secret! ]
        </div>
      )}
    </div>
  );
}
