import type { GameState, ChatMessage } from '../types';

// Respuestas base por tipo de monster
const PERSONALITIES = {
  fire: {
    greet: ['¡OYE! ¡Por fin me hablas! 🔥', '¡HOLA! ¡Estaba esperándote! 🔥💪', '¡Por fin apareceeeees! 😤🔥'],
    happy: ['¡WOOOOO! ¡Soy el mejor! 🔥🎉', '¡Me siento increíble hoy! ¡FUEGO! 💥', '¡Nada me detiene! ¡Soy imparable! 🔥'],
    sad: ['...no me siento tan bien 😞', 'Hoy no tengo mucha energía 💔', 'Estoy un poco bajoneado...'],
    hungry: ['Oye... tengo MUCHA hambre 😤🍖', 'Necesito comer YA. No es broma. 😡', '¡COMIDAAAAA! ¡Me muero! 🔥😡'],
    critical: ['¡ESTOY MURIENDO DE HAMBRE INÚTIL! 😡🔥🔥', '¡¡¡DAME COMIDA AHORA MISMO!!!💀🔥', '¡Me traicionaste! ¡TENGO HAMBRE! ¡AAAARGH! 🔥😤💢'],
    tired: ['zzz... qué cansancio... 😴', 'Necesito dormir... urgente 💤', 'Mis ojos se cierran solos... zzzz 😪'],
    default: ['¡Eso que dijiste está muy bien! 🔥', 'Mmm... interesante lo que piensas 🤔🔥', '¡Cuéntame más! ¡Me interesa! 💪🔥'],
  },
  water: {
    greet: ['Hola... 💧 qué bueno que estás aquí', 'Bienvenido, amigo 🌊 te esperaba', 'Ah... llegaste 💙 qué tranquilo este momento'],
    happy: ['Me siento en paz hoy 💙', 'Todo fluye bien... como el agua 🌊', 'Qué hermoso día para existir 💧✨'],
    sad: ['El agua no miente... estoy triste 💙', 'Siento el peso del océano hoy 😔', 'Las corrientes no están bien hoy...'],
    hungry: ['Necesito algo de comida, amigo... 💧🍖', 'El hambre perturba mi paz interior... 😟', 'No puedo meditar con el estómago vacío...'],
    critical: ['Amigo... me estoy apagando... necesito comer 💀💧', 'El agua... se seca... dame comida... 😢', 'Por favor... comida... me desvanezco 💙😢'],
    tired: ['Necesito descansar como el mar en calma... 💙', 'El sueño me llama... 💤', 'Debo recargar energías meditando... 😪'],
    default: ['Qué interesante perspectiva 💙', 'El agua toma la forma de todo... igual que tus palabras 🌊', 'Hmm... déjame reflexionar sobre eso 💧'],
  },
  earth: {
    greet: ['¡Hey! ¡Aquí estoy! 🌱💪', '¡Llegaste! ¡Genial! Estaba plantado esperándote 🌿', '¡Ey compañero! ¡Bienvenido! 🐢'],
    happy: ['¡Me siento sólido como la roca! 💪🌿', '¡Todo está perfecto! ¡La tierra es buena! 🌱', '¡Fuerte y feliz! ¡Así me gusta! 🐢💪'],
    sad: ['La tierra está triste hoy... 🌿', 'No me siento muy bien... 😞', 'Las raíces están débiles hoy...'],
    hungry: ['Oye... necesito nutrirme 🌱🍖', 'La tierra necesita alimento para crecer...', '¡Comida, por favor! ¡Pronto! 🌿😤'],
    critical: ['¡SOY UNA PLANTA MARCHITÁNDOME! ¡AGUA Y COMIDA YA! 😡🌿', '¡Mis raíces mueren! ¡COMIDA INMEDIATAMENTE! 💢🌿', '¡Me marchito! ¡Es tu culpa! ¡ALIMENTAME! 😤🌿'],
    tired: ['Voy a echarme a descansar como la tierra... 💤', 'Necesito recargar como los árboles en invierno... 😪', 'Estoy muy cansado... 🌿💤'],
    default: ['Mmm... eso que dices tiene raíces profundas 🌿', '¡Interesante! ¡Cuéntame más! 🌱', 'Creo que tienes razón, amigo 🐢'],
  },
  air: {
    greet: ['¡Wohooo! ¡Llegaste! ¡Vueeeloooo! 💨✨', '¡Holaaaa! ¡Aquí arriba! 🌪️', '¡Eyyy! ¡Pensé que nunca llegabas! 💨😄'],
    happy: ['¡Estoy volandoooo de felicidad! 💨🎉', '¡Todo es brillante desde aquí arriba! ✨', '¡WEEEE! ¡Soy libre! 💨🦅'],
    sad: ['El viento está en calma... demasiada calma 😔💨', 'No tengo ganas de volar hoy... 😞', 'Las nubes están muy grises...'],
    hungry: ['¡Ey! ¡Me deshago de hambre! 💨🍖', '¡El viento vacío no alimenta! ¡Comida! 😤', 'No puedo volar bien con el estómago vacío...'],
    critical: ['¡ME DESVANEZCO! ¡SOY SOLO AIRE HAMBRIENTO! 😡💨', '¡COMIDA O ME CONVIERTO EN NADA! ¡YAAA! 💨💢', '¡El viento furioso necesita COMER! ¡AHORA! 😤🌪️'],
    tired: ['Necesito aterrizarrrr... 💤💨', 'El viento se detiene... zzz 😪', 'Me quedo sin fuerza para volar... 💤'],
    default: ['¡Ooh, qué interesante! ¡Cuéntame! 💨', '¡Me vuelo la cabeza con lo que dices! ✨', '¡Exploremos esa idea juntos! 🌪️'],
  },
};

// Detectar intención del mensaje
function detectIntent(text: string): string {
  const lower = text.toLowerCase();
  if (/hola|hey|buenas|buenos|hi|hello|saludos/i.test(lower)) return 'greet';
  if (/cómo estás|como estas|qué tal|que tal|cómo te sientes|como te sientes/i.test(lower)) return 'howAreYou';
  if (/hambre|comer|comida|alimentar|food/i.test(lower)) return 'food';
  if (/jugar|juego|juga|play/i.test(lower)) return 'play';
  if (/dormir|sueño|cansado|tired|descansar/i.test(lower)) return 'sleep';
  if (/me llamo|mi nombre es|soy /i.test(lower)) return 'name';
  if (/me gusta|amo|adoro|love|favorito/i.test(lower)) return 'likes';
  if (/triste|mal|terrible|horrible|pésimo/i.test(lower)) return 'sad';
  if (/feliz|bien|genial|excelente|bueno|contento/i.test(lower)) return 'happy';
  if (/quién eres|que eres|quien eres|what are you/i.test(lower)) return 'whoAreYou';
  if (/gracias|thanks|ty/i.test(lower)) return 'thanks';
  if (/adiós|bye|hasta luego|chao/i.test(lower)) return 'bye';
  return 'default';
}

// Construir respuesta contextual
function buildResponse(
  intent: string,
  elementId: string,
  stats: { hunger: number; happiness: number; energy: number },
  monsterName: string,
  history: ChatMessage[],
  memories: Array<{ key: string; value: string }>
): string {
  const p = PERSONALITIES[elementId as keyof typeof PERSONALITIES] ?? PERSONALITIES.fire;
  const userName = memories.find(m => m.key === 'nombre_usuario')?.value;

  // Override por estado crítico
  if (stats.hunger < 10) {
    return pick(p.critical) + (userName ? ` ¡${userName}!` : '');
  }
  if (stats.hunger < 30 && intent !== 'food') {
    return pick(p.hungry);
  }
  if (stats.energy < 30 && intent !== 'sleep') {
    return pick(p.tired) + ' ' + pick(p.tired);
  }
  if (stats.happiness > 70 && (intent === 'default' || intent === 'happy')) {
    return pick(p.happy);
  }

  // Respuestas por intención
  const prefix = userName ? `¡${userName}! ` : '';

  switch (intent) {
    case 'greet':
      if (history.length <= 2) return pick(p.greet);
      return `¡Hola otra vez! 😄 ${stats.happiness > 60 ? '¡Siempre es bueno verte!' : 'Me alegra que estés aquí.'}`;

    case 'howAreYou':
      if (stats.happiness > 70) return pick(p.happy);
      if (stats.hunger < 40) return pick(p.hungry);
      if (stats.energy < 40) return pick(p.tired);
      if (stats.happiness < 40) return pick(p.sad);
      return `${prefix}Estoy bien, gracias por preguntar 😊 Felicidad ${Math.round(stats.happiness)}%, energía ${Math.round(stats.energy)}%.`;

    case 'food':
      if (stats.hunger < 30) return `¡SÍ! ¡Eso es lo que necesito! 🍖 ¡Pulsa el botón de Comer, PRONTO! 😤`;
      if (stats.hunger > 80) return `¡Gracias! Ya estoy bastante lleno... pero puedo más 😋`;
      return `Mmm... tengo un poco de hambre 🍖 ¡Puedes darme comida con el botón!`;

    case 'play':
      if (stats.energy < 20) return `No tengo energía para jugar... 😴 ¡Necesito descansar primero!`;
      return `¡SIII! ¡Juguemos! 🎮 ¡Pulsa el botón de Jugar! ¡Yo gano! 😄`;

    case 'sleep':
      if (stats.energy > 80) return `No tengo sueño... estoy lleno de energía ⚡`;
      return `Sí... necesito descansar un poco 💤 ¡Pulsa Dormir por favor!`;

    case 'name': {
      const nameMatch = history.slice(-2).find(m => m.role === 'user')?.content.match(/(?:me llamo|soy|mi nombre es)\s+([A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,20})/i);
      const extractedName = nameMatch?.[1]?.trim();
      return extractedName
        ? `¡${extractedName}! Qué bonito nombre 😊 Lo voy a recordar siempre ✨`
        : `¡Qué nombre tan bonito! Voy a recordarlo 🧠`;
    }

    case 'likes':
      return `¡Qué interesante! Lo guardo en mi memoria 🧠✨ ¡Cuéntame más sobre ti!`;

    case 'sad':
      return `${prefix}Ay nooo... no estés triste 😢 ¡Estoy aquí contigo! ${elementId === 'fire' ? '¡Te mando calorcito! 🔥' : '💙'}`;

    case 'happy':
      return `${prefix}¡ME ALEGRA MUCHÍSIMO! ${pick(p.happy)}`;

    case 'whoAreYou':
      return `¡Soy ${monsterName}! Tu mascota virtual de tipo ${elementId} ✨ ¡Somos un equipo! 💪`;

    case 'thanks':
      return `¡De nada! ${stats.happiness > 60 ? '¡Siempre! 😄' : '😊'} ¡Para eso estoy!`;

    case 'bye':
      return `¡No te vayas! 😢 ${stats.happiness > 70 ? '¡Ha sido genial hablar contigo! Vuelve pronto! 👋' : '¡Vuelve a hablarme! Te extrañaré...'}`;

    default:
      // Respuesta contextual con historial
      if (history.length > 4 && history[history.length - 2]?.role === 'assistant') {
        const prev = history[history.length - 2].content;
        if (prev.includes('?')) return `Sí, exactamente... ${pick(p.default)}`;
      }
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
  const elementId = state.monster?.id ?? 'fire';
  const stats = { hunger: state.hunger, happiness: state.happiness, energy: state.energy };
  const name = state.monster?.name ?? 'Regemon';

  return buildResponse(intent, elementId, stats, name, history, memories);
}
