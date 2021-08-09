import Screen from "../screen";
import styles from "./partners.module.scss";

export default function Partners() {
  return (
    <Screen id="partners">
      <section>
        <h2>Marcas parceiras</h2>
      </section>
      <section className={styles.cards}>
        <ul>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((key) => {
            return (
              <li className={styles.card} key={key}>
                <a href="http://www.makita.com.br/">
                  <img src="/resources/partners/makita.svg" />
                  <div>
                    <h3>Makita {key}</h3>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </Screen>
  );
}
