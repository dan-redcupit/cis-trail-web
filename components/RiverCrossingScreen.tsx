'use client';

import { useState } from 'react';

interface RiverCrossingScreenProps {
  onFord: () => void;
  onWait: () => void;
  onCaulk: () => void;
}

const RIVER_ART = `
     ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋
    ≋≋≋ THE LEGACY SYSTEMS RIVER ≋≋≋≋≋≋≋≋≋≋≋
   ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋
  ≋≋≋   Depth: 4.5 ft   Current: STRONG   ≋≋≋
 ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋
≋≋≋ ~~~~ COBOL ~~~~ FORTRAN ~~~~ AS400 ~~~~ ≋≋≋
 ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋
`;

export default function RiverCrossingScreen({ onFord, onWait, onCaulk }: RiverCrossingScreenProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-cyan p-4 sm:p-6">
        <div className="text-terminal-cyan text-xl sm:text-2xl font-bold mb-4">
          ⚠ RIVER CROSSING ⚠
        </div>

        <pre className="text-terminal-cyan text-xs sm:text-sm mb-4 leading-tight">
{RIVER_ART}
        </pre>

        <div className="text-terminal-yellow text-base mb-6">
          You have reached the Legacy Systems River.
          <br />
          The water is murky with deprecated code and technical debt.
        </div>

        <div className="border-t border-terminal-cyan pt-4 text-left">
          <div className="text-terminal-green text-sm mb-4">Choose your approach:</div>

          <div className="space-y-3">
            <button
              className="w-full text-left p-3 border border-terminal-green hover:bg-terminal-green hover:text-black transition-colors"
              onClick={onFord}
              onMouseEnter={() => setHoveredOption('ford')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className="font-bold">1. Ford the River</div>
              <div className="text-sm opacity-80">
                {hoveredOption === 'ford'
                  ? '⚠ 60% success, 30% damage, 10% death risk'
                  : 'Drive the M1 straight through (risky)'}
              </div>
            </button>

            <button
              className="w-full text-left p-3 border border-terminal-yellow text-terminal-yellow hover:bg-terminal-yellow hover:text-black transition-colors"
              onClick={onWait}
              onMouseEnter={() => setHoveredOption('wait')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className="font-bold">2. Wait for the C3PAO Ferry</div>
              <div className="text-sm opacity-80">
                {hoveredOption === 'wait'
                  ? '✓ Safe but slow. Costs time and morale.'
                  : 'Pay the consultant toll and wait (safe)'}
              </div>
            </button>

            <button
              className="w-full text-left p-3 border border-terminal-red text-terminal-red hover:bg-terminal-red hover:text-black transition-colors"
              onClick={onCaulk}
              onMouseEnter={() => setHoveredOption('caulk')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className="font-bold">3. Caulk the Server Racks and Float</div>
              <div className="text-sm opacity-80">
                {hoveredOption === 'caulk'
                  ? '☠ 50% success, 30% damage, 20% DEATH!'
                  : 'Seal everything and hope for the best (very risky!)'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
