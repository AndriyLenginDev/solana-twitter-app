import React, { FC, ComponentType, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useAppRoutes } from '@/hooks/useAppRoutes';
import { RouteKeys } from '@/router';
import CircleIcon from '@/components/icons/CircleIcon';
// import HomeIcon from '@/components/icons/HomeIcon';
// import ProfileIcon from '@/components/icons/ProfileIcon';

const HomeIcon = React.lazy(() => import('@/components/icons/HomeIcon'));
const ProfileIcon = React.lazy(() => import('@/components/icons/ProfileIcon'));

const Sidebar: FC = () => {
  const routes = useAppRoutes();

  const iconsMap = new Map<RouteKeys, ComponentType>([
    [RouteKeys.HOME, HomeIcon],
    [RouteKeys.PROFILE, ProfileIcon]
  ]);

  return (
    <div>
      <ul>
        {routes.map((route) => {
          const Icon = iconsMap.get(route.key) as ComponentType;
          return (
            <li key={route.key}>
              <Link to={route.path}>
                <Suspense fallback={<CircleIcon />}>
                  <Icon />
                </Suspense>
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
