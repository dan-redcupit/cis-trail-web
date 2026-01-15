'use client';

interface IntroScreenProps {
  onContinue: () => void;
}

export default function IntroScreen({ onContinue }: IntroScreenProps) {
  return (
    <div className="text-center cursor-pointer max-w-2xl mx-auto" onClick={onContinue}>
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        <h1 className="text-terminal-green text-xl sm:text-2xl font-bold mb-4">
          THE YEAR IS 2024
        </h1>

        <div className="text-terminal-green text-base sm:text-lg text-left space-y-3">
          <p>The Department of Defense has mandated CMMC 2.0 for all contractors.</p>

          <p>Your mission: Lead your compliance team on a treacherous 2000-mile journey through the wilderness of federal cybersecurity requirements.</p>

          <p className="font-bold">You will face:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Compliance checkpoints with difficult questions</li>
            <li>Random auditor encounters</li>
            <li>The ever-present threat of data breaches</li>
            <li>Legacy systems that refuse to die</li>
            <li>Shadow IT lurking in every department</li>
          </ul>

          <p className="text-terminal-yellow mt-4">
            Many compliance teams have tried this journey before. Most have perished from unpatched vulnerabilities.
          </p>
        </div>
      </div>

      <p className="mt-6 text-terminal-green text-lg blink">[ CLICK TO CONTINUE ]</p>
    </div>
  );
}
