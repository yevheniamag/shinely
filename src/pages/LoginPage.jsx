import { useState } from 'react';
import styles from './LoginPage.module.css';
import Button from '../components/common/Button/Button.jsx';
import Input from '../components/common/Input/Input.jsx';
import Checkbox from '../components/common/Checkbox/Checkbox.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Вхід до кабінету</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
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
