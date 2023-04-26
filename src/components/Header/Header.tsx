import './header.scss';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from 'usehooks-ts';

import logo from '../logo/Vinyl_store.svg';

import { Navigation } from '../Navigation';
import { Product } from '../../type/product';
import { Path } from '../../type/types';

type Props = {
  isActive: string,
  setIsActive: (arg: string) => void,
}

export const Header: React.FC<Props> = ({
  isActive,
  setIsActive,
}) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartList, setCartList] = useState<Product[] | null>(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedValue = useDebounce<string>(query, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const setFirsPageOnSearchList = useCallback(() => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [debouncedValue]);

  const setQueryToSearchParams = useCallback(() => {
    if (!debouncedValue) {
      searchParams.delete('query');
      setSearchParams(searchParams);

      return;
    }

    setFirsPageOnSearchList();
    searchParams.set('query', debouncedValue);
    setSearchParams(searchParams);
  }, [debouncedValue]);

  const getLocaleStorageData = useCallback((place: Path) => {
    if (window.localStorage.getItem(place)) {
      return JSON.parse(
        window.localStorage.getItem(place) || '',
      );
    }

    return null;
  }, []);


  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const clearSearchForm = useCallback(() => {
    setQuery('');
  }, []);
  
  const setInputStyle = useCallback(() => (
    inputVisible ? {display: 'block', marginLeft: '12px'} : {display: 'none'}
  ), [inputVisible]);

  useEffect(() => {
    setInputVisible(false);
    clearSearchForm();
    // setActiveNav();
  }, [location.pathname]);

  useEffect(() => {
    setQueryToSearchParams();
  }, [debouncedValue]);

  useEffect(() => {
    window.dispatchEvent(new Event('storage'));

    // setFavouritesList(getLocaleStorageData(Path.Favourites));
    setCartList(getLocaleStorageData(Path.Cart));
    // setActiveNav();

    window.addEventListener('storage', () => {
      // setFavouritesList(getLocaleStorageData(Path.Favourites));
      setCartList(getLocaleStorageData(Path.Cart));
    });

    return () => window.removeEventListener('storage', () => {
      // setFavouritesList(getLocaleStorageData(Path.Favourites));
      setCartList(getLocaleStorageData(Path.Cart));
    });
  }, []);

  return (
    <header className="header">
      <div className="header__items-block">
        <Link
          to="/"
          className="header__link-logo"
          onClick={() => setIsActive(Path.Home)}
        >
          <img
            className="header__logo"
            src={logo}
            alt="Page logo"
          />
        </Link>
      </div>
  

      <Navigation
          isActive={isActive}
          setIsActive={setIsActive}
        />

      <div className="header__items-block">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="header__search-form"
        >          
          <button
            onClick={() =>setInputVisible(!inputVisible)}
            className="header__button-search"
          />

          <input
            ref={inputRef}
            style={setInputStyle()}
            type="text"
            className="header__search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>

        <Link
          to="cart"
          className={classNames('header__icon-link',
            { 'header__icon-link--active': isActive === Path.Cart })}
          onClick={() => setIsActive(Path.Cart)}
        >
          <div className="header__icon-cart">
            {cartList && cartList.length > 0 && (
              <div className="header__ellipse">
                {cartList.length}
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};
