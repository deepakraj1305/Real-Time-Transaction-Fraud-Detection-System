import { useState } from 'react';
import { ScanSearch, ShieldAlert, Info } from 'lucide-react';
import TransactionForm from '../components/TransactionForm';
import RiskScore from '../components/RiskScore';
import FraudIndicators from '../components/FraudIndicators';
import GridBackground from '../components/GridBackground';
import {
  calculateRiskScore,
  detectFraudIndicators,
  classifyRisk,
  generateRecommendation,
  RISK_META,
} from '../utils/fraudDetector';
import { addTransaction, generateTxnId } from '../utils/storage';

const RISK_BADGE = {
  low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  suspicious: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  high: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
};

export default function Analyzer() {
  const [result, setResult] = useState(null);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleAnalyze = (form) => {
    const score = calculateRiskScore(form);
    const risk = classifyRisk(score);
    const indicators = detectFraudIndicators(form);
    const recommendation = generateRecommendation(risk);
    const id = form.id?.trim() || generateTxnId();

    const record = {
      ...form,
      id,
      score,
      risk,
      timestamp: new Date().toISOString(),
    };

    addTransaction(record);
    setResult({ form: record, score, risk, indicators, recommendation });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="relative min-h-screen px-5 py-8 sm:px-8 md:py-10">
      <GridBackground />
      <div className="mx-auto max-w-5xl animate-fade-in-up">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Analyze Transaction</h1>
          <p className="mt-2 text-sm text-slate-400">Enter transaction details below to run the rule-based fraud detection engine.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-white">
            <ScanSearch size={20} className="text-cyan-300" />
            <h2 className="font-display text-xl font-semibold">Analyze Transaction</h2>
          </div>
          <TransactionForm onAnalyze={handleAnalyze} />
        </div>

        {savedMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm text-cyan-200 animate-fade-in-up">
            <Info size={16} />
            Transaction saved to history.
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl lg:col-span-2">
                <RiskScore score={result.score} risk={result.risk} />
                <span
                  className={`rounded-full border px-4 py-1.5 font-display text-sm font-bold tracking-wide ${RISK_BADGE[result.risk]}`}
                >
                  {RISK_META[result.risk].label}
                </span>
                <p className="text-center text-sm text-slate-400">{RISK_META[result.risk].statusMessage}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:col-span-3">
                <div className="mb-4 flex items-center gap-2 text-white">
                  <ShieldAlert size={18} className="text-cyan-300" />
                  <h3 className="font-display text-lg font-semibold">Detected Indicators</h3>
                </div>
                <FraudIndicators indicators={result.indicators} />
              </div>
            </div>

            <div
              className={`rounded-2xl border p-6 backdrop-blur-xl sm:p-8 ${
                result.risk === 'high'
                  ? 'border-rose-500/30 bg-rose-500/[0.06]'
                  : result.risk === 'suspicious'
                  ? 'border-amber-500/30 bg-amber-500/[0.06]'
                  : 'border-emerald-500/30 bg-emerald-500/[0.06]'
              }`}
            >
              <h3 className="font-display text-lg font-semibold text-white">Security Recommendation</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-300">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
