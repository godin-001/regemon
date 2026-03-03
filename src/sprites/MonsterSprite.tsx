// ═══════════════════════════════════════════════════════════
// REGEMON — Anime × Japanese Yokai SVG Sprites
// 96×96 viewBox  |  Motivos: Kitsune · Kodama · Nekomata
// ═══════════════════════════════════════════════════════════
import React from 'react';

interface Props {
  monsterId: string;
  stage: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Shadow = ({ cx = 48, cy = 90, rx = 24 }: { cx?: number; cy?: number; rx?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry="5" fill="rgba(0,0,0,0.22)" />
);

// ════════════════════════════════════════════════════════════
// PIKUMON — Kitsune (Electric Fox Spirit) ⚡🦊
// Golden fox with lightning marks and magical tails
// ════════════════════════════════════════════════════════════
function PikumonEgg() {
  return (
    <>
      <Shadow cy={88} rx={26} />
      {/* egg */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#FFD000" />
      <ellipse cx="38" cy="30" rx="12" ry="16" fill="#FFE866" opacity="0.4" />
      {/* lightning kanji-style crack */}
      <polyline points="46,14 54,28 46,38 56,54 48,62"
        fill="none" stroke="#00CCFF" strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* glow dots */}
      <circle cx="54" cy="28" r="3" fill="#00FFFF" opacity="0.8" />
      <circle cx="56" cy="54" r="3" fill="#00FFFF" opacity="0.8" />
    </>
  );
}

function PikumonBaby() {
  return (
    <>
      <Shadow cy={90} rx={20} />
      {/* fluffy tail (single, curled) */}
      <path d="M 62,72 Q 80,64 82,50 Q 84,38 74,32 Q 70,28 66,34"
        fill="none" stroke="#FFB800" strokeWidth="8" strokeLinecap="round" />
      <path d="M 62,72 Q 80,64 82,50 Q 84,38 74,32 Q 70,28 66,34"
        fill="none" stroke="#FFE566" strokeWidth="4" strokeLinecap="round" />
      {/* lightning tip on tail */}
      <polyline points="66,34 70,26 64,28 68,18"
        fill="none" stroke="#00CCFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* kitsune ears (pointy fox ears) */}
      <polygon points="24,44 30,12 46,40" fill="#FFD000" />
      <polygon points="27,42 31,18 42,40" fill="#FF9900" opacity="0.7" />
      <polygon points="50,40 66,12 72,44" fill="#FFD000" />
      <polygon points="54,40 65,18 69,42" fill="#FF9900" opacity="0.7" />

      {/* head */}
      <ellipse cx="48" cy="52" rx="28" ry="26" fill="#FFE033" />
      {/* fox snout (elongated slightly) */}
      <ellipse cx="48" cy="62" rx="10" ry="7" fill="#FFB800" />
      <ellipse cx="48" cy="60" rx="4" ry="3" fill="#CC6600" />
      {/* whisker lines */}
      <line x1="18" y1="56" x2="37" y2="60" stroke="#CC8800" strokeWidth="1.5" opacity="0.7" />
      <line x1="18" y1="61" x2="37" y2="62" stroke="#CC8800" strokeWidth="1.5" opacity="0.7" />
      <line x1="59" y1="60" x2="78" y2="56" stroke="#CC8800" strokeWidth="1.5" opacity="0.7" />
      <line x1="59" y1="62" x2="78" y2="61" stroke="#CC8800" strokeWidth="1.5" opacity="0.7" />

      {/* kitsune eyes — slanted, magical amber */}
      <ellipse cx="35" cy="48" rx="8" ry="6" fill="#1A0A00" />
      <ellipse cx="35" cy="48" rx="5" ry="4" fill="#CC6600" />
      <circle cx="37" cy="46" r="2.5" fill="white" opacity="0.9" />
      <ellipse cx="61" cy="48" rx="8" ry="6" fill="#1A0A00" />
      <ellipse cx="61" cy="48" rx="5" ry="4" fill="#CC6600" />
      <circle cx="63" cy="46" r="2.5" fill="white" opacity="0.9" />

      {/* ⚡ electric cheek marks */}
      <polyline points="16,50 20,55 16,60" fill="none" stroke="#00CCFF" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="80,50 76,55 80,60" fill="none" stroke="#00CCFF" strokeWidth="2.5" strokeLinecap="round" />

      {/* body */}
      <ellipse cx="46" cy="76" rx="20" ry="14" fill="#FFD000" />
      {/* paws */}
      <ellipse cx="33" cy="86" rx="11" ry="7" fill="#CCA000" />
      <ellipse cx="59" cy="86" rx="11" ry="7" fill="#CCA000" />
    </>
  );
}

function PikumonAdult() {
  return (
    <>
      <Shadow cy={90} rx={28} />
      {/* THREE magical tails with lightning tips */}
      <path d="M 64,72 Q 88,58 88,40 Q 88,24 76,20"
        fill="none" stroke="#FFB800" strokeWidth="8" strokeLinecap="round" />
      <path d="M 64,72 Q 88,58 88,40 Q 88,24 76,20"
        fill="none" stroke="#FFE566" strokeWidth="4" strokeLinecap="round" />
      <path d="M 60,74 Q 90,70 94,54 Q 96,40 84,32"
        fill="none" stroke="#FFB800" strokeWidth="7" strokeLinecap="round" />
      <path d="M 60,74 Q 90,70 94,54 Q 96,40 84,32"
        fill="none" stroke="#FFE566" strokeWidth="3" strokeLinecap="round" />
      <path d="M 62,76 Q 86,82 90,68 Q 94,56 82,48"
        fill="none" stroke="#FFB800" strokeWidth="7" strokeLinecap="round" />
      <path d="M 62,76 Q 86,82 90,68 Q 94,56 82,48"
        fill="none" stroke="#FFE566" strokeWidth="3" strokeLinecap="round" />

      {/* lightning tips */}
      <polyline points="76,20 80,12 73,14 78,6" fill="none" stroke="#00CCFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="84,32 90,24 83,26 88,16" fill="none" stroke="#00CCFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* kitsune ears — tall and majestic */}
      <polygon points="14,44 22,6 42,38" fill="#FFD000" />
      <polygon points="18,42 23,14 38,38" fill="#FF9900" opacity="0.65" />
      <polygon points="54,38 74,6 82,44" fill="#FFD000" />
      <polygon points="58,38 73,14 78,42" fill="#FF9900" opacity="0.65" />

      {/* head */}
      <ellipse cx="48" cy="50" rx="32" ry="30" fill="#FFE033" />

      {/* fox face markings — diamond pattern on forehead */}
      <polygon points="48,22 54,30 48,38 42,30" fill="#FF9900" opacity="0.5" />

      {/* fox snout */}
      <ellipse cx="48" cy="62" rx="12" ry="8" fill="#FFB800" />
      <ellipse cx="48" cy="60" rx="5" ry="3.5" fill="#CC6600" />
      {/* whiskers — longer */}
      <line x1="10" y1="56" x2="35" y2="61" stroke="#CC8800" strokeWidth="1.5" opacity="0.7" />
      <line x1="10" y1="62" x2="35" y2="63" stroke="#CC8800" strokeWidth="1.5" opacity="0.7" />
      <line x1="61" y1="61" x2="86" y2="56" stroke="#CC8800" strokeWidth="1.5" opacity="0.7" />
      <line x1="61" y1="63" x2="86" y2="62" stroke="#CC8800" strokeWidth="1.5" opacity="0.7" />

      {/* eyes — larger, more powerful */}
      <ellipse cx="32" cy="46" rx="10" ry="8" fill="#1A0A00" />
      <ellipse cx="32" cy="46" rx="7" ry="5" fill="#DD7700" />
      <circle cx="35" cy="43" r="3" fill="white" opacity="0.9" />
      <ellipse cx="64" cy="46" rx="10" ry="8" fill="#1A0A00" />
      <ellipse cx="64" cy="46" rx="7" ry="5" fill="#DD7700" />
      <circle cx="67" cy="43" r="3" fill="white" opacity="0.9" />

      {/* electric marks on cheeks — bigger */}
      <polyline points="10,48 16,54 10,60" fill="none" stroke="#00CCFF" strokeWidth="3.5" strokeLinecap="round" />
      <polyline points="86,48 80,54 86,60" fill="none" stroke="#00CCFF" strokeWidth="3.5" strokeLinecap="round" />

      {/* body */}
      <ellipse cx="44" cy="76" rx="26" ry="16" fill="#FFD000" />
      {/* front legs / paws */}
      <ellipse cx="28" cy="87" rx="14" ry="8" fill="#CCA000" />
      <ellipse cx="58" cy="87" rx="14" ry="8" fill="#CCA000" />
      {/* toe bumps */}
      <circle cx="20" cy="90" r="4" fill="#BB9000" />
      <circle cx="28" cy="92" r="4" fill="#BB9000" />
      <circle cx="36" cy="90" r="4" fill="#BB9000" />
      <circle cx="50" cy="90" r="4" fill="#BB9000" />
      <circle cx="58" cy="92" r="4" fill="#BB9000" />
      <circle cx="66" cy="90" r="4" fill="#BB9000" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// TOTOMON — Kodama (Ancient Forest Spirit) 🌿👻
// White ghost-like nature spirit with leaf crown
// ════════════════════════════════════════════════════════════
function TotomonEgg() {
  return (
    <>
      <Shadow cy={88} rx={25} />
      {/* egg — mossy green */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#4A9E5C" />
      <ellipse cx="38" cy="30" rx="12" ry="16" fill="#72CC7A" opacity="0.45" />
      {/* vine spiral */}
      <path d="M 48,16 Q 60,24 58,36 Q 56,46 48,48 Q 40,50 40,38 Q 40,28 48,28"
        fill="none" stroke="#2A6A2A" strokeWidth="2.5" strokeLinecap="round" />
      {/* leaf bud on top */}
      <ellipse cx="48" cy="14" rx="7" ry="10" fill="#3A8A3A" transform="rotate(-10 48 14)" />
      <line x1="48" y1="18" x2="47" y2="28" stroke="#2A6A2A" strokeWidth="1.5" strokeLinecap="round" />
    </>
  );
}

function TotomonBaby() {
  return (
    <>
      <Shadow cy={88} rx={22} />
      {/* leaf hat */}
      <ellipse cx="48" cy="16" rx="22" ry="10" fill="#3A8A3A" transform="rotate(-5 48 16)" />
      <ellipse cx="48" cy="16" rx="18" ry="7" fill="#5AAA5A" transform="rotate(-5 48 16)" />
      <line x1="38" y1="20" x2="48" y2="16" stroke="#2A6A2A" strokeWidth="1.5" />
      <line x1="58" y1="20" x2="48" y2="16" stroke="#2A6A2A" strokeWidth="1.5" />
      {/* hat stem */}
      <line x1="48" y1="22" x2="48" y2="30" stroke="#4A7A4A" strokeWidth="2" strokeLinecap="round" />

      {/* round ghost body — kodama white */}
      <ellipse cx="48" cy="60" rx="32" ry="34" fill="#F0F4E8" />
      {/* soft grey outline */}
      <ellipse cx="48" cy="60" rx="32" ry="34" fill="none" stroke="#C8D8C0" strokeWidth="2" />

      {/* nature belly pattern */}
      <ellipse cx="48" cy="66" rx="18" ry="16" fill="#D8ECCC" />
      <path d="M 36,62 Q 48,70 60,62" fill="none" stroke="#A8C8A0" strokeWidth="2" />
      <path d="M 38,70 Q 48,76 58,70" fill="none" stroke="#A8C8A0" strokeWidth="1.5" />

      {/* kodama eyes — classic hollow circles, very expressive */}
      <circle cx="34" cy="52" r="10" fill="#1A2A1A" />
      <circle cx="34" cy="52" r="6" fill="#2A4A2A" />
      <circle cx="37" cy="49" r="4" fill="white" opacity="0.9" />
      <circle cx="62" cy="52" r="10" fill="#1A2A1A" />
      <circle cx="62" cy="52" r="6" fill="#2A4A2A" />
      <circle cx="65" cy="49" r="4" fill="white" opacity="0.9" />

      {/* small O-mouth */}
      <circle cx="48" cy="64" r="4" fill="#1A2A1A" />
      <circle cx="48" cy="64" r="2.5" fill="#2A4A2A" />

      {/* tiny feet barely peeking out */}
      <ellipse cx="36" cy="89" rx="11" ry="6" fill="#D4E8C8" />
      <ellipse cx="60" cy="89" rx="11" ry="6" fill="#D4E8C8" />
    </>
  );
}

function TotomonAdult() {
  return (
    <>
      <Shadow cy={91} rx={32} />
      {/* leaf crown / nature headpiece */}
      <ellipse cx="26" cy="14" rx="14" ry="9" fill="#3A8A3A" transform="rotate(-30 26 14)" />
      <ellipse cx="26" cy="14" rx="10" ry="6" fill="#5AAA5A" transform="rotate(-30 26 14)" />
      <ellipse cx="48" cy="8" rx="14" ry="9" fill="#3A8A3A" />
      <ellipse cx="48" cy="8" rx="10" ry="6" fill="#5AAA5A" />
      <ellipse cx="70" cy="14" rx="14" ry="9" fill="#3A8A3A" transform="rotate(30 70 14)" />
      <ellipse cx="70" cy="14" rx="10" ry="6" fill="#5AAA5A" transform="rotate(30 70 14)" />

      {/* vine connections between leaves */}
      <path d="M 26,20 Q 36,14 48,16 Q 60,14 70,20"
        fill="none" stroke="#4A7A4A" strokeWidth="2" />

      {/* large majestic ghost body */}
      <ellipse cx="48" cy="58" rx="38" ry="36" fill="#ECEFE4" />
      <ellipse cx="48" cy="58" rx="38" ry="36" fill="none" stroke="#C0CEB8" strokeWidth="2.5" />

      {/* large glowing belly — nature rune */}
      <ellipse cx="48" cy="64" rx="24" ry="22" fill="#D0E8C0" />
      {/* nature rune/spiral */}
      <path d="M 48,52 Q 60,56 58,66 Q 56,74 48,74 Q 40,74 38,66 Q 36,56 48,52"
        fill="none" stroke="#5AAA5A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="48" cy="63" r="4" fill="#5AAA5A" opacity="0.7" />

      {/* large expressive kodama eyes */}
      <circle cx="28" cy="44" r="14" fill="#1A2A1A" />
      <circle cx="28" cy="44" r="9" fill="#2A4A2A" />
      <circle cx="33" cy="39" r="5" fill="white" opacity="0.9" />
      <circle cx="68" cy="44" r="14" fill="#1A2A1A" />
      <circle cx="68" cy="44" r="9" fill="#2A4A2A" />
      <circle cx="73" cy="39" r="5" fill="white" opacity="0.9" />

      {/* O-mouth */}
      <circle cx="48" cy="60" r="5" fill="#1A2A1A" />
      <circle cx="48" cy="60" r="3" fill="#2A4A2A" />

      {/* floating spirit wisps */}
      <circle cx="10" cy="44" r="5" fill="#A0CC90" opacity="0.65" />
      <circle cx="8" cy="36" r="3" fill="#A0CC90" opacity="0.45" />
      <circle cx="86" cy="44" r="5" fill="#A0CC90" opacity="0.65" />
      <circle cx="88" cy="36" r="3" fill="#A0CC90" opacity="0.45" />

      {/* feet */}
      <ellipse cx="32" cy="88" rx="14" ry="7" fill="#D0E4C0" />
      <ellipse cx="64" cy="88" rx="14" ry="7" fill="#D0E4C0" />
      {/* toes */}
      <ellipse cx="22" cy="91" r="5" fill="#C0D8B0" />
      <ellipse cx="30" cy="92" r="5" fill="#C0D8B0" />
      <ellipse cx="38" cy="91" r="5" fill="#C0D8B0" />
      <ellipse cx="54" cy="91" r="5" fill="#C0D8B0" />
      <ellipse cx="62" cy="92" r="5" fill="#C0D8B0" />
      <ellipse cx="72" cy="91" r="5" fill="#C0D8B0" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// NYANBOT — Nekomata (Cyber Twin-Tailed Cat Demon) 🤖😈
// Two glowing tails + cyber-armor with circuit runes
// ════════════════════════════════════════════════════════════
function NyanbotEgg() {
  return (
    <>
      <Shadow cy={88} rx={25} />
      {/* egg body — metallic blue */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#0E88CC" />
      <ellipse cx="38" cy="30" rx="12" ry="16" fill="#44BBFF" opacity="0.4" />
      {/* circuit board cross */}
      <line x1="28" y1="44" x2="68" y2="44" stroke="#00BBCC" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="20" x2="48" y2="68" stroke="#00BBCC" strokeWidth="2.5" strokeLinecap="round" />
      {/* center glowing node */}
      <circle cx="48" cy="44" r="8" fill="#00FFFF" opacity="0.85" />
      <circle cx="48" cy="44" r="4" fill="#007788" />
      {/* corner nodes */}
      <circle cx="28" cy="44" r="4" fill="#0099BB" />
      <circle cx="68" cy="44" r="4" fill="#0099BB" />
      <circle cx="48" cy="24" r="4" fill="#0099BB" />
      <circle cx="48" cy="64" r="4" fill="#0099BB" />
    </>
  );
}

function NyanbotBaby() {
  return (
    <>
      <Shadow cy={89} rx={22} />
      {/* nekomata TWO tails (glowing) */}
      <path d="M 58,72 Q 72,60 74,46 Q 76,34 68,28"
        fill="none" stroke="#0077AA" strokeWidth="7" strokeLinecap="round" />
      <path d="M 58,72 Q 72,60 74,46 Q 76,34 68,28"
        fill="none" stroke="#00DDFF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="68" cy="28" r="5" fill="#00FFFF" opacity="0.9" />
      <path d="M 60,74 Q 74,70 76,56 Q 78,44 70,36"
        fill="none" stroke="#0077AA" strokeWidth="7" strokeLinecap="round" />
      <path d="M 60,74 Q 74,70 76,56 Q 78,44 70,36"
        fill="none" stroke="#00DDFF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="70" cy="36" r="4" fill="#00FFFF" opacity="0.9" />

      {/* angular cat ears with inner glow */}
      <polygon points="20,42 28,12 46,38" fill="#1AAAD4" />
      <polygon points="24,40 29,18 42,38" fill="#005588" />
      <circle cx="32" cy="22" r="3" fill="#00FFFF" opacity="0.7" />
      <polygon points="50,38 68,12 76,42" fill="#1AAAD4" />
      <polygon points="54,38 67,18 72,40" fill="#005588" />
      <circle cx="64" cy="22" r="3" fill="#00FFFF" opacity="0.7" />

      {/* head */}
      <rect x="14" y="36" width="68" height="52" rx="16" fill="#22B0EE" />
      {/* visor stripe */}
      <rect x="14" y="36" width="68" height="16" rx="12" fill="#0077AA" />

      {/* glowing cyan eyes — nekomata style */}
      <circle cx="32" cy="57" r="12" fill="#0A0A1E" />
      <circle cx="32" cy="57" r="9" fill="#00EEFF" opacity="0.95" />
      <circle cx="32" cy="57" r="5" fill="#007788" />
      <circle cx="36" cy="53" r="3.5" fill="white" opacity="0.9" />
      <circle cx="64" cy="57" r="12" fill="#0A0A1E" />
      <circle cx="64" cy="57" r="9" fill="#00EEFF" opacity="0.95" />
      <circle cx="64" cy="57" r="5" fill="#007788" />
      <circle cx="68" cy="53" r="3.5" fill="white" opacity="0.9" />

      {/* cat nose */}
      <polygon points="48,68 43,74 53,74" fill="#FF88AA" />
      {/* cat mouth */}
      <path d="M 40,76 L 48,84 L 56,76" fill="none" stroke="#005580" strokeWidth="2.5" strokeLinecap="round" />

      {/* circuit chest */}
      <rect x="20" y="84" width="56" height="10" rx="5" fill="#0088BB" />
      <circle cx="36" cy="89" r="3" fill="#00FFFF" opacity="0.8" />
      <circle cx="48" cy="89" r="3" fill="#00FFFF" opacity="0.8" />
      <circle cx="60" cy="89" r="3" fill="#00FFFF" opacity="0.8" />
    </>
  );
}

function NyanbotAdult() {
  return (
    <>
      <Shadow cy={92} rx={30} />
      {/* nekomata TWO large glowing tails */}
      <path d="M 62,72 Q 90,58 92,36 Q 94,16 80,10"
        fill="none" stroke="#005588" strokeWidth="10" strokeLinecap="round" />
      <path d="M 62,72 Q 90,58 92,36 Q 94,16 80,10"
        fill="none" stroke="#00CCFF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="80" cy="10" r="7" fill="#00FFFF" />
      <circle cx="80" cy="10" r="4" fill="#008899" />

      <path d="M 60,75 Q 92,72 94,52 Q 96,34 82,24"
        fill="none" stroke="#005588" strokeWidth="9" strokeLinecap="round" />
      <path d="M 60,75 Q 92,72 94,52 Q 96,34 82,24"
        fill="none" stroke="#00CCFF" strokeWidth="4" strokeLinecap="round" />
      <circle cx="82" cy="24" r="6" fill="#00FFFF" />
      <circle cx="82" cy="24" r="3" fill="#008899" />

      {/* antenna */}
      <line x1="48" y1="2" x2="48" y2="18" stroke="#C0D8E8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="48" cy="4" r="6" fill="#00FFFF" />
      <circle cx="48" cy="4" r="3" fill="#007788" />

      {/* sharp angular cat ears with cyber glow */}
      <polygon points="12,40 22,4 44,36" fill="#1AAAD4" />
      <polygon points="16,38 23,12 40,36" fill="#004466" />
      <circle cx="26" cy="16" r="4" fill="#00FFFF" opacity="0.8" />
      <polygon points="52,36 74,4 84,40" fill="#1AAAD4" />
      <polygon points="56,36 73,12 80,38" fill="#004466" />
      <circle cx="70" cy="16" r="4" fill="#00FFFF" opacity="0.8" />

      {/* head */}
      <rect x="8" y="30" width="80" height="52" rx="18" fill="#22B0EE" />
      {/* visor */}
      <rect x="8" y="30" width="80" height="18" rx="14" fill="#006699" />

      {/* large glowing demon eyes */}
      <circle cx="28" cy="54" r="14" fill="#040A14" />
      <circle cx="28" cy="54" r="11" fill="#00EEFF" opacity="0.95" />
      <circle cx="28" cy="54" r="6" fill="#006677" />
      <circle cx="33" cy="49" r="4" fill="white" opacity="0.9" />
      <circle cx="68" cy="54" r="14" fill="#040A14" />
      <circle cx="68" cy="54" r="11" fill="#00EEFF" opacity="0.95" />
      <circle cx="68" cy="54" r="6" fill="#006677" />
      <circle cx="73" cy="49" r="4" fill="white" opacity="0.9" />

      {/* cat nose */}
      <polygon points="48,66 42,73 54,73" fill="#FF88AA" />
      {/* cat mouth */}
      <path d="M 38,75 L 48,84 L 58,75" fill="none" stroke="#004466" strokeWidth="3" strokeLinecap="round" />

      {/* silver cyber armor body */}
      <rect x="10" y="82" width="76" height="30" rx="12" fill="#BDD4E8" />
      {/* chest armor plate */}
      <rect x="22" y="86" width="52" height="20" rx="8" fill="#D4E8F4" />
      {/* circuit rune dots */}
      <circle cx="34" cy="94" r="5" fill="#00DDFF" opacity="0.9" />
      <circle cx="48" cy="94" r="5" fill="#00DDFF" opacity="0.9" />
      <circle cx="62" cy="94" r="5" fill="#00DDFF" opacity="0.9" />
      <line x1="34" y1="94" x2="62" y2="94" stroke="#0088BB" strokeWidth="2" />
      {/* additional rune detail */}
      <line x1="34" y1="89" x2="34" y2="99" stroke="#0088BB" strokeWidth="1.5" />
      <line x1="62" y1="89" x2="62" y2="99" stroke="#0088BB" strokeWidth="1.5" />

      {/* legs */}
      <rect x="12" y="106" width="28" height="14" rx="7" fill="#0E88CC" />
      <rect x="56" y="106" width="28" height="14" rx="7" fill="#0E88CC" />
      {/* feet */}
      <rect x="8" y="114" width="32" height="10" rx="6" fill="#0066AA" />
      <rect x="56" y="114" width="32" height="10" rx="6" fill="#0066AA" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// DEAD — greyscale X-eyes
// ════════════════════════════════════════════════════════════
function DeadSprite() {
  return (
    <>
      <ellipse cx="48" cy="58" rx="34" ry="32" fill="#444455" />
      <ellipse cx="48" cy="60" rx="22" ry="20" fill="#333344" />
      <line x1="28" y1="40" x2="42" y2="54" stroke="#222233" strokeWidth="5" strokeLinecap="round" />
      <line x1="42" y1="40" x2="28" y2="54" stroke="#222233" strokeWidth="5" strokeLinecap="round" />
      <line x1="54" y1="40" x2="68" y2="54" stroke="#222233" strokeWidth="5" strokeLinecap="round" />
      <line x1="68" y1="40" x2="54" y2="54" stroke="#222233" strokeWidth="5" strokeLinecap="round" />
      <path d="M 34,70 Q 48,64 62,70" fill="none" stroke="#222233" strokeWidth="3.5" strokeLinecap="round" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Sprite lookup
// ════════════════════════════════════════════════════════════
const SPRITE_MAP: Record<string, Record<string, React.ReactElement>> = {
  pikumon: {
    egg: <PikumonEgg />, baby: <PikumonBaby />, adult: <PikumonAdult />, dead: <DeadSprite />,
  },
  totomon: {
    egg: <TotomonEgg />, baby: <TotomonBaby />, adult: <TotomonAdult />, dead: <DeadSprite />,
  },
  nyanbot: {
    egg: <NyanbotEgg />, baby: <NyanbotBaby />, adult: <NyanbotAdult />, dead: <DeadSprite />,
  },
};

export function MonsterSprite({ monsterId, stage, size = 128, className, style }: Props) {
  const content = SPRITE_MAP[monsterId]?.[stage]
    ?? SPRITE_MAP[monsterId]?.egg
    ?? SPRITE_MAP.pikumon.egg;

  // Nyanbot adult is taller (has tails going up + legs)
  const viewH = (monsterId === 'nyanbot' && stage === 'adult') ? 130 : 96;
  const viewW = (stage === 'adult') ? 100 : 96;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      width={size}
      height={size}
      style={{ display: 'block', margin: '0 auto', overflow: 'visible', ...style }}
      className={className}
    >
      {content}
    </svg>
  );
}
