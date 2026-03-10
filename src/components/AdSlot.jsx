import React, { useEffect, useRef } from 'react';
import styles from './AdSlot.module.css';

// ─── YOUR AD CREDENTIALS ──────────────────────────────────────
const AD_CONFIG = {
  adsense: {
    publisherId: 'ca-pub-5890583628637719',   // ← Replace with your AdSense Publisher ID
    slots: {
      banner: '5274180112',                   // ← Replace with your AdSense slot IDs
      mid:    '8554949577',
      bottom: '9022183004',
    },
  },
  adsterra: {
  banner: '//pl28890016.effectivegatecpm.com/21f569c24724fe31451b5d45f16d243b/invoke.js',
  mid:    '//pl28890016.effectivegatecpm.com/21f569c24724fe31451b5d45f16d243b/invoke.js',
  bottom: '//pl28890016.effectivegatecpm.com/21f569c24724fe31451b5d45f16d243b/invoke.js',
},
  propellerads: {
    banner: '10709979',         // Monetag zone ID (via propellerads slot)
    mid:    '10709979',
    bottom: '10709979',
  },
};
// ──────────────────────────────────────────────────────────────

const IS_PROD = process.env.REACT_APP_ENV === 'production';
// ── Slot assignment: which network handles which slot ──────────
// banner → AdSense       (top of every page)
// mid    → Adsterra      (between game and results)
// bottom → PropellerAds  (footer of result pages)
// Monetag is always active in background via service worker
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
  const containerId = scriptSrc.split('/').pop().replace('/invoke.js', '');

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = `https:${scriptSrc}`;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    ref.current.appendChild(script);

    const element = ref.current;
    return () => {
      if (element) element.innerHTML = '';
    };
  }, [scriptSrc]);

  return (
    <div ref={ref} style={{ width: '100%', minHeight: 50 }}>
      <div id={`container-${containerId}`} />
    </div>
  );
}

// ── Monetag Unit ──────────────────────────────────────────────
function MonetagUnit({ zoneId }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.querySelector('script')) return;

    const element = ref.current;

    const script = document.createElement('script');
    script.src = `https://5gvci.com/act/files/service-worker.min.js?r=sw`;
    script.async = true;
    element.appendChild(script);

    const zoneScript = document.createElement('script');
    zoneScript.innerHTML = `
      (function(d,z,s){
        s.src='https://'+d+'/400/'+z;
        try{ s.src = (document.location.protocol == "https:" ? "https" : "http") + "://5gvci.com/400/" + z; }catch(e){}
        var sc = document.createElement('script');
        sc.src = s.src;
        sc.async = true;
        document.head.appendChild(sc);
      })('5gvci.com', ${zoneId}, document.createElement('script'));
    `;
    element.appendChild(zoneScript);

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
    if (!src.includes('effectivegatecpm')) {
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
    if (!zoneId || zoneId.startsWith('YOUR_ZONE')) {
      return <Placeholder size={size} />;
    }
    return (
      <div className={styles.adWrapper}>
        <MonetagUnit zoneId={zoneId} />
      </div>
    );
  }

  return <Placeholder size={size} />;
}

// ── Monetag Integration ───────────────────────────────────────
// Monetag is integrated via service worker (sw.js) for background popunder ads
// Zone ID: 10709979 | Domain: 5gvci.com