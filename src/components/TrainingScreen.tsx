import { useState, useRef, useCallback } from 'react';
import type { TrainingCategory, TrainingState, EvaluateResult } from '../types';
import { CATEGORY_NAMES, STAGE_LABELS, STAGE_THRESHOLDS } from '../hooks/useTraining';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
  monsterName: string;
  training: TrainingState;
  isEvaluating: boolean;
  onEvaluate: (
    imageBase64: string,
    category: TrainingCategory,
  ) => Promise<EvaluateResult>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function scoreEmoji(score: number) {
  if (score >= 80) return '🏆';
  if (score >= 60) return '⭐';
  if (score >= 40) return '👍';
  return '💪';
}

function scoreBg(score: number) {
  if (score >= 80) return '#3d1f00';
  if (score >= 60) return '#2a2200';
  if (score >= 40) return '#2a2200';
  return '#2a0000';
}

function scoreBorder(score: number) {
  if (score >= 80) return '#ff922b';
  if (score >= 60) return '#ffe066';
  if (score >= 40) return '#ffe066';
  return '#ff6b6b';
}

function scoreLabel(score: number) {
  if (score >= 80) return 'Excelente';
  if (score >= 60) return 'Bueno';
  if (score >= 40) return 'Regular';
  return 'Sigue intentando';
}

function nextThreshold(stage: 1 | 2 | 3): number {
  if (stage === 1) return STAGE_THRESHOLDS[2];
  if (stage === 2) return STAGE_THRESHOLDS[3];
  return STAGE_THRESHOLDS[3];
}

const CATEGORY_COLORS: Record<TrainingCategory, string> = {
  codigo: '#228be6',
  diseno: '#339af0',
  proyecto: '#1971c2',
  aprendizaje: '#4dabf7',
};

// ─── Component ────────────────────────────────────────────────────────────────
export function TrainingScreen({ monsterName, training, isEvaluating, onEvaluate }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluateResult | null>(null);
  const [evolutionAlert, setEvolutionAlert] = useState('');
  const [evalError, setEvalError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: TrainingCategory[] = ['codigo', 'diseno', 'proyecto', 'aprendizaje'];

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('❌ La imagen es muy grande (máx 5MB). Elige otra imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (!dataUrl) {
        alert('❌ No se pudo leer la imagen. Intenta con otra.');
        return;
      }
      setImagePreview(dataUrl);
      setImageBase64(dataUrl);
      setResult(null);
      setEvalError('');
    };
    reader.onerror = () => {
      alert('❌ Error al leer el archivo. Intenta con otra imagen.');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleCancel = useCallback(() => {
    setImagePreview(null);
    setImageBase64(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleEvaluate = useCallback(async () => {
    if (!imageBase64 || !selectedCategory || isEvaluating) return;
    setEvalError('');
    try {
      const res = await onEvaluate(imageBase64, selectedCategory);
      setResult(res);
      if (res.didEvolve) {
        setEvolutionAlert(
          `🎉 ¡${monsterName} evolucionó a ${STAGE_LABELS[res.newStage]}! +100 🍊 de bonus`,
        );
        setTimeout(() => setEvolutionAlert(''), 5000);
      }
      setImagePreview(null);
      setImageBase64(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Error evaluando imagen:', err);
      setEvalError('Hubo un error al evaluar. Intenta con otra imagen o categoría.');
    }
  }, [imageBase64, selectedCategory, isEvaluating, onEvaluate, monsterName]);

  const handleReset = useCallback(() => {
    setResult(null);
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const { totalPoints, trainingStage, trainingHistory } = training;
  const nextEvolutionPts = nextThreshold(trainingStage);
  const progressPct = trainingStage >= 3
    ? 100
    : Math.min(100, Math.round((totalPoints / nextEvolutionPts) * 100));

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>

      {/* Evolution alert */}
      {evolutionAlert && (
        <div
          className="nes-container"
          style={{
            marginBottom: '0.75rem',
            backgroundColor: '#3d1f00',
            border: '2px solid #ff922b',
            color: '#ffd43b',
            fontSize: '0.75rem',
            textAlign: 'center',
            animation: 'msgIn 0.3s ease-out',
          }}
        >
          {evolutionAlert}
        </div>
      )}

      {/* ── Progress bar ─────────────────────────────────────────────────────── */}
      <div className="nes-container" style={{ marginBottom: '0.75rem', padding: '0.6rem 0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#aaa', marginBottom: '0.3rem' }}>
          <span>Etapa: <strong style={{ color: '#ffd43b' }}>{STAGE_LABELS[trainingStage]}</strong></span>
          <span>Total: <strong style={{ color: '#a8e063' }}>{totalPoints} pts</strong></span>
        </div>
        <progress
          className="nes-progress is-warning"
          value={progressPct}
          max={100}
          style={{ height: '18px', width: '100%' }}
        />
        <div style={{ fontSize: '0.6rem', color: '#777', marginTop: '0.2rem', textAlign: 'right' }}>
          {trainingStage < 3
            ? `Próxima evolución: ${nextEvolutionPts} pts (${progressPct}%)`
            : '🐉 ¡Evolución máxima alcanzada!'}
        </div>
      </div>

      {/* ── Result card ──────────────────────────────────────────────────────── */}
      {result && (
        <div
          className="nes-container"
          style={{
            marginBottom: '0.75rem',
            backgroundColor: scoreBg(result.score),
            border: `2px solid ${scoreBorder(result.score)}`,
          }}
        >
          {/* Score */}
          <div style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
            <div style={{ fontSize: '2.5rem' }}>{scoreEmoji(result.score)}</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: scoreBorder(result.score) }}>
              {result.score}/100
            </div>
            <div style={{ fontSize: '0.7rem', color: '#aaa' }}>{scoreLabel(result.score)}</div>
          </div>

          {/* Feedback */}
          <div style={{
            backgroundColor: '#0a1628',
            borderRadius: '4px',
            padding: '0.5rem',
            marginBottom: '0.6rem',
            fontSize: '0.68rem',
            color: '#ccc',
            lineHeight: 1.4,
          }}>
            {result.feedback}
          </div>

          {/* Rewards */}
          <div style={{ marginBottom: '0.6rem' }}>
            <p style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '0.3rem' }}>Recompensas:</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.7rem', color: '#ffd43b' }}>⭐ +{result.points} Puntos</span>
              <span style={{ fontSize: '0.7rem', color: '#a8e063' }}>🍊 +{result.tokens} Tokens</span>
            </div>
          </div>

          {/* Stat effects */}
          <div style={{ marginBottom: '0.6rem' }}>
            <p style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '0.3rem' }}>Efectos en stats:</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {result.dHunger !== 0 && (
                <span style={{ fontSize: '0.68rem', color: result.dHunger > 0 ? '#ff6b6b' : '#a8e063' }}>
                  🍖 {result.dHunger > 0 ? '+' : ''}{result.dHunger} Hambre
                </span>
              )}
              {result.dHappiness !== 0 && (
                <span style={{ fontSize: '0.68rem', color: result.dHappiness > 0 ? '#a8e063' : '#ff6b6b' }}>
                  ❤️ {result.dHappiness > 0 ? '+' : ''}{result.dHappiness} Felicidad
                </span>
              )}
              {result.dEnergy !== 0 && (
                <span style={{ fontSize: '0.68rem', color: result.dEnergy > 0 ? '#a8e063' : '#ffe066' }}>
                  ⚡ {result.dEnergy > 0 ? '+' : ''}{result.dEnergy} Energía
                </span>
              )}
            </div>
          </div>

          <button
            className="nes-btn is-primary"
            style={{ fontSize: '0.65rem', width: '100%' }}
            onClick={handleReset}
          >
            🎓 Entrenar Nuevamente
          </button>
        </div>
      )}

      {/* ── Training form (hidden when result is showing) ──────────────────── */}
      {!result && (
        <>
          {/* Category selection */}
          <div className="nes-container" style={{ marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '0.5rem' }}>
              1. Elige una categoría:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {categories.map(cat => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    className={`nes-btn ${isSelected ? '' : 'is-disabled'}`}
                    style={{
                      fontSize: '0.6rem',
                      backgroundColor: isSelected ? CATEGORY_COLORS[cat] : 'transparent',
                      color: isSelected ? '#fff' : '#aaa',
                      border: isSelected ? `2px solid ${CATEGORY_COLORS[cat]}` : '2px solid #333',
                      opacity: 1,
                    }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {CATEGORY_NAMES[cat]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload */}
          <div className="nes-container" style={{ marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: '0.5rem' }}>
              2. Sube tu captura:
            </p>

            {!imagePreview ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button
                  className="nes-btn"
                  style={{ fontSize: '0.6rem', width: '100%' }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  📸 Subir Captura
                </button>
                <p style={{ fontSize: '0.55rem', color: '#555', marginTop: '0.3rem', textAlign: 'center' }}>
                  PNG, JPG — máx 5MB
                </p>
              </>
            ) : (
              <>
                <div style={{
                  height: '300px',
                  border: '2px solid #ff922b',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '0.5rem',
                }}>
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a1628' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    className={`nes-btn is-success ${!selectedCategory || isEvaluating ? 'is-disabled' : ''}`}
                    style={{ fontSize: '0.6rem' }}
                    disabled={!selectedCategory || isEvaluating}
                    onClick={handleEvaluate}
                  >
                    {isEvaluating ? '🔄 Evaluando...' : '✅ Evaluar'}
                  </button>
                  <button
                    className="nes-btn is-error"
                    style={{ fontSize: '0.6rem' }}
                    disabled={isEvaluating}
                    onClick={handleCancel}
                  >
                    ❌ Cancelar
                  </button>
                </div>
                {!selectedCategory && (
                  <p style={{ fontSize: '0.6rem', color: '#ff6b6b', marginTop: '0.3rem', textAlign: 'center' }}>
                    ⬆️ Primero elige una categoría
                  </p>
                )}
                {evalError && (
                  <p style={{ fontSize: '0.6rem', color: '#ff6b6b', marginTop: '0.3rem', textAlign: 'center' }}>
                    ⚠️ {evalError}
                  </p>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* ── Training history ─────────────────────────────────────────────────── */}
      {trainingHistory.length > 0 && (
        <details style={{ marginBottom: '0.75rem' }}>
          <summary style={{ fontSize: '0.65rem', color: '#aaa', cursor: 'pointer', padding: '0.4rem 0' }}>
            📋 Historial ({trainingHistory.length})
          </summary>
          <div
            className="nes-container"
            style={{ marginTop: '0.5rem', maxHeight: '180px', overflowY: 'auto', padding: '0.5rem' }}
          >
            {trainingHistory.map((entry, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.6rem',
                  color: '#888',
                  padding: '0.2rem 0',
                  borderBottom: i < trainingHistory.length - 1 ? '1px solid #1a2a4a' : 'none',
                }}
              >
                <span>{CATEGORY_NAMES[entry.category]}</span>
                <span style={{ color: entry.score >= 60 ? '#a8e063' : '#ffe066' }}>
                  {entry.score}/100
                </span>
                <span>{new Date(entry.timestamp).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
