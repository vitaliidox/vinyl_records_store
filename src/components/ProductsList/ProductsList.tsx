import './productsList.scss';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';

import { Vinyls } from '../../type/product';
import { Sort } from '../../type/types';
import { NoResults } from '../NoResults';

type Props = {
  products: Vinyls[],
};

export const ProductsList: React.FC<Props> = ({
  products,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [sortedPhones, setSortedPoducts] = useState<Vinyls[]>([]);
  const [productsForPage, setProductsForPage] = useState<Vinyls[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const getPerPage = useCallback(() => {
    return 16;
  }, []);

  const getSortedProducts = useCallback((
    productsList: Vinyls[],
  ) => {
    const sortedProducts: Vinyls[] = [...productsList];

    sortedProducts.sort((a, b) => {
      switch (searchParams.get('sort')) {
        case Sort.ByNameA:
          return a.titleAlbum.localeCompare(b.titleAlbum);

        case Sort.ByNameZ:
          return b.titleAlbum.localeCompare(a.titleAlbum);

        case Sort.CheaperFirst:
          return (a.price - b.price);
        
        case Sort.ExpensiveFirst:
          return (b.price - a.price);

        case Sort.NewRelease:
          return (+b.year - +a.year);

        case Sort.BestSales:
          return (a.discount - b.discount);

        default:
          return a.titleAlbum.localeCompare(b.titleAlbum);
      }
    });

    setSortedPoducts(sortedProducts);
  }, [searchParams]);

  const getNeededProductsForPage = useCallback((
    productsList: Vinyls[],
  ) => {
    const page = +(searchParams.get('page') || 1);
    const productsNumber = 16;
    const idStart = (page - 1) * productsNumber;
    let productsPerPage: Vinyls[] = [];

    if (productsNumber === products.length) {
      setProductsForPage([...productsList]);

      return;
    }

    if (!productsList.length) {
      setProductsForPage([]);

      return;
    }

    for (let i = idStart; i < page * productsNumber; i += 1) {
      if (productsList[i]) {
        productsPerPage = [...productsPerPage, productsList[i]];
      }
    }

    setProductsForPage(productsPerPage);
  }, [
    sortedPhones,
    searchParams.get('perPage'),
    searchParams.get('page'),
    products,
  ]);

  const isShowPagination = useCallback(() => {
    return getPerPage() < products.length;
  }, [getPerPage(), products]);

  const getPagesArray = useCallback(() => {
    if (getPerPage() === products.length) {
      return [];
    }

    const pagesNumber = Math.ceil(products.length / (getPerPage()));

    return Array.from(Array(pagesNumber).keys());
  }, [searchParams]);

  useEffect(() => {
    setPages(getPagesArray());

    if (!isShowPagination()) {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  }, [searchParams, searchParams.get('query'), isShowPagination(), products]);

  useEffect(() => {
    getSortedProducts(products);
  }, [searchParams.get('sort'), products]);

  useEffect(() => {
    getNeededProductsForPage(sortedPhones);
  }, [sortedPhones, searchParams.get('perPage'), searchParams.get('page')]);

  return (
    <section className="products-list">
      { productsForPage.length > 0 ? (
        <div className="products-list__products">
          {productsForPage.map((product) => (
            <div key={product.titleAlbum} className="products-list__product-item">
              <ProductCard
                key={product.id}
                product={product}
              />
            </div>
          ))}
        </div>
      ) : (
        <NoResults category={"Vinyls"} />
      )}

      {isShowPagination() && (
        <Pagination pages={pages} />
      )}
    </section>
  );
};
