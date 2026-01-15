'use client';

import { GameEvent } from '@/lib/gameData';

interface EventScreenProps {
  event: GameEvent;
  onContinue: () => void;
}

export default function EventScreen({ event, onContinue }: EventScreenProps) {
  const borderColor = event.type === 'death' ? 'border-terminal-red' :
                      event.type === 'good' ? 'border-terminal-green' :
                      event.type === 'bad' ? 'border-terminal-yellow' :
                      'border-terminal-cyan';

  const textColor = event.type === 'death' ? 'text-terminal-red' :
                    event.type === 'good' ? 'text-terminal-green' :
                    event.type === 'bad' ? 'text-terminal-yellow' :
                    'text-terminal-cyan';

  const emoji = event.type === 'death' ? '💀' :
                event.type === 'good' ? '🌟' :
                event.type === 'bad' ? '⚠️' :
                '📢';

  return (
    <div className="text-center cursor-pointer max-w-2xl mx-auto" onClick={onContinue}>
      <div className={`border-2 ${borderColor} p-4 sm:p-6`}>
        <div className={`${textColor} text-xl sm:text-2xl font-bold mb-4`}>
          {emoji} TRAIL EVENT {emoji}
        </div>

        <p className="text-white text-base sm:text-lg">
          {event.text}
        </p>
      </div>

      <p className={`mt-6 text-lg blink ${textColor}`}>
        [ CLICK TO CONTINUE ]
      </p>
    </div>
  );
}
