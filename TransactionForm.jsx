import { useState } from 'react';
import {
  Hash,
  DollarSign,
  CreditCard,
  MapPin,
  Clock,
  Smartphone,
  Repeat,
  UserPlus,
  ScanSearch,
  Sparkles,
} from 'lucide-react';
import { demoScenarios } from '../data/demoTransactions';

const FIELD_CLASS =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-400/20';

function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">{label}</label>
      <div className="relative">
        <Icon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        {children}
      </div>
    </div>
  );
}

const initialState = {
  id: '',
  amount: '',
  type: 'online',
  location: 'domestic',
  time: '12:00',
  device: 'mobile',
  transactionsToday: '1',
  accountAge: '365',
};

export default function TransactionForm({ onAnalyze }) {
  const [form, setForm] = useState(initialState);
  const [showDemo, setShowDemo] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(form);
  };

  const loadDemo = (scenario) => {
    setForm({
      id: '',
      ...scenario.data,
    });
    setShowDemo(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field icon={Hash} label="Transaction ID (optional)">
          <input
            className={FIELD_CLASS}
            placeholder="Auto-generated if blank"
            value={form.id}
            onChange={update('id')}
          />
        </Field>

        <Field icon={DollarSign} label="Transaction Amount ($)">
          <input
            type="number"
            min="0"
            step="0.01"
            required
            className={FIELD_CLASS}
            placeholder="e.g. 1500.00"
            value={form.amount}
            onChange={update('amount')}
          />
        </Field>

        <Field icon={CreditCard} label="Transaction Type">
          <select className={`${FIELD_CLASS} appearance-none`} value={form.type} onChange={update('type')}>
            <option value="online">Online Purchase</option>
            <option value="pos">POS Payment</option>
            <option value="atm">ATM Withdrawal</option>
            <option value="transfer">Bank Transfer</option>
            <option value="wire">Wire Transfer</option>
          </select>
        </Field>

        <Field icon={MapPin} label="Location">
          <select className={`${FIELD_CLASS} appearance-none`} value={form.location} onChange={update('location')}>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
            <option value="unknown">Unknown</option>
          </select>
        </Field>

        <Field icon={Clock} label="Transaction Time">
          <input type="time" required className={FIELD_CLASS} value={form.time} onChange={update('time')} />
        </Field>

        <Field icon={Smartphone} label="Device Type">
          <select className={`${FIELD_CLASS} appearance-none`} value={form.device} onChange={update('device')}>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
            <option value="new">New Device</option>
            <option value="unknown">Unknown Device</option>
          </select>
        </Field>

        <Field icon={Repeat} label="Transactions Today">
          <input
            type="number"
            min="0"
            required
            className={FIELD_CLASS}
            value={form.transactionsToday}
            onChange={update('transactionsToday')}
          />
        </Field>

        <Field icon={UserPlus} label="Account Age (days)">
          <input
            type="number"
            min="0"
            required
            className={FIELD_CLASS}
            value={form.accountAge}
            onChange={update('accountAge')}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_-4px_rgba(34,211,238,0.6)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        >
          <ScanSearch size={18} />
          Detect Fraud
        </button>

        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setShowDemo((s) => !s)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:bg-white/10"
          >
            <Sparkles size={17} className="text-purple-300" />
            Load Demo
          </button>
          {showDemo && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0a0f1f] shadow-2xl">
              {demoScenarios.map((s) => (
                <button
                  type="button"
                  key={s.key}
                  onClick={() => loadDemo(s)}
                  className="block w-full border-b border-white/5 px-4 py-3 text-left text-sm text-slate-200 last:border-0 hover:bg-cyan-500/10"
                >
                  <span className="block font-medium text-white">{s.label}</span>
                  <span className="block text-xs text-slate-500">{s.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
