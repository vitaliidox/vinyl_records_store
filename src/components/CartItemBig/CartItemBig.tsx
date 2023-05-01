import './cartItemBig.scss';
import { useCallback, useEffect } from 'react';
import { Vinyls } from '../../type/product';
import { ProductCard } from '../ProductCard';

type Props = {
  product: Vinyls,
  setTotalCost: React.Dispatch<React.SetStateAction<number>>,
  setTotalItems: React.Dispatch<React.SetStateAction<number>>,
};

export const CartItemBig: React.FC<Props> = ({
  product,
  setTotalCost,
  setTotalItems,
}) => {
  const {price} = product;

  const deleteProduct = useCallback(() => {
    const productsList = window.localStorage.getItem('cart');

    if (!productsList) {
      window.localStorage.setItem('cart', JSON.stringify([product]));
      window.dispatchEvent(new Event('storage'));

      return;
    }

    const newProductsList = JSON.parse(productsList);

    for (let i = 0; i < newProductsList.length; i += 1) {
      if (newProductsList[i].id === product.id) {
        const cartList = [...newProductsList];

        cartList.splice(i, 1);
        const cleanedList = [...cartList];

        window.localStorage.setItem('cart', JSON.stringify([...cleanedList]));
        window.dispatchEvent(new Event('storage'));
        setTotalCost((prev) => prev - price);
        setTotalItems((prev) => prev - 1);

        return;
      }
    }

    window.localStorage.setItem(
      'cart', JSON.stringify([...newProductsList, product]),
    );
    window.dispatchEvent(new Event('storage'));
  }, [price, product, setTotalCost, setTotalItems]);

  useEffect(() => {
    setTotalCost((prev) => prev + price);
    setTotalItems((prev) => prev + 1);
  }, [price, setTotalCost, setTotalItems]);

  return (
    <li className="cart-item-big">
      <ProductCard product={product} />

      <button
        className="cart-item-big__delete"
        type="button"
        aria-label="delete item"
        onClick={deleteProduct}
      />
    </li>
  );
};
