import './shopByCategory.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../type/product';

import Phones from './images/category-phones.png';
import Tablets from './images/category-tablets.png';
import Accessories from './images/category-accessories.png';

type Props = {
  products: Product[];
};

enum Categories {
  Phone = 'phone',
  Tablet = 'tablet',
  Accesorie = 'accessories',
}

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const getProductsNumber = (category: Categories) => {
    return products.filter((item: Product) => item.type === category).length;
  };

  return (
    <article className="new-realises">
      <div className="new-realises__wrapper-title">
        <h2 className="new-realises__title">
        - New realises
        </h2>

        <Link
          className="new-realises__view-all"
          to="/catalog"
        >
          View all
        </Link>
      </div>

      <div
        data-cy="categoryLinksContainer"
        className="new-realises__categories"
      >

        <div className="new-realises__card">
          <Link
            to="phones"
            className="new-realises__img-wrapper
            new-realises__img-wrapper--phones"
          >
            <img
              src={Phones}
              alt="mobile phones"
            />
          </Link>

          <Link
            to="phone"
            className="new-realises__name"
          >
            Mobile phones
          </Link>

          <p className="new-realises__models-number">
            {`${getProductsNumber(Categories.Phone)} models`}
          </p>
        </div>

        <div className="new-realises__card">
          <Link
            to="/tablets"
            className="new-realises__img-wrapper
            new-realises__img-wrapper--tablets"
          >
            <img
              src={Tablets}
              alt="tablets"
            />
          </Link>

          <Link to="/tablets" className="new-realises__name">
            Tablets
          </Link>

          <p className="new-realises__models-number">
            {`${getProductsNumber(Categories.Tablet)} models`}
          </p>
        </div>

        <div className="new-realises__card">
          <Link
            to="accessories"
            className="new-realises__img-wrapper
            new-realises__img-wrapper--accessories"
          >
            <img
              src={Accessories}
              alt="accessories"
            />
          </Link>

          <Link
            to="accessories"
            className="new-realises__name"
          >
            Accessories
          </Link>

          <p className="new-realises__models-number">
            {`${getProductsNumber(Categories.Accesorie)} models`}
          </p>
        </div>
      </div>
    </article>
  );
};
