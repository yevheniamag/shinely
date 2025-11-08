import styles from './ProductCard.module.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <h4 className={styles.name}>{product.name}</h4>
      <p className={styles.type}>{product.type}</p>

      <div className={styles.actions}>
        {}
        <Link to="/product-info">
          <Button variant="light">Переглянути</Button>
        </Link>
        <button className={styles.favoriteButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
