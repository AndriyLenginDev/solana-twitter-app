import React, { FC, useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { solanaWalletActions } from '@/store/reducers/solanaWallet';
import { Keypair } from '@solana/web3.js';
import AppRouter from '@/components/AppRouter';
import Sidebar from '@/components/Sidebar';

const App: FC = () => {
  const { connected, address, balance } = useAppSelector((state) => state.solanaWallet);
  const dispatch = useAppDispatch();

  const updateBalance = (e: React.MouseEvent) => {
    dispatch(solanaWalletActions.setAddress(Keypair.generate().publicKey));
  };

  const toggleConnected = (e: React.MouseEvent) => {
    dispatch(solanaWalletActions.setConnected(!connected));
  };

  useEffect(() => {
    console.log('Works', { address });
  }, [address]);

  return (
    <div className="main">
      <p className="text">Hello world!</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={updateBalance}>
        Set balance
      </button>
      <input type="text" />
      <p>PublicKey: {address.toString()}</p>
      <p>Balance: {balance.toString()}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={toggleConnected}>
        Toggle connected
      </button>
      <Sidebar />
      <AppRouter />
    </div>
  );
};

export default App;
