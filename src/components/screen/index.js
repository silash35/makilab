import styles from "./screen.module.scss";

export default function Screen({ children, background, otherStyles, id }) {
  return (
    <article id={id} className={`${styles.screen} ${styles[background]} ${otherStyles}`}>
      {children}
    </article>
  );
}
