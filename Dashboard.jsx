import { useEffect, useState } from 'react';
import { ListChecks, ShieldCheck, ShieldAlert, ShieldX, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import StatCard from '../components/StatCard';
import { DonutChart, ActivityChart } from '../components/RiskChart';
import GridBackground from '../components/GridBackground';
import { loadHistory } from '../utils/storage';

const WEEK_SEED = [
  { day: 'Mon', low: 120, suspicious: 34, high: 8 },
  { day: 'Tue', low: 132, suspicious: 41, high: 10 },
  { day: 'Wed', low: 145, suspicious: 38, high: 12 },
  { day: 'Thu', low: 128, suspicious: 45, high: 15 },
  { day: 'Fri', low: 160, suspicious: 52, high: 18 },
  { day: 'Sat', low: 110, suspicious: 30, high: 9 },
  { day: 'Sun', low: 97, suspicious: 34, high: 10 },
];

const BASE = { total: 1248, low: 892, suspicious: 274, high: 82 };

export default function Dashboard() {
  const [stats, setStats] = useState(BASE);

  useEffect(() => {
    const history = loadHistory();
    setStats({
      total: BASE.total + history.length,
      low: BASE.low + history.filter((t) => t.risk === 'low').length,
      suspicious: BASE.suspicious + history.filter((t) => t.risk === 'suspicious').length,
      high: BASE.high + history.filter((t) => t.risk === 'high').length,
    });
  }, []);

  const donutData = [
    { name: 'Low Risk', value: stats.low, color: '#22c55e' },
    { name: 'Suspicious', value: stats.suspicious, color: '#f59e0b' },
    { name: 'High Risk', value: stats.high, color: '#f43f5e' },
  ];

  return (
    <div className="relative min-h-screen px-5 py-8 sm:px-8 md:py-10">
      <GridBackground />
      <div className="mx-auto max-w-6xl animate-fade-in-up">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Security Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">Real-time overview of transaction risk across your monitored accounts.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={ListChecks} label="Total Transactions" value={stats.total} description="Analyzed to date" accent="cyan" />
          <StatCard icon={ShieldCheck} label="Low Risk" value={stats.low} description="Cleared as safe" accent="green" />
          <StatCard icon={ShieldAlert} label="Suspicious" value={stats.suspicious} description="Flagged for review" accent="orange" />
          <StatCard icon={ShieldX} label="High Risk" value={stats.high} description="Likely fraudulent" accent="red" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:col-span-2">
            <div className="mb-2 flex items-center gap-2 text-white">
              <PieIcon size={18} className="text-cyan-300" />
              <h2 className="font-display text-lg font-semibold">Transaction Risk Distribution</h2>
            </div>
            <p className="mb-2 text-xs text-slate-500">Breakdown of all analyzed transactions by risk tier.</p>
            <DonutChart data={donutData} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:col-span-3">
            <div className="mb-2 flex items-center gap-2 text-white">
              <BarChart3 size={18} className="text-cyan-300" />
              <h2 className="font-display text-lg font-semibold">Risk Activity</h2>
            </div>
            <p className="mb-2 text-xs text-slate-500">Weekly transaction volume segmented by risk classification.</p>
            <ActivityChart data={WEEK_SEED} />
          </div>
        </div>
      </div>
    </div>
  );
}
