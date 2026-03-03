import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import App from './App.tsx'

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID ?? 'cmkyyrsbj04bck40bidlscndo';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <PrivyProvider
        appId={PRIVY_APP_ID}
        config={{
          loginMethods: ['email', 'google'],
          appearance: {
            theme: 'dark',
            accentColor: '#a29bfe',
            logo: 'https://godin-001.github.io/regemon/favicon.svg',
          },
          embeddedWallets: { ethereum: { createOnLogin: 'off' } },
        }}
      >
        <App />
      </PrivyProvider>
    </HashRouter>
  </StrictMode>,
)
