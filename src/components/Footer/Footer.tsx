import './footer.scss';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo/Vinyl_store.svg';
import { HashLink } from 'react-router-hash-link';
import classNames from 'classnames';
import { Path } from '../../type/types';


type Props = {
  pageUp: () => void,
  // isActive: string,
  // setIsActive: (arg: string) => void,
};

export const Footer: React.FC<Props> = ({
  pageUp,
  // isActive,
  // setIsActive,
}) => {
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

  useEffect(() => {
    pageUp();
  }, [location.pathname]);

  return (
    <footer className="Footer">
      <Link to="home" className="Footer__link-logo">
        <img
          className="Footer__logo"
          src={logo}
          alt="Page logo"
        />
      </Link>

    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link
           className={classNames('navigation__link',
           { 'navigation__link--active': navLink.current.includes(Path.Catalog) })}
            to="/catalog"
            onClick={() => focus(Path.Catalog)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active-footer':
                navLink.current.includes(Path.Catalog),
              })}
            >
              Catalog
            </p>
          </Link>
        </li>

        <li className="navigation__item">
          <Link
            className={classNames('navigation__link',
              { 'navigation__link--active': navLink.current.includes(Path.NewRealises) })}
            to="/new-releases"
            onClick={() => focus(Path.NewRealises)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active-footer':
                navLink.current.includes(Path.NewRealises),
              })}
            >
              New release
            </p>
          </Link>
        </li>

        <li className="navigation__item">
          <HashLink
            className="navigation__link"
            to="/#who-we-are"
          >
            <p className="navigation__text-link">
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
            to="/best-sales"
            onClick={() => focus(Path.BestSales)}
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active-footer':
                navLink.current.includes(Path.BestSales),
              })}
            >
              Best Sales
            </p>
          </Link>
        </li>

      </ul>
    </nav>

      <div className="Footer__go-up-items">
        <button
          type="button"
          aria-label="back-top"
          className="Footer__link-button-back-top"
          onClick={pageUp}
        />
      </div>
    </footer>
  );
};
