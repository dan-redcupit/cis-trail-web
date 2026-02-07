'use client';

import { useState } from 'react';
import { StoreItem, STORE_ITEMS } from '@/lib/gameState';
import * as sounds from '@/lib/sounds';

interface SupplyStoreScreenProps {
  morale: number;
  deathShield: boolean;
  onBuyItem: (item: StoreItem) => void;
  onLeave: () => void;
}

export default function SupplyStoreScreen({
  morale,
  deathShield,
  onBuyItem,
  onLeave
}: SupplyStoreScreenProps) {
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());

  const handleBuy = (item: StoreItem) => {
    if (purchasedItems.has(item.id)) {
      sounds.playWrong();
      setPurchaseMessage("Already grabbed that one!");
      setTimeout(() => setPurchaseMessage(null), 2000);
      return;
    }

    if (item.effect === 'shield' && deathShield) {
      sounds.playWrong();
      setPurchaseMessage("You already have EDR protection!");
      setTimeout(() => setPurchaseMessage(null), 2000);
      return;
    }

    sounds.playCashRegister();
    onBuyItem(item);
    setPurchasedItems(prev => new Set(Array.from(prev).concat(item.id)));
    setPurchaseMessage(`Grabbed ${item.name}!`);
    setTimeout(() => setPurchaseMessage(null), 1500);
  };

  const handleLeave = () => {
    sounds.playClick();
    onLeave();
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="border-2 border-terminal-yellow p-4 sm:p-6">
        {/* Store Header */}
        <div className="text-terminal-yellow text-2xl font-bold mb-2">
          COMPLIANCE SUPPLY DEPOT
        </div>
        <div className="text-terminal-green text-sm mb-4">
          "Everything you need to survive the audit trail"
        </div>

        {/* Player Stats */}
        <div className="flex justify-center gap-6 mb-4 text-sm">
          <div className="text-terminal-cyan">
            Morale: <span className="text-terminal-green font-bold">{morale}%</span>
          </div>
          {deathShield && (
            <div className="text-green-400">
              EDR Active
            </div>
          )}
        </div>

        {/* Purchase Message */}
        {purchaseMessage && (
          <div className="mb-4 text-terminal-cyan animate-pulse">
            {purchaseMessage}
          </div>
        )}

        {/* Items Grid */}
        <div className="space-y-2 text-left max-h-[50vh] overflow-y-auto">
          {STORE_ITEMS.map((item) => {
            const isOwned = purchasedItems.has(item.id);
            const isShieldOwned = item.effect === 'shield' && deathShield;
            const disabled = isOwned || isShieldOwned;

            return (
              <div
                key={item.id}
                className={`border p-3 ${disabled ? 'border-terminal-green/30 opacity-50' : 'border-terminal-green'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className={`font-bold ${disabled ? 'text-terminal-green/50' : 'text-terminal-green'}`}>
                      {item.name}
                    </div>
                    <div className="text-terminal-green/70 text-xs">
                      {item.description}
                    </div>
                    <div className="text-xs mt-1">
                      {item.effect === 'morale' && item.moraleBonus && (
                        <span className="text-terminal-cyan">+{item.moraleBonus} morale</span>
                      )}
                      {item.effect === 'shield' && (
                        <span className="text-green-400">Prevents next random death</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      className={`terminal-btn text-xs px-3 py-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleBuy(item)}
                      disabled={disabled}
                    >
                      {isOwned || isShieldOwned ? 'Grabbed' : 'Grab'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shopkeeper */}
        <div className="mt-4 pt-4 border-t border-terminal-green/30">
          <div className="text-terminal-green/60 text-xs italic">
            The shopkeeper nods approvingly as you gather supplies...
          </div>
        </div>
      </div>

      {/* Leave Button */}
      <div className="mt-4">
        <button className="terminal-btn text-lg px-8 py-3" onClick={handleLeave}>
          Continue Journey
        </button>
      </div>
    </div>
  );
}
