import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import ShareBox from '../components/ShareBox';
import Confetti from '../components/Confetti';
import AdSlot from '../components/AdSlot';
import { getTypingRank, getTypingPercentile } from '../utils/rankingLogic';
import { buildTypingShareText, copyToClipboard, downloadResultCard } from '../utils/shareHelpers';
import { drawTypingCard } from '../utils/canvasCard';
import styles from './GamePage.module.css';

export default function TypingResult({ result, onSubmit, showToast }) {
  const navigate  = useNavigate();
  const canvasRef = useRef(null);
  const nameRef   = useRef(null);

  const wpm        = result?.wpm ?? 0;
  const acc        = result?.acc ?? 0;
  const time       = result?.time ?? '0';
  const rank       = getTypingRank(wpm);
  const percentile = getTypingPercentile(wpm);
  const shareText  = buildTypingShareText(wpm, acc, rank);

  const handleCopy = useCallback(() => {
    copyToClipboard(shareText).then(() => showToast('📋 Copied to clipboard!'));
  }, [shareText, showToast]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    drawTypingCard(canvas, { wpm, acc, time, rank, percentile });
    downloadResultCard(canvas, `speedbattle-typing-${wpm}wpm.png`);
    showToast('🖼️ Card downloaded!');
  }, [wpm, acc, time, rank, percentile, showToast]);

  if (!result) { navigate('/typing'); return null; }

  const handleSubmit = async () => {
  const name = nameRef.current?.value.trim() || 'Anonymous';
  // Pass accuracy as extra field
  const pos  = await onSubmit('typing', name, wpm, { accuracy: acc });
  if (nameRef.current) nameRef.current.value = '';
  showToast(pos !== -1 && pos < 10
    ? `🎉 You're #${pos + 1} on the leaderboard!`
    : '🏆 Score submitted!'
  );
};

  return (
    <div className={styles.page}>
      <Confetti trigger={wpm >= 60} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button className={styles.back} onClick={() => navigate('/typing')}>← Play Again</button>

      <ResultCard score={wpm} unit="words per minute" rank={rank} extra={`Accuracy: ${acc}% | Time: ${time}s`} />
      <ShareBox shareText={shareText} onCopy={handleCopy} onDownload={handleDownload} />

      <div className={styles.submitBox}>
        <div className={styles.label}>Save your score</div>
        <input ref={nameRef} className={styles.nameInput} placeholder="Enter your name..." maxLength={20} />
        <button className={styles.btnPrimary} onClick={handleSubmit}>🏆 Post to Leaderboard</button>
      </div>

      <div className={styles.chipRow}>
        <span className={styles.chip} onClick={() => navigate('/typing')}>⌨️ Try Again</span>
        <span className={styles.chip} onClick={() => navigate('/reaction')}>⚡ Try Reaction</span>
        <span className={styles.chip} onClick={() => navigate('/leaderboard')}>🏆 Scores</span>
      </div>

      <AdSlot size="bottom" />
    </div>
  );
}