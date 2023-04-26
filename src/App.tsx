import './styles/reset.scss';
import './App.scss';

import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage/HomePage';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { NotFound } from './pages/NotFound';

import { getProducts } from './helpers/getProducts';
import { Vinyls } from './type/product';
import vinyls from '../src/helpers/vinyls.json';
import { ToPage } from './type/types';


const App = () => {
  const [products, setProducts] = useState<Vinyls[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState<string>('/');
  const location = useLocation();
  
  const setProductsList = () => {
    // setIsLoading(true);

    getProducts()
      .then(data => setProducts(data));
      // .finally(() => setIsLoading(false));
  };

  const setActiveNav = useCallback(() => {
    const pathName = location.pathname.substring(1);
    setIsActive(pathName);
   
  }, [location.pathname]);

  const pageUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setProductsList();
  }, []);

  useEffect(() => {
    setActiveNav();
  }, [location.pathname])

  return (
    <div className="page">
      <div className="page__content">
      <Header
        isActive={isActive}
        setIsActive={setIsActive}
      />

      <main className="main">
        <Routes>
          <Route
            path="home"
            element={<Navigate to="/" />}
          />

          <Route
            path="/"
            element={
              <HomePage
                // isLoading={isLoading}
                products={vinyls || []}
              />
            }
          />

          <Route path="/catalog">
            <Route index element={<Catalog toPage={ToPage.All} />} />
            <Route
              path=":productId"
              element={<ProductDetails products={products} />}
            />
          </Route>

          <Route path="/new-releases">
            <Route index element={<Catalog toPage={ToPage.NewRelease}/>} />
            <Route
              path=":productId"
              element={<ProductDetails products={products} />}
            />
          </Route>

          <Route path="/best-sales">
            <Route index element={<Catalog toPage={ToPage.BestSales} />} />
            <Route
              path=":productId"
              element={<ProductDetails products={products} />}
            />
          </Route>

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <Footer
        pageUp={pageUp}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      </div>
    </div>
  );
};

export default App;
