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
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {' '}
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Вхід до кабінету</h2>{' '}
        <form className={styles.form} onSubmit={handleSubmit}>
          {' '}
          <Input
            label="Email *"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            required
          />{' '}
          <Input
            label="Пароль *"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            required
          />{' '}
          <div className={styles.errorContainer}>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
          <Button variant="light" type="submit">
            Увійти{' '}
          </Button>{' '}
          <p className={styles.registerPrompt}>
            Не маєте акаунту?{' '}
            <Link to="/register" className={styles.registerLink}>
              Зареєструватися{' '}
            </Link>{' '}
          </p>{' '}
        </form>{' '}
      </div>{' '}
    </div>
  );
}
