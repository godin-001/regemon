import type { GameState } from '../types';
import { StatBar } from './StatBar';

interface Props {
  state: GameState;
  onFeed: () => void;
  onPlay: () => void;
  onSleep: () => void;
  onReset: () => void;
}

function getEmoji(state: GameState): string {
  if (!state.monster) return '🥚';
  if (state.stage === 'egg') return state.monster.emoji;
  if (state.stage === 'baby') return state.monster.babyEmoji;
  if (state.stage === 'adult') return state.monster.adultEmoji;
  return '💀';
}

function getStageName(stage: string): string {
  const names: Record<string, string> = {
    egg: 'Huevo',
    baby: 'Bebé',
    adult: 'Adulto',
    dead: '💀 Ha muerto',
  };
  return names[stage] ?? stage;
}

function getMood(state: GameState): string {
  const avg = (state.hunger + state.happiness + state.energy) / 3;
  if (avg >= 75) return '😄 ¡Feliz!';
  if (avg >= 50) return '😐 Normal';
  if (avg >= 25) return '😢 Triste';
  return '😵 Crítico';
}

export function GameScreen({ state, onFeed, onPlay, onSleep, onReset }: Props) {
  const { monster, stage, hunger, happiness, energy, age } = state;
  const isDead = stage === 'dead';
  const isEgg = stage === 'egg';

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      {/* Header */}
      <div className="nes-container with-title is-centered" style={{ marginBottom: '1rem' }}>
        <p className="title" style={{ color: monster?.color }}>
          {monster?.name ?? 'REGEMON'}
        </p>

        {/* Pet display */}
        <div
          style={{
            fontSize: '6rem',
            margin: '1rem 0',
            animation: isDead ? 'none' : 'bounce 1s infinite alternate',
          }}
        >
          {getEmoji(state)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#555' }}>
          <span>Etapa: <strong>{getStageName(stage)}</strong></span>
          <span>Edad: <strong>{Math.floor(age / 60)}m {age % 60}s</strong></span>
          <span>{getMood(state)}</span>
        </div>
      </div>

      {/* Stats */}
      {!isDead && !isEgg && (
        <div className="nes-container" style={{ marginBottom: '1rem' }}>
          <StatBar label="Hambre" icon="🍖" value={hunger} color="#ff6b35" />
          <StatBar label="Felicidad" icon="❤️" value={happiness} color="#ff85a1" />
          <StatBar label="Energía" icon="⚡" value={energy} color="#ffe66d" />
        </div>
      )}

      {isEgg && (
        <div className="nes-container is-centered" style={{ marginBottom: '1rem' }}>
          <p>⏳ Tu huevo está incubando...</p>
          <p style={{ fontSize: '0.75rem', color: '#888' }}>Nacerá pronto 🐣</p>
        </div>
      )}

      {/* Actions */}
      {!isDead && !isEgg && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <button className="nes-btn is-success" onClick={onFeed}>
            🍖 Comer
          </button>
          <button className="nes-btn is-primary" onClick={onPlay}>
            🎮 Jugar
          </button>
          <button className="nes-btn is-warning" onClick={onSleep}>
            💤 Dormir
          </button>
        </div>
      )}

      {/* Dead screen */}
      {isDead && (
        <div className="nes-container is-centered is-dark" style={{ marginBottom: '1rem' }}>
          <p>Tu Regemon no sobrevivió 😢</p>
          <p style={{ fontSize: '0.75rem', color: '#aaa' }}>
            Descuida menos a tu compañero la próxima vez...
          </p>
        </div>
      )}

      {/* Reset */}
      <div style={{ textAlign: 'center' }}>
        <button className="nes-btn is-error" style={{ fontSize: '0.7rem' }} onClick={onReset}>
          🔄 Nuevo Regemon
        </button>
      </div>
    </div>
  );
}
