// Simple rule-based fraud detection engine.
// All logic runs entirely in the browser -- no backend required.

function getHour(timeStr) {
  if (!timeStr) return null;
  const parts = String(timeStr).split(':');
  const h = parseInt(parts[0], 10);
  return Number.isNaN(h) ? null : h;
}

function num(v) {
  const n = parseFloat(v);
  return Number.isNaN(n) ? 0 : n;
}

/**
 * calculateRiskScore
 * Produces a 0-100 fraud risk score from weighted rule contributions.
 */
export function calculateRiskScore(transaction) {
  let score = 0;
  const amount = num(transaction.amount);
  const transactionsToday = num(transaction.transactionsToday);
  const accountAge = num(transaction.accountAge);
  const hour = getHour(transaction.time);

  // Transaction amount
  if (amount > 20000) score += 35;
  else if (amount > 10000) score += 25;
  else if (amount > 5000) score += 12;
  else if (amount > 2000) score += 4;

  // Transaction frequency
  if (transactionsToday > 10) score += 30;
  else if (transactionsToday > 5) score += 18;
  else if (transactionsToday > 3) score += 8;

  // Account age (days)
  if (accountAge < 7) score += 25;
  else if (accountAge < 30) score += 14;
  else if (accountAge < 90) score += 5;

  // Unusual transaction time (12 AM - 5 AM)
  if (hour !== null && hour >= 0 && hour < 5) score += 12;

  // Device risk
  if (transaction.device === 'unknown') score += 20;
  else if (transaction.device === 'new') score += 12;

  // Location risk
  if (transaction.location === 'unknown') score += 12;
  else if (transaction.location === 'international') score += 6;

  // Transaction type risk
  if (transaction.type === 'wire') score += 6;

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * detectFraudIndicators
 * Returns an array of human-readable indicator objects describing
 * which rules were triggered by the supplied transaction.
 */
export function detectFraudIndicators(transaction) {
  const indicators = [];
  const amount = num(transaction.amount);
  const transactionsToday = num(transaction.transactionsToday);
  const accountAge = num(transaction.accountAge);
  const hour = getHour(transaction.time);

  if (amount > 5000) {
    indicators.push({
      id: 'high-amount',
      icon: 'DollarSign',
      title: 'High Transaction Amount',
      description: 'Transaction amount is significantly higher than the normal threshold.',
      severity: amount > 20000 ? 'high' : amount > 10000 ? 'medium' : 'low',
    });
  }

  if (transactionsToday > 3) {
    indicators.push({
      id: 'multiple-transactions',
      icon: 'Repeat',
      title: 'Multiple Transactions',
      description: 'Several transactions were detected within a short period.',
      severity: transactionsToday > 10 ? 'high' : transactionsToday > 5 ? 'medium' : 'low',
    });
  }

  if (accountAge < 90) {
    indicators.push({
      id: 'new-account',
      icon: 'UserPlus',
      title: 'New Account',
      description: 'The account age is below the configured threshold.',
      severity: accountAge < 7 ? 'high' : accountAge < 30 ? 'medium' : 'low',
    });
  }

  if (hour !== null && hour >= 0 && hour < 5) {
    indicators.push({
      id: 'unusual-time',
      icon: 'Clock',
      title: 'Unusual Transaction Time',
      description: 'Transaction occurred during an unusual time window (12 AM - 5 AM).',
      severity: 'medium',
    });
  }

  if (transaction.device === 'unknown' || transaction.device === 'new') {
    indicators.push({
      id: 'device-change',
      icon: 'Smartphone',
      title: 'Unrecognized Device',
      description: 'Transaction was made from an unknown or newly registered device.',
      severity: transaction.device === 'unknown' ? 'high' : 'medium',
    });
  }

  if (transaction.location === 'international' || transaction.location === 'unknown') {
    indicators.push({
      id: 'unusual-location',
      icon: 'MapPin',
      title: 'Unusual Location',
      description: "Transaction location differs from the account's typical activity region.",
      severity: transaction.location === 'unknown' ? 'medium' : 'low',
    });
  }

  if (transaction.type === 'wire' && amount > 10000) {
    indicators.push({
      id: 'wire-risk',
      icon: 'ArrowLeftRight',
      title: 'High-Value Wire Transfer',
      description: 'Wire transfers of large amounts carry a higher irreversible-loss risk.',
      severity: 'medium',
    });
  }

  return indicators;
}

/**
 * classifyRisk
 * Maps a numeric score to one of three risk tiers.
 */
export function classifyRisk(score) {
  if (score >= 65) return 'high';
  if (score >= 30) return 'suspicious';
  return 'low';
}

export const RISK_META = {
  low: {
    label: 'LOW RISK',
    statusMessage: 'No significant risk factors identified.',
    color: '#22c55e',
  },
  suspicious: {
    label: 'SUSPICIOUS',
    statusMessage: 'Unusual patterns detected. Manual review advised.',
    color: '#f59e0b',
  },
  high: {
    label: 'HIGH RISK',
    statusMessage: 'Multiple suspicious indicators detected.',
    color: '#f43f5e',
  },
};

/**
 * generateRecommendation
 * Produces a human-readable security recommendation for the analyst.
 */
export function generateRecommendation(risk) {
  if (risk === 'high') {
    return 'This transaction shows multiple high-risk indicators. Immediately verify the account holder\'s identity, contact the customer to confirm the transaction, and consider temporarily restricting account activity.';
  }
  if (risk === 'suspicious') {
    return 'Review this transaction and verify the account activity before proceeding.';
  }
  return 'No major suspicious indicators detected from the provided transaction information.';
}
