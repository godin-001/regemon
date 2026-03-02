import { useCallback } from 'react';
import type { GameState } from '../types';
import { StatBar } from './StatBar';
import { FloatingStat } from './FloatingStat';

interface FloatItem { id: string; text: string; color: string; }

interface Props {
  state: GameState;
  onFeed: () => void;
  onPlay: () => void;
  onSleep: () => void;
  onReset: () => void;
  floatItems?: FloatItem[];
  onFloatDone?: (id: string) => void;
}

function getEmoji(state: GameState): string {
  if (!state.monster) return '🥚';
  if (state.hunger < 10 && state.stage !== 'dead') return '😡🔥';
  if (state.stage === 'egg') return state.monster.emoji;
  if (state.stage === 'baby') return state.monster.babyEmoji;
  if (state.stage === 'adult') return state.monster.adultEmoji;
  return '💀';
}

function getStageName(stage: string): string {
  const names: Record<string, string> = {
    egg: 'Huevo', baby: 'Bebé', adult: 'Adulto', dead: '💀 Ha muerto',
  };
  return names[stage] ?? stage;
}

function getMood(state: GameState): string {
  if (state.hunger < 10) return '😡 ¡HAMBRE!';
  const avg = (state.hunger + state.happiness + state.energy) / 3;
  if (avg >= 75) return '😄 ¡Feliz!';
  if (avg >= 50) return '😐 Normal';
  if (avg >= 25) return '😢 Triste';
  return '😵 Crítico';
}

export function GameScreen({ state, onFeed, onPlay, onSleep, onReset, floatItems = [], onFloatDone }: Props) {
  const { monster, stage, hunger, happiness, energy, age } = state;
  const isDead = stage === 'dead';
  const isEgg = stage === 'egg';
  const isCriticalHunger = hunger < 10 && !isDead;

  const handleFloatDone = useCallback((id: string) => {
    onFloatDone?.(id);
  }, [onFloatDone]);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      {/* Header */}
      <div
        className={`nes-container with-title is-centered ${isCriticalHunger ? 'hunger-critical' : ''}`}
        style={{
          marginBottom: '1rem',
          borderColor: isCriticalHunger ? '#ff3333 !important' : undefined,
        }}
      >
        <p className="title" style={{ color: isCriticalHunger ? '#ff3333' : monster?.color }}>
          {isCriticalHunger ? '🔥 ' : ''}{monster?.name ?? 'REGEMON'}{isCriticalHunger ? ' 🔥' : ''}
        </p>

        {/* Pet display + floating stats */}
        <div style={{ position: 'relative' }}>
          <FloatingStat items={floatItems} onDone={handleFloatDone} />
          <div
            style={{
              fontSize: '6rem',
              margin: '1rem 0',
              animation: isDead ? 'none' : 'bounce 1s infinite alternate',
              filter: isCriticalHunger ? 'hue-rotate(0deg) saturate(3)' : 'none',
            }}
          >
            {getEmoji(state)}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#aaa' }}>
          <span>Etapa: <strong>{getStageName(stage)}</strong></span>
          <span>Edad: <strong>{Math.floor(age / 60)}m {age % 60}s</strong></span>
          <span>{getMood(state)}</span>
        </div>
      </div>

      {/* Stats */}
      {!isDead && !isEgg && (
        <div className="nes-container" style={{ marginBottom: '1rem' }}>
          <StatBar label="Hambre" icon="🍖" value={hunger} nesClass="is-error" />
          <StatBar label="Felicidad" icon="❤️" value={happiness} nesClass="is-primary" />
          <StatBar label="Energía" icon="⚡" value={energy} nesClass="is-warning" />
        </div>
      )}

      {isEgg && (
        <div className="nes-container is-centered" style={{ marginBottom: '1rem' }}>
          <p>⏳ Tu huevo está incubando...</p>
          <p style={{ fontSize: '0.75rem', color: '#aaa' }}>Nacerá pronto 🐣</p>
        </div>
      )}

      {/* Actions */}
      {!isDead && !isEgg && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          <button className="nes-btn is-success" onClick={onFeed}>🍖 Comer</button>
          <button className="nes-btn is-primary" onClick={onPlay}>🎮 Jugar</button>
          <button className="nes-btn is-warning" onClick={onSleep}>💤 Dormir</button>
        </div>
      )}

      {/* Dead screen */}
      {isDead && (
        <div className="nes-container is-centered is-dark" style={{ marginBottom: '1rem' }}>
          <p>Tu Regemon no sobrevivió 😢</p>
          <p style={{ fontSize: '0.75rem', color: '#aaa' }}>Descuida menos a tu compañero...</p>
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
