'use client';

import { useState } from 'react';

interface ValleyOfDespairScreenProps {
  onConvince: (success: boolean) => void;
}

const VALLEY_ART = `
        ╔═══════════════════════════════════╗
        ║   THE VALLEY OF DESPAIR          ║
        ║   "Is CMMC even real?"            ║
        ╚═══════════════════════════════════╝
          \\                               /
           \\    "It's just FUD..."       /
            \\                           /
             \\  "We've never needed   /
              \\   this before..."    /
               \\                    /
                \\    😩  😰  😤   /
                 \\________________/
                  \\  LEADERSHIP  /
                   \\   SUITE    /
                    \\__________/
`;

const LEADERSHIP_OBJECTIONS = [
  "But we've never had a breach! Why spend money?",
  "Can't we just check the boxes and move on?",
  "Our IT guy says we're already secure.",
  "The competition isn't doing this...",
  "Let's wait and see if CMMC is actually enforced.",
  "Security is an IT problem, not a business problem.",
  "We'll just hire a consultant when we need to.",
  "Our firewall is fine. We bought the expensive one.",
];

export default function ValleyOfDespairScreen({ onConvince }: ValleyOfDespairScreenProps) {
  const [stage, setStage] = useState(0);
  const [objection] = useState(
    LEADERSHIP_OBJECTIONS[Math.floor(Math.random() * LEADERSHIP_OBJECTIONS.length)]
  );

  const responses = [
    {
      text: "Show them the contract requirements (logical)",
      success: 0.7,
      description: "Present DFARS 252.204-7012 and flow-down requirements"
    },
    {
      text: "Explain the business risk (fear)",
      success: 0.5,
      description: "Discuss False Claims Act liability and contract loss"
    },
    {
      text: "Promise it won't be that expensive (lie)",
      success: 0.3,
      description: "Underestimate costs to get initial buy-in"
    },
    {
      text: "Show competitor success stories (FOMO)",
      success: 0.6,
      description: "Demonstrate how others won contracts with CMMC"
    },
  ];

  const handleResponse = (successChance: number) => {
    const roll = Math.random();
    onConvince(roll < successChance);
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-yellow p-4 sm:p-6">
        <div className="text-terminal-yellow text-xl sm:text-2xl font-bold mb-2">
          ⚠ THE VALLEY OF DESPAIR ⚠
        </div>
        <div className="text-terminal-cyan text-sm mb-4">
          Convincing Leadership That CMMC Is Real
        </div>

        <pre className="text-terminal-yellow text-[10px] sm:text-xs mb-4 leading-tight opacity-80">
{VALLEY_ART}
        </pre>

        <div className="border-2 border-terminal-red p-4 mb-4 text-left">
          <div className="text-terminal-red text-sm mb-2">LEADERSHIP OBJECTION:</div>
          <div className="text-white text-base sm:text-lg italic">
            "{objection}"
          </div>
        </div>

        <div className="text-terminal-green text-sm mb-4">
          How do you respond? Choose your strategy:
        </div>

        <div className="space-y-2">
          {responses.map((response, i) => (
            <button
              key={i}
              className="w-full text-left p-3 border border-terminal-green hover:bg-terminal-green hover:text-black transition-colors"
              onClick={() => handleResponse(response.success)}
            >
              <div className="font-bold text-sm">{i + 1}. {response.text}</div>
              <div className="text-xs opacity-70">{response.description}</div>
              <div className="text-xs mt-1 opacity-50">
                Success chance: {Math.round(response.success * 100)}%
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 text-terminal-yellow text-xs opacity-70">
          Warning: Failure may result in project cancellation and team attrition.
        </div>
      </div>
    </div>
  );
}
