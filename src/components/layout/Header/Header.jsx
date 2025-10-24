import { NavLink } from 'react-router-dom'; // <--- 1. Імпортуємо NavLink
import styles from './Header.module.css';
import Button from '../../common/Button/Button';

function Header() {
  return (
    <header className={styles.header}>
      {/* 2. Логотип тепер теж є посиланням на головну */}
      <NavLink to="/" className={styles.logo}>
        SHINELY
      </NavLink>

      <nav className={styles.navigation}>
        {/* 3. Замінюємо <span> на <NavLink> */}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          Головна
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          Про Нас
        </NavLink>
        <NavLink
          to="/select"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          Підбір Засобів
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          Вподобані
        </NavLink>
      </nav>

      <div className={styles.authButtons}>
        {/* 4. Обгортаємо кнопки в посилання */}
        <NavLink to="/login">
          <Button variant="dark">Увійти</Button>
        </NavLink>
        <NavLink to="/register">
          <Button variant="light">Зареєструватися</Button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
