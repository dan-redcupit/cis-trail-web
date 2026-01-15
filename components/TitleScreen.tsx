'use client';

interface TitleScreenProps {
  onContinue: () => void;
  onLeaderboard: () => void;
}

export default function TitleScreen({ onContinue, onLeaderboard }: TitleScreenProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-green p-6 sm:p-8 cursor-pointer" onClick={onContinue}>
        {/* Simple clean title */}
        <div className="text-terminal-green">
          <div className="text-4xl sm:text-6xl font-bold tracking-wider mb-2">
            THE
          </div>
          <div className="text-5xl sm:text-7xl font-bold tracking-widest mb-2">
            CMMC
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
          The Journey to CMMC 2.0 Certification
        </div>

        {/* Year */}
        <div className="mt-4 text-terminal-cyan text-base">
          ~ 2024 ~
        </div>

        {/* Flavor text */}
        <div className="mt-6 text-terminal-yellow text-sm italic">
          "You have died of unencrypted data exposure"
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button className="terminal-btn text-lg px-6 py-3" onClick={onContinue}>
          Start Game
        </button>
        <button
          className="terminal-btn text-lg px-6 py-3 text-terminal-yellow border-terminal-yellow hover:bg-terminal-yellow"
          onClick={(e) => { e.stopPropagation(); onLeaderboard(); }}
        >
          Leaderboard
        </button>
      </div>

      {/* Version */}
      <div className="mt-8 text-terminal-green/50 text-xs">
        v1.0.0
      </div>
    </div>
  );
}
