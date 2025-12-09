import styles from './HomePage.module.css';
import Button from '../components/common/Button/Button';
import { Link } from 'react-router-dom';

import heroImage from '../assets/hero-image.png';
import feature1 from '../assets/feature-1.png';
import feature2 from '../assets/feature-2.png';
import feature3 from '../assets/feature-3.png';

function HomePage() {
  return (
    <div className={styles.homePage}>
      <main className={styles.heroSection}>
        <div className={styles.heroImageContainer}>
          <img
            src={heroImage}
            alt="Догляд за волоссям"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.rightContentWrapper}>
          <div className={styles.heroContent}>
            <p className={styles.heroSubtitle}>
              Створи свій догляд за волоссям з допомогою Shinely
            </p>
            <h1 className={styles.heroTitle}>
              Твій персональний гід у догляді за волоссям
            </h1>
            <p className={styles.heroDescription}>
              Ми підбираємо лише якісні продукти на основі натуральних
              інгредієнтів, щоб твоя рутина догляду була максимально безпечною
              та ефективною.
            </p>
            {}
            <Link to="/select">
              <Button variant="light">
                Підібрати Засоби
                <span className={styles.arrow}> →</span>
              </Button>
            </Link>
          </div>
          <section className={styles.featuresSection}>
            <div className={styles.featuresTitleContainer}>
              <h2 className={styles.featuresTitle}>Переваги 💆</h2>
            </div>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <p className={styles.featureNumber}>1.</p>
                <div className={styles.featureImageContainer}>
                  <img src={feature1} alt="Натуральні засоби" />
                  <h3>Натуральні засоби</h3>
                </div>
              </div>
              <div className={styles.featureCard}>
                <p className={styles.featureNumber}>2.</p>
                <div className={styles.featureImageContainer}>
                  <img src={feature2} alt="Зручний підбір" />
                  <h3>Зручний підбір</h3>
                </div>
              </div>
              <div className={styles.featureCard}>
                <p className={styles.featureNumber}>3.</p>
                <div className={styles.featureImageContainer}>
                  <img src={feature3} alt="Список вподобаних" />
                  <h3>Список вподобаних</h3>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
