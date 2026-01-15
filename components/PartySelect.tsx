'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_PARTY } from '@/lib/gameData';
import * as sounds from '@/lib/sounds';

interface PartySelectProps {
  onSubmit: (party: string[]) => void;
  onSubmitWithBonus: (party: string[], sprsBonus: number) => void;
}

// Secret names and their effects
const SECRET_NAMES: Record<string, { displayName: string; sprsBonus: number; message: string }> = {
  'KEVIN': { displayName: 'Kevin Mitnick (reformed)', sprsBonus: 10, message: 'A legendary hacker joins your team! +10 SPRS' },
  'CLIPPY': { displayName: 'Clippy the Security Assistant', sprsBonus: 5, message: '"It looks like you\'re trying to achieve compliance!" +5 SPRS' },
  'ADMIN': { displayName: 'Administrator (password: admin)', sprsBonus: -20, message: 'Security worst practice detected! -20 SPRS' },
  'SNOWDEN': { displayName: 'Edward S. (location unknown)', sprsBonus: 0, message: 'A controversial recruit... Events will be more frequent.' },
  'SATOSHI': { displayName: 'Satoshi Nakamoto', sprsBonus: 15, message: 'The mysterious crypto legend joins! +15 SPRS' },
  'CYBERCOM': { displayName: 'US CYBERCOM Agent', sprsBonus: 20, message: 'Government reinforcements arrive! +20 SPRS' },
  'DEFCON': { displayName: 'DEF CON Attendee', sprsBonus: 8, message: 'A hacker conference veteran joins! +8 SPRS' },
};

export default function PartySelect({ onSubmit, onSubmitWithBonus }: PartySelectProps) {
  const [useDefault, setUseDefault] = useState<boolean | null>(null);
  const [customNames, setCustomNames] = useState<string[]>(['', '', '', '', '']);
  const [secretFound, setSecretFound] = useState<string | null>(null);
  const [totalBonus, setTotalBonus] = useState(0);

  const handleCustomNameChange = (index: number, value: string) => {
    const newNames = [...customNames];
    newNames[index] = value;
    setCustomNames(newNames);
  };

  // Check for secret names and calculate bonus
  const checkSecretNames = (names: string[]): { processedNames: string[]; bonus: number; messages: string[] } => {
    let bonus = 0;
    const messages: string[] = [];
    const processedNames = names.map((name) => {
      const upperName = name.trim().toUpperCase();
      const secret = SECRET_NAMES[upperName];
      if (secret) {
        bonus += secret.sprsBonus;
        messages.push(secret.message);
        return secret.displayName;
      }
      return name.trim();
    });
    return { processedNames, bonus, messages };
  };

  const handleSubmit = () => {
    if (useDefault) {
      onSubmit(DEFAULT_PARTY);
    } else {
      const party = customNames.map((name, i) => name.trim() || DEFAULT_PARTY[i]);
      const { processedNames, bonus, messages } = checkSecretNames(party);

      if (bonus !== 0 || messages.length > 0) {
        // Secret name found!
        sounds.playSecretFound();
        setSecretFound(messages.join('\n'));
        setTotalBonus(bonus);
        // Delay submission to show the message
        setTimeout(() => {
          onSubmitWithBonus(processedNames, bonus);
        }, 2500);
      } else {
        onSubmit(processedNames);
      }
    }
  };

  // Secret found overlay
  if (secretFound) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="border-2 border-terminal-cyan p-6 animate-pulse">
          <div className="text-terminal-cyan text-2xl font-bold mb-4">
            SECRET UNLOCKED!
          </div>
          <div className="text-terminal-green whitespace-pre-line">
            {secretFound}
          </div>
          <div className={`text-2xl font-bold mt-4 ${totalBonus >= 0 ? 'text-green-400' : 'text-terminal-red'}`}>
            {totalBonus >= 0 ? '+' : ''}{totalBonus} SPRS
          </div>
        </div>
      </div>
    );
  }

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

          <div className="mt-4 text-terminal-green/50 text-xs">
            Tip: Some names have special powers...
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
