// ═══════════════════════════════════════════════════════════
// REGEMON — Anime SVG Sprites  |  Unicornio · Dragón · Alebrije
// ═══════════════════════════════════════════════════════════
import React from 'react';

interface Props {
  monsterId: string;
  stage: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Sh = ({ cx = 48, cy = 90, rx = 24 }: { cx?: number; cy?: number; rx?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={5} fill="rgba(0,0,0,0.25)" />
);

// ════════════════════════════════════════════════════════════
// UNICORNIO 🦄 — Magical Rainbow Unicorn
// ════════════════════════════════════════════════════════════
function UnicornioEgg() {
  return (
    <>
      <Sh cy={88} rx={26} />
      {/* pearl egg */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#FFF0F8" />
      <ellipse cx="38" cy="28" rx="13" ry="18" fill="white" opacity="0.5" />
      {/* rainbow swirl */}
      <path d="M 42,18 Q 60,26 58,40 Q 56,52 44,54 Q 34,56 34,44 Q 34,32 46,32"
        fill="none" stroke="#FF88CC" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M 44,22 Q 58,30 56,42 Q 54,50 46,52"
        fill="none" stroke="#88CCFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M 46,26 Q 56,34 54,44"
        fill="none" stroke="#FFEE44" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* sparkles */}
      <circle cx="62" cy="28" r="3" fill="#FFDD44" opacity="0.9" />
      <circle cx="66" cy="36" r="2" fill="#FF88CC" opacity="0.8" />
      <circle cx="34" cy="60" r="2.5" fill="#88CCFF" opacity="0.8" />
    </>
  );
}

function UnicornioBaby() {
  return (
    <>
      <Sh cy={90} rx={20} />
      {/* horn — golden spiral */}
      <polygon points="46,4 44,22 52,22" fill="#FFD700" />
      <polygon points="47,8 46,18 50,18" fill="#FFF099" opacity="0.7" />
      <line x1="48" y1="4" x2="48" y2="22" stroke="#CC9900" strokeWidth="1" opacity="0.5" />

      {/* flowing mane — left */}
      <path d="M 22,36 Q 16,46 18,58" fill="none" stroke="#FF44CC" strokeWidth="6" strokeLinecap="round" />
      <path d="M 22,38 Q 15,50 17,62" fill="none" stroke="#FFAA00" strokeWidth="4" strokeLinecap="round" />
      <path d="M 24,40 Q 16,52 18,64" fill="none" stroke="#88CCFF" strokeWidth="3" strokeLinecap="round" />

      {/* body — white round */}
      <ellipse cx="48" cy="56" rx="30" ry="28" fill="#FFF8FF" />
      <ellipse cx="48" cy="56" rx="30" ry="28" fill="none" stroke="#FFCCEE" strokeWidth="1.5" />

      {/* mane — top right flowing */}
      <path d="M 62,32 Q 72,40 70,54" fill="none" stroke="#AA44FF" strokeWidth="6" strokeLinecap="round" />
      <path d="M 64,34 Q 76,42 74,58" fill="none" stroke="#FF44CC" strokeWidth="4" strokeLinecap="round" />
      <path d="M 66,38 Q 78,48 74,62" fill="none" stroke="#44DDFF" strokeWidth="3" strokeLinecap="round" />

      {/* big sparkly eyes */}
      <circle cx="36" cy="50" r="11" fill="#1A0A1A" />
      <circle cx="36" cy="50" r="8" fill="#CC44AA" />
      <circle cx="36" cy="50" r="5" fill="#FF88DD" />
      <circle cx="39" cy="47" r="3.5" fill="white" opacity="0.95" />
      <circle cx="34" cy="54" r="1.5" fill="white" opacity="0.6" />
      <circle cx="60" cy="50" r="11" fill="#1A0A1A" />
      <circle cx="60" cy="50" r="8" fill="#CC44AA" />
      <circle cx="60" cy="50" r="5" fill="#FF88DD" />
      <circle cx="63" cy="47" r="3.5" fill="white" opacity="0.95" />
      <circle cx="58" cy="54" r="1.5" fill="white" opacity="0.6" />

      {/* small nose */}
      <ellipse cx="48" cy="62" rx="4" ry="3" fill="#FFCCEE" />
      <circle cx="46" cy="62" r="1.5" fill="#CC6699" />
      <circle cx="50" cy="62" r="1.5" fill="#CC6699" />

      {/* sparkle stars around */}
      <text x="14" y="46" fontSize="10" fill="#FFDD44" opacity="0.9">✦</text>
      <text x="76" y="44" fontSize="8" fill="#FF88CC" opacity="0.8">✦</text>
      <text x="18" y="70" fontSize="7" fill="#88CCFF" opacity="0.7">✦</text>

      {/* hooves */}
      <ellipse cx="36" cy="82" rx="11" ry="7" fill="#E8D8E8" />
      <ellipse cx="60" cy="82" rx="11" ry="7" fill="#E8D8E8" />
    </>
  );
}

function UnicornioAdult() {
  return (
    <>
      <Sh cy={91} rx={28} />
      {/* tall spiraling horn */}
      <polygon points="44,2 40,24 56,24" fill="#FFD700" />
      <polygon points="46,4 43,20 53,20" fill="#FFF099" opacity="0.7" />
      {/* spiral lines on horn */}
      <line x1="44" y1="22" x2="48" y2="4" stroke="#CC9900" strokeWidth="1.5" opacity="0.5" strokeDasharray="2 3" />

      {/* long flowing mane — left */}
      <path d="M 18,32 Q 8,50 10,70 Q 12,84 18,90"
        fill="none" stroke="#FF44CC" strokeWidth="9" strokeLinecap="round" />
      <path d="M 18,34 Q 6,54 8,74 Q 10,86 16,92"
        fill="none" stroke="#FFAA00" strokeWidth="6" strokeLinecap="round" />
      <path d="M 20,38 Q 8,58 10,78"
        fill="none" stroke="#88CCFF" strokeWidth="4" strokeLinecap="round" />
      <path d="M 22,44 Q 10,62 12,82"
        fill="none" stroke="#AA44FF" strokeWidth="3" strokeLinecap="round" />

      {/* head */}
      <ellipse cx="48" cy="52" rx="32" ry="30" fill="#FFF8FF" />
      <ellipse cx="48" cy="52" rx="32" ry="30" fill="none" stroke="#FFCCEE" strokeWidth="2" />

      {/* long flowing mane — right */}
      <path d="M 74,30 Q 86,48 84,68 Q 82,82 76,90"
        fill="none" stroke="#CC44FF" strokeWidth="9" strokeLinecap="round" />
      <path d="M 76,32 Q 90,50 88,72"
        fill="none" stroke="#FF88CC" strokeWidth="6" strokeLinecap="round" />
      <path d="M 76,38 Q 90,56 88,76"
        fill="none" stroke="#44DDFF" strokeWidth="4" strokeLinecap="round" />

      {/* large expressive eyes with lashes */}
      <circle cx="32" cy="46" r="13" fill="#1A0A1A" />
      <circle cx="32" cy="46" r="10" fill="#CC44AA" />
      <circle cx="32" cy="46" r="6" fill="#FF88DD" />
      <circle cx="36" cy="41" r="4" fill="white" opacity="0.95" />
      <circle cx="30" cy="52" r="2" fill="white" opacity="0.6" />
      {/* lashes */}
      <line x1="22" y1="38" x2="27" y2="41" stroke="#1A0A1A" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="36" x2="29" y2="39" stroke="#1A0A1A" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="34" x2="31" y2="38" stroke="#1A0A1A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="64" cy="46" r="13" fill="#1A0A1A" />
      <circle cx="64" cy="46" r="10" fill="#CC44AA" />
      <circle cx="64" cy="46" r="6" fill="#FF88DD" />
      <circle cx="68" cy="41" r="4" fill="white" opacity="0.95" />
      <circle cx="62" cy="52" r="2" fill="white" opacity="0.6" />
      <line x1="74" y1="38" x2="69" y2="41" stroke="#1A0A1A" strokeWidth="2" strokeLinecap="round" />
      <line x1="71" y1="36" x2="67" y2="39" stroke="#1A0A1A" strokeWidth="2" strokeLinecap="round" />
      <line x1="67" y1="34" x2="65" y2="38" stroke="#1A0A1A" strokeWidth="2" strokeLinecap="round" />

      {/* nose */}
      <ellipse cx="48" cy="62" rx="6" ry="4" fill="#FFCCEE" />
      <circle cx="45" cy="62" r="2" fill="#CC6699" />
      <circle cx="51" cy="62" r="2" fill="#CC6699" />
      {/* smile */}
      <path d="M 41,68 Q 48,74 55,68" fill="none" stroke="#CC88AA" strokeWidth="2.5" strokeLinecap="round" />

      {/* body */}
      <ellipse cx="46" cy="78" rx="26" ry="16" fill="#FFF4FF" />
      {/* legs / hooves */}
      <ellipse cx="30" cy="88" rx="13" ry="8" fill="#EEE0EE" />
      <ellipse cx="58" cy="88" rx="13" ry="8" fill="#EEE0EE" />
      {/* glitter sparkles */}
      <text x="6" y="54" fontSize="12" fill="#FFDD44" opacity="0.9">✦</text>
      <text x="82" y="42" fontSize="10" fill="#FF88CC" opacity="0.85">✦</text>
      <text x="4" y="74" fontSize="8" fill="#88CCFF" opacity="0.8">✦</text>
      <text x="84" y="76" fontSize="9" fill="#AA44FF" opacity="0.8">✦</text>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// DRAGÓN 🐉 — Fire Dragon (anime/fantasy style)
// ════════════════════════════════════════════════════════════
function DragonEgg() {
  return (
    <>
      <Sh cy={88} rx={26} />
      {/* scaly red egg */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#CC2200" />
      <ellipse cx="38" cy="28" rx="12" ry="16" fill="#FF4411" opacity="0.5" />
      {/* scale pattern */}
      <path d="M 28,40 Q 36,36 44,40 Q 52,36 60,40 Q 68,36 70,44"
        fill="none" stroke="#991100" strokeWidth="2" />
      <path d="M 28,48 Q 36,44 44,48 Q 52,44 60,48 Q 68,44 70,52"
        fill="none" stroke="#991100" strokeWidth="2" />
      <path d="M 30,56 Q 38,52 46,56 Q 54,52 62,56"
        fill="none" stroke="#991100" strokeWidth="2" />
      {/* crack glow */}
      <path d="M 44,20 L 48,34 L 44,42 L 50,54 L 46,62"
        fill="none" stroke="#FF8800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="34" r="4" fill="#FFCC00" opacity="0.9" />
    </>
  );
}

function DragonBaby() {
  return (
    <>
      <Sh cy={90} rx={20} />
      {/* small wings */}
      <path d="M 20,44 Q 6,30 10,50 Q 14,62 22,60"
        fill="#990011" stroke="#660000" strokeWidth="1.5" />
      <path d="M 76,44 Q 90,30 86,50 Q 82,62 74,60"
        fill="#990011" stroke="#660000" strokeWidth="1.5" />
      {/* wing veins */}
      <line x1="20" y1="44" x2="10" y2="38" stroke="#CC0011" strokeWidth="1.5" />
      <line x1="20" y1="46" x2="8" y2="48" stroke="#CC0011" strokeWidth="1.5" />
      <line x1="76" y1="44" x2="86" y2="38" stroke="#CC0011" strokeWidth="1.5" />
      <line x1="76" y1="46" x2="88" y2="48" stroke="#CC0011" strokeWidth="1.5" />

      {/* small horns */}
      <polygon points="36,26 32,10 40,24" fill="#FFEEAA" />
      <polygon points="60,26 64,10 56,24" fill="#FFEEAA" />

      {/* round body */}
      <ellipse cx="48" cy="56" rx="30" ry="28" fill="#DD2200" />
      {/* scale pattern on body */}
      <path d="M 26,50 Q 34,46 42,50 Q 50,46 58,50 Q 66,46 70,52"
        fill="none" stroke="#BB1100" strokeWidth="1.5" opacity="0.7" />
      <path d="M 28,60 Q 36,56 44,60 Q 52,56 60,60 Q 66,56 70,62"
        fill="none" stroke="#BB1100" strokeWidth="1.5" opacity="0.7" />

      {/* eyes — slitted pupils, glowing yellow */}
      <circle cx="36" cy="50" r="10" fill="#1A0000" />
      <circle cx="36" cy="50" r="7" fill="#FFCC00" />
      <ellipse cx="36" cy="50" rx="3" ry="6" fill="#1A0000" />
      <circle cx="39" cy="47" r="2.5" fill="white" opacity="0.7" />
      <circle cx="60" cy="50" r="10" fill="#1A0000" />
      <circle cx="60" cy="50" r="7" fill="#FFCC00" />
      <ellipse cx="60" cy="50" rx="3" ry="6" fill="#1A0000" />
      <circle cx="63" cy="47" r="2.5" fill="white" opacity="0.7" />

      {/* small flame breath */}
      <path d="M 48,68 Q 44,76 46,82 Q 50,86 54,82 Q 58,76 52,68"
        fill="#FF8800" opacity="0.9" />
      <path d="M 48,68 Q 45,74 47,79 Q 50,82 53,79 Q 55,74 52,68"
        fill="#FFCC00" opacity="0.85" />

      {/* tail hint */}
      <path d="M 68,72 Q 80,78 82,70" fill="none" stroke="#BB1100" strokeWidth="8" strokeLinecap="round" />
      <path d="M 68,72 Q 80,78 82,70" fill="none" stroke="#FF4411" strokeWidth="4" strokeLinecap="round" />
    </>
  );
}

function DragonAdult() {
  return (
    <>
      <Sh cy={92} rx={30} />
      {/* large spread wings */}
      <path d="M 18,44 Q -4,20 2,52 Q 6,70 20,70 Q 26,68 24,58"
        fill="#880011" stroke="#550000" strokeWidth="2" />
      <path d="M 78,44 Q 100,20 94,52 Q 90,70 76,70 Q 70,68 72,58"
        fill="#880011" stroke="#550000" strokeWidth="2" />
      {/* wing ribs */}
      <line x1="18" y1="44" x2="0" y2="30" stroke="#AA0011" strokeWidth="2.5" />
      <line x1="18" y1="46" x2="-2" y2="50" stroke="#AA0011" strokeWidth="2" />
      <line x1="20" y1="50" x2="4" y2="62" stroke="#AA0011" strokeWidth="2" />
      <line x1="78" y1="44" x2="96" y2="30" stroke="#AA0011" strokeWidth="2.5" />
      <line x1="78" y1="46" x2="98" y2="50" stroke="#AA0011" strokeWidth="2" />
      <line x1="76" y1="50" x2="92" y2="62" stroke="#AA0011" strokeWidth="2" />

      {/* tall horns */}
      <polygon points="32,24 26,4 40,22" fill="#FFEEAA" />
      <polygon points="34,22 29,6 38,20" fill="#FFFACC" opacity="0.6" />
      <polygon points="64,24 74,4 60,22" fill="#FFEEAA" />
      <polygon points="66,22 71,6 62,20" fill="#FFFACC" opacity="0.6" />

      {/* head */}
      <ellipse cx="48" cy="48" rx="34" ry="30" fill="#EE2200" />
      {/* scale row on head */}
      <path d="M 18,44 Q 30,38 48,40 Q 66,38 78,44"
        fill="none" stroke="#CC1100" strokeWidth="2" opacity="0.8" />

      {/* glowing dragon eyes */}
      <circle cx="31" cy="44" r="12" fill="#1A0000" />
      <circle cx="31" cy="44" r="9" fill="#FFAA00" />
      <circle cx="31" cy="44" r="5" fill="#FF6600" />
      <ellipse cx="31" cy="44" rx="2.5" ry="7" fill="#1A0000" />
      <circle cx="35" cy="40" r="3" fill="white" opacity="0.7" />
      <circle cx="65" cy="44" r="12" fill="#1A0000" />
      <circle cx="65" cy="44" r="9" fill="#FFAA00" />
      <circle cx="65" cy="44" r="5" fill="#FF6600" />
      <ellipse cx="65" cy="44" rx="2.5" ry="7" fill="#1A0000" />
      <circle cx="69" cy="40" r="3" fill="white" opacity="0.7" />

      {/* dragon nose */}
      <ellipse cx="48" cy="60" rx="8" ry="5" fill="#CC1100" />
      <circle cx="44" cy="60" r="3" fill="#991100" />
      <circle cx="52" cy="60" r="3" fill="#991100" />

      {/* large fire breath */}
      <path d="M 44,70 Q 36,84 40,92 Q 48,98 56,92 Q 60,84 52,70"
        fill="#FF6600" opacity="0.95" />
      <path d="M 44,70 Q 38,82 42,89 Q 48,94 54,89 Q 58,82 52,70"
        fill="#FF9900" />
      <path d="M 46,70 Q 42,80 44,86 Q 48,90 52,86 Q 54,80 50,70"
        fill="#FFDD00" opacity="0.9" />
      {/* fire glow */}
      <ellipse cx="48" cy="90" rx="14" ry="6" fill="#FF6600" opacity="0.35" />

      {/* body */}
      <ellipse cx="46" cy="74" rx="24" ry="14" fill="#EE2200" />
      {/* scale rows on body */}
      <path d="M 26,70 Q 36,66 46,68 Q 56,66 66,70" fill="none" stroke="#CC1100" strokeWidth="2" opacity="0.8" />
      {/* claws */}
      <ellipse cx="28" cy="84" rx="12" ry="7" fill="#CC1100" />
      <ellipse cx="58" cy="84" rx="12" ry="7" fill="#CC1100" />
      <polygon points="20,86 18,94 26,90" fill="#FFEEAA" />
      <polygon points="26,88 25,96 32,92" fill="#FFEEAA" />
      <polygon points="32,88 32,96 38,92" fill="#FFEEAA" />
      <polygon points="50,88 50,96 56,92" fill="#FFEEAA" />
      <polygon points="56,88 57,96 62,92" fill="#FFEEAA" />
      <polygon points="62,86 64,94 68,90" fill="#FFEEAA" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// ALEBRIJE 🎨 — Mexican Folk Art Fantasy Creature
// Cuerpo de jaguar + alas de quetzal + detalles oaxaqueños
// ════════════════════════════════════════════════════════════
function AlebrjeEgg() {
  return (
    <>
      <Sh cy={88} rx={26} />
      {/* colorful patterned egg */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#DD22AA" />
      <ellipse cx="38" cy="28" rx="12" ry="16" fill="#FF44CC" opacity="0.4" />
      {/* alebrije geometric patterns */}
      {/* diamond patterns */}
      <polygon points="48,20 56,32 48,44 40,32" fill="#FFEE00" opacity="0.85" />
      <polygon points="48,24 54,32 48,40 42,32" fill="#FF8800" opacity="0.7" />
      {/* dots */}
      <circle cx="34" cy="40" r="4" fill="#00DDAA" opacity="0.9" />
      <circle cx="62" cy="40" r="4" fill="#00DDAA" opacity="0.9" />
      <circle cx="34" cy="52" r="3" fill="#FFEE00" opacity="0.8" />
      <circle cx="62" cy="52" r="3" fill="#FFEE00" opacity="0.8" />
      <circle cx="48" cy="60" r="4" fill="#44CCFF" opacity="0.9" />
      {/* zigzag lines */}
      <path d="M 28,48 L 34,44 L 40,48 L 46,44 L 52,48 L 58,44 L 64,48 L 70,44"
        fill="none" stroke="#44FFAA" strokeWidth="2" opacity="0.8" />
    </>
  );
}

function AlebrjeBaby() {
  return (
    <>
      <Sh cy={90} rx={20} />
      {/* small quetzal-style wings */}
      <path d="M 16,48 Q 4,34 8,52 Q 12,62 20,60"
        fill="#00BBAA" stroke="#008888" strokeWidth="1.5" />
      <path d="M 80,48 Q 92,34 88,52 Q 84,62 76,60"
        fill="#00BBAA" stroke="#008888" strokeWidth="1.5" />
      {/* wing feather tips */}
      <path d="M 16,48 Q 2,38 4,28" fill="none" stroke="#FFEE00" strokeWidth="4" strokeLinecap="round" />
      <path d="M 16,50 Q 0,44 2,36" fill="none" stroke="#FF8800" strokeWidth="3" strokeLinecap="round" />
      <path d="M 80,48 Q 94,38 92,28" fill="none" stroke="#FFEE00" strokeWidth="4" strokeLinecap="round" />
      <path d="M 80,50 Q 96,44 94,36" fill="none" stroke="#FF8800" strokeWidth="3" strokeLinecap="round" />

      {/* small deer horns */}
      <line x1="38" y1="26" x2="32" y2="10" stroke="#FF6644" strokeWidth="4" strokeLinecap="round" />
      <line x1="32" y1="10" x2="26" y2="6" stroke="#FF6644" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="10" x2="28" y2="4" stroke="#FF6644" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="58" y1="26" x2="64" y2="10" stroke="#FF6644" strokeWidth="4" strokeLinecap="round" />
      <line x1="64" y1="10" x2="70" y2="6" stroke="#FF6644" strokeWidth="3" strokeLinecap="round" />
      <line x1="64" y1="10" x2="68" y2="4" stroke="#FF6644" strokeWidth="2.5" strokeLinecap="round" />

      {/* round body — hot pink */}
      <ellipse cx="48" cy="56" rx="30" ry="28" fill="#EE22AA" />

      {/* alebrije diamond pattern on body */}
      <polygon points="48,36 56,48 48,60 40,48" fill="#FFEE00" opacity="0.9" />
      <polygon points="48,40 54,48 48,56 42,48" fill="#FF8800" opacity="0.75" />

      {/* dot patterns */}
      <circle cx="30" cy="50" r="4" fill="#00DDAA" opacity="0.9" />
      <circle cx="66" cy="50" r="4" fill="#00DDAA" opacity="0.9" />
      <circle cx="30" cy="62" r="3" fill="#44CCFF" opacity="0.85" />
      <circle cx="66" cy="62" r="3" fill="#44CCFF" opacity="0.85" />

      {/* big eyes — green with joy */}
      <circle cx="36" cy="50" r="10" fill="#0A1A0A" />
      <circle cx="36" cy="50" r="7" fill="#00CC44" />
      <circle cx="36" cy="50" r="4" fill="#00FF66" />
      <circle cx="39" cy="47" r="3" fill="white" opacity="0.9" />
      <circle cx="60" cy="50" r="10" fill="#0A1A0A" />
      <circle cx="60" cy="50" r="7" fill="#00CC44" />
      <circle cx="60" cy="50" r="4" fill="#00FF66" />
      <circle cx="63" cy="47" r="3" fill="white" opacity="0.9" />

      {/* cat/jaguar nose and muzzle */}
      <ellipse cx="48" cy="60" rx="8" ry="6" fill="#CC1188" />
      <polygon points="48,60 45,66 51,66" fill="#AA0077" />

      {/* zigzag pattern at bottom */}
      <path d="M 24,70 L 30,66 L 36,70 L 42,66 L 48,70 L 54,66 L 60,70 L 66,66 L 72,70"
        fill="none" stroke="#44CCFF" strokeWidth="2" opacity="0.8" />

      {/* small tail */}
      <path d="M 68,70 Q 80,74 84,66 Q 86,60 78,58"
        fill="none" stroke="#FF8800" strokeWidth="6" strokeLinecap="round" />
      <path d="M 68,70 Q 80,74 84,66 Q 86,60 78,58"
        fill="none" stroke="#FFEE00" strokeWidth="2.5" strokeLinecap="round" />

      {/* feet/paws */}
      <ellipse cx="34" cy="82" rx="11" ry="7" fill="#CC1188" />
      <ellipse cx="62" cy="82" rx="11" ry="7" fill="#CC1188" />
    </>
  );
}

function AlebrjeAdult() {
  return (
    <>
      <Sh cy={92} rx={30} />
      {/* large quetzal wings spread */}
      <path d="M 12,46 Q -8,18 -2,48 Q 2,66 18,68"
        fill="#009988" stroke="#006666" strokeWidth="2" />
      <path d="M 12,46 Q -6,26 0,56 Q 4,68 16,70"
        fill="#00BBAA" opacity="0.7" />
      <path d="M 82,46 Q 102,18 96,48 Q 92,66 78,68"
        fill="#009988" stroke="#006666" strokeWidth="2" />
      <path d="M 82,46 Q 100,26 94,56 Q 90,68 80,70"
        fill="#00BBAA" opacity="0.7" />

      {/* wing feather plumes */}
      <path d="M 12,46 Q -10,30 -8,14" fill="none" stroke="#FFEE00" strokeWidth="5" strokeLinecap="round" />
      <path d="M 12,48 Q -12,36 -10,22" fill="none" stroke="#FF8800" strokeWidth="4" strokeLinecap="round" />
      <path d="M 14,52 Q -8,44 -6,30" fill="none" stroke="#FF44CC" strokeWidth="4" strokeLinecap="round" />
      <path d="M 82,46 Q 104,30 102,14" fill="none" stroke="#FFEE00" strokeWidth="5" strokeLinecap="round" />
      <path d="M 82,48 Q 106,36 104,22" fill="none" stroke="#FF8800" strokeWidth="4" strokeLinecap="round" />
      <path d="M 80,52 Q 102,44 100,30" fill="none" stroke="#FF44CC" strokeWidth="4" strokeLinecap="round" />

      {/* large branched horns */}
      <line x1="34" y1="22" x2="24" y2="2" stroke="#FF6644" strokeWidth="5" strokeLinecap="round" />
      <line x1="24" y1="2" x2="14" y2="-4" stroke="#FF6644" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="24" y1="2" x2="16" y2="-6" stroke="#FF6644" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="8" x2="12" y2="4" stroke="#FF6644" strokeWidth="3" strokeLinecap="round" />
      <line x1="62" y1="22" x2="72" y2="2" stroke="#FF6644" strokeWidth="5" strokeLinecap="round" />
      <line x1="72" y1="2" x2="82" y2="-4" stroke="#FF6644" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="72" y1="2" x2="80" y2="-6" stroke="#FF6644" strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="8" x2="84" y2="4" stroke="#FF6644" strokeWidth="3" strokeLinecap="round" />

      {/* head */}
      <ellipse cx="48" cy="48" rx="34" ry="30" fill="#EE22AA" />

      {/* large alebrije diamond pattern */}
      <polygon points="48,22 60,38 48,54 36,38" fill="#FFEE00" opacity="0.95" />
      <polygon points="48,28 58,38 48,48 38,38" fill="#FF8800" opacity="0.8" />
      <polygon points="48,32 56,38 48,44 40,38" fill="#FF4400" opacity="0.6" />

      {/* dot pattern around diamond */}
      <circle cx="26" cy="38" r="5" fill="#00DDAA" />
      <circle cx="70" cy="38" r="5" fill="#00DDAA" />
      <circle cx="34" cy="26" r="4" fill="#44CCFF" />
      <circle cx="62" cy="26" r="4" fill="#44CCFF" />
      <circle cx="34" cy="52" r="4" fill="#FF44CC" />
      <circle cx="62" cy="52" r="4" fill="#FF44CC" />

      {/* big expressive eyes */}
      <circle cx="28" cy="42" r="13" fill="#0A1A0A" />
      <circle cx="28" cy="42" r="10" fill="#00CC44" />
      <circle cx="28" cy="42" r="6" fill="#00FF88" />
      <circle cx="33" cy="37" r="4" fill="white" opacity="0.9" />
      <circle cx="68" cy="42" r="13" fill="#0A1A0A" />
      <circle cx="68" cy="42" r="10" fill="#00CC44" />
      <circle cx="68" cy="42" r="6" fill="#00FF88" />
      <circle cx="73" cy="37" r="4" fill="white" opacity="0.9" />

      {/* jaguar muzzle */}
      <ellipse cx="48" cy="58" rx="10" ry="7" fill="#CC0088" />
      <polygon points="48,58 44,66 52,66" fill="#AA0066" />
      {/* muzzle dots */}
      <circle cx="38" cy="56" r="2" fill="#FF44CC" opacity="0.8" />
      <circle cx="42" cy="58" r="2" fill="#FF44CC" opacity="0.8" />
      <circle cx="54" cy="58" r="2" fill="#FF44CC" opacity="0.8" />
      <circle cx="58" cy="56" r="2" fill="#FF44CC" opacity="0.8" />

      {/* jaguar body */}
      <ellipse cx="46" cy="76" rx="28" ry="16" fill="#EE22AA" />
      {/* body zigzag pattern */}
      <path d="M 22,72 L 28,68 L 34,72 L 40,68 L 46,72 L 52,68 L 58,72 L 64,68 L 70,72"
        fill="none" stroke="#44CCFF" strokeWidth="2.5" opacity="0.85" />
      {/* body dots */}
      <circle cx="32" cy="78" r="4" fill="#00DDAA" opacity="0.85" />
      <circle cx="48" cy="80" r="4" fill="#FFEE00" opacity="0.85" />
      <circle cx="62" cy="78" r="4" fill="#44CCFF" opacity="0.85" />

      {/* large decorated tail */}
      <path d="M 70,74 Q 88,78 92,62 Q 96,48 84,42"
        fill="none" stroke="#CC1188" strokeWidth="10" strokeLinecap="round" />
      <path d="M 70,74 Q 88,78 92,62 Q 96,48 84,42"
        fill="none" stroke="#FFEE00" strokeWidth="4" strokeLinecap="round" />
      <circle cx="84" cy="42" r="6" fill="#00DDAA" />
      <circle cx="84" cy="42" r="3" fill="#FF8800" />

      {/* paws with claw detail */}
      <ellipse cx="28" cy="88" rx="14" ry="8" fill="#CC1188" />
      <ellipse cx="58" cy="88" rx="14" ry="8" fill="#CC1188" />
      {/* paw dots */}
      <circle cx="22" cy="90" r="3" fill="#FF44CC" opacity="0.7" />
      <circle cx="28" cy="92" r="3" fill="#FF44CC" opacity="0.7" />
      <circle cx="34" cy="90" r="3" fill="#FF44CC" opacity="0.7" />
      <circle cx="52" cy="90" r="3" fill="#FF44CC" opacity="0.7" />
      <circle cx="58" cy="92" r="3" fill="#FF44CC" opacity="0.7" />
      <circle cx="64" cy="90" r="3" fill="#FF44CC" opacity="0.7" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// DEAD — grey X eyes
// ════════════════════════════════════════════════════════════
function DeadSprite() {
  return (
    <>
      <ellipse cx="48" cy="56" rx="34" ry="32" fill="#444455" />
      <ellipse cx="48" cy="58" rx="22" ry="20" fill="#333344" />
      <line x1="28" y1="40" x2="42" y2="54" stroke="#222233" strokeWidth="5" strokeLinecap="round" />
      <line x1="42" y1="40" x2="28" y2="54" stroke="#222233" strokeWidth="5" strokeLinecap="round" />
      <line x1="54" y1="40" x2="68" y2="54" stroke="#222233" strokeWidth="5" strokeLinecap="round" />
      <line x1="68" y1="40" x2="54" y2="54" stroke="#222233" strokeWidth="5" strokeLinecap="round" />
      <path d="M 34,68 Q 48,62 62,68" fill="none" stroke="#222233" strokeWidth="3.5" strokeLinecap="round" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Lookup table
// ════════════════════════════════════════════════════════════
const MAP: Record<string, Record<string, React.ReactElement>> = {
  unicornio: { egg: <UnicornioEgg />, baby: <UnicornioBaby />, adult: <UnicornioAdult />, dead: <DeadSprite /> },
  dragon:    { egg: <DragonEgg />,    baby: <DragonBaby />,    adult: <DragonAdult />,    dead: <DeadSprite /> },
  alebrije:  { egg: <AlebrjeEgg />,   baby: <AlebrjeBaby />,   adult: <AlebrjeAdult />,   dead: <DeadSprite /> },
};

export function MonsterSprite({ monsterId, stage, size = 128, className, style }: Props) {
  const content = MAP[monsterId]?.[stage] ?? MAP[monsterId]?.egg ?? MAP.unicornio.egg;
  const viewH = stage === 'adult' ? 130 : 96;

  return (
    <svg
      viewBox={`0 0 96 ${viewH}`}
      width={size}
      height={size}
      style={{ display: 'block', margin: '0 auto', overflow: 'visible', ...style }}
      className={className}
    >
      {content}
    </svg>
  );
}
