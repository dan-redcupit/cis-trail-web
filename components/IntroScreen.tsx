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
          <p>The CIS Controls V8 framework has become the gold standard for organizational security.</p>

          <p>Your mission: Lead your security team on a treacherous 2000-mile journey through the wilderness of cybersecurity best practices, implementing IG1 and IG2 controls along the way.</p>

          <p className="font-bold">You will face:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Control implementation checkpoints with difficult questions</li>
            <li>Random security assessor encounters</li>
            <li>The ever-present threat of unpatched vulnerabilities</li>
            <li>Legacy systems that refuse to die</li>
            <li>Shadow IT lurking in every department</li>
          </ul>

          <p className="text-terminal-yellow mt-4">
            Many security teams have tried this journey before. Most have perished from unpatched vulnerabilities.
          </p>
        </div>
      </div>

      <p className="mt-6 text-terminal-green text-lg blink">[ CLICK TO CONTINUE ]</p>
    </div>
  );
}
