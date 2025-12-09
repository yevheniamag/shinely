import styles from './Button.module.css';

function Button({ children, variant = 'dark', className, ...props }) {
  const buttonClass = variant === 'light' ? styles.light : styles.dark;

  return (
    <button
      className={`${styles.btn} ${buttonClass} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
