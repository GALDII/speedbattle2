// ─── TypingResult.jsx ─────────────────────────────────────────
// PLACEMENT: src/pages/TypingResult.jsx  (REPLACE existing)
// Ad placement: ONE 'result' block at very bottom, AFTER all content.
// User sees score → share → leaderboard → THEN ad. Never interrupts flow.

import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import Confetti from '../components/Confetti';
import AdSlot from '../components/AdSlot';
import ScoreModal from '../components/ScoreModal';
import { getTypingRank, getTypingPercentile } from '../utils/rankingLogic';
import { downloadResultCard } from '../utils/shareHelpers';
import { drawTypingCard } from '../utils/canvasCard';
import styles from './GamePage.module.css';

export default function TypingResult({ result, onSubmit, showToast }) {
  const navigate  = useNavigate();
  const canvasRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(true);

  const wpm        = result?.wpm ?? 0;
  const acc        = result?.acc ?? 0;
  const time       = result?.time ?? '0';
  const rank       = getTypingRank(wpm);
  const percentile = getTypingPercentile(wpm);

  const handleModalSubmit = async (playerName) => {
    const pos = await onSubmit('typing', playerName, wpm, { accuracy: acc });
    showToast(pos !== -1 && pos < 10
      ? `🎉 You're #${pos + 1} on the leaderboard!`
      : '🏆 Score submitted!'
    );
    return pos;
  };

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    drawTypingCard(canvas, { wpm, acc, time, rank, percentile });
    downloadResultCard(canvas, `speedbattle-typing-${wpm}wpm.png`);
    showToast('🖼️ Card downloaded!');
  }, [wpm, acc, time, rank, percentile, showToast]);

  if (!result) { navigate('/typing'); return null; }

  return (
    <div className={styles.page}>
      <Confetti trigger={wpm >= 60} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button className={styles.back} onClick={() => navigate('/typing')}>← Play Again</button>

      {/* Score is the hero — full attention, no ads nearby */}
      <ResultCard score={wpm} unit="words per minute" rank={rank} extra={`Accuracy: ${acc}% | Time: ${time}s`} />

      {/* Quick action chips */}
      <div className={styles.chipRow}>
        <span className={styles.chip} onClick={() => setModalOpen(true)}>🔗 Share & Challenge</span>
        <span className={styles.chip} onClick={handleDownload}>⬇️ Save Card</span>
        <span className={styles.chip} onClick={() => navigate('/typing')}>⌨️ Try Again</span>
        <span className={styles.chip} onClick={() => navigate('/leaderboard')}>🏆 Scores</span>
      </div>

      {/* Ad LAST — after user has already engaged with all content */}
      <AdSlot size="result" />

      <ScoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        showToast={showToast}
        scoreData={{ type: 'typing', score: wpm, rank, acc, time, percentile }}
      />
    </div>
  );
}