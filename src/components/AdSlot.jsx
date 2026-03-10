import React from 'react';
import styles from './AdSlot.module.css';

export default function AdSlot({ size = 'banner' }) {
  return (
    <div className={`${styles.adSlot} ${styles[size]}`}>
      Advertisement
    </div>
  );
}
