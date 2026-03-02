import type { Monster } from '../types';
import { MONSTERS } from '../data/monsters';

interface Props {
  onSelect: (monster: Monster) => void;
}

export function SelectScreen({ onSelect }: Props) {
  return (
    <div className="nes-container with-title is-centered" style={{ maxWidth: 600, margin: '0 auto' }}>
      <p className="title">🥚 ELIGE TU REGEMON</p>
      <p style={{ marginBottom: '2rem', color: '#bbb' }}>
        Tu compañero digital te necesita. ¿Cuál eleges?
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
        }}
      >
        {MONSTERS.map((m) => (
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
            <p style={{ fontSize: '0.7rem', color: '#bbb', margin: 0 }}>{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
