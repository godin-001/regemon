export type ElementType = 'fire' | 'water' | 'earth' | 'air';
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
  hunger: number;      // 0-100 (100 = full)
  happiness: number;   // 0-100 (100 = max happy)
  energy: number;      // 0-100 (100 = full energy)
  age: number;         // in seconds
  lastUpdate: number;
}
