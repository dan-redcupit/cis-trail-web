'use client';

interface ResultScreenProps {
  quality: 'best' | 'good' | 'wrong';
  explanation: string;
  bestAnswer: string;
  goodExplanation?: string;
  onContinue: () => void;
}

export default function ResultScreen({ quality, explanation, bestAnswer, goodExplanation, onContinue }: ResultScreenProps) {
  return (
    <div className="text-center cursor-pointer max-w-2xl mx-auto" onClick={onContinue}>
      <div className={`border-2 p-4 sm:p-6 ${
        quality === 'best' ? 'border-terminal-green' :
        quality === 'good' ? 'border-terminal-yellow' :
        'border-terminal-red'
      }`}>
        {quality === 'best' ? (
          <>
            <div className="text-terminal-green text-3xl sm:text-4xl font-bold mb-4">
              ★ PERFECT! ★
            </div>
            <p className="text-terminal-green text-base sm:text-lg mb-4">
              The auditor nods approvingly. That's exactly right!
              Your team advances confidently.
            </p>
            <div className="text-terminal-cyan text-sm mb-2">+50 miles | +10 morale</div>
          </>
        ) : quality === 'good' ? (
          <>
            <div className="text-terminal-yellow text-3xl sm:text-4xl font-bold mb-4">
              ◆ ACCEPTABLE ◆
            </div>
            <p className="text-terminal-yellow text-base sm:text-lg mb-4">
              The auditor tilts their head. "Close enough... but {bestAnswer} would have been better."
            </p>
            <div className="text-terminal-cyan text-sm mb-2">+35 miles | +5 morale</div>
            {goodExplanation && (
              <div className="border-t border-terminal-yellow pt-3 mt-3">
                <p className="text-terminal-yellow text-sm">
                  <span className="font-bold">Why not perfect:</span> {goodExplanation}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-terminal-red text-3xl sm:text-4xl font-bold mb-4">
              ✗ INCORRECT ✗
            </div>
            <p className="text-terminal-red text-base sm:text-lg mb-4">
              The auditor frowns and makes a note in their tablet.
              The correct answer was: <span className="font-bold">{bestAnswer}</span>
            </p>
            <div className="text-terminal-red text-sm mb-2">+15 miles | -15 morale | ☠️ Risk of death!</div>
          </>
        )}

        <div className={`border-t pt-4 mt-4 ${
          quality === 'best' ? 'border-terminal-green' :
          quality === 'good' ? 'border-terminal-yellow' :
          'border-terminal-red'
        }`}>
          <p className="text-terminal-cyan text-sm sm:text-base">
            <span className="font-bold">Explanation:</span> {explanation}
          </p>
        </div>
      </div>

      <p className={`mt-6 text-lg blink ${
        quality === 'best' ? 'text-terminal-green' :
        quality === 'good' ? 'text-terminal-yellow' :
        'text-terminal-red'
      }`}>
        [ CLICK TO CONTINUE ]
      </p>
    </div>
  );
}
