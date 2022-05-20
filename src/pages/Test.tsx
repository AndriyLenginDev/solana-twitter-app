import React, { FC } from 'react';
import Button, { ButtonVariants } from '@/components/general/Button/Button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { solanaWalletActions } from '@/store/reducers/solanaWallet';
import { Keypair } from '@solana/web3.js';
import Header from '@/components/Header';

const Test: FC = () => {
  const { connected, address, balance } = useAppSelector((state) => state.solanaWallet);
  const dispatch = useAppDispatch();

  const updateBalance = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(solanaWalletActions.setAddress(Keypair.generate().publicKey));
  };

  const toggleConnected = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(solanaWalletActions.setConnected(!connected));
  };

  return (
    <div>
      <Header>Test page</Header>
      <div className="p-4">
        <Button
          className="mb-2"
          variant={ButtonVariants.SECONDARY}
          onClick={updateBalance}>
          Set balance
        </Button>
        <p className="mb-2">PublicKey: {address.toString()}</p>
        <p className="mb-2">Balance: {balance.toString()}</p>
        <Button onClick={toggleConnected}>Toggle connected</Button>
      </div>
    </div>
  );
};

export default Test;
