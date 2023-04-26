import './catalog.scss';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import circleArrow from '../../components/icons/circle-arrow.svg';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Form } from '../../components/Form';
import { NoResults } from '../../components/NoResults';
import { ProductsList } from '../../components/ProductsList';
import { SearchList } from '../../components/SearchList';
import { 
  buttonsFilter, 
  // getProducts,
} from '../../helpers/getProducts';

import { TypeProduct, Vinyls } from '../../type/product';
import { Loader } from '../../components/Loader';
import vinyls from '../../helpers/vinyls.json';
import { Sort, ToPage } from '../../type/types';

type Props = {
  toPage: ToPage,
}

export const Catalog: React.FC<Props> = ({ toPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [vinyls, setPhones] = useState<Vinyls[]>([]);
  const [isLoading] = useState(false);
  const [filteredProd, setFilteredProd] = useState<Vinyls[]>([])
  const [filter, setFilter] = useState<string | null>(null);
  
  console.log(filteredProd, 'dddeeerr');
  const getQuerySearchParam = useCallback(() => {
    return searchParams.get('query');
  }, [searchParams, location]);

  const getFilteredProducts = useCallback(() => {
    if (!filter || filter === "All") {
      setFilteredProd(vinyls);
      searchParams.delete('filter');
      setSearchParams(searchParams);

      return;
    }

    const productsArray = [...vinyls].filter((item) => item.genre === filter);
    searchParams.set('filter', filter);
    setSearchParams(searchParams);
    setFilteredProd(productsArray);
  },[filter, location])

  const handlerSetFilter = useCallback((el: string) => {
    setFilter(el)
  },[filter, location])

  // useMemo(() => {
    // setIsLoading(true);
    // setPhones(vinyls)
    // getProducts()
    //   .then(data => {
    //     // const filteredData = data.filter((item: Vinyls) => (
    //     //   item.type === TypeProduct.Phone));

    //     setPhones(data);
    //   })
    //   .finally(() => setIsLoading(false));
  // }, []);

  // useEffect(() => {
  //   setPhones(vinyls);
  // }, [])

  useEffect(() => {
    getFilteredProducts();
  }, [filter, location])

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
      default:
        return
    }
 
  }, [toPage])

  console.log(filter, 'ddddd')

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
    
      {!isLoading ? (
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
