import { useEffect } from 'react';

const COLORS = ['#facc15','#f97316','#22c55e','#3b82f6','#ef4444','#ffffff'];

export default function Confetti({ trigger }) {
  useEffect(() => {
    if (!trigger) return;
    for (let i = 0; i < 70; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        const size = 6 + Math.random() * 8;
        el.style.cssText = `
          position:fixed;top:-12px;
          left:${Math.random()*100}vw;
          width:${size}px;height:${size}px;
          background:${COLORS[Math.floor(Math.random()*COLORS.length)]};
          border-radius:${Math.random()>0.5?'50%':'2px'};
          animation:confettiFall ${1.4+Math.random()*1.8}s linear ${Math.random()*0.4}s forwards;
          pointer-events:none;z-index:9999;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3500);
      }, i * 25);
    }
  }, [trigger]);
  return null;
}
