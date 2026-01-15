'use client';

import { GameState } from '@/lib/gameState';

interface TrailScreenProps {
  state: GameState;
  onContinue: () => void;
  onRest: () => void;
  onHunt: () => void;
  onSupplies: () => void;
  onGiveUp: () => void;
}

export default function TrailScreen({ state, onContinue, onRest, onHunt, onSupplies, onGiveUp }: TrailScreenProps) {
  const progressPct = (state.milesTraveled / state.totalMiles) * 100;
  const milesRemaining = state.totalMiles - state.milesTraveled;
  const progressBarLen = 30;
  const filled = Math.floor((state.milesTraveled / state.totalMiles) * progressBarLen);
  const progressBar = '█'.repeat(filled) + '░'.repeat(progressBarLen - filled);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-terminal-green text-center text-xl sm:text-2xl font-bold border-2 border-terminal-green p-2 mb-2">
        THE CMMC TRAIL
      </div>

      {/* Compact Scene */}
      <div className="border-2 border-terminal-green p-2 mb-2">
        <pre className="text-terminal-cyan text-xs sm:text-sm leading-tight text-center">
{`    *    SERVER    *         _.---.._
        MOUNTAIN            .'  CMMC  '.        ______________
    .    /\\  /\\    .       |  OR DIE   |=======| WAGON WEST |
       _/  \\/  \\_          |  TRYIN'   |       |_____________|
   ~~~LEGACY SYSTEMS~~~     '._    _.'    o  O  o  O`}
        </pre>
      </div>

      {/* Status Panel */}
      <div className="border-2 border-terminal-green p-3 mb-2 text-base sm:text-lg">
        <div className="flex justify-between mb-2">
          <span>Miles: {state.milesTraveled} / {state.totalMiles}</span>
          <span>Remaining: {milesRemaining}</span>
        </div>
        <div className="mb-3">
          Progress: [{progressBar}] {Math.floor(progressPct)}%
        </div>
        <div className="flex justify-between">
          <span>Morale: {state.morale}%</span>
          <span>SPRS Score: {state.sprsScore}</span>
        </div>
      </div>

      {/* Party Status */}
      <div className="border-2 border-terminal-green p-3 mb-2 text-base sm:text-lg">
        <div className="font-bold mb-2">PARTY STATUS:</div>
        <div className="grid grid-cols-2 gap-1">
          {state.party.map((member, i) => (
            <div key={i} className="flex justify-between">
              <span className="truncate mr-2">{member.name}</span>
              <span className={member.alive ? 'text-terminal-green' : 'text-terminal-red'}>
                {member.alive ? '♥' : '✗'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hunting Result */}
      {state.huntingResult && (
        <div className={`border-2 p-2 mb-2 text-center ${
          state.huntingResult.severity === 'critical' ? 'border-terminal-red text-terminal-red' :
          state.huntingResult.severity === 'moderate' ? 'border-terminal-yellow text-terminal-yellow' :
          'border-terminal-green text-terminal-green'
        }`}>
          {state.huntingResult.severity === 'critical' && `CRITICAL: ${state.huntingResult.findings} vulnerabilities found!`}
          {state.huntingResult.severity === 'moderate' && `Found ${state.huntingResult.findings} vulnerabilities. Manageable.`}
          {state.huntingResult.severity === 'low' && `Only ${state.huntingResult.findings} findings! Great patching!`}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button className="terminal-btn text-sm sm:text-base py-2" onClick={onContinue}>Continue Trail</button>
        <button className="terminal-btn text-sm sm:text-base py-2" onClick={onRest}>Rest</button>
        <button className="terminal-btn text-sm sm:text-base py-2" onClick={onHunt}>Hunt Vulns</button>
        <button className="terminal-btn text-sm sm:text-base py-2" onClick={onSupplies}>Supplies</button>
        <button className="terminal-btn text-sm sm:text-base py-2 col-span-2 sm:col-span-1 text-terminal-red border-terminal-red hover:bg-terminal-red" onClick={onGiveUp}>Give Up</button>
      </div>
    </div>
  );
}
