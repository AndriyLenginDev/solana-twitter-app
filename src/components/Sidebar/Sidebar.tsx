import React, { FC, ComponentType, SVGProps } from 'react';
import classes from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { useAppRoutes } from '@/hooks/useAppRoutes';
import { RouteKeys } from '@/router';
import HomeIcon from '@/components/icons/HomeIcon';
import ProfileIcon from '@/components/icons/ProfileIcon';
//
import CircleIcon from '@/components/icons/CircleIcon';

interface ILinkClassNameArgs {
  isActive: boolean;
}

const Sidebar: FC = () => {
  const routes = useAppRoutes();

  const iconsMap = new Map<RouteKeys, ComponentType>([
    [RouteKeys.HOME, HomeIcon],
    [RouteKeys.PROFILE, ProfileIcon],
    //
    [RouteKeys.TEST, CircleIcon]
  ]);

  const linkClassName = ({ isActive }: ILinkClassNameArgs): string => {
    return `${classes.sidebar__link} ${isActive ? classes['sidebar__link--active'] : ''}`;
  };

  return (
    <aside className={classes.sidebar}>
      <ul>
        {routes.map((route) => {
          const Icon = iconsMap.get(route.key) as ComponentType<SVGProps<SVGSVGElement>>;
          return (
            <li key={route.key}>
              <NavLink
                to={route.path}
                className={linkClassName}>
                <Icon className={classes.link__icon} />
                {route.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
