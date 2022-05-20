import React, { FC } from 'react';
import Header from '@/components/Header';
import UsersForm from '@/components/UsersForm/UsersForm';

const Users: FC = () => {
  return (
    <>
      <Header>Users</Header>
      <UsersForm />
    </>
  );
};

export default Users;
