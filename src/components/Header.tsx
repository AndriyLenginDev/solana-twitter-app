import React, { ComponentPropsWithoutRef, FC } from 'react';

interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  children?: React.ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children, className, ...props }) => {
  return (
    <header
      className={['py-4 px-6 border-b', className].join(' ')}
      {...props}>
      <div className="text-gray-700 text-xl">{children}</div>
    </header>
  );
};

export default Header;
