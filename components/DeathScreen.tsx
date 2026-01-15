'use client';

interface DeathScreenProps {
  name: string;
  message: string;
  onContinue: () => void;
}

export default function DeathScreen({ name, message, onContinue }: DeathScreenProps) {
  return (
    <div className="text-center cursor-pointer max-w-2xl mx-auto" onClick={onContinue}>
      <div className="border-2 border-terminal-red p-4 sm:p-6">
        <pre className="text-terminal-red text-2xl sm:text-4xl mb-4">
{`   ▄████▄
  ████████
  ██ R.I.P
  ██    ██
  ██████████`}
        </pre>

        <div className="text-terminal-red text-xl sm:text-2xl font-bold mb-2">
          {name}
        </div>

        <p className="text-terminal-yellow text-base sm:text-lg">
          {message}
        </p>
      </div>

      <p className="mt-6 text-terminal-red text-lg blink">
        [ CLICK TO CONTINUE ]
      </p>
    </div>
  );
}
