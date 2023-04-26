import './productCard.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  getCartList,
  // getFavouritesList,
  isProductInStorage,
  setToLocaleStorage,
} from '../interactionLocaleStorage/interactionLocaleStorage';

import { Vinyls } from '../../type/product';

type Props = {
  product: Vinyls;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [cartList, setCartList] = useState<Vinyls[] | null>(null);
  // const [favouritesList, setFavouritesList] = useState<Vinyls[] | null>(null);

  const {
    // id,
    // performer,
    titleAlbum,
    price,
    // discount,
    pictureUrl,
    color,
  } = product;

  // const discountPrice = price * ((100 - discount) / 100);

  useEffect(() => {
    getCartList(setCartList);
    // getFavouritesList(setFavouritesList);

    window.addEventListener('storage', () => {
      getCartList(setCartList);
      // getFavouritesList(setFavouritesList);
    });

    return () => window.removeEventListener('storage', () => {
      getCartList(setCartList);
      // getFavouritesList(setFavouritesList);
    });
  }, []);

  return (
    <article
      data-cy="cardsContainer"
      className="product-card"
    >
      {/* <Link to={`/${type}s/${product.id}`}> */}
      <Link to='/'>
        <div className="product-card__image-wrapper">
          <img
            className="product-card__image"
            // src={pictureUrl}
            src={pictureUrl}
            alt="product"
          />
        </div>
      </Link>

      <div className="product-card__main-info">
        {/* <Link to={`/${type}s/${product.id}`} className="product-card__name"> */}
        <div className="product-card__title-wrapper">
          <Link to="/" className="product-card__name">
            {titleAlbum}
          </Link>

          <p className="product-card__color">
            {color}
          </p>
        </div>

        <p className="product-card__price">
          {`${price} UAH`}
        </p>
      </div>

      {/* <ul className="product-card__technical-data">
        <li className="product-card__technical-data-item">
          <p className="product-card__technical-data-name">
            Color
          </p>

          <p className="product-card__technical-data-info">
            {color}
          </p>
        </li>

        <li className="product-card__technical-data-item">
          <p className="product-card__technical-data-name">
            Performer
          </p>

          <p className="product-card__technical-data-info">
            {performer}
          </p>
        </li>
      </ul> */}

      <button
          className={classNames('product-card__button-add', {
            'product-card__button-add--selected':
            isProductInStorage(cartList, product),
          })}
          type="button"
          onClick={() => setToLocaleStorage('cart', product)}
        />
    </article>
  );
};
