// ─── ResultCard.jsx ───────────────────────────────────────────
// PLACEMENT: src/components/ResultCard.jsx  (REPLACE existing)
// Adds: animated count-up, personal best badge, rank color theming

import React, { useEffect, useRef, useState } from 'react';
import styles from './ResultCard.module.css';

function useCountUp(target, duration = 1200) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!target) return;
    const start = performance.now();
    const from  = 0;

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

export default function ResultCard({ score, unit, rank, extra, isPersonalBest }) {
  const displayed = useCountUp(score, 1100);

  return (
    <div className={styles.card}>
      <div
        className={styles.glowOrb}
        style={{ background: `radial-gradient(circle, ${rank?.color ?? '#facc15'}28 0%, transparent 70%)` }}
      />

      <div className={styles.sectionLabel}>Your Result</div>

      {isPersonalBest && (
        <div className={styles.pbBadge}>🏅 Personal Best!</div>
      )}

      <div className={styles.score} style={{ color: rank?.color ?? '#facc15' }}>
        {displayed}
      </div>
      <div className={styles.unit}>{unit}</div>

      <div
        className={styles.rank}
        style={{ borderColor: (rank?.color ?? '#facc15') + '66', color: rank?.color ?? '#facc15' }}
      >
        {rank?.emoji} &nbsp; {rank?.label}
      </div>

      {extra && <div className={styles.extra}>{extra}</div>}
    </div>
  );
}