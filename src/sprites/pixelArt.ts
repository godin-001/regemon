// ══════════════════════════════════════════════════════
// REGEMON — Pixel Art Sprites  (16×16 grid, 4 px/cell)
// ══════════════════════════════════════════════════════
// Each string = EXACTLY 16 characters.  '.' = transparent

export type PixelGrid = string[];

export const SPRITE_SIZE = 16; // cells per row/col
export const CELL_SIZE   = 4;  // px per cell at scale=1

// ── Color palette ─────────────────────────────────────
export const COLOR_MAP: Record<string, string | null> = {
  '.': null,

  // ─ Pikumon (electric yellow mouse) ─────────────────
  'Y': '#FFE033',  // bright yellow
  'y': '#B89000',  // dark yellow / shadow
  'o': '#FF7700',  // orange (ear tips, cheek outline)
  'K': '#111122',  // near-black (pupils/outline)
  'R': '#FF4466',  // red cheeks
  'W': '#FFFFFF',  // white eye-shine

  // ─ Totomon (fluffy forest spirit) ──────────────────
  'T': '#A8A8C0',  // totomon grey body
  't': '#606078',  // dark grey shadow
  'G': '#6DC87D',  // totomon ear green
  'g': '#3D7A4D',  // dark green (claws / detail)
  'L': '#E8F4E8',  // light belly

  // ─ Nyanbot (robot cat) ─────────────────────────────
  'B': '#22C0FF',  // nyan blue
  'b': '#0070AA',  // dark blue / shadow
  'S': '#C8D4E8',  // silver chassis
  's': '#7888A0',  // dark silver
  'C': '#00FFFF',  // cyan eyes (glow)
  'P': '#FF90B0',  // pink nose

  // ─ Shared ──────────────────────────────────────────
  'E': '#FFEECC',  // egg cream
  'e': '#DDB840',  // egg shadow / yolk stripe
  'Z': '#888888',  // dead grey
  'z': '#444444',  // dead dark
};

// ══════════════════════════════════════════════════════
// ── PIKUMON (electric yellow mouse — Pikachu-ish) ─────
// ══════════════════════════════════════════════════════

export const PIKUMON_EGG: PixelGrid = [
  '................', // 0
  '.....YYYYY......', // 1
  '....YYYYYYY.....', // 2
  '...YYYYYYYYY....', // 3
  '..YYYYYYYYYYY...', // 4
  '..YYYYYoYYYYY...', // 5  orange lightning stripe
  '..YYYYoYYYYYY...', // 6
  '..YYYYYYYYYYY...', // 7
  '..YYYYYYYYYYY...', // 8
  '..YYYYYYYYYYY...', // 9
  '...YYYYYYYYY....', // 10
  '...YYYYYYYYY....', // 11
  '....YYYYYYY.....', // 12
  '.....YYYYY......', // 13
  '......YYY.......', // 14
  '................', // 15
];

export const PIKUMON_BABY: PixelGrid = [
  '................', // 0
  '...oYo...oYo....', // 1  tiny pointy ears
  '..oYYYo.oYYYo...', // 2
  '..YYYYYYYYYYYY..', // 3  round head
  '..YYYYYYYYYYYY..', // 4
  '..YYKyYYYKyYYY..', // 5  eyes (K=pupil, y=iris shadow)
  '..YYyWYYYyWYYY..', // 6  eye shine
  '..YYYYYYYYYYYY..', // 7
  '..YYRYYYYYRYYY..', // 8  red cheeks
  '..YYYYYYYYYYYY..', // 9
  '..YYYY.YYYYY....', // 10 small body
  '..YYY...YYYY....', // 11
  '..YY.....YYY....', // 12 stubby legs
  '................', // 13
  '................', // 14
  '................', // 15
];

export const PIKUMON_ADULT: PixelGrid = [
  '..oYo.....oYo...', // 0  pointed ears with orange tips
  '.oYYYo...oYYYo..', // 1
  '.oYYYo...oYYYo..', // 2
  '..YYYYYYYYYYYY..', // 3  full round head
  '..YYYYYYYYYYYY..', // 4
  '..YYKyYYYKyYYY..', // 5  eyes
  '..YYyWYYYyWYYY..', // 6  shine
  '..YYYYYYYYYYYY..', // 7
  '..YYRYYYYYRYYY..', // 8  red cheeks
  '..YYYY.YY.YYYY..', // 9  subtle smile
  '...YYYYYYYYYY...', // 10 body
  '...YYYYYYYYYY...', // 11
  '...YYY....YYY...', // 12 legs
  '...YYY....YYY...', // 13
  '...YY......YY...', // 14 feet
  '................', // 15
];

// ══════════════════════════════════════════════════════
// ── TOTOMON (fluffy forest spirit — Totoro-ish) ───────
// ══════════════════════════════════════════════════════

export const TOTOMON_EGG: PixelGrid = [
  '................', // 0
  '.....GGGGG......', // 1
  '....GGGGGGG.....', // 2
  '...GGGGGGGGG....', // 3
  '..GGGGGGGGGGG...', // 4
  '..GGGGGGGGGGG...', // 5
  '..GGGgGGGGGGG...', // 6  dark stripe
  '..GGGGgGGGGGG...', // 7
  '..GGGGGGGGGGG...', // 8
  '..GGGGGGGGGGG...', // 9
  '...GGGGGGGGG....', // 10
  '...GGGGGGGGG....', // 11
  '....GGGGGGG.....', // 12
  '.....GGGGG......', // 13
  '......GGG.......', // 14
  '................', // 15
];

export const TOTOMON_BABY: PixelGrid = [
  '................', // 0
  '...gGg...gGg....', // 1  round pointy ears
  '..gGGGg.gGGGg...', // 2
  '..TTTTTTTTTTTT..', // 3  round grey head
  '..TTTTTTTTTTTT..', // 4
  '..TTKgTTTKgTTT..', // 5  eyes (K=pupil, g=iris)
  '..TTgWTTTgWTTT..', // 6  shine
  '..TTTTTTTTTTTT..', // 7
  '..TTLLLLLLLLTT..', // 8  white belly
  '..TTLLLLLLLLTT..', // 9
  '...TTTTTTTTTT...', // 10 body
  '...TTTTTTTTTT...', // 11
  '...TTT....TTT...', // 12 stubby legs
  '...TT......TT...', // 13
  '................', // 14
  '................', // 15
];

export const TOTOMON_ADULT: PixelGrid = [
  '..gGg.....gGg...', // 0  large pointed ears
  '.gGGGg...gGGGg..', // 1
  '.gGGGg...gGGGg..', // 2
  '..TTTTTTTTTTTT..', // 3  big round head
  '..TTTTTTTTTTTT..', // 4
  '..TTKgTTTTKgTT..', // 5  eyes wider apart
  '..TTgWTTTTgWTT..', // 6  shine
  '..TTTTTTTTTTTT..', // 7
  '..TTLLLLLLLLTT..', // 8  large belly
  '..TTLLLLLLLLTT..', // 9
  '..TTLLLLLLLLTT..', // 10
  '...TTTTTTTTTT...', // 11 lower body
  '...TTT....TTT...', // 12 legs
  '...TT......TT...', // 13
  '...tg......gt...', // 14 dark claws
  '................', // 15
];

// ══════════════════════════════════════════════════════
// ── NYANBOT (robot cat) ───────────────────────────────
// ══════════════════════════════════════════════════════

export const NYANBOT_EGG: PixelGrid = [
  '................', // 0
  '.....BBBBB......', // 1
  '....BBBBBBB.....', // 2
  '...BBBBBBBBB....', // 3
  '..BBBBBBBBBBB...', // 4
  '..BBBBsBBBBBB...', // 5  silver circuit line
  '..BBBBBsBBBBB...', // 6
  '..BBBBBBBBBBB...', // 7
  '..BBsBBBBBsBB...', // 8  horizontal circuit
  '..BBBBBBBBBBB...', // 9
  '...BBBBBBBBB....', // 10
  '...BBBBBBBBB....', // 11
  '....BBBBBBB.....', // 12
  '.....BBBBB......', // 13
  '......BBB.......', // 14
  '................', // 15
];

export const NYANBOT_BABY: PixelGrid = [
  '................', // 0
  '...bBb...bBb....', // 1  angular robot ears
  '..bBBBb.bBBBb...', // 2
  '..BBBBBBBBBBBB..', // 3  square-ish head
  '..BBBBBBBBBBBB..', // 4
  '..BBCsBBBCsBBB..', // 5  glowing cyan eyes
  '..BBsCBBBsCBBB..', // 6  eye detail
  '..BBBBBBBBBBBB..', // 7
  '..BBsBBBBBBsBB..', // 8  visor line
  '..BBSSSSSSSBBB..', // 9  silver chest plate
  '..BBSSSSSSSBBB..', // 10
  '...BBBBBBBBBB...', // 11
  '...BBB....BBB...', // 12 legs
  '...BB......BB...', // 13
  '................', // 14
  '................', // 15
];

export const NYANBOT_ADULT: PixelGrid = [
  '..bBb.....bBb...', // 0  sharp robot cat ears
  '.bBBBb...bBBBb..', // 1
  '.bBBBb...bBBBb..', // 2
  '..BBBBBBBBBBBB..', // 3  full head
  '..BBBBBBBBBBBB..', // 4
  '..BBCsBBBBCsBB..', // 5  glowing eyes
  '..BBsCBBBBsCBB..', // 6
  '..BBBBBBBBBBBB..', // 7
  '..BBsBBBBBBsBB..', // 8  visor stripe
  '..SSSSSSSSSSSS..', // 9  silver armor chest
  '..SSSSSSSSSSSS..', // 10
  '...SSSSSSSSSS...', // 11
  '...BBB....BBB...', // 12 legs
  '...BB......BB...', // 13
  '...bb......bb...', // 14 dark boots
  '................', // 15
];

// ── Sprite lookup ──────────────────────────────────────
type SpriteKey =
  | 'pikumon_egg'   | 'pikumon_baby'   | 'pikumon_adult'
  | 'totomon_egg'   | 'totomon_baby'   | 'totomon_adult'
  | 'nyanbot_egg'   | 'nyanbot_baby'   | 'nyanbot_adult';

export const SPRITES: Record<SpriteKey, PixelGrid> = {
  pikumon_egg:    PIKUMON_EGG,
  pikumon_baby:   PIKUMON_BABY,
  pikumon_adult:  PIKUMON_ADULT,
  totomon_egg:    TOTOMON_EGG,
  totomon_baby:   TOTOMON_BABY,
  totomon_adult:  TOTOMON_ADULT,
  nyanbot_egg:    NYANBOT_EGG,
  nyanbot_baby:   NYANBOT_BABY,
  nyanbot_adult:  NYANBOT_ADULT,
};

export function getSprite(monsterId: string, stage: string): PixelGrid {
  const key = `${monsterId}_${stage}` as SpriteKey;
  return SPRITES[key] ?? PIKUMON_EGG;
}
