import styles from './Checkbox.module.css';

export default function Checkbox({ label, ...props }) {
  return (
    <label className={styles.checkboxContainer}>
      {label}
      <input type="checkbox" {...props} />
      <span className={styles.checkmark}></span>
    </label>
  );
}
