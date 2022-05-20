import React, { FC, SVGProps } from 'react';
import classes from './DataItem.module.scss';

export interface DataItemProps {
  className?: string;
  content?: string;
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

const DataItem: FC<DataItemProps> = ({ className, content, Icon }) => {
  return (
    <div className={[classes.item, className].join(' ')}>
      {Icon && <Icon className={classes.item__icon} />}
      <span className={classes.item__content}>{content}</span>
    </div>
  );
};

export default DataItem;
