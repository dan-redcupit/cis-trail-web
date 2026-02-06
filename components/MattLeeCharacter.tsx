'use client';

import { useState, useEffect } from 'react';

// Matt Lee's brand color
const MATT_BLUE = '#2ea3f2';
// Matt Lee's actual colors - bald, brown beard, black shirt
const BEARD_BROWN = '#8B4513';
const SHIRT_BLACK = '#1a1a1a';

// ASCII Art Frames for Matt Lee character
// 8-bit pixel art style - BALD head with LONG brown beard, black shirt

// Standing frame - idle pose (bald, long beard to chest)
export const MATT_STANDING = `
     ██████████
   ██░░░░░░░░░░██
   █░░░░░░░░░░░░█
   █░░░ ●  ●  ░░█
   █░░░░░▄▄░░░░░█
   █░▓▓▓╲__╱▓▓▓░█
   █░░▓▓▓▓▓▓▓▓░░█
    █░▓▓▓▓▓▓▓▓░█
    █░░▓▓▓▓▓▓░░█
   ██████▓▓██████
   █▒▒▒▒▓▓▓▓▒▒▒▒█
   █▒▒▒▒▒▓▓▒▒▒▒▒█
   █▒▒▒▒▒▒▒▒▒▒▒▒█
    █▒▒▒▒▒▒▒▒▒▒█
    ██       ██
   ████     ████
`;

// Walking frames for animation
export const MATT_WALKING_1 = `
     ██████████
   ██░░░░░░░░░░██
   █░░░░░░░░░░░░█
   █░░░ ●  ●  ░░█
   █░░░░░▄▄░░░░░█
   █░▓▓▓╲__╱▓▓▓░█
   █░░▓▓▓▓▓▓▓▓░░█
    █░▓▓▓▓▓▓▓▓░█
    █░░▓▓▓▓▓▓░░█
   ██████▓▓██████
   █▒▒▒▒▓▓▓▓▒▒▒▒█
   █▒▒▒▒▒▓▓▒▒▒▒▒█
   █▒▒▒▒▒▒▒▒▒▒▒▒█
    █▒▒▒▒▒▒▒▒▒▒█
   ██         ██
   ████       ██
`;

export const MATT_WALKING_2 = `
     ██████████
   ██░░░░░░░░░░██
   █░░░░░░░░░░░░█
   █░░░ ●  ●  ░░█
   █░░░░░▄▄░░░░░█
   █░▓▓▓╲__╱▓▓▓░█
   █░░▓▓▓▓▓▓▓▓░░█
    █░▓▓▓▓▓▓▓▓░█
    █░░▓▓▓▓▓▓░░█
   ██████▓▓██████
   █▒▒▒▒▓▓▓▓▒▒▒▒█
   █▒▒▒▒▒▓▓▒▒▒▒▒█
   █▒▒▒▒▒▒▒▒▒▒▒▒█
    █▒▒▒▒▒▒▒▒▒▒█
    ██       ██
    ██       ████
`;

// Celebrating frame - arms up
export const MATT_CELEBRATING = `
  ██            ██
   ██          ██
   ██████████████
   █░░░░░░░░░░░░█
   █░░░ ^  ^  ░░█
   █░░░░░▄▄░░░░░█
   █░▓▓▓╲__╱▓▓▓░█
   █░░▓▓▓▓▓▓▓▓░░█
    █░▓▓▓▓▓▓▓▓░█
    █░░▓▓▓▓▓▓░░█
   ██████▓▓██████
   █▒▒▒▒▓▓▓▓▒▒▒▒█
   █▒▒▒▒▒▓▓▒▒▒▒▒█
    █▒▒▒▒▒▒▒▒▒▒█
    ██       ██
   ████     ████
`;

// Thinking/Working frame - with laptop
export const MATT_WORKING = `
     ██████████
   ██░░░░░░░░░░██
   █░░░░░░░░░░░░█
   █░░░ ●  ●  ░░█
   █░░░░░▄▄░░░░░█
   █░▓▓▓╲__╱▓▓▓░█
   █░░▓▓▓▓▓▓▓▓░░█
    █░▓▓▓▓▓▓▓▓░█
   ██████▄▄██████
   █▒▒██====██▒▒█
   █▒▒██ CIS██▒▒█
   █▒▒██▀▀▀▀██▒▒█
    █▒▒▒▒▒▒▒▒▒▒█
    ██       ██
   ████     ████
`;

// Compact version for trail screen (8 lines) - bald, long beard
export const MATT_TRAIL_STANDING = `
   ██████████
  █░░░ ● ● ░░░█
  █░░▓▓▓▓▓▓▓░░█
  █░░░▓▓▓▓▓░░░█
  █▒▒▒▒▓▓▓▒▒▒▒█
   █▒▒▒▒▒▒▒▒▒█
   ██░░░░░░░░██
   ████    ████`;

export const MATT_TRAIL_WALKING_1 = `
   ██████████
  █░░░ ● ● ░░░█
  █░░▓▓▓▓▓▓▓░░█
  █░░░▓▓▓▓▓░░░█
  █▒▒▒▒▓▓▓▒▒▒▒█
   █▒▒▒▒▒▒▒▒▒█
  ██░░░░░░░░░░██
  ████      ██`;

export const MATT_TRAIL_WALKING_2 = `
   ██████████
  █░░░ ● ● ░░░█
  █░░▓▓▓▓▓▓▓░░█
  █░░░▓▓▓▓▓░░░█
  █▒▒▒▒▓▓▓▒▒▒▒█
   █▒▒▒▒▒▒▒▒▒█
  ██░░░░░░░░░░██
    ██      ████`;

export const MATT_TRAIL_CELEBRATING = `
 ██          ██
  ██████████████
  █░░░ ^ ^ ░░░█
  █░░▓▓▓▓▓▓▓░░█
  █▒▒▒▒▓▓▓▒▒▒▒█
   █▒▒▒▒▒▒▒▒▒█
   ██░░░░░░░░██
   ████    ████`;

// Mini version for tight spaces (5 lines)
export const MATT_MINI = `
  ██████
 █●░░░░●█
 █░▓▓▓▓░█
 █▒▒▓▓▒▒█
 ████████`;

// Animation types
export type AnimationState = 'standing' | 'walking' | 'celebrating' | 'working';

interface MattLeeCharacterProps {
  animation?: AnimationState;
  size?: 'mini' | 'compact' | 'full';
  className?: string;
  style?: React.CSSProperties;
  autoAnimate?: boolean;
  animationSpeed?: number;
}

// Get the appropriate frames based on size and animation state
function getFrames(size: 'mini' | 'compact' | 'full', animation: AnimationState): string[] {
  if (size === 'mini') {
    return [MATT_MINI];
  }

  if (size === 'compact') {
    switch (animation) {
      case 'walking':
        return [MATT_TRAIL_WALKING_1, MATT_TRAIL_WALKING_2];
      case 'celebrating':
        return [MATT_TRAIL_CELEBRATING];
      case 'standing':
      case 'working':
      default:
        return [MATT_TRAIL_STANDING];
    }
  }

  // Full size
  switch (animation) {
    case 'walking':
      return [MATT_WALKING_1, MATT_WALKING_2];
    case 'celebrating':
      return [MATT_CELEBRATING];
    case 'working':
      return [MATT_WORKING];
    case 'standing':
    default:
      return [MATT_STANDING];
  }
}

export default function MattLeeCharacter({
  animation = 'standing',
  size = 'full',
  className = '',
  style = {},
  autoAnimate = true,
  animationSpeed = 300,
}: MattLeeCharacterProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const frames = getFrames(size, animation);

  useEffect(() => {
    if (!autoAnimate || frames.length <= 1) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [autoAnimate, frames.length, animationSpeed]);

  const currentFrame = frames[frameIndex];

  // Apply syntax highlighting for different parts
  const renderColoredArt = (art: string) => {
    return art.split('\n').map((line, i) => {
      // Color the beard brown (▓) and shirt black (▒)
      // Color the skin/face area with a skin tone
      // Color the eyes
      let coloredLine = line
        // Brown for beard (▓)
        .replace(/▓/g, `<span style="color: ${BEARD_BROWN}">▓</span>`)
        // Black for shirt (▒)
        .replace(/▒/g, `<span style="color: ${SHIRT_BLACK}">▒</span>`)
        // Skin tone for face area (░) - bald head
        .replace(/░/g, '<span style="color: #ffdbac">░</span>')
        // Dark for structure (█)
        .replace(/█/g, '<span style="color: #333">█</span>')
        // Eyes
        .replace(/●/g, '<span style="color: #222">●</span>')
        .replace(/\^/g, '<span style="color: #222">^</span>')
        // Mouth
        .replace(/╲__╱/g, '<span style="color: #ff6b6b">╲__╱</span>')
        // CIS text in blue
        .replace(/CIS/g, `<span style="color: ${MATT_BLUE}; font-weight: bold">CIS</span>`)
        // Laptop screen
        .replace(/====/g, `<span style="color: #4ade80">====</span>`);

      return (
        <span
          key={i}
          dangerouslySetInnerHTML={{ __html: coloredLine }}
          style={{ display: 'block' }}
        />
      );
    });
  };

  const fontSize = size === 'mini' ? '8px' : size === 'compact' ? '10px' : '12px';

  return (
    <pre
      className={`font-mono leading-none select-none ${className}`}
      style={{
        fontSize,
        lineHeight: 1.1,
        whiteSpace: 'pre',
        ...style,
      }}
      aria-label="Matt Lee pixel art character"
    >
      {renderColoredArt(currentFrame)}
    </pre>
  );
}

// Utility component for simple inline usage
export function MattLeeIcon({ size = 16 }: { size?: number }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        backgroundColor: MATT_BLUE,
        borderRadius: '50%',
        position: 'relative',
      }}
      aria-label="Matt Lee icon"
    >
      <span style={{
        position: 'absolute',
        bottom: '15%',
        left: '20%',
        right: '20%',
        height: '30%',
        backgroundColor: '#654321',
        borderRadius: '0 0 50% 50%',
      }} />
    </span>
  );
}

// CSS Pixel Art version using divs (alternative implementation)
export function MattLeePixelArt({
  scale = 4,
  animation = 'standing' as AnimationState,
  className = '',
}: {
  scale?: number;
  animation?: AnimationState;
  className?: string;
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (animation !== 'walking') return;
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 2);
    }, 300);
    return () => clearInterval(interval);
  }, [animation]);

  const pixel = scale;
  const shirt = SHIRT_BLACK;
  const skin = '#ffdbac';
  const dark = '#333333';
  const beard = BEARD_BROWN;
  const eye = '#222222';

  // 12x16 pixel grid design - BALD head, LONG beard, BLACK shirt
  const pixelData = [
    // Row 0 - top of bald head
    [0,0,0,dark,dark,dark,dark,dark,dark,0,0,0],
    // Row 1 - bald head (skin color)
    [0,0,dark,skin,skin,skin,skin,skin,skin,dark,0,0],
    // Row 2 - forehead (bald)
    [0,dark,skin,skin,skin,skin,skin,skin,skin,skin,dark,0],
    // Row 3 - eyes
    [0,dark,skin,eye,skin,skin,skin,skin,eye,skin,dark,0],
    // Row 4 - nose
    [0,dark,skin,skin,skin,skin,skin,skin,skin,skin,dark,0],
    // Row 5 - beard starts around mouth
    [0,dark,skin,beard,beard,beard,beard,beard,beard,skin,dark,0],
    // Row 6 - full beard
    [0,dark,beard,beard,beard,beard,beard,beard,beard,beard,dark,0],
    // Row 7 - beard continues (long)
    [0,0,dark,beard,beard,beard,beard,beard,beard,dark,0,0],
    // Row 8 - beard continues to chest
    [0,0,0,dark,beard,beard,beard,beard,dark,0,0,0],
    // Row 9 - shoulders with beard overlay
    [0,dark,shirt,shirt,beard,beard,beard,beard,shirt,shirt,dark,0],
    // Row 10 - body (black shirt) with beard
    [dark,shirt,shirt,shirt,shirt,beard,beard,shirt,shirt,shirt,shirt,dark],
    // Row 11 - body (black shirt)
    [dark,shirt,shirt,shirt,shirt,shirt,shirt,shirt,shirt,shirt,shirt,dark],
    // Row 12 - belt
    [0,dark,dark,dark,dark,dark,dark,dark,dark,dark,dark,0],
    // Row 13 - legs
    [0,0,dark,dark,dark,0,0,dark,dark,dark,0,0],
    // Row 14 - legs
    [0,0,dark,dark,dark,0,0,dark,dark,dark,0,0],
    // Row 15 - feet
    [0,dark,dark,dark,dark,0,0,dark,dark,dark,dark,0],
  ];

  // Celebrating pose - arms up (bald, long beard, black shirt)
  const celebrateData = [
    // Row 0 - arms up
    [dark,shirt,0,0,dark,dark,dark,dark,0,0,shirt,dark],
    // Row 1 - arms and bald head
    [0,dark,shirt,dark,skin,skin,skin,skin,dark,shirt,dark,0],
    // Row 2 - bald forehead
    [0,dark,skin,skin,skin,skin,skin,skin,skin,skin,dark,0],
    // Row 3 - eyes (happy)
    [0,dark,skin,'^',skin,skin,skin,skin,'^',skin,dark,0],
    // Row 4 - nose
    [0,dark,skin,skin,skin,skin,skin,skin,skin,skin,dark,0],
    // Row 5 - beard start (smiling)
    [0,dark,skin,beard,beard,'#ff6b6b','#ff6b6b',beard,beard,skin,dark,0],
    // Row 6 - full beard
    [0,dark,beard,beard,beard,beard,beard,beard,beard,beard,dark,0],
    // Row 7 - beard continues (long)
    [0,0,dark,beard,beard,beard,beard,beard,beard,dark,0,0],
    // Row 8 - beard to chest
    [0,0,0,dark,beard,beard,beard,beard,dark,0,0,0],
    // Row 9 - shoulders (no arms, they're up) with beard
    [0,0,shirt,shirt,beard,beard,beard,beard,shirt,shirt,0,0],
    // Row 10 - body (black shirt)
    [0,dark,shirt,shirt,shirt,beard,beard,shirt,shirt,shirt,dark,0],
    // Row 11 - body (black shirt)
    [0,dark,shirt,shirt,shirt,shirt,shirt,shirt,shirt,shirt,dark,0],
    // Row 12 - belt
    [0,dark,dark,dark,dark,dark,dark,dark,dark,dark,dark,0],
    // Row 13 - legs
    [0,0,dark,dark,dark,0,0,dark,dark,dark,0,0],
    // Row 14 - legs
    [0,0,dark,dark,dark,0,0,dark,dark,dark,0,0],
    // Row 15 - feet
    [0,dark,dark,dark,dark,0,0,dark,dark,dark,dark,0],
  ];

  const currentData = animation === 'celebrating' ? celebrateData : pixelData;

  return (
    <div
      className={className}
      style={{
        display: 'inline-grid',
        gridTemplateColumns: `repeat(12, ${pixel}px)`,
        gridTemplateRows: `repeat(16, ${pixel}px)`,
        gap: 0,
      }}
      aria-label="Matt Lee pixel art character"
    >
      {currentData.flat().map((color, i) => (
        <div
          key={i}
          style={{
            width: pixel,
            height: pixel,
            backgroundColor: typeof color === 'string' ? color : 'transparent',
          }}
        />
      ))}
    </div>
  );
}
