import './productInfo.scss';
// import { useEffect, useState } from 'react';

import { Details } from '../../type/details';
import { Vinyls } from '../../type/product';
// import { getCartList } from '../interactionLocaleStorage/interactionLocaleStorage';

type Props = {
  details: Details,
  generalData: Vinyls,
};

export const ProductInfo: React.FC<Props> = ({ details }) => {
  // const [cartList, setCartList] = useState<Vinyls[] | null>(null);
  const {
    titleAlbum,
    price,
    pictureUrl,
    performer,
    color,
  } = details;

  // useEffect(() => {
  //   // setCurrentImg(pictureUrl);

  //   getCartList(setCartList);
  //   // getFavouritesList(setFavouritesList);

  //   window.addEventListener('storage', () => {
  //     getCartList(setCartList);
  //     // getFavouritesList(setFavouritesList);
  //   });

  //   return () => window.removeEventListener('storage', () => {
  //     getCartList(setCartList);
  //     // getFavouritesList(setFavouritesList);
  //   });
  // }, [details]);

  console.log(details)
  return (
    <section className="product-info">
      <div className="product-info__wrapper-image">
        <img src={pictureUrl} alt="phone large" />
      </div>

      <div className="product-info__parameters">
        <p className="product-info__color">
          {color}
        </p>

        <p className="product-info__performer">
          {performer}
        </p>

        <p className="product-info__title-album">
          {titleAlbum}
        </p>
          
        <div className="product-info__prices">
          <div className="product-info__actual-price">
            {`${price} UAH`}
          </div>

          <button className="product-info__buy-vinyl">
            buy vinyl
          </button>
        </div>
      </div>
    </section>
  );
};
