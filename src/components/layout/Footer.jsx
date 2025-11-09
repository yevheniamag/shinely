import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import instagramIcon from '../../assets/instagram.png';
import facebookIcon from '../../assets/facebook.png';
import tiktokIcon from '../../assets/tiktok.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {}
        <div className={styles.column + ' ' + styles.subscribeColumn}>
          <div className={styles.logo}>S H I N E L Y</div>
          <p className={styles.subscribeText}>
            Отримай поради та знижки на email
          </p>
          <div className={styles.subscribeForm}>
            <input
              type="email"
              placeholder="Email address"
              className={styles.emailInput}
            />
            <button className={styles.emailButton}>EMAIL ADDRESS</button>
          </div>
          <p className={styles.copyright}>&copy; 2025 HairCare Project</p>
        </div>

        {}
        <div className={styles.column}>
          <p className={styles.contactItem}>+38 (099) 234 33 00</p>
          <p className={styles.contactItem}>Haircare@Gmail.Com</p>
          <p className={styles.contactItem}>ЗВОРОТНИЙ ЗВ'ЯЗОК</p>
        </div>

        {}

        {}
        <div className={styles.column}>
          <Link to="/about" className={styles.navLink}>
            ПРО НАС
          </Link>
          <p className={styles.navLink}>ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</p>
        </div>

        {}
        <div className={styles.socialIcons}>
          {}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
              src={instagramIcon}
              alt="Instagram"
              className={styles.socialIconImage}
            />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              className={styles.socialIconImage}
            />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <img
              src={tiktokIcon}
              alt="TikTok"
              className={styles.socialIconImage}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
