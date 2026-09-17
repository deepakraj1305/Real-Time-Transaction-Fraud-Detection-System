import { DollarSign, Repeat, Clock, Smartphone, UserPlus, ShieldQuestion } from 'lucide-react';
import GridBackground from '../components/GridBackground';

const INSIGHTS = [
  {
    icon: DollarSign,
    title: 'Unusual Amount',
    description:
      'Transactions that are significantly larger than a customer\'s typical spending pattern are a strong signal of potential account takeover or card fraud.',
    tip: 'Threshold used: amounts above $5,000 raise risk; above $20,000 raise it sharply.',
  },
  {
    icon: Repeat,
    title: 'Repeated Transactions',
    description:
      'A burst of multiple transactions in a short window can indicate automated fraud attempts, card testing, or a compromised account.',
    tip: 'Threshold used: more than 3 transactions in a day raises risk; more than 10 is severe.',
  },
  {
    icon: Clock,
    title: 'Unusual Time',
    description:
      'Legitimate activity tends to follow predictable daily patterns. Transactions initiated between midnight and 5 AM deserve closer scrutiny.',
    tip: 'Threshold used: transactions between 12 AM and 5 AM add to the risk score.',
  },
  {
    icon: Smartphone,
    title: 'Unknown Device',
    description:
      'When a transaction originates from a device that has never been associated with the account, it may indicate credential theft or session hijacking.',
    tip: 'Threshold used: unknown or newly registered devices increase risk significantly.',
  },
  {
    icon: UserPlus,
    title: 'New Account',
    description:
      'Fraudsters often create new accounts to exploit onboarding bonuses or bypass established trust signals before performing fraudulent transfers.',
    tip: 'Threshold used: accounts younger than 30 days raise risk; younger than 7 days is severe.',
  },
];

export default function SecurityInsights() {
  return (
    <div className="relative min-h-screen px-5 py-8 sm:px-8 md:py-10">
      <GridBackground />
      <div className="mx-auto max-w-6xl animate-fade-in-up">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Common Fraud Indicators</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            The rule-based engine used in this project evaluates the following signals to estimate a fraud risk score.
            These are simplified heuristics inspired by real-world fraud detection systems, designed for educational demonstration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((item, i) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                <item.icon size={22} />
              </div>
              <h3 className="relative mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              <p className="relative mt-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs text-cyan-300/80">
                {item.tip}
              </p>
            </div>
          ))}

          <div className="flex flex-col justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
            <ShieldQuestion size={28} className="mx-auto text-purple-300" />
            <p className="font-medium text-white">Want to see it in action?</p>
            <p className="text-sm text-slate-400">Head to the Analyzer and load a demo scenario to see these rules applied live.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
