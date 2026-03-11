import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactionGame from '../games/ReactionGame';
import AdSlot from '../components/AdSlot';
import styles from './GamePage.module.css';

export default function ReactionPage({ onResult }) {
  const navigate = useNavigate();

  const handleResult = useCallback((ms) => {
    onResult(ms);
    setTimeout(() => navigate('/reaction/result'), 700);
  }, [onResult, navigate]);

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/')}>← Back</button>
      <div className={styles.title}>Reaction Test</div>
      <div className={styles.sub}>Tap the arena the INSTANT it turns green</div>
      <AdSlot size="mid" />
      <ReactionGame onResult={handleResult} />
    </div>
  );
}