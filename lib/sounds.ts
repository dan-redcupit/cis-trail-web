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
