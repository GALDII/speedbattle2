import React from 'react';
import styles from './ShareBox.module.css';

export default function ShareBox({ shareText, onCopy, onDownload }) {
  return (
    <div className={styles.box}>
      <div className={styles.label}>Challenge Friends</div>
      <pre className={styles.text}>{shareText}</pre>
      <button className={styles.btnPrimary} onClick={onCopy}>📋 Copy Challenge Text</button>
      <button className={styles.btnSecondary} onClick={onDownload}>⬇️ Download Result Card</button>
    </div>
  );
}
