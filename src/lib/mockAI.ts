import type { GameState, ChatMessage } from '../types';

const PERSONALITIES = {
  pikumon: {
    // Ratoncito eléctrico: energético, curioso, entusiasta
    greet: ['¡PIKU PIKU! ¡Ya llegaste! ⚡🐭', '¡CHISPAZO! ¡Estaba esperándote! ⚡✨', '¡Eyyy! ¡Piku Piku! ¿Dónde estabas? ⚡😄'],
    happy: ['¡¡PIKU PIKU!! ¡Estoy superchargado! ⚡🎉', '¡¡¡Soy imparable hoy!!! ⚡💛✨', '¡La electricidad fluye! ¡PIKU! ⚡🐭'],
    sad: ['...piku... la chispa no enciende... 😔⚡', 'Sin energía hoy... piku... 😞🐭', 'Las orejas caídas... piku piku... 🐭💤'],
    hungry: ['¡Piku! ¡Necesito comer o me apago! ⚡🍖', '¡Sin comida no hay voltaje! ¡Rápido! 😤🐭', '¡PIKU PIKU! ¡Hambre! ⚡😟'],
    critical: ['¡¡PIKU PIKU PIKU!! ¡¡COMIDA AHORA!! 😡⚡', '¡¡¡ME DESCARGO!!! ¡¡¡ALIMENTAME!!! ⚡💢🐭', '¡¡HAMBRE!! ¡La batería a cero! 😤⚡'],
    tired: ['Necesito recargarme... piku... 💤⚡', 'La batería al mínimo... zzz piku 😪🐭', 'Sin energía no hay chispa... 💤'],
    default: ['¡Piku! ¡Qué interesante! ¡Cuéntame más! ⚡', '¡Ooh! ¡Eso me da chispa! ✨🐭', '¡Exploremos esa idea! ¡PIKU! ⚡'],
  },
  totomon: {
    // Espíritu del bosque: tranquilo, soñoliento, sabio, tierno
    greet: ['Totoo... 🌳 qué bueno que llegaste...', 'Mmm... estaba durmiendo 🌿😴 ah, hola...', 'Totomon está aquí 🌳 descansando bajo el árbol...'],
    happy: ['Totoo~ 🌳💚 el bosque está feliz hoy...', 'Mmm... qué paz tan bonita 🌿✨', 'El viento entre las hojas dice que todo está bien... 🌳'],
    sad: ['Las hojas están caídas... totoo... 🍂😢', 'El bosque llora hoy... 🌿😔', 'Totomon está solo... 🌳💙'],
    hungry: ['Totoo... 🌳 el estómago hace ruido entre las ramas...', 'Mmm... necesito energía del bosque... 🌿🍖', 'Totomon tiene hambre... por favor... 😟🌳'],
    critical: ['¡¡TOTOO!! ¡¡EL BOSQUE SE MARCHITA!! ¡COMIDA! 😡🌳', '¡¡Sin comida Totomon desaparece!! ¡Por favor!! 💢🌿', '¡¡¡HAMBRE!!! ¡¡Las raíces se secan!! 😤🌳'],
    tired: ['Zzz... totoo... ya es hora de dormir... 💤🌳', 'El árbol grande descansa... 😪🌿 Totomon también...', 'Totoo... tanto sueño... 💤'],
    default: ['Totoo... eso es muy profundo... 🌳', 'Mmm... el bosque dice que tienes razón... 🌿', 'Totomon escucha... totoo... 🌳💚'],
  },
  nyanbot: {
    // Gato robot: leal, juguetón, usa gadgets, referencia su "bolsa mágica"
    greet: ['¡Nyan! ¡Procesando llegada del usuario! 🤖🐱', '¡BIIIP! ¡Sistema activo! ¡Hola! 🤖✨', '¡Nyan nyan! ¡Estaba calibrando mis gadgets! 🐱🤖'],
    happy: ['¡BIIIP! ¡Felicidad al 100%! 🤖🎉', '¡Nyan! ¡Todos los sistemas en verde! ✅🐱', '¡¡Soy el gato más feliz del futuro!! 🤖💙'],
    sad: ['...sistema... error... nyan... 😔🤖', 'Los gadgets no funcionan bien cuando estoy triste... 🐱💙', 'Nyan... el procesador está lento hoy... 🤖😞'],
    hungry: ['¡ALERTA! ¡Batería de hambre al mínimo! 🤖🍖', '¡Nyan! ¡Necesito combustible para mis gadgets! 😟🐱', '¡Sistema de hambre activado! ¡Por favor! 🤖'],
    critical: ['¡¡ERROR CRÍTICO!! ¡¡NYAN NYAN!! ¡¡COMIDA YA!! 😡🤖', '¡¡¡APAGÓN INMINENTE!!! ¡¡Necesito comida!! ⚠️🐱', '¡¡¡ALARMA!!! ¡¡¡HAMBRE EXTREMA!!! ¡¡Nyan nyan!! 😤🤖'],
    tired: ['...batería baja... activando modo sueño... 💤🤖', 'Nyan... necesito recargar en mi cama del futuro... 😪🐱', 'Procesador sobrecalentado... a dormir... 💤🤖'],
    default: ['¡Nyan! ¡Búscando en mi bolsa mágica la respuesta! 🤖🎒', '¡BIIIP! ¡Dato interesante! ¡Cuéntame más! 🐱✨', '¡Nyan nyan! ¡Me parece fascinante! 🤖💙'],
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
  const p = PERSONALITIES[elementId as keyof typeof PERSONALITIES] ?? PERSONALITIES.pikumon;
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
  const elementId = state.monster?.id ?? 'pikumon';
  const stats = { hunger: state.hunger, happiness: state.happiness, energy: state.energy };
  const name = state.monster?.name ?? 'Regenmon';
  return buildResponse(intent, elementId, stats, name, history, memories);
}
