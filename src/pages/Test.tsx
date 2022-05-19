import React, {FC, useRef, useState} from 'react';
import Button, { ButtonVariants } from '@/components/general/Button/Button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { solanaWalletActions } from '@/store/reducers/solanaWallet';
import { Keypair } from '@solana/web3.js';
import {useAutoresizeTextarea} from "@/hooks/useAutoresizeTextarea";

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
    <main className="p-4">
      <Button
        variant={ButtonVariants.SECONDARY}
        onClick={updateBalance}>
        Set balance
      </Button>
      <input type="text" />
      <p>PublicKey: {address.toString()}</p>
      <p>Balance: {balance.toString()}</p>
      <Button onClick={toggleConnected}>Toggle connected</Button>
      <div className="w-full mt-4">
        <textarea
          ref={textAreaRef}
          className="w-full rounded-lg bg-gray-100 focus:outline-none p-4"
          placeholder="Enter text"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className="flex justify-end">
        <Button
          loading={loading}
          onClick={search}>
          Search
        </Button>
      </div>
    </main>
  );
};

export default Test;
