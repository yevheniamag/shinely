import styles from './AboutUsPage.module.css';
import Button from '../components/common/Button/Button';

import imgColors from '../assets/about-color-1.png';
import imgTypeToShow from '../assets/about-type-2b.png';
import imgProblemToShow from '../assets/about-problem-split.png';

export default function AboutUsPage() {
  return (
    <div className={styles.aboutPage}>
      {}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>ПРО НАС</h1>
          <p className={styles.heroSubtitle}>
            Наш сайт, присвячений догляду за волоссям! Ми створили цей проєкт,
            щоб допомогти кожному знайти ідеальний догляд саме для свого типу
            волосся.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {}
          <div className={styles.card}>
            {}
            <img src={imgColors} alt="Кольори волосся" />
            <div className={styles.cardOverlay}>
              <span>Кольори волосся</span>
              <span className={styles.arrow}>→</span>
            </div>
          </div>
          {}
          <div className={styles.card}>
            <img src={imgTypeToShow} alt="Типи волосся" />
            <div className={styles.cardOverlay}>
              <span>Типи волосся</span>
              <span className={styles.arrow}>→</span>
            </div>
          </div>
          {}
          <div className={styles.card}>
            <img src={imgProblemToShow} alt="Проблеми волосся" />
            <div className={styles.cardOverlay}>
              <span>Проблеми</span>
              <span className={styles.arrow}>→</span>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>В ЧОМУ НАША ОСОБЛИВІСТЬ?</h2>
        <div className={styles.featuresGrid}>
          {}
          <div className={styles.featureItem}>
            <div className={styles.iconPlaceholder}>♡</div>
            <h3>Можливість зберегти засоби</h3>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconPlaceholder}>😊</div>
            <h3>Підбір різних засобів</h3>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconPlaceholder}>☆</div>
            <h3>Зручність інтерфейсу</h3>
          </div>
        </div>
        <Button variant="dark">Зареєструватися</Button>
      </section>
    </div>
  );
}
