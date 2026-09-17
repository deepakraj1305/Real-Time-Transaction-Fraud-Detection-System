import { useEffect, useState, useRef } from 'react';

function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let raf;
    const step = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      startRef.current = null;
    };
  }, [target, duration]);

  return value;
}

export default function StatCard({ icon: Icon, label, value, description, accent = 'cyan' }) {
  const count = useCountUp(value);

  const accents = {
    cyan: 'from-cyan-400/20 to-cyan-500/5 text-cyan-300 ring-cyan-400/20 shadow-cyan-500/10',
    green: 'from-emerald-400/20 to-emerald-500/5 text-emerald-300 ring-emerald-400/20 shadow-emerald-500/10',
    orange: 'from-amber-400/20 to-amber-500/5 text-amber-300 ring-amber-400/20 shadow-amber-500/10',
    red: 'from-rose-400/20 to-rose-500/5 text-rose-300 ring-rose-400/20 shadow-rose-500/10',
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl">
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${accents[accent]} opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold tabular-nums text-white">{count.toLocaleString()}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accents[accent]} ring-1`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
