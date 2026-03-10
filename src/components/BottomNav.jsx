import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  { icon: '🏠', label: 'Home',     path: '/' },
  { icon: '⚡', label: 'Reaction', path: '/reaction' },
  { icon: '⌨️', label: 'Typing',   path: '/typing' },
  { icon: '🏆', label: 'Scores',   path: '/leaderboard' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(item => (
        <button
          key={item.path}
          className={`${styles.item} ${isActive(item.path) ? styles.active : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
