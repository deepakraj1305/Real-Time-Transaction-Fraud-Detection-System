import { useEffect, useState } from 'react';
import { RISK_META } from '../utils/fraudDetector';

export default function RiskScore({ score, risk }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [dash, setDash] = useState(0);

  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const meta = RISK_META[risk] || RISK_META.low;

  useEffect(() => {
    setAnimatedScore(0);
    setDash(0);
    const t = setTimeout(() => {
      setDash((score / 100) * circumference);
    }, 80);

    let raf;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [score, circumference]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative h-48 w-48">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={meta.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              filter: `drop-shadow(0 0 10px ${meta.color}aa)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-bold tabular-nums text-white">{animatedScore}</span>
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">/ 100</span>
        </div>
      </div>
      <p className="text-sm text-slate-400">Fraud Risk Score: <span className="font-semibold text-white">{score} / 100</span></p>
    </div>
  );
}
