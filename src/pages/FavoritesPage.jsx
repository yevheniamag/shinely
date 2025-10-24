import styles from './FavoritesPage.module.css';
import ProductCard from '../components/common/ProductCard/ProductCard';
import fmask1 from '../assets/f-mask1.png';
import shampoo1 from '../assets/shampoo-1.png';

const favoriteProducts = [
  {
    id: 4,
    image: fmask1,
    name: 'Deep Repair Mask',
    type: 'Маска',
  },
  {
    id: 1,
    image: shampoo1,
    name: 'Herbal Gentle Shampoo',
    type: 'Шампунь',
  },
];

export default function FavoritesPage() {
  return (
    <div className={styles.favoritesPage}>
      <section className={styles.titleSection}>
        <h1>ВПОДОБАНІ ЗАСОБИ</h1>
        {}
      </section>

      {}
      <section className={styles.productsSection}>
        {favoriteProducts.length > 0 ? (
          <div className={styles.productList}>
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                type={product.type}
              />
            ))}
          </div>
        ) : (
          <p className={styles.emptyMessage}>Ваш список вподобаних порожній.</p>
        )}
      </section>
    </div>
  );
}
