// ─── useSound.js ──────────────────────────────────────────────
// PLACEMENT: src/hooks/useSound.js  (NEW FILE)
// Web Audio API — synthesized sounds, no files needed.

import { useCallback } from 'react';

function ctx() {
  if (!window._sbAudio) {
    try { window._sbAudio = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { return null; }
  }
  const c = window._sbAudio;
  if (c.state === 'suspended') c.resume();
  return c;
}

function tone(freq, type, duration, volume, startFreq, endFreq, delay = 0) {
  const c = ctx();
  if (!c) return;
  const osc  = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  const t = c.currentTime + delay;
  osc.frequency.setValueAtTime(startFreq || freq, t);
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.01);
}

export function useSound() {
  // Correct letter typed
  const playClick = useCallback(() => {
    tone(880, 'sine', 0.06, 0.05, 880, 1100);
  }, []);

  // Wrong letter typed
  const playError = useCallback(() => {
    tone(160, 'sawtooth', 0.12, 0.07, 160, 80);
  }, []);

  // Word completed correctly
  const playCorrectWord = useCallback(() => {
    tone(660, 'sine', 0.09, 0.06);
    tone(880, 'sine', 0.09, 0.06, 880, 880, 0.07);
  }, []);

  // Game finished — victory whoosh + chord
  const playWhoosh = useCallback(() => {
    tone(200, 'sine', 0.5, 0.1, 200, 1400);
    [523, 659, 784].forEach((f, i) => tone(f, 'sine', 0.6, 0.07, f, f, 0.35 + i * 0.07));
  }, []);

  // Reaction GO signal
  const playGo = useCallback(() => {
    tone(440, 'square', 0.15, 0.05, 440, 880);
  }, []);

  // Too early — double buzz
  const playTooEarly = useCallback(() => {
    tone(220, 'sawtooth', 0.12, 0.09);
    tone(180, 'sawtooth', 0.12, 0.09, 180, 180, 0.13);
  }, []);

  return { playClick, playError, playCorrectWord, playWhoosh, playGo, playTooEarly };
}