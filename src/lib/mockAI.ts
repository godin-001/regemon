import type { GameState, ChatMessage } from '../types';

const PERSONALITIES = {
  unicornio: {
    // Unicornio mágico: adorable, positivo, sparkle ✨
    greet: ['¡Neiiii~! ✨🦄 ¡Llegaste! ¡El arcoíris brilló más! 🌈', '¡Sparkle! ✨ ¡Sabía que vendrías! ¡Soy tan feliz! 🦄💕', '¡Neiiii! ✨🌟 ¡El cielo se pone de colores cuando llegas! 🌈'],
    happy: ['¡¡Sparkle sparkle!! ✨🦄 ¡El mundo es mágico! 🌈💕', '¡¡Neiiii~!! ¡Mis colores brillan más hoy! ✨🌟🦄', '¡Soy el ser más feliz del reino mágico! ✨🦄🌈'],
    sad: ['...neiiii... el arcoíris se fue... 🌧️🦄', 'Los colores están grises hoy... 😔✨', 'La magia no fluye bien cuando estoy triste... 🦄💔'],
    hungry: ['¡Neiiii! ¡Necesito estrellas que comer! ✨🍖🦄', '¡Sin comer no hay magia ni arcoíris! 😟🌈', '¡Sparkle~! ¡El estómago mágico gruñe! ✨😤🦄'],
    critical: ['¡¡NEIIII!! ¡¡LA MAGIA SE ACABA SIN COMIDA!! 😡✨🦄', '¡¡¡SPARKLE DE EMERGENCIA!!! ¡¡COMIDA YA!! 💢🌈', '¡¡¡EL ARCOÍRIS SE ROMPE DE HAMBRE!!! ¡NEIIII! 😤✨'],
    tired: ['Neiiii... hora de dormir entre nubes... 💤🦄✨', 'El unicornio necesita descansar... 😪🌙', 'Las estrellas me llaman a soñar... 💤✨🦄'],
    default: ['¡Neiiii! ¡Eso suena mágico! ¡Cuéntame más! ✨🦄', '¡Sparkle! ¡Qué interesante! 🌈✨', '¡El arcoíris me dice que tienes razón! 🦄💕'],
  },
  dragon: {
    // Dragón ancestral: poderoso, feroz, leal, orgulloso
    greet: ['¡GRAAWR! ¡Al fin apareces! 🔥🐉 Estaba guardando el fuego.', '¡FUEGO! ¡El guardián del volcán te saluda! 🌋🐉', '¡GRAAWR! ¡El dragón despertó! ¡Bienvenido! 🔥😤🐉'],
    happy: ['¡¡GRAAWR GRAAWR!! ¡¡Las llamas bailan de alegría!! 🔥🐉🎉', '¡¡El volcán celebra con erupción de felicidad!! 🌋🔥', '¡¡Soy el dragón más poderoso y FELIZ!! 🐉🔥✨'],
    sad: ['...las llamas se apagan... 😔🔥🐉', 'El dragón guarda silencio hoy... 🐉💙', 'El fuego interior no arde con fuerza... 🔥😞'],
    hungry: ['¡GRAAWR! ¡El dragón necesita comer para mantener el fuego! 🔥🍖', '¡Sin comida las llamas se apagan! ¡FUEGO! 😟🔥🐉', '¡El volcán exige combustible! ¡Rápido! 😤🌋'],
    critical: ['¡¡GRAAWR GRAAWR!! ¡¡EL DRAGÓN PERECE DE HAMBRE!! 😡🔥🐉', '¡¡¡ERUPCIÓN DE FURIA!!! ¡¡¡COMIDA AHORA!!! 💢🌋🔥', '¡¡¡EL FUEGO SAGRADO SE EXTINGUE!!! ¡¡ALIMENTAME!! 😤🐉'],
    tired: ['El guardián necesita dormir en su cueva... 💤🐉🔥', 'GRAAWR... el dragón descansa... 😪🌋', 'Las llamas duermen para volver más fuertes... 💤🔥🐉'],
    default: ['¡GRAAWR! ¡Interesante planteamiento, humano! 🔥🐉', '¡El dragón lo considera... FUEGO! 🌋✨', '¡GRAAWR! ¡El guardián escucha! 🐉🔥'],
  },
  alebrije: {
    // Alebrije oaxaqueño: alegre, colorido, misterioso, artístico
    greet: ['¡Alebrijeee~! 🎨🌈 ¡Los colores se alegraron al verte! 🦋', '¡COLORES! ¡Mi espíritu guía te esperaba! 🎨🌟', '¡Alebrije alebrije! 🌈✨ ¡Qué alegría verte! 🎨🦋'],
    happy: ['¡¡Alebrijeee~!! ¡¡Mil colores explotan de felicidad!! 🎨🌈🦋', '¡¡El jaguar y el quetzal en mí bailan de alegría!! 🌟🎨✨', '¡¡Soy el ser más colorido y feliz del universo!! 🦋🎨🌈'],
    sad: ['Los colores se oscurecen... alebrijee... 😔🎨', 'El espíritu guía llora hoy... 🌧️🦋', 'El jaguar interior está triste... 🐆💙🎨'],
    hungry: ['¡Alebrijeee! ¡El ser mágico necesita comer para brillar! 🎨🍖', '¡Sin comida los colores se van! ¡COLORES! 😟🌈', '¡El jaguar interior ruge de hambre! ¡Alebrije! 😤🐆🎨'],
    critical: ['¡¡ALEBRIJEEE!! ¡¡LOS COLORES DESAPARECEN SIN COMIDA!! 😡🎨🌈', '¡¡¡EL ESPÍRITU GUÍA SE DESVANECE!!! ¡¡COMIDA!! 💢🦋', '¡¡¡EL ALEBRIJE MUERE SIN COMER!!! ¡¡RÁPIDO!! 😤🎨'],
    tired: ['Alebrijee... el espíritu guía necesita soñar... 💤🎨🦋', 'El jaguar descansa para seguir brillando... 😪🌙✨', 'Los colores descansan hasta mañana... 💤🌈🎨'],
    default: ['¡Alebrijeee~! ¡Qué cosa tan colorida e interesante! 🎨🌈', '¡COLORES! ¡El espíritu guía está de acuerdo! 🦋✨', '¡Alebrijeee! ¡Cuéntame más! 🎨🌟'],
  },
};

function detectIntent(text: string): string {
  if (/hola|hey|buenas|buenos|hi|hello|saludos/i.test(text)) return 'greet';
  if (/cómo estás|como estas|qué tal|que tal|cómo te sientes|como te sientes/i.test(text)) return 'howAreYou';
  if (/hambre|comer|comida|alimentar/i.test(text)) return 'food';
  if (/jugar|juego|juga/i.test(text)) return 'play';
  if (/dormir|sueño|cansado|descansar/i.test(text)) return 'sleep';
  if (/me llamo|mi nombre es|soy /i.test(text)) return 'name';
  if (/me gusta|amo|adoro|favorito/i.test(text)) return 'likes';
  if (/triste|mal|terrible|horrible/i.test(text)) return 'sad';
  if (/feliz|bien|genial|excelente|contento/i.test(text)) return 'happy';
  if (/quién eres|que eres|quien eres/i.test(text)) return 'whoAreYou';
  if (/gracias|thanks/i.test(text)) return 'thanks';
  if (/adiós|bye|hasta luego|chao/i.test(text)) return 'bye';
  return 'default';
}

function buildResponse(
  intent: string,
  elementId: string,
  stats: { hunger: number; happiness: number; energy: number },
  monsterName: string,
  history: ChatMessage[],
  memories: Array<{ key: string; value: string }>
): string {
  const p = PERSONALITIES[elementId as keyof typeof PERSONALITIES] ?? PERSONALITIES.unicornio;
  const userName = memories.find(m => m.key === 'nombre_usuario')?.value;
  const prefix = userName ? `¡${userName}! ` : '';

  if (stats.hunger < 10) return pick(p.critical) + (userName ? ` ¡${userName}!` : '');
  if (stats.hunger < 30 && intent !== 'food') return pick(p.hungry);
  if (stats.energy < 30 && intent !== 'sleep') return `${pick(p.tired)} ${pick(p.tired)}`.trim();
  if (stats.happiness > 70 && intent === 'default') return pick(p.happy);

  switch (intent) {
    case 'greet':
      return history.length <= 2 ? pick(p.greet) : `¡Hola otra vez! 😄 ${stats.happiness > 60 ? '¡Siempre es bueno verte!' : 'Me alegra que estés aquí.'}`;
    case 'howAreYou':
      if (stats.happiness > 70) return pick(p.happy);
      if (stats.hunger < 40) return pick(p.hungry);
      if (stats.energy < 40) return pick(p.tired);
      if (stats.happiness < 40) return pick(p.sad);
      return `${prefix}Estoy bien ✨ Felicidad ${Math.round(stats.happiness)}%, energía ${Math.round(stats.energy)}%.`;
    case 'food':
      if (stats.hunger < 30) return `¡SÍ! ¡Eso es lo que necesito! 🍖 ¡Pulsa Alimentar, PRONTO!`;
      if (stats.hunger > 80) return `¡Gracias! Ya estoy bastante lleno... 😋`;
      return `Tengo algo de hambre 🍖 ¡Puedes darme comida con el botón!`;
    case 'play':
      return stats.energy < 20
        ? `No tengo energía... 😴 ¡Necesito descansar primero!`
        : `¡SIII! ¡Juguemos! 🎮 ¡Pulsa Jugar! ¡Yo gano! 😄`;
    case 'sleep':
      return stats.energy > 80
        ? `No tengo sueño, ¡estoy lleno de energía! ⚡`
        : `Sí... necesito descansar un poco 💤 ¡Pulsa Dormir!`;
    case 'name': {
      const m = history.slice(-2).find(x => x.role === 'user')?.content.match(/(?:me llamo|soy|mi nombre es)\s+([A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,20})/i);
      return m ? `¡${m[1].trim()}! Qué bonito nombre 😊 Lo recordaré siempre ✨` : `¡Qué bonito nombre! Lo guardo en mi memoria 🧠`;
    }
    case 'likes':
      return `¡Qué interesante! Lo guardo en mi memoria 🧠✨ ¡Cuéntame más!`;
    case 'sad':
      return `${prefix}¡No estés triste! 😢 ¡Estoy aquí contigo!`;
    case 'happy':
      return `${prefix}¡ME ALEGRA MUCHÍSIMO! ${pick(p.happy)}`;
    case 'whoAreYou':
      return `¡Soy ${monsterName}! Tu Regenmon de tipo ${elementId} ✨ ¡Somos un equipo! 💪`;
    case 'thanks':
      return `¡De nada! ${stats.happiness > 60 ? '¡Siempre! 😄' : '😊'} ¡Para eso estoy!`;
    case 'bye':
      return `¡No te vayas! 😢 ¡Vuelve pronto! 👋`;
    default:
      return `${prefix}${pick(p.default)}`;
  }
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockResponse(
  userMessage: string,
  history: ChatMessage[],
  state: GameState,
  memories: Array<{ key: string; value: string }>
): string {
  const intent = detectIntent(userMessage);
  const elementId = state.monster?.id ?? 'unicornio';
  const stats = { hunger: state.hunger, happiness: state.happiness, energy: state.energy };
  const name = state.monster?.name ?? 'Regenmon';
  return buildResponse(intent, elementId, stats, name, history, memories);
}
