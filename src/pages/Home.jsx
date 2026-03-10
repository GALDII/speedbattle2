import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdSlot from '../components/AdSlot';
import styles from './Home.module.css';

const GAME_CARDS = [
  { icon: '⚡', title: 'Reaction Speed', desc: 'Tap the instant it turns green', badge: '~10 seconds', path: '/reaction' },
  { icon: '⌨️', title: 'Typing Speed',   desc: 'Type 10 words as fast as possible', badge: '~30 seconds', path: '/typing' },
];

export default function Home({ stats }) {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <div className={styles.statPill}><div className={styles.val}>{stats.players}</div><div className={styles.lbl}>Players</div></div>
        <div className={styles.statPill}><div className={styles.val}>{stats.bestReaction}ms</div><div className={styles.lbl}>Best Reflex</div></div>
        <div className={styles.statPill}><div className={styles.val}>{stats.bestWpm}</div><div className={styles.lbl}>Best WPM</div></div>
      </div>

      <div className={styles.sectionLabel}>Choose Your Battle</div>
      <div className={styles.gameGrid}>
        {GAME_CARDS.map(card => (
          <div key={card.path} className={styles.gameCard} onClick={() => navigate(card.path)}>
            <span className={styles.cardIcon}>{card.icon}</span>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
            <span className={styles.cardBadge}>{card.badge}</span>
          </div>
        ))}
      </div>

      <button className={styles.lbBtn} onClick={() => navigate('/leaderboard')}>
        <span>🏆 &nbsp; View Leaderboard</span>
        <span className={styles.arrow}>›</span>
      </button>

      <div className={styles.howTo}>
        <div className={styles.sectionLabel}>How it works</div>
        {['Pick a game and beat the clock','Get your score and rank','Share your result and challenge friends'].map((s, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNum}>{i + 1}</div>
            <div className={styles.stepText}>{s}</div>
          </div>
        ))}
      </div>
      <AdSlot size="bottom" />
    </div>
  );
}
