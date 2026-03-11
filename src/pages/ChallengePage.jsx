// ─── ChallengePage.jsx ────────────────────────────────────────
// PLACEMENT: src/pages/ChallengePage.jsx  (NEW FILE)
// The page a friend sees when they open a challenge link.

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useChallenge } from '../hooks/useChallenge';
import styles from './ChallengePage.module.css';

export default function ChallengePage() {
  const { id }          = useParams();
  const [params]        = useSearchParams();
  const navigate        = useNavigate();
  const { fetchChallenge } = useChallenge();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchChallenge(id);
      if (data) {
        setChallenge(data);
      } else {
        // Fallback: read from URL params (no-DB mode)
        const n = params.get('n');
        const g = params.get('g');
        const s = params.get('s');
        const r = params.get('r');
        if (n && g && s) {
          setChallenge({ challenger_name: n, game_type: g, score: Number(s), rank_label: r });
        }
      }
      setLoading(false);
    }
    load();
  }, [id, params, fetchChallenge]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading challenge...</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <div className={styles.nfEmoji}>🤔</div>
          <div className={styles.nfTitle}>Challenge not found</div>
          <button className={styles.btn} onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  const { challenger_name, game_type, score, rank_label, rank_emoji } = challenge;
  const isReaction = game_type === 'reaction';
  const unit = isReaction ? 'ms' : 'WPM';
  const gamePath = isReaction ? '/reaction' : '/typing';

  return (
    <div className={styles.page}>
      {/* Challenge banner */}
      <div className={styles.banner}>
        <div className={styles.bannerEmoji}>{rank_emoji || '⚡'}</div>
        <div className={styles.bannerName}>{challenger_name}</div>
        <div className={styles.bannerCta}>challenged you!</div>
        <div className={styles.bannerScore}>
          <span className={styles.scoreNum}>{score}</span>
          <span className={styles.scoreUnit}>{unit}</span>
        </div>
        {rank_label && (
          <div className={styles.rankBadge}>{rank_emoji} {rank_label}</div>
        )}
        <div className={styles.bannerSub}>
          {isReaction
            ? `Can you react faster than ${score}ms?`
            : `Can you type faster than ${score} WPM?`}
        </div>
      </div>

      {/* CTA */}
      <button className={styles.btn} onClick={() => navigate(gamePath)}>
        ⚔️ Accept Challenge
      </button>
      <button className={styles.btnSecondary} onClick={() => navigate('/')}>
        Browse Games
      </button>
    </div>
  );
}