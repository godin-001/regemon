export type ElementType = 'semilla' | 'gota' | 'chispa';
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
