import 'nes.css/css/nes.min.css';
import './App.css';
import { useGame } from './hooks/useGame';
import { SelectScreen } from './components/SelectScreen';
import { GameScreen } from './components/GameScreen';

function App() {
  const { state, chooseMonster, feed, play, sleep, reset } = useGame();

  return (
    <div className="app-wrapper">
      <header style={{ textAlign: 'center', padding: '1.5rem 1rem 0.5rem' }}>
        <h1 className="gradient-title">⚔️ REGEMON ⚔️</h1>
        <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>
          VibeCoding Bootcamp · Sesión 1
        </p>
      </header>

      <main style={{ padding: '1rem' }}>
        {!state.chosen ? (
          <SelectScreen onSelect={chooseMonster} />
        ) : (
          <GameScreen
            state={state}
            onFeed={feed}
            onPlay={play}
            onSleep={sleep}
            onReset={reset}
          />
        )}
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.65rem', color: '#aaa' }}>
        Frutero Club 🍌 · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
