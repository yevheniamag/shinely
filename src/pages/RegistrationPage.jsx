import styles from './RegistrationPage.module.css';
import Button from '../components/common/Button/Button';
import Input from '../components/common/Input/Input';
import Checkbox from '../components/common/Checkbox/Checkbox';

export default function RegistrationPage() {
  return (
    <div className={styles.pageContainer}>
      {}
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Реєстрація Нового Користувача</h2>

        <form className={styles.form}>
          <Input label="Ваше ім'я *" type="text" />
          <Input label="Ваше прізвище *" type="text" />
          <Input label="Email *" type="email" />
          <Input label="Пароль *" type="password" />
          <Input label="Повтор пароля *" type="password" />

          <Checkbox label="Отримувати повідомлення про новинки" />

          {}
          <Button variant="light" type="submit">
            Зареєструватися
          </Button>
        </form>
      </div>
    </div>
  );
}
