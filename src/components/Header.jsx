// ─── Header.jsx ───────────────────────────────────────────────
// PLACEMENT: src/components/Header.jsx  (REPLACE existing)
// Adds: live player count pill

import React from 'react';
import styles from './Header.module.css';

export default function Header({ liveCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>⚡</span>Speed<span className={styles.dim}>Battle</span>
      </div>
      <div className={styles.right}>
        {liveCount != null && (
          <div className={styles.livePill}>
            <span className={styles.liveDot} />
            {liveCount} playing
          </div>
        )}
        <div className={styles.tagline}>How fast are you?</div>
      </div>
    </header>
  );
}