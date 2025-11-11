import { useState } from 'react';
import styles from './AboutUsPage.module.css';
import Button from '../components/common/Button/Button.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import imgColor1 from '../assets/about-color-1.png';
import imgColor2 from '../assets/about-color-2.png';
import imgColor3 from '../assets/about-color-3.png';
import imgColor4 from '../assets/about-color-4.png';
// Типи
import imgType1a from '../assets/about-type-1a.png';
import imgType1b from '../assets/about-type-1b.png';
import imgType1c from '../assets/about-type-1c.png';
import imgType2a from '../assets/about-type-2a.png';
import imgType2b from '../assets/about-type-2b.png';
import imgType2c from '../assets/about-type-2c.png';
import imgType3a from '../assets/about-type-3a.png';
import imgType3b from '../assets/about-type-3b.png';
import imgType3c from '../assets/about-type-3c.png';
import imgType4a from '../assets/about-type-4a.png';
import imgType4b from '../assets/about-type-4b.png';
import imgType4c from '../assets/about-type-4c.png';
// Проблеми
import imgProblemLoss from '../assets/about-problem-loss.png';
import imgProblemOily from '../assets/about-problem-oily.png';
import imgProblemSplit from '../assets/about-problem-split.png';

const colorImages = [imgColor1, imgColor2, imgColor3, imgColor4];
const typeImages = [
  imgType1a,
  imgType1b,
  imgType1c,
  imgType2a,
  imgType2b,
  imgType2c,
  imgType3a,
  imgType3b,
  imgType3c,
  imgType4a,
  imgType4b,
  imgType4c,
];
const problemImages = [imgProblemSplit, imgProblemLoss, imgProblemOily];

export default function AboutUsPage() {
  const [colorIndex, setColorIndex] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  const [problemIndex, setProblemIndex] = useState(0);

  const { user } = useAuth();

  const handleNextColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colorImages.length);
  };

  const handleNextType = () => {
    setTypeIndex((prevIndex) => (prevIndex + 1) % typeImages.length);
  };

  const handleNextProblem = () => {
    setProblemIndex((prevIndex) => (prevIndex + 1) % problemImages.length);
  };

  return (
    <div className={styles.aboutPage}>
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
          <div className={styles.card}>
            <img src={colorImages[colorIndex]} alt="Кольори волосся" />
            <div className={styles.cardOverlay}>
              <span>Кольори волосся</span>
              <span className={styles.arrow} onClick={handleNextColor}>
                →
              </span>
            </div>
          </div>

          <div className={styles.card}>
            <img src={typeImages[typeIndex]} alt="Типи волосся" />
            <div className={styles.cardOverlay}>
              <span>Типи волосся</span>
              <span className={styles.arrow} onClick={handleNextType}>
                →
              </span>
            </div>
          </div>

          <div className={styles.card}>
            <img src={problemImages[problemIndex]} alt="Проблеми волосся" />
            <div className={styles.cardOverlay}>
              <span>Проблеми</span>
              <span className={styles.arrow} onClick={handleNextProblem}>
                →
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>В ЧОМУ НАША ОСОБЛИВІСТЬ?</h2>
        <div className={styles.featuresGrid}>
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
        </div>{' '}
        {!user && (
          <Link to="/register">
            <Button variant="dark">Зареєструватися</Button>
          </Link>
        )}
      </section>{' '}
      {}
    </div>
  );
}
