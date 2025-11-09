import styles from './ProductCard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

export default function ProductCard({ product }) {
  const { user, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  const isFavorite = user?.favorites.includes(product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Будь ласка, увійдіть, щоб додати товар в улюблені.');
      navigate('/login');
      return;
    }
    toggleFavorite(product.id);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
        </div>
        <div className={styles.content}>
          <p className={styles.productType}>{product.type}</p>
          <h3 className={styles.productName}>{product.name}</h3>

          <div className={styles.actions}>
            <span className={styles.viewButton}>Переглянути</span>

            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
              onClick={handleFavoriteClick}
            >
              {}
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
      </Link>
    </div>
  );
}
