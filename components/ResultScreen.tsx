'use client';

interface ResultScreenProps {
  correct: boolean;
  explanation: string;
  correctAnswer: string;
  onContinue: () => void;
}

export default function ResultScreen({ correct, explanation, correctAnswer, onContinue }: ResultScreenProps) {
  return (
    <div className="text-center cursor-pointer max-w-2xl mx-auto" onClick={onContinue}>
      <div className={`border-2 p-4 sm:p-6 ${correct ? 'border-terminal-green' : 'border-terminal-red'}`}>
        {correct ? (
          <>
            <div className="text-terminal-green text-3xl sm:text-4xl font-bold mb-4">
              ✓ CORRECT! ✓
            </div>
            <p className="text-terminal-green text-base sm:text-lg mb-4">
              The auditor nods approvingly at your response.
              Your team may continue on the trail.
            </p>
          </>
        ) : (
          <>
            <div className="text-terminal-red text-3xl sm:text-4xl font-bold mb-4">
              ✗ INCORRECT ✗
            </div>
            <p className="text-terminal-red text-base sm:text-lg mb-4">
              The auditor frowns and makes a note in their tablet.
              The correct answer was: <span className="font-bold">{correctAnswer}</span>
            </p>
          </>
        )}

        <div className="border-t border-terminal-cyan pt-4 mt-4">
          <p className="text-terminal-cyan text-sm sm:text-base">
            <span className="font-bold">Explanation:</span> {explanation}
          </p>
        </div>
      </div>

      <p className={`mt-6 text-lg blink ${correct ? 'text-terminal-green' : 'text-terminal-red'}`}>
        [ CLICK TO CONTINUE ]
      </p>
    </div>
  );
}
