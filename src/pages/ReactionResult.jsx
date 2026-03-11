import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import Confetti from '../components/Confetti';
import AdSlot from '../components/AdSlot';
import ScoreModal from '../components/ScoreModal';
import { getReactionRank, getReactionPercentile } from '../utils/rankingLogic';
import { downloadResultCard } from '../utils/shareHelpers';
import { drawReactionCard } from '../utils/canvasCard';
import styles from './GamePage.module.css';

export default function ReactionResult({ score, onSubmit, showToast }) {
  const navigate   = useNavigate();
  const canvasRef  = useRef(null);
  const [modalOpen, setModalOpen] = useState(true);

  const rank       = score !== null ? getReactionRank(score) : null;
  const percentile = score !== null ? getReactionPercentile(score) : 0;

  const handleModalSubmit = async (playerName) => {
    const pos = await onSubmit('reaction', playerName, score);
    showToast(pos !== -1 && pos < 10
      ? `🎉 You're #${pos + 1} on the leaderboard!`
      : '🏆 Score submitted!'
    );
    return pos;
  };

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    drawReactionCard(canvas, { ms: score, rank, percentile });
    downloadResultCard(canvas, `speedbattle-reaction-${score}ms.png`);
    showToast('🖼️ Card downloaded!');
  }, [score, rank, percentile, showToast]);

  if (score === null) { navigate('/reaction'); return null; }

  return (
    <div className={styles.page}>
      <Confetti trigger={score < 220} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button className={styles.back} onClick={() => navigate('/reaction')}>← Play Again</button>

      <ResultCard
        score={score}
        unit="milliseconds"
        rank={rank}
        extra={`Faster than ${percentile}% of players`}
      />

      {/* Quick action chips */}
      <div className={styles.chipRow}>
        <span className={styles.chip} onClick={() => setModalOpen(true)}>🔗 Share</span>
        <span className={styles.chip} onClick={handleDownload}>⬇️ Save Card</span>
        <span className={styles.chip} onClick={() => navigate('/reaction')}>⚡ Try Again</span>
        <span className={styles.chip} onClick={() => navigate('/leaderboard')}>🏆 Scores</span>
      </div>

      <AdSlot size="bottom" />

      <ScoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        showToast={showToast}
        scoreData={{
          type: 'reaction',
          score,
          rank,
          percentile,
        }}
      />
    </div>
  );
}