'use client';

interface TitleScreenProps {
  onContinue: () => void;
}

export default function TitleScreen({ onContinue }: TitleScreenProps) {
  return (
    <div className="text-center cursor-pointer max-w-2xl mx-auto" onClick={onContinue}>
      <div className="border-2 border-terminal-green p-4 sm:p-6">
        <pre className="text-terminal-green glow text-xs sm:text-base leading-tight">
{`████████╗██╗  ██╗███████╗
╚══██╔══╝██║  ██║██╔════╝
   ██║   ███████║█████╗
   ██║   ██╔══██║██╔══╝
   ██║   ██║  ██║███████╗
   ╚═╝   ╚═╝  ╚═╝╚══════╝

 ██████╗███╗   ███╗███╗   ███╗ ██████╗
██╔════╝████╗ ████║████╗ ████║██╔════╝
██║     ██╔████╔██║██╔████╔██║██║
██║     ██║╚██╔╝██║██║╚██╔╝██║██║
╚██████╗██║ ╚═╝ ██║██║ ╚═╝ ██║╚██████╗
 ╚═════╝╚═╝     ╚═╝╚═╝     ╚═╝ ╚═════╝

████████╗██████╗  █████╗ ██╗██╗
╚══██╔══╝██╔══██╗██╔══██╗██║██║
   ██║   ██████╔╝███████║██║██║
   ██║   ██╔══██╗██╔══██║██║██║
   ██║   ██║  ██║██║  ██║██║███████╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝`}
        </pre>

        <div className="mt-6 text-terminal-green text-lg sm:text-xl">
          The Journey to CMMC 2.0 Certification
        </div>
        <div className="mt-2 text-terminal-green text-base">~ 2024 ~</div>
      </div>

      <p className="mt-6 text-terminal-green text-lg blink">[ CLICK TO START ]</p>
    </div>
  );
}
