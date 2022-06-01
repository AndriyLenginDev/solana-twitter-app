import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useAppCluster } from '@/hooks/useAppCluster';
import { Connection, PublicKey } from '@solana/web3.js';
import { useMemo } from 'react';
import { AnchorProvider, Idl, Program, Provider } from '@project-serum/anchor';
import idl from '@/web3/idl/solana_twitter.json';

export interface AppProgram {
  wallet: AnchorWallet;
  connection: Connection;
  provider: Provider;
  program: Program;
}

let appProgram: AppProgram | null = null;

export const getAppProgram = (): AppProgram => appProgram as AppProgram;

export const useAppProgram = (): AppProgram => {
  const preflightCommitment = 'processed';
  // For important transactions use "confirmed" and "finalized" commitment levels.
  // Use the "finalized" commitment level for financial transactions with critical consequences.
  const commitment = 'processed';
  const wallet = useAnchorWallet() as AnchorWallet;
  const { endpoint } = useAppCluster();

  const programID = useMemo<PublicKey>(
    () => new PublicKey(process.env.REACT_APP_PROGRAM_ID || idl.metadata.address),
    []
  );
  const connection = useMemo<Connection>(() => new Connection(endpoint, commitment), [endpoint]);
  const provider = useMemo<Provider>(
    () =>
      new AnchorProvider(connection, wallet as AnchorWallet, { preflightCommitment, commitment }),
    [connection, wallet]
  );
  const program = useMemo<Program>(
    () => new Program(idl as Idl, programID, provider),
    [programID, provider]
  );

  appProgram = {
    wallet,
    connection,
    provider,
    program
  };

  return appProgram;
};
