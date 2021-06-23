import styles from "./scrollBack.module.scss";

export default function ScrollBack() {
  return (
    <a className={styles.button} href="#">
      <img src="/resources/icons/arrow_upward.svg" alt="arrow pointing up" />
    </a>
  );
}
