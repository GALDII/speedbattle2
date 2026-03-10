import React, { useEffect } from 'react';

export default function MonetagAd() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://5gvci.com/act/files/service-worker.min.js?r=sw';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Monetag popunder runs in background
}