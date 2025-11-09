import { useState } from 'react';
import styles from './RegistrationPage.module.css';
import Button from '../components/common/Button/Button.jsx';
import Input from '../components/common/Input/Input.jsx';
import Checkbox from '../components/common/Checkbox/Checkbox.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function RegistrationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Паролі не співпадають!');
      return;
    }
    const success = await register(email, password, firstName, lastName);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Реєстрація Нового Користувача</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Ваше ім'я *"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            label="Ваше прізвище *"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            label="Email *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Пароль *"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Повтор пароля *"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Checkbox label="Отримувати повідомлення про новинки" />
          <Button variant="light" type="submit">
            Зареєструватися
          </Button>

          <p className={styles.loginPrompt}>
            Вже маєте акаунт?{' '}
            <Link to="/login" className={styles.loginLink}>
              Увійти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
