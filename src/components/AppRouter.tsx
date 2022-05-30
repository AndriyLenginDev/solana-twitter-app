import React, { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePaths } from '@/router';
import Loading from '@/components/Loading';
import { useAppRoutes } from '@/hooks/useAppRoutes';

const AppRouter: FC = () => {
  const [routes] = useAppRoutes();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.key}>
            {route.nested.map((nested) => (
              <Route
                path={nested.path}
                element={<nested.component />}
                key={nested.key}
              />
            ))}
          </Route>
        ))}
        {/*prettier-ignore*/}
        <Route path="*" element={<Navigate replace to={RoutePaths.HOME} />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
