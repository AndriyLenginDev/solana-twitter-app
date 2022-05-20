import React, { FC, useState } from 'react';
import Input from '@/components/general/Input/Input';
import Button from '@/components/general/Button/Button';
import classes from './UsersForm.module.scss';
import KeyIcon from '@/components/icons/KeyIcon';

export interface UsersFormProps {
  className?: string;
}

const UsersForm: FC<UsersFormProps> = ({ className }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const find = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <form className={[classes.form__wrapper, className].join(' ')}>
      <div className="absolute left-0 top-0 h-full flex items-center pl-9">
        <KeyIcon className="text-2xl text-gray-400" />
      </div>
      <Input
        className={classes.form__input}
        placeholder="Public key"
        value={key}
        onChange={handleTextChange}
      />
      <Button
        className={classes.form__btn}
        loading={loading}
        onClick={find}>
        Find
      </Button>
    </form>
  );
};

export default UsersForm;
