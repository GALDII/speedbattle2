// ─── AdSlot.jsx ───────────────────────────────────────────────
// Ad strategy:
//   'banner'    → sticky bottom bar (never covers game, always visible)
//   'between'   → shown ONLY on Home, Leaderboard, Result pages (never on game pages)
//   'result'    → large block on result pages only, below the fold
//
// Game pages (ReactionPage, TypingPage) have ZERO ads inside them.
// The sticky bottom banner covers all pages passively without disrupting play.
//
// Fallback: AdSense first → Adsterra if AdSense doesn't fill

import React, { useEffect, useRef, useState } from 'react';
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
  adsterra: {
    key: '21f569c24724fe31451b5d45f16d243b',
    src: 'https://pl28890016.effectivegatecpm.com/21f569c24724fe31451b5d45f16d243b/invoke.js',
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

/* ─── Adsterra fallback unit ────────────────────────────────── */
function AdsterraUnit({ size }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Different size configs for different placements
  const sizeConfig = {
    banner:  { height: 50,  width: 320 },
    between: { height: 250, width: 300 },
    result:  { height: 250, width: 300 },
  };
  const cfg = sizeConfig[size] || sizeConfig.between;

  useEffect(() => {
    if (!ref.current || loaded) return;

    const container = ref.current;
    const script1 = document.createElement('script');
    script1.innerHTML = `
      atOptions = {
        'key': '${AD_CONFIG.adsterra.key}',
        'format': 'iframe',
        'height': ${cfg.height},
        'width': ${cfg.width},
        'params': {}
      };
    `;

    const script2 = document.createElement('script');
    script2.src = AD_CONFIG.adsterra.src;
    script2.async = true;
    script2.onload = () => setLoaded(true);

    container.appendChild(script1);
    container.appendChild(script2);

    return () => {
      // Cleanup on unmount
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [loaded, cfg.height, cfg.width]);

  return (
    <div
      ref={ref}
      className={styles.adsterraWrap}
      style={{ minHeight: cfg.height }}
    />
  );
}

/* ─── AdSense unit with Adsterra fallback ───────────────────── */
function AdSenseUnit({ slotId, format = 'auto', size }) {
  const wrapRef = useRef(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not available, fall back immediately
      setShowFallback(true);
      return;
    }

    // Check if AdSense filled after a delay
    const t = setTimeout(() => {
      const ins = wrapRef.current?.querySelector('ins.adsbygoogle');
      if (ins) {
        const status = ins.getAttribute('data-ad-status');
        if (status === 'unfilled' || !status) {
          setShowFallback(true);
        }
      } else {
        setShowFallback(true);
      }
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  if (showFallback) {
    return <AdsterraUnit size={size} />;
  }

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

/* ─── Dev placeholder ───────────────────────────────────────── */
function Placeholder({ size }) {
  return (
    <div className={`${styles.placeholder} ${styles[size]}`}>
      <span className={styles.placeholderIcon}>
        {size === 'banner' ? '📢' : size === 'result' ? '🎯' : '📋'}
      </span>
      <span>Ad · {size}</span>
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────────── */
export default function AdSlot({ size = 'between' }) {
  if (!IS_PROD) return <Placeholder size={size} />;
  return (
    <div className={`${styles.adWrapper} ${styles[size]}`}>
      <AdSenseUnit
        slotId={AD_CONFIG.adsense.slots[size] || AD_CONFIG.adsense.slots.between}
        format={size === 'banner' ? 'horizontal' : 'auto'}
        size={size}
      />
    </div>
  );
}