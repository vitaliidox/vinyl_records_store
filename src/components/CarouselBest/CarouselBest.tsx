import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import "./carouselBest.scss";

import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// import { A11y, Autoplay } from 'swiper';

import { Vinyls } from "../../type/product";
import { ProductCard } from "../ProductCard";

type Props = {
  data: Vinyls[],
}

export const CarouselBest: React.FC<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  }, [activeIndex]);

  return (
    <div className="swiper-block-best">
      <div className="swiper-block-best__title-wrapper">
        <div className="swiper-block-best__title-block">
          <h2 className="swiper-block-best__title">
            Best sales
          </h2>

          <p className="swiper-block-best__title-description">
            We know how much you love looking for vinyl
          </p>
        </div>
        

        <Link to="best-sales" className="swiper-block-best__title-link">
          watch more
        </Link>
      </div>

      <Swiper
          // modules={[A11y, Autoplay]}
          // spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={1}
          onSlideChange={handleSlideChange}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1200}
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
