import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Memory } from '../types';

interface Props {
  messages: ChatMessage[];
  memories: Memory[];
  isTyping: boolean;
  monsterName: string;
  monsterColor: string;
  onSend: (text: string) => void;
}

export function ChatBox({ messages, memories, isTyping, monsterName, monsterColor, onSend }: Props) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="nes-container with-title" style={{ marginTop: '1rem' }}>
      <p className="title" style={{ color: monsterColor }}>
        💬 Chat con {monsterName}
        {memories.length > 0 && (
          <span style={{ fontSize: '0.6rem', color: '#a29bfe', marginLeft: '0.5rem' }}>
            🧠 {memories.length} {memories.length === 1 ? 'memoria' : 'memorias'}
          </span>
        )}
      </p>

      {/* Messages area */}
      <div
        style={{
          height: '220px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '0.75rem',
          padding: '0.25rem',
        }}
      >
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '0.7rem', marginTop: '3rem' }}>
            ¡Di hola a tu {monsterName}! 👋
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              animation: 'msgIn 0.2s ease-out',
            }}
          >
            <div
              className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-monster'}
              style={{
                maxWidth: '75%',
                padding: '0.5rem 0.75rem',
                fontSize: '0.7rem',
                lineHeight: '1.4',
                borderRadius: '0',
                border: '2px solid',
                borderColor: msg.role === 'user' ? '#ff85a1' : monsterColor,
                backgroundColor: msg.role === 'user' ? 'rgba(255, 133, 161, 0.15)' : `${monsterColor}22`,
                color: '#e0e0e0',
                wordBreak: 'break-word',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'msgIn 0.2s ease-out' }}>
            <div
              style={{
                padding: '0.5rem 0.75rem',
                fontSize: '0.8rem',
                border: `2px solid ${monsterColor}`,
                backgroundColor: `${monsterColor}22`,
                color: '#aaa',
              }}
            >
              <span className="typing-dots">Escribiendo</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
        <input
          className="nes-input"
          type="text"
          placeholder="Escribe algo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={isTyping}
          style={{
            flex: 1,
            fontSize: '0.7rem',
            backgroundColor: '#0a1628',
            color: '#e0e0e0',
            borderColor: monsterColor,
          }}
        />
        <button
          className="nes-btn is-primary"
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          style={{ fontSize: '0.65rem', padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}
        >
          Enviar ▶
        </button>
      </div>
    </div>
  );
}
