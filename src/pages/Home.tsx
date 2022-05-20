import React, { FC } from 'react';
import Header from '@/components/Header';
import TweetForm from "@/components/TweetForm/TweetForm";

const Home: FC = () => {
  return (
    <>
      <Header>Home</Header>
      <TweetForm />
    </>
  );
};

export default Home;
