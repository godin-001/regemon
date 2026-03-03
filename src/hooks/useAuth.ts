import { usePrivy } from '@privy-io/react-auth';

export function useAuth() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const userEmail = user?.email?.address ?? user?.google?.email ?? null;
  const userName  = user?.google?.name ?? userEmail?.split('@')[0] ?? null;
  const userId    = userEmail ?? user?.id ?? null;

  // Key for per-user localStorage data
  const storageKey = userId ? `regemon_user_${userId}` : 'regemon_guest';

  return {
    ready,
    isLoggedIn: authenticated,
    user,
    userName,
    userEmail,
    userId,
    storageKey,
    login,
    logout,
  };
}
