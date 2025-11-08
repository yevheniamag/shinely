import { Link, NavLink } from 'react-router-dom';
import Button from '../../common/Button/Button';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      {}
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          SHINELY
        </Link>

        <nav className={styles.navigation}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Головна
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Про Нас
          </NavLink>
          <NavLink
            to="/select"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Підбір Засобів
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Вподобані
          </NavLink>
        </nav>

        <div className={styles.authButtons}>
          <Link to="/login">
            <Button variant="dark">Увійти</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Зареєструватися</Button>
          </Link>
        </div>
      </header>
    </div>
  );
}
