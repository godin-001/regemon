// ════════════════════════════════════════════════════════════
// useHub.ts — Todas las llamadas al HUB central
// ════════════════════════════════════════════════════════════
const HUB = 'https://regenmon-final.vercel.app/api';

async function fetchHub<T>(
  path: string,
  options?: RequestInit,
  retries = 1,
): Promise<T> {
  try {
    const res = await fetch(`${HUB}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as T;
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 2000));
      return fetchHub<T>(path, options, retries - 1);
    }
    throw err;
  }
}

// ── Text normalizer (HUB API no soporta acentos) ──────────
export function deaccent(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ── Sprite helper ──────────────────────────────────────────
export function getSpriteUrl(emoji: string): string {
  try {
    const codePoints = [...emoji]
      .map(c => c.codePointAt(0)!.toString(16))
      .join('-');
    return `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/${codePoints}.png`;
  } catch {
    return '';
  }
}

// ── LocalStorage keys ──────────────────────────────────────
export const LS = {
  hubId:         'hubRegenmonId',
  registered:    'isRegisteredInHub',
  balance:       'hubBalance',
};

export function getHubId(): string | null   { return localStorage.getItem(LS.hubId); }
export function isRegistered(): boolean      { return localStorage.getItem(LS.registered) === 'true' && !!getHubId(); }
export function getHubBalance(): number      { return parseInt(localStorage.getItem(LS.balance) ?? '0'); }

function saveRegistration(id: string, balance = 0) {
  localStorage.setItem(LS.hubId, id);
  localStorage.setItem(LS.registered, 'true');
  localStorage.setItem(LS.balance, String(balance));
}

// ── Types ──────────────────────────────────────────────────
export interface HubProfile {
  id: string;
  name: string;
  ownerName: string;
  sprite: string;
  appUrl: string;
  stage: string;
  stats: { happiness: number; energy: number; hunger: number };
  totalPoints: number;
  balance: number;
  totalVisits: number;
  registeredAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  ownerName: string;
  sprite: string;
  stage: string;
  totalPoints: number;
  balance: number;
}

export interface ActivityEntry {
  type: 'feed_received' | 'gift_received' | 'message_received';
  description: string;
  amount?: number;
  createdAt: string;
}

export interface HubMessage {
  id: string;
  fromName: string;
  message: string;
  createdAt: string;
}

// ── API calls ──────────────────────────────────────────────
export async function registerHub(body: {
  name: string;
  ownerName: string;
  ownerEmail?: string;
  appUrl: string;
  sprite: string;
}): Promise<HubProfile> {
  // Normalize text fields — HUB API returns 500 for accented characters
  const safeBody = {
    ...body,
    name: deaccent(body.name),
    ownerName: deaccent(body.ownerName),
  };
  const res = await fetchHub<{ success: boolean; data: HubProfile & { alreadyRegistered?: boolean } }>(
    '/register',
    { method: 'POST', body: JSON.stringify(safeBody) },
  );
  if (!res.success) throw new Error('Register failed');
  saveRegistration(res.data.id, res.data.balance ?? 0);
  return res.data;
}

export async function syncHub(body: {
  regenmonId: string;
  stats: { happiness: number; energy: number; hunger: number };
  totalPoints: number;
  trainingHistory?: unknown[];
}): Promise<{ balance: number; tokensEarned: number; totalPoints: number }> {
  const res = await fetchHub<{ data: { balance: number; tokensEarned: number; totalPoints: number } }>(
    '/sync',
    { method: 'POST', body: JSON.stringify(body) },
  );
  if (res.data.balance != null) {
    localStorage.setItem(LS.balance, String(res.data.balance));
  }
  return res.data;
}

export async function getLeaderboard(page = 1, limit = 10) {
  return fetchHub<{
    data: LeaderboardEntry[];
    pagination: { page: number; totalPages: number; total: number };
  }>(`/leaderboard?page=${page}&limit=${limit}`);
}

export async function getRegenmonProfile(id: string) {
  return fetchHub<{ data: HubProfile }>(`/regenmon/${id}`);
}

export async function feedRegenmon(targetId: string, fromId: string) {
  return fetchHub<{ data: { senderBalance: number; targetName: string; cost: number } }>(
    `/regenmon/${targetId}/feed`,
    { method: 'POST', body: JSON.stringify({ fromRegenmonId: fromId }) },
  );
}

export async function giftRegenmon(targetId: string, fromId: string, amount: number) {
  return fetchHub<{ data: { senderBalance: number; targetName: string; amount: number } }>(
    `/regenmon/${targetId}/gift`,
    { method: 'POST', body: JSON.stringify({ fromRegenmonId: fromId, amount }) },
  );
}

export async function getMessages(targetId: string) {
  return fetchHub<{ data: { messages: HubMessage[] } }>(
    `/regenmon/${targetId}/messages?limit=20`,
  );
}

export async function sendMessage(targetId: string, fromId: string, fromName: string, message: string) {
  return fetchHub<{ data: HubMessage }>(
    `/regenmon/${targetId}/messages`,
    { method: 'POST', body: JSON.stringify({ fromRegenmonId: fromId, fromName: deaccent(fromName), message }) },
  );
}

export async function getActivity(hubId: string) {
  return fetchHub<{ data: { activity: ActivityEntry[] } }>(
    `/regenmon/${hubId}/activity?limit=10`,
  );
}
