import React, { FC } from 'react';
import LoaderIcon from '@/components/icons/LoaderIcon';

const Loading: FC = () => {
  return (
    <div className="text-center p-6">
      <LoaderIcon className="h-12 w-12 text-blue-500" />
    </div>
  );
};

export default Loading;
