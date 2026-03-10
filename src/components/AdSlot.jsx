import React, { useEffect, useRef } from 'react';
import styles from './AdSlot.module.css';

// ─── YOUR AD CREDENTIALS ──────────────────────────────────────
const AD_CONFIG = {
  adsense: {
    publisherId: 'ca-pub-5890583628637719',   // ← Replace with your AdSense Publisher ID
    slots: {
      banner: '1111111111',                   // ← Replace with your AdSense slot IDs
      mid:    '2222222222',
      bottom: '3333333333',
    },
  },
  adsterra: {
    banner: '//www.highperformanceformat.com/AAAAAAAAAAAAAAAAAAAA/invoke.js', // ← Replace
    mid:    '//www.highperformanceformat.com/BBBBBBBBBBBBBBBBBBBB/invoke.js', // ← Replace
    bottom: '//www.highperformanceformat.com/CCCCCCCCCCCCCCCCCCCC/invoke.js', // ← Replace
  },
  propellerads: {
    banner: 'YOUR_ZONE_ID_1',   // ← Replace with PropellerAds zone IDs
    mid:    'YOUR_ZONE_ID_2',
    bottom: 'YOUR_ZONE_ID_3',
  },
};
// ──────────────────────────────────────────────────────────────

const IS_PROD = process.env.REACT_APP_ENV === 'production';
// ── Slot assignment: which network handles which slot ──────────
// banner → AdSense   (top of every page)
// mid    → Adsterra  (between game and results)
// bottom → PropellerAds (footer of result pages)
const SLOT_NETWORK = {
  banner: 'adsense',
  mid:    'adsterra',
  bottom: 'propellerads',
};

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

  useEffect(() => {
    if (!ref.current || !scriptSrc.includes('highperformanceformat')) return;
    // Prevent duplicate injection
    if (ref.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    ref.current.appendChild(script);

    const element = ref.current;
    return () => {
      if (element) element.innerHTML = '';
    };
  }, [scriptSrc]);

  return <div ref={ref} style={{ width: '100%', minHeight: 50 }} />;
}

// ── PropellerAds Unit ─────────────────────────────────────────
function PropellerUnit({ zoneId }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || zoneId.startsWith('YOUR_ZONE')) return;
    if (ref.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.innerHTML = `
      (function(s,u,z,p){
        s.src = u;
        s.setAttribute('data-zone', z);
        p.appendChild(s);
      })(
        document.createElement('script'),
        'https://cdn.thisiscool.online/floating.min.js',
        ${zoneId},
        document.body
      );
    `;
    ref.current.appendChild(script);

    const element = ref.current;
    return () => {
      if (element) element.innerHTML = '';
    };
  }, [zoneId]);

  return <div ref={ref} style={{ width: '100%', minHeight: 50 }} />;
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

  // Show placeholder in dev OR if credentials are not yet filled in
  if (!IS_PROD) {
    return <Placeholder size={size} />;
  }

  if (network === 'adsense') {
    const slotId = AD_CONFIG.adsense.slots[size];
    if (slotId.startsWith('1111') || slotId.startsWith('2222') || slotId.startsWith('3333')) {
      return <Placeholder size={size} />;
    }
    return (
      <div className={styles.adWrapper}>
        <AdSenseUnit slotId={slotId} />
      </div>
    );
  }

  if (network === 'adsterra') {
    const src = AD_CONFIG.adsterra[size];
    if (!src.includes('highperformanceformat')) {
      return <Placeholder size={size} />;
    }
    return (
      <div className={styles.adWrapper}>
        <AdsterraUnit scriptSrc={src} />
      </div>
    );
  }

  if (network === 'propellerads') {
    const zoneId = AD_CONFIG.propellerads[size];
    if (zoneId.startsWith('YOUR_ZONE')) {
      return <Placeholder size={size} />;
    }
    return (
      <div className={styles.adWrapper}>
        <PropellerUnit zoneId={zoneId} />
      </div>
    );
  }

  return <Placeholder size={size} />;
}