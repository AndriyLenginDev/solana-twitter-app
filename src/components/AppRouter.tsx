import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePaths } from '@/router';
import Loading from '@/components/Loading';
import { useAppRoutes } from '@/hooks/useAppRoutes';

const AppRouter: FC = () => {
  const routes = useAppRoutes();

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.key}
          />
        ))}
        {/*prettier-ignore*/}
        <Route path="*" element={<Navigate replace to={RoutePaths.HOME} />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRouter;
