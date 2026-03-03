import { useState, useCallback, useEffect } from 'react';

export interface HistoryEntry {
  id: string;
  action: string;
  delta: number;
  timestamp: number;
}

const MAX_HISTORY = 10;
const BASE_COINS = 100;
const MAX_EASY_COINS = 100; // después de aquí es más difícil ganar

function loadCoins(storageKey: string): number {
  try {
    const raw = localStorage.getItem(`${storageKey}_fruta`);
    return raw ? parseInt(raw, 10) : BASE_COINS;
  } catch { return BASE_COINS; }
}

function saveCoins(storageKey: string, amount: number) {
  localStorage.setItem(`${storageKey}_fruta`, String(amount));
}

function loadHistory(storageKey: string): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(`${storageKey}_history`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveHistory(storageKey: string, entries: HistoryEntry[]) {
  localStorage.setItem(`${storageKey}_history`, JSON.stringify(entries.slice(0, MAX_HISTORY)));
}

export function useFruta(storageKey: string, isLoggedIn: boolean) {
  const [coins, setCoins] = useState(() => loadCoins(storageKey));
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory(storageKey));
  const [floatEvents, setFloatEvents] = useState<Array<{ id: string; text: string; color: string }>>([]);

  // Reload when storage key changes (user login/logout)
  useEffect(() => {
    setCoins(loadCoins(storageKey));
    setHistory(loadHistory(storageKey));
  }, [storageKey]);

  // Persist on change
  useEffect(() => {
    saveCoins(storageKey, coins);
  }, [storageKey, coins]);

  useEffect(() => {
    saveHistory(storageKey, history);
  }, [storageKey, history]);

  const addHistory = useCallback((action: string, delta: number) => {
    const entry: HistoryEntry = { id: `h_${Date.now()}`, action, delta, timestamp: Date.now() };
    setHistory(prev => [entry, ...prev].slice(0, MAX_HISTORY));
  }, []);

  const emitFloat = useCallback((text: string, color: string) => {
    const id = `float_${Date.now()}_${Math.random()}`;
    setFloatEvents(prev => [...prev, { id, text, color }]);
    setTimeout(() => setFloatEvents(prev => prev.filter(f => f.id !== id)), 1600);
  }, []);

  // Spend coins — returns true if successful
  const spend = useCallback((amount: number, actionLabel: string): boolean => {
    if (!isLoggedIn || coins < amount) return false;
    setCoins(prev => {
      const next = Math.max(0, prev - amount);
      addHistory(actionLabel, -amount);
      emitFloat(`-${amount} 🍊`, '#ff6b6b');
      return next;
    });
    return true;
  }, [coins, isLoggedIn, addHistory, emitFloat]);

  // Earn coins from chat — diminishing returns above MAX_EASY_COINS
  const earnFromChat = useCallback(() => {
    if (!isLoggedIn) return 0;
    const base = 2 + Math.floor(Math.random() * 4); // 2-5
    let earned = base;

    if (coins >= MAX_EASY_COINS) {
      // After 100 coins: 30% chance to earn, and only 1-2 coins
      if (Math.random() > 0.3) return 0;
      earned = 1 + Math.floor(Math.random() * 2);
    }

    if (coins >= 200) {
      // After 200: only 10% chance, 1 coin
      if (Math.random() > 0.1) return 0;
      earned = 1;
    }

    if (coins >= 300) return 0; // Hard cap

    setCoins(prev => {
      const next = prev + earned;
      addHistory(`Chat +${earned} 🍊`, earned);
      emitFloat(`+${earned} 🍊`, '#a8e063');
      return next;
    });
    return earned;
  }, [coins, isLoggedIn, addHistory, emitFloat]);

  // Can user afford something?
  const canAfford = useCallback((amount: number) => isLoggedIn && coins >= amount, [coins, isLoggedIn]);

  return {
    coins,
    history,
    floatEvents,
    spend,
    earnFromChat,
    canAfford,
  };
}
