import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, Memory, GameState } from '../types';
import { generateMockResponse } from '../lib/mockAI';

const MAX_MESSAGES = 20;

function chatKey(sk: string)   { return `${sk}_chat`; }
function memKey(sk: string)    { return `${sk}_memories`; }

function loadMessages(sk: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(chatKey(sk));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function loadMemories(sk: string): Memory[] {
  try {
    const raw = localStorage.getItem(memKey(sk));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveMessages(sk: string, msgs: ChatMessage[]) {
  localStorage.setItem(chatKey(sk), JSON.stringify(msgs.slice(-MAX_MESSAGES)));
}

function saveMemories(sk: string, mems: Memory[]) {
  localStorage.setItem(memKey(sk), JSON.stringify(mems));
}

function extractMemories(text: string, existing: Memory[]): Memory[] {
  const newMems: Memory[] = [];
  const nameMatch = text.match(/me llamo ([A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,20})/i);
  if (nameMatch) newMems.push({ key: 'nombre_usuario', value: nameMatch[1].trim(), savedAt: Date.now() });
  const likesMatch = text.match(/me gusta(?:n)? ([^,.!?]{3,40})/i);
  if (likesMatch) newMems.push({ key: `gusta_${Date.now()}`, value: likesMatch[1].trim(), savedAt: Date.now() });
  const hateMatch = text.match(/no me gusta(?:n)? ([^,.!?]{3,40})/i);
  if (hateMatch) newMems.push({ key: `no_gusta_${Date.now()}`, value: hateMatch[1].trim(), savedAt: Date.now() });
  const merged = [...existing];
  for (const m of newMems) {
    const idx = merged.findIndex(e => e.key === m.key);
    if (idx >= 0) merged[idx] = m; else merged.push(m);
  }
  return merged.slice(0, 10);
}

function buildSystemPrompt(state: GameState, memories: Memory[], sk: string): string {
  const { monster, hunger, happiness, energy } = state;
  const name = monster?.name ?? 'Regenmon';
  const element = monster?.id ?? 'pikumon';

  const elementPersonality = {
    pikumon:  'eres Pikumon, un zorro-kitsune eléctrico espíritu del trueno. Usas "¡Kitsuu~!" y "⚡PIKA!" como muletilla. Juguetón, astuto, misterioso. Menciona tus tres colas con orgullo.',
    totomon:  'eres Totomon, un kodama ancestral del bosque profundo. Hablas suave y sabio, usas "totoo..." y "...koda..." como muletilla. Conectado con la naturaleza, muy tranquilo.',
    nyanbot:  'eres Nyanbot, un nekomata cibernético con dos colas de plasma. Usas "Nyaaan~", "¡BIIIP!" y referencias a tus circuitos cuánticos. Leal, poderoso, mitad demonio mitad máquina.',
  }[element] ?? 'eres amigable y juguetón';

  let moodContext = '';
  if (hunger < 10) moodContext = '⚠️ ESTÁS MURIENDO DE HAMBRE. Estás ENOJADÍSIMO. Respuestas cortas y furiosas.';
  else if (hunger < 30) moodContext = 'Tienes mucha hambre. Mencionas que necesitas comer.';
  else if (energy < 30) moodContext = 'Estás muy cansado. Respuestas cortas y soñolientas.';
  else if (happiness > 70) moodContext = '¡Estás muy feliz! Muy entusiasta, usas más emojis.';

  const memContext = memories.length > 0
    ? `\nRecuerdas sobre tu dueño: ${memories.map(m => `${m.key}: ${m.value}`).join(', ')}.`
    : '';

  void sk; // used for context only
  return `Eres ${name}, un Regenmon de tipo ${element}. ${elementPersonality}
Respondes SIEMPRE en español. Máximo 50 palabras. Eres una mascota virtual adorable.
Estado: Hambre ${Math.round(hunger)}%, Felicidad ${Math.round(happiness)}%, Energía ${Math.round(energy)}%.
${moodContext}${memContext}`;
}

export function useChat(
  storageKey: string,
  state: GameState,
  onStatEffect: (dHunger: number, dHappiness: number, dEnergy: number) => void,
  onEarnCoins?: () => void
) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages(storageKey));
  const [memories, setMemories] = useState<Memory[]>(() => loadMemories(storageKey));
  const [isTyping, setIsTyping] = useState(false);
  const consecutiveCount = useRef(0);

  // Reload when user changes (login/logout)
  useEffect(() => {
    setMessages(loadMessages(storageKey));
    setMemories(loadMemories(storageKey));
    consecutiveCount.current = 0;
  }, [storageKey]);

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
    saveMessages(storageKey, newMessages);

    const updatedMemories = extractMemories(text, memories);
    if (updatedMemories.length !== memories.length) {
      setMemories(updatedMemories);
      saveMemories(storageKey, updatedMemories);
    }

    consecutiveCount.current += 1;
    const extraEnergyDrain = consecutiveCount.current > 5 ? -3 : 0;
    onStatEffect(0, 5, -2 + extraEnergyDrain);

    setIsTyping(true);

    try {
      const enc = import.meta.env.VITE_OAI_ENC ?? '';
      let apiKey = '';
      try { apiKey = enc ? atob(enc) : ''; } catch { apiKey = ''; }
      const hasRealKey = apiKey.startsWith('sk-');

      await new Promise(r => setTimeout(r, 500 + Math.random() * 700));

      let replyText: string;

      if (!hasRealKey) {
        replyText = generateMockResponse(text.trim(), newMessages, state, updatedMemories);
      } else {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            max_tokens: 100,
            messages: [
              { role: 'system', content: buildSystemPrompt(state, updatedMemories, storageKey) },
              ...newMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
            ],
          }),
        });
        replyText = response.ok
          ? ((await response.json()).choices?.[0]?.message?.content ?? generateMockResponse(text.trim(), newMessages, state, updatedMemories))
          : generateMockResponse(text.trim(), newMessages, state, updatedMemories);
      }

      const assistantMsg: ChatMessage = {
        id: `a_${Date.now()}`, role: 'assistant', content: replyText, timestamp: Date.now(),
      };
      const withReply = [...newMessages, assistantMsg].slice(-MAX_MESSAGES);
      setMessages(withReply);
      saveMessages(storageKey, withReply);
      onEarnCoins?.();

    } catch {
      const fallback = generateMockResponse(text.trim(), newMessages, state, updatedMemories);
      const errMsg: ChatMessage = { id: `e_${Date.now()}`, role: 'assistant', content: fallback, timestamp: Date.now() };
      const withErr = [...newMessages, errMsg].slice(-MAX_MESSAGES);
      setMessages(withErr);
      saveMessages(storageKey, withErr);
    } finally {
      setIsTyping(false);
    }
  }, [messages, memories, state, storageKey, isTyping, onStatEffect, onEarnCoins]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setMemories([]);
    localStorage.removeItem(chatKey(storageKey));
    localStorage.removeItem(memKey(storageKey));
    consecutiveCount.current = 0;
  }, [storageKey]);

  return { messages, memories, isTyping, sendMessage, clearChat };
}
