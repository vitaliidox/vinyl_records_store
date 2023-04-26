import './discover.scss';

import  img1 from '../../img/Img1.png'
import  img2 from '../../img/Img2.png'
import  img3 from '../../img/Img3.png'
import { Link } from 'react-router-dom';

export const Discover = () => {
  return (
    <article className="discover">
        <div className="discover__wrapper">
          <h1 className="discover__title">
            Discover real music
          </h1>

          <p className="discover__description">
            We will get you hooked on the needle 
          </p>

          <Link to="/catalog" className="discover__button-link">
            Our vinyls
          </Link>
        </div>

        <div className="discover__wrapper-img">
          <img
            className="discover__img"
            src={img1}
            alt="vinyl"
          />

          <div className="discover__side-wrapper-img">
            <img
              className="discover__img"
              src={img2}
              alt="vinyl"
            />

            <img
              className="discover__img"
              src={img3}
              alt="vinyl"
            />
          </div>
        </div>
      </article>
  )
}