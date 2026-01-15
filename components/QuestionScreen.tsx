'use client';

import { ShuffledQuestion } from '@/lib/gameData';

interface QuestionScreenProps {
  question: ShuffledQuestion;
  onAnswer: (answer: string) => void;
}

export default function QuestionScreen({ question, onAnswer }: QuestionScreenProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        {/* Checkpoint Header */}
        <div className="text-terminal-red text-xl sm:text-2xl font-bold mb-4">
          ⛔ COMPLIANCE CHECKPOINT ⛔
        </div>

        {/* Question */}
        <div className="border-2 border-terminal-cyan p-4 mb-4">
          <div className="text-terminal-cyan text-sm mb-2">AUDITOR'S QUESTION:</div>
          <div className="text-white text-base sm:text-lg">
            {question.question}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2 text-left">
          {question.options.map((option, i) => {
            const letter = option.charAt(0);
            return (
              <button
                key={i}
                className="w-full text-left p-3 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-colors text-sm sm:text-base"
                onClick={() => onAnswer(letter)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
