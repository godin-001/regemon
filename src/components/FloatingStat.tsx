import { useEffect, useState } from 'react';

interface FloatItem {
  id: string;
  text: string;
  color: string;
}

interface Props {
  items: FloatItem[];
  onDone: (id: string) => void;
}

export function FloatingStat({ items, onDone }: Props) {
  return (
    <div style={{ position: 'relative', height: 0, overflow: 'visible', pointerEvents: 'none' }}>
      {items.map((item) => (
        <FloatBubble key={item.id} item={item} onDone={onDone} />
      ))}
    </div>
  );
}

function FloatBubble({ item, onDone }: { item: FloatItem; onDone: (id: string) => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone(item.id);
    }, 1500);
    return () => clearTimeout(t);
  }, [item.id, onDone]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '-10px',
        right: `${20 + Math.random() * 60}px`,
        fontSize: '0.7rem',
        fontWeight: 'bold',
        color: item.color,
        animation: 'floatUp 1.5s ease-out forwards',
        pointerEvents: 'none',
        zIndex: 100,
        whiteSpace: 'nowrap',
      }}
    >
      {item.text}
    </div>
  );
}
