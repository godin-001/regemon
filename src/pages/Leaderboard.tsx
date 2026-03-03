// ════════════════════════════════════════════════════════════
// Leaderboard.tsx — Ranking global del HUB
// ════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../hooks/useHub';
import type { LeaderboardEntry } from '../hooks/useHub';

function rankMedal(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const [entries, setEntries]   = useState<LeaderboardEntry[]>([]);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotal]  = useState(1);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  async function load(p: number) {
    setLoading(true);
    setError('');
    try {
      const res = await getLeaderboard(p, 10);
      setEntries(res.data);
      setTotal(res.pagination.totalPages);
      setPage(p);
    } catch {
      setError('El HUB está descansando, intenta después 🍎');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(1); }, []);

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', padding: '1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <button
          className="nes-btn"
          style={{ fontSize: '0.55rem', padding: '0.4rem 0.6rem' }}
          onClick={() => navigate('/')}
        >
          ← Volver
        </button>
        <h2 className="gradient-title" style={{ margin: 0, fontSize: '1rem' }}>
          🏆 LEADERBOARD
        </h2>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: '#aaa', fontSize: '0.7rem' }}>⏳ Cargando ranking...</p>
        </div>
      ) : error ? (
        <div className="nes-container is-centered">
          <p style={{ color: '#ff6b6b', fontSize: '0.7rem' }}>{error}</p>
          <button className="nes-btn" style={{ fontSize: '0.55rem' }} onClick={() => load(page)}>
            🔄 Reintentar
          </button>
        </div>
      ) : (
        <>
          {/* Tabla */}
          <div className="nes-container" style={{ padding: '0.5rem', overflowX: 'auto' }}>
            {entries.map(e => (
              <div
                key={e.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem',
                  borderBottom: '1px solid #222',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={el => (el.currentTarget.style.background = '#1a1a35')}
                onMouseLeave={el => (el.currentTarget.style.background = 'transparent')}
              >
                {/* Rank */}
                <span style={{ fontSize: '1rem', minWidth: 36, textAlign: 'center' }}>
                  {rankMedal(e.rank)}
                </span>

                {/* Sprite */}
                <img
                  src={e.sprite}
                  alt={e.name}
                  style={{ width: 40, height: 40, imageRendering: 'pixelated', flexShrink: 0 }}
                  onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
                />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.65rem', color: '#ffd700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {e.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.55rem', color: '#aaa' }}>
                    {e.ownerName} · {e.stage}
                  </p>
                </div>

                {/* Stats */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.6rem', color: '#39ff14' }}>⭐ {e.totalPoints}</p>
                  <p style={{ margin: 0, fontSize: '0.55rem', color: '#f97316' }}>💰 {e.balance}</p>
                </div>

                {/* Ver perfil */}
                <button
                  className="nes-btn is-primary"
                  style={{ fontSize: '0.5rem', padding: '0.3rem 0.5rem', flexShrink: 0 }}
                  onClick={() => navigate(`/regenmon/${e.id}`)}
                >
                  Ver →
                </button>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                className={`nes-btn ${page <= 1 ? 'is-disabled' : ''}`}
                style={{ fontSize: '0.55rem' }}
                disabled={page <= 1}
                onClick={() => load(page - 1)}
              >
                ← Anterior
              </button>
              <span style={{ fontSize: '0.6rem', color: '#aaa', alignSelf: 'center' }}>
                {page} / {totalPages}
              </span>
              <button
                className={`nes-btn ${page >= totalPages ? 'is-disabled' : ''}`}
                style={{ fontSize: '0.55rem' }}
                disabled={page >= totalPages}
                onClick={() => load(page + 1)}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
