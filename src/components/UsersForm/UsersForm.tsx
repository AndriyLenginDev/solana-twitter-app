import React, { FC, useEffect, useMemo, useState } from 'react';
import Input from '@/components/general/Input/Input';
import Button from '@/components/general/Button/Button';
import KeyIcon from '@/components/icons/KeyIcon';
import classes from './UsersForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { tweetsActions } from '@/store/reducers/tweets';
import { RoutePaths } from '@/router';
import { authorFilter } from '@/web3/filters';

export interface UsersFormProps {
  className?: string;
  publicKeyParam?: string;
}

const UsersForm: FC<UsersFormProps> = ({ className, publicKeyParam }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tweets.loading);
  const [key, setKey] = useState<string>(publicKeyParam || '');

  useEffect(() => {
    setKey(publicKeyParam || '');
  }, [publicKeyParam]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const searchDisabled = useMemo<boolean>(() => {
    return !key.length || publicKeyParam === key;
  }, [key, publicKeyParam]);

  const search = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) return;

    dispatch(tweetsActions.getTweets([authorFilter(key)]));
    navigate(`${RoutePaths.USERS}/${key}`);
  };

  return (
    <form className={[classes.form__wrapper, className].join(' ')}>
      <div className={classes.key__wrapper}>
        <KeyIcon className={classes.key__icon} />
      </div>
      <Input
        className={classes.form__input}
        placeholder="Public key"
        value={key}
        onChange={handleTextChange}
      />
      <Button
        disabled={searchDisabled}
        className={classes.form__btn}
        loading={loading}
        onClick={search}>
        Search
      </Button>
    </form>
  );
};

export default UsersForm;
