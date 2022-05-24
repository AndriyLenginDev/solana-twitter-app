import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';

export interface AppCluster {
  network: WalletAdapterNetwork;
  endpoint: string;
}

export const useAppCluster = (defaultNetwork =  WalletAdapterNetwork.Devnet): AppCluster => {
  const network = (process.env.REACT_APP_NETWORK || defaultNetwork) as WalletAdapterNetwork;
  const endpoint = useMemo<string>(() => clusterApiUrl(network), [network]);

  return { network, endpoint };
};
