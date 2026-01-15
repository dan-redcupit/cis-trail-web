'use client';

import { useEffect } from 'react';

interface RestingScreenProps {
  onFinish: () => void;
}

export default function RestingScreen({ onFinish }: RestingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        <div className="text-terminal-green text-xl sm:text-2xl font-bold mb-4">
          RESTING...
        </div>

        <p className="text-terminal-green text-base sm:text-lg mb-4">
          Your team reviews the System Security Plan and updates POA&M spreadsheets by firelight.
        </p>

        <pre className="text-terminal-yellow text-2xl sm:text-3xl">
{`    📋
   ☕💻📊
  🔥🔥🔥🔥`}
        </pre>

        <p className="text-terminal-cyan mt-4">
          Team morale is being restored...
        </p>
      </div>

      <p className="mt-6 text-terminal-green text-lg blink">[ RESTING... ]</p>
    </div>
  );
}
