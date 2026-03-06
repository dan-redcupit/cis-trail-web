// Retro Oregon Trail-style sound effects using Web Audio API

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Play a simple tone
function playTone(frequency: number, duration: number, type: OscillatorType = 'square', volume: number = 0.3) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    // Fade out
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio not supported or blocked
  }
}

// Play a sequence of tones
function playSequence(notes: { freq: number; dur: number }[], type: OscillatorType = 'square') {
  let delay = 0;
  notes.forEach(({ freq, dur }) => {
    setTimeout(() => playTone(freq, dur, type), delay * 1000);
    delay += dur;
  });
}

// === SOUND EFFECTS ===

// Button click - short blip
export function playClick() {
  playTone(800, 0.05, 'square', 0.2);
}

// Menu select - two tone
export function playSelect() {
  playSequence([
    { freq: 400, dur: 0.08 },
    { freq: 600, dur: 0.08 },
  ]);
}

// Correct answer - happy ascending
export function playCorrect() {
  playSequence([
    { freq: 523, dur: 0.1 },  // C
    { freq: 659, dur: 0.1 },  // E
    { freq: 784, dur: 0.15 }, // G
    { freq: 1047, dur: 0.2 }, // High C
  ]);
}

// Wrong answer - sad descending
export function playWrong() {
  playSequence([
    { freq: 400, dur: 0.15 },
    { freq: 300, dur: 0.15 },
    { freq: 200, dur: 0.3 },
  ], 'sawtooth');
}

// Death sound - classic Oregon Trail death
export function playDeath() {
  playSequence([
    { freq: 400, dur: 0.2 },
    { freq: 350, dur: 0.2 },
    { freq: 300, dur: 0.2 },
    { freq: 250, dur: 0.2 },
    { freq: 200, dur: 0.4 },
  ], 'triangle');
}

// Dysentery/sick sound - gurgling
export function playDysentery() {
  const ctx = getAudioContext();
  try {
    // Create a "stomach gurgle" sound
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const freq = 80 + Math.random() * 60;
        playTone(freq, 0.15, 'sawtooth', 0.25);
      }, i * 120);
    }
    // End with a low rumble
    setTimeout(() => playTone(60, 0.3, 'triangle', 0.3), 600);
  } catch (e) {}
}

// Fart/whoopee sound - for comedic deaths
export function playFart() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}

// Good event - cheerful
export function playGoodEvent() {
  playSequence([
    { freq: 523, dur: 0.1 },
    { freq: 659, dur: 0.1 },
    { freq: 784, dur: 0.1 },
  ]);
}

// Bad event - warning
export function playBadEvent() {
  playSequence([
    { freq: 200, dur: 0.2 },
    { freq: 180, dur: 0.2 },
  ], 'sawtooth');
}

// Wagon moving - rhythmic clip-clop
export function playWagonMove() {
  playSequence([
    { freq: 100, dur: 0.05 },
    { freq: 120, dur: 0.05 },
  ], 'triangle');
}

// Victory fanfare
export function playVictory() {
  playSequence([
    { freq: 523, dur: 0.15 },  // C
    { freq: 523, dur: 0.15 },  // C
    { freq: 523, dur: 0.15 },  // C
    { freq: 523, dur: 0.4 },   // C (long)
    { freq: 415, dur: 0.4 },   // Ab
    { freq: 466, dur: 0.4 },   // Bb
    { freq: 523, dur: 0.15 },  // C
    { freq: 466, dur: 0.1 },   // Bb
    { freq: 523, dur: 0.6 },   // C (long)
  ]);
}

// Game over - sad trombone
export function playGameOver() {
  playSequence([
    { freq: 392, dur: 0.4 },  // G
    { freq: 370, dur: 0.4 },  // F#
    { freq: 349, dur: 0.4 },  // F
    { freq: 330, dur: 0.8 },  // E (long, sad)
  ], 'triangle');
}

// Hunting/scanning sound
export function playScanning() {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      playTone(200 + i * 50, 0.1, 'square', 0.15);
    }, i * 100);
  }
}

// Rest/healing sound
export function playRest() {
  playSequence([
    { freq: 300, dur: 0.3 },
    { freq: 350, dur: 0.3 },
    { freq: 400, dur: 0.5 },
  ], 'sine');
}

// Start game sound
export function playStart() {
  playSequence([
    { freq: 262, dur: 0.1 },
    { freq: 330, dur: 0.1 },
    { freq: 392, dur: 0.1 },
    { freq: 523, dur: 0.2 },
  ]);
}

// A-10 Warthog BRRRT sound - GAU-8 Avenger cannon
export function playBrrrt() {
  try {
    const ctx = getAudioContext();
    const duration = 0.8;

    // Create noise buffer for the gun sound
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate "ripping" noise pattern
    for (let i = 0; i < bufferSize; i++) {
      // Modulate noise with high frequency to create "brrt" effect
      const modulation = Math.sin(i / (ctx.sampleRate / 70)) > 0 ? 1 : 0.3;
      output[i] = (Math.random() * 2 - 1) * modulation;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Low-pass filter for that chunky gun sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    // Gain envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    // Add a low frequency oscillator for the "thump"
    const lfo = ctx.createOscillator();
    lfo.type = 'sawtooth';
    lfo.frequency.value = 35;

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.3, ctx.currentTime);
    lfoGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    // Connect everything
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    lfo.connect(lfoGain);
    lfoGain.connect(ctx.destination);

    // Start
    noiseSource.start(ctx.currentTime);
    lfo.start(ctx.currentTime);
    lfo.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio not supported
  }
}

// A-10 jet engine sound (continuous hum)
export function playJetEngine() {
  try {
    const ctx = getAudioContext();

    // Low rumble
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 80;

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 120;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.5);
    osc2.stop(ctx.currentTime + 0.5);
  } catch (e) {}
}

// === NEW SOUND EFFECTS ===

// Audit alarm - klaxon for compliance checkpoints
export function playAuditAlarm() {
  try {
    const ctx = getAudioContext();
    // Two-tone klaxon alternating
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        playTone(i % 2 === 0 ? 600 : 400, 0.15, 'square', 0.25);
      }, i * 150);
    }
  } catch (e) {}
}

// Keyboard clacking - typing during vulnerability hunting
export function playKeyboardClack() {
  try {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const freq = 1800 + Math.random() * 400;
        playTone(freq, 0.03, 'square', 0.15);
      }, i * 80 + Math.random() * 40);
    }
  } catch (e) {}
}

// Cash register - cha-ching when SPRS increases
export function playCashRegister() {
  try {
    // Bell ding
    playTone(1200, 0.1, 'sine', 0.3);
    setTimeout(() => playTone(1500, 0.1, 'sine', 0.25), 100);
    setTimeout(() => playTone(1800, 0.15, 'sine', 0.2), 200);
    // Drawer slide
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => playTone(200 + i * 50, 0.05, 'triangle', 0.15), i * 30);
      }
    }, 300);
  } catch (e) {}
}

// Sad trombone - wah wah waaaah on wrong answers
export function playSadTrombone() {
  playSequence([
    { freq: 311, dur: 0.25 },  // Eb
    { freq: 293, dur: 0.25 },  // D
    { freq: 277, dur: 0.25 },  // C#
    { freq: 261, dur: 0.6 },   // C (long, sad)
  ], 'triangle');
}

// Dialup modem - retro internet connection sound
export function playDialup() {
  try {
    const ctx = getAudioContext();
    // Initial dial tones
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        playTone(350 + Math.random() * 200, 0.08, 'sine', 0.2);
      }, i * 100);
    }
    // Handshake screech
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const freq = 1000 + Math.random() * 1500;
          playTone(freq, 0.05, 'square', 0.12);
        }, i * 60);
      }
    }, 500);
    // Connection established beeps
    setTimeout(() => {
      playTone(1200, 0.1, 'sine', 0.15);
      setTimeout(() => playTone(1400, 0.1, 'sine', 0.15), 150);
    }, 1200);
  } catch (e) {}
}

// Coffee slurp - when resting
export function playCoffeeSlurp() {
  try {
    const ctx = getAudioContext();
    // Slurp is a descending noise burst
    const duration = 0.3;
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Modulated noise that descends in intensity
      const envelope = 1 - (i / bufferSize);
      output[i] = (Math.random() * 2 - 1) * envelope * 0.5;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 2;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start(ctx.currentTime);
  } catch (e) {}
}

// Paper shredder sound
export function playShredder() {
  try {
    const ctx = getAudioContext();
    const duration = 0.6;
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Grinding noise pattern
    for (let i = 0; i < bufferSize; i++) {
      const modulation = Math.sin(i / (ctx.sampleRate / 100)) > 0 ? 1 : 0.6;
      output[i] = (Math.random() * 2 - 1) * modulation;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start(ctx.currentTime);
  } catch (e) {}
}

// Windows error sound - classic error beep
export function playWindowsError() {
  try {
    // Classic two-tone error
    playTone(523, 0.15, 'square', 0.25);  // C
    setTimeout(() => playTone(392, 0.3, 'square', 0.25), 150);  // G (lower)
  } catch (e) {}
}

// Cheat code activated sound
export function playCheatActivated() {
  try {
    // Magical ascending arpeggio
    const notes = [262, 330, 392, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.1, 'sine', 0.2), i * 50);
    });
    // Final sparkle
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => playTone(1500 + Math.random() * 500, 0.05, 'sine', 0.15), i * 40);
      }
    }, 400);
  } catch (e) {}
}

// Secret discovered sound
export function playSecretFound() {
  playSequence([
    { freq: 392, dur: 0.1 },   // G
    { freq: 523, dur: 0.1 },   // C
    { freq: 659, dur: 0.1 },   // E
    { freq: 784, dur: 0.2 },   // G (high)
  ], 'sine');
}

// === THEME MUSIC ===

// Store references for the music system
let musicOscillators: OscillatorNode[] = [];
let musicGainNodes: GainNode[] = [];
let musicInterval: ReturnType<typeof setInterval> | null = null;
let isMusicPlaying = false;

// CIS Trail Theme - 8-bit adventure march
// Key of C major, upbeat and adventurous
const THEME_MELODY = [
  // Intro phrase (building anticipation)
  { note: 'C4', dur: 0.2 },
  { note: 'E4', dur: 0.2 },
  { note: 'G4', dur: 0.2 },
  { note: 'C5', dur: 0.4 },
  { note: 'B4', dur: 0.2 },
  { note: 'A4', dur: 0.2 },
  { note: 'G4', dur: 0.4 },
  { note: 'rest', dur: 0.2 },

  // Main theme A (heroic march)
  { note: 'C5', dur: 0.3 },
  { note: 'C5', dur: 0.1 },
  { note: 'D5', dur: 0.2 },
  { note: 'E5', dur: 0.4 },
  { note: 'D5', dur: 0.2 },
  { note: 'C5', dur: 0.2 },
  { note: 'A4', dur: 0.4 },
  { note: 'G4', dur: 0.4 },

  // Main theme B (determined forward motion)
  { note: 'A4', dur: 0.2 },
  { note: 'B4', dur: 0.2 },
  { note: 'C5', dur: 0.3 },
  { note: 'C5', dur: 0.1 },
  { note: 'D5', dur: 0.2 },
  { note: 'E5', dur: 0.2 },
  { note: 'F5', dur: 0.2 },
  { note: 'E5', dur: 0.4 },
  { note: 'rest', dur: 0.2 },

  // Bridge (tension building)
  { note: 'G5', dur: 0.3 },
  { note: 'F5', dur: 0.1 },
  { note: 'E5', dur: 0.2 },
  { note: 'D5', dur: 0.2 },
  { note: 'C5', dur: 0.4 },
  { note: 'B4', dur: 0.2 },
  { note: 'C5', dur: 0.6 },

  // Resolution (triumphant)
  { note: 'E5', dur: 0.2 },
  { note: 'G5', dur: 0.2 },
  { note: 'C6', dur: 0.6 },
  { note: 'B5', dur: 0.2 },
  { note: 'A5', dur: 0.2 },
  { note: 'G5', dur: 0.4 },
  { note: 'rest', dur: 0.4 },
];

// Bass line (accompaniment)
const THEME_BASS = [
  { note: 'C3', dur: 0.4 },
  { note: 'C3', dur: 0.4 },
  { note: 'G2', dur: 0.4 },
  { note: 'G2', dur: 0.4 },
  { note: 'A2', dur: 0.4 },
  { note: 'A2', dur: 0.4 },
  { note: 'G2', dur: 0.8 },

  { note: 'C3', dur: 0.4 },
  { note: 'E3', dur: 0.4 },
  { note: 'G3', dur: 0.4 },
  { note: 'G3', dur: 0.4 },
  { note: 'F3', dur: 0.4 },
  { note: 'F3', dur: 0.4 },
  { note: 'E3', dur: 0.4 },
  { note: 'E3', dur: 0.4 },

  { note: 'F3', dur: 0.4 },
  { note: 'F3', dur: 0.4 },
  { note: 'G3', dur: 0.4 },
  { note: 'G3', dur: 0.4 },
  { note: 'A3', dur: 0.4 },
  { note: 'A3', dur: 0.4 },
  { note: 'G3', dur: 0.8 },

  { note: 'E3', dur: 0.4 },
  { note: 'D3', dur: 0.4 },
  { note: 'C3', dur: 0.4 },
  { note: 'G2', dur: 0.4 },
  { note: 'C3', dur: 0.8 },

  { note: 'C3', dur: 0.4 },
  { note: 'E3', dur: 0.4 },
  { note: 'G3', dur: 0.4 },
  { note: 'G3', dur: 0.4 },
  { note: 'C3', dur: 0.8 },
];

// Convert note name to frequency
function noteToFreq(note: string): number {
  if (note === 'rest') return 0;

  const noteMap: Record<string, number> = {
    'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
    'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'F6': 1396.91, 'G6': 1567.98, 'A6': 1760.00, 'B6': 1975.53,
  };

  return noteMap[note] || 440;
}

// Play a single note with given parameters
function playMusicNote(freq: number, duration: number, type: OscillatorType, volume: number, startTime: number): { osc: OscillatorNode; gain: GainNode } | null {
  if (freq === 0) return null; // rest

  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.value = freq;

    // Envelope for cleaner sound
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
    gain.gain.setValueAtTime(volume, startTime + duration - 0.05);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);

    return { osc, gain };
  } catch (e) {
    return null;
  }
}

// Schedule a melody line
function scheduleMelody(melody: { note: string; dur: number }[], type: OscillatorType, volume: number, startTime: number): number {
  let currentTime = startTime;

  for (const { note, dur } of melody) {
    const freq = noteToFreq(note);
    const result = playMusicNote(freq, dur, type, volume, currentTime);
    if (result) {
      musicOscillators.push(result.osc);
      musicGainNodes.push(result.gain);
    }
    currentTime += dur;
  }

  return currentTime - startTime; // Return total duration
}

// Start playing the theme music (loops)
export function startThemeMusic() {
  if (isMusicPlaying) return;

  try {
    const ctx = getAudioContext();
    isMusicPlaying = true;

    const playLoop = () => {
      if (!isMusicPlaying) return;

      const startTime = ctx.currentTime + 0.1;

      // Play melody (square wave for that 8-bit feel)
      const duration = scheduleMelody(THEME_MELODY, 'square', 0.12, startTime);

      // Play bass line (triangle wave for warmth)
      scheduleMelody(THEME_BASS, 'triangle', 0.08, startTime);

      // Add a simple drum beat
      const beatInterval = 0.4; // quarter note
      const totalBeats = Math.floor(duration / beatInterval);
      for (let i = 0; i < totalBeats; i++) {
        const beatTime = startTime + (i * beatInterval);
        // Kick on 1 and 3
        if (i % 2 === 0) {
          playMusicNote(60, 0.1, 'triangle', 0.15, beatTime);
        }
        // Hi-hat on every beat
        playMusicNote(1200, 0.05, 'square', 0.03, beatTime);
      }

      // Schedule next loop
      musicInterval = setTimeout(playLoop, duration * 1000);
    };

    playLoop();
  } catch (e) {
    isMusicPlaying = false;
  }
}

// Stop the theme music
export function stopThemeMusic() {
  isMusicPlaying = false;

  if (musicInterval) {
    clearTimeout(musicInterval);
    musicInterval = null;
  }

  // Stop all oscillators
  musicOscillators.forEach(osc => {
    try {
      osc.stop();
    } catch (e) {
      // Already stopped
    }
  });

  // Disconnect gain nodes
  musicGainNodes.forEach(gain => {
    try {
      gain.disconnect();
    } catch (e) {
      // Already disconnected
    }
  });

  musicOscillators = [];
  musicGainNodes = [];
}

// Toggle theme music
export function toggleThemeMusic(): boolean {
  if (isMusicPlaying) {
    stopThemeMusic();
    return false;
  } else {
    startThemeMusic();
    return true;
  }
}

// Check if music is playing
export function isMusicCurrentlyPlaying(): boolean {
  return isMusicPlaying;
}
