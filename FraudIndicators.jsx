import {
  DollarSign,
  Repeat,
  UserPlus,
  Clock,
  Smartphone,
  MapPin,
  ArrowLeftRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

const ICONS = {
  DollarSign,
  Repeat,
  UserPlus,
  Clock,
  Smartphone,
  MapPin,
  ArrowLeftRight,
};

const SEVERITY_STYLES = {
  high: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  low: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
};

export default function FraudIndicators({ indicators }) {
  if (!indicators || indicators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-8 text-center">
        <ShieldCheck className="text-emerald-400" size={32} />
        <p className="font-medium text-emerald-300">No fraud indicators detected</p>
        <p className="max-w-sm text-sm text-slate-400">
          This transaction did not trigger any of the configured rule-based warning signs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {indicators.map((ind) => {
        const Icon = ICONS[ind.icon] || AlertTriangle;
        return (
          <div
            key={ind.id}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-cyan-300 ring-1 ring-white/10">
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="truncate font-medium text-white">{ind.title}</h4>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${SEVERITY_STYLES[ind.severity]}`}>
                    {ind.severity}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{ind.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
