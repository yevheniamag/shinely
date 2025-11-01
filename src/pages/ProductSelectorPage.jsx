import styles from './ProductSelectorPage.module.css';
import ProductCard from '../components/common/ProductCard/ProductCard.jsx';
import Button from '../components/common/Button/Button.jsx';

import shampoo1 from '../assets/shampoo-1.png';
import shampoo2 from '../assets/shampoo-2.png';
import shampoo3 from '../assets/shampoo-3.png';
import shampoo4 from '../assets/shampoo-4.png';
import shampoo5 from '../assets/shampoo-5.png';
import conditioner1 from '../assets/conditioner-1.png';
import conditioner2 from '../assets/conditioner-2.png';
import conditioner3 from '../assets/conditioner-3.png';
import conditioner4 from '../assets/conditioner-4.png';
import conditioner5 from '../assets/conditioner-5.png';
import mask1 from '../assets/mask-1.png';
import mask2 from '../assets/mask-2.png';
import mask3 from '../assets/mask-3.png';
import mask4 from '../assets/mask-4.png';
import mask5 from '../assets/mask-5.png';
import oil1 from '../assets/oil-1.png';
import oil2 from '../assets/oil-2.png';
import oil3 from '../assets/oil-3.png';
import oil4 from '../assets/oil-4.png';
import oil5 from '../assets/oil-5.png';
import spray1 from '../assets/spray-1.png';
import spray2 from '../assets/spray-2.png';
import spray3 from '../assets/spray-3.png';
import spray4 from '../assets/spray-4.png';
import spray5 from '../assets/spray-5.png';

const products = {
  shampoos: [
    { id: 1, image: shampoo2, name: 'Redken Volume Injection Shampoo' },
    { id: 2, image: shampoo1, name: 'Herbal Essences Petal Soft' },
    { id: 3, image: shampoo3, name: 'Matrix Food For Soft Hydrating' },
    { id: 4, image: shampoo4, name: 'Davines Minu Shampoo' },
    { id: 5, image: shampoo5, name: 'Vichy Dercos Anti-Dandruff' },
  ],
  conditioners: [
    { id: 6, image: conditioner1, name: 'Moisture & More Conditioner' },
    { id: 7, image: conditioner2, name: 'Tresemme Flawless Waves' },
    { id: 8, image: conditioner3, name: 'Kerastase Premiere Fondant' },
    {
      id: 9,
      image: conditioner4,
      name: 'Clever Hair Cosmetics 3D Line Extra Treatment In One Minute',
    },
    {
      id: 10,
      image: conditioner5,
      name: 'Kerastase Chroma Absolu Fondant Cica Chroma',
    },
  ],
  masks: [
    { id: 11, image: mask1, name: "La'dor Eco Hydro LPP Treatment" },
    { id: 12, image: mask2, name: 'Brelil Numero Total Repair Mask' },
    {
      id: 13,
      image: mask3,
      name: 'Alfaparf Milano Semi Di Lino Moisture Nutritive Mask',
    },
    { id: 14, image: mask4, name: 'Inebrya She Care Repair Mask' },
    { id: 15, image: mask5, name: 'Anagana Professional Lipid Mask' },
  ],
  oils: [
    { id: 16, image: oil1, name: "La'dor Wonder Hair Oil" },
    { id: 17, image: oil2, name: 'CHI Argan Oil Plus Moringa Oil' },
    { id: 18, image: oil3, name: 'Comex Ayurvedic Natural Oil' },
    { id: 19, image: oil4, name: 'Hair Trend Total Oil Repair' },
    { id: 20, image: oil5, name: 'Bogenia Professional Hair Oil Marula Oil' },
  ],
  sprays: [
    { id: 21, image: spray1, name: 'CHI Volume Booster' },
    { id: 22, image: spray2, name: 'Leia Magnetisme Spray' },
    {
      id: 23,
      image: spray3,
      name: 'You look Professional Multiaction Spray 10 in 1',
    },
    { id: 24, image: spray4, name: 'Comex Ayurvedic Natural' },
    { id: 25, image: spray5, name: 'Alter Ego Italy Hasty Too Hi T Security' },
  ],
};

const getCategoryTitle = (category) => {
  const titles = {
    shampoos: 'Шампунь',
    conditioners: 'Кондиціонер',
    masks: 'Маска',
    oils: 'Олія',
    sprays: 'Спрей',
  };
  return titles[category] || category;
};

export default function ProductSelectorPage() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.filterSection}>
        <h1 className={styles.title}>ПІДБІР ЗАСОБІВ</h1>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            Тут ти можеш підібрати ідеальні засоби догляду за своїм волоссям,
            обери свій тип волосся та проблему — і отримай персональні
            рекомендації масок, олій та інших засобів.
          </p>
        </div>
        <div className={styles.filters}>
          <button className={styles.filterButton}>
            <span>Тип волосся</span>
            <span>&gt;</span>
          </button>
          <button className={styles.filterButton}>
            <span>Проблема</span>
            <span>&gt;</span>
          </button>
          <button className={styles.filterButton}>
            <span>Тип засобу</span>
            <span>&gt;</span>
          </button>
        </div>
        <Button variant="primary" className={styles.submitButton}>
          Підібрати
        </Button>
      </section>

      <div className={styles.resultsContainer}>
        {Object.entries(products).map(([category, productList]) =>
          productList.length > 0 ? (
            <section key={category} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>
                {getCategoryTitle(category)}
              </h2>
              <div className={styles.productList}>
                {productList.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    </div>
  );
}
