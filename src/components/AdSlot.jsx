// ─── AdSlot.jsx ───────────────────────────────────────────────
// PLACEMENT: src/components/AdSlot.jsx  (REPLACE existing)
//
// Ad strategy:
//   'banner'    → sticky bottom bar (never covers game, always visible)
//   'between'   → shown ONLY on Home, Leaderboard, Result pages (never on game pages)
//   'result'    → large block on result pages only, below the fold
//
// Game pages (ReactionPage, TypingPage) have ZERO ads inside them.
// The sticky bottom banner covers all pages passively without disrupting play.

import React, { useEffect, useRef } from 'react';
import styles from './AdSlot.module.css';

const AD_CONFIG = {
  adsense: {
    publisherId: 'ca-pub-5890583628637719',
    slots: {
      banner:  '5274180112',
      between: '8554949577',
      result:  '9022183004',
    },
  },
};

const IS_PROD = process.env.REACT_APP_ENV === 'production';

// Register Monetag service worker (popunder — background only, never visible)
if (IS_PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(err => console.warn('Monetag SW:', err));
  });
}

function AdSenseUnit({ slotId, format = 'auto' }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}

    // Hide wrapper if AdSense returns no fill (prevents empty gaps)
    const t = setTimeout(() => {
      const ins = wrapRef.current?.querySelector('ins');
      if (ins?.getAttribute('data-ad-status') === 'unfilled') {
        if (wrapRef.current) wrapRef.current.style.display = 'none';
      }
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={wrapRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={AD_CONFIG.adsense.publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

function Placeholder({ size }) {
  return (
    <div className={`${styles.placeholder} ${styles[size]}`}>
      Ad · {size}
    </div>
  );
}

export default function AdSlot({ size = 'between' }) {
  if (!IS_PROD) return <Placeholder size={size} />;
  return (
    <div className={`${styles.adWrapper} ${styles[size]}`}>
      <AdSenseUnit
        slotId={AD_CONFIG.adsense.slots[size] || AD_CONFIG.adsense.slots.between}
        format={size === 'banner' ? 'horizontal' : 'auto'}
      />
    </div>
  );
}