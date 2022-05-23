import React, { FC, ReactNode, useMemo } from 'react';
import { Adapter, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export interface SolanaContainerProps {
  children: ReactNode;
}

const SolanaContainer: FC<SolanaContainerProps> = ({ children }) => {
  const network = (process.env.REACT_APP_NETWORK ||
    WalletAdapterNetwork.Devnet) as WalletAdapterNetwork;

  const endpoint = useMemo<string>(() => clusterApiUrl(network), [network]);

  const wallets = useMemo<Adapter[]>(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network })
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaContainer;
