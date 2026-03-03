import { useMemo } from 'react';
import { COLOR_MAP, SPRITE_SIZE, CELL_SIZE } from '../sprites/pixelArt';
import type { PixelGrid } from '../sprites/pixelArt';

interface Props {
  grid: PixelGrid;
  scale?: number;        // multiplier on CELL_SIZE (default 2 → 96px)
  style?: React.CSSProperties;
  className?: string;
}

export function PixelSprite({ grid, scale = 2, style, className }: Props) {
  const cellPx = CELL_SIZE * scale;
  const totalPx = SPRITE_SIZE * cellPx;

  const rects = useMemo(() => {
    const out: { key: string; x: number; y: number; fill: string }[] = [];
    grid.forEach((row, rowIdx) => {
      [...row].forEach((ch, colIdx) => {
        const fill = COLOR_MAP[ch] ?? null;
        if (fill) {
          out.push({
            key: `${colIdx}-${rowIdx}`,
            x: colIdx * cellPx,
            y: rowIdx * cellPx,
            fill,
          });
        }
      });
    });
    return out;
  }, [grid, cellPx]);

  return (
    <svg
      width={totalPx}
      height={totalPx}
      viewBox={`0 0 ${totalPx} ${totalPx}`}
      style={{
        imageRendering: 'pixelated',
        display: 'block',
        margin: '0 auto',
        ...style,
      }}
      className={className}
    >
      {rects.map(r => (
        <rect key={r.key} x={r.x} y={r.y} width={cellPx} height={cellPx} fill={r.fill} />
      ))}
    </svg>
  );
}
