import React, { useState } from 'react';
import styles from './Leaderboard.module.css';

const RANK_COLORS = ['gold', 'silver', 'bronze'];

function LbItem({ rank, name, score, unit, date, isNew }) {
  return (
    <div className={`${styles.item} ${isNew ? styles.highlight : ''}`}>
      <div className={`${styles.rank} ${styles[RANK_COLORS[rank - 1] || 'normal']}`}>{rank}</div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.score}>{score} <span className={styles.unit}>{unit}</span></div>
    </div>
  );
}

export default function Leaderboard({ reactionBoard, typingBoard }) {
  const [tab, setTab] = useState('reaction');
  const data = tab === 'reaction' ? reactionBoard : typingBoard;
  const unit = tab === 'reaction' ? 'ms' : 'WPM';
  const sorted = [...data].sort((a, b) => tab === 'reaction' ? a.score - b.score : b.score - a.score);

  return (
    <div>
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'reaction' ? styles.active : ''}`} onClick={() => setTab('reaction')}>⚡ Reaction</button>
        <button className={`${styles.tab} ${tab === 'typing' ? styles.active : ''}`} onClick={() => setTab('typing')}>⌨️ Typing</button>
      </div>
      <div className={styles.list}>
        {sorted.slice(0, 10).map((entry, i) => (
          <LbItem key={entry.id} rank={i + 1} name={entry.name} score={entry.score} unit={unit} date={entry.date} isNew={entry.isNew} />
        ))}
      </div>
    </div>
  );
}
