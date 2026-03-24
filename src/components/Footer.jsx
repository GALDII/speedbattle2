// ─── Footer.jsx ──────────────────────────────────────────────
// Site footer with navigation links to content pages
// Helps AdSense crawlers find all pages and shows site legitimacy

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.logo}>⚡ SpeedBattle</span>
        <p className={styles.tagline}>
          Test your reflexes and typing speed. Challenge friends and compete on the global leaderboard.
        </p>
      </div>

      <div className={styles.columns}>
        <div className={styles.column}>
          <div className={styles.colTitle}>Games</div>
          <button className={styles.link} onClick={() => navigate('/reaction')}>Reaction Speed Test</button>
          <button className={styles.link} onClick={() => navigate('/typing')}>Typing Speed Test</button>
          <button className={styles.link} onClick={() => navigate('/leaderboard')}>Leaderboard</button>
        </div>

        <div className={styles.column}>
          <div className={styles.colTitle}>Learn</div>
          <button className={styles.link} onClick={() => navigate('/blog')}>Blog</button>
          <button className={styles.link} onClick={() => navigate('/blog/improve-reaction-time')}>Improve Reaction Time</button>
          <button className={styles.link} onClick={() => navigate('/blog/typing-speed-tips')}>Typing Speed Tips</button>
        </div>

        <div className={styles.column}>
          <div className={styles.colTitle}>Company</div>
          <button className={styles.link} onClick={() => navigate('/about')}>About</button>
          <button className={styles.link} onClick={() => navigate('/contact')}>Contact</button>
          <button className={styles.link} onClick={() => navigate('/privacy')}>Privacy Policy</button>
          <button className={styles.link} onClick={() => navigate('/terms')}>Terms of Service</button>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© {new Date().getFullYear()} SpeedBattle. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <button className={styles.bottomLink} onClick={() => navigate('/privacy')}>Privacy</button>
          <span className={styles.sep}>·</span>
          <button className={styles.bottomLink} onClick={() => navigate('/terms')}>Terms</button>
          <span className={styles.sep}>·</span>
          <button className={styles.bottomLink} onClick={() => navigate('/contact')}>Contact</button>
        </div>
      </div>
    </footer>
  );
}
