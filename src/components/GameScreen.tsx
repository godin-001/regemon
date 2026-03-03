import { useCallback, useState } from 'react';
import type { GameState, TrainingState, TrainingCategory, EvaluateResult } from '../types';
import { StatBar } from './StatBar';
import { FloatingStat } from './FloatingStat';
import { TrainingScreen } from './TrainingScreen';
import { PixelSprite } from './PixelSprite';
import { getSprite } from '../sprites/pixelArt';
import { STAGE_LABELS } from '../hooks/useTraining';

interface FloatItem { id: string; text: string; color: string; }

interface Props {
  state: GameState;
  isLoggedIn: boolean;
  canAfford: (n: number) => boolean;
  training: TrainingState;
  isEvaluating: boolean;
  onEvaluate: (imageBase64: string, category: TrainingCategory) => Promise<EvaluateResult>;
  onFeed: () => void;
  onFeedWithCoins: () => void;
  onPlay: () => void;
  onSleep: () => void;
  onReset: () => void;
  floatItems?: FloatItem[];
  onFloatDone?: (id: string) => void;
}

function getFallbackEmoji(state: GameState): string {
  if (state.hunger < 10 && state.stage !== 'dead') return '😡🔥';
  if (state.stage === 'dead') return '💀';
  return '';
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

export function GameScreen({
  state, isLoggedIn, canAfford,
  training, isEvaluating, onEvaluate,
  onFeed, onFeedWithCoins, onPlay, onSleep, onReset,
  floatItems = [], onFloatDone
}: Props) {
  const { monster, stage, hunger, happiness, energy, age } = state;
  const isDead = stage === 'dead';
  const isEgg  = stage === 'egg';
  const isCriticalHunger = hunger < 10 && !isDead;
  const FEED_COST = 10;

  const [activeTab, setActiveTab] = useState<'stats' | 'train'>('stats');
  const [reaction, setReaction] = useState('');
  const [processing, setProcessing] = useState(false);

  const triggerReaction = useCallback((msg: string) => {
    setReaction(msg);
    setTimeout(() => setReaction(''), 2500);
  }, []);

  const handleFeedCoins = async () => {
    if (processing) return;
    if (!isLoggedIn) { triggerReaction('🔑 ¡Inicia sesión para usar monedas!'); return; }
    if (!canAfford(FEED_COST)) { triggerReaction(`¡Necesitas ${FEED_COST} 🍊!`); return; }
    if (hunger >= 98) { triggerReaction('¡Ya estoy lleno! No necesito comer más 😅'); return; }
    setProcessing(true);
    triggerReaction('⏳ Procesando...');
    await new Promise(r => setTimeout(r, 600));
    onFeedWithCoins();
    triggerReaction('🍊 ¡Ñam ñam! ¡Gracias por la comida! 😋');
    setProcessing(false);
  };

  const handlePlay = () => {
    if (processing) return;
    onPlay();
    triggerReaction('🎮 ¡Weee! ¡Juguemos! 🎉');
  };

  const handleSleep = () => {
    if (processing) return;
    onSleep();
    triggerReaction('💤 Zzz... qué rico descanso...');
  };

  const handleFeed = () => {
    if (processing) return;
    onFeed();
    triggerReaction('🍖 ¡Mmmm! ¡Qué rico!');
  };

  const handleFloatDone = useCallback((id: string) => onFloatDone?.(id), [onFloatDone]);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      {/* Pet card */}
      <div
        className={`nes-container with-title is-centered ${isCriticalHunger ? 'hunger-critical' : ''}`}
        style={{ marginBottom: '1rem' }}
      >
        <p className="title" style={{ color: isCriticalHunger ? '#ff3333' : monster?.color }}>
          {isCriticalHunger ? '🔥 ' : ''}{monster?.name ?? 'REGEMON'}{isCriticalHunger ? ' 🔥' : ''}
        </p>

        {/* Pet + floats */}
        <div style={{ position: 'relative' }}>
          <FloatingStat items={floatItems} onDone={handleFloatDone} />
          {/* ── Pixel Art Sprite ─── */}
          {isDead || isCriticalHunger ? (
            <div style={{ fontSize: '5rem', margin: '0.75rem 0' }}>
              {getFallbackEmoji(state)}
            </div>
          ) : (
            <div style={{
              margin: '0.75rem auto',
              animation: 'bounce 1s infinite alternate, glowPulse 3s ease-in-out infinite',
              display: 'inline-block',
            }}>
              <PixelSprite
                grid={getSprite(monster?.id ?? 'pikumon', stage)}
                scale={2}
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          )}
        </div>

        {/* Reaction bubble */}
        {reaction && (
          <div className="nes-container" style={{
            fontSize: '0.65rem', color: '#fff', margin: '0.25rem 0',
            padding: '0.4rem 0.6rem', backgroundColor: '#1a2a4a',
            animation: 'msgIn 0.2s ease-out',
          }}>
            {reaction}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#aaa' }}>
          <span>Etapa: <strong>{getStageName(stage)}</strong></span>
          <span>Edad: <strong>{Math.floor(age / 60)}m {age % 60}s</strong></span>
          <span>{getMood(state)}</span>
        </div>
        {/* Training stage badge */}
        <div className="training-badge">
          ✦ Nivel: <strong style={{ color: '#ffd700' }}>{STAGE_LABELS[training.trainingStage]}</strong>
          {' · '}<span style={{ color: '#39ff14' }}>{training.totalPoints} pts</span> ✦
        </div>
      </div>

      {/* ── Tabs (Stats / Entrenar) — hidden while egg/dead ─────────────────── */}
      {!isDead && !isEgg && (
        <div className="anime-tabs">
          {(['stats', 'train'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`anime-tab ${activeTab === tab ? 'active' : ''}`}
            >
              {tab === 'stats' ? '🐾 Stats' : '🎓 Entrenar'}
            </button>
          ))}
        </div>
      )}

      {/* ── Stats tab ────────────────────────────────────────────────────────── */}
      {!isDead && !isEgg && activeTab === 'stats' && (
        <>
          <div className="nes-container" style={{ marginBottom: '1rem' }}>
            <StatBar label="Hambre" icon="🍖" value={hunger} nesClass="is-error" />
            <StatBar label="Felicidad" icon="❤️" value={happiness} nesClass="is-primary" />
            <StatBar label="Energía" icon="⚡" value={energy} nesClass="is-warning" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {/* Feed with coins (primary) */}
            <button
              className={`nes-btn ${canAfford(FEED_COST) ? 'is-success' : 'is-disabled'}`}
              onClick={handleFeedCoins}
              disabled={processing}
              style={{ fontSize: '0.6rem', position: 'relative' }}
              title={!isLoggedIn ? 'Inicia sesión' : !canAfford(FEED_COST) ? `Necesitas ${FEED_COST} 🍊` : 'Alimentar'}
            >
              🍊 Alimentar ({FEED_COST}🍊)
            </button>

            {/* Free feed (fallback) */}
            <button className="nes-btn" onClick={handleFeed} disabled={processing} style={{ fontSize: '0.6rem' }}>
              🍖 Comer (gratis)
            </button>

            <button className="nes-btn is-primary" onClick={handlePlay} disabled={processing} style={{ fontSize: '0.6rem' }}>
              🎮 Jugar
            </button>
            <button className="nes-btn is-warning" onClick={handleSleep} disabled={processing} style={{ fontSize: '0.6rem' }}>
              💤 Dormir
            </button>
          </div>
        </>
      )}

      {/* ── Train tab ────────────────────────────────────────────────────────── */}
      {!isDead && !isEgg && activeTab === 'train' && (
        <TrainingScreen
          monsterName={monster?.name ?? 'Regemon'}
          training={training}
          isEvaluating={isEvaluating}
          onEvaluate={onEvaluate}
        />
      )}

      {/* Egg */}
      {isEgg && (
        <div className="nes-container is-centered" style={{ marginBottom: '1rem' }}>
          <p>⏳ Tu huevo está incubando...</p>
          <p style={{ fontSize: '0.75rem', color: '#aaa' }}>Nacerá pronto 🐣</p>
        </div>
      )}

      {/* Dead */}
      {isDead && (
        <div className="nes-container is-centered is-dark" style={{ marginBottom: '1rem' }}>
          <p>Tu Regemon no sobrevivió 😢</p>
          <p style={{ fontSize: '0.75rem', color: '#aaa' }}>Descuida menos a tu compañero...</p>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button className="nes-btn is-error" style={{ fontSize: '0.7rem' }} onClick={onReset}>
          🔄 Nuevo Regemon
        </button>
      </div>
    </div>
  );
}
