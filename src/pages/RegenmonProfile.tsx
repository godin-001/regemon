// ════════════════════════════════════════════════════════════
// RegenmonProfile.tsx — Perfil público + interacciones sociales
// ════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getRegenmonProfile, feedRegenmon, giftRegenmon,
  getMessages, sendMessage as apiSendMessage,
  getHubId, isRegistered, getHubBalance,
  LS,
} from '../hooks/useHub';
import type { HubProfile, HubMessage } from '../hooks/useHub';

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'ahora';
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h}h`;
  return `hace ${Math.floor(h / 24)}d`;
}

// Barra de stat simple
function StatBar({ value, color, label }: { value: number; color: string; label: string }) {
  const pct = Math.min(Math.max(value, 0), 100);
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: '#aaa', marginBottom: 2 }}>
        <span>{label}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 14, background: '#1a1a35', border: `2px solid ${color}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}`, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

// Toast de notificación
function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [msg, onDone]);
  return (
    <div style={{
      position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
      background: '#1a1a35', border: '2px solid #ffd700', padding: '0.5rem 1rem',
      fontSize: '0.65rem', color: '#ffd700', zIndex: 9999, borderRadius: 4,
      boxShadow: '0 0 12px #ffd70066', maxWidth: '90vw', textAlign: 'center',
    }}>
      {msg}
    </div>
  );
}

// ── Acciones sociales ──────────────────────────────────────
function SocialActions({ profile }: { profile: HubProfile }) {
  const myId    = getHubId() ?? '';
  const [balance, setBalance]   = useState(getHubBalance());
  const [loading, setLoading]   = useState('');
  const [toast, setToast]       = useState('');
  const [messages, setMessages] = useState<HubMessage[]>([]);
  const [msgText, setMsgText]   = useState('');
  const [msgLoading, setMsgLoad] = useState(false);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const res = await getMessages(profile.id);
      setMessages(res.data.messages ?? []);
    } catch {/* hub resting */}
  }

  function showToast(msg: string) {
    setToast(msg);
  }

  async function handleFeed() {
    if (loading) return;
    if (balance < 10) { showToast('¡Sin $FRUTA suficiente! 💸'); return; }
    setLoading('feed');
    try {
      const res = await feedRegenmon(profile.id, myId);
      const newBal = res.data.senderBalance;
      localStorage.setItem(LS.balance, String(newBal));
      setBalance(newBal);
      showToast(`¡Le diste de comer a ${res.data.targetName}! -${res.data.cost} $FRUTA 🍎`);
    } catch {
      showToast('El HUB está descansando, intenta después 🍎');
    } finally {
      setLoading('');
    }
  }

  async function handleGift(amount: number) {
    if (loading) return;
    if (balance < amount) { showToast(`¡Sin $FRUTA suficiente! Tienes ${balance} 💸`); return; }
    setLoading(`gift_${amount}`);
    try {
      const res = await giftRegenmon(profile.id, myId, amount);
      const newBal = res.data.senderBalance;
      localStorage.setItem(LS.balance, String(newBal));
      setBalance(newBal);
      showToast(`¡Enviaste ${amount} $FRUTA a ${res.data.targetName}! 🎁`);
    } catch {
      showToast('El HUB está descansando, intenta después 🍎');
    } finally {
      setLoading('');
    }
  }

  async function handleSendMessage() {
    if (!msgText.trim() || msgLoading) return;
    setMsgLoad(true);
    try {
      // resolve owner name from localStorage (best effort)
      const ownerName = (() => {
        try {
          const keys = Object.keys(localStorage).filter(k => k.startsWith('regemon_user_'));
          if (!keys.length) return 'Trainer';
          const raw = localStorage.getItem(keys[0]);
          const parsed = JSON.parse(raw ?? '{}');
          return parsed.userName ?? parsed.ownerName ?? 'Trainer';
        } catch { return 'Trainer'; }
      })();
      const res = await apiSendMessage(profile.id, myId, ownerName, msgText.trim());
      setMessages(prev => [res.data, ...prev]);
      setMsgText('');
    } catch {
      showToast('El HUB está descansando, intenta después 🍎');
    } finally {
      setMsgLoad(false);
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      {/* Balance info */}
      <p style={{ fontSize: '0.6rem', color: '#f97316', marginBottom: '0.75rem', textAlign: 'center' }}>
        💰 Tu saldo: <strong style={{ color: '#ffd700' }}>{balance} $FRUTA</strong>
      </p>

      {/* Feed */}
      <div className="nes-container" style={{ marginBottom: '0.75rem', padding: '0.75rem' }}>
        <p style={{ fontSize: '0.6rem', color: '#aaa', marginBottom: '0.5rem' }}>🍎 ALIMENTAR</p>
        <button
          className={`nes-btn is-success ${(balance < 10 || !!loading) ? 'is-disabled' : ''}`}
          style={{ fontSize: '0.55rem', width: '100%' }}
          disabled={balance < 10 || !!loading}
          onClick={handleFeed}
        >
          {loading === 'feed' ? '⏳ Dando...' : `🍎 Dar de comer (-10 $FRUTA)${balance < 10 ? ' — Sin $FRUTA' : ''}`}
        </button>
      </div>

      {/* Gift */}
      <div className="nes-container" style={{ marginBottom: '0.75rem', padding: '0.75rem' }}>
        <p style={{ fontSize: '0.6rem', color: '#aaa', marginBottom: '0.5rem' }}>🎁 ENVIAR REGALO</p>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[5, 10, 25].map(amt => (
            <button
              key={amt}
              className={`nes-btn is-warning ${(balance < amt || !!loading) ? 'is-disabled' : ''}`}
              style={{ fontSize: '0.5rem', flex: 1 }}
              disabled={balance < amt || !!loading}
              onClick={() => handleGift(amt)}
            >
              {loading === `gift_${amt}` ? '⏳' : `🎁 ${amt}`}
            </button>
          ))}
        </div>
      </div>

      {/* Mensajes */}
      <div className="nes-container" style={{ padding: '0.75rem' }}>
        <p style={{ fontSize: '0.6rem', color: '#aaa', marginBottom: '0.5rem' }}>💬 MENSAJES</p>

        {/* Lista */}
        <div ref={msgsRef} style={{ maxHeight: 220, overflowY: 'auto', marginBottom: '0.75rem' }}>
          {messages.length === 0 ? (
            <p style={{ fontSize: '0.6rem', color: '#555', textAlign: 'center', padding: '1rem 0' }}>
              Sé el primero en dejar un mensaje ✨
            </p>
          ) : (
            messages.map((m) => (
              <div key={m.id} style={{ borderBottom: '1px solid #222', padding: '0.4rem 0', fontSize: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ color: '#ffd700' }}>{m.fromName}</span>
                  <span style={{ color: '#555' }}>{timeAgo(m.createdAt)}</span>
                </div>
                <p style={{ margin: 0, color: '#ddd', lineHeight: 1.5 }}>{m.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div>
          <div style={{ position: 'relative', marginBottom: '0.4rem' }}>
            <textarea
              className="nes-textarea"
              rows={2}
              maxLength={140}
              value={msgText}
              onChange={e => setMsgText(e.target.value)}
              placeholder="Escribe un mensaje..."
              style={{ fontSize: '0.6rem', resize: 'none', width: '100%' }}
            />
            <span style={{
              position: 'absolute', bottom: 6, right: 8,
              fontSize: '0.5rem', color: msgText.length > 120 ? '#ff6b6b' : '#555',
            }}>
              {msgText.length}/140
            </span>
          </div>
          <button
            className={`nes-btn is-primary ${(msgLoading || !msgText.trim()) ? 'is-disabled' : ''}`}
            style={{ fontSize: '0.55rem', width: '100%' }}
            disabled={msgLoading || !msgText.trim()}
            onClick={handleSendMessage}
          >
            {msgLoading ? '⏳ Enviando...' : '📨 Enviar mensaje'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Perfil público ─────────────────────────────────────────
export default function RegenmonProfile() {
  const { id }      = useParams<{ id: string }>();
  const navigate    = useNavigate();
  const myId        = getHubId();
  const registered  = isRegistered();
  const isMe        = !!myId && myId === id;

  const [profile, setProfile]   = useState<HubProfile | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getRegenmonProfile(id);
        setProfile(res.data);
      } catch {
        setError('El HUB está descansando, intenta después 🍎');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', padding: '1rem' }}>
      {/* Nav */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button className="nes-btn" style={{ fontSize: '0.55rem' }} onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <button className="nes-btn" style={{ fontSize: '0.55rem' }} onClick={() => navigate('/leaderboard')}>
          🏆 Ranking
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: '#aaa', fontSize: '0.7rem' }}>⏳ Cargando perfil...</p>
        </div>
      ) : error ? (
        <div className="nes-container is-centered">
          <p style={{ color: '#ff6b6b', fontSize: '0.7rem' }}>{error}</p>
        </div>
      ) : profile ? (
        <>
          {/* Header del perfil */}
          <div className="nes-container is-centered" style={{ marginBottom: '1rem' }}>
            {isMe && (
              <span className="nes-badge" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>
                <span className="is-primary" style={{ fontSize: '0.5rem' }}>👤 MI PERFIL</span>
              </span>
            )}

            <img
              src={profile.sprite}
              alt={profile.name}
              style={{ width: 80, height: 80, imageRendering: 'pixelated', display: 'block', margin: '0 auto 0.5rem' }}
              onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
            />

            <h3 style={{ fontSize: '0.8rem', color: '#ffd700', margin: '0 0 0.25rem', textAlign: 'center' }}>
              {profile.name}
            </h3>
            <p style={{ fontSize: '0.6rem', color: '#aaa', textAlign: 'center', margin: 0 }}>
              Dueño: {profile.ownerName}
            </p>

            {/* Stage badge */}
            <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
              <span className="nes-badge">
                <span className="is-warning" style={{ fontSize: '0.5rem' }}>
                  Etapa: {profile.stage ?? 'adulto'}
                </span>
              </span>
            </div>

            {/* Stats */}
            <div style={{ margin: '0.75rem 0' }}>
              <StatBar value={profile.stats?.happiness ?? 0} color="#ff6eb4" label="❤️ Felicidad" />
              <StatBar value={profile.stats?.energy ?? 0}    color="#00d4ff" label="⚡ Energía" />
              <StatBar value={profile.stats?.hunger ?? 0}    color="#ffd700" label="🍔 Hambre" />
            </div>

            {/* Puntos y balance */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.6rem' }}>
              <span>⭐ <strong style={{ color: '#39ff14' }}>{profile.totalPoints}</strong> puntos</span>
              <span>💰 <strong style={{ color: '#f97316' }}>{profile.balance}</strong> $FRUTA</span>
              <span>👁️ <strong style={{ color: '#aaa' }}>{profile.totalVisits ?? 0}</strong> visitas</span>
            </div>

            {/* Fecha */}
            {profile.registeredAt && (
              <p style={{ fontSize: '0.5rem', color: '#555', textAlign: 'center', marginTop: '0.5rem', marginBottom: 0 }}>
                Registrado: {new Date(profile.registeredAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>

          {/* Interacciones sociales */}
          {!isMe && registered ? (
            <SocialActions profile={profile} />
          ) : !isMe && !registered ? (
            <div className="nes-container is-centered">
              <p style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '0.75rem', lineHeight: 1.8 }}>
                Regístrate en el HUB para interactuar con este Regemon ✨
              </p>
              <button
                className="nes-btn is-primary"
                style={{ fontSize: '0.6rem' }}
                onClick={() => navigate('/')}
              >
                🌐 Ir a registrarme
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
