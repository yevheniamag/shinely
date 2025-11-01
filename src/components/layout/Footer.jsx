import styles from './Footer.module.css';

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
        <div className={styles.column}>
          <p className={styles.navLink}>ПІДІБРАТИ ЗАСІБ</p>
          <p className={styles.navLink}>ТИПИ ВОЛОССЯ</p>
          <p className={styles.navLink}>ПОРАДИ З ДОГЛЯДУ</p>
          <p className={styles.navLink}>ЧАСТІ ПИТАННЯ (FAQ)</p>
        </div>

        {}
        <div className={styles.column}>
          <p className={styles.navLink}>ПРО НАС</p>
          <p className={styles.navLink}>ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</p>
          <p className={styles.navLink}>УМОВИ ВИКОРИСТАННЯ</p>
          <p className={styles.navLink}>СПІВПРАЦЯ</p>
        </div>

        {}
        <div className={styles.socialIcons}>
          {}
          <a href="#instagram" className={styles.iconLink}>
            <img
              src={instagramIcon}
              alt="Instagram"
              className={styles.socialIconImage}
            />
          </a>
          <a href="#facebook" className={styles.iconLink}>
            <img
              src={facebookIcon}
              alt="Facebook"
              className={styles.socialIconImage}
            />
          </a>
          <a href="#tiktok" className={styles.iconLink}>
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
