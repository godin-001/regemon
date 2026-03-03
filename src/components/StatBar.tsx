interface Props {
  label: string;
  icon: string;
  value: number;
  nesClass: 'is-success' | 'is-warning' | 'is-error' | 'is-primary';
}

const COLOR_MAP = {
  'is-error':   { text: '#ff6eb4', glow: '0 0 6px #ff6eb466' },
  'is-primary': { text: '#00d4ff', glow: '0 0 6px #00d4ff66' },
  'is-warning': { text: '#ffd700', glow: '0 0 6px #ffd70066' },
  'is-success': { text: '#39ff14', glow: '0 0 6px #39ff1466' },
};

export function StatBar({ label, icon, value, nesClass }: Props) {
  const pct = Math.round(value);
  const { text, glow } = COLOR_MAP[nesClass];
  const isLow = pct < 25;

  return (
    <div style={{ marginBottom: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', alignItems: 'center' }}>
        <span style={{
          fontSize: '0.65rem',
          color: isLow ? '#ff6eb4' : text,
          textShadow: isLow ? '0 0 8px #ff6eb4' : glow,
          letterSpacing: '0.5px',
        }}>
          {icon} {label}
        </span>
        <span style={{
          fontSize: '0.6rem',
          color: isLow ? '#ff6eb4' : text,
          textShadow: isLow ? '0 0 8px #ff6eb4' : glow,
          fontFamily: "'Noto Sans JP', sans-serif",
          fontWeight: 'bold',
        }}>
          {pct}
        </span>
      </div>
      <progress
        className={`nes-progress ${nesClass}`}
        value={pct}
        max={100}
        style={{ height: '16px' }}
      />
    </div>
  );
}
