// ─── ReactionGame.jsx ─────────────────────────────────────────
// Reaction speed test with multiple attempts.
// User can retry infinite times. Best score is sent to result page.
// Stats row only shows after first successful attempt.

import React, { useState, useRef, useCallback } from 'react';
import { useSound } from '../hooks/useSound';
import styles from './ReactionGame.module.css';

const CONFIGS = {
  idle:     { bg: '#141414', border: '#2a2a2a', title: 'TAP TO START', color: '#f0f0f0', sub: 'Tap to begin the test' },
  waiting:  { bg: '#1a0808', border: '#ef4444', title: 'WAIT...',       color: '#ef4444', sub: "Don't tap yet!" },
  go:       { bg: '#081a0d', border: '#22c55e', title: 'TAP NOW!',      color: '#22c55e', sub: '' },
  tooEarly: { bg: '#1a0808', border: '#ef4444', title: 'TOO EARLY!',    color: '#ef4444', sub: 'Tap again to retry' },
  done:     { bg: '#141414', border: '#facc15', title: '',              color: '#facc15', sub: 'Tap to try again' },
};

export default function ReactionGame({ onResult }) {
  const [gameState, setGameState] = useState('idle');
  const [attempts, setAttempts]   = useState([]);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const { playGo, playTooEarly, playWhoosh } = useSound();

  const handleTap = useCallback(() => {
    if (gameState === 'idle' || gameState === 'done' || gameState === 'tooEarly') {
      setGameState('waiting');
      const delay = 2000 + Math.random() * 3000;
      timerRef.current = setTimeout(() => {
        setGameState('go');
        startRef.current = performance.now();
        playGo();
      }, delay);
    } else if (gameState === 'waiting') {
      clearTimeout(timerRef.current);
      setGameState('tooEarly');
      playTooEarly();
    } else if (gameState === 'go') {
      const ms   = Math.round(performance.now() - startRef.current);
      const next = [...attempts, ms];
      setAttempts(next);
      setGameState('done');
      playWhoosh();
      // Send best score (lowest ms) to result handler
      const bestMs = Math.min(...next);
      onResult(bestMs, next);
    }
  }, [gameState, attempts, onResult, playGo, playTooEarly, playWhoosh]);

  const cfg  = CONFIGS[gameState];
  const best = attempts.length ? Math.min(...attempts) : null;
  const avg  = attempts.length ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) : null;

  return (
    <div>
      <div
        className={styles.arena}
        style={{ background: cfg.bg, borderColor: cfg.border }}
        onClick={handleTap}
      >
        {gameState === 'go' && <div className={styles.pulse} />}
        <div className={styles.title} style={{ color: cfg.color }}>
          {gameState === 'done' && best !== null ? `${attempts[attempts.length - 1]} ms` : cfg.title}
        </div>
        {cfg.sub && <div className={styles.sub}>{cfg.sub}</div>}
      </div>

      {/* Only show stats after at least one successful attempt */}
      {attempts.length > 0 && (
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.val}>{attempts.length}</div>
            <div className={styles.lbl}>{attempts.length === 1 ? 'Attempt' : 'Attempts'}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.val}>{best}</div>
            <div className={styles.lbl}>Best (ms)</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.val}>{avg}</div>
            <div className={styles.lbl}>Avg (ms)</div>
          </div>
        </div>
      )}

      {/* Show instruction when no attempts yet */}
      {attempts.length === 0 && gameState === 'idle' && (
        <div className={styles.statsRow}>
          <div className={styles.stat} style={{ gridColumn: '1 / -1' }}>
            <div className={styles.lbl} style={{ fontSize: '12px' }}>
              Tap the arena above to start. React as fast as you can when it turns green!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}