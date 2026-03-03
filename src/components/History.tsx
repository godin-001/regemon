import { useState } from 'react';
import type { HistoryEntry } from '../hooks/useFruta';

interface Props {
  entries: HistoryEntry[];
}

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  return `${Math.floor(diff / 3600)}h`;
}

export function History({ entries }: Props) {
  const [open, setOpen] = useState(false);
  if (entries.length === 0) return null;

  return (
    <div className="nes-container" style={{ marginTop: '1rem' }}>
      <button
        className="nes-btn"
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', fontSize: '0.65rem', textAlign: 'left' }}
      >
        📋 Historial {open ? '▲' : '▼'}
      </button>

      {open && (
        <div style={{ marginTop: '0.75rem' }}>
          {entries.map((e) => (
            <div
              key={e.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.65rem',
                padding: '0.3rem 0',
                borderBottom: '1px solid #1a2a4a',
                color: '#bbb',
              }}
            >
              <span>{e.action}</span>
              <span style={{ display: 'flex', gap: '0.75rem' }}>
                <span style={{ color: e.delta > 0 ? '#a8e063' : '#ff6b6b' }}>
                  {e.delta > 0 ? '+' : ''}{e.delta} 🍊
                </span>
                <span style={{ color: '#666' }}>{timeAgo(e.timestamp)}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
