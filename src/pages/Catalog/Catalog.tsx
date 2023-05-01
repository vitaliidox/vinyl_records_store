import './catalog.scss';
import circleArrow from '../../components/icons/circle-arrow.svg';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Form } from '../../components/Form';
import { NoResults } from '../../components/NoResults';
import { ProductsList } from '../../components/ProductsList';
import { SearchList } from '../../components/SearchList';
import { 
  buttonsFilter, 
  getProducts,
} from '../../helpers/getProducts';

import { TypeProduct, Vinyls } from '../../type/product';
import { Loader } from '../../components/Loader';
// import vinyls from '../../helpers/vinyls.json';
import { Filter, Sort, ToPage } from '../../type/types';

type Props = {
  toPage: ToPage,
}

export const Catalog: React.FC<Props> = ({ toPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vinyls, setVinyls] = useState<Vinyls[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProd, setFilteredProd] = useState<Vinyls[]>([])
  const [filter, setFilter] = useState<string | null>(searchParams.get('filter'));

  const getQuerySearchParam = useCallback(() => {
    return searchParams.get('query');
  }, [searchParams]);

  const getFIlter = useCallback(() => {
    setFilter(searchParams.get('filter'));
  }, [searchParams])

  const getFilteredProducts = useCallback(() => {
    if (!filter) {
      setFilteredProd(vinyls);

      return;
    }

    const productsArray = [...vinyls].filter((item) => {
      if (filter === Filter.All) {
        return true;
      }
      return item.genre === filter
    });
    searchParams.set('filter', filter);
    setSearchParams(searchParams);
    setFilteredProd(productsArray);
  },[filter, searchParams, setSearchParams, vinyls])

  const handlerSetFilter = useCallback((arg: string) => {
    setFilter(arg)
  },[])

  useMemo(() => {
    setIsLoading(true);

    getProducts()
      .then(data => setVinyls(data))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getFIlter()
  }, [getFIlter])

  useEffect(() => {
    getFilteredProducts();
  }, [filter, location, vinyls])

  useEffect(() => {
    switch (toPage) {
      case ToPage.NewRelease:
        searchParams.set('sort', Sort.NewRelease);
        setSearchParams(searchParams);
        return;
      case ToPage.BestSales:
        searchParams.set('sort', Sort.BestSales);
        setSearchParams(searchParams);
        return;
      case ToPage.Popular:
        searchParams.set('filter', Filter.Popular);
        setSearchParams(searchParams);
        return;
      default:
        return
    }
 
  }, [toPage])

  return !getQuerySearchParam() ? (
    <section className="vinyls">
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

      <div className="vinyls__title-block">
        <Breadcrumbs />

        <h1 className="vinyls__title">
          Let's add to your collection <sup>30</sup>
        </h1>

        <div className="vinyls__buttons-wrapper">
          {buttonsFilter.map((el) => (
            <button
              key={el}
              className="vinyls__button"
              onClick={() => handlerSetFilter(el)}
            >
              {el}
            </button>
          ))}
        </div>

        <Form />
      </div>
    
      {!isLoading && vinyls.length > 0 ? (
        <>
          {vinyls.length > 0 ? (
            <ProductsList
              products={filteredProd}
            />
          ) : (
            <NoResults category={TypeProduct.Phone} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  ) : (
    <SearchList products={vinyls} />
  );
};
