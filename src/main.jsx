import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductSelectorPage from './pages/ProductSelectorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ProductInfoPage from './pages/ProductInfoPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'select', element: <ProductSelectorPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegistrationPage /> },
      { path: 'about', element: <AboutUsPage /> },
      { path: 'product-info', element: <ProductInfoPage /> },

      {
        path: 'favorites',
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
