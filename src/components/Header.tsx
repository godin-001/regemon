interface Props {
  isLoggedIn: boolean;
  userName: string | null;
  coins: number;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ isLoggedIn, userName, coins, onLogin, onLogout }: Props) {
  return (
    <header>
      <div style={{ textAlign: 'center', padding: '1.2rem 1rem 0.25rem' }}>
        <h1 className="gradient-title">⚔️ REGEMON ⚔️</h1>
        <p style={{ fontSize: '0.6rem', color: '#888', margin: '0 0 0.75rem' }}>
          VibeCoding Bootcamp · Sesión 3
        </p>
      </div>

      {/* Auth + coins bar */}
      <div
        className="nes-container"
        style={{
          margin: '0 1rem 0.5rem',
          padding: '0.5rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
        }}
      >
        {/* Coins */}
        <div style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>🍊</span>
          {isLoggedIn ? (
            <span style={{ color: '#a8e063', fontWeight: 'bold' }}>{coins} $FRUTA</span>
          ) : (
            <span style={{ color: '#555' }}>— $FRUTA</span>
          )}
        </div>

        {/* User info + action */}
        <div style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isLoggedIn ? (
            <>
              <span style={{ color: '#bbb' }}>👤 {userName}</span>
              <button
                className="nes-btn is-error"
                onClick={onLogout}
                style={{ fontSize: '0.55rem', padding: '0.3rem 0.5rem' }}
              >
                Salir
              </button>
            </>
          ) : (
            <button
              className="nes-btn is-primary"
              onClick={onLogin}
              style={{ fontSize: '0.6rem', padding: '0.35rem 0.6rem' }}
            >
              🔑 Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
