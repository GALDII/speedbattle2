import React, { useEffect } from 'react';

export default function AdSlot({ size = 'banner', adSlotId }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div style={{ margin: '0 16px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5890583628637719"
        data-ad-slot={adSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}