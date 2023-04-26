import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import "./carousel.scss";

import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { A11y, Autoplay } from 'swiper';

import { Vinyls } from "../../type/product";
import { ProductCard } from "../ProductCard";

type Props = {
  data: Vinyls[],
  title: string,
  linkTo: string,
}

export const Carousel: React.FC<Props> = ({
  data,
  title,
  linkTo,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  }, [activeIndex]);


  const [swiperParams, setSwiperParams] = React.useState({
    slidesPerView: 5,
  });

  React.useEffect(() => {
    const handleResize = () => {
       if (window.innerWidth < 800) {
        setSwiperParams({
          ...swiperParams,
          slidesPerView: 1,
        });
      } else if (window.innerWidth < 1100) {
        setSwiperParams({
          ...swiperParams,
          slidesPerView: 2,
        });
      } else if (window.innerWidth < 1440) {
        setSwiperParams({
          ...swiperParams,
          slidesPerView: 3,
        });
      } else if (window.innerWidth < 1630) {
        setSwiperParams({
          ...swiperParams,
          slidesPerView: 4,
        });
      } else {
        setSwiperParams({
          ...swiperParams,
          slidesPerView: 5,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [swiperParams]);

  return (
    <div className="swiper-block">
      <div className="swiper-block__title-wrapper">
        <h2 className="swiper-block__title">
          {title}
        </h2>

        <Link to={linkTo} className="swiper-block__title-link">
          watch more
        </Link>
      </div>

      <Swiper
          modules={[A11y, Autoplay]}
          spaceBetween={20}
          slidesPerGroup={1}
          onSlideChange={handleSlideChange}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1200}
          {...swiperParams}
      >
        {data.map((product) => (
          <SwiperSlide key={product.titleAlbum}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
