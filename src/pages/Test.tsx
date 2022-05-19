import React, { FC, useRef, useState } from 'react';
import Button, { ButtonVariants } from '@/components/general/Button/Button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { solanaWalletActions } from '@/store/reducers/solanaWallet';
import { Keypair } from '@solana/web3.js';
import { useAutoresizeTextarea } from '@/hooks/useAutoresizeTextarea';
import Header from '@/components/Header/Header';

const Test: FC = () => {
  const { connected, address, balance } = useAppSelector((state) => state.solanaWallet);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const [text, setText] = useState<string>('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoresizeTextarea(textAreaRef);

  const updateBalance = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(solanaWalletActions.setAddress(Keypair.generate().publicKey));
  };

  const toggleConnected = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(solanaWalletActions.setConnected(!connected));
  };

  const search = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
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
        <div className="w-full mt-4">
          <textarea
            ref={textAreaRef}
            className="w-full rounded-md bg-gray-100 focus:outline-none resize-none py-2 px-4"
            placeholder="Enter text"
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button
            loading={loading}
            onClick={search}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
