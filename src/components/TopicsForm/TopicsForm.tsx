import React, { FC, useEffect, useMemo, useState } from 'react';
import IconInput from '@/components/IconInput/IconInput';
import HashIcon from '@/components/icons/HashIcon';
import Button from '@/components/general/Button/Button';
import classes from './TopicsForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RoutePaths } from '@/router';
import { TOPIC_MAX_CHARS } from '@/web3/constants';

export interface TopicsFormProps {
  className?: string;
  topicParam?: string;
}

const TopicsForm: FC<TopicsFormProps> = ({ className, topicParam }) => {
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.tweets.loading);
  const [topic, setTopic] = useState<string>(topicParam || '');

  useEffect(() => {
    setTopic(topicParam || '');
  }, [topicParam]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const searchDisabled = useMemo<boolean>(() => {
    return !topic.length || topic === topicParam;
  }, [topic, topicParam]);

  const search = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) return;

    navigate(`${RoutePaths.TOPICS}/${topic}`);
  };

  return (
    <form className={[classes.form__wrapper, className].join(' ')}>
      <IconInput
        className={classes.form__input}
        Icon={HashIcon}
        maxLength={TOPIC_MAX_CHARS}
        value={topic}
        onChange={handleTopicChange}
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

export default TopicsForm;
