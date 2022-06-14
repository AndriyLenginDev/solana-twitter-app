import { getAppProgram } from '@/hooks/useAppProgram';
import { web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { ILike, Like } from '@/models/like';

export const getLikes = async (filters: any[] = []): Promise<ILike[]> => {
  const { program } = getAppProgram();

  const likes = await program.account.like.all(filters);
  return likes.map((like) => new Like(like.publicKey, like.account));
};

export const addLike = async (tweetPubkey: PublicKey): Promise<ILike> => {
  const { wallet, program } = getAppProgram();
  const like = web3.Keypair.generate();

  await program.rpc.addLike(tweetPubkey, {
    accounts: {
      author: wallet.publicKey,
      like: like.publicKey,
      systemProgram: web3.SystemProgram.programId
    },
    signers: [like]
  });

  const likeAccount = await program.account.like.fetch(like.publicKey);
  return new Like(like.publicKey, likeAccount);
};

export const deleteLike = async (likePubKey: PublicKey) => {
  const { wallet, program } = getAppProgram();

  await program.rpc.deleteLike({
    accounts: {
      author: wallet.publicKey,
      like: likePubKey
    }
  });
};

export const prefetchLikes = async (filters: any[] = []): Promise<number> => {
  const { connection, program } = getAppProgram();

  const likeClient = program.account.like;
  // @ts-ignore
  const likeAccountName = likeClient._idlAccount.name;
  // Prepare the discriminator filter.
  const likeDiscriminatorFilter = {
    memcmp: likeClient.coder.accounts.memcmp(likeAccountName)
  };

  // Prefetch all likes without any data.
  const allLikes = await connection.getProgramAccounts(program.programId, {
    filters: [likeDiscriminatorFilter, ...filters],
    dataSlice: { offset: 0, length: 0 }
  });

  return allLikes?.length;
};
