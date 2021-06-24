import styles from "./divider.module.scss";

export default function divider({ invert, fill }) {
  fill = fill ? fill : "#212121";
  invert = invert ? styles.invert : undefined;

  return (
    <div className={styles.divider}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={invert}
      >
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" style={{ fill: fill }}></path>
      </svg>
    </div>
  );
}
