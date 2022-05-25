import React, { FC, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import AppRouter from '@/components/AppRouter';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useAppRoutes } from '@/hooks/useAppRoutes';
// import { useAppProgram } from '@/hooks/useAppProgram';

const App: FC = () => {
  const [, currentRoute] = useAppRoutes();

  const pageTitle = useMemo<string>(() => {
    return currentRoute ? currentRoute.name : '';
  }, [currentRoute]);

  // TODO: use this hook only when Program ID and IDL will be set
  // useAppProgram();

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  return (
    <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
      <Sidebar />
      <main>
        <Header>{pageTitle}</Header>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
