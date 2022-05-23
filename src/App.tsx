import React, { FC, useMemo } from 'react';
import SolanaContainer from '@/containers/SolanaContainer';
import Header from '@/components/Header';
import AppRouter from '@/components/AppRouter';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useAppRoutes } from '@/hooks/useAppRoutes';

require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
  const [, currentRoute] = useAppRoutes();

  const pageTitle = useMemo<string>(() => {
    return currentRoute ? currentRoute.name : '';
  }, [currentRoute]);

  return (
    <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
      <SolanaContainer>
        <Sidebar />
        <main>
          <Header>{pageTitle}</Header>
          <AppRouter />
        </main>
      </SolanaContainer>
    </div>
  );
};

export default App;
