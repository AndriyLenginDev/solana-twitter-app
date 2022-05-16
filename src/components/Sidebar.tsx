import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppRoutes } from '@/hooks/useAppRoutes';

const Sidebar: FC = () => {
  const routes = useAppRoutes();

  return (
    <div>
      <ul>
        {routes.map((route) => (
          <li key={route.key}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
