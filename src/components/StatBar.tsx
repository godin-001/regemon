interface Props {
  label: string;
  icon: string;
  value: number;
  color: string;
}

export function StatBar({ label, icon, value, color }: Props) {
  const pct = Math.round(value);

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.8rem' }}>
          {icon} {label}
        </span>
        <span style={{ fontSize: '0.8rem', color }}>{pct}%</span>
      </div>
      <progress
        className="nes-progress"
        style={{ color } as React.CSSProperties}
        value={pct}
        max={100}
      />
    </div>
  );
}
