import { privateRoutes, publicRoutes } from '@/router';
// import { useAppSelector } from '@/hooks/useAppSelector';

export const useAppRoutes = () => {
  // TODO: use 'useAppSelector' hook to get actual connected state form store
  const connected = true;
  return connected ? privateRoutes : publicRoutes;
};
