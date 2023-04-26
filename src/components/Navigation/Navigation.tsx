import './navigation.scss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { Path } from '../../type/types';

type Props = {
  isActive: Path | string,
  setIsActive: (arg: Path | string) => void,
};

export const Navigation: React.FC<Props> = ({ isActive, setIsActive }) => {

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive.includes(Path.Catalog) })}
            to="/catalog"
            onClick={() => setIsActive(Path.Catalog)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                  isActive.includes(Path.Catalog),
              })}
            >
              Catalog
            </p>
          </NavLink>
        </li>

        <li className="navigation__item">
          <Link
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive.includes(Path.NewRealises) })}
            to="/new-releases"
            onClick={() => setIsActive(Path.NewRealises)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                  isActive.includes(Path.NewRealises),
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
                isActive.includes(Path.WhoWeAre),
              })}
            to="/#who-we-are"
            onClick={() => setIsActive(Path.Home)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                  isActive.includes(Path.WhoWeAre),
              })}
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
                isActive.includes(Path.BestSales),
              })}
            to="/best-sales"
            onClick={() => setIsActive(Path.BestSales)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                  isActive.includes(Path.BestSales),
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
