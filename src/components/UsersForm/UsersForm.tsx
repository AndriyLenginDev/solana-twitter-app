import React, { FC, useEffect, useMemo, useState } from 'react';
import Input from '@/components/general/Input/Input';
import Button from '@/components/general/Button/Button';
import KeyIcon from '@/components/icons/KeyIcon';
import classes from './UsersForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RoutePaths } from '@/router';

export interface UsersFormProps {
  className?: string;
  publicKeyParam?: string;
}

const UsersForm: FC<UsersFormProps> = ({ className, publicKeyParam }) => {
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.tweets.loading);
  const [key, setKey] = useState<string>(publicKeyParam || '');

  useEffect(() => {
    setKey(publicKeyParam || '');
  }, [publicKeyParam]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const searchDisabled = useMemo<boolean>(() => {
    return !key.length || key === publicKeyParam;
  }, [key, publicKeyParam]);

  const search = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) return;

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
        onClick={search}>
        Search
      </Button>
    </form>
  );
};

export default UsersForm;
