import { useState, useCallback } from 'react';
import 'nes.css/css/nes.min.css';
import './App.css';
import { useGame } from './hooks/useGame';
import { useChat } from './hooks/useChat';
import { useAuth } from './hooks/useAuth';
import { useFruta } from './hooks/useFruta';
import { useTraining } from './hooks/useTraining';
import { SelectScreen } from './components/SelectScreen';
import { GameScreen } from './components/GameScreen';
import { ChatBox } from './components/ChatBox';
import { Header } from './components/Header';
import { History } from './components/History';
import type { TrainingCategory } from './types';

interface FloatItem { id: string; text: string; color: string; }

function App() {
  const { ready, isLoggedIn, userName, storageKey, login, logout } = useAuth();
  const { state, chooseMonster, feed, play, sleep, chatStatEffect, reset } = useGame(storageKey);
  const { coins, history, floatEvents, spend, earnFromChat, earnDirect, canAfford } = useFruta(storageKey, isLoggedIn);
  const { training, isEvaluating, evaluate } = useTraining(storageKey);
  const [floatItems, setFloatItems] = useState<FloatItem[]>([]);

  // Merge coin floats + stat floats
  const allFloats = [...floatItems, ...floatEvents];

  const handleStatEffect = useCallback((dHunger: number, dHappiness: number, dEnergy: number) => {
    chatStatEffect(dHunger, dHappiness, dEnergy);
    if (dHappiness > 0) {
      setFloatItems(prev => [...prev, {
        id: `f_${Date.now()}_h`, text: `+${dHappiness} ❤️`, color: '#ff85a1',
      }]);
    }
    if (dEnergy < 0) {
      setFloatItems(prev => [...prev, {
        id: `f_${Date.now()}_e`, text: `${dEnergy} ⚡`, color: '#ffe66d',
      }]);
    }
  }, [chatStatEffect]);

  const { messages, memories, isTyping, sendMessage, clearChat } = useChat(
    storageKey,
    state,
    handleStatEffect,
    earnFromChat,
  );

  const removeFloat = useCallback((id: string) => {
    setFloatItems(prev => prev.filter(f => f.id !== id));
  }, []);

  const handleFeedWithCoins = useCallback(() => {
    const ok = spend(10, '🍊 Alimentar -10');
    if (ok) feed();
  }, [spend, feed]);

  const handleEvaluate = useCallback(async (imageBase64: string, category: TrainingCategory) => {
    const result = await evaluate(
      imageBase64,
      category,
      (dHunger, dHappiness, dEnergy) => {
        chatStatEffect(dHunger, dHappiness, dEnergy);
        // Floating indicators for training
        if (dHappiness > 0) setFloatItems(prev => [...prev, { id: `t_h_${Date.now()}`, text: `+${dHappiness} ❤️`, color: '#ff85a1' }]);
        if (dHappiness < 0) setFloatItems(prev => [...prev, { id: `t_hn_${Date.now()}`, text: `${dHappiness} ❤️`, color: '#ff6b6b' }]);
        if (dEnergy < 0) setFloatItems(prev => [...prev, { id: `t_e_${Date.now()}`, text: `${dEnergy} ⚡`, color: '#ffe66d' }]);
        if (dHunger > 0) setFloatItems(prev => [...prev, { id: `t_f_${Date.now()}`, text: `+${dHunger} 🍖`, color: '#ff922b' }]);
      },
      earnDirect,
    );
    return result;
  }, [evaluate, chatStatEffect, earnDirect]);

  const handleReset = useCallback(() => {
    reset();
    clearChat();
  }, [reset, clearChat]);

  if (!ready) {
    return (
      <div className="app-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#aaa', fontSize: '0.8rem' }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        coins={coins}
        onLogin={login}
        onLogout={logout}
      />

      <main style={{ padding: '0.5rem 1rem 1rem' }}>
        {!state.chosen ? (
          <SelectScreen onSelect={chooseMonster} />
        ) : (
          <>
            <GameScreen
              state={state}
              isLoggedIn={isLoggedIn}
              canAfford={canAfford}
              training={training}
              isEvaluating={isEvaluating}
              onEvaluate={handleEvaluate}
              onFeed={feed}
              onFeedWithCoins={handleFeedWithCoins}
              onPlay={play}
              onSleep={sleep}
              onReset={handleReset}
              floatItems={allFloats}
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

            <History entries={history} />
          </>
        )}
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.6rem', color: '#666' }}>
        Frutero Club 🍌 · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
