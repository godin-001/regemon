import type { Monster } from '../types';
import { MONSTERS } from '../data/monsters';

interface Props {
  onSelect: (monster: Monster) => void;
}

const PROFILES_HINT = {
  fire:  { hunger: '🔥🔥🔥', happiness: '⭐⭐', energy: '⚡' },
  water: { hunger: '🔥',     happiness: '⭐⭐⭐', energy: '⚡⚡' },
  earth: { hunger: '🔥🔥',   happiness: '⭐',    energy: '⚡⚡⚡' },
  air:   { hunger: '🔥🔥',   happiness: '⭐',    energy: '⚡⚡⚡' },
};

const PROFILE_DESC = {
  fire:  'Hambre veloz · Energía duradera',
  water: 'Necesita compañía · Metabolismo lento',
  earth: 'Tranquilo · Le cuesta recuperar energía',
  air:   'Espíritu libre · Se agota rápido',
};

export function SelectScreen({ onSelect }: Props) {
  return (
    <div className="nes-container with-title is-centered" style={{ maxWidth: 600, margin: '0 auto' }}>
      <p className="title">🥚 ELIGE TU REGEMON</p>
      <p style={{ marginBottom: '0.5rem', color: '#bbb', fontSize: '0.7rem' }}>
        Cada uno tiene stats y personalidad únicos
      </p>
      <div style={{ fontSize: '0.55rem', color: '#888', marginBottom: '1.5rem' }}>
        🔥 = hambre decay &nbsp;⭐ = felicidad decay &nbsp;⚡ = energía decay &nbsp;(más = más rápido)
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {MONSTERS.map((m) => {
          const hint = PROFILES_HINT[m.id];
          const desc = PROFILE_DESC[m.id];
          return (
            <div
              key={m.id}
              className="nes-container"
              style={{
                cursor: 'pointer',
                borderColor: m.color,
                transition: 'transform 0.1s',
                padding: '1rem',
              }}
              onClick={() => onSelect(m)}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
            >
              <p style={{ fontSize: '3rem', margin: 0 }}>{m.adultEmoji}</p>
              <p style={{ fontWeight: 'bold', margin: '0.5rem 0 0.25rem', color: m.color }}>
                {m.name}
              </p>
              <p style={{ fontSize: '0.6rem', color: '#999', margin: '0 0 0.5rem' }}>{desc}</p>
              <div style={{ fontSize: '0.6rem', color: '#aaa', lineHeight: '1.8' }}>
                <div>🍖 {hint.hunger}</div>
                <div>❤️ {hint.happiness}</div>
                <div>⚡ {hint.energy}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
