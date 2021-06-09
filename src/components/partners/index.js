import styles from "./partners.module.scss";

export default function Partners() {
  return (
    <article id="partners" className={styles.partners}>
      <section>
        <h2>Marcas parceiras</h2>
      </section>
      <section className={styles.cards}>
        <ul>
          <li>
            <a href="http://www.makita.com.br/">
              <img src="/partners/makita.svg" width="300" />
              <h3>Makita</h3>
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
