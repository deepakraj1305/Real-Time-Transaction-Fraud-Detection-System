import { Fragment, useEffect, useState } from 'react';
import { Eye, Trash2, Receipt, Ban, ChevronDown } from 'lucide-react';
import GridBackground from '../components/GridBackground';
import FraudIndicators from '../components/FraudIndicators';
import { loadHistory, deleteTransaction, clearHistory } from '../utils/storage';
import { detectFraudIndicators, generateRecommendation, RISK_META } from '../utils/fraudDetector';

const TYPE_LABELS = {
  online: 'Online Purchase',
  pos: 'POS Payment',
  atm: 'ATM Withdrawal',
  transfer: 'Bank Transfer',
  wire: 'Wire Transfer',
};

const RISK_BADGE = {
  low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  suspicious: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  high: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

const RISK_LABEL = { low: 'Low Risk', suspicious: 'Suspicious', high: 'High Risk' };

export default function Transactions() {
  const [history, setHistory] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleDelete = (id) => {
    setHistory(deleteTransaction(id));
    if (expanded === id) setExpanded(null);
  };

  const handleClear = () => {
    if (window.confirm('Clear all transaction history? This cannot be undone.')) {
      setHistory(clearHistory());
      setExpanded(null);
    }
  };

  return (
    <div className="relative min-h-screen px-5 py-8 sm:px-8 md:py-10">
      <GridBackground />
      <div className="mx-auto max-w-6xl animate-fade-in-up">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Transaction History</h1>
            <p className="mt-2 text-sm text-slate-400">All transactions analyzed in this session, stored locally in your browser.</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-2 self-start rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-300 transition-colors hover:bg-rose-500/20"
            >
              <Ban size={16} />
              Clear History
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
              <Receipt size={32} className="text-slate-600" />
              <p className="font-medium text-slate-300">No transactions yet</p>
              <p className="max-w-sm text-sm text-slate-500">
                Analyze a transaction to see it appear here with its risk score and detected indicators.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4 font-medium">ID</th>
                    <th className="px-5 py-4 font-medium">Amount</th>
                    <th className="px-5 py-4 font-medium">Type</th>
                    <th className="px-5 py-4 font-medium">Risk Score</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((t) => (
                    <Fragment key={t.id}>
                      <tr className="border-b border-white/5 transition-colors hover:bg-white/[0.03]">
                        <td className="px-5 py-4 font-mono text-xs text-cyan-300">{t.id}</td>
                        <td className="px-5 py-4 font-medium text-white">${parseFloat(t.amount).toLocaleString()}</td>
                        <td className="px-5 py-4 text-slate-300">{TYPE_LABELS[t.type] || t.type}</td>
                        <td className="px-5 py-4 font-semibold text-white">{t.score}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${RISK_BADGE[t.risk]}`}>
                            {RISK_LABEL[t.risk]}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                              className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10"
                            >
                              <Eye size={14} />
                              View
                              <ChevronDown size={12} className={`transition-transform ${expanded === t.id ? 'rotate-180' : ''}`} />
                            </button>
                            <button
                              onClick={() => handleDelete(t.id)}
                              className="flex items-center gap-1 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-500/20"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded === t.id && (
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <td colSpan={6} className="px-5 py-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                              <div>
                                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Detected Indicators</h4>
                                <FraudIndicators indicators={detectFraudIndicators(t)} />
                              </div>
                              <div>
                                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Security Recommendation</h4>
                                <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-300">
                                  {generateRecommendation(t.risk)}
                                </p>
                                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-400">
                                  <p><span className="text-slate-500">Location:</span> {t.location}</p>
                                  <p><span className="text-slate-500">Device:</span> {t.device}</p>
                                  <p><span className="text-slate-500">Time:</span> {t.time}</p>
                                  <p><span className="text-slate-500">Account Age:</span> {t.accountAge}d</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
