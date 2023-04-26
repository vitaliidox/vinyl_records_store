import './breadcrumbs.scss';
import { Location } from 'history';
import { Link, useLocation } from 'react-router-dom';
import { breadcrumbsArray } from '../../helpers/breadcrumbsArray';

export const Breadcrumbs = () => {
  const location: Location = useLocation();
  const breadcrumbsLinks = breadcrumbsArray(location);

  return (
    <article data-cy="breadCrumbs" className="breadcrumb">
      <ul className="breadcrumb__list">
        {breadcrumbsLinks.map((el, index, arr) => (
          <li key={`${index + arr.length}`} className="breadcrumb__item">
           <Link
            className="breadcrumb__page"
            to="/"
          >
           Home page /
          </Link>
            {arr.length >= 1 && index === arr.length - 1 ? (
              <p className="breadcrumb__page breadcrumb__page--light">
                {el}
              </p>
            ) : (
              <Link
                to={`/${el.toLowerCase()}`}
                className="breadcrumb__page"
              >
                {el}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
};
