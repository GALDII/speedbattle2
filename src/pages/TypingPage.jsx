// ─── TypingPage.jsx ───────────────────────────────────────────
// PLACEMENT: src/pages/TypingPage.jsx  (REPLACE existing)
// ZERO ads on this page. Game must be distraction-free.
// Sticky banner from App.jsx is the only ad shown (passive, below nav).

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingGame from '../games/TypingGame';
import styles from './GamePage.module.css';

export default function TypingPage({ onResult }) {
  const navigate = useNavigate();

  const handleResult = useCallback((result) => {
    onResult(result);
    navigate('/typing/result');
  }, [onResult, navigate]);

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/')}>← Back</button>
      <div className={styles.title}>Typing Speed</div>
      <div className={styles.sub}>Type all words as fast as possible</div>
      <TypingGame onResult={handleResult} />
    </div>
  );
}