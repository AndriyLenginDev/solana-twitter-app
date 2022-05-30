import React, { ComponentPropsWithoutRef, FC, SVGProps } from 'react';
import Input from '@/components/general/Input/Input';
import classes from './IconInput.module.scss';

export interface IconInputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string;
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

const IconInput: FC<IconInputProps> = ({ className, Icon, ...props }) => {
  return (
    <div className={[classes.input__wrapper, className].join(' ')}>
      {Icon && (
        <Icon className={[classes.icon, props.disabled ? '!text-blue-500' : ''].join(' ')} />
      )}
      <Input
        className={classes.field}
        {...props}
      />
    </div>
  );
};

export default IconInput;
