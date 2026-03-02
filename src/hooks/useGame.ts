import { useState, useEffect, useCallback } from 'react';
import type { GameState, Monster, LifeStage } from '../types';

const INITIAL_STATE: GameState = {
  chosen: false,
  monster: null,
  stage: 'egg',
  hunger: 80,
  happiness: 80,
  energy: 80,
  age: 0,
  lastUpdate: Date.now(),
};

const STORAGE_KEY = 'regemon_save';

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Game tick — stats decay over time
  useEffect(() => {
    if (!state.chosen || state.stage === 'dead') return;

    const interval = setInterval(() => {
      setState((prev) => {
        const newHunger = Math.max(0, prev.hunger - 2);
        const newHappiness = Math.max(0, prev.happiness - 1);
        const newEnergy = Math.max(0, prev.energy - 1.5);
        const newAge = prev.age + 5;

        let newStage: LifeStage = prev.stage;
        // Muere si hambre O felicidad llegan a 0 (negligencia)
        if (newHunger === 0 || (newHappiness === 0 && newEnergy === 0)) {
          newStage = 'dead';
        } else if (newAge >= 120 && prev.stage === 'baby') {
          newStage = 'adult';
        } else if (newAge >= 30 && prev.stage === 'egg') {
          newStage = 'baby';
        }

        return {
          ...prev,
          hunger: newHunger,
          happiness: newHappiness,
          energy: newEnergy,
          age: newAge,
          stage: newStage,
          lastUpdate: Date.now(),
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [state.chosen, state.stage]);

  const chooseMonster = useCallback((monster: Monster) => {
    setState({ ...INITIAL_STATE, chosen: true, monster, lastUpdate: Date.now() });
  }, []);

  const feed = useCallback(() => {
    setState((prev) => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 25),
      happiness: Math.min(100, prev.happiness + 5),
    }));
  }, []);

  const play = useCallback(() => {
    setState((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.max(0, prev.energy - 15),
    }));
  }, []);

  const sleep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40),
      happiness: Math.min(100, prev.happiness + 5),
    }));
  }, []);

  const chatStatEffect = useCallback((dHunger: number, dHappiness: number, dEnergy: number) => {
    setState((prev) => ({
      ...prev,
      hunger: Math.min(100, Math.max(0, prev.hunger + dHunger)),
      happiness: Math.min(100, Math.max(0, prev.happiness + dHappiness)),
      energy: Math.min(100, Math.max(0, prev.energy + dEnergy)),
    }));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_STATE);
  }, []);

  return { state, chooseMonster, feed, play, sleep, chatStatEffect, reset };
}
