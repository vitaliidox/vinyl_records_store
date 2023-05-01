import './cartListBig.scss';
import { Vinyls } from '../../type/product';
import { CartItemBig } from '../CartItemBig';

type Props = {
  products: Vinyls[],
  setTotalCost: React.Dispatch<React.SetStateAction<number>>,
  setTotalItems: React.Dispatch<React.SetStateAction<number>>,
};

export const CartListBig: React.FC<Props> = ({
  products,
  setTotalCost,
  setTotalItems,
}) => {

  return (
    <ul className="cart-list-big">
       {products.map((product) => (
        <CartItemBig
          key={product.id}
          product={product}
          setTotalCost={setTotalCost}
          setTotalItems={setTotalItems}
        />
      ))}
    </ul>
  );
};
