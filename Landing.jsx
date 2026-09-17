import { Link } from 'react-router-dom';
import { ScanSearch, LayoutDashboard, ShieldCheck, Lock, Fingerprint, Radar, Activity, ShieldHalf } from 'lucide-react';
import GridBackground from '../components/GridBackground';

function OrbitIcon({ icon: Icon, className, delay = '0s' }) {
  return (
    <div
      className={`absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/5 text-cyan-300 shadow-[0_0_25px_-6px_rgba(34,211,238,0.6)] backdrop-blur-md animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      <Icon size={20} />
    </div>
  );
}

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GridBackground />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium text-emerald-300 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Security System Online
        </div>

        <h1
          className="animate-fade-in-up font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{ animationDelay: '0.08s' }}
        >
          Fraud Detection
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            &amp; Security
          </span>
        </h1>

        <p
          className="mt-6 max-w-xl animate-fade-in-up text-balance text-lg text-slate-400"
          style={{ animationDelay: '0.16s' }}
        >
          Detect suspicious transactions. Understand risk. Protect digital activity.
        </p>

        <div className="mt-10 flex animate-fade-in-up flex-col gap-4 sm:flex-row" style={{ animationDelay: '0.24s' }}>
          <Link
            to="/analyzer"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_35px_-6px_rgba(34,211,238,0.7)] transition-transform duration-200 hover:scale-105"
          >
            <ScanSearch size={18} />
            Analyze Transaction
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-md transition-colors duration-200 hover:bg-white/10"
          >
            <LayoutDashboard size={18} />
            View Dashboard
          </Link>
        </div>

        <div className="relative mx-auto mt-24 h-72 w-72 animate-fade-in-up sm:h-80 sm:w-80" style={{ animationDelay: '0.32s' }}>
          <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
          <div className="absolute inset-8 rounded-full border border-blue-400/15" />
          <div className="absolute inset-16 rounded-full border border-purple-400/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/10 ring-1 ring-cyan-400/30">
              <div className="absolute inset-0 animate-pulse-slow rounded-full bg-cyan-400/10 blur-xl" />
              <ShieldHalf size={44} className="relative text-cyan-300" strokeWidth={1.5} />
            </div>
          </div>
          <OrbitIcon icon={Lock} className="left-1 top-6" delay="0s" />
          <OrbitIcon icon={Fingerprint} className="right-1 top-10" delay="0.6s" />
          <OrbitIcon icon={Radar} className="bottom-4 left-4" delay="1.2s" />
          <OrbitIcon icon={Activity} className="bottom-8 right-0" delay="1.8s" />
        </div>
      </div>

      <footer className="relative border-t border-white/10 bg-bg/60 px-6 py-6 text-center text-xs text-slate-500 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-cyan-400" /> FraudShield &mdash; Educational Demo
          </span>
          <span>This project is an educational fraud-detection demonstration. It does not represent a production banking or financial security system.</span>
        </div>
      </footer>
    </div>
  );
}
