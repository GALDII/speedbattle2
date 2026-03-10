import React from 'react';
import { useNavigate } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';
import AdSlot from '../components/AdSlot';
import styles from './GamePage.module.css';

export default function LeaderboardPage({ reactionBoard, typingBoard }) {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/')}>← Back</button>
      <div className={styles.title}>Leaderboard</div>
      <div className={styles.sub}>Top players today</div>
      <Leaderboard reactionBoard={reactionBoard} typingBoard={typingBoard} />
      <AdSlot size="mid" />
    </div>
  );
}
