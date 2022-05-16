import React, { FC, useEffect } from 'react';
import './App.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { solanaWalletActions } from '@/store/reducers/solanaWallet';
import { Keypair } from '@solana/web3.js';
import AppRouter from '@/components/AppRouter';
import Sidebar from '@/components/Sidebar';

const App: FC = () => {
  const { address, balance, count } = useAppSelector((state) => state.solanaWallet);
  const dispatch = useAppDispatch();

  const click = (e: React.MouseEvent) => {
    dispatch(solanaWalletActions.setCount(count + 10));
    dispatch(solanaWalletActions.setAddress(Keypair.generate().publicKey));
  };

  useEffect(() => {
    console.log('Works', { address, count });
  }, [address, count]);

  return (
    <div className="main">
      <p className="text">Hello world!</p>
      <button onClick={click}>Set balance</button>
      <input type="text" />
      <p>Count: {count}</p>
      <p>PublicKey: {address.toString()}</p>
      <p>Balance: {balance.toString()}</p>
      <Sidebar />
      <AppRouter />
    </div>
  );
};

export default App;
