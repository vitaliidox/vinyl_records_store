import './cartItem.scss';
import { Vinyls } from '../../type/product';

type Props = {
  product: Vinyls,
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    color,
    titleAlbum,
    price,
    pictureUrl,
  } = product;

  return (
    <li className="cart-item">
       <div className="cart-item__image-wrapper">
          <img
            className="cart-item__image"
            src={pictureUrl}
            alt="product"
          />
        </div>

      <div className="cart-item__wrapper-left">
        <p className="cart-item__name">
          {titleAlbum}
        </p>

        <p className="cart-item__color">
          {color}
        </p>
      </div>

      <div className="cart-item__price">
        {`${price} UAH`}
      </div>
    </li>
  );
};
