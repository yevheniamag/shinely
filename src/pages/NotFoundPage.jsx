import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import Button from '../components/common/Button/Button.jsx';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.title}>Сторінку не знайдено</h2>
      <p className={styles.description}>
        Схоже, ви зайшли за адресою, якої не існує.
      </p>
      <Link to="/">
        <Button variant="dark">Повернутися на головну</Button>
      </Link>
    </div>
  );
}
