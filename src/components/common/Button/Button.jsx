import styles from './Button.module.css';

function Button({ children, variant = 'dark' }) {
  const buttonClass = variant === 'light' ? styles.light : styles.dark;

  return <button className={`${styles.btn} ${buttonClass}`}>{children}</button>;
}

export default Button;
