export type ElementType = 'pikumon' | 'totomon' | 'nyanbot';
export type LifeStage = 'egg' | 'baby' | 'adult' | 'dead';

export interface Monster {
  id: ElementType;
  name: string;
  emoji: string;
  babyEmoji: string;
  adultEmoji: string;
  color: string;
  description: string;
}

export interface GameState {
  chosen: boolean;
  monster: Monster | null;
  stage: LifeStage;
  hunger: number;
  happiness: number;
  energy: number;
  age: number;
  lastUpdate: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Memory {
  key: string;
  value: string;
  savedAt: number;
}

// ─── Training System ────────────────────────────────────────────────────────
export type TrainingCategory = 'codigo' | 'diseno' | 'proyecto' | 'aprendizaje';

export interface TrainingEntry {
  score: number;
  category: TrainingCategory;
  timestamp: number;
}

export interface TrainingState {
  totalPoints: number;
  trainingStage: 1 | 2 | 3;
  trainingHistory: TrainingEntry[];
}

export interface EvaluateResult {
  score: number;
  feedback: string;
  points: number;
  tokens: number;
  dHunger: number;
  dHappiness: number;
  dEnergy: number;
  didEvolve: boolean;
  newStage: 1 | 2 | 3;
}
