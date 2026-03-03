import type { Monster } from '../types';

export const MONSTER_TYPES: Monster[] = [
  {
    id: 'unicornio',
    name: 'Unicornio',
    emoji: '🦄',
    babyEmoji: '🌟',
    adultEmoji: '✨',
    color: '#FF88DD',
    description: 'Criatura mágica de luz y arcoíris. Transforma tristeza en alegría con solo aparecer.',
  },
  {
    id: 'dragon',
    name: 'Dragón',
    emoji: '🐉',
    babyEmoji: '🔥',
    adultEmoji: '🌋',
    color: '#FF6622',
    description: 'Guardián ancestral del fuego. Feroz pero leal, protege a quien se gana su respeto.',
  },
  {
    id: 'alebrije',
    name: 'Alebrije',
    emoji: '🎨',
    babyEmoji: '🌈',
    adultEmoji: '🦋',
    color: '#DD44FF',
    description: 'Ser fantástico de colores infinitos. Mezcla de jaguar, quetzal y mariposa de Oaxaca.',
  },
];

export function getMonsterType(id: string): Monster {
  return MONSTER_TYPES.find(m => m.id === id) ?? MONSTER_TYPES[0];
}
