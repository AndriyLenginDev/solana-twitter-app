import React, { FC, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import AppRouter from '@/components/AppRouter';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useAppRoutes } from '@/hooks/useAppRoutes';
import { useAppProgram } from '@/hooks/useAppProgram';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { walletActions } from '@/store/reducers/wallet';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { publicKey } = useWallet();
  const [, currentRoute] = useAppRoutes();

  const pageTitle = useMemo<string>(() => {
    return currentRoute ? currentRoute.name : '';
  }, [currentRoute]);

  useAppProgram();

  useEffect(() => {
    dispatch(walletActions.setPublicKey(publicKey));
  }, [dispatch, publicKey]);

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
