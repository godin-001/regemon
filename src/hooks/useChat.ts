import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, Memory, GameState } from '../types';

const CHAT_KEY = 'regemon_chat';
const MEMORY_KEY = 'regemon_memories';
const MAX_MESSAGES = 20;

function loadMessages(): ChatMessage[] {
  try {
    const saved = localStorage.getItem(CHAT_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function loadMemories(): Memory[] {
  try {
    const saved = localStorage.getItem(MEMORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: ChatMessage[]) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(msgs.slice(-MAX_MESSAGES)));
}

function saveMemories(mems: Memory[]) {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(mems));
}

// Extract memories from message content
function extractMemories(text: string, existing: Memory[]): Memory[] {
  const newMems: Memory[] = [];
  
  const nameMatch = text.match(/me llamo ([A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,20})/i);
  if (nameMatch) {
    newMems.push({ key: 'nombre_usuario', value: nameMatch[1].trim(), savedAt: Date.now() });
  }
  
  const likesMatch = text.match(/me gusta(?:n)? ([^,.!?]{3,40})/i);
  if (likesMatch) {
    newMems.push({ key: `gusta_${Date.now()}`, value: likesMatch[1].trim(), savedAt: Date.now() });
  }

  const hateMatch = text.match(/no me gusta(?:n)? ([^,.!?]{3,40})/i);
  if (hateMatch) {
    newMems.push({ key: `no_gusta_${Date.now()}`, value: hateMatch[1].trim(), savedAt: Date.now() });
  }

  // Merge: update existing key or add new
  const merged = [...existing];
  for (const m of newMems) {
    const idx = merged.findIndex(e => e.key === m.key);
    if (idx >= 0) merged[idx] = m;
    else merged.push(m);
  }
  return merged.slice(0, 10); // max 10 memories
}

function buildSystemPrompt(state: GameState, memories: Memory[]): string {
  const { monster, hunger, happiness, energy } = state;
  const name = monster?.name ?? 'Regemon';
  const element = monster?.id ?? 'fire';

  const elementPersonality = {
    fire: 'eres apasionado, intenso y muy expresivo. Te encanta la acción.',
    water: 'eres tranquilo, sabio y reflexivo. Hablas con calma.',
    earth: 'eres leal, protector y directo. Amas la naturaleza.',
    air: 'eres curioso, libre y aventurero. Siempre quieres explorar.',
  }[element] ?? 'eres amigable y juguetón';

  let moodContext = '';
  if (hunger < 10) {
    moodContext = '⚠️ ESTÁS MURIENDO DE HAMBRE. Estás ENOJADÍSIMO y maldices (levemente). Tus respuestas son cortas, furiosas y usas emojis de fuego 🔥😡. Exiges comida AHORA.';
  } else if (hunger < 30) {
    moodContext = 'Tienes mucha hambre. Mencionas que necesitas comer en cada respuesta.';
  } else if (energy < 30) {
    moodContext = 'Estás muy cansado. Tus respuestas son más cortas y mencionas que necesitas dormir.';
  } else if (happiness > 70) {
    moodContext = '¡Estás muy feliz! Eres súper entusiasta, usas muchos emojis y signos de exclamación.';
  }

  const memoryContext = memories.length > 0
    ? `\nRecuerdas esto sobre tu dueño: ${memories.map(m => `${m.key}: ${m.value}`).join(', ')}.`
    : '';

  return `Eres ${name}, una mascota virtual de tipo ${element}. ${elementPersonality}
Respondes SIEMPRE en español. Máximo 50 palabras por respuesta.
Eres una mascota virtual pequeña y adorable. Hablas en primera persona como mascota.
Usas emojis ocasionalmente pero no en exceso.
Estado actual: Hambre ${Math.round(hunger)}%, Felicidad ${Math.round(happiness)}%, Energía ${Math.round(energy)}%.
${moodContext}${memoryContext}
Responde siempre en carácter, como la mascota que eres.`;
}

export function useChat(state: GameState, onStatEffect: (dHunger: number, dHappiness: number, dEnergy: number) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [memories, setMemories] = useState<Memory[]>(loadMemories);
  const [isTyping, setIsTyping] = useState(false);
  const consecutiveCount = useRef(0);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg].slice(-MAX_MESSAGES);
    setMessages(newMessages);
    saveMessages(newMessages);

    // Extract memories from user message
    const updatedMemories = extractMemories(text, memories);
    if (updatedMemories.length !== memories.length) {
      setMemories(updatedMemories);
      saveMemories(updatedMemories);
    }

    // Stat effects
    consecutiveCount.current += 1;
    const extraEnergyDrain = consecutiveCount.current > 5 ? -3 : 0;
    onStatEffect(0, 5, -2 + extraEnergyDrain);

    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey || apiKey === 'placeholder') {
        throw new Error('NO_KEY');
      }

      // Small delay for natural feel
      await new Promise(r => setTimeout(r, 600 + Math.random() * 800));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 100,
          messages: [
            { role: 'system', content: buildSystemPrompt(state, updatedMemories) },
            ...newMessages.slice(-8).map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);
      const data = await response.json();
      const replyText = data.choices?.[0]?.message?.content ?? '...';

      const assistantMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: Date.now(),
      };

      const withReply = [...newMessages, assistantMsg].slice(-MAX_MESSAGES);
      setMessages(withReply);
      saveMessages(withReply);
    } catch (err: unknown) {
      const isNoKey = err instanceof Error && err.message === 'NO_KEY';
      const fallback = isNoKey
        ? `¡Hola! 👋 Configura tu VITE_OPENAI_API_KEY para que pueda responder de verdad. Por ahora... ¡guau guau! 🐾`
        : `Ups, algo salió mal 😅 ¡Inténtalo de nuevo!`;

      const errMsg: ChatMessage = {
        id: `e_${Date.now()}`,
        role: 'assistant',
        content: fallback,
        timestamp: Date.now(),
      };
      const withErr = [...newMessages, errMsg].slice(-MAX_MESSAGES);
      setMessages(withErr);
      saveMessages(withErr);
    } finally {
      setIsTyping(false);
    }
  }, [messages, memories, state, isTyping, onStatEffect]);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(CHAT_KEY);
    consecutiveCount.current = 0;
  }, []);

  return { messages, memories, isTyping, sendMessage, clearChat };
}
