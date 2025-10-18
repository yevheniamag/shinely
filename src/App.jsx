import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProductSelectorPage from './pages/ProductSelectorPage';
import AboutUsPage from './pages/AboutUsPage';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
  return (
    <BrowserRouter>
      {}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/select" element={<ProductSelectorPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
