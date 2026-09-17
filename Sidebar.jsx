import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanSearch,
  Receipt,
  ShieldAlert,
  Menu,
  X,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyzer', label: 'Analyze Transaction', icon: ScanSearch },
  { to: '/transactions', label: 'Transactions', icon: Receipt },
  { to: '/insights', label: 'Security Insights', icon: ShieldAlert },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] ring-1 ring-cyan-400/30'
        : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
    }`;

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-bg/80 px-4 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 font-display text-sm font-bold text-black shadow-[0_0_16px_rgba(34,211,238,0.6)]">
            FS
          </div>
          <span className="font-display text-lg font-semibold tracking-wide text-white">FraudShield</span>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex h-full w-72 flex-col border-r border-white/10 bg-[#070b16]/95 px-5 pb-6 pt-6 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 hidden items-center gap-3 px-2 md:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 font-display text-base font-bold text-black shadow-[0_0_20px_rgba(34,211,238,0.6)]">
            FS
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-tight tracking-wide text-white">FraudShield</p>
            <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500">Fraud Detection</p>
          </div>
        </div>

        <div className="mt-16 md:mt-0" />

        <nav className="flex flex-1 flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses} onClick={() => setOpen(false)}>
              <item.icon size={19} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
        >
          <LogOut size={18} />
          Exit to Home
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
            <ShieldCheck size={14} />
            System Status: Online
          </div>
        </div>
      </aside>
    </>
  );
}
