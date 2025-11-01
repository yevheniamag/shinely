import styles from './Input.module.css';

export default function Input({ label, type = 'text', ...props }) {
  return (
    <div className={styles.inputGroup}>
      <input type={type} className={styles.input} placeholder=" " {...props} />
      {}
      <label className={styles.label}>{label}</label>
    </div>
  );
}
