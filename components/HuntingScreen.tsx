'use client';

import { useEffect } from 'react';

interface HuntingScreenProps {
  onFinish: () => void;
}

export default function HuntingScreen({ onFinish }: HuntingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        <div className="text-terminal-green text-xl sm:text-2xl font-bold mb-4">
          VULNERABILITY HUNTING
        </div>

        <p className="text-terminal-green text-base sm:text-lg mb-4">
          Deploying vulnerability scanner across the network...
        </p>

        <div className="text-terminal-cyan text-sm sm:text-base mb-4">
          [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░] 75%
        </div>

        <p className="text-terminal-yellow">
          Scanning port 443...
        </p>
      </div>

      <p className="mt-6 text-terminal-green text-lg blink">[ SCANNING... ]</p>
    </div>
  );
}
