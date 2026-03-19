// ─── rankingLogic.js ──────────────────────────────────────────
// Ranks and percentiles for both game modes.
// Typing rank factors BOTH WPM and accuracy — no reward for spam.

// ═══ REACTION ═══════════════════════════════════════════════
export function getReactionRank(ms) {
  if (ms < 180) return { label: 'NINJA REFLEX', emoji: '🥷', color: '#22c55e' };
  if (ms < 220) return { label: 'PRO GAMER',   emoji: '🎮', color: '#facc15' };
  if (ms < 280) return { label: 'FAST HUMAN',  emoji: '⚡', color: '#f97316' };
  if (ms < 350) return { label: 'AVERAGE',     emoji: '👤', color: '#94a3b8' };
  return { label: 'SLOW POKE', emoji: '🐢', color: '#ef4444' };
}

export function getReactionPercentile(ms) {
  if (ms < 180) return 96;
  if (ms < 200) return 82;
  if (ms < 220) return 65;
  if (ms < 250) return 48;
  if (ms < 280) return 32;
  if (ms < 350) return 20;
  return 10;
}

// ═══ TYPING ═════════════════════════════════════════════════
// Effective score = WPM × (accuracy / 100)
// This means 310 WPM at 0% accuracy = effective score of 0
// Only legitimately fast AND accurate typing gets top ranks.

export function getTypingRank(wpm, acc = 100) {
  // If accuracy is below 30%, it's basically spam — always "NEEDS PRACTICE"
  if (acc < 30) return { label: 'NEEDS PRACTICE', emoji: '📝', color: '#ef4444' };

  const effective = wpm * (acc / 100);

  if (effective >= 90) return { label: 'KEYBOARD MASTER', emoji: '💻', color: '#22c55e' };
  if (effective >= 65) return { label: 'PRO TYPIST',      emoji: '🔥', color: '#facc15' };
  if (effective >= 45) return { label: 'FAST FINGERS',    emoji: '⚡', color: '#f97316' };
  if (effective >= 25) return { label: 'GETTING THERE',   emoji: '👆', color: '#3b82f6' };
  return { label: 'BEGINNER', emoji: '🌱', color: '#94a3b8' };
}

export function getTypingPercentile(wpm, acc = 100) {
  if (acc < 30) return 5;

  const effective = wpm * (acc / 100);

  if (effective >= 90) return 95;
  if (effective >= 70) return 82;
  if (effective >= 55) return 68;
  if (effective >= 40) return 50;
  if (effective >= 25) return 35;
  return 15;
}
