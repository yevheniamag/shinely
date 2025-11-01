import styles from './FavoritesPage.module.css';
import ProductCard from '../components/common/ProductCard/ProductCard.jsx';

import shampoo1 from '../assets/shampoo-1.png';
import mask1 from '../assets/mask-1.png';
import oil2 from '../assets/oil-2.png';

const favoriteProducts = [
  {
    id: 2,
    image: shampoo1,
    name: 'Herbal Essences Petal Soft',
    type: 'Шампунь',
  },
  {
    id: 11,
    image: mask1,
    name: "La'dor Eco Hydro LPP Treatment",
    type: 'Маска',
  },
  { id: 17, image: oil2, name: 'CHI Argan Oil Plus Moringa Oil', type: 'Олія' },
];

export default function FavoritesPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Вподобані Товари</h1>

      {favoriteProducts.length > 0 ? (
        <div className={styles.favoritesGrid}>
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>У вас ще немає улюблених товарів.</p>
      )}
    </div>
  );
}
