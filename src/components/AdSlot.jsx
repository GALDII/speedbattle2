import React, { useEffect, useRef } from 'react';
import styles from './AdSlot.module.css';

// ─── AD CREDENTIALS ───────────────────────────────────────────
const AD_CONFIG = {
  adsense: {
    publisherId: 'ca-pub-5890583628637719',
    slots: {
      banner: '5274180112',
      mid:    '8554949577',
      bottom: '9022183004',
    },
  },
  adsterra: {
    banner: '//pl28890016.effectivegatecpm.com/21f569c24724fe31451b5d45f16d243b/invoke.js',
    mid:    '//pl28890016.effectivegatecpm.com/21f569c24724fe31451b5d45f16d243b/invoke.js',
    bottom: '//pl28890016.effectivegatecpm.com/21f569c24724fe31451b5d45f16d243b/invoke.js',
  },
  monetag: {
    banner: '10710139',
    mid:    '10710324',
    bottom: '10710320',
  },
};
// ──────────────────────────────────────────────────────────────

const IS_PROD = process.env.REACT_APP_ENV === 'production';

// banner → AdSense   (below header, every page)
// mid    → Adsterra  (below game area, during play)
// bottom → Monetag   (bottom of result pages)
const SLOT_NETWORK = {
  banner: 'adsense',
  mid:    'adsterra',
  bottom: 'monetag',
};

// ── Register Monetag service worker once ──────────────────────
if (IS_PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((err) => console.warn('Monetag SW registration failed:', err));
  });
}

// ── AdSense Unit ──────────────────────────────────────────────
function AdSenseUnit({ slotId }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width: '100%' }}
      data-ad-client={AD_CONFIG.adsense.publisherId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

// ── Adsterra Unit ─────────────────────────────────────────────
function AdsterraUnit({ scriptSrc }) {
  const ref = useRef(null);
  const containerId = scriptSrc.split('/').slice(-2, -1)[0];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (element.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = `https:${scriptSrc}`;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    element.appendChild(script);

    return () => { if (element) element.innerHTML = ''; };
  }, [scriptSrc]);

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <div id={`container-${containerId}`} />
    </div>
  );
}

// ── Monetag Unit ──────────────────────────────────────────────
// Uses Monetag's direct tag format — get your exact script URL from
// publishers.monetag.com → Sites → your zone → Get Tag
function MonetagUnit({ zoneId }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (element.querySelector('script')) return;

    // Monetag tag script — format: //{pub-domain}/400/{zoneId}
    // Replace 'YOUR_MONETAG_CDN' with the domain from your Monetag tag
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    // ↓ Get this URL from your Monetag dashboard "Get Tag" button
    script.src = `//monetag.com/banner/${zoneId}`;
    element.appendChild(script);

    return () => { if (element) element.innerHTML = ''; };
  }, [zoneId]);

  return <div ref={ref} style={{ width: '100%', minHeight: 60 }} />;
}

// ── Placeholder (dev / unconfigured) ─────────────────────────
function Placeholder({ size }) {
  return (
    <div className={`${styles.adSlot} ${styles[size]}`}>
      Advertisement
    </div>
  );
}

// ── Main AdSlot component ─────────────────────────────────────
export default function AdSlot({ size = 'banner' }) {
  const network = SLOT_NETWORK[size];

  if (!IS_PROD) {
    return <Placeholder size={size} />;
  }

  if (network === 'adsense') {
    return (
      <div className={styles.adWrapper}>
        <AdSenseUnit slotId={AD_CONFIG.adsense.slots[size]} />
      </div>
    );
  }

  if (network === 'adsterra') {
    const src = AD_CONFIG.adsterra[size];
    if (!src.includes('effectivegatecpm')) return <Placeholder size={size} />;
    return (
      <div className={styles.adWrapper}>
        <AdsterraUnit scriptSrc={src} />
      </div>
    );
  }

  if (network === 'monetag') {
    return (
      <div className={styles.adWrapper}>
        <MonetagUnit zoneId={AD_CONFIG.monetag[size]} />
      </div>
    );
  }

  return <Placeholder size={size} />;
}