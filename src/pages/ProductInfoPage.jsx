import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './ProductInfoPage.module.css';
import Button from '../components/common/Button/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useFetchData } from '../hooks/useFetchData.js';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductInfoPage() {
  const { productId } = useParams();
  const { user, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useFetchData(`${API_BASE_URL}/products/${productId}`);

  const isFavorite = user?.favorites.includes(product?._id);

  const handleAddToFavorites = () => {
    if (!user) {
      alert('Будь ласка, увійдіть, щоб додати товар в улюблені.');
      navigate('/login');
      return;
    }
    if (product) {
      toggleFavorite(product._id);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
          Завантаження продукту...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
          Помилка завантаження: {error}
        </h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.pageContainer}>
        <h2>Продукт не знайдено!</h2>
        <Link to="/select">
          <Button variant="dark">Повернутися до каталогу</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.productLayout}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
        </div>

        <div className={styles.infoWrapper}>
          <p className={styles.productType}>{product.type}</p>
          <h1 className={styles.productName}>{product.name}</h1>

          {product.volume && (
            <p className={styles.productVolume}>Об'єм: {product.volume}</p>
          )}

          <h3 className={styles.sectionTitle}>Опис</h3>
          <p className={styles.productDescription}>
            {product.description ||
              "Детальний опис цього продукту скоро з'явиться на сайті."}
          </p>

          {product.benefits && (
            <div className={styles.infoBlock}>
              <h3 className={styles.sectionTitle}>Ключові переваги</h3>
              <ul className={styles.benefitsList}>
                {product.benefits.map((benefit, index) => (
                  <li key={index}>✓ {benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {product.hairType && (
            <div className={styles.infoBlock}>
              <h3 className={styles.sectionTitle}>Тип волосся</h3>
              <p className={styles.hairType}>{product.hairType}</p>
            </div>
          )}

          {product.howToUse && (
            <div className={styles.infoBlock}>
              <h3 className={styles.sectionTitle}>Спосіб застосування</h3>
              <p className={styles.howToUse}>{product.howToUse}</p>
            </div>
          )}

          <button
            className={`${styles.favoriteButton} ${
              isFavorite ? styles.isFavorite : ''
            }`}
            onClick={handleAddToFavorites}
            aria-label={
              isFavorite ? 'Видалити з улюблених' : 'Додати в улюблені'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? '#e53e3e' : 'none'}
              stroke={isFavorite ? '#e53e3e' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.heartIcon}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
