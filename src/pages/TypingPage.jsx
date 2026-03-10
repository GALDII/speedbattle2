import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingGame from '../games/TypingGame';
import AdSlot from '../components/AdSlot';
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
      <AdSlot size="mid" />
    </div>
  );
}
