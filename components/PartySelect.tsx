'use client';

import { useState } from 'react';
import { DEFAULT_PARTY } from '@/lib/gameData';

interface PartySelectProps {
  onSubmit: (party: string[]) => void;
}

export default function PartySelect({ onSubmit }: PartySelectProps) {
  const [useDefault, setUseDefault] = useState<boolean | null>(null);
  const [customNames, setCustomNames] = useState<string[]>(['', '', '', '', '']);

  const handleCustomNameChange = (index: number, value: string) => {
    const newNames = [...customNames];
    newNames[index] = value;
    setCustomNames(newNames);
  };

  const handleSubmit = () => {
    if (useDefault) {
      onSubmit(DEFAULT_PARTY);
    } else {
      const party = customNames.map((name, i) => name.trim() || DEFAULT_PARTY[i]);
      onSubmit(party);
    }
  };

  if (useDefault === null) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="border-2 border-terminal-green p-4 sm:p-6">
          <h1 className="text-terminal-green text-xl sm:text-2xl font-bold mb-4">
            ASSEMBLE YOUR COMPLIANCE TEAM
          </h1>

          <div className="text-terminal-green text-base sm:text-lg text-left mb-4">
            <p className="mb-2">Your compliance wagon can hold 5 team members:</p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>CISO or Security Lead</li>
              <li>Compliance Officer</li>
              <li>IT Administrator</li>
              <li>Policy Writer</li>
              <li>The Intern (expendable)</li>
            </ul>
          </div>

          <div className="border-t border-terminal-green pt-4 mt-4">
            <p className="text-terminal-green mb-2 font-bold">Default team:</p>
            <div className="text-terminal-cyan text-sm sm:text-base text-left ml-4 space-y-1">
              {DEFAULT_PARTY.map((name, i) => (
                <div key={i}>{i + 1}. {name}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button className="terminal-btn" onClick={() => setUseDefault(true)}>
            Use Default Team
          </button>
          <button className="terminal-btn" onClick={() => setUseDefault(false)}>
            Custom Names
          </button>
        </div>
      </div>
    );
  }

  if (!useDefault) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="border-2 border-terminal-green p-4 sm:p-6">
          <h1 className="text-terminal-green text-xl sm:text-2xl font-bold mb-4">
            ENTER YOUR TEAM NAMES
          </h1>

          <div className="space-y-3 text-left">
            {customNames.map((name, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-terminal-green w-6">{index + 1}.</span>
                <input
                  type="text"
                  className="terminal-input flex-1"
                  placeholder={DEFAULT_PARTY[index]}
                  value={name}
                  onChange={(e) => handleCustomNameChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button className="terminal-btn" onClick={() => setUseDefault(null)}>
            Back
          </button>
          <button className="terminal-btn" onClick={handleSubmit}>
            Start Journey
          </button>
        </div>
      </div>
    );
  }

  // Auto-submit with default party
  handleSubmit();
  return null;
}
