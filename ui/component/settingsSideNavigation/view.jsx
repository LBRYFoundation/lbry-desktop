// @flow
import * as PAGES from 'constants/pages';
import * as ICONS from 'constants/icons';
import type { Node } from 'react';
import React from 'react';
import classnames from 'classnames';
import Button from 'component/button';
// @if TARGET='app'
import { IS_MAC } from 'component/app/view';
// @endif
import { useIsMediumScreen } from 'effects/use-screensize';

type SideNavLink = {
  title: string,
  link?: string,
  route?: string,
  onClick?: () => any,
  icon: string,
  extra?: Node,
};

export default function SettingsSideNavigation() {
  const sidebarOpen = true;
  const isMediumScreen = useIsMediumScreen();

  const SIDE_LINKS: Array<SideNavLink> = [
    {
      title: 'Appearance',
      link: `/$/${PAGES.SETTINGS}#appearance`,
      icon: ICONS.APPEARANCE,
    },
    {
      title: 'Account',
      link: `/$/${PAGES.SETTINGS}#account`,
      icon: ICONS.ACCOUNT,
    },
    {
      title: 'Content settings',
      link: `/$/${PAGES.SETTINGS}#content`,
      icon: ICONS.CONTENT,
    },
    {
      title: 'System',
      link: `/$/${PAGES.SETTINGS}#system`,
      icon: ICONS.SETTINGS,
    },
  ];

  const isAbsolute = isMediumScreen;
  const microNavigation = !sidebarOpen || isMediumScreen;

  if (isMediumScreen) {
    // I think it's ok to hide it for now on medium/small screens given that
    // we are using a scrolling Settings Page that displays everything. If we
    // really need this, most likely we can display it as a Tab at the top
    // of the page.
    return null;
  }

  return (
    <div
      className={classnames('navigation__wrapper', {
        'navigation__wrapper--micro': microNavigation,
        'navigation__wrapper--absolute': isAbsolute,
      })}
    >
      <nav
        aria-label={'Sidebar'}
        className={classnames('navigation', {
          'navigation--micro': microNavigation,
          // @if TARGET='app'
          'navigation--mac': IS_MAC,
          // @endif
        })}
      >
        <div>
          <ul className={classnames('navigation-links', { 'navigation-links--micro': !sidebarOpen })}>
            {SIDE_LINKS.map((linkProps) => {
              //   $FlowFixMe
              return (
                <li key={linkProps.route || linkProps.link}>
                  <Button
                    {...linkProps}
                    label={__(linkProps.title)}
                    title={__(linkProps.title)}
                    //   $FlowFixMe
                    navigate={linkProps.route || linkProps.link}
                    icon={linkProps.icon}
                    className={classnames('navigation-link', {})}
                  />
                  {linkProps.extra && linkProps.extra}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {isMediumScreen && sidebarOpen && (
        <>
          <nav
            className={classnames('navigation--absolute', {
              // @if TARGET='app'
              'navigation--mac': IS_MAC,
              // @endif
            })}
          >
            <div>
              <ul className="navigation-links--absolute">
                {SIDE_LINKS.map((linkProps) => {
                  // $FlowFixMe
                  const { link, route, ...passedProps } = linkProps;
                  return (
                    <li key={route || link}>
                      <Button
                        {...passedProps}
                        navigate={route || link}
                        label={__(linkProps.title)}
                        title={__(linkProps.title)}
                        icon={linkProps.icon}
                        className={classnames('navigation-link', {})}
                      />
                      {linkProps.extra && linkProps.extra}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
