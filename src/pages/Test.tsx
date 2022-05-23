import React, { FC } from 'react';
import Button from '@/components/general/Button/Button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { solanaWalletActions } from '@/store/reducers/solanaWallet';

const Test: FC = () => {
  const { connected, address, balance } = useAppSelector((state) => state.solanaWallet);
  const dispatch = useAppDispatch();

  // const updateBalance = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   dispatch(solanaWalletActions.setAddress(Keypair.generate().publicKey));
  // };

  const toggleConnected = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(solanaWalletActions.setConnected(!connected));
  };

  return (
    <div>
      <div className="p-4">
        <p className="mb-2">PublicKey: {address.toString()}</p>
        <p className="mb-2">Balance: {balance.toString()}</p>
        <Button onClick={toggleConnected}>Toggle connected</Button>
      </div>
    </div>
  );
};

export default Test;
