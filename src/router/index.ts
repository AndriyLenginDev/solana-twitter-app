import React from 'react';

export enum RouteKeys {
  HOME = 'HOME',
  TOPICS = 'TOPICS',
  TOPIC = 'TOPIC',
  USERS = 'USERS',
  USER = 'USER',
  PROFILE = 'PROFILE'
}

export enum RouteNames {
  HOME = 'Home',
  TOPICS = 'Topics',
  TOPIC = 'Topics',
  USERS = 'Users',
  USER = 'Users',
  PROFILE = 'Profile'
}

export enum RoutePaths {
  HOME = '/',
  TOPICS = '/topics',
  TOPIC = '/topics/:topic',
  USERS = '/users',
  USER = '/users/:publicKey',
  PROFILE = '/profile'
}

export interface IRoute {
  private?: boolean;
  key: RouteKeys;
  name: RouteNames;
  path: RoutePaths;
  component: React.ComponentType;
  nested: IRoute[];
}

const generateRoute = (key: RouteKeys, nested: IRoute[] = []): IRoute => ({
  key,
  name: RouteNames[key],
  path: RoutePaths[key],
  component: React.lazy(() => import(`@/pages/${RouteNames[key]}`)),
  nested
});

export const routesMap: Record<RouteKeys, IRoute> = {
  [RouteKeys.HOME]: generateRoute(RouteKeys.HOME),
  [RouteKeys.TOPICS]: generateRoute(RouteKeys.TOPICS, [
    generateRoute(RouteKeys.TOPIC)
  ]),
  [RouteKeys.TOPIC]: generateRoute(RouteKeys.TOPIC),
  [RouteKeys.USERS]: generateRoute(RouteKeys.USERS, [
    generateRoute(RouteKeys.USER)
  ]),
  [RouteKeys.USER]: generateRoute(RouteKeys.USER),
  [RouteKeys.PROFILE]: generateRoute(RouteKeys.PROFILE)
};

// prettier-ignore
export const routes: IRoute[] = [
  routesMap[RouteKeys.HOME],
  routesMap[RouteKeys.TOPICS],
  routesMap[RouteKeys.TOPIC],
  routesMap[RouteKeys.USERS],
  routesMap[RouteKeys.USER],
  routesMap[RouteKeys.PROFILE]
];

// prettier-ignore
export const publicRoutes: IRoute[] = [
  routesMap[RouteKeys.HOME],
  routesMap[RouteKeys.TOPICS],
  routesMap[RouteKeys.USERS]
];

// prettier-ignore
export const privateRoutes: IRoute[] = [
  routesMap[RouteKeys.HOME],
  routesMap[RouteKeys.TOPICS],
  routesMap[RouteKeys.USERS],
  routesMap[RouteKeys.PROFILE]
];
