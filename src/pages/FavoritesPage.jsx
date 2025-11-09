import { useMemo } from 'react';
import styles from './FavoritesPage.module.css';
import ProductCard from '../components/common/ProductCard/ProductCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button/Button.jsx';
import { useFetchData } from '../hooks/useFetchData.js';

export default function FavoritesPage() {
  const { user } = useAuth();

  const {
    data: allProducts,
    isLoading,
    error,
  } = useFetchData('/products.json');

  const favoriteProducts = useMemo(() => {
    if (!user || !allProducts) {
      return [];
    }
    return allProducts.filter((product) => user.favorites.includes(product.id));
  }, [user, allProducts]);

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.favoritesContent}>
          <h1 className={styles.mainTitle}>ВПОДОБАНІ ТОВАРИ</h1>
          <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
            Завантаження...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.favoritesContent}>
          <h1 className={styles.mainTitle}>ВПОДОБАНІ ТОВАРИ</h1>
          <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
            Помилка завантаження: {error}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.favoritesContent}>
        <h1 className={styles.mainTitle}>ВПОДОБАНІ ТОВАРИ</h1>

        {favoriteProducts.length > 0 ? (
          <div className={styles.productsGrid}>
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>♡</span>
            <h2 className={styles.emptyTitle}>
              Ваш список вподобаних порожній
            </h2>
            <p className={styles.emptyText}>
              Схоже, ви ще не додали жодного товару. Натисніть на сердечко біля
              товару, щоб зберегти його тут.
            </p>
            <Link to="/select">
              <Button variant="dark">Перейти до каталогу</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
