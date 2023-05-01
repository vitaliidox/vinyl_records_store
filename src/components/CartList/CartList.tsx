import './cartList.scss';
import { CartItem } from '../CartItem';
import { Vinyls } from '../../type/product';

type Props = {
  products: Vinyls[],
};

export const CartList: React.FC<Props> = ({ products }) => {

  return (
    <ul className="cart-list">
      {products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
        />
      ))}
    </ul>
  );
};
