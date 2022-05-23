import { matchRoutes, useLocation } from 'react-router-dom';
import { IRoute, privateRoutes, publicRoutes } from '@/router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useMemo } from 'react';

export const useAppRoutes = (): [IRoute[], IRoute | null] => {
  const connected = useAppSelector((state) => state.solanaWallet.connected);
  const routes = useMemo<IRoute[]>(() => {
    return connected ? privateRoutes : publicRoutes;
  }, [connected]);

  const location = useLocation();
  const routeMatch = matchRoutes(routes, location);

  if (routeMatch) {
    const [{ route }] = routeMatch;
    return [routes, route as IRoute];
  }

  return [routes, null];
};
