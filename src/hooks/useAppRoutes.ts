import { privateRoutes, publicRoutes } from '@/router';
import { useAppSelector } from '@/hooks/useAppSelector';

export const useAppRoutes = () => {
  const connected = useAppSelector((state) => state.solanaWallet.connected);
  return connected ? privateRoutes : publicRoutes;
};
