import { useRef } from 'react';
import styles from './ProductCarousel.module.css';
import ProductCard from '../ProductCard/ProductCard.jsx';

export default function ProductCarousel({ productList }) {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  if (!productList || productList.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselWrapper}>
      {}
      <button
        className={`${styles.arrowButton} ${styles.arrowLeft}`}
        onClick={() => scroll(-300)}
        aria-label="Прокрутити вліво"
      >
        &lt;
      </button>

      {}
      <div className={styles.productListContainer} ref={scrollRef}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {}
      <button
        className={`${styles.arrowButton} ${styles.arrowRight}`}
        onClick={() => scroll(300)}
        aria-label="Прокрутити вправо"
      >
        &gt;
      </button>
    </div>
  );
}
