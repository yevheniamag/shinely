import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProductSelectorPage from './pages/ProductSelectorPage';
import AboutUsPage from './pages/AboutUsPage';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegistrationPage />
            </Layout>
          }
        />
        <Route
          path="/select"
          element={
            <Layout>
              <ProductSelectorPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUsPage />
            </Layout>
          }
        />
        <Route
          path="/favorites"
          element={
            <Layout>
              <FavoritesPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
