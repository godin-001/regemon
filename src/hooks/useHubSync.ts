// ════════════════════════════════════════════════════════════
// useHubSync.ts — Auto-sync con el HUB cada 5 min
// ════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import { syncHub, isRegistered, getHubId } from './useHub';
import type { GameState } from '../types';
import type { TrainingState } from '../types';

const SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutos

export function useHubSync(gameState: GameState, training: TrainingState) {
  const lastSyncRef = useRef<number>(0);

  async function doSync() {
    if (!isRegistered()) return;
    const hubId = getHubId();
    if (!hubId) return;

    try {
      await syncHub({
        regenmonId: hubId,
        stats: {
          happiness: Math.round(gameState.happiness),
          energy: Math.round(gameState.energy),
          hunger: Math.round(gameState.hunger),
        },
        totalPoints: training.totalPoints,
        trainingHistory: training.trainingHistory ?? [],
      });
      lastSyncRef.current = Date.now();
    } catch {
      // silently fail — hub resting
    }
  }

  // Sync periodicamente
  useEffect(() => {
    if (!isRegistered()) return;
    const interval = setInterval(doSync, SYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [gameState.happiness, gameState.energy, gameState.hunger, training.totalPoints]);

  // Función para sync manual (post-entrenamiento)
  return { syncNow: doSync };
}
