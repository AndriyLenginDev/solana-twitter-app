import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { solanaWalletActions } from '@/store/reducers/solanaWallet';
import { Keypair } from '@solana/web3.js';
import AppRouter from '@/components/AppRouter';
import Sidebar from '@/components/Sidebar';
import Button, { ButtonVariants } from '@/components/general/Button/Button';

const App: FC = () => {
  const { connected, address, balance } = useAppSelector((state) => state.solanaWallet);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const updateBalance = (e: React.MouseEvent) => {
    dispatch(solanaWalletActions.setAddress(Keypair.generate().publicKey));
  };

  const toggleConnected = (e: React.MouseEvent) => {
    dispatch(solanaWalletActions.setConnected(!connected));
  };

  const search = (e: React.MouseEvent) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    console.log('Works', { address });
  }, [address]);

  return (
    <div className="main">
      <h1 className="text-gray-200">test</h1>
      <Button
        variant={ButtonVariants.SECONDARY}
        onClick={updateBalance}>
        Set balance
      </Button>
      <input type="text" />
      <p>PublicKey: {address.toString()}</p>
      <p>Balance: {balance.toString()}</p>
      <div className="inline-flex items-center">
        <Button onClick={toggleConnected}>Toggle connected</Button>
        <Button
          className="ml-4"
          loading={loading}
          onClick={search}>
          Search
        </Button>
      </div>
      <Sidebar />
      <AppRouter />
    </div>
  );
};

export default App;
