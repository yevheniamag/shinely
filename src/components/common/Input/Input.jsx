import styles from './Input.module.css';

export default function Input({ label, type = 'text', ...props }) {
  return (
    <div className={styles.inputGroup}>
      <input
        type={type}
        className={styles.input}
        placeholder=" " /* 1. ВАЖЛИВО: залишаємо placeholder, але робимо його порожнім */
        {...props}
      />
      {/* 2. Цей label тепер буде "плаваючим" */}
      <label className={styles.label}>{label}</label>
    </div>
  );
}
