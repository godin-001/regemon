import { useState, useCallback } from 'react';
import 'nes.css/css/nes.min.css';
import './App.css';
import { useGame } from './hooks/useGame';
import { useChat } from './hooks/useChat';
import { SelectScreen } from './components/SelectScreen';
import { GameScreen } from './components/GameScreen';
import { ChatBox } from './components/ChatBox';

interface FloatItem { id: string; text: string; color: string; }

function App() {
  const { state, chooseMonster, feed, play, sleep, chatStatEffect, reset } = useGame();
  const [floatItems, setFloatItems] = useState<FloatItem[]>([]);

  const handleStatEffect = useCallback((dHunger: number, dHappiness: number, dEnergy: number) => {
    chatStatEffect(dHunger, dHappiness, dEnergy);
    // Show floating stat text for happiness gain
    if (dHappiness > 0) {
      setFloatItems(prev => [...prev, {
        id: `f_${Date.now()}_h`,
        text: `+${dHappiness} Felicidad ❤️`,
        color: '#ff85a1',
      }]);
    }
    if (dEnergy < 0) {
      setFloatItems(prev => [...prev, {
        id: `f_${Date.now()}_e`,
        text: `${dEnergy} Energía ⚡`,
        color: '#ffe66d',
      }]);
    }
  }, [chatStatEffect]);

  const { messages, memories, isTyping, sendMessage, clearChat } = useChat(state, handleStatEffect);

  const removeFloat = useCallback((id: string) => {
    setFloatItems(prev => prev.filter(f => f.id !== id));
  }, []);

  return (
    <div className="app-wrapper">
      <header style={{ textAlign: 'center', padding: '1.5rem 1rem 0.5rem' }}>
        <h1 className="gradient-title">⚔️ REGEMON ⚔️</h1>
        <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>
          VibeCoding Bootcamp · Sesión 2
        </p>
      </header>

      <main style={{ padding: '1rem' }}>
        {!state.chosen ? (
          <SelectScreen onSelect={chooseMonster} />
        ) : (
          <>
            <GameScreen
              state={state}
              onFeed={feed}
              onPlay={play}
              onSleep={sleep}
              onReset={() => { reset(); clearChat(); }}
              floatItems={floatItems}
              onFloatDone={removeFloat}
            />
            {state.stage !== 'dead' && state.stage !== 'egg' && (
              <ChatBox
                messages={messages}
                memories={memories}
                isTyping={isTyping}
                monsterName={state.monster?.name ?? 'Regemon'}
                monsterColor={state.monster?.color ?? '#a29bfe'}
                onSend={sendMessage}
              />
            )}
          </>
        )}
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.65rem', color: '#aaa' }}>
        Frutero Club 🍌 · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
