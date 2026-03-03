import { useState, useEffect, useCallback } from 'react';
import type { GameState, Monster, LifeStage } from '../types';

const ELEMENT_PROFILES = {
  semilla: {
    hungerDecay: 2.0,
    happinessDecay: 0.8,
    energyDecay: 1.5,
    initialHunger: 85,
    initialHappiness: 80,
    initialEnergy: 75,
    feedBonus: 25,
    playBonus: 20,
    sleepBonus: 50,
  },
  gota: {
    hungerDecay: 1.2,
    happinessDecay: 2.8,
    energyDecay: 1.5,
    initialHunger: 75,
    initialHappiness: 90,
    initialEnergy: 80,
    feedBonus: 20,
    playBonus: 38,
    sleepBonus: 45,
  },
  chispa: {
    hungerDecay: 2.2,
    happinessDecay: 0.7,
    energyDecay: 3.5,
    initialHunger: 80,
    initialHappiness: 85,
    initialEnergy: 95,
    feedBonus: 28,
    playBonus: 30,
    sleepBonus: 42,
  },
} as const;

type ElementProfile = typeof ELEMENT_PROFILES[keyof typeof ELEMENT_PROFILES];

function getProfile(monster: Monster | null): ElementProfile {
  if (!monster) return ELEMENT_PROFILES.semilla;
  return ELEMENT_PROFILES[monster.id as keyof typeof ELEMENT_PROFILES] ?? ELEMENT_PROFILES.semilla;
}

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

function getStorageKey(storageKey: string) {
  return `${storageKey}_game`;
}

function loadState(storageKey: string): GameState {
  try {
    const saved = localStorage.getItem(getStorageKey(storageKey));
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  } catch {
    return INITIAL_STATE;
  }
}

function saveState(storageKey: string, state: GameState) {
  try {
    localStorage.setItem(getStorageKey(storageKey), JSON.stringify(state));
  } catch { /* ignore */ }
}

export function useGame(storageKey: string) {
  const [state, setState] = useState<GameState>(() => loadState(storageKey));

  // Reload when user changes (login/logout)
  useEffect(() => {
    setState(loadState(storageKey));
  }, [storageKey]);

  // Save on every state change
  useEffect(() => {
    saveState(storageKey, state);
  }, [storageKey, state]);

  // Game tick
  useEffect(() => {
    if (!state.chosen || state.stage === 'dead') return;

    const interval = setInterval(() => {
      setState((prev) => {
        const profile = getProfile(prev.monster);
        const newHunger    = Math.max(0, prev.hunger    - profile.hungerDecay);
        const newHappiness = Math.max(0, prev.happiness - profile.happinessDecay);
        const newEnergy    = Math.max(0, prev.energy    - profile.energyDecay);
        const newAge       = prev.age + 5;

        let newStage: LifeStage = prev.stage;
        if (newHunger === 0 || (newHappiness <= 0 && newEnergy <= 0)) {
          newStage = 'dead';
        } else if (newAge >= 120 && prev.stage === 'baby') {
          newStage = 'adult';
        } else if (newAge >= 30 && prev.stage === 'egg') {
          newStage = 'baby';
        }

        return { ...prev, hunger: newHunger, happiness: newHappiness, energy: newEnergy, age: newAge, stage: newStage, lastUpdate: Date.now() };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [state.chosen, state.stage]);

  const chooseMonster = useCallback((monster: Monster) => {
    const profile = getProfile(monster);
    setState({
      ...INITIAL_STATE,
      chosen: true,
      monster,
      hunger:    profile.initialHunger,
      happiness: profile.initialHappiness,
      energy:    profile.initialEnergy,
      lastUpdate: Date.now(),
    });
  }, []);

  const feed = useCallback(() => {
    setState((prev) => {
      const { feedBonus } = getProfile(prev.monster);
      return { ...prev, hunger: Math.min(100, prev.hunger + feedBonus), happiness: Math.min(100, prev.happiness + 5) };
    });
  }, []);

  const play = useCallback(() => {
    setState((prev) => {
      const { playBonus } = getProfile(prev.monster);
      return { ...prev, happiness: Math.min(100, prev.happiness + playBonus), energy: Math.max(0, prev.energy - 15) };
    });
  }, []);

  const sleep = useCallback(() => {
    setState((prev) => {
      const { sleepBonus } = getProfile(prev.monster);
      return { ...prev, energy: Math.min(100, prev.energy + sleepBonus), happiness: Math.min(100, prev.happiness + 5) };
    });
  }, []);

  const chatStatEffect = useCallback((dHunger: number, dHappiness: number, dEnergy: number) => {
    setState((prev) => ({
      ...prev,
      hunger:    Math.min(100, Math.max(0, prev.hunger    + dHunger)),
      happiness: Math.min(100, Math.max(0, prev.happiness + dHappiness)),
      energy:    Math.min(100, Math.max(0, prev.energy    + dEnergy)),
    }));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(getStorageKey(storageKey));
    setState(INITIAL_STATE);
  }, [storageKey]);

  return { state, chooseMonster, feed, play, sleep, chatStatEffect, reset };
}
