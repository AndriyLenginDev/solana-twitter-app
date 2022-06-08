import React, { FC } from 'react';
import UsersForm from '@/components/UsersForm/UsersForm';
import TweetList from '@/components/TweetList/TweetList';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLoading, selectSortedTweets } from '@/store/reducers/tweets/selectors';
import { useParams } from 'react-router-dom';
import { authorFilter } from '@/web3/filters';
import { usePaginatedTweets } from '@/hooks/usePaginatedTweets';

const Users: FC = () => {
  const loading = useAppSelector(selectLoading);
  const tweets = useAppSelector(selectSortedTweets);
  const { publicKey } = useParams();
  const { onNewPage } = usePaginatedTweets(authorFilter, publicKey, true);

  return (
    <>
      <UsersForm publicKeyParam={publicKey} />
      <TweetList
        tweets={tweets}
        loading={loading}
        onNewPage={onNewPage}
      />
    </>
  );
};

export default Users;
