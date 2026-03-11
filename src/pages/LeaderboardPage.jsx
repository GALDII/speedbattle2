// ─── LeaderboardPage.jsx ─────────────────────────────────────
// PLACEMENT: src/pages/LeaderboardPage.jsx  (REPLACE existing)
// Ad placement: 'between' block after the full leaderboard list.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';
import AdSlot from '../components/AdSlot';
import styles from './GamePage.module.css';

export default function LeaderboardPage({ reactionBoard, typingBoard, myScore }) {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/')}>← Back</button>
      <div className={styles.title}>Leaderboard</div>
      <div className={styles.sub}>Top players — all-time & today</div>
      <Leaderboard reactionBoard={reactionBoard} typingBoard={typingBoard} myScore={myScore} />
      {/* Ad after full list — user has scrolled through content naturally */}
      <AdSlot size="between" />
    </div>
  );
}