// ══════════════════════════════════════════════════
// REGEMON — Pixel Art Sprites  (12×12 grid, 4px/cell)
// ══════════════════════════════════════════════════
// Each string = one row of exactly 12 characters
// '.' = transparent

export type PixelGrid = string[];

export const SPRITE_SIZE = 12; // cells per row/col
export const CELL_SIZE   = 4;  // px per cell at scale=1

export const COLOR_MAP: Record<string, string | null> = {
  '.': null,
  // Pikumon palette (yellow mouse)
  'Y': '#FFD700', // yellow
  'y': '#CC9900', // dark yellow / shadow
  'K': '#1A1A2E', // near-black (eyes)
  'R': '#FF6688', // red cheek
  'W': '#FFFFFF', // white shine
  // Totomon palette (forest spirit)
  'T': '#9898A8', // totomon grey
  't': '#555565', // dark grey
  'G': '#7BC8A4', // totomon green
  'g': '#4A9070', // dark green
  'L': '#E8F8F0', // light belly
  // Nyanbot palette (robot cat)
  'B': '#00BFFF', // nyanbot blue
  'b': '#0077AA', // dark blue
  'S': '#C0C8D8', // silver
  's': '#808898', // dark silver
  'P': '#FFB0C8', // pink nose
  // Shared
  'E': '#FFFBE0', // egg cream
  'e': '#E8D060', // egg shadow / base
  'Z': '#444444', // dead grey
  'z': '#222222', // dead dark
};

// ── PIKUMON (yellow electric mouse) ───────────────

export const PIKUMON_EGG: PixelGrid = [
  '....YYYY....',
  '...YYWYYY...',
  '..YYYYYYYY..',
  '.YYYYYYYYYY.',
  '.YYYYYYYYYY.',
  '.YYYYYYYYYY.',
  '.YYYYYYYYYY.',
  '.YYYYYYYYYY.',
  '..YYYYYYYY..',
  '..YYYYYYYY..',
  '...YYYYYY...',
  '....YYYY....',
];

export const PIKUMON_BABY: PixelGrid = [
  '.y......y...',
  'yYY....YYy..',
  'YYYYYYYYYYYY',
  'YYYYYYYYYYYY',
  'YYKyYYYYKYY.',
  'YYYYYYYYYYYY',
  'YYRYYYYYRYYY',
  'YYY..yy..YYY',
  '.YYYYYYYYYY.',
  '..YYYYYYYY..',
  '...YYYYYY...',
  '....YYYY....',
];

export const PIKUMON_ADULT: PixelGrid = [
  '.y......y...',
  'yYY....YYy..',
  'YYYYYYYYYYYY',
  'YYYYYYYYYYYY',
  'YYKyYYYYKYY.',
  'YYYYYYYYYYYY',
  'YYRYYYYYRYYY',
  'YYY..YY..YYY',
  '.YyYYYYYYy..',
  '..YYYYyYYY..',
  '....YYY.....',
  '.....Yy.....',
];

// ── TOTOMON (fluffy forest spirit) ────────────────

export const TOTOMON_EGG: PixelGrid = [
  '....gG......',
  '...GGgg.....',
  '....GGGG....',
  '...GGGGGG...',
  '..GGGGGGGG..',
  '.GGGGWGGGGG.',
  '.GGGGGGGGGG.',
  '.GGGGGGGGGG.',
  '..GGGGGGGG..',
  '..GGGGGGGG..',
  '...GGGGGG...',
  '....GGGG....',
];

export const TOTOMON_BABY: PixelGrid = [
  '....TTTT....',
  '..TTTTTTTT..',
  '.TTTTTTTTTT.',
  'TTTTTTTTTTTT',
  'TTKTTgTTKTTT',
  'TTTTTTTTTTTT',
  'TTLLLLLLLLTT',
  'TTLLLLLLLLTT',
  '.TTTTTTTTTT.',
  '..TTTTTTTT..',
  '....TTTT....',
  '............',
];

export const TOTOMON_ADULT: PixelGrid = [
  '..gGGGGGGg..',
  '.TTTTTTTTTT.',
  'TTTTTTTTTTTT',
  'TTKTTTTTKTgT',
  'TTTTTTTTTTTT',
  'TTLLLLLLLLTT',
  'TTLLLLLLLLTT',
  'TTTTTTTTTTTT',
  '.TTTTTTTTTT.',
  '..TTgTTgTT..',
  '....T..T....',
  '............',
];

// ── NYANBOT (robot cat) ───────────────────────────

export const NYANBOT_EGG: PixelGrid = [
  '....BBBB....',
  '...BbWBBB...',
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  '.BBBBBBBBBB.',
  '.BBBBBBBBBB.',
  '.BBBBBBBBBB.',
  '.BBBBBBBBBB.',
  '..BBBBBBBB..',
  '..BBBBBBBB..',
  '...BBBBBB...',
  '....BBBB....',
];

export const NYANBOT_BABY: PixelGrid = [
  '.B......B...',
  'BBB....BBB..',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BSbBBBBBbSBB',
  'BBBBBBBBBBBB',
  'BbBBBPBBbBBB',
  'BBB....BBBBB',
  '.BBBBBBBBBB.',
  '..BBBBBBBB..',
  '...BBBBBB...',
  '....BBBB....',
];

export const NYANBOT_ADULT: PixelGrid = [
  '...S..S.....',
  '...SbBS.....',
  '.BBBbbBBBB..',
  'BBBBBBBBBBBB',
  'BSSSbBbSSSBB',
  'BBBBBBBBBBBB',
  'BBbBBPBBbBBB',
  'SBBB....BBBS',
  '.BBBBBBBBBB.',
  '..sBBBBBs...',
  '..B....B....',
  '............',
];

// ── Sprite lookup ─────────────────────────────────

type SpriteKey = 'pikumon_egg' | 'pikumon_baby' | 'pikumon_adult'
               | 'totomon_egg' | 'totomon_baby' | 'totomon_adult'
               | 'nyanbot_egg' | 'nyanbot_baby' | 'nyanbot_adult';

export const SPRITES: Record<SpriteKey, PixelGrid> = {
  pikumon_egg:   PIKUMON_EGG,
  pikumon_baby:  PIKUMON_BABY,
  pikumon_adult: PIKUMON_ADULT,
  totomon_egg:   TOTOMON_EGG,
  totomon_baby:  TOTOMON_BABY,
  totomon_adult: TOTOMON_ADULT,
  nyanbot_egg:   NYANBOT_EGG,
  nyanbot_baby:  NYANBOT_BABY,
  nyanbot_adult: NYANBOT_ADULT,
};

export function getSprite(monsterId: string, stage: string): PixelGrid {
  const key = `${monsterId}_${stage}` as SpriteKey;
  return SPRITES[key] ?? PIKUMON_EGG;
}
