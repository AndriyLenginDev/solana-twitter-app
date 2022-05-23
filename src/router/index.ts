import React from 'react';

export enum RouteKeys {
  HOME = 'HOME',
  USERS = 'USERS',
  PROFILE = 'PROFILE'
}

export enum RouteNames {
  HOME = 'Home',
  USERS = 'Users',
  PROFILE = 'Profile'
}

export enum RoutePaths {
  HOME = '/',
  USERS = '/users',
  PROFILE = '/profile'
}

export interface IRoute {
  key: RouteKeys;
  name: RouteNames;
  path: RoutePaths;
  component: React.ComponentType;
}

const generateRoute = (key: RouteKeys): IRoute => ({
  key,
  name: RouteNames[key],
  path: RoutePaths[key],
  component: React.lazy(() => import(`@/pages/${RouteNames[key]}`))
});

export const routesMap: Record<RouteKeys, IRoute> = {
  [RouteKeys.HOME]: generateRoute(RouteKeys.HOME),
  [RouteKeys.USERS]: generateRoute(RouteKeys.USERS),
  [RouteKeys.PROFILE]: generateRoute(RouteKeys.PROFILE)
};

// prettier-ignore
export const publicRoutes: IRoute[] = [
  routesMap[RouteKeys.HOME],
  routesMap[RouteKeys.USERS]
];

// prettier-ignore
export const privateRoutes: IRoute[] = [
  routesMap[RouteKeys.HOME],
  routesMap[RouteKeys.USERS],
  routesMap[RouteKeys.PROFILE]
];
