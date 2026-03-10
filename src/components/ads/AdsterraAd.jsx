import React, { useEffect, useRef } from 'react';

export default function AdsterraAd() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || ref.current.childNodes.length > 0) return;

    const script1 = document.createElement('script');
    script1.innerHTML = `
      atOptions = {
        'key': '21f569c24724fe31451b5d45f16d243b',
        'format': 'iframe',
        'height': 60,
        'width': 468,
        'params': {}
      };
    `;

    const script2 = document.createElement('script');
    script2.src = 'https://pl28890016.effectivegatecpm.com/21f569c24724fe31451b5d45f16d243b/invoke.js';
    script2.async = true;

    ref.current.appendChild(script1);
    ref.current.appendChild(script2);
  }, []);

  return (
    <div
      ref={ref}
      style={{ display: 'flex', justifyContent: 'center', margin: '0 16px' }}
    />
  );
}