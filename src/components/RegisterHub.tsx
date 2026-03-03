// ════════════════════════════════════════════════════════════
// RegisterHub.tsx — Registro en el HUB + Panel social
// ════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  registerHub, getSpriteUrl, getActivity,
  isRegistered as checkRegistered, getHubId, getHubBalance,
  LS,
} from '../hooks/useHub';
import type { GameState } from '../types';
import type { ActivityEntry } from '../hooks/useHub';

interface Props {
  gameState: GameState;
  ownerName: string | null;
  ownerEmail?: string | null;
  totalPoints: number;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'ahora';
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h}h`;
  return `hace ${Math.floor(h / 24)}d`;
}

function activityIcon(type: ActivityEntry['type']): string {
  if (type === 'feed_received')    return '🍎';
  if (type === 'gift_received')    return '🎁';
  if (type === 'message_received') return '📨';
  return '⭐';
}

// ── Post-registro: Panel social ────────────────────────────
function SocialPanel({ gameState, ownerName }: { gameState: GameState; ownerName: string }) {
  const navigate = useNavigate();
  const hubId    = getHubId() ?? '';
  const name     = gameState.monster?.name ?? 'Regemon';
  const emoji    = gameState.monster?.emoji ?? '🎮';
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await getActivity(hubId);
        setActivity(res.data.activity ?? []);
      } catch {
        // hub resting
      } finally {
        setLoadingActivity(false);
      }
    })();
  }, [hubId]);

  // Balance puede actualizarse en otra tab
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  const currentBalance = getHubBalance();

  return (
    <div className="nes-container hub-panel">
      {/* Badge HUB MEMBER */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={getSpriteUrl(emoji)}
          alt={name}
          style={{ width: 72, height: 72, imageRendering: 'pixelated', margin: '0 auto 0.5rem' }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div>
          <span className="nes-badge" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
            <span className="is-success" style={{ fontSize: '0.55rem' }}>✅ HUB MEMBER</span>
          </span>
        </div>
        <p style={{ fontSize: '0.7rem', color: '#ffd700', margin: '0.25rem 0' }}>
          {name} · {ownerName}
        </p>
        <p style={{ fontSize: '0.65rem', color: '#aaa', margin: 0 }}>
          💰 {currentBalance} $FRUTA en HUB
        </p>
      </div>

      {/* Botones de navegación */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          className="nes-btn is-warning"
          style={{ fontSize: '0.55rem' }}
          onClick={() => navigate('/leaderboard')}
        >
          🏆 Leaderboard
        </button>
        <button
          className="nes-btn is-primary"
          style={{ fontSize: '0.55rem' }}
          onClick={() => navigate(`/regenmon/${hubId}`)}
        >
          👤 Mi Perfil
        </button>
      </div>

      {/* Actividad reciente */}
      <div style={{ borderTop: '2px solid #333', paddingTop: '0.75rem' }}>
        <p style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '0.5rem' }}>
          📋 ACTIVIDAD RECIENTE
        </p>
        {loadingActivity ? (
          <p style={{ fontSize: '0.6rem', color: '#666' }}>Cargando...</p>
        ) : activity.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <p style={{ fontSize: '0.6rem', color: '#666', lineHeight: 1.8 }}>
              Aún no hay actividad.<br />¡Comparte tu perfil! 🌟
            </p>
            <button
              className="nes-btn"
              style={{ fontSize: '0.5rem', marginTop: '0.5rem' }}
              onClick={() => {
                const url = `${window.location.origin}${window.location.pathname}#/regenmon/${hubId}`;
                navigator.clipboard?.writeText(url);
              }}
            >
              📋 Copiar link
            </button>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {activity.map((a, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                padding: '0.4rem 0', borderBottom: '1px solid #222',
                fontSize: '0.6rem',
              }}>
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{activityIcon(a.type)}</span>
                <span style={{ flex: 1, color: '#ddd', lineHeight: 1.6 }}>{a.description}</span>
                <span style={{ color: '#666', whiteSpace: 'nowrap' }}>{timeAgo(a.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Formulario de registro ─────────────────────────────────
export function RegisterHub({ gameState, ownerName, ownerEmail, totalPoints }: Props) {
  const [registered, setRegistered] = useState(checkRegistered);
  const [email, setEmail]           = useState(ownerEmail ?? '');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const monster   = gameState.monster;
  const name      = monster?.name ?? 'Regemon';
  const emoji     = monster?.emoji ?? '🎮';
  const owner     = ownerName ?? 'Trainer';
  const spriteUrl = getSpriteUrl(emoji);

  // ✅ Al montar: verificar localStorage primero
  useEffect(() => {
    setRegistered(checkRegistered());
  }, []);

  if (registered) {
    return <SocialPanel gameState={gameState} ownerName={owner} />;
  }

  async function handleRegister() {
    setLoading(true);
    setError('');
    try {
      await registerHub({
        name,
        ownerName: owner,
        ownerEmail: email || undefined,
        appUrl: window.location.origin + window.location.pathname,
        sprite: spriteUrl,
      });
      localStorage.setItem(LS.balance, '0');
      setRegistered(true);
    } catch {
      setError('El HUB está descansando, intenta después 🍎');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="nes-container is-centered hub-register">
      <p className="title" style={{ color: '#ffd700' }}>🌐 CONECTAR AL HUB</p>

      {/* Preview del Regenmon */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={spriteUrl}
          alt={name}
          style={{ width: 72, height: 72, imageRendering: 'pixelated', margin: '0 auto 0.5rem', display: 'block' }}
          onError={e => {
            (e.target as HTMLImageElement).outerHTML = `<div style="font-size:3rem;margin:0.5rem auto">${emoji}</div>`;
          }}
        />
        <p style={{ fontSize: '0.7rem', color: '#ffd700', margin: '0.25rem 0' }}>{name}</p>
        <p style={{ fontSize: '0.6rem', color: '#aaa', margin: 0 }}>Dueño: {owner}</p>
        <p style={{ fontSize: '0.6rem', color: '#aaa', margin: '0.25rem 0 0' }}>⭐ {totalPoints} puntos</p>
      </div>

      {/* Info auto-detectada */}
      <div style={{ background: '#0a0a20', border: '2px solid #333', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.6rem' }}>
        <p style={{ margin: '0 0 0.25rem', color: '#aaa' }}>📍 URL de tu app:</p>
        <p style={{ margin: 0, color: '#00d4ff', wordBreak: 'break-all' }}>
          {window.location.origin + window.location.pathname}
        </p>
      </div>

      {/* Email opcional */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.6rem', color: '#aaa', display: 'block', marginBottom: '0.25rem' }}>
          📧 Email (opcional):
        </label>
        <input
          className="nes-input"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ fontSize: '0.6rem' }}
        />
      </div>

      {error && (
        <p style={{ fontSize: '0.6rem', color: '#ff6b6b', marginBottom: '0.75rem' }}>{error}</p>
      )}

      <button
        className={`nes-btn is-success ${loading ? 'is-disabled' : ''}`}
        style={{ fontSize: '0.6rem', width: '100%' }}
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? '⏳ Conectando...' : '🌐 Registrar en el HUB'}
      </button>

      <p style={{ fontSize: '0.55rem', color: '#666', marginTop: '0.75rem', textAlign: 'center' }}>
        Tu Regemon aparecerá en el ranking global 🏆
      </p>
    </div>
  );
}
