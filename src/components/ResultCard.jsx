import React from 'react';
import styles from './ResultCard.module.css';

export default function ResultCard({ score, unit, rank, extra }) {
  return (
    <div className={styles.card}>
      <div className={styles.glowOrb} />
      <div className={styles.sectionLabel}>Your Result</div>
      <div className={styles.score}>{score}</div>
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
