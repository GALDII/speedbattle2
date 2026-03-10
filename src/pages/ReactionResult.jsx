import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import ShareBox from '../components/ShareBox';
import Confetti from '../components/Confetti';
import AdSlot from '../components/AdSlot';
import { getReactionRank, getReactionPercentile } from '../utils/rankingLogic';
import { buildReactionShareText, copyToClipboard, downloadResultCard } from '../utils/shareHelpers';
import { drawReactionCard } from '../utils/canvasCard';
import styles from './GamePage.module.css';

export default function ReactionResult({ score, onSubmit, showToast }) {
  const navigate  = useNavigate();
  const canvasRef = useRef(null);
  const nameRef   = useRef(null);

  const rank       = score !== null ? getReactionRank(score) : null;
  const percentile = score !== null ? getReactionPercentile(score) : 0;
  const shareText  = score !== null ? buildReactionShareText(score, rank) : '';

  const handleCopy = useCallback(() => {
    copyToClipboard(shareText).then(() => showToast('📋 Copied to clipboard!'));
  }, [shareText, showToast]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    drawReactionCard(canvas, { ms: score, rank, percentile });
    downloadResultCard(canvas, `speedbattle-reaction-${score}ms.png`);
    showToast('🖼️ Card downloaded!');
  }, [score, rank, percentile, showToast]);

  if (score === null) { navigate('/reaction'); return null; }

  const handleSubmit = async () => {
  const name = nameRef.current?.value.trim() || 'Anonymous';
  const pos  = await onSubmit('reaction', name, score);
  if (nameRef.current) nameRef.current.value = '';
  showToast(pos !== -1 && pos < 10
    ? `🎉 You're #${pos + 1} on the leaderboard!`
    : '🏆 Score submitted!'
  );
};

  return (
    <div className={styles.page}>
      <Confetti trigger={score < 220} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button className={styles.back} onClick={() => navigate('/reaction')}>← Play Again</button>

      <ResultCard score={score} unit="milliseconds" rank={rank} extra={`Faster than ${percentile}% of players`} />
      <ShareBox shareText={shareText} onCopy={handleCopy} onDownload={handleDownload} />

      <div className={styles.submitBox}>
        <div className={styles.label}>Save your score</div>
        <input ref={nameRef} className={styles.nameInput} placeholder="Enter your name..." maxLength={20} />
        <button className={styles.btnPrimary} onClick={handleSubmit}>🏆 Post to Leaderboard</button>
      </div>

      <div className={styles.chipRow}>
        <span className={styles.chip} onClick={() => navigate('/reaction')}>⚡ Try Again</span>
        <span className={styles.chip} onClick={() => navigate('/typing')}>⌨️ Try Typing</span>
        <span className={styles.chip} onClick={() => navigate('/leaderboard')}>🏆 Scores</span>
      </div>

      <AdSlot size="bottom" />
    </div>
  );
}