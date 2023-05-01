import './navigation.scss';
import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { Path } from '../../type/types';
import { useCallback, useEffect, useRef } from 'react';

// type Props = {
//   isActive: Path | string,
//   setIsActive: (arg: Path | string) => void,
// };

export const Navigation = (
  // { isActive, setIsActive }
  ) => {
  const location = useLocation();
  const navLink = useRef('');

  const focus = useCallback((arg: Path | string) => {
    navLink.current = arg;
  }, []);

  const getCurrengPage = useCallback(() => {
    const pathName = location.pathname.substring(1);

    focus(pathName);
  }, [focus, location.pathname])

  useEffect(() => {
    getCurrengPage();
  }, [getCurrengPage])

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': navLink.current.includes(Path.Catalog) })}
            to="/catalog?filter=All"
            onClick={() => focus(Path.Catalog)}
            
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                navLink.current.includes(Path.Catalog),
              })}
            >
              Catalog
            </p>
          </NavLink>
        </li>

        <li className="navigation__item">
          <Link
            className={classNames('navigation__link',
              { 'navigation__link--active': navLink.current.includes(Path.NewRealises) })}
            to="/new-releases?sort=New+releases"
            onClick={() => focus(Path.NewRealises)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                navLink.current.includes(Path.NewRealises),
              })}
            >
              New release
            </p>
          </Link>
        </li>

        <li className="navigation__item">
          <HashLink
            className={classNames('navigation__link',
              {
                'navigation__link--active':
                navLink.current.includes(Path.WhoWeAre),
              })}
            to="/#who-we-are"
            onClick={() => focus(Path.WhoWeAre)}
          >
            <p className={classNames('navigation__text-link',
              // {
              //   'navigation__text-link--active':
              //   first.current.includes(Path.WhoWeAre),
              // }
              )}
            >
              Who we are
            </p>
          </HashLink>
        </li>

        <li className="navigation__item">
          <Link
            className={classNames('navigation__link',
              {
                'navigation__link--active':
                navLink.current.includes(Path.BestSales),
              })}
            to="/best-sales?sort=Best+sales"
            onClick={() => focus(Path.BestSales)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                navLink.current.includes(Path.BestSales),
              })}
            >
              Best Sales
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
