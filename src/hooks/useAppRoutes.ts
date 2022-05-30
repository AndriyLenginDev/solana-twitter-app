import { matchRoutes, useLocation } from 'react-router-dom';
import { IRoute, privateRoutes, publicRoutes, routes as allRoutes } from '@/router';
import { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export const useAppRoutes = (): [IRoute[], IRoute | null] => {
  const { connected } = useWallet();
  const routes = useMemo<IRoute[]>(() => {
    return connected ? privateRoutes : publicRoutes;
  }, [connected]);

  const location = useLocation();
  const routeMatch = matchRoutes(allRoutes, location);

  if (routeMatch) {
    const [{ route }] = routeMatch;
    return [routes, route as IRoute];
  }

  return [routes, null];
};
