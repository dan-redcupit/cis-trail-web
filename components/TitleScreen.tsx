'use client';

interface TitleScreenProps {
  onContinue: () => void;
  onLeaderboard: () => void;
}

export default function TitleScreen({ onContinue, onLeaderboard }: TitleScreenProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-green p-4 sm:p-6 cursor-pointer" onClick={onContinue}>
        <pre className="text-terminal-green text-xs sm:text-base leading-tight">
{`████████╗██╗  ██╗███████╗
╚══██╔══╝██║  ██║██╔════╝
   ██║   ███████║█████╗
   ██║   ██╔══██║██╔══╝
   ██║   ██║  ██║███████╗
   ╚═╝   ╚═╝  ╚═╝╚══════╝

 ██████╗███╗   ███╗███╗   ███╗ ██████╗
██╔════╝████╗ ████║████╗ ████║██╔════╝
██║     ██╔████╔██║██╔████╔██║██║
██║     ██║╚██╔╝██║██║╚██╔╝██║██║
╚██████╗██║ ╚═╝ ██║██║ ╚═╝ ██║╚██████╗
 ╚═════╝╚═╝     ╚═╝╚═╝     ╚═╝ ╚═════╝

████████╗██████╗  █████╗ ██╗██╗
╚══██╔══╝██╔══██╗██╔══██╗██║██║
   ██║   ██████╔╝███████║██║██║
   ██║   ██╔══██╗██╔══██║██║██║
   ██║   ██║  ██║██║  ██║██║███████╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝`}
        </pre>

        <div className="mt-6 text-terminal-green text-lg sm:text-xl">
          The Journey to CMMC 2.0 Certification
        </div>
        <div className="mt-2 text-terminal-green text-base">~ 2024 ~</div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button className="terminal-btn" onClick={onContinue}>
          Start Game
        </button>
        <button
          className="terminal-btn text-terminal-yellow border-terminal-yellow hover:bg-terminal-yellow"
          onClick={(e) => { e.stopPropagation(); onLeaderboard(); }}
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}
