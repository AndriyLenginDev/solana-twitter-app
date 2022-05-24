import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useAppCluster } from '@/hooks/useAppCluster';
import { Connection, PublicKey } from '@solana/web3.js';
import { useMemo } from 'react';
import { AnchorProvider, Program, Provider } from '@project-serum/anchor';
import idl from '@/web3/idl/solana_twitter.json';

export interface AppProgram {
  wallet?: AnchorWallet;
  connection: Connection;
  provider: Provider;
  program: Program;
}

export const useAppProgram = (): AppProgram => {
  const preflightCommitment = 'processed';
  const commitment = 'processed';
  const wallet = useAnchorWallet();
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
    () => new Program(idl, programID, provider),
    [programID, provider]
  );

  return {
    wallet,
    connection,
    provider,
    program
  };
};
