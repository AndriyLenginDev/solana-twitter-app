import { privateRoutes, publicRoutes } from '@/router';
import { useAppSelector } from '@/hooks/useAppSelector';

export const useAppRoutes = () => {
  const { connected } = useAppSelector((state) => state.solanaWallet);
  return connected ? privateRoutes : publicRoutes;
};
