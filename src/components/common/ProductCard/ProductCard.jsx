import styles from './ProductCard.module.css';
import Button from '../Button/Button'; // Імпортуємо кнопку

// Приймаємо дані про продукт як props
export default function ProductCard({ image, name, type }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h4 className={styles.name}>{name}</h4>
      <p className={styles.type}>{type}</p>{' '}
      {/* Тип продукту (Шампунь, Маска...) */}
      {/* Кнопка "Переглянути" */}
      <Button variant="light">Переглянути</Button>
    </div>
  );
}
