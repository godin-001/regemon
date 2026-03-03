import { useState, useEffect, useCallback } from 'react';
import type { GameState, Monster, LifeStage } from '../types';

// Decay rates per tick (tick = 5s)
// Pikumon ⚡: energía se agota rápido, hambre ~12 min
// Totomon 🌳: todo lento y tranquilo, ~18 min
// Nyanbot 🤖: felicidad cae rápido si lo ignoras, hambre ~20 min
const ELEMENT_PROFILES = {
  pikumon: {
    // Ratoncito eléctrico: energía se drena rápido, pero come bastante
    hungerDecay: 0.55,
    happinessDecay: 0.18,
    energyDecay: 0.9,
    initialHunger: 80,
    initialHappiness: 85,
    initialEnergy: 95,
    feedBonus: 28,
    playBonus: 30,
    sleepBonus: 42,
  },
  totomon: {
    // Espíritu del bosque: muy tranquilo, le encanta dormir
    hungerDecay: 0.4,
    happinessDecay: 0.15,
    energyDecay: 0.3,
    initialHunger: 85,
    initialHappiness: 80,
    initialEnergy: 70,
    feedBonus: 22,
    playBonus: 18,
    sleepBonus: 65,
  },
  nyanbot: {
    // Gato robot: necesita atención y juego, pierde felicidad si lo ignoras
    hungerDecay: 0.3,
    happinessDecay: 0.65,
    energyDecay: 0.35,
    initialHunger: 75,
    initialHappiness: 90,
    initialEnergy: 80,
    feedBonus: 20,
    playBonus: 40,
    sleepBonus: 45,
  },
} as const;

type ElementProfile = typeof ELEMENT_PROFILES[keyof typeof ELEMENT_PROFILES];

function getProfile(monster: Monster | null): ElementProfile {
  if (!monster) return ELEMENT_PROFILES.pikumon;
  return ELEMENT_PROFILES[monster.id as keyof typeof ELEMENT_PROFILES] ?? ELEMENT_PROFILES.pikumon;
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

    const interval = setInterval(() => { // tick cada 5s
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
    }, 5000);

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
