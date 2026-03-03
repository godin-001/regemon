import type { Monster } from '../types';

export const MONSTER_TYPES: Monster[] = [
  {
    id: 'pikumon',
    name: 'Pikumon',
    emoji: '🥚',
    babyEmoji: '🐭',
    adultEmoji: '⚡',
    color: '#ffd700',
    description: 'Ratoncito eléctrico travieso. Lleno de energía, le encanta explorar y acumular chispas.',
  },
  {
    id: 'totomon',
    name: 'Totomon',
    emoji: '🌿',
    babyEmoji: '🐾',
    adultEmoji: '🌳',
    color: '#7bc8a4',
    description: 'Espíritu del bosque soñoliento. Dormilón y sabio, la naturaleza lo protege y lo calma.',
  },
  {
    id: 'nyanbot',
    name: 'Nyanbot',
    emoji: '🔵',
    babyEmoji: '🐱',
    adultEmoji: '🤖',
    color: '#00bfff',
    description: 'Gato robot del futuro. Leal e inventivo, siempre tiene el gadget perfecto para cada situación.',
  },
];

export function getMonsterType(id: string): Monster {
  return MONSTER_TYPES.find(m => m.id === id) ?? MONSTER_TYPES[0];
}
