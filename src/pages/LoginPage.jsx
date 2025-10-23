import styles from './LoginPage.module.css';
import Button from '../components/common/Button/Button';
import Input from '../components/common/Input/Input';
import Checkbox from '../components/common/Checkbox/Checkbox';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Вхід до кабінету</h2>

        <form className={styles.form}>
          <Input label="Email *" type="email" />
          <Input label="Пароль *" type="password" />

          <div className={styles.actions}>
            <Checkbox label="Запам'ятати мене" />
            <Link to="/forgot-password" className={styles.forgotLink}>
              Забули пароль?
            </Link>
          </div>

          <Button variant="light" type="submit">
            Увійти
          </Button>

          <p className={styles.registerPrompt}>
            Не маєте акаунту?{' '}
            <Link to="/register" className={styles.registerLink}>
              Зареєструватися
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
