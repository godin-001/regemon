import type { GameState, ChatMessage } from '../types';

const PERSONALITIES = {
  semilla: {
    greet: ['¡Hola! 🌱 Qué bueno verte', '¡Llegaste! ¡Estaba echando raíces esperándote! 🌿', 'Hola amigo 🌱 ¿cómo estás?'],
    happy: ['¡Me siento fuerte como un árbol! 🌿💚', '¡Todo crece bien hoy! 🌱✨', '¡Qué bonito día para florecer! 🌿'],
    sad: ['Mis hojas están caídas... 🍂', 'No tengo mucha energía hoy 😞🌱', 'Las raíces están débiles...'],
    hungry: ['Oye... necesito nutrirme 🌱🍖', 'La semilla necesita alimento... 😟', '¡Tengo hambre! ¡Por favor! 🌿😤'],
    critical: ['¡¡ME MARCHITO!! ¡¡DAME COMIDA YA!! 😡🌿', '¡Mis raíces se secan! ¡ALIMENTAME! 💢🌿', '¡¡¡HAMBRE!!! ¡No aguanto más! 😤🍃'],
    tired: ['Voy a descansar como los árboles en invierno... 💤', 'Las raíces están cansadas 😪🌱', 'Estoy muy cansado... 🌿💤'],
    default: ['Mmm... eso tiene raíces profundas 🌿', '¡Interesante! ¡Cuéntame más! 🌱', 'Creo que tienes razón 🌿'],
  },
  gota: {
    greet: ['Hola 💧 qué bueno que estás aquí', 'Llegaste 🌊 te estaba esperando...', 'Ah, estás aquí 💙 qué tranquilo este momento'],
    happy: ['Me siento muy bien hoy 💙✨', 'Todo fluye perfecto 🌊', '¡Qué hermoso día! 💧💙'],
    sad: ['Estoy un poco triste... 💙😢', 'Las olas no están bien hoy 😔', 'Me siento solo... 💧'],
    hungry: ['Tengo hambre amigo... 💧🍖', 'No puedo fluir con el estómago vacío 😟', '¿Podrías darme de comer? 🌊'],
    critical: ['Me seco... necesito comida 😢💧', '¡Por favor... comida... me desvanezco! 💙😢', '¡HAMBRE! ¡El agua se agota! 😭💧'],
    tired: ['Necesito descansar como el mar en calma... 💙', 'El sueño me llama... 💤', 'Estoy muy cansado... 💧😪'],
    default: ['Qué interesante 💙', 'El agua toma la forma de todo... igual que tus palabras 🌊', 'Hmm... déjame pensar 💧'],
  },
  chispa: {
    greet: ['¡HOLAAA! ¡YA LLEGASTE! ✨⚡', '¡WOOOO! ¡Aquí estoy brillando! ✨', '¡Eyyy! ¡Pensé que nunca llegabas! ⚡😄'],
    happy: ['¡ESTOY BRILLANDOOOO! ✨🎉', '¡TODO ES FANTÁSTICO! ⚡💛', '¡Soy pura energía! ✨'],
    sad: ['...la chispa se apaga... 😔✨', 'No tengo mucha energía hoy 😞', 'La luz está tenue...'],
    hungry: ['¡Oye! ¡Me apago de hambre! ✨🍖', '¡Sin comida no hay chispa! ¡Rápido! 😤', '¡No puedo brillar con el estómago vacío! ⚡'],
    critical: ['¡¡ME APAGO!! ¡¡COMIDA AHORA!! 😡✨', '¡¡¡SIN COMIDA DESAPAREZCO!!! ⚡💢', '¡¡HAMBRE!! ¡La chispa se extingue! 😤⚡'],
    tired: ['Necesito recargarme... 💤✨', 'La batería al mínimo... zzz 😪', 'Sin energía no hay luz... 💤⚡'],
    default: ['¡Ooh, qué interesante! ¡Cuéntame! ✨', '¡Me iluminas con lo que dices! ⚡', '¡Exploremos esa idea! ✨'],
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
  const p = PERSONALITIES[elementId as keyof typeof PERSONALITIES] ?? PERSONALITIES.semilla;
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
  const elementId = state.monster?.id ?? 'semilla';
  const stats = { hunger: state.hunger, happiness: state.happiness, energy: state.energy };
  const name = state.monster?.name ?? 'Regenmon';
  return buildResponse(intent, elementId, stats, name, history, memories);
}
