// ═══════════════════════════════════════════════════════════
// REGEMON — SVG Monster Sprites (hand-crafted, 96×96 viewBox)
// ═══════════════════════════════════════════════════════════
import React from 'react';

interface Props {
  monsterId: string;
  stage: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ── Shared helpers ───────────────────────────────────────────
const Shadow = ({ cx = 48, cy = 88, rx = 24 }: { cx?: number; cy?: number; rx?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry="5" fill="rgba(0,0,0,0.22)" />
);

// ════════════════════════════════════════════════════════════
// PIKUMON — Electric Yellow Mouse 🐭⚡
// ════════════════════════════════════════════════════════════
function PikumonEgg() {
  return (
    <>
      <Shadow cy={89} rx={26} />
      {/* egg body */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#FFD700" />
      {/* inner sheen */}
      <ellipse cx="38" cy="28" rx="12" ry="17" fill="#FFE800" opacity="0.45" />
      {/* lightning crack */}
      <polyline
        points="46,14 52,30 45,40 53,54 47,62"
        fill="none" stroke="#FF8800" strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </>
  );
}

function PikumonBaby() {
  return (
    <>
      <Shadow cy={90} rx={20} />
      {/* left ear */}
      <polygon points="24,44 30,14 44,40" fill="#FFD700" />
      <polygon points="27,42 31,20 41,40" fill="#CC8800" opacity="0.55" />
      {/* right ear */}
      <polygon points="52,40 66,14 72,44" fill="#FFD700" />
      <polygon points="55,40 65,20 69,42" fill="#CC8800" opacity="0.55" />
      {/* head */}
      <ellipse cx="48" cy="50" rx="30" ry="28" fill="#FFE033" />
      {/* left eye */}
      <circle cx="35" cy="46" r="8" fill="#1A1A2E" />
      <circle cx="36" cy="45" r="4" fill="#5A3300" />
      <circle cx="39" cy="42" r="2.5" fill="white" />
      {/* right eye */}
      <circle cx="61" cy="46" r="8" fill="#1A1A2E" />
      <circle cx="62" cy="45" r="4" fill="#5A3300" />
      <circle cx="65" cy="42" r="2.5" fill="white" />
      {/* nose */}
      <ellipse cx="48" cy="55" rx="3.5" ry="2.5" fill="#FF8800" />
      {/* smile */}
      <path d="M 41,62 Q 48,68 55,62" fill="none" stroke="#B87000" strokeWidth="2.5" strokeLinecap="round" />
      {/* cheeks */}
      <ellipse cx="22" cy="54" rx="9" ry="6.5" fill="#FF4466" opacity="0.6" />
      <ellipse cx="74" cy="54" rx="9" ry="6.5" fill="#FF4466" opacity="0.6" />
      {/* body */}
      <ellipse cx="48" cy="75" rx="20" ry="15" fill="#FFD700" />
      {/* feet */}
      <ellipse cx="35" cy="86" rx="11" ry="7" fill="#CCA800" />
      <ellipse cx="61" cy="86" rx="11" ry="7" fill="#CCA800" />
    </>
  );
}

function PikumonAdult() {
  return (
    <>
      <Shadow cy={91} rx={28} />
      {/* lightning tail */}
      <polyline
        points="72,76 84,64 76,56 86,44 78,36"
        fill="none" stroke="#FF8800" strokeWidth="4.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* left ear */}
      <polygon points="16,42 24,8 42,38" fill="#FFD700" />
      <polygon points="20,40 25,16 38,38" fill="#CC8800" opacity="0.55" />
      {/* right ear */}
      <polygon points="54,38 72,8 80,42" fill="#FFD700" />
      <polygon points="58,38 71,16 76,40" fill="#CC8800" opacity="0.55" />
      {/* head */}
      <ellipse cx="48" cy="48" rx="32" ry="30" fill="#FFE033" />
      {/* left eye */}
      <circle cx="33" cy="43" r="10" fill="#1A1A2E" />
      <circle cx="34" cy="42" r="6" fill="#5A3300" />
      <circle cx="38" cy="39" r="3" fill="white" />
      {/* right eye */}
      <circle cx="63" cy="43" r="10" fill="#1A1A2E" />
      <circle cx="64" cy="42" r="6" fill="#5A3300" />
      <circle cx="68" cy="39" r="3" fill="white" />
      {/* nose */}
      <ellipse cx="48" cy="54" rx="4" ry="3" fill="#FF8800" />
      {/* smile */}
      <path d="M 39,62 Q 48,70 57,62" fill="none" stroke="#B87000" strokeWidth="2.5" strokeLinecap="round" />
      {/* cheeks */}
      <ellipse cx="18" cy="54" rx="11" ry="8" fill="#FF4466" opacity="0.6" />
      <ellipse cx="78" cy="54" rx="11" ry="8" fill="#FF4466" opacity="0.6" />
      {/* body */}
      <ellipse cx="46" cy="76" rx="24" ry="17" fill="#FFD700" />
      {/* legs */}
      <ellipse cx="32" cy="88" rx="14" ry="8" fill="#CCA800" />
      <ellipse cx="62" cy="88" rx="14" ry="8" fill="#CCA800" />
      {/* toes */}
      <circle cx="23" cy="91" r="4.5" fill="#BB9600" />
      <circle cx="31" cy="93" r="4.5" fill="#BB9600" />
      <circle cx="40" cy="93" r="4.5" fill="#BB9600" />
      <circle cx="54" cy="93" r="4.5" fill="#BB9600" />
      <circle cx="63" cy="93" r="4.5" fill="#BB9600" />
      <circle cx="71" cy="91" r="4.5" fill="#BB9600" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// TOTOMON — Fluffy Forest Spirit 🌿🦔
// ════════════════════════════════════════════════════════════
function TotomonEgg() {
  return (
    <>
      <Shadow cy={89} rx={26} />
      {/* egg */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#5DB85D" />
      {/* sheen */}
      <ellipse cx="38" cy="28" rx="12" ry="17" fill="#7CD87C" opacity="0.45" />
      {/* leaf sprout */}
      <line x1="48" y1="12" x2="46" y2="28" stroke="#2A6A2A" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="52" cy="12" rx="9" ry="13" fill="#3D7A3D" transform="rotate(-20 52 12)" />
    </>
  );
}

function TotomonBaby() {
  return (
    <>
      <Shadow cy={89} rx={22} />
      {/* left ear */}
      <ellipse cx="28" cy="26" rx="11" ry="15" fill="#A0A0C0" />
      <ellipse cx="28" cy="28" rx="7" ry="10" fill="#6DC87D" />
      {/* right ear */}
      <ellipse cx="68" cy="26" rx="11" ry="15" fill="#A0A0C0" />
      <ellipse cx="68" cy="28" rx="7" ry="10" fill="#6DC87D" />
      {/* big round body */}
      <ellipse cx="48" cy="58" rx="36" ry="32" fill="#A8A8C0" />
      {/* belly */}
      <ellipse cx="48" cy="62" rx="22" ry="20" fill="#E8F4E8" />
      {/* left eye */}
      <circle cx="34" cy="46" r="10" fill="#1A1A2E" />
      <circle cx="37" cy="43" r="5" fill="white" />
      {/* right eye */}
      <circle cx="62" cy="46" r="10" fill="#1A1A2E" />
      <circle cx="65" cy="43" r="5" fill="white" />
      {/* nose */}
      <ellipse cx="48" cy="57" rx="4" ry="3" fill="#606078" />
      {/* smile */}
      <path d="M 40,64 Q 48,70 56,64" fill="none" stroke="#808098" strokeWidth="2" strokeLinecap="round" />
      {/* belly lines */}
      <path d="M 34,72 Q 48,79 62,72" fill="none" stroke="#C8DCC8" strokeWidth="2" />
      {/* feet */}
      <ellipse cx="34" cy="86" rx="13" ry="7" fill="#9090A8" />
      <ellipse cx="62" cy="86" rx="13" ry="7" fill="#9090A8" />
    </>
  );
}

function TotomonAdult() {
  return (
    <>
      <Shadow cy={92} rx={32} />
      {/* large ears */}
      <ellipse cx="22" cy="20" rx="14" ry="19" fill="#9090A8" />
      <ellipse cx="22" cy="22" rx="9" ry="13" fill="#5DB87D" />
      <ellipse cx="74" cy="20" rx="14" ry="19" fill="#9090A8" />
      <ellipse cx="74" cy="22" rx="9" ry="13" fill="#5DB87D" />
      {/* big round body */}
      <ellipse cx="48" cy="54" rx="40" ry="37" fill="#A0A0BC" />
      {/* large white belly */}
      <ellipse cx="48" cy="60" rx="26" ry="25" fill="#E8F4E8" />
      {/* big expressive eyes */}
      <circle cx="30" cy="40" r="13" fill="#1A1A2E" />
      <circle cx="34" cy="36" r="6" fill="white" />
      <circle cx="66" cy="40" r="13" fill="#1A1A2E" />
      <circle cx="70" cy="36" r="6" fill="white" />
      {/* nose */}
      <ellipse cx="48" cy="56" rx="5" ry="3.5" fill="#606078" />
      {/* whisker dots */}
      <circle cx="20" cy="56" r="2.5" fill="#808098" />
      <circle cx="27" cy="61" r="2.5" fill="#808098" />
      <circle cx="69" cy="56" r="2.5" fill="#808098" />
      <circle cx="76" cy="61" r="2.5" fill="#808098" />
      {/* smile */}
      <path d="M 37,66 Q 48,74 59,66" fill="none" stroke="#808098" strokeWidth="2.5" strokeLinecap="round" />
      {/* belly markings */}
      <path d="M 30,74 Q 48,82 66,74" fill="none" stroke="#C8DCC8" strokeWidth="2" />
      <path d="M 34,82 Q 48,88 62,82" fill="none" stroke="#C8DCC8" strokeWidth="1.5" />
      {/* feet */}
      <ellipse cx="30" cy="87" rx="15" ry="8" fill="#888898" />
      <ellipse cx="66" cy="87" rx="15" ry="8" fill="#888898" />
      {/* toe bumps */}
      <ellipse cx="21" cy="91" r="5" fill="#707080" />
      <ellipse cx="30" cy="92" r="5" fill="#707080" />
      <ellipse cx="39" cy="91" r="5" fill="#707080" />
      <ellipse cx="57" cy="91" r="5" fill="#707080" />
      <ellipse cx="66" cy="92" r="5" fill="#707080" />
      <ellipse cx="75" cy="91" r="5" fill="#707080" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// NYANBOT — Robot Cat 🤖🐱
// ════════════════════════════════════════════════════════════
function NyanbotEgg() {
  return (
    <>
      <Shadow cy={89} rx={26} />
      {/* egg body */}
      <ellipse cx="48" cy="46" rx="28" ry="36" fill="#22A0E0" />
      {/* sheen */}
      <ellipse cx="38" cy="28" rx="12" ry="17" fill="#44CCFF" opacity="0.4" />
      {/* circuit lines */}
      <line x1="34" y1="44" x2="62" y2="44" stroke="#0060A0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="24" x2="48" y2="68" stroke="#0060A0" strokeWidth="2.5" strokeLinecap="round" />
      {/* circuit node — center glow */}
      <circle cx="48" cy="44" r="7" fill="#00FFFF" opacity="0.85" />
      <circle cx="48" cy="44" r="4" fill="#008888" />
      {/* corner nodes */}
      <circle cx="34" cy="44" r="3.5" fill="#0088CC" />
      <circle cx="62" cy="44" r="3.5" fill="#0088CC" />
    </>
  );
}

function NyanbotBaby() {
  return (
    <>
      <Shadow cy={89} rx={22} />
      {/* angular cat ears */}
      <polygon points="18,40 26,12 44,38" fill="#22C0FF" />
      <polygon points="22,38 27,18 40,38" fill="#0070AA" />
      <polygon points="52,38 70,12 78,40" fill="#22C0FF" />
      <polygon points="56,38 69,18 74,38" fill="#0070AA" />
      {/* square head with rounded corners */}
      <rect x="14" y="34" width="68" height="54" rx="14" fill="#22C0FF" />
      {/* visor bar */}
      <rect x="14" y="34" width="68" height="16" rx="10" fill="#0080BB" />
      {/* left eye — glowing cyan */}
      <circle cx="33" cy="57" r="11" fill="#0A0A1E" />
      <circle cx="33" cy="57" r="8" fill="#00DDDD" opacity="0.9" />
      <circle cx="33" cy="57" r="4.5" fill="#007777" />
      <circle cx="37" cy="53" r="3" fill="white" opacity="0.85" />
      {/* right eye */}
      <circle cx="63" cy="57" r="11" fill="#0A0A1E" />
      <circle cx="63" cy="57" r="8" fill="#00DDDD" opacity="0.9" />
      <circle cx="63" cy="57" r="4.5" fill="#007777" />
      <circle cx="67" cy="53" r="3" fill="white" opacity="0.85" />
      {/* nose triangle */}
      <polygon points="48,67 43,74 53,74" fill="#FF90B0" />
      {/* cat mouth */}
      <path d="M 40,76 L 48,83 L 56,76" fill="none" stroke="#005580" strokeWidth="2.5" strokeLinecap="round" />
      {/* body panel */}
      <rect x="20" y="84" width="56" height="8" rx="6" fill="#0090CC" />
    </>
  );
}

function NyanbotAdult() {
  return (
    <>
      <Shadow cy={92} rx={30} />
      {/* antenna */}
      <line x1="48" y1="3" x2="48" y2="20" stroke="#C8D4E8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="48" cy="5" r="6" fill="#00FFFF" />
      <circle cx="48" cy="5" r="3" fill="#008888" />
      {/* sharp angular ears */}
      <polygon points="14,38 24,6 44,36" fill="#22C0FF" />
      <polygon points="18,36 25,14 40,36" fill="#0070AA" />
      <polygon points="52,36 72,6 82,38" fill="#22C0FF" />
      <polygon points="56,36 71,14 78,36" fill="#0070AA" />
      {/* head */}
      <rect x="10" y="30" width="76" height="52" rx="16" fill="#22C0FF" />
      {/* visor */}
      <rect x="10" y="30" width="76" height="18" rx="12" fill="#0080BB" />
      {/* left eye — large glowing */}
      <circle cx="30" cy="54" r="13" fill="#0A0A1E" />
      <circle cx="30" cy="54" r="10" fill="#00DDDD" opacity="0.9" />
      <circle cx="30" cy="54" r="5.5" fill="#007777" />
      <circle cx="35" cy="49" r="3.5" fill="white" opacity="0.85" />
      {/* right eye */}
      <circle cx="66" cy="54" r="13" fill="#0A0A1E" />
      <circle cx="66" cy="54" r="10" fill="#00DDDD" opacity="0.9" />
      <circle cx="66" cy="54" r="5.5" fill="#007777" />
      <circle cx="71" cy="49" r="3.5" fill="white" opacity="0.85" />
      {/* nose */}
      <polygon points="48,64 42,72 54,72" fill="#FF90B0" />
      {/* cat mouth */}
      <path d="M 38,74 L 48,83 L 58,74" fill="none" stroke="#005580" strokeWidth="3" strokeLinecap="round" />
      {/* body — silver chassis */}
      <rect x="12" y="82" width="72" height="34" rx="12" fill="#C8D4E8" />
      {/* chest panel */}
      <rect x="24" y="86" width="48" height="22" rx="8" fill="#DDE8F8" />
      {/* circuit dots on chest */}
      <circle cx="36" cy="94" r="5" fill="#00DDDD" opacity="0.85" />
      <circle cx="48" cy="94" r="5" fill="#00DDDD" opacity="0.85" />
      <circle cx="60" cy="94" r="5" fill="#00DDDD" opacity="0.85" />
      <line x1="36" y1="94" x2="60" y2="94" stroke="#0088BB" strokeWidth="2" />
      {/* legs */}
      <rect x="14" y="110" width="26" height="14" rx="7" fill="#1090CC" />
      <rect x="56" y="110" width="26" height="14" rx="7" fill="#1090CC" />
      {/* feet */}
      <rect x="10" y="118" width="30" height="10" rx="6" fill="#0070AA" />
      <rect x="56" y="118" width="30" height="10" rx="6" fill="#0070AA" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// DEAD — greyed out X eyes skull
// ════════════════════════════════════════════════════════════
function DeadSprite() {
  return (
    <>
      <ellipse cx="48" cy="54" rx="32" ry="30" fill="#555566" />
      {/* X left eye */}
      <line x1="30" y1="40" x2="42" y2="52" stroke="#333344" strokeWidth="4" strokeLinecap="round" />
      <line x1="42" y1="40" x2="30" y2="52" stroke="#333344" strokeWidth="4" strokeLinecap="round" />
      {/* X right eye */}
      <line x1="54" y1="40" x2="66" y2="52" stroke="#333344" strokeWidth="4" strokeLinecap="round" />
      <line x1="66" y1="40" x2="54" y2="52" stroke="#333344" strokeWidth="4" strokeLinecap="round" />
      {/* sad mouth */}
      <path d="M 36,68 Q 48,62 60,68" fill="none" stroke="#333344" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

// ════════════════════════════════════════════════════════════
// Sprite lookup table
// ════════════════════════════════════════════════════════════
const SPRITE_MAP: Record<string, Record<string, React.ReactElement>> = {
  pikumon: {
    egg:   <PikumonEgg />,
    baby:  <PikumonBaby />,
    adult: <PikumonAdult />,
    dead:  <DeadSprite />,
  },
  totomon: {
    egg:   <TotomonEgg />,
    baby:  <TotomonBaby />,
    adult: <TotomonAdult />,
    dead:  <DeadSprite />,
  },
  nyanbot: {
    egg:   <NyanbotEgg />,
    baby:  <NyanbotBaby />,
    adult: <NyanbotAdult />,
    dead:  <DeadSprite />,
  },
};

// ════════════════════════════════════════════════════════════
// Main export
// ════════════════════════════════════════════════════════════
export function MonsterSprite({ monsterId, stage, size = 128, className, style }: Props) {
  const content = SPRITE_MAP[monsterId]?.[stage]
    ?? SPRITE_MAP[monsterId]?.egg
    ?? SPRITE_MAP.pikumon.egg;

  const viewH = (monsterId === 'nyanbot' && stage === 'adult') ? 130 : 96;

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
