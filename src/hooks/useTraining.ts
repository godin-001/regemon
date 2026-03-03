import { useState, useCallback, useEffect } from 'react';
import type { TrainingCategory, TrainingState, EvaluateResult } from '../types';

// ─── Constants ───────────────────────────────────────────────────────────────

export const STAGE_LABELS: Record<1 | 2 | 3, string> = {
  1: '🥚 Bebé',
  2: '🐣 Joven',
  3: '🐉 Adulto',
};

export const STAGE_THRESHOLDS: Record<1 | 2 | 3, number> = {
  1: 0,
  2: 500,
  3: 1500,
};

export const CATEGORY_NAMES: Record<TrainingCategory, string> = {
  codigo: '📝 Tareas',
  diseno: '🎨 Que cool',
  proyecto: '🚀 Proyecto',
  aprendizaje: '📚 Aprendizaje',
};

export const CATEGORY_CRITERIA: Record<TrainingCategory, string> = {
  codigo: 'organización, buenas prácticas y complejidad del trabajo',
  diseno: 'estética, colores, tipografía y creatividad visual en UI/UX y diseño gráfico',
  proyecto: 'funcionalidad, calidad, complejidad y completitud del proyecto',
  aprendizaje: 'esfuerzo demostrado, comprensión del tema y aplicación práctica',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getStage(points: number): 1 | 2 | 3 {
  if (points >= 1500) return 3;
  if (points >= 500) return 2;
  return 1;
}

function nextThreshold(stage: 1 | 2 | 3): number {
  if (stage === 1) return 500;
  if (stage === 2) return 1500;
  return 1500;
}

const INITIAL_TRAINING: TrainingState = {
  totalPoints: 0,
  trainingStage: 1,
  trainingHistory: [],
};

function loadTraining(storageKey: string): TrainingState {
  try {
    const raw = localStorage.getItem(`${storageKey}_training`);
    return raw ? JSON.parse(raw) : INITIAL_TRAINING;
  } catch {
    return INITIAL_TRAINING;
  }
}

function saveTraining(storageKey: string, state: TrainingState) {
  try {
    localStorage.setItem(`${storageKey}_training`, JSON.stringify(state));
  } catch { /* ignore */ }
}

// ─── OpenAI Vision call ───────────────────────────────────────────────────────

async function evaluateWithAI(
  imageBase64: string,
  category: TrainingCategory,
): Promise<{ score: number; feedback: string }> {
  const enc = import.meta.env.VITE_OAI_ENC ?? '';
  let apiKey = '';
  try { apiKey = enc ? atob(enc) : ''; } catch { apiKey = ''; }

  if (!apiKey.startsWith('sk-')) {
    const mockScore = 40 + Math.floor(Math.random() * 41); // 40–80
    return {
      score: mockScore,
      feedback: '⚠️ Sistema de evaluación temporalmente no disponible. Score por defecto asignado.',
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 200,
        messages: [
          {
            role: 'system',
            content:
              'Eres un profesor amigable en un juego educativo llamado Regemon. SIEMPRE evalúa la imagen sin importar qué contenga. Responde SIEMPRE en este formato exacto y NADA MÁS: "Score: [número]/100. [1-2 oraciones de feedback constructivo en español]"',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Categoría: ${CATEGORY_NAMES[category]}. Criterios: ${CATEGORY_CRITERIA[category]}. Evalúa esta imagen y da un puntaje justo y motivador.`,
              },
              {
                type: 'image_url',
                image_url: { url: imageBase64, detail: 'low' },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) throw new Error(`API ${response.status}`);

    const data = await response.json();
    const text: string = data.choices?.[0]?.message?.content ?? '';

    const scoreMatch = text.match(/Score:\s*(\d+)/i);
    const score = scoreMatch
      ? Math.min(100, Math.max(0, parseInt(scoreMatch[1], 10)))
      : 50;
    const feedback = text.replace(/Score:\s*\d+\/100\.?\s*/i, '').trim() || text;

    return { score, feedback };
  } catch {
    const fallback = 40 + Math.floor(Math.random() * 21); // 40–60
    return {
      score: fallback,
      feedback: '⚠️ Sistema de evaluación temporalmente no disponible. Score por defecto asignado.',
    };
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTraining(storageKey: string) {
  const [training, setTraining] = useState<TrainingState>(() => loadTraining(storageKey));
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    setTraining(loadTraining(storageKey));
  }, [storageKey]);

  useEffect(() => {
    saveTraining(storageKey, training);
  }, [storageKey, training]);

  const evaluate = useCallback(
    async (
      imageBase64: string,
      category: TrainingCategory,
      onStatEffect: (dHunger: number, dHappiness: number, dEnergy: number) => void,
      earnDirect: (amount: number, label: string) => void,
    ): Promise<EvaluateResult> => {
      setIsEvaluating(true);

      try {
        const { score, feedback } = await evaluateWithAI(imageBase64, category);

        // Rewards
        const points = score;
        const tokens = Math.floor(score * 0.5);

        // Stat effects by score bracket
        let dHunger = 0, dHappiness = 0, dEnergy = 0;
        if (score >= 80) {
          dHunger = 15; dHappiness = 15; dEnergy = -20;
        } else if (score >= 60) {
          dHunger = 12; dHappiness = 8; dEnergy = -15;
        } else if (score >= 40) {
          dHunger = 10; dHappiness = 3; dEnergy = -12;
        } else {
          dHunger = 10; dHappiness = -10; dEnergy = -15;
        }

        onStatEffect(dHunger, dHappiness, dEnergy);
        earnDirect(tokens, `🎓 Entrenamiento +${tokens} 🍊`);

        // Compute evolution BEFORE setState (using current snapshot from closure)
        const newTotalPoints = training.totalPoints + points;
        const newStage = getStage(newTotalPoints);
        const didEvolve = newStage > training.trainingStage;

        // Update training state
        setTraining(prev => {
          const prevPoints = prev.totalPoints + points;
          const entry = { score, category, timestamp: Date.now() };
          return {
            totalPoints: prevPoints,
            trainingStage: getStage(prevPoints),
            trainingHistory: [entry, ...prev.trainingHistory].slice(0, 20),
          };
        });

        if (didEvolve) {
          earnDirect(100, `🎉 Bonus Evolución +100 🍊`);
        }

        return { score, feedback, points, tokens, dHunger, dHappiness, dEnergy, didEvolve, newStage };

      } catch (err) {
        console.error('useTraining.evaluate error:', err);
        // Graceful fallback — default score so the UI recovers
        const fallbackScore = 45 + Math.floor(Math.random() * 16); // 45-60
        const fallbackTokens = Math.floor(fallbackScore * 0.5);
        earnDirect(fallbackTokens, `🎓 Entrenamiento +${fallbackTokens} 🍊`);
        return {
          score: fallbackScore,
          feedback: '⚠️ Sistema de evaluación temporalmente no disponible. Score por defecto asignado.',
          points: fallbackScore,
          tokens: fallbackTokens,
          dHunger: 10, dHappiness: 3, dEnergy: -12,
          didEvolve: false,
          newStage: training.trainingStage,
        };
      } finally {
        setIsEvaluating(false);
      }
    },
    [training],
  );

  return {
    training,
    isEvaluating,
    evaluate,
    STAGE_LABELS,
    STAGE_THRESHOLDS,
    CATEGORY_NAMES,
    nextThreshold,
  };
}
