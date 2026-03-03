import type { Monster } from '../types';

export const MONSTER_TYPES: Monster[] = [
  {
    id: 'semilla',
    name: 'Semilla',
    emoji: '🥚',
    babyEmoji: '🌱',
    adultEmoji: '🌿',
    color: '#6bcb77',
    description: 'Tranquilo y resistente. Crece despacio pero con fuerza.',
  },
  {
    id: 'gota',
    name: 'Gota',
    emoji: '🥚',
    babyEmoji: '💧',
    adultEmoji: '🌊',
    color: '#4d96ff',
    description: 'Fluido y adaptable. Necesita mucha atención y cariño.',
  },
  {
    id: 'chispa',
    name: 'Chispa',
    emoji: '🥚',
    babyEmoji: '✨',
    adultEmoji: '⚡',
    color: '#ffd166',
    description: 'Energético y brillante. Se agota rápido pero brilla fuerte.',
  },
];

export function getMonsterType(id: string): Monster {
  return MONSTER_TYPES.find(m => m.id === id) ?? MONSTER_TYPES[0];
}
