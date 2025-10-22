import styles from './Header.module.css';
import Button from '../Button/Button.jsx';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SHINELY</div>
      <nav className={styles.navigation}>
        <span>Головна</span>
        <span>Про Нас</span>
        <span>Підбір Засобів</span>
        <span>Вподобані</span>
      </nav>
      <div className={styles.authButtons}>
        <Button variant="dark">Увійти</Button>
        <Button variant="light">Зареєструватися</Button>
      </div>
    </header>
  );
}

export default Header;
