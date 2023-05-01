import './cartPage.scss';
import { useEffect, useState } from 'react';

import { getCartList } from
'../../components/interactionLocaleStorage/interactionLocaleStorage';
import { CartList } from '../../components/CartList';
import { CartListBig } from '../../components/CartListBig';
import { Carousel } from '../../components/Carousel';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import { Vinyls } from '../../type/product';

type Props = {
  productsVinyl: Vinyls[],
}

export const CartPage: React.FC<Props> = ({ productsVinyl }) => {
  const [products, setProducts] = useState<Vinyls[] | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [checkout, setCheckout] = useState(false);

  console.log(totalItems)

  useEffect(() => {
    getCartList(setProducts);

    window.addEventListener('storage', () => {
      getCartList(setProducts);
    });

    return () => window.removeEventListener('storage', () => {
      getCartList(setProducts);
    });
  }, []);

  useEffect(() => {
    const message = setTimeout(() => {
      setCheckout(false);
    }, 2000);

    return () => clearTimeout(message);
  }, [checkout]);

  return products ? (
    <section className="cart">
      <div className="background">
        <div className="background__circle background__circle--1" />
        <div className="
          background__circle
          background__circle--2
          background__circle--2-cart
        " />
        <div className="
          background__circle
          background__circle--3
          background__circle--3-cart
        " />
      </div>

      <Breadcrumbs />

      <div className="cart__shop-list">
        <div className="cart__products">
          <h3 className="cart__title">
            Your ordering items:
          </h3>
          {products && products.length > 0 ? (
            <CartListBig
              products={products}
              setTotalCost={setTotalCost}
              setTotalItems={setTotalItems}
            />
          ) : (
            <h3 className="cart__title-empty">
              Your cart is empty
            </h3>
          )}
        </div>

        <div className="cart__checkout-wrapper">
          <h3 className="cart__title">
            Order summary:
          </h3>
            {products && products.length > 0 ? (
              <CartList products={products} />
            ) : (
              <h3 className="cart__title-empty">
                Your cart is empty
              </h3>
            )}
          <div className="cart__wrapper-total">
            <div className="cart__total-price">
              Total:
            </div>
            <div className="cart__underline"/>
            <div className="cart__total-price">
              {`${totalCost} UAH`}
            </div>
          </div>

          <button
            className="cart__checkout-button"
            type="button"
            onClick={() => setCheckout(true)}
          >
            Continue ordering
          </button>

          {checkout && (
            <div className="cart__message">
              We are sorry, but this feature is not implemented yet
            </div>
          )}
        </div>
      </div>

      <Carousel
        data={productsVinyl}
        title="Popular Items"
        linkTo="/catalog?filter=Popular"
      />
    </section>
  ) : (
    <Loader />
  );
};
