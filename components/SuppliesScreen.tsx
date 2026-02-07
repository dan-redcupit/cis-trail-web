'use client';

interface SuppliesScreenProps {
  onClose: () => void;
}

export default function SuppliesScreen({ onClose }: SuppliesScreenProps) {
  return (
    <div className="text-center cursor-pointer max-w-2xl mx-auto" onClick={onClose}>
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        <h1 className="text-terminal-green text-xl sm:text-2xl font-bold mb-4">
          WAGON INVENTORY
        </h1>

        <div className="text-left text-sm sm:text-base space-y-4">
          <div>
            <div className="text-terminal-cyan font-bold mb-1">Documentation:</div>
            <div className="text-terminal-green ml-2 space-y-1">
              <div>📋 System Security Plan (SSP) ........... 1</div>
              <div>📝 POA&M Spreadsheet .................... 47 items</div>
              <div>📁 Evidence Folders ..................... 17 domains</div>
              <div>📖 NIST 800-171 (tear-stained) .......... 1</div>
            </div>
          </div>

          <div>
            <div className="text-terminal-cyan font-bold mb-1">Supplies:</div>
            <div className="text-terminal-green ml-2 space-y-1">
              <div>☕ Coffee ............................... 47 gallons</div>
              <div>💊 Antacids ............................. not enough</div>
              <div>🔐 FIPS 140-2 Encryption ................ maybe?</div>
              <div>📡 EDR Agents ........................... 3 vendors</div>
              <div>🎫 Auditor Bribery Fund ................. $0 (ethics)</div>
            </div>
          </div>

          <div>
            <div className="text-terminal-cyan font-bold mb-1">Intangibles:</div>
            <div className="text-terminal-green ml-2 space-y-1">
              <div>😰 Stress ............................... immeasurable</div>
              <div>💤 Sleep Debt ........................... critical</div>
              <div>🙏 Hope ................................. dwindling</div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-terminal-green text-lg blink">[ CLICK TO CLOSE ]</p>
    </div>
  );
}
