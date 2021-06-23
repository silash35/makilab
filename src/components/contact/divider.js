import styles from "./divider.module.scss";

export default function Divider() {
  return (
    <div className={styles.divider}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M 917.69958,49.154877 A 849.44574,642.37103 0 0 0 745.15271,59.596025 C 663.06835,71.143956 583.58806,91.841799 501.73014,104.39576 385.12788,122.29023 263.70076,123.37186 147.28249,104.81383 98.702132,97.088541 49.352387,84.528992 0,71.015442 V 120 H 1200 V 90.72925 A 849.44574,642.37103 0 0 0 917.69958,49.154877 Z"
          className={styles.fill}
        />
      </svg>
    </div>
  );
}
