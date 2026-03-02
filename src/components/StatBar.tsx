interface Props {
  label: string;
  icon: string;
  value: number;
  nesClass: 'is-success' | 'is-warning' | 'is-error' | 'is-primary';
}

export function StatBar({ label, icon, value, nesClass }: Props) {
  const pct = Math.round(value);

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.8rem' }}>
          {icon} {label}
        </span>
        <span style={{ fontSize: '0.8rem', color: '#e0e0e0' }}>{pct}%</span>
      </div>
      <progress
        className={`nes-progress ${nesClass}`}
        value={pct}
        max={100}
      />
    </div>
  );
}
