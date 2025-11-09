import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button.jsx';
import styles from './Header.module.css';
import { useAuth } from '../../../context/AuthContext.jsx';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.headerWrapper}>
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
          {user ? (
            <Button variant="dark" onClick={handleLogout}>
              Вийти
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="dark">Увійти</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Зареєструватися</Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
