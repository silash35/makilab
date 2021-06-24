import styles from "./divider.module.scss";

export default function divider({ fill, top }) {
  fill = fill ? fill : "#212121";
  top = top ? styles.top : undefined;

  return (
    <div className={`${styles.divider} ${top}`}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" style={{ fill: fill }}></path>
      </svg>
    </div>
  );
}
