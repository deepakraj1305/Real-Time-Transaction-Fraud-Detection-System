const KEY = 'fraudshield_history_v1';

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistory(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // storage unavailable -- fail silently, app still works in-memory
  }
}

export function addTransaction(txn) {
  const list = loadHistory();
  list.unshift(txn);
  saveHistory(list);
  return list;
}

export function deleteTransaction(id) {
  const list = loadHistory().filter((t) => t.id !== id);
  saveHistory(list);
  return list;
}

export function clearHistory() {
  saveHistory([]);
  return [];
}

export function generateTxnId() {
  return 'TXN-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}
