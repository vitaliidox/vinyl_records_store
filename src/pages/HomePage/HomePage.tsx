import './homePage.scss';
import circleArrow from '../../components/icons/circle-arrow.svg';
import arrow from '../../components/icons/arrow-vector.svg';

import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// import { ProductsSlider } from '../../components/ProductsSlider';
import { Discover } from '../../components/Discover';
import { SearchList } from '../../components/SearchList';
import { Carousel } from '../../components/Carousel';
import vinyls from '../../helpers/vinyls.json';

import { Vinyls } from '../../type/product';
import whoWeAre from '../../img/who-we-are.png';
import { Loader } from '../../components/Loader';
// import { CarouselBest } from '../../components/CarouselBest';

// import { getProducts } from '../../helpers/getProducts';

type Props = {
  products: Vinyls[],
  isLoading: boolean,
};

export const HomePage: React.FC<Props> = ({ products, isLoading }) => {
  const [searchParams] = useSearchParams();
  const [vinylsList, setVinylsList] = useState<Vinyls[]>([]);
  // const [activeIndex, setActiveIndex] = useState(0);


  const getQuerySearchParam = useCallback(() => {
    return searchParams.get('query');
  }, [searchParams]);

  useMemo(() => {
    
  
          setVinylsList(vinyls);
    // getProducts()
    //   .then(data => {
    //     const filteredData = data.filter((item: Product) => (
    //       item.type === TypeProduct.Phone));

    //     setPhones(filteredData);
    //   });
  }, []);

  console.log(vinyls)
  const getHotPrice = useCallback(() => {
    return products.filter((product) => product.discount)
      .sort((a, b) => b.discount - a.discount);
  }, [products]);

  // const getNewProducts = useCallback(() => {
  //   return products.filter((product) => product.discount)
  //     .sort((a, b) => b.price - a.price);
  // }, [products]);


  // const handleSlideChange = (swiper: any) => {
  //   setActiveIndex(swiper.activeIndex);
  // };

  

  return !getQuerySearchParam() ? (
    <section className="home">
      <div className="background">
        <div className="background__circle background__circle--1" />
        <div className="background__circle background__circle--2" />
        <div className="background__circle background__circle--3" />
        <div className="background__circle background__circle--4" />
        <div className="background__circle background__circle--5" />
        <div className="background__circle background__circle--6" />
        <div className="background__circle background__circle--7" />
        {/* <div className="background__circle background__circle--8" />
        <div className="background__circle background__circle--9" /> */}

        <img
          className="background__circle-arrow"
          src={circleArrow}
          alt="circle-arrow"
        />

        <img
          className="background__circle-arrow background__circle-arrow--2"
          src={circleArrow}
          alt="circle-arrow"
        />

        <img
          className="background__arrow"
          src={arrow}
          alt="arrow"
        />
      </div>

      <Discover />

        {!isLoading ? (
          <Carousel
            title={'New releases'}
            linkTo={"/new-releases"}
            data={vinylsList}
          />
        ) : (
          <Loader />
        )}
    
      <article id="who-we-are" className="about-us">
        <div className="about-us__left-block">
          <div className="about-us__img-wrapper">
            <img
              className="about-us__img"
              src={whoWeAre}
              alt="vinyl"
            />
          </div>

          <p className="about-us__credo">
            Love music with us!
          </p>
        </div>


        <div className="about-us__description-wrapper">
          <h2 className="about-us__title">
            Who we are?
          </h2>

          <p className="about-us__description">
            We are a small team of vinyl lovers from Kyiv who founded our favorite place in 2023.
          </p>

          <p className="about-us__description">
            We share our love for music with people, help them to expand their preferences and teach them how to enjoy music properly.
          </p>

          <address className="about-us__address">
            <a
              target="_blank"
              href="https://goo.gl/maps/CKqeN3UazrUWnoEo6"
              className='about-us__link about-us__link--location'
            >
              Velyka Vasilkivska St, 145/1, Kyiv
            </a>

            <a
              href="tel:(063) 255-1-255"
              className='about-us__link about-us__link--phone'
            >
              (063) 255-1-255
            </a>

            <a
              href="mailto:o.vinyl@gmail.com"
              className='about-us__link about-us__link--mail'
            >
              o.vinyl@gmail.com
            </a>
          </address>
        </div>
      </article>

      {!isLoading ? (
        <Carousel
          title={'Best sales'}
          linkTo={"/best-sales"}
          data={getHotPrice()}
        />
      ) : (
        <Loader />
      )}


      <div className="home__locate-wrapper">
        <article className="home__locate">
          <a
            target="_blank"
            href="https://goo.gl/maps/CKqeN3UazrUWnoEo6"
            className='about-us__link about-us__link--location'
          >
            Velyka Vasilkivska St, 145/1, Kyiv
          </a>
        </article>
      </div>
    </section>
   ) : (
    <SearchList products={vinylsList} />
  );
};
