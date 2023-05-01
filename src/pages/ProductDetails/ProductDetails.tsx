import './productDetails.scss';
import circleArrow from '../../components/icons/circle-arrow.svg';

import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { ProductInfo } from '../../components/ProductInfo';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResults } from '../../components/NoResults';
import { getDetails } from '../../helpers/getProducts';

import { Vinyls } from '../../type/product';
import { Details } from '../../type/details';
import { Loader } from '../../components/Loader';
import { Carousel } from '../../components/Carousel';
import { DetailedDescription } from '../../components/DetailedDescription';

type Props = {
  products: Vinyls[],
};

export const ProductDetails: React.FC<Props> = ({ products }) => {
  const { productId = '' } = useParams();
  const [details, setDetails] = useState<Details | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generalData, setGeneralData] = useState<Vinyls | null>(null);

  console.log('details', details)

  const getDetailsData = useCallback(() => {
    setIsLoading(true);

    getDetails(productId)
      .then(data => setDetails(data))
      .catch(() => setDetails(null))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const getGeneralDataProducts = useCallback(() => {
    for (let i = 0; i < products.length; i += 1) {
      if (products[i].id === +productId) {
        setGeneralData(products[i]);

        return;
      }
    }

    setGeneralData(null);
  }, [products, productId]);

  useEffect(() => {
    getGeneralDataProducts();
  }, [products, productId]);

  useEffect(() => {
    getDetailsData();
  }, [productId]);

  return (
    <section className="product-details">
      <div className="background">
        <div className="background__circle background__circle--1" />
        <div
          className="
            background__circle
            background__circle--2
            background__circle--page
          "
        />
        <div className="background__circle background__circle--7" />

        <img
          className="background__circle-arrow background__circle-arrow--page"
          src={circleArrow}
          alt="circle-arrow"
        />
      </div>
      {!isLoading ? (
        <>
          <Breadcrumbs />

          {details && generalData && (
            <>
              <ProductInfo
                generalData={generalData}
                details={details}
              />

              <DetailedDescription
                details={details}
              />

              <Carousel
                data={products}
                title="Popular Items"
                linkTo="/catalog?filter=Popular"
              />
            </>
          )}

          {!details && !isLoading && (
            <div className="product-details__wrapper-info">
              <NoResults category="Product" />
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};
