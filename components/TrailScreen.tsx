'use client';

import { useState, useEffect } from 'react';
import { GameState } from '@/lib/gameState';
import { playBrrrt } from '@/lib/sounds';
import MattLeeCharacter, {
  MATT_TRAIL_STANDING,
  MATT_TRAIL_WALKING_1,
  MATT_TRAIL_WALKING_2,
  MATT_TRAIL_CELEBRATING
} from './MattLeeCharacter';

interface TrailScreenProps {
  state: GameState;
  onContinue: () => void;
  onRest: () => void;
  onHunt: () => void;
  onSupplies: () => void;
  onGiveUp: () => void;
  onFireTank?: () => void;
}

// Matt Lee's brand color
const MATT_BLUE = '#2ea3f2';

// Matt Lee walking animation frames for the trail
const MATT_FRAMES = [
  MATT_TRAIL_WALKING_1,
  MATT_TRAIL_WALKING_2,
];

// M1 Abrams Tank ASCII art frames (kept for firing feature)
const TANK_FRAMES = [
  // Frame 1 - Normal
  `       _______________
      |  M1 ABRAMS   |
  ____|_____▄▄▄______|____
 /    ════════════════════>
|  ●●●●●●●●●●●●●●●●●●●●  |
 \\▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄/`,
  // Frame 2 - Firing
  `       _______________
      |  M1 ABRAMS   |
  ____|_____▄▄▄______|____
 /    ════════════════════>══●
|  ●●●●●●●●●●●●●●●●●●●●  |   ★
 \\▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄/`,
  // Frame 3 - Heavy firing
  `       _______________
      |  M1 ABRAMS   |
  ____|_____▄▄▄______|____
 /    ════════════════════>═══●●●
|  ●●●●●●●●●●●●●●●●●●●●  |    ★★★
 \\▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄/   BOOM!`,
];

// Landscape elements
const CLOUD = `  .-.
 (   )
(___)`;

const MOUNTAIN = `    /\\
   /  \\
  /    \\
 /______\\`;

const SERVER_RACK = ` ___
|===|
|===|
|___|`;

export default function TrailScreen({ state, onContinue, onRest, onHunt, onSupplies, onGiveUp, onFireTank }: TrailScreenProps) {
  const [frame, setFrame] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const [showFiring, setShowFiring] = useState(false);

  const progressPct = (state.milesTraveled / state.totalMiles) * 100;
  const milesRemaining = state.totalMiles - state.milesTraveled;
  const progressBarLen = 30;
  const filled = Math.floor((state.milesTraveled / state.totalMiles) * progressBarLen);
  const progressBar = '█'.repeat(filled) + '░'.repeat(progressBarLen - filled);

  // Animation loop - tank tracks move, scenery scrolls
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 3);
      setTrackOffset(t => (t + 1) % 20);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Handle main gun firing
  const handleFire = () => {
    setShowFiring(true);
    playBrrrt();
    onFireTank?.(); // Track for achievement

    setTimeout(() => {
      setShowFiring(false);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-terminal-green text-center text-xl sm:text-2xl font-bold border-2 border-terminal-green p-2 mb-2">
        THE CIS TRAIL
      </div>

      {/* Animated Scene */}
      <div className="border-2 border-terminal-green p-2 mb-2 overflow-hidden relative" style={{ height: '180px' }}>
        {/* Scrolling background scenery */}
        <div className="absolute top-1 w-full text-terminal-cyan text-xs opacity-60">
          <span style={{ position: 'absolute', left: `${(100 - trackOffset * 3) % 100}%` }}>▲</span>
          <span style={{ position: 'absolute', left: `${(60 - trackOffset * 3) % 100}%` }}>▲▲</span>
          <span style={{ position: 'absolute', left: `${(30 - trackOffset * 3) % 100}%` }}>▲</span>
        </div>

        {/* Matt Lee Character - walking animation */}
        <div className="absolute left-4" style={{ top: '15px' }}>
          <MattLeeCharacter
            animation="walking"
            size="compact"
            animationSpeed={250}
            style={{ color: MATT_BLUE }}
          />
        </div>

        {/* M1 Abrams Tank - behind Matt */}
        <div className="absolute" style={{ top: '55px', left: '120px' }}>
          <pre className={`text-[8px] sm:text-[9px] leading-tight font-mono opacity-70 ${showFiring ? 'text-terminal-yellow' : 'text-terminal-green'}`}>
{showFiring ? TANK_FRAMES[frame === 0 ? 1 : 2] : TANK_FRAMES[0]}
          </pre>
        </div>

        {/* Scrolling ground */}
        <div className="absolute bottom-0 left-0 w-full">
          {/* Ground line */}
          <div className="text-terminal-cyan text-xs overflow-hidden whitespace-nowrap">
            {'═'.repeat(100)}
          </div>
          {/* Scrolling terrain features */}
          <div className="absolute bottom-3 w-full text-xs overflow-hidden" style={{ transform: `translateX(-${trackOffset * 5}px)` }}>
            <span className="text-terminal-red mx-8">▄▄</span>
            <span className="text-terminal-yellow mx-12">⚠</span>
            <span className="text-terminal-red mx-8">▄▄▄</span>
            <span className="text-terminal-cyan mx-16">≋≋≋</span>
            <span className="text-terminal-red mx-8">▄▄</span>
          </div>
        </div>

        {/* Destination marker */}
        <div className="absolute bottom-4 right-2 text-terminal-green text-xs text-right">
          <div>CIS V8 COMPLIANCE</div>
          <div>→ {milesRemaining}mi</div>
        </div>
      </div>

      {/* FIRE Button */}
      <button
        className={`w-full mb-2 py-2 font-bold border-2 transition-all ${
          showFiring
            ? 'bg-terminal-yellow text-black border-terminal-yellow animate-pulse'
            : 'border-terminal-yellow text-terminal-yellow hover:bg-terminal-yellow hover:text-black'
        }`}
        onClick={handleFire}
        disabled={showFiring}
      >
        {showFiring ? '💥 BOOM!!! 💥' : '🎯 FIRE 120MM MAIN GUN 🎯'}
      </button>

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
          <span>Team: {state.party.filter(m => m.alive).length}/{state.party.length} alive</span>
        </div>
      </div>

      {/* Party Status */}
      <div className="border-2 border-terminal-green p-3 mb-2 text-base sm:text-lg">
        <div className="font-bold mb-2">SECURITY TEAM:</div>
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
