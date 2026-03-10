import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>⚡</span>Speed<span className={styles.dim}>Battle</span>
      </div>
      <div className={styles.tagline}>How fast are you?</div>
    </header>
  );
}
