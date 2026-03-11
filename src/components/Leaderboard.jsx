// ─── Leaderboard.jsx ──────────────────────────────────────────
// PLACEMENT: src/components/Leaderboard.jsx  (REPLACE existing)
// Adds: Today / All-Time tabs, personal rank row, podium top-3 display

import React, { useState } from 'react';
import styles from './Leaderboard.module.css';

function PodiumItem({ rank, name, score, unit }) {
  const heights = { 1: 90, 2: 70, 3: 55 };
  const colors  = { 1: '#ffd700', 2: '#c0c0c0', 3: '#cd7f32' };
  const emojis  = { 1: '🥇', 2: '🥈', 3: '🥉' };

  return (
    <div className={styles.podiumItem}>
      <div className={styles.podiumName}>{name}</div>
      <div className={styles.podiumScore} style={{ color: colors[rank] }}>
        {score}<span className={styles.podiumUnit}>{unit}</span>
      </div>
      <div
        className={styles.podiumBar}
        style={{ height: heights[rank], background: colors[rank] + '33', borderColor: colors[rank] + '88' }}
      >
        <span className={styles.podiumEmoji}>{emojis[rank]}</span>
      </div>
    </div>
  );
}

function LbItem({ rank, name, score, unit, date, isYou }) {
  return (
    <div className={`${styles.item} ${isYou ? styles.you : ''}`}>
      <div className={`${styles.rank} ${rank <= 3 ? styles['r' + rank] : ''}`}>
        {rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name} {isYou && <span className={styles.youBadge}>YOU</span>}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.score}>{score} <span className={styles.unit}>{unit}</span></div>
    </div>
  );
}

function getTodayEntries(entries) {
  const today = new Date().toDateString();
  return entries.filter(e => {
    if (!e.created_at) return e.date === 'Today';
    return new Date(e.created_at).toDateString() === today;
  });
}

export default function Leaderboard({ reactionBoard, typingBoard, myScore }) {
  const [gameTab,  setGameTab]  = useState('reaction');
  const [timeTab,  setTimeTab]  = useState('alltime');

  const allData  = gameTab === 'reaction' ? reactionBoard : typingBoard;
  const unit     = gameTab === 'reaction' ? 'ms' : 'WPM';
  const isAsc    = gameTab === 'reaction'; // lower ms = better

  const sorted   = [...allData].sort((a, b) => isAsc ? a.score - b.score : b.score - a.score);
  const todayData = getTodayEntries(sorted);
  const data     = timeTab === 'today' ? todayData : sorted;

  // Find user's position if myScore provided
  const myRank = myScore && gameTab === myScore.game
    ? sorted.findIndex(e =>
        isAsc ? e.score >= myScore.score : e.score <= myScore.score
      ) + 1
    : null;

  const top3   = data.slice(0, 3);
  const rest   = data.slice(3, 10);

  return (
    <div>
      {/* Game tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${gameTab === 'reaction' ? styles.active : ''}`}
          onClick={() => setGameTab('reaction')}>⚡ Reaction</button>
        <button className={`${styles.tab} ${gameTab === 'typing'   ? styles.active : ''}`}
          onClick={() => setGameTab('typing')}>⌨️ Typing</button>
      </div>

      {/* Time tabs */}
      <div className={styles.timeTabs}>
        <button className={`${styles.timeTab} ${timeTab === 'alltime' ? styles.timeActive : ''}`}
          onClick={() => setTimeTab('alltime')}>All-Time</button>
        <button className={`${styles.timeTab} ${timeTab === 'today'   ? styles.timeActive : ''}`}
          onClick={() => setTimeTab('today')}>Today {todayData.length > 0 && <span className={styles.todayCount}>{todayData.length}</span>}</button>
      </div>

      {/* Personal rank banner */}
      {myRank && (
        <div className={styles.myRankBanner}>
          <span>🎯 Your global rank</span>
          <span className={styles.myRankNum}>#{myRank} of {sorted.length}</span>
        </div>
      )}

      {data.length === 0 ? (
        <div className={styles.empty}>
          {timeTab === 'today' ? 'No scores today yet — be the first!' : 'No scores yet'}
        </div>
      ) : (
        <>
          {/* Podium for top 3 */}
          {top3.length >= 2 && (
            <div className={styles.podium}>
              {top3.length >= 2 && <PodiumItem rank={2} name={top3[1]?.name} score={top3[1]?.score} unit={unit} />}
              {top3.length >= 1 && <PodiumItem rank={1} name={top3[0]?.name} score={top3[0]?.score} unit={unit} />}
              {top3.length >= 3 && <PodiumItem rank={3} name={top3[2]?.name} score={top3[2]?.score} unit={unit} />}
            </div>
          )}

          {/* Rank 4–10 list */}
          {rest.length > 0 && (
            <div className={styles.list}>
              {rest.map((entry, i) => (
                <LbItem
                  key={entry.id || i}
                  rank={i + 4}
                  name={entry.name}
                  score={entry.score}
                  unit={unit}
                  date={entry.date || new Date(entry.created_at).toLocaleDateString()}
                  isYou={myScore?.name && entry.name === myScore.name && entry.score === myScore.score}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}