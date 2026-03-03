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
      {/* Anime banner title */}
      <div style={{
        background: 'linear-gradient(135deg, #0a0a1e 0%, #1a0a2e 50%, #0a0a1e 100%)',
        borderBottom: '2px solid transparent',
        borderImage: 'linear-gradient(90deg, #ff6eb4, #00d4ff, #ffd700, #b44bff) 1',
        padding: '0.9rem 1rem 0.5rem',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
      }}>
        <h1 className="gradient-title">⚔️ REGEMON ⚔️</h1>
        <p style={{ fontSize: '0.5rem', color: '#7070aa', margin: '0 0 0.5rem', letterSpacing: '2px' }}>
          ✦ VibeCoding Bootcamp ✦ Frutero Club ✦
        </p>

        {/* Auth + coins bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          padding: '0.4rem 0.5rem',
          background: 'linear-gradient(90deg, #0d0d2a, #12122a, #0d0d2a)',
          border: '1px solid #b44bff44',
          borderRadius: '2px',
        }}>
          {/* Coins */}
          <div style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>🍊</span>
            {isLoggedIn ? (
              <span style={{
                color: '#ffd700',
                fontWeight: 'bold',
                textShadow: '0 0 8px #ffd700, 0 0 20px #ffd70055',
              }}>
                {coins} $FRUTA
              </span>
            ) : (
              <span style={{ color: '#404060' }}>— $FRUTA</span>
            )}
          </div>

          {/* User info + action */}
          <div style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isLoggedIn ? (
              <>
                <span style={{ color: '#9090cc' }}>
                  ✦ {userName}
                </span>
                <button
                  className="nes-btn is-error"
                  onClick={onLogout}
                  style={{ fontSize: '0.5rem', padding: '0.25rem 0.45rem' }}
                >
                  Salir
                </button>
              </>
            ) : (
              <button
                className="nes-btn is-primary"
                onClick={onLogin}
                style={{ fontSize: '0.55rem', padding: '0.3rem 0.55rem' }}
              >
                🔑 Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
