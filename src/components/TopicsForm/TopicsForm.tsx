import React, { FC, useEffect, useMemo, useState } from 'react';
import IconInput from '@/components/IconInput/IconInput';
import HashIcon from '@/components/icons/HashIcon';
import Button from '@/components/general/Button/Button';
import classes from './TopicsForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { tweetsActions } from '@/store/reducers/tweets';
import { RoutePaths } from '@/router';
import { TOPIC_MAX_CHARS } from '@/web3/constants';
import { topicFilter } from '@/web3/filters';

export interface TopicsFormProps {
  className?: string;
  topicParam?: string;
}

const TopicsForm: FC<TopicsFormProps> = ({ className, topicParam }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tweets.loading);
  const [topic, setTopic] = useState<string>(topicParam || '');

  useEffect(() => {
    setTopic(topicParam || '');
  }, [topicParam]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const searchDisabled = useMemo<boolean>(() => {
    // TODO: disable when topics from URL and input are the same
    return !topic.length;
  }, [topic]);

  const search = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) return;

    dispatch(tweetsActions.getTweets([topicFilter(topic)]));
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
